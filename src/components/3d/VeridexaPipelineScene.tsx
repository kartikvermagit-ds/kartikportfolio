import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PIPELINE_STEPS = [
  { step: '01', title: 'PDF Ingest', desc: 'Raw Spec Sheet', color: '#F43F5E' },
  { step: '02', title: 'Extraction', desc: 'Token & OCR Parser', color: '#F59E0B' },
  { step: '03', title: 'Validation', desc: 'Conflict Detection', color: '#10B981' },
  { step: '04', title: 'Evidence', desc: 'Grounded References', color: '#38BDF8' },
  { step: '05', title: 'Reasoning', desc: 'LLM Synthesis', color: '#8B5CF6' },
  { step: '06', title: 'Intelligence', desc: 'Explainable Schema', color: '#6366F1' },
];

function PipelineVisual() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[-2.5, 0.4, 0]}>
      {PIPELINE_STEPS.map((item, idx) => {
        const xPos = idx * 1.0;
        const yOffset = Math.sin(idx * 0.8) * 0.3;

        return (
          <group key={idx} position={[xPos, yOffset, 0]}>
            <mesh>
              <boxGeometry args={[0.7, 1.1, 0.15]} />
              <meshStandardMaterial
                color="#0F172A"
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(0.71, 1.11, 0.16)]} />
              <lineBasicMaterial color={item.color} />
            </lineSegments>

            {idx < PIPELINE_STEPS.length - 1 && (
              <group position={[0.5, 0, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.02, 0.02, 0.35, 12]} />
                  <meshBasicMaterial color="#3B82F6" transparent opacity={0.5} />
                </mesh>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
}

export function VeridexaPipelineScene() {
  return (
    <div className="w-full h-full min-h-[380px] relative flex flex-col justify-between">
      <div className="w-full h-full absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 46 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[0, 4, 4]} color="#38BDF8" intensity={1.5} />
          <pointLight position={[3, -3, 3]} color="#8B5CF6" intensity={1.2} />
          <PipelineVisual />
        </Canvas>
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 m-4 flex flex-col gap-1 text-[11px] font-mono text-purple-300 bg-black/70 p-3 rounded-lg border border-purple-500/30 backdrop-blur-md max-w-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-semibold">VERIFICATION ENGINE</span>
        </div>
        <div className="text-slate-400">Policy: Zero Hallucination Mode</div>
        <div className="text-purple-400">Output: Deterministic Audit Log</div>
      </div>

      {/* Bottom Pipeline Stages Track */}
      <div className="relative z-10 m-4 grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-2 rounded-xl bg-black/80 border border-slate-800 backdrop-blur-md">
        {PIPELINE_STEPS.map((s, i) => (
          <div key={i} className="text-center p-1.5 rounded bg-slate-900/50">
            <span className="text-[9px] font-mono font-bold block" style={{ color: s.color }}>
              {s.step} {s.title}
            </span>
            <span className="text-[8px] text-slate-400 block font-mono truncate">{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default VeridexaPipelineScene;
