import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInView } from '../../hooks/useInView';

interface SceneProps {
  mouse?: { normalizedX: number; normalizedY: number };
  scrollY?: number;
}

function IntelligenceCore() {
  const outerSphereRef = useRef<THREE.Mesh>(null!);
  const innerPolyRef = useRef<THREE.Mesh>(null!);
  const orbitGroup1Ref = useRef<THREE.Group>(null!);
  const orbitGroup2Ref = useRef<THREE.Group>(null!);
  const pulsesRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    // Subtle rotation + gentle parallax using direct R3F pointer
    const targetRotX = pointerY * 0.25 + time * 0.12 + scrollY * 0.0008;
    const targetRotY = pointerX * 0.35 + time * 0.18 + scrollY * 0.001;

    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.x = THREE.MathUtils.lerp(outerSphereRef.current.rotation.x, targetRotX, 0.04);
      outerSphereRef.current.rotation.y = THREE.MathUtils.lerp(outerSphereRef.current.rotation.y, targetRotY, 0.04);
    }

    if (innerPolyRef.current) {
      innerPolyRef.current.rotation.x = -targetRotX * 1.1;
      innerPolyRef.current.rotation.y = -targetRotY * 1.1;
      const pulse = 1 + Math.sin(time * 1.8) * 0.04;
      innerPolyRef.current.scale.set(pulse, pulse, pulse);
    }

    // Trajectory orbital rotations
    if (orbitGroup1Ref.current) {
      orbitGroup1Ref.current.rotation.z = time * 0.15;
      orbitGroup1Ref.current.rotation.x = 1.15 + pointerY * 0.1;
    }

    if (orbitGroup2Ref.current) {
      orbitGroup2Ref.current.rotation.z = -time * 0.12;
      orbitGroup2Ref.current.rotation.y = 0.8 + pointerX * 0.1;
    }

    // Traveling telemetry packet signal pulse
    if (pulsesRef.current) {
      pulsesRef.current.rotation.z = time * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* LAYER 3: Central Wireframe Intelligence Sphere */}
      <mesh ref={outerSphereRef}>
        <icosahedronGeometry args={[2.3, 2]} />
        <meshStandardMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.3}
          emissive="#1E3A8A"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Inner Intelligence Core Lattice */}
      <mesh ref={innerPolyRef}>
        <octahedronGeometry args={[1.35, 1]} />
        <meshPhysicalMaterial
          color="#8B5CF6"
          emissive="#4C1D95"
          emissiveIntensity={0.9}
          roughness={0.25}
          metalness={0.7}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* LAYER 5: Trajectory Rings */}
      <group ref={orbitGroup1Ref}>
        <mesh>
          <torusGeometry args={[3.2, 0.015, 16, 120]} />
          <meshBasicMaterial color="#60A5FA" transparent opacity={0.35} />
        </mesh>

        {/* LAYER 4: Orbiting Data Nodes */}
        <mesh position={[3.2, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
        <mesh position={[-3.2, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#C084FC" />
        </mesh>
      </group>

      <group ref={orbitGroup2Ref}>
        <mesh>
          <torusGeometry args={[3.6, 0.012, 16, 120]} />
          <meshBasicMaterial color="#818CF8" transparent opacity={0.25} />
        </mesh>
        <mesh position={[0, 3.6, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#22D3EE" />
        </mesh>
      </group>

      {/* LAYER 6 & 7: Signal Pulses & Telemetry Packets */}
      <group ref={pulsesRef}>
        <mesh position={[2.3 * Math.cos(1), 2.3 * Math.sin(1), 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#F43F5E" />
        </mesh>
      </group>
    </group>
  );
}

// LAYER 1: Deep-Space Particle Field
function DeepSpaceField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 380;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cBlue = new THREE.Color('#3B82F6');
    const cViolet = new THREE.Color('#8B5CF6');
    const cCyan = new THREE.Color('#22D3EE');

    for (let i = 0; i < count; i++) {
      const radius = 3.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const seed = Math.random();
      const mixed = seed > 0.6 ? cBlue : seed > 0.3 ? cViolet : cCyan;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// LAYER 2: Faint Coordinate / Grid System in Space
function CoordinateGrid() {
  return (
    <group position={[0, -2.8, -1]} rotation={[-Math.PI / 2.3, 0, 0]}>
      <gridHelper args={[24, 24, '#1E293B', '#0F172A']} />
    </group>
  );
}

export function Hero3DScene({ mouse, scrollY }: SceneProps = {}) {
  const { ref, isInView } = useInView({ rootMargin: '200px 0px' });

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden">
      <Canvas
        frameloop={isInView ? 'always' : 'never'}
        camera={{ position: [0, 0, 7.5], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[6, 6, 6]} color="#3B82F6" intensity={1.4} distance={22} />
        <pointLight position={[-6, -4, -4]} color="#8B5CF6" intensity={1.2} distance={22} />
        <directionalLight position={[0, 8, 4]} intensity={0.5} />

        <CoordinateGrid />
        <IntelligenceCore />
        <DeepSpaceField />
      </Canvas>
    </div>
  );
}
export default Hero3DScene;
