import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DSA_NODES = [
  { name: 'ARRAYS', pos: [-2.2, 1.2, 0], color: '#38BDF8' },
  { name: 'HASHING', pos: [-0.8, 1.5, -0.4], color: '#F43F5E' },
  { name: 'STACKS', pos: [1.0, 1.3, 0.2], color: '#F59E0B' },
  { name: 'TREES', pos: [2.3, 0.5, -0.5], color: '#10B981' },
  { name: 'GRAPHS', pos: [1.4, -1.2, 0], color: '#8B5CF6' },
  { name: 'DP', pos: [-0.5, -1.5, 0.5], color: '#EC4899' },
  { name: 'LINKED LISTS', pos: [-2.0, -0.8, -0.2], color: '#6366F1' },
];

function AlgoNodesMesh() {
  const groupRef = useRef<THREE.Group>(null!);

  const linePositions = useMemo(() => {
    const coords: number[] = [];
    for (let i = 0; i < DSA_NODES.length; i++) {
      const next = (i + 1) % DSA_NODES.length;
      coords.push(DSA_NODES[i].pos[0], DSA_NODES[i].pos[1], DSA_NODES[i].pos[2]);
      coords.push(DSA_NODES[next].pos[0], DSA_NODES[next].pos[1], DSA_NODES[next].pos[2]);

      const cross = (i + 3) % DSA_NODES.length;
      coords.push(DSA_NODES[i].pos[0], DSA_NODES[i].pos[1], DSA_NODES[i].pos[2]);
      coords.push(DSA_NODES[cross].pos[0], DSA_NODES[cross].pos[1], DSA_NODES[cross].pos[2]);
    }
    return new Float32Array(coords);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3B82F6" transparent opacity={0.35} />
      </lineSegments>

      {DSA_NODES.map((node, i) => (
        <group key={i} position={node.pos as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.0}
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function AlgoGraphScene() {
  return (
    <div className="w-full h-full min-h-[360px] relative flex flex-col justify-end p-4">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 46 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[4, 4, 4]} color="#38BDF8" intensity={1.5} />
          <pointLight position={[-4, -4, -4]} color="#A855F7" intensity={1.2} />
          <AlgoNodesMesh />
        </Canvas>
      </div>

      {/* Floating Concept Badges */}
      <div className="relative z-10 flex flex-wrap gap-1.5 justify-center">
        {DSA_NODES.map((node, i) => (
          <span
            key={i}
            className="text-[9px] font-mono px-2 py-0.5 rounded border backdrop-blur-md font-semibold whitespace-nowrap shadow-md"
            style={{
              backgroundColor: 'rgba(5, 7, 11, 0.85)',
              borderColor: `${node.color}55`,
              color: node.color
            }}
          >
            {node.name}
          </span>
        ))}
      </div>
    </div>
  );
}
export default AlgoGraphScene;
