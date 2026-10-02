import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SatelliteCommandGlobe() {
  const globeRef = useRef<THREE.Group>(null!);
  const orbitRef = useRef<THREE.Group>(null!);
  const satelliteMeshRef = useRef<THREE.Mesh>(null!);
  const thermalGroupRef = useRef<THREE.Group>(null!);

  // Thermal anomaly points focused around the Indian subcontinent coordinate zone
  const thermalPoints = useMemo(() => {
    // Globe radius is 2.0
    // Lat: ~8 to ~35 N, Lon: ~68 to ~95 E
    const points: [number, number, number, number][] = [];
    for (let i = 0; i < 28; i++) {
      const lat = 12 + Math.random() * 20; // Deg North
      const lon = 72 + Math.random() * 18; // Deg East
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const r = 2.02;

      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);
      const intensity = 0.5 + Math.random() * 0.5;
      points.push([x, y, z, intensity]);
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.08;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z = time * 0.25;
      orbitRef.current.rotation.x = Math.PI / 3.5;
    }
    if (thermalGroupRef.current) {
      // Pulse anomaly markers
      const pulse = 1 + Math.sin(time * 3) * 0.25;
      thermalGroupRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Globe Core */}
      <group ref={globeRef}>
        {/* Base Sphere */}
        <mesh>
          <sphereGeometry args={[2, 36, 36]} />
          <meshStandardMaterial
            color="#0B1528"
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>

        {/* Wireframe Grid Layer */}
        <mesh>
          <sphereGeometry args={[2.01, 24, 24]} />
          <meshBasicMaterial
            color="#3B82F6"
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>

        {/* Atmospheric Glow Shell */}
        <mesh>
          <sphereGeometry args={[2.08, 32, 32]} />
          <meshBasicMaterial
            color="#60A5FA"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Highlighted Region Ring (Indian Peninsula Target Sector) */}
        <group position={[0.7, 0.7, 1.65]} rotation={[0.4, 0.3, 0]}>
          <mesh>
            <ringGeometry args={[0.35, 0.42, 32]} />
            <meshBasicMaterial color="#EF4444" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Thermal Hotspots */}
        <group ref={thermalGroupRef}>
          {thermalPoints.map(([x, y, z, intensity], idx) => (
            <mesh key={idx} position={[x, y, z]}>
              <sphereGeometry args={[0.035 * intensity, 8, 8]} />
              <meshBasicMaterial
                color={intensity > 0.8 ? '#EF4444' : '#F97316'}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* Satellite Orbit Path Ring */}
      <group ref={orbitRef}>
        <mesh>
          <torusGeometry args={[2.7, 0.015, 16, 100]} />
          <meshBasicMaterial color="#60A5FA" transparent opacity={0.3} />
        </mesh>

        {/* Satellite Unit */}
        <group position={[2.7, 0, 0]}>
          <mesh ref={satelliteMeshRef}>
            <boxGeometry args={[0.18, 0.12, 0.12]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Solar Panels */}
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[0.08, 0.22, 0.02]} />
            <meshStandardMaterial color="#2563EB" emissive="#1D4ED8" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, -0.18, 0]}>
            <boxGeometry args={[0.08, 0.22, 0.02]} />
            <meshStandardMaterial color="#2563EB" emissive="#1D4ED8" emissiveIntensity={0.5} />
          </mesh>
          {/* Downlink Beam to Surface */}
          <mesh position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.01, 0.06, 0.7, 8]} />
            <meshBasicMaterial color="#60A5FA" transparent opacity={0.25} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export function PyravexGlobeScene() {
  return (
    <div className="w-full h-full min-h-[380px] relative">
      <Canvas
        camera={{ position: [0, 1.2, 5.0], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-4, -3, -2]} color="#EF4444" intensity={1.0} distance={10} />
        <pointLight position={[3, 4, 3]} color="#3B82F6" intensity={1.5} distance={15} />

        <SatelliteCommandGlobe />
      </Canvas>

      {/* Overlay telemetry HUD */}
      <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-1 text-[11px] font-mono text-blue-400/90 bg-black/60 p-3 rounded-lg border border-blue-500/20 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-white font-semibold">FIRMS SATELLITE TELEMETRY</span>
        </div>
        <div className="text-slate-400">Sensor: MODIS / VIIRS Terra-Aqua</div>
        <div className="text-slate-400">Region: South Asia / IND Grid</div>
        <div className="text-emerald-400">Status: Automated Anomaly Clustering</div>
      </div>
    </div>
  );
}
export default PyravexGlobeScene;
