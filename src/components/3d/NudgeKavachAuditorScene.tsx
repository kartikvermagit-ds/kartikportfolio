import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AuditorViewportMesh() {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.08;
      meshRef.current.rotation.x = Math.cos(t * 0.3) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry args={[4.2, 2.7, 0.15]} />
        <meshStandardMaterial color="#0B1220" roughness={0.3} metalness={0.8} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4.22, 2.72, 0.16)]} />
        <lineBasicMaterial color="#3B82F6" transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

export function NudgeKavachAuditorScene() {
  return (
    <div className="w-full h-full min-h-[380px] relative flex flex-col justify-between p-4">
      {/* 3D Wireframe Scene */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 4.6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 5, 4]} intensity={1.2} />
          <pointLight position={[-3, -3, 2]} color="#3B82F6" intensity={1.2} />
          <AuditorViewportMesh />
        </Canvas>
      </div>

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex flex-col gap-1 text-[11px] font-mono text-cyan-300 bg-black/70 p-3 rounded-lg border border-cyan-500/25 backdrop-blur-md max-w-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-white font-semibold">INTERFACE AUDITOR</span>
        </div>
        <div className="text-slate-400">Scope: Observable Manipulation Signals</div>
        <div className="text-slate-400">Engine: Browser Extension + Electron</div>
      </div>

      {/* Embedded 3D-Look Browser Session Interface */}
      <div className="relative z-10 max-w-md mx-auto w-full bg-[#090D16]/90 border border-blue-500/30 rounded-xl p-3 text-xs font-mono shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[10px] text-slate-400">nudge-auditor://target-session</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">SNIFFER ACTIVE</span>
        </div>

        <div className="mt-3 space-y-2">
          <div className="p-2 rounded bg-red-950/40 border border-red-500/30 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-red-400">Signal: Artificial Urgency Timer</div>
              <div className="text-[9px] text-slate-400">DOM element resets on refresh (mutation detected)</div>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-bold">LOGGED</span>
          </div>

          <div className="p-2 rounded bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-amber-400">Signal: Visual Pre-selection</div>
              <div className="text-[9px] text-slate-400">Recurring billing checkbox defaulted true</div>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">CAPTURED</span>
          </div>

          <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-emerald-400">Tamper-Proof Audit Trail Hash</div>
              <div className="text-[9px] text-slate-400">SHA-256: 8f4b...39e1 stored locally</div>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NudgeKavachAuditorScene;
