import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface DsaConcept {
  id: string;
  name: string;
  pos: [number, number, number];
  color: string;
  patterns: string[];
  description: string;
}

export const DSA_CONCEPTS: DsaConcept[] = [
  {
    id: 'arrays',
    name: 'ARRAYS',
    pos: [-2.2, 1.2, 0],
    color: '#38BDF8',
    patterns: ['Two Pointers', 'Sliding Window', 'Prefix Sums'],
    description: 'Contiguous memory access, two-pointer convergence, and window sliding optimizations.'
  },
  {
    id: 'hashing',
    name: 'HASHING',
    pos: [-0.8, 1.5, -0.4],
    color: '#F43F5E',
    patterns: ['Hash Maps', 'Hash Sets', 'Rolling Hash'],
    description: 'Amortized O(1) lookups, frequency counting, and collision resolution strategies.'
  },
  {
    id: 'stacks',
    name: 'STACKS',
    pos: [0.9, 1.3, 0.2],
    color: '#F59E0B',
    patterns: ['Monotonic Stack', 'Parentheses Validation', 'Evaluation'],
    description: 'LIFO structures, monotonic order preservation, and expression parsing.'
  },
  {
    id: 'queues',
    name: 'QUEUES',
    pos: [2.3, 1.2, -0.2],
    color: '#10B981',
    patterns: ['Circular Queue', 'Deque', 'BFS Traversal Queue'],
    description: 'FIFO buffer semantics and level-order state queueing.'
  },
  {
    id: 'trees',
    name: 'TREES',
    pos: [2.1, -0.5, -0.4],
    color: '#22D3EE',
    patterns: ['Binary Search Tree', 'LCA', 'Inorder / Postorder'],
    description: 'Hierarchical node partitioning, recursion invariants, and balanced trees.'
  },
  {
    id: 'graphs',
    name: 'GRAPHS',
    pos: [1.1, -1.5, 0.2],
    color: '#8B5CF6',
    patterns: ['BFS', 'DFS', 'Dijkstra', 'Topological Sort'],
    description: 'Adjacency structures, connected components, shortest path, and cycle detection.'
  },
  {
    id: 'dp',
    name: 'DP',
    pos: [-0.6, -1.6, 0.4],
    color: '#EC4899',
    patterns: ['Memoization', 'Tabulation', 'State Compression'],
    description: 'Optimal substructure, overlapping subproblems, and state-transition equations.'
  },
  {
    id: 'linked-lists',
    name: 'LINKED LISTS',
    pos: [-2.1, -0.8, -0.2],
    color: '#6366F1',
    patterns: ['Fast & Slow Pointer', 'Reversal', 'Merge Sorted'],
    description: 'Pointer manipulation, cycle detection (Floyd’s algorithm), and in-place node reordering.'
  }
];

function AlgoNodesMesh({ activeId }: { activeId: string }) {
  const groupRef = useRef<THREE.Group>(null!);

  const linePositions = useMemo(() => {
    const coords: number[] = [];
    const n = DSA_CONCEPTS.length;
    for (let i = 0; i < n; i++) {
      const next = (i + 1) % n;
      coords.push(DSA_CONCEPTS[i].pos[0], DSA_CONCEPTS[i].pos[1], DSA_CONCEPTS[i].pos[2]);
      coords.push(DSA_CONCEPTS[next].pos[0], DSA_CONCEPTS[next].pos[1], DSA_CONCEPTS[next].pos[2]);

      const cross = (i + 3) % n;
      coords.push(DSA_CONCEPTS[i].pos[0], DSA_CONCEPTS[i].pos[1], DSA_CONCEPTS[i].pos[2]);
      coords.push(DSA_CONCEPTS[cross].pos[0], DSA_CONCEPTS[cross].pos[1], DSA_CONCEPTS[cross].pos[2]);
    }
    return new Float32Array(coords);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.08;
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

      {DSA_CONCEPTS.map((node) => {
        const isSelected = activeId === node.id;
        return (
          <group key={node.id} position={node.pos as [number, number, number]}>
            <mesh>
              <sphereGeometry args={[isSelected ? 0.28 : 0.18, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isSelected ? 1.5 : 0.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function AlgoGraphScene() {
  const [activeConcept, setActiveConcept] = useState<DsaConcept>(DSA_CONCEPTS[5]); // Default GRAPHS

  return (
    <div className="w-full h-full min-h-[380px] relative flex flex-col justify-between p-4">
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 46 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[4, 4, 4]} color="#38BDF8" intensity={1.5} />
          <pointLight position={[-4, -4, -4]} color="#A855F7" intensity={1.2} />
          <AlgoNodesMesh activeId={activeConcept.id} />
        </Canvas>
      </div>

      {/* Top Telemetry Header */}
      <div className="relative z-10 text-[10px] font-mono text-slate-400 bg-black/75 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-md self-start">
        <span>ALGORITHMIC PATTERNS GRAPH • HOVER OR CLICK NODE</span>
      </div>

      {/* Bottom Interactive Concept Inspector & Pattern Pills */}
      <div className="relative z-10 flex flex-col gap-2">
        {/* Active Node Detail Card */}
        <div className="p-3 rounded-xl bg-[#080D16]/95 border border-slate-800 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-bold" style={{ color: activeConcept.color }}>
              [{activeConcept.name}] — {activeConcept.description}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[10px] font-mono text-slate-400">Core Patterns:</span>
            {activeConcept.patterns.map((pat, pIdx) => (
              <span
                key={pIdx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#05070B] border border-slate-700/80 text-slate-200"
              >
                {pat}
              </span>
            ))}
          </div>
        </div>

        {/* Node Buttons Selector */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {DSA_CONCEPTS.map((concept) => (
            <button
              key={concept.id}
              type="button"
              onClick={() => setActiveConcept(concept)}
              onMouseEnter={() => setActiveConcept(concept)}
              className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-all ${
                activeConcept.id === concept.id
                  ? 'border-white text-white font-bold scale-105'
                  : 'border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              style={{
                backgroundColor: activeConcept.id === concept.id ? concept.color : 'rgba(5, 7, 11, 0.85)',
                borderColor: activeConcept.id === concept.id ? '#FFFFFF' : `${concept.color}40`,
                color: activeConcept.id === concept.id ? '#FFFFFF' : concept.color
              }}
            >
              {concept.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default AlgoGraphScene;
