import React, { useState, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Html, ContactShadows, useGLTF } from '@react-three/drei';

/**
 * CONFIGURATION
 * Add your filenames here (without .glb). 
 * In a real-world scenario, you could fetch this list from an API.
 */
const MODEL_NAMES = ["SOFA-1", "SOFA-2"]; 
const COLORS = [
  { name: 'Graphite', value: '#2c3e50' },
  { name: 'Ocean', value: '#2980b9' },
  { name: 'Sand', value: '#d35400' },
  { name: 'Forest', value: '#27ae60' },
];

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

// --- Main App Component ---
export default function App() {
  const [selectedModel, setSelectedModel] = useState(MODEL_NAMES[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', background: '#f5f5f5', fontFamily: 'sans-serif' }}>
      
      {/* UI PANEL */}
      <div style={{ width: '350px', padding: '30px', background: 'white', zIndex: 10, boxShadow: '2px 0 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0 0 10px 0' }}>Furniture Configurator</h1>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '30px' }}>Select a model and customize materials.</p>

        <section style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '10px' }}>Sofa Model</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {MODEL_NAMES.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedModel(m)}
                style={{
                  padding: '12px', border: '1px solid', borderRadius: '4px', cursor: 'pointer',
                  borderColor: selectedModel === m ? '#000' : '#ddd',
                  background: selectedModel === m ? '#000' : 'white',
                  color: selectedModel === m ? 'white' : '#000',
                  transition: 'all 0.2s'
                }}
              >
                {m.replace('-', ' ')}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '10px' }}>Fabric Color</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedColor(c.value)}
                title={c.name}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%', border: selectedColor === c.value ? '2px solid #000' : '2px solid transparent',
                  background: c.value, cursor: 'pointer', padding: '2px', backgroundClip: 'content-box'
                }}
              />
            ))}
          </div>
        </section>

        <div style={{ marginTop: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>Total Configuration:</p>
          <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>{selectedModel} / {COLORS.find(c => c.value === selectedColor).name}</p>
        </div>
      </div>

      {/* 3D VIEWPORT */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas shadows camera={{ position: [5, 3, 5], fov: 35 }}>
          <Suspense fallback={<Html center><h2>Loading Design...</h2></Html>}>
            {/* Stage provides studio lighting and centers the model automatically */}
            <Stage environment="city" intensity={0.6} contactShadow={false}>
              <Model 
                url={`/models/sofas/${selectedModel}.glb`} // Added /sofas/
                color={selectedColor} 
              />
            </Stage>
            <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={10} blur={2} far={1} />
          </Suspense>
          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.8} />
        </Canvas>
      </div>

    </div>
  );
}