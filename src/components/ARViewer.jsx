import React, { useRef, useState, useMemo, Suspense, useCallback, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import defaultRoom from '/assets/room-picture.jpg'; // Ensure this path is correct for your project

const PART_GROUP_LABELS = {
  seat: 'Seat',
  back: 'Back',
  arms: 'Arms',
  cushions: 'Cushions',
  legs: 'Legs',
  body: 'Body',
};

const TEXTURE_OPTIONS = [
  {
    id: 'duffy-02',
    name: 'Duffy 02',
    url: '/textures/Duffy_02.jpg',
  },
];

function inferPartGroup(partName = '') {
  const n = partName.toLowerCase();
  if (n.includes('leg') || n.includes('foot')) return 'legs';
  if (n.includes('cushion') || n.includes('pillow')) return 'cushions';
  if (n.includes('arm')) return 'arms';
  if (n.includes('back')) return 'back';
  if (n.includes('seat') || n.includes('base')) return 'seat';
  return 'body';
}

function getMeshSemanticName(mesh) {
  const tokens = [];
  let current = mesh;
  while (current) {
    if (current.name) tokens.push(current.name);
    current = current.parent;
  }
  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  materials.forEach((m) => {
    if (m?.name) tokens.push(m.name);
  });
  return tokens.join(' ').toLowerCase();
}

// --- 3D Model Component ---
function Model({ url, color }) {
  const { scene } = useGLTF(url);
  
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material && child.name.toLowerCase().includes('fabric')) {
          child.material.color.set(color);
        }
      }
    });
  }, [scene, color]);

  return <primitive object={scene} />;
}

const DEFAULT_MODEL_POSITION = [0, 0, 0.5];
const DEFAULT_MODEL_SCALE = 0.5;
const DEFAULT_MODEL_ROTATION = [0, 0, 0];

