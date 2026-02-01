import React from 'react';
import { useGLTF } from '@react-three/drei';

export function SofaModel({ url }) {
  // useGLTF automatically handles caching
  const { scene } = useGLTF(url);
  
  // Optional: If you want to change colors dynamically later
  // scene.traverse((o) => { if (o.isMesh) o.castShadow = o.receiveShadow = true; });

  return <primitive object={scene} />;
}