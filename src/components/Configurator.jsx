import React, { useState, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Html, ContactShadows, useGLTF } from '@react-three/drei';
import ARViewer from './ARViewer';

/**
 * CONFIGURATION
 * Add your filenames here (without .glb). 
 * In a real-world scenario, you could fetch this list from an API.
 */
const MODEL_NAMES = ["SOFA-1-PARTS", "KLUN-STYLE-SOFA", "SOFA-1", "SOFA-2", "Arm-Chair-1", "Arm-Chair-2", "SOFA-4", "SOFA-5", "SQUARE-SOFA", "YELLOW-SOFA", "Double-Sofa", "K01-1s-PS", "K01-2s-PS", "K01-3s-1rL-oD-GS"];

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
      <div className="w-full h-screen overflow-hidden relative">
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
    <div className="w-full min-h-[calc(100vh-72px)] md:h-screen flex flex-col md:flex-row bg-[#f5f5f5]">
      {/* UI PANEL */}
      <div className="w-full md:w-80 lg:w-96 p-4 md:p-6 bg-white z-10 shadow-[2px_0_20px_rgba(0,0,0,0.05)] flex flex-col max-h-[45vh] md:max-h-none overflow-y-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Furniture Configurator</h1>
        <p className="text-gray-500 text-sm mb-5 md:mb-7">اختر نموذجا.</p>

        <section className="mb-6 md:mb-8">
          <label className="block font-semibold mb-3 text-sm">Sofa Model</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {MODEL_NAMES.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedModel(m)}
                className="uppercase"
                style={{
                  padding: '10px', border: '1px solid', borderRadius: '4px', cursor: 'pointer',
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
          className="mt-2 md:mt-3 p-3 rounded border border-[#00786f] bg-[#00786f] text-white font-bold cursor-pointer"
        >
          Try AR Mode
        </button>
      </div>

      {/* 3D VIEWPORT */}
      <div className="w-full flex-1 relative min-h-[55vh] md:min-h-0">
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
    </div>
  );
};

export default Configurator;