// --- Main AR Scene ---
function ARScene({
  selectedModel,
  modelPosition,
  setModelPosition,
  modelScale,
  modelRotation,
  lockToFloor,
  selectedGroup,
  groupColors,
  groupTextures,
  onSelectPart,
  onPartsDiscovered,
  setInteracting // Notify parent if we are touching model
}) {
  const groupRef = useRef();
  const modelOutlineRef = useRef(null);
  const { camera, gl } = useThree();
  const dragPlaneRef = useRef(new THREE.Plane());
  const dragOffsetRef = useRef(new THREE.Vector3());
  const dragPointRef = useRef(new THREE.Vector3());
  const raycasterRef = useRef(new THREE.Raycaster());
  const pointerRef = useRef(new THREE.Vector2());
  const [isFreeDragging, setIsFreeDragging] = useState(false);
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  const { scene } = useGLTF(`/models/sofas/${selectedModel}.glb`);
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true);
    let fallbackIndex = 1;
    const meshMeta = [];

    cloned.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = child.material?.clone?.() ?? child.material;
      const rawName = child.name?.trim();
      const selectKey = rawName || `mesh_${fallbackIndex}`;
      const displayName = rawName || `Part ${fallbackIndex}`;
      child.userData.selectKey = selectKey;
      child.userData.displayName = displayName;
      child.userData.baseColor = child.material?.color?.clone?.();
      child.userData.baseMap = child.material?.map || null;
      child.userData.partGroup = inferPartGroup(getMeshSemanticName(child));
      child.geometry?.computeBoundingBox?.();
      if (child.geometry?.boundingBox) {
        const bb = child.geometry.boundingBox.clone();
        bb.applyMatrix4(child.matrixWorld);
        const center = bb.getCenter(new THREE.Vector3());
        const size = bb.getSize(new THREE.Vector3());
        meshMeta.push({ mesh: child, center, size });
      }
      fallbackIndex += 1;
    });

    // Geometric fallback when names/materials don't carry semantics.
    const unknown = meshMeta.filter((m) => m.mesh.userData.partGroup === 'body');
    if (unknown.length > 0) {
      const min = new THREE.Vector3(Infinity, Infinity, Infinity);
      const max = new THREE.Vector3(-Infinity, -Infinity, -Infinity);
      meshMeta.forEach((m) => {
        min.min(m.center);
        max.max(m.center);
      });
      const span = max.clone().sub(min);
      const mid = min.clone().add(max).multiplyScalar(0.5);
      const spanX = Math.max(span.x, 1e-6);
      const spanY = Math.max(span.y, 1e-6);
      const spanZ = Math.max(span.z, 1e-6);

      unknown.forEach(({ mesh, center, size }) => {
        const footprint = Math.max(size.x, size.z);
        if (center.y < min.y + 0.22 * spanY && footprint < 0.18) {
          mesh.userData.partGroup = 'legs';
        } else if (Math.abs(center.x - mid.x) > 0.35 * spanX && center.y > min.y + 0.22 * spanY) {
          mesh.userData.partGroup = 'arms';
        } else if (Math.abs(center.z - mid.z) > 0.32 * spanZ && center.y > min.y + 0.35 * spanY) {
          mesh.userData.partGroup = 'back';
        } else if (center.y > min.y + 0.5 * spanY) {
          mesh.userData.partGroup = 'cushions';
        } else {
          mesh.userData.partGroup = 'seat';
        }
      });
    }
    return cloned;
  }, [scene]);

  const textureCache = useMemo(() => {
    const cache = {};
    Object.values(groupTextures || {}).forEach((textureUrl) => {
      if (!textureUrl || cache[textureUrl]) return;
      const tex = textureLoader.load(textureUrl);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.flipY = false;
      cache[textureUrl] = tex;
    });
    return cache;
  }, [groupTextures, textureLoader]);

  const availableParts = useMemo(() => {
    const parts = [];
    const seen = new Set();
    clonedScene.traverse((child) => {
      if (!child.isMesh) return;
      const key = child.userData.selectKey;
      const label = child.userData.displayName;
      if (!key || seen.has(key)) return;
      seen.add(key);
      parts.push({ key, label });
    });
    return parts.sort((a, b) => a.label.localeCompare(b.label));
  }, [clonedScene]);

  useEffect(() => {
    onPartsDiscovered(availableParts);
  }, [availableParts, onPartsDiscovered]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      const key = child.userData.selectKey;
      const mat = child.material;
      const partGroup = child.userData.partGroup || inferPartGroup(key || child.name || '');
      const explicitGroupColor = groupColors[partGroup];
      const explicitGroupTexture = groupTextures[partGroup];
      const isFabric = child.name?.toLowerCase?.().includes('fabric');

      if (explicitGroupTexture && textureCache[explicitGroupTexture]) {
        mat.map = textureCache[explicitGroupTexture];
        mat.needsUpdate = true;
        mat.color?.set?.('#ffffff');
      } else {
        const baseMap = child.userData.baseMap || null;
        if (mat.map !== baseMap) {
          mat.map = baseMap;
          mat.needsUpdate = true;
        }

        if (explicitGroupColor) {
          mat.color?.set?.(explicitGroupColor);
        } else if (isFabric && child.userData.baseColor) {
          mat.color?.copy?.(child.userData.baseColor);
        } else if (child.userData.baseColor) {
          mat.color?.copy?.(child.userData.baseColor);
        }
      }

      if ('emissive' in mat) {
        mat.emissive.set('#000000');
        mat.emissiveIntensity = 0;
      }

    });
  }, [clonedScene, groupColors, groupTextures, selectedGroup, textureCache]);

  useEffect(() => {
    const removeOutline = () => {
      if (!groupRef.current || !modelOutlineRef.current) return;
      groupRef.current.remove(modelOutlineRef.current);
      modelOutlineRef.current.traverse((child) => {
        if (child.isMesh && child.material?.dispose) {
          child.material.dispose();
        }
      });
      modelOutlineRef.current = null;
    };

    if (!groupRef.current) return;

    if (!selectedGroup) {
      removeOutline();
      return;
    }

    removeOutline();

    const modelOutline = clonedScene.clone(true);
    modelOutline.traverse((child) => {
      if (!child.isMesh) return;
      child.material = new THREE.MeshBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.5,
        side: THREE.BackSide,
        depthWrite: false,
      });
      child.renderOrder = 999;
    });
    modelOutline.scale.setScalar(1.015);

    groupRef.current.add(modelOutline);
    modelOutlineRef.current = modelOutline;

    return () => {
      removeOutline();
    };
  }, [clonedScene, selectedGroup]);
  
  const handlePartPointerDown = useCallback(
    (e) => {
      e.stopPropagation();
      if (!e.object?.isMesh) return;
      const key = e.object.userData.selectKey;
      const label = e.object.userData.displayName;
      const group = e.object.userData.partGroup || inferPartGroup(key || label || e.object.name || '');
      if (key) {
        onSelectPart({ key, label, group });
      }
      if (!groupRef.current) return;
      // Start direct drag on object so users can move it freely by click+drag.
      const cameraNormal = new THREE.Vector3();
      camera.getWorldDirection(cameraNormal);
      dragPlaneRef.current.setFromNormalAndCoplanarPoint(cameraNormal, groupRef.current.position.clone());

      if (e.ray.intersectPlane(dragPlaneRef.current, dragPointRef.current)) {
        dragOffsetRef.current.copy(dragPointRef.current).sub(groupRef.current.position);
      } else {
        dragOffsetRef.current.set(0, 0, 0);
      }

      setIsFreeDragging(true);
      setInteracting(true);
    },
    [camera, onSelectPart, setInteracting]
  );

  useEffect(() => {
    if (!isFreeDragging) return;

    const handlePointerMove = (event) => {
      if (!groupRef.current) return;
      const rect = gl.domElement.getBoundingClientRect();
      pointerRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycasterRef.current.setFromCamera(pointerRef.current, camera);

      if (!raycasterRef.current.ray.intersectPlane(dragPlaneRef.current, dragPointRef.current)) return;
      const next = dragPointRef.current.clone().sub(dragOffsetRef.current);
      const nextY = lockToFloor ? DEFAULT_MODEL_POSITION[1] : next.y;
      setModelPosition([next.x, nextY, next.z]);
    };

    const handlePointerUp = () => {
      setIsFreeDragging(false);
      setInteracting(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [camera, gl, isFreeDragging, lockToFloor, setInteracting, setModelPosition]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 10, 4]} intensity={0.8} />

      <group
        ref={groupRef}
        position={modelPosition}
        rotation={modelRotation}
        scale={[modelScale, modelScale, modelScale]}
      >
        <primitive object={clonedScene} onPointerDown={handlePartPointerDown} />
      </group>

      <ContactShadows
        position={[modelPosition[0], -0.01, modelPosition[2]]}
        opacity={0.35}
        scale={4}
        blur={2.5}
        far={4}
      />
    </>
  );
}

