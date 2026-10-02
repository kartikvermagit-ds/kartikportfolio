import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInView } from '../../hooks/useInView';

const SYSTEM_NODES = [
  { label: 'AI', position: [0, 1.8, 0], color: '#A855F7', desc: 'Neural / LLM Inference' },
  { label: 'DATA', position: [2.2, 0.8, -0.5], color: '#38BDF8', desc: 'Geospatial & Analytics' },
  { label: 'SYSTEMS', position: [1.8, -1.2, 0.5], color: '#3B82F6', desc: 'Microservices & Scale' },
  { label: 'CODE', position: [-1.8, -1.2, 0.5], color: '#10B981', desc: 'C++, Python, TypeScript' },
  { label: 'WEB', position: [-2.2, 0.8, -0.5], color: '#F59E0B', desc: 'React, Electron, UI' },
  { label: 'DSA', position: [0, -1.8, 0], color: '#EC4899', desc: 'Algorithms & Structures' },
  { label: 'KERNEL', position: [0, 0, 0], color: '#6366F1', desc: 'Execution Core' },
];

function NetworkGraph({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const linePositions = useMemo(() => {
    const points: number[] = [];
    const n = SYSTEM_NODES.length;

    for (let i = 0; i < n - 1; i++) {
      points.push(SYSTEM_NODES[i].position[0], SYSTEM_NODES[i].position[1], SYSTEM_NODES[i].position[2]);
      points.push(SYSTEM_NODES[n - 1].position[0], SYSTEM_NODES[n - 1].position[1], SYSTEM_NODES[n - 1].position[2]);

      const nextIdx = (i + 1) % (n - 1);
      points.push(SYSTEM_NODES[i].position[0], SYSTEM_NODES[i].position[1], SYSTEM_NODES[i].position[2]);
      points.push(SYSTEM_NODES[nextIdx].position[0], SYSTEM_NODES[nextIdx].position[1], SYSTEM_NODES[nextIdx].position[2]);
    }

    return new Float32Array(points);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18 + scrollProgress * 2;
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3B82F6" transparent opacity={0.4} />
      </lineSegments>

      {SYSTEM_NODES.map((node, idx) => (
        <group key={idx} position={node.position as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[node.label === 'KERNEL' ? 0.32 : 0.2, 24, 24]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.4}
              roughness={0.2}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.26, 0.32, 32]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function BrainNetworkScene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="w-full h-[450px] relative">
      <Canvas
        frameloop={isInView ? 'always' : 'never'}
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} color="#60A5FA" intensity={1.5} />
        <pointLight position={[-5, -5, -5]} color="#C084FC" intensity={1} />
        <NetworkGraph scrollProgress={scrollProgress} />
      </Canvas>

      {/* Floating System HUD Node Badges */}
      <div className="absolute inset-0 pointer-events-none flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-4">
        {SYSTEM_NODES.map((node, i) => (
          <div
            key={i}
            className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold tracking-wider border shadow-lg backdrop-blur-md transition-all hover:scale-105 pointer-events-auto"
            style={{
              backgroundColor: 'rgba(5, 7, 11, 0.85)',
              borderColor: `${node.color}55`,
              color: node.color,
              boxShadow: `0 0 14px ${node.color}25`
            }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: node.color }} />
            {node.label} <span className="text-slate-400 font-normal hidden sm:inline">• {node.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BrainNetworkScene;
