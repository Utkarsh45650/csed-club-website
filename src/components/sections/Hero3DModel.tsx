import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Center } from '@react-three/drei';
import * as THREE from 'three';

// ----------------------------------------------------------------------
// 1. Error Boundary (Prevents the whole page from going blank)
// ----------------------------------------------------------------------
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen w-full h-full flex flex-col items-center justify-center bg-[#111827] border-2 border-red-500/50 rounded-xl p-6 text-center shadow-xl">
          <span className="text-red-400 font-bold mb-2">Failed to load robodog.glb</span>
          <span className="text-red-300 text-xs font-mono max-w-full overflow-hidden text-ellipsis px-4">
            {this.state.error?.message || 'Unknown error occurred. Check if the file is a valid GLTF/GLB.'}
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}

// ----------------------------------------------------------------------
// 2. The 3D Model Loader (Supports Draco Compression)
// ----------------------------------------------------------------------
function RobodogModel() {
  const group = useRef<THREE.Group>(null);
  
  // Load the GLB file. We provide the Google CDN path for the Draco decoder
  // just in case your model was compressed using Draco (very common).
  const { scene, animations } = useGLTF(
    '/assets/3d/robodog2.glb', 
    'https://www.gstatic.com/draco/versioned/decoders/1.5.5/'
  );
  
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play the first animation if it exists
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.keys(actions)[0];
      actions[firstAction]?.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  return (
    <Center position={[0, -0.5, 0]}>
      <primitive ref={group} object={scene} scale={1} />
    </Center>
  );
}

// Preload for faster rendering
useGLTF.preload('/assets/3d/robodog2.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.5/');

// ----------------------------------------------------------------------
// 3. Simple HTML Loading Fallback
// ----------------------------------------------------------------------
function LoaderFallback() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050816]/50 rounded-xl">
      <div className="w-10 h-10 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-[#00D4FF] font-mono text-xs font-bold tracking-widest uppercase">
        Loading Model...
      </span>
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. Main Component Export
// ----------------------------------------------------------------------
export default function Hero3DModel() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <ErrorBoundary>
        <Suspense fallback={<LoaderFallback />}>
          <Canvas 
            camera={{ position: [4, 2, 5], fov: 45 }} 
            dpr={[1, 1.5]} // Capped at 1.5 to prevent WebGL crashes on heavy models
            gl={{ antialias: false, powerPreference: "high-performance" }} // Disabled antialias for performance
          >
            {/* Simple, robust lighting that won't crash the GPU */}
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 10]} intensity={2} />
            <directionalLight position={[-10, 10, -10]} intensity={1} color="#00D4FF" />
            
            <RobodogModel />
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={true}
              autoRotate={true}
              autoRotateSpeed={1.5}
            />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
