import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneProps {
  mouse: { normalizedX: number; normalizedY: number };
  scrollY: number;
}

function MorphingCore({ mouse, scrollY }: SceneProps) {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Slow rotation + mouse parallax responsiveness
    const targetRotX = mouse.normalizedY * 0.4 + time * 0.15 + scrollY * 0.001;
    const targetRotY = mouse.normalizedX * 0.6 + time * 0.25 + scrollY * 0.0015;

    outerRef.current.rotation.x = THREE.MathUtils.lerp(outerRef.current.rotation.x, targetRotX, 0.05);
    outerRef.current.rotation.y = THREE.MathUtils.lerp(outerRef.current.rotation.y, targetRotY, 0.05);

    innerRef.current.rotation.x = -targetRotX * 1.2;
    innerRef.current.rotation.y = -targetRotY * 1.2;

    ringRef.current.rotation.z = time * 0.1;
    ringRef.current.rotation.x = 1.1 + mouse.normalizedY * 0.2;

    // Morph pulse
    const scale = 1 + Math.sin(time * 1.5) * 0.05;
    innerRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Geometric Wireframe Mesh */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.35}
          emissive="#1E3A8A"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Inner Multifaceted Glowing Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.3, 0]} />
        <meshPhysicalMaterial
          color="#8B5CF6"
          emissive="#6D28D9"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          wireframe={false}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Orbital Accent Ring */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[3.2, 0.02, 16, 100]} />
          <meshBasicMaterial color="#60A5FA" transparent opacity={0.4} />
        </mesh>
        <mesh position={[3.2, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#93C5FD" />
        </mesh>
        <mesh position={[-3.2, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#C084FC" />
        </mesh>
      </group>
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 350;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color('#3B82F6');
    const c2 = new THREE.Color('#8B5CF6');
    const c3 = new THREE.Color('#38BDF8');

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const mixed = Math.random() > 0.5 ? c1.clone().lerp(c2, Math.random()) : c3;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export function Hero3DScene({ mouse, scrollY }: SceneProps) {
  return (
    <div className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} color="#3B82F6" intensity={1.5} distance={20} />
        <pointLight position={[-6, -4, -4]} color="#8B5CF6" intensity={1.2} distance={20} />
        <directionalLight position={[0, 8, 4]} intensity={0.6} />

        <MorphingCore mouse={mouse} scrollY={scrollY} />
        <ParticleField />
      </Canvas>
    </div>
  );
}
export default Hero3DScene;