// --- Main Viewer Component ---
const ARViewer = ({ modelUrl, modelNames, defaultModel, onBack }) => {
  const [bgImage, setBgImage] = useState(defaultRoom);
  const [selectedModel, setSelectedModel] = useState(defaultModel || modelNames[0]);
  const [showControls, setShowControls] = useState(true);
  
  // Model State
  const [modelPosition, setModelPosition] = useState(DEFAULT_MODEL_POSITION);
  const [modelScale, setModelScale] = useState(DEFAULT_MODEL_SCALE);
  const [modelRotation, setModelRotation] = useState(DEFAULT_MODEL_ROTATION);
  
  // Interaction State (lifts up from Scene to disable OrbitControls)
  const [isInteracting, setInteracting] = useState(false);
  const [lockToFloor, setLockToFloor] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [parts, setParts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupColors, setGroupColors] = useState({});
  const [groupTextures, setGroupTextures] = useState({});
  const [groupColorInput, setGroupColorInput] = useState('#cc943c');
  const [selectedTexture, setSelectedTexture] = useState('');

  useEffect(() => {
    setSelectedGroup(null);
    setParts([]);
    setGroups([]);
    setGroupColors({});
    setGroupTextures({});
    setGroupColorInput('#cc943c');
    setSelectedTexture('');
  }, [selectedModel]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgImage((prev) => {
        try { if (prev && prev.startsWith('blob:')) URL.revokeObjectURL(prev); } catch (e) {}
        return url;
      });
    }
  };

  const handleReset = () => {
    setModelPosition(DEFAULT_MODEL_POSITION);
    setModelScale(DEFAULT_MODEL_SCALE);
    setModelRotation(DEFAULT_MODEL_ROTATION);
  };

  const handleHeightChange = (value) => {
    setModelPosition((prev) => [prev[0], value, prev[2]]);
  };

  const nudgeHeight = (delta) => {
    setModelPosition((prev) => {
      const next = Math.max(-1.5, Math.min(2.5, prev[1] + delta));
      return [prev[0], next, prev[2]];
    });
  };

  const nudgePosition = (dx, dy, dz) => {
    setModelPosition((prev) => {
      const nextY = Math.max(-1.5, Math.min(2.5, prev[1] + dy));
      return [prev[0] + dx, nextY, prev[2] + dz];
    });
  };

  const nudgeRotation = (delta) => {
    setModelRotation((prev) => [prev[0], prev[1] + delta, prev[2]]);
  };

  const handleRotationYChange = (value) => {
    setModelRotation((prev) => [prev[0], value, prev[2]]);
  };

  const handleSelectPart = (part) => {
    const group = part?.group || inferPartGroup(part?.key || part?.label || '');
    setSelectedGroup(group);
    setGroupColorInput(groupColors[group] || '#cc943c');
  };

  const applySelectedGroupColor = () => {
    if (!selectedGroup) return;
    setGroupColors((prev) => ({
      ...prev,
      [selectedGroup]: groupColorInput,
    }));
  };

  const clearSelectedGroupColor = () => {
    if (!selectedGroup) return;
    setGroupColors((prev) => {
      const next = { ...prev };
      delete next[selectedGroup];
      return next;
    });
  };

  const applyTexture = (textureUrl) => {
    setSelectedTexture(textureUrl);

    if (selectedGroup) {
      setGroupTextures((prev) => ({
        ...prev,
        [selectedGroup]: textureUrl,
      }));
      return;
    }

    setGroupTextures((prev) => {
      const next = { ...prev };
      const targetGroups = groups.length > 0 ? groups : ['seat', 'back', 'arms', 'cushions', 'legs', 'body'];
      targetGroups.forEach((groupKey) => {
        next[groupKey] = textureUrl;
      });
      return next;
    });
  };

  const clearSelectedGroupTexture = () => {
    if (!selectedGroup) {
      setGroupTextures({});
      return;
    }

    setGroupTextures((prev) => {
      const next = { ...prev };
      delete next[selectedGroup];
      return next;
    });
  };

  return (
    <div className="w-full h-full relative">
      
      <div className="absolute top-3 left-5 z-50 md:hidden lg:block">
        <button
          onClick={() => setShowControls((prev) => !prev)}
          className="px-3 py-2 rounded-lg bg-white/95 text-gray-800 text-xs font-bold shadow border border-gray-200"
        >
          {showControls ? 'Hide Controls' : 'Show Controls'}
        </button>
      </div>

      {/* --- UI Controls --- */}
      {showControls && (
      <div className="absolute z-40 bg-white/95 p-3 md:p-4 rounded-xl shadow-[0_2px_12px_#0001] w-[calc(100%-1rem)] sm:w-85 max-h-[42vh] md:max-h-[calc(100%-2rem)] overflow-y-auto left-2 right-2 md:left-5 md:right-auto md:top-15 bottom-2 md:bottom-auto">
        <h2 className="m-0 font-bold text-black text-base md:text-lg">AR Viewer</h2>
        
        <div style={{ margin: '10px 0' }}>
          <label style={{ fontWeight: 600, color: 'black', fontSize: 13 }}>Model</label>
          <select 
            value={selectedModel} 
            onChange={e => setSelectedModel(e.target.value)} 
            className='text-black'
            style={{ width: '100%', padding: 8, borderRadius: 6, marginTop: 4, border: '1px solid #ccc' }}
          >
            {modelNames.map((m) => (
              <option key={m} value={m}>{m.replace('-', ' ')}</option>
            ))}
          </select>
        </div>

        <div style={{ margin: '10px 0' }}>
          <label style={{ fontWeight: 600, color: 'black', fontSize: 13 }}>Background</label>
          <input type="file" accept="image/*" className='text-white p-2.5 bg-black rounded' onChange={handleImageUpload} style={{marginTop: 4, width: '100%'}} />
        </div>

        <div style={{ margin: '10px 0' }}>
           <label style={{ fontWeight: 600, color: 'black', fontSize: 13 }}>Scale: {modelScale.toFixed(2)}</label>
           <input type="range" min={0.2} max={1.2} step={0.01} value={modelScale} onChange={e => setModelScale(Number(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div style={{ margin: '10px 0' }}>
          <label style={{ fontWeight: 600, color: 'black', fontSize: 13 }}>
            Rotation Y: {modelRotation[1].toFixed(2)}
          </label>
          <input
            type="range"
            min={-3.14}
            max={3.14}
            step={0.01}
            value={modelRotation[1]}
            onChange={(e) => handleRotationYChange(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => nudgeRotation(-0.1)}
              className="rounded p-2 text-xs font-bold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
            >
              Rotate Left
            </button>
            <button
              onClick={() => nudgeRotation(0.1)}
              className="rounded p-2 text-xs font-bold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
            >
              Rotate Right
            </button>
          </div>
        </div>

        <div style={{ margin: '10px 0' }}>
          <label style={{ fontWeight: 600, color: 'black', fontSize: 13 }}>
            Height (Y): {modelPosition[1].toFixed(2)}
          </label>
          <input
            type="range"
            min={-1.5}
            max={2.5}
            step={0.01}
            value={modelPosition[1]}
            onChange={(e) => handleHeightChange(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => nudgeHeight(0.05)}
              className="rounded p-2 text-xs font-bold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
            >
              Raise +Y
            </button>
            <button
              onClick={() => nudgeHeight(-0.05)}
              className="rounded p-2 text-xs font-bold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
            >
              Lower -Y
            </button>
          </div>
          <label className="flex items-center gap-2 mt-2 text-xs font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={lockToFloor}
              onChange={(e) => setLockToFloor(e.target.checked)}
            />
            Lock to floor (Y=0)
          </label>
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label style={{ fontWeight: 600, color: 'black', fontSize: 13 }}>Move Object</label>
          <div className='flex flex-col justify-center items-center gap-2 mt-2'>
            <div>
              <button
                onClick={() => nudgePosition(0, 0, -0.08)}
                className="rounded p-2 text-xs font-bold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
              >
                Forward
              </button>
            </div>
            <div className='flex flex-row justify-center gap-5'>
              <button
                onClick={() => nudgePosition(-0.08, 0, 0)}
                className="rounded p-2 text-xs font-bold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
              >
                Left
              </button>
              <button
                onClick={() => nudgePosition(0, 0.08, 0)}
                className="rounded p-2 text-xs font-bold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
              >
                Up
              </button>
              <button
                onClick={() => nudgePosition(0, -0.08, 0)}
                className="rounded p-2 text-xs font-bold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
              >
                Down
              </button>
              <button
                onClick={() => nudgePosition(0.08, 0, 0)}
                className="rounded p-2 text-xs font-bold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
              >
                Right
              </button>
            </div>
            <div>
              <button
                onClick={() => nudgePosition(0, 0, 0.08)}
                className="rounded p-2 text-xs font-bold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        <div style={{ margin: '10px 0' }} className={`${selectedGroup ? 'display-block' : 'hidden'}`}>
          <select
            value={selectedGroup || ''}
            onChange={(e) => {
              const g = e.target.value;
              if (!g) {
                setSelectedGroup(null);
                return;
              }
              setSelectedGroup(g);
              setGroupColorInput(groupColors[g] || '#cc943c');
            }}
            className='text-black hidden'
            style={{ width: '100%', padding: 8, borderRadius: 6, marginTop: 4, border: '1px solid #ccc' }}
          >
            <option value="">Select group (legs, cushion, ...)</option>
            {groups.map((groupKey) => (
              <option key={groupKey} value={groupKey}>
                {PART_GROUP_LABELS[groupKey] || groupKey}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="color"
              value={groupColorInput}
              onChange={(e) => setGroupColorInput(e.target.value)}
              className="h-9 w-12 p-0 border border-gray-300 rounded"
              disabled={!selectedGroup}
            />
            <button
              onClick={applySelectedGroupColor}
              disabled={!selectedGroup}
              className="flex-1 rounded p-2 text-xs font-bold border border-teal-600 bg-teal-600 text-white disabled:opacity-50"
            >
              Apply Color to Group
            </button>
          </div>
          <button
            onClick={clearSelectedGroupColor}
            disabled={!selectedGroup}
            className="w-full mt-2 rounded p-2 text-xs font-bold border border-gray-300 bg-white text-gray-700 disabled:opacity-50"
          >
            Reset Group Color
          </button>
          <div style={{ marginTop: 6, fontSize: '11px', color: '#666' }}>
            Click any mesh and it auto-selects a group (legs/arms/back/seat/cushions).
          </div>
        </div>

        <div style={{ margin: '10px 0' }} className={`${selectedGroup ? 'display-block' : 'hidden'}`}>
          <label style={{ fontWeight: 600, color: 'black', fontSize: 13 }}>Textures</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {TEXTURE_OPTIONS.map((texture) => {
              const isSelected = selectedTexture === texture.url;
              return (
                <button
                  key={texture.id}
                  onClick={() => applyTexture(texture.url)}
                  className={`rounded border p-1 transition ${isSelected ? 'border-teal-600 ring-2 ring-teal-200' : 'border-gray-300'}`}
                  title={texture.name}
                >
                  <img
                    src={texture.url}
                    alt={texture.name}
                    className="h-16 w-full rounded object-cover"
                  />
                  <div className="mt-1 text-[11px] font-semibold text-gray-700">{texture.name}</div>
                </button>
              );
            })}
          </div>
          <button
            onClick={clearSelectedGroupTexture}
            className="w-full mt-2 rounded p-2 text-xs font-bold border border-gray-300 bg-white text-gray-700"
          >
            {selectedGroup ? 'Reset Group Texture' : 'Reset All Textures'}
          </button>
          <div style={{ marginTop: 6, fontSize: '11px', color: '#666' }}>
            Click texture to apply {selectedGroup ? `to ${PART_GROUP_LABELS[selectedGroup] || selectedGroup}` : 'to the model'}.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button onClick={handleReset} 
          className='bg-[#cc943c] text-white hover:bg-white hover:text-[#cc943c] border border-[#cc943c] transition-all duration-300 rounded p-2.5 text-sm'
          style={{ flex: 1, cursor: 'pointer' }}>
            Reset
          </button>
          {onBack && 
          <button onClick={onBack} className='hover:bg-[#eee] hover:text-[#333] bg-[#333] text-[#eee] border border-[#ccc] transition-all duration-300 rounded p-2.5 text-sm' style={{ flex: 1, cursor: 'pointer' }}>Back</button>}
        </div>
        
        <div style={{marginTop:10, fontSize: '11px', color: '#666', lineHeight: 1.45}}>
          * Click and drag the object directly to move<br/>
          * Use Forward/Back/Left/Right/Up/Down for precise placement<br/>
          * Rotate the camera to view movement in full 360
        </div>
      </div>
      )}

      {/* --- 3D Canvas --- */}
      <Canvas 
        shadows 
        camera={{ position: [0, 2, 6], fov: 35 }} 
        className='cursor-grab active:cursor-grabbing'
        style={{ 
          width: '100%', 
          height: '100%', 
          backgroundImage: `url(${bgImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <Suspense fallback={<Html center><h2>Loading...</h2></Html>}>
          <ARScene
            selectedModel={selectedModel}
            modelPosition={modelPosition}
            setModelPosition={setModelPosition}
            modelScale={modelScale}
            modelRotation={modelRotation}
            lockToFloor={lockToFloor}
            selectedGroup={selectedGroup}
            groupColors={groupColors}
            groupTextures={groupTextures}
            onSelectPart={handleSelectPart}
            onPartsDiscovered={(discoveredParts) => {
              setParts(discoveredParts);
              const discoveredGroups = Array.from(
                new Set(discoveredParts.map((p) => inferPartGroup(p.key || p.label || '')))
              );
              const order = ['seat', 'back', 'arms', 'cushions', 'legs', 'body'];
              discoveredGroups.sort((a, b) => order.indexOf(a) - order.indexOf(b));
              setGroups(discoveredGroups);
            }}
            setInteracting={setInteracting}
          />
        </Suspense>
        
        {/* OrbitControls are disabled when user is dragging transform gizmos */}
        <OrbitControls 
            makeDefault 
            enableZoom
            enablePan
            enableRotate
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 1.8} 
            enabled={!isInteracting} 
        />
      </Canvas>
    </div>
  );
};

export default ARViewer;