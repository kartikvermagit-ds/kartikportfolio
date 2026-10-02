import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FrameInterpolationMesh() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* FRAME 01 (T0) */}
      <group position={[-1.8, 0, 0]}>
        <mesh>
          <planeGeometry args={[1.6, 1.6]} />
          <meshStandardMaterial color="#0E2F44" roughness={0.4} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.62, 1.62)]} />
          <lineBasicMaterial color="#38BDF8" />
        </lineSegments>
      </group>

      {/* SYNTHESIZED INTERPOLATED FRAME (T+Δ) */}
      <group position={[0, 0, 0.3]}>
        <mesh>
          <planeGeometry args={[1.7, 1.7]} />
          <meshStandardMaterial color="#1E1B4B" emissive="#4338CA" emissiveIntensity={0.4} roughness={0.2} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.72, 1.72)]} />
          <lineBasicMaterial color="#A855F7" />
        </lineSegments>

        {/* Optical Flow Motion Vector Grid Particles */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  -0.4, 0.4, 0.05,
                  0, 0.4, 0.05,
                  0.4, 0.4, 0.05,
                  -0.4, 0, 0.05,
                  0, 0, 0.05,
                  0.4, 0, 0.05,
                  -0.4, -0.4, 0.05,
                  0, -0.4, 0.05,
                  0.4, -0.4, 0.05,
                ]),
                3
              ]}
            />
          </bufferGeometry>
          <pointsMaterial size={0.08} color="#C084FC" />
        </points>
      </group>

      {/* FRAME 02 (T1) */}
      <group position={[1.8, 0, 0]}>
        <mesh>
          <planeGeometry args={[1.6, 1.6]} />
          <meshStandardMaterial color="#0E2F44" roughness={0.4} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.62, 1.62)]} />
          <lineBasicMaterial color="#38BDF8" />
        </lineSegments>
      </group>
    </group>
  );
}

export function ChronoSatInterpolationScene() {
  return (
    <div className="w-full h-full min-h-[380px] relative flex flex-col justify-between p-4">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 4.4], fov: 46 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 3]} intensity={1.2} />
          <pointLight position={[0, 0, 3]} color="#A855F7" intensity={1.5} />
          <FrameInterpolationMesh />
        </Canvas>
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 flex flex-col gap-1 text-[11px] font-mono text-purple-300 bg-black/70 p-3 rounded-lg border border-purple-500/25 backdrop-blur-md max-w-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-white font-semibold">BAH 2026 SYNTHESIS ENGINE</span>
        </div>
        <div className="text-slate-400">Model: Deep Optical Flow Temporal Synthesizer</div>
        <div className="text-slate-400">Target: Temporal Resolution Gap Filling</div>
      </div>

      {/* Timeline Labels Bottom Bar */}
      <div className="relative z-10 grid grid-cols-3 gap-2 p-2 rounded-xl bg-black/80 border border-slate-800 backdrop-blur-md text-center">
        <div className="p-1 rounded bg-slate-900/60">
          <span className="text-[10px] font-mono font-bold text-sky-400 block">FRAME T0</span>
          <span className="text-[9px] text-slate-400 font-mono">00:00h Pass</span>
        </div>
        <div className="p-1 rounded bg-purple-950/60 border border-purple-500/40">
          <span className="text-[10px] font-mono font-bold text-purple-300 block">AI SYNTHESIS</span>
          <span className="text-[9px] text-purple-400 font-mono">Optical Flow Interpolation</span>
        </div>
        <div className="p-1 rounded bg-slate-900/60">
          <span className="text-[10px] font-mono font-bold text-sky-400 block">FRAME T1</span>
          <span className="text-[9px] text-slate-400 font-mono">24:00h Pass</span>
        </div>
      </div>
    </div>
  );
}
export default ChronoSatInterpolationScene;
