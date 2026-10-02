import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CLUSTERS = [
  { name: 'CT Archives', pos: [-1.4, 0.6, 0], color: '#38BDF8', icon: '📁' },
  { name: 'Notes Cloud', pos: [1.4, 0.8, -0.3], color: '#10B981', icon: '📚' },
  { name: 'Discussions', pos: [0, -1.2, 0.4], color: '#F59E0B', icon: '💬' },
  { name: 'Central Vault', pos: [0, 0, 0], color: '#6366F1', icon: '⚡' },
];

function CampusNetworkMesh() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {CLUSTERS.map((c, i) => (
        <group key={i} position={c.pos as [number, number, number]}>
          <mesh>
            <cylinderGeometry args={[0.38, 0.44, 0.18, 6]} />
            <meshStandardMaterial color="#0B132B" metalness={0.7} roughness={0.3} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.CylinderGeometry(0.39, 0.45, 0.19, 6)]} />
            <lineBasicMaterial color={c.color} />
          </lineSegments>

          {i !== 3 && (
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([0, 0, 0, -c.pos[0], -c.pos[1], -c.pos[2]]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#3B82F6" transparent opacity={0.3} />
            </line>
          )}
        </group>
      ))}
    </group>
  );
}

export function HostelHubCampusScene() {
  return (
    <div className="w-full h-full min-h-[380px] relative flex flex-col justify-between p-4">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 1.2, 4.4], fov: 46 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 5, 4]} intensity={1.2} />
          <pointLight position={[0, -2, 2]} color="#10B981" intensity={1.0} />
          <CampusNetworkMesh />
        </Canvas>
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex flex-col gap-1 text-[11px] font-mono text-emerald-300 bg-black/70 p-3 rounded-lg border border-emerald-500/25 backdrop-blur-md max-w-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-semibold">CAMPUS RESOURCE CLOUD</span>
        </div>
        <div className="text-slate-400">Database: Supabase PostgreSQL</div>
        <div className="text-slate-400">Focus: Academic Notes & CT Repository</div>
      </div>

      {/* Cluster Node Pills */}
      <div className="relative z-10 flex flex-wrap gap-2 p-2 rounded-xl bg-black/80 border border-slate-800 backdrop-blur-md justify-center">
        {CLUSTERS.map((c, i) => (
          <span
            key={i}
            className="text-[10px] font-mono px-2.5 py-1 rounded border flex items-center gap-1.5"
            style={{
              backgroundColor: `${c.color}15`,
              borderColor: `${c.color}40`,
              color: c.color
            }}
          >
            <span>{c.icon}</span>
            <span>{c.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
export default HostelHubCampusScene;
