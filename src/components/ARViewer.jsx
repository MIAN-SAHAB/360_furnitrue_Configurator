import React, { useRef, useState, useMemo, Suspense, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, useGLTF, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import defaultRoom from '/assets/room-picture.jpg'; // Ensure this path is correct for your project

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

// --- Visual Rotation Ring Component ---
function RotationRing({ isHovered, setIsHovered, onPointerDown }) {
  return (
    <group position={[0, 0.05, 0]}>
      {/* Visual Ring */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        onPointerOver={() => setIsHovered(true)} 
        onPointerOut={() => setIsHovered(false)}
        onPointerDown={onPointerDown}
      >
        <ringGeometry args={[0.8, 1, 32]} />
        <meshBasicMaterial 
          color={isHovered ? "#ff0000" : "#ffffff"} 
          side={THREE.DoubleSide} 
          transparent 
          opacity={0.6} 
        />
      </mesh>
      {/* Arrow Indicator (Triangle) */}
      <mesh 
        position={[0, 0, 0.9]} 
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={onPointerDown}
      >
        <circleGeometry args={[0.15, 3]} />
        <meshBasicMaterial color={isHovered ? "#ff0000" : "#ffffff"} />
      </mesh>
    </group>
  );
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
  setModelRotation,
  setInteracting // Notify parent if we are touching model
}) {
  const groupRef = useRef();
  const { camera, gl } = useThree();
  
  // Interaction States
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isRotatingVertical, setIsRotatingVertical] = useState(false);
  const [hoverRing, setHoverRing] = useState(false);
  const [hoverVerticalRing, setHoverVerticalRing] = useState(false);

  // Store initial values for drag calculations
  const dragStartRef = useRef({ 
    x: 0, 
    z: 0, 
    mouseX: 0, 
    mouseY: 0, 
    initialRotationY: 0 
  });

  // Notify parent component to disable OrbitControls
  useEffect(() => {
    setInteracting(isDragging || isRotating || isRotatingVertical);
  }, [isDragging, isRotating, isRotatingVertical, setInteracting]);

  // Apply Scale
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.set(modelScale, modelScale, modelScale);
    }
  }, [modelScale]);

  // --- HANDLERS ---

  // 1. Handle clicking the MODEL (Start Move)
  const onModelPointerDown = useCallback((e) => {
    // If we clicked the ring, ignore this handler (handled bystopPropagation in ring)
    if (isRotating) return; 
    
    e.stopPropagation(); // Stop click from hitting background
    
    setIsDragging(true);
    // Project the 3D position to screen space is complex, simpler to use delta
    dragStartRef.current = {
      x: groupRef.current.position.x,
      z: groupRef.current.position.z,
      mouseX: e.clientX,
      mouseY: e.clientY
    };
    gl.domElement.style.cursor = 'grabbing';
  }, [isRotating, gl]);

  // 2. Handle clicking the RING (Start Rotate Horizontal)
  const onRingPointerDown = useCallback((e) => {
    e.stopPropagation(); // CRITICAL: Stop event from bubbling to Model or Background
    
    setIsRotating(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      initialRotationY: groupRef.current.rotation.y
    };
    gl.domElement.style.cursor = 'ew-resize';
  }, [gl]);

  // 2b. Handle clicking the VERTICAL RING (Start Rotate Vertical)
  const onVerticalRingPointerDown = useCallback((e) => {
    e.stopPropagation(); // CRITICAL: Stop event from bubbling to Model or Background
    
    setIsRotatingVertical(true);
    dragStartRef.current = {
      mouseY: e.clientY,
      initialRotationX: groupRef.current.rotation.x
    };
    gl.domElement.style.cursor = 'ns-resize';
  }, [gl]);

  // 3. Global Move Listener (attached to window to prevent mouse slipping off object)
  useEffect(() => {
    const onPointerMove = (e) => {
      if (!isDragging && !isRotating && !isRotatingVertical) return;

      if (isDragging) {
        // --- MOVEMENT LOGIC ---
        // Slower factor for more precision
        const sensitivity = 0.005; 
        const deltaX = (e.clientX - dragStartRef.current.mouseX) * sensitivity;
        const deltaZ = (e.clientY - dragStartRef.current.mouseY) * sensitivity;

        setModelPosition([
          dragStartRef.current.x + deltaX,
          DEFAULT_MODEL_POSITION[1],
          dragStartRef.current.z + deltaZ
        ]);
      } 
      
      if (isRotating) {
        // --- HORIZONTAL ROTATION LOGIC ---
        const sensitivity = 0.01;
        const deltaX = (e.clientX - dragStartRef.current.mouseX) * sensitivity;
        
        setModelRotation([
          modelRotation[0], // Keep X rotation
          dragStartRef.current.initialRotationY + deltaX,
          0  // Lock Z rotation
        ]);
      }

      if (isRotatingVertical) {
        // --- VERTICAL ROTATION LOGIC ---
        const sensitivity = 0.01;
        const deltaY = (e.clientY - dragStartRef.current.mouseY) * sensitivity;
        
        setModelRotation([
          dragStartRef.current.initialRotationX + deltaY,
          modelRotation[1], // Keep Y rotation
          0  // Lock Z rotation
        ]);
      }
    };

    const onPointerUp = () => {
      setIsDragging(false);
      setIsRotating(false);
      setIsRotatingVertical(false);
      gl.domElement.style.cursor = 'auto';
    };

    // Attach listeners to window for smooth dragging even if mouse leaves canvas
    if (isDragging || isRotating || isRotatingVertical) {
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isDragging, isRotating, isRotatingVertical, setModelPosition, setModelRotation, modelRotation, gl]);

  return (
    <>
      <ambientLight intensity={0.6} />
      {/* <directionalLight position={[5, 10, 5]} intensity={1} castShadow /> */}
      
      <group
        ref={groupRef}
        position={modelPosition}
        rotation={modelRotation}
        onPointerDown={onModelPointerDown} // Clicking model triggers Drag
      >
        <Model url={`/models/sofas/${selectedModel}.glb`} />
        
        {/* The Horizontal Rotation Ring */}
        <RotationRing 
            isHovered={hoverRing} 
            setIsHovered={setHoverRing} 
            onPointerDown={onRingPointerDown} 
        />
        
        {/* The Vertical Rotation Ring (Right Side) */}
        <group position={[0.9, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <RotationRing 
              isHovered={hoverVerticalRing} 
              setIsHovered={setHoverVerticalRing} 
              onPointerDown={onVerticalRingPointerDown} 
          />
        </group>
      </group>

      <ContactShadows position={[0, -0.01, 0.5]} opacity={0.4} scale={3.5} blur={2} far={0} />
    </>
  );
}

// --- Main Viewer Component ---
const ARViewer = ({ modelUrl, modelNames, defaultModel, onBack }) => {
  const [bgImage, setBgImage] = useState(defaultRoom);
  const [selectedModel, setSelectedModel] = useState(defaultModel || modelNames[0]);
  
  // Model State
  const [modelPosition, setModelPosition] = useState(DEFAULT_MODEL_POSITION);
  const [modelScale, setModelScale] = useState(DEFAULT_MODEL_SCALE);
  const [modelRotation, setModelRotation] = useState(DEFAULT_MODEL_ROTATION);
  
  // Interaction State (lifts up from Scene to disable OrbitControls)
  const [isInteracting, setInteracting] = useState(false);

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

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      
      {/* --- UI Controls (Same as before) --- */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 49, background: 'rgba(255,255,255,0.95)', padding: 16, borderRadius: 8, boxShadow: '0 2px 12px #0001', minWidth: 260 }}>
        <h2 style={{ margin: 0, fontWeight: 700, color: 'black' }}>AR Viewer</h2>
        
        <div style={{ margin: '12px 0' }}>
          <label style={{ fontWeight: 600, color: 'black' }}>Model</label>
          <select 
            value={selectedModel} 
            onChange={e => setSelectedModel(e.target.value)} 
            className='text-black'
            style={{ width: '100%', padding: 6, borderRadius: 4, marginTop: 4, border: '1px solid #ccc' }}
          >
            {modelNames.map((m) => (
              <option key={m} value={m}>{m.replace('-', ' ')}</option>
            ))}
          </select>
        </div>

        <div style={{ margin: '12px 0' }}>
          <label style={{ fontWeight: 600, color: 'black' }}>Background</label>
          <input type="file" accept="image/*" className='text-white p-4 bg-black rounded' onChange={handleImageUpload} style={{marginTop: 4, width: '100%'}} />
        </div>

        <div style={{ margin: '12px 0' }}>
           <label style={{ fontWeight: 600, color: 'black' }}>Scale: {modelScale.toFixed(2)}</label>
           <input type="range" min={0.2} max={1.2} step={0.01} value={modelScale} onChange={e => setModelScale(Number(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button onClick={handleReset} 
          className='bg-[#cc943c] text-white hover:bg-white hover:text-[#cc943c] border border-[#cc943c] transition-all duration-300 rounded p-4'
          style={{ flex: 1, cursor: 'pointer' }}>
            Reset
          </button>
          {onBack && 
          <button onClick={onBack} className='hover:bg-[#eee] hover:text-[#333] bg-[#333] text-[#eee] border border-[#ccc] transition-all duration-300 rounded p-4' style={{ flex: 1, cursor: 'pointer' }}>Back</button>}
        </div>
        
        <div style={{marginTop:10, fontSize: '12px', color: '#666'}}>
          * Drag object to move<br/>
          * Drag bottom ring to rotate horizontally<br/>
          * Drag right ring to rotate vertically
        </div>
      </div>

      {/* --- 3D Canvas --- */}
      <Canvas 
        shadows 
        camera={{ position: [0, 2, 6], fov: 35 }} 
        style={{ 
          width: '100vw', 
          height: '100vh', 
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
            setModelScale={setModelScale}
            modelRotation={modelRotation}
            setModelRotation={setModelRotation}
            setInteracting={setInteracting}
          />
        </Suspense>
        
        {/* OrbitControls are disabled when user is dragging object or ring */}
        <OrbitControls 
            makeDefault 
            enableZoom={false} 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 1.8} 
            enabled={!isInteracting} 
        />
      </Canvas>
    </div>
  );
};

export default ARViewer;