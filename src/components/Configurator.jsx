import React, { useState, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Html, ContactShadows, useGLTF } from '@react-three/drei';
import ARViewer from './ARViewer';

/**
 * CONFIGURATION
 * Add your filenames here (without .glb). 
 * In a real-world scenario, you could fetch this list from an API.
 */
const MODEL_NAMES = ["SOFA-1", "SOFA-2", "Arm-Chair-1", "Arm-Chair-2", "SOFA-4", "SOFA-5", "SQUARE-SOFA", "YELLOW-SOFA", "Double-Sofa", "K01-1s-PS", "K01-2s-PS", "K01-3s-1rL-oD-GS"];

// --- 3D Model Component ---
function Model({ url, color }) {
  const { scene } = useGLTF(url);

  // Apply color to any mesh that looks like fabric
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Logic: if the mesh name contains 'fabric' or 'seat', apply color
        if (child.material && child.name.toLowerCase().includes('fabric')) {
          child.material.color.set(color);
        }
      }
    });
  }, [scene, color]);

  return <primitive object={scene} />;
}

// --- Configurator Component ---

const Configurator = () => {
  const [selectedModel, setSelectedModel] = useState(MODEL_NAMES[0]);
  const [arMode, setArMode] = useState(false);

  if (arMode) {
    return (
      <div style={{ width: '99vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
        <button
          onClick={() => setArMode(false)}
          style={{ position: 'absolute', top: 24, right: 24, zIndex: 20, padding: '10px 18px', borderRadius: 6, border: '1px solid #00786f', background: '#fff', color: '#00786f', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px #0001' }}
        >
          Exit AR Mode
        </button>
        <ARViewer
          modelUrl={`/models/sofas/${selectedModel}.glb`}
          modelNames={MODEL_NAMES}
          defaultModel={selectedModel}
          onBack={() => setArMode(false)}
        />
      </div>
    );
  }

  return (
    <div style={{ width: '99vw', height: '100vh', display: 'flex', background: '#f5f5f5', fontFamily: 'sans-serif' }}>
      {/* UI PANEL */}
      <div style={{ width: '20%', padding: '30px', background: 'white', zIndex: 10, boxShadow: '2px 0 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0 0 10px 0' }}>Furniture Configurator</h1>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '30px' }}>اختر نموذجا.</p>

        <section style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '10px' }}>Sofa Model</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {MODEL_NAMES.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedModel(m)}
                className="uppercase"
                style={{
                  padding: '12px', border: '1px solid', borderRadius: '4px', cursor: 'pointer',
                  borderColor: selectedModel === m ? '#00786f' : '#ddd',
                  background: selectedModel === m ? '#00786f' : 'white',
                  color: selectedModel === m ? 'white' : '#000',
                  transition: 'all 0.2s'
                }}
              >
                {m.replace('-', ' ')}
              </button>
            ))}
          </div>
        </section>
        <button
          onClick={() => setArMode(true)}
          style={{ marginTop: 12, padding: '12px', borderRadius: 4, border: '1px solid #00786f', background: '#00786f', color: 'white', fontWeight: 700, cursor: 'pointer' }}
        >
          Try AR Mode
        </button>
      </div>

      {/* 3D VIEWPORT */}
      <div style={{ width: '100%', flex: 1, position: 'relative' }}>
        <Canvas shadows camera={{ position: [5, 3, 5], fov: 35 }}>
          <Suspense fallback={<Html center><h2>Loading Design...</h2></Html>}>
            {/* Stage provides studio lighting and centers the model automatically */}
            <Stage environment="city" intensity={0.6} contactShadow={false}>
              <group scale={0.5}> {/* Forces the model to half size before Stage calculates bounds */}
                <Model url={`/models/sofas/${selectedModel}.glb`} />
              </group>
            </Stage>
            <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={7} blur={2} far={1} />
          </Suspense>
          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.8} />
        </Canvas>
      </div>
      <div style={{ width: '10%'}}></div>
    </div>
  );
};

export default Configurator;
