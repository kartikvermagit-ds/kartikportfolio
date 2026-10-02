import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  Search,
  Settings,
  ShieldCheck,
  Layers,
  CloudUpload,
  LineChart,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Compass,
  CheckCircle2,
  Activity,
  Globe2,
  Zap
} from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

// ============================================================================
// SCIENTIFIC PLANETARY DATA INTERFACES & CONFIGURATION
// Reference: NASA Planetary Fact Sheets (Compressed Visual Timescale)
// ============================================================================

export interface CelestialStation {
  id: string;
  isOrigin?: boolean;
  isEndpoint?: boolean;
  stageNumber?: string;
  stageName: string;
  stageSummary: string;
  stageAction: string;
  planetName: string;
  planetType: 'rocky' | 'gas_giant' | 'ice_giant' | 'star';
  textureSrc: string;
  size: number; // Presentation UI size in px
  axialTilt: number; // Degrees based on NASA values
  rotationPeriodSec: number; // Visual timescale seconds per rotation
  rotationDirection: 'prograde' | 'retrograde';
  orbitalOscillationSec: number; // Subtle harmonic sway along orbit (Mercury fastest -> Neptune slowest)
  hasAtmosphere: boolean;
  atmosphereColor?: string;
  hasRings?: 'saturn' | 'uranus';
  accentColor: string;
  accentBadge: 'blue' | 'amber' | 'cyan' | 'orange' | 'indigo' | 'emerald';
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  specs: {
    realPeriod: string;
    distanceAU: string;
    tiltFormatted: string;
    atmosphereDetail: string;
    diameterKm: string;
  };
}

export const SOLAR_SYSTEM_STATIONS: CelestialStation[] = [
  {
    id: 'sun-idea',
    isOrigin: true,
    stageName: 'Idea',
    stageSummary: 'Raw Concept & Ambiguous Need',
    stageAction: 'Genesis Point',
    planetName: 'SOL / THE SUN',
    planetType: 'star',
    textureSrc: '/planets/sun.jpg',
    size: 82,
    axialTilt: 7.25,
    rotationPeriodSec: 40,
    rotationDirection: 'prograde',
    orbitalOscillationSec: 0,
    hasAtmosphere: true,
    atmosphereColor: 'rgba(245, 158, 11, 0.95)',
    accentColor: '#F59E0B',
    accentBadge: 'amber',
    icon: Lightbulb,
    specs: {
      realPeriod: '25-35 Earth Days',
      distanceAU: '0.00 AU (Origin)',
      tiltFormatted: '7.25°',
      atmosphereDetail: 'Hydrogen-Helium Plasma Corona',
      diameterKm: '1,392,700 km'
    }
  },
  {
    id: 'mercury-problem',
    stageNumber: '01',
    stageName: 'Problem',
    stageSummary: 'Identify Real Constraint',
    stageAction: 'Define Boundary & Failure Modes',
    planetName: 'MERCURY',
    planetType: 'rocky',
    textureSrc: '/planets/mercury.jpg',
    size: 34,
    axialTilt: 0.034,
    rotationPeriodSec: 36, // Slow rotation
    rotationDirection: 'prograde',
    orbitalOscillationSec: 4.2, // Fastest orbital revolution
    hasAtmosphere: false, // Stark cratered surface, NO atmospheric glow
    accentColor: '#94A3B8',
    accentBadge: 'blue',
    icon: Target,
    specs: {
      realPeriod: '58.6 Earth Days',
      distanceAU: '0.39 AU',
      tiltFormatted: '0.03° (Nearly Vertical)',
      atmosphereDetail: 'No Atmosphere // Heavy Cratered Basalt',
      diameterKm: '4,879 km'
    }
  },
  {
    id: 'venus-research',
    stageNumber: '02',
    stageName: 'Research',
    stageSummary: 'Explore Existing Solutions',
    stageAction: 'Catalog State of the Art & Gaps',
    planetName: 'VENUS',
    planetType: 'rocky',
    textureSrc: '/planets/venus.jpg',
    size: 42,
    axialTilt: 177.3, // Inverted pole -> Retrograde rotation
    rotationPeriodSec: 54, // Extremely slow visual scale
    rotationDirection: 'retrograde', // Rotates backwards!
    orbitalOscillationSec: 6.0,
    hasAtmosphere: true,
    atmosphereColor: 'rgba(253, 224, 71, 0.55)', // Thick yellowish cream haze
    accentColor: '#F59E0B',
    accentBadge: 'amber',
    icon: Search,
    specs: {
      realPeriod: '243 Earth Days (Retrograde)',
      distanceAU: '0.72 AU',
      tiltFormatted: '177.3° (Clockwise Spin)',
      atmosphereDetail: 'Dense Cloud Deck // Super-Rotating Sulfuric Clouds',
      diameterKm: '12,104 km'
    }
  },
  {
    id: 'earth-prototype',
    stageNumber: '03',
    stageName: 'Prototype',
    stageSummary: 'Minimal Viable Pipeline',
    stageAction: 'Build Working Dynamic Subsystems',
    planetName: 'EARTH',
    planetType: 'rocky',
    textureSrc: '/planets/earth.jpg',
    size: 46,
    axialTilt: 23.44,
    rotationPeriodSec: 18, // Medium rotation
    rotationDirection: 'prograde',
    orbitalOscillationSec: 7.8,
    hasAtmosphere: true,
    atmosphereColor: 'rgba(56, 189, 248, 0.75)', // Deep blue atmospheric rim
    accentColor: '#38BDF8',
    accentBadge: 'cyan',
    icon: Settings,
    specs: {
      realPeriod: '23.93 Hours',
      distanceAU: '1.00 AU',
      tiltFormatted: '23.4° (Seasonal Seasons)',
      atmosphereDetail: 'N2-O2 Atmosphere // Oceans, Continents & Clouds',
      diameterKm: '12,742 km'
    }
  },
  {
    id: 'mars-validate',
    stageNumber: '04',
    stageName: 'Validate',
    stageSummary: 'Stress & Conflict Tests',
    stageAction: 'Chaos Testing & Edge Invariants',
    planetName: 'MARS',
    planetType: 'rocky',
    textureSrc: '/planets/mars.jpg',
    size: 38,
    axialTilt: 25.19,
    rotationPeriodSec: 18.5, // 24.6h sol
    rotationDirection: 'prograde',
    orbitalOscillationSec: 9.8,
    hasAtmosphere: true,
    atmosphereColor: 'rgba(239, 68, 68, 0.35)', // Faint red atmospheric limb
    accentColor: '#F97316',
    accentBadge: 'orange',
    icon: ShieldCheck,
    specs: {
      realPeriod: '24.62 Hours (1 Sol)',
      distanceAU: '1.52 AU',
      tiltFormatted: '25.2°',
      atmosphereDetail: 'Thin CO2 // Volcanic Basalt, Maria & Polar Caps',
      diameterKm: '6,779 km'
    }
  },
  {
    id: 'jupiter-build',
    stageNumber: '05',
    stageName: 'Build',
    stageSummary: 'Modular Implementation',
    stageAction: 'Scalable Production Architecture',
    planetName: 'JUPITER',
    planetType: 'gas_giant',
    textureSrc: '/planets/jupiter.jpg',
    size: 72, // Large gas giant
    axialTilt: 3.13,
    rotationPeriodSec: 8.5, // Fastest rotation in solar system!
    rotationDirection: 'prograde',
    orbitalOscillationSec: 13.5,
    hasAtmosphere: true,
    atmosphereColor: 'rgba(245, 158, 11, 0.4)',
    accentColor: '#818CF8',
    accentBadge: 'indigo',
    icon: Layers,
    specs: {
      realPeriod: '9.93 Hours (Fastest in Solar System)',
      distanceAU: '5.20 AU',
      tiltFormatted: '3.1° (Stable Axis)',
      atmosphereDetail: 'Horizontal Cloud Belts // Great Red Spot Anticyclone',
      diameterKm: '139,820 km'
    }
  },
  {
    id: 'saturn-deploy',
    stageNumber: '06',
    stageName: 'Deploy',
    stageSummary: 'Cloud & Client Delivery',
    stageAction: 'Zero-Downtime Rollout & Pipelines',
    planetName: 'SATURN',
    planetType: 'gas_giant',
    textureSrc: '/planets/saturn.jpg',
    size: 68, // 68px globe + 164px rings
    axialTilt: 26.73,
    rotationPeriodSec: 9.2, // Fast rotation
    rotationDirection: 'prograde',
    orbitalOscillationSec: 16.5,
    hasAtmosphere: true,
    atmosphereColor: 'rgba(234, 179, 8, 0.45)', // Pale golden gas giant
    hasRings: 'saturn',
    accentColor: '#FBBF24',
    accentBadge: 'amber',
    icon: CloudUpload,
    specs: {
      realPeriod: '10.7 Hours',
      distanceAU: '9.58 AU',
      tiltFormatted: '26.7°',
      atmosphereDetail: 'Golden Ammonia Belts // Multi-Layered Rings & Cassini Gap',
      diameterKm: '116,460 km'
    }
  },
  {
    id: 'uranus-iterate',
    stageNumber: '07',
    stageName: 'Iterate',
    stageSummary: 'Performance & Refinement',
    stageAction: 'Telemetry Monitoring & Profiling',
    planetName: 'URANUS',
    planetType: 'ice_giant',
    textureSrc: '/planets/uranus.jpg',
    size: 50,
    axialTilt: 97.77, // Extreme axial tilt (rolls on side!)
    rotationPeriodSec: 12.0, // Fast
    rotationDirection: 'prograde',
    orbitalOscillationSec: 21.0,
    hasAtmosphere: true,
    atmosphereColor: 'rgba(34, 211, 238, 0.55)', // Cyan blue-green
    hasRings: 'uranus',
    accentColor: '#06B6D4',
    accentBadge: 'cyan',
    icon: LineChart,
    specs: {
      realPeriod: '17.24 Hours',
      distanceAU: '19.2 AU',
      tiltFormatted: '97.8° (Extreme Sideways Tilt)',
      atmosphereDetail: 'Pale Cyan Methane Haze // Faint Thin Ring System',
      diameterKm: '50,724 km'
    }
  },
  {
    id: 'neptune-system',
    isEndpoint: true,
    stageNumber: 'SYS',
    stageName: 'System',
    stageSummary: 'Verified Production System',
    stageAction: 'Mission Complete // Operational',
    planetName: 'NEPTUNE',
    planetType: 'ice_giant',
    textureSrc: '/planets/neptune.jpg',
    size: 50,
    axialTilt: 28.32,
    rotationPeriodSec: 11.0,
    rotationDirection: 'prograde',
    orbitalOscillationSec: 26.0, // Slowest revolution
    hasAtmosphere: true,
    atmosphereColor: 'rgba(37, 99, 235, 0.75)', // Deep royal blue
    accentColor: '#10B981',
    accentBadge: 'emerald',
    icon: CheckCircle2,
    specs: {
      realPeriod: '16.11 Hours',
      distanceAU: '30.1 AU (System Perimeter)',
      tiltFormatted: '28.3°',
      atmosphereDetail: 'Deep Azure Methane Atmosphere // High-Altitude White Bands',
      diameterKm: '49,244 km'
    }
  }
];

// In-memory texture image cache
const textureCache = new Map<string, HTMLImageElement>();

function getPlanetImage(src: string): HTMLImageElement {
  if (textureCache.has(src)) {
    return textureCache.get(src)!;
  }
  const img = new Image();
  img.src = src;
  textureCache.set(src, img);
  return img;
}

// Preload all planetary textures on client start
if (typeof window !== 'undefined') {
  SOLAR_SYSTEM_STATIONS.forEach((station) => {
    getPlanetImage(station.textureSrc);
  });
}

// ============================================================================
// REALISTIC ASTRONOMICAL PLANET CANVAS RENDERER
// - True 3D Spherical Normal falloff & Directional Sunlight from IDEA (Left)
// - Real Axial Tilt
// - Smooth Continuous Rotation & Hover Deceleration without frame jumps
// - Multi-Band Saturn Rings with 3D Depth Sorting and Shadows
// - Earth secondary swirling cloud layer
// ============================================================================

interface PlanetCanvasProps {
  station: CelestialStation;
  isHovered: boolean;
  reducedMotion?: boolean;
}

export const AstronomicalPlanetCanvas: React.FC<PlanetCanvasProps> = ({
  station,
  isHovered,
  reducedMotion = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationOffsetRef = useRef<number>(0);
  const cloudOffsetRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const canvasWidth = station.hasRings === 'saturn' ? Math.max(station.size * 2.6, 176) : station.size * 1.5;
  const canvasHeight = station.hasRings === 'saturn' ? station.size * 1.5 : station.size * 1.5;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Retina 2x scale
    const dpr = Math.min(window.devicePixelRatio || 2, 2.5);
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    let isVisible = true;

    // Discontinue canvas animation when scrolled offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible) {
          lastTimeRef.current = performance.now();
          animFrameRef.current = requestAnimationFrame(render);
        }
      },
      { rootMargin: '100px 0px' }
    );
    observer.observe(canvas);

    const img = getPlanetImage(station.textureSrc);

    const render = (currentTime: number) => {
      if (!isVisible) return;
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const dt = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = currentTime;

      // Real relative rotation speed with smooth hover deceleration
      // When hovered, slow by 50% so user can inspect craters, cloud bands & Great Red Spot
      const speedMultiplier = isHovered ? 0.45 : 1.0;
      const basePixelsPerSec = (station.size * 2.2) / station.rotationPeriodSec;
      const speed = basePixelsPerSec * speedMultiplier;

      if (!reducedMotion) {
        if (station.rotationDirection === 'retrograde') {
          rotationOffsetRef.current -= speed * dt;
        } else {
          rotationOffsetRef.current += speed * dt;
        }
        // Earth cloud drift at different relative speed
        cloudOffsetRef.current += speed * 1.35 * dt;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const cx = canvasWidth / 2;
      const cy = canvasHeight / 2;
      const r = station.size / 2;
      const tiltRad = (station.axialTilt * Math.PI) / 180;

      // ----------------------------------------------------------------------
      // PASS 1: BACK RINGS (Rendered behind globe for 3D depth)
      // ----------------------------------------------------------------------
      if (station.hasRings === 'saturn') {
        drawSaturnRingsHalf(ctx, cx, cy, r, tiltRad, false, isHovered);
      } else if (station.hasRings === 'uranus') {
        drawUranusRingsHalf(ctx, cx, cy, r, tiltRad, false);
      }

      // ----------------------------------------------------------------------
      // PASS 2: PLANETARY SPHERE GLOBE WITH ROTATING TEXTURE
      // ----------------------------------------------------------------------
      ctx.save();
      ctx.translate(cx, cy);

      // Apply authentic axial tilt to planet rotation
      ctx.rotate(tiltRad);

      // Clip to circular planetary horizon
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.clip();

      if (img.complete && img.naturalWidth > 0) {
        // Equirectangular 2:1 projection
        const imgH = r * 2;
        const imgW = img.naturalWidth * (imgH / img.naturalHeight);

        // Normalize seamless wrap
        const wrapOffset = ((rotationOffsetRef.current % imgW) + imgW) % imgW;

        // Draw seamless double texture strip
        ctx.drawImage(img, -wrapOffset, -r, imgW, imgH);
        ctx.drawImage(img, -wrapOffset + imgW, -r, imgW, imgH);
        if (wrapOffset > imgW - r * 2) {
          ctx.drawImage(img, -wrapOffset - imgW, -r, imgW, imgH);
        }

        // Earth Secondary Swirling Cloud Layer
        if (station.id === 'earth-prototype') {
          ctx.save();
          ctx.globalAlpha = 0.38;
          ctx.globalCompositeOperation = 'screen';
          const cloudWrap = ((cloudOffsetRef.current % imgW) + imgW) % imgW;
          ctx.drawImage(img, -cloudWrap, -r, imgW, imgH);
          ctx.drawImage(img, -cloudWrap + imgW, -r, imgW, imgH);
          ctx.restore();
        }
      } else {
        // Fallback procedural shading while image loads
        ctx.fillStyle = station.accentColor;
        ctx.fill();
      }

      ctx.restore(); // Restore tilt transform so directional sunlight is NOT tilted!

      // ----------------------------------------------------------------------
      // PASS 3: DIRECTIONAL SUNLIGHT & SPHERICAL LIGHTING (Sun is to the Left)
      // ----------------------------------------------------------------------
      if (!station.isOrigin) {
        ctx.save();
        ctx.translate(cx, cy);

        // Clip to sphere again for lighting mask
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.clip();

        // Directional Sunlight coming strictly from the left (IDEA Genesis Sun)
        // Center of specular light at x = -r * 0.42
        const sunLightGrad = ctx.createRadialGradient(
          -r * 0.42,
          -r * 0.05,
          r * 0.08,
          0,
          0,
          r * 1.15
        );
        const sunSpecular = isHovered ? 'rgba(255, 250, 230, 0.65)' : 'rgba(255, 245, 215, 0.48)';
        sunLightGrad.addColorStop(0, sunSpecular);
        sunLightGrad.addColorStop(0.28, 'rgba(255, 255, 255, 0.08)');
        sunLightGrad.addColorStop(0.55, 'rgba(0, 0, 0, 0.25)'); // Terminator threshold
        sunLightGrad.addColorStop(0.78, 'rgba(0, 0, 0, 0.85)'); // Night side darkening
        sunLightGrad.addColorStop(1, 'rgba(0, 0, 0, 0.98)'); // Deep space shadow

        ctx.fillStyle = sunLightGrad;
        ctx.fillRect(-r, -r, r * 2, r * 2);

        // Lambertian Spherical Limb Darkening (Curves the 2D surface into 3D)
        const limbGrad = ctx.createRadialGradient(0, 0, r * 0.4, 0, 0, r);
        limbGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        limbGrad.addColorStop(0.82, 'rgba(0, 0, 0, 0.18)');
        limbGrad.addColorStop(1, 'rgba(0, 0, 0, 0.7)');

        ctx.fillStyle = limbGrad;
        ctx.fillRect(-r, -r, r * 2, r * 2);

        ctx.restore();
      }

      // ----------------------------------------------------------------------
      // PASS 4: ATMOSPHERIC LIMB & FRESNEL GLOW
      // ----------------------------------------------------------------------
      if (station.hasAtmosphere && station.atmosphereColor) {
        ctx.save();
        ctx.translate(cx, cy);

        // Sunlit Atmospheric Crescent Rim on the sunward (left) side
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.lineWidth = isHovered ? 2.5 : 1.6;
        ctx.strokeStyle = station.atmosphereColor;
        ctx.stroke();

        ctx.restore();
      }

      // ----------------------------------------------------------------------
      // PASS 5: FRONT RINGS (Rendered OVER globe for true 3D perspective)
      // ----------------------------------------------------------------------
      if (station.hasRings === 'saturn') {
        drawSaturnRingsHalf(ctx, cx, cy, r, tiltRad, true, isHovered);
      } else if (station.hasRings === 'uranus') {
        drawUranusRingsHalf(ctx, cx, cy, r, tiltRad, true);
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [station, isHovered, reducedMotion, canvasWidth, canvasHeight]);

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        width: canvasWidth,
        height: canvasHeight
      }}
    >
      {/* Ambient Atmospheric Halo Glow on Hover */}
      {station.hasAtmosphere && (
        <div
          className="absolute rounded-full pointer-events-none transition-all duration-300 blur-md"
          style={{
            width: station.size,
            height: station.size,
            backgroundColor: station.atmosphereColor || station.accentColor,
            opacity: isHovered ? 0.45 : 0.15,
            transform: `scale(${isHovered ? 1.35 : 1.15})`
          }}
        />
      )}

      {/* The 2D Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none drop-shadow-2xl transition-transform duration-300"
        style={{
          transform: isHovered ? 'scale(1.12)' : 'scale(1.0)'
        }}
      />
    </div>
  );
};

// ============================================================================
// SATURN RINGS PROCEDURAL RENDERER WITH CASSINI DIVISION & REAL SHADOWS
// ============================================================================
function drawSaturnRingsHalf(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  tiltRad: number,
  isFront: boolean,
  isHovered: boolean
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(tiltRad);
  ctx.scale(1, 0.32); // Flatten into 3D perspective disc

  // Clip to either front or back half in tilted coordinate space
  ctx.beginPath();
  if (isFront) {
    // Front half (y > 0)
    ctx.rect(-r * 2.6, 0, r * 5.2, r * 2.6);
  } else {
    // Back half (y < 0)
    ctx.rect(-r * 2.6, -r * 2.6, r * 5.2, r * 2.6);
  }
  ctx.clip();

  // Multi-band realistic ring radial gradient based on Cassini discoveries
  const ringGrad = ctx.createRadialGradient(0, 0, r * 1.15, 0, 0, r * 2.45);
  ringGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  ringGrad.addColorStop(0.04, 'rgba(160, 130, 85, 0.22)'); // D Ring
  ringGrad.addColorStop(0.18, 'rgba(195, 170, 120, 0.58)'); // C Ring (Crepe)
  ringGrad.addColorStop(0.35, 'rgba(240, 222, 178, 0.95)'); // B Ring (Brightest & Densest)
  ringGrad.addColorStop(0.62, 'rgba(245, 230, 190, 0.98)');
  ringGrad.addColorStop(0.64, 'rgba(12, 10, 8, 0.95)'); // Cassini Division (Gap!)
  ringGrad.addColorStop(0.70, 'rgba(18, 14, 10, 0.92)');
  ringGrad.addColorStop(0.72, 'rgba(228, 205, 160, 0.88)'); // A Ring
  ringGrad.addColorStop(0.88, 'rgba(215, 190, 145, 0.80)');
  ringGrad.addColorStop(0.89, 'rgba(20, 16, 12, 0.75)'); // Encke Gap
  ringGrad.addColorStop(0.92, 'rgba(190, 165, 125, 0.45)'); // F Ring
  ringGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = ringGrad;
  ctx.beginPath();
  ctx.arc(0, 0, r * 2.45, 0, Math.PI * 2);
  ctx.fill();

  // Saturn casts a prominent dark shadow onto the right-rear ring plane
  if (!isFront) {
    const shadowGrad = ctx.createRadialGradient(r * 0.45, 0, 0, r * 0.45, 0, r * 1.8);
    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
    shadowGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.82)');
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.rect(0, -r * 2.6, r * 2.6, r * 2.6);
    ctx.fill();
  }

  // Specular ring glint on sunlit edge
  if (isFront && isHovered) {
    ctx.strokeStyle = 'rgba(255, 248, 220, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, 0, r * 2.4, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  ctx.restore();
}

// ============================================================================
// URANUS THIN FAINT RINGS (Tilted at 97.8°)
// ============================================================================
function drawUranusRingsHalf(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  tiltRad: number,
  isFront: boolean
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(tiltRad);
  ctx.scale(1, 0.2); // Tilted on edge

  ctx.beginPath();
  if (isFront) {
    ctx.rect(-r * 2.0, 0, r * 4.0, r * 2.0);
  } else {
    ctx.rect(-r * 2.0, -r * 2.0, r * 4.0, r * 2.0);
  }
  ctx.clip();

  const ringGrad = ctx.createRadialGradient(0, 0, r * 1.3, 0, 0, r * 1.85);
  ringGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  ringGrad.addColorStop(0.3, 'rgba(103, 232, 249, 0.25)');
  ringGrad.addColorStop(0.6, 'rgba(165, 243, 252, 0.55)');
  ringGrad.addColorStop(0.8, 'rgba(34, 211, 238, 0.25)');
  ringGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = ringGrad;
  ctx.beginPath();
  ctx.arc(0, 0, r * 1.85, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// ============================================================================
// CENTRAL SOLAR IDEA GENESIS COMPONENT
// - Radiates warm directional energy to all 8 planetary stages
// - Dynamic rotating sun texture & pulsating coronal prominence
// ============================================================================
export const SolarIdeaGenesis: React.FC<{ isHovered: boolean; onClick?: () => void }> = ({
  isHovered,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center justify-center cursor-pointer select-none group"
    >
      {/* Outer Solar Flare Waves */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.65, 0.35]
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-28 h-28 rounded-full pointer-events-none blur-xl bg-amber-500/30"
      />

      {/* Radiant Solar Corona Rim */}
      <div
        className="w-[84px] h-[84px] rounded-full relative flex flex-col items-center justify-center border-2 border-amber-300 shadow-2xl transition-transform duration-300 group-hover:scale-105"
        style={{
          boxShadow: isHovered
            ? '0 0 45px rgba(245, 158, 11, 0.8), 0 0 80px rgba(234, 88, 12, 0.5), inset 0 0 25px rgba(254, 240, 138, 0.9)'
            : '0 0 30px rgba(245, 158, 11, 0.6), 0 0 60px rgba(234, 88, 12, 0.35), inset 0 0 20px rgba(254, 240, 138, 0.7)'
        }}
      >
        {/* Animated Solar Texture Sphere */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <AstronomicalPlanetCanvas
            station={SOLAR_SYSTEM_STATIONS[0]}
            isHovered={isHovered}
          />
        </div>

        {/* Orbit resonance rings */}
        <div
          className="absolute -inset-2.5 rounded-full border border-amber-400/35 pointer-events-none animate-spin"
          style={{ animationDuration: '32s' }}
        />
        <div
          className="absolute -inset-5 rounded-full border border-dashed border-amber-500/25 pointer-events-none animate-spin"
          style={{ animationDuration: '48s', animationDirection: 'reverse' }}
        />

        {/* Sun Badge Foreground */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none bg-black/45 backdrop-blur-[2px] px-2.5 py-1 rounded-full border border-amber-400/40">
          <Lightbulb className="w-4 h-4 text-amber-300 fill-amber-300/80 drop-shadow mb-0.5" />
          <span className="text-[11px] font-heading font-black tracking-widest text-amber-200">
            IDEA
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT: ORBITAL METHODOLOGY
// ============================================================================
export function OrbitalMethodology() {
  const [activeStationIdx, setActiveStationIdx] = useState<number | null>(null);

  const handleStationHover = (idx: number) => {
    setActiveStationIdx(idx);
    playPathFeedback('hover');
  };

  const handleStationLeave = () => {
    setActiveStationIdx(null);
  };

  const handleStationClick = (idx: number) => {
    setActiveStationIdx((prev) => (prev === idx ? null : idx));
    playPathFeedback('select');
  };

  const activeStation = activeStationIdx !== null ? SOLAR_SYSTEM_STATIONS[activeStationIdx] : null;

  return (
    <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#04070D]/95 border border-[#142334] relative overflow-hidden shadow-2xl">
      {/* Background Star Dust & Orbit Glow Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm Genesis Glow on the left */}
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/12 blur-[100px]" />
        {/* Cool Deep Space Glow on the right */}
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-600/12 blur-[100px]" />

        {/* Ambient star speckles */}
        <div className="absolute top-10 left-1/4 w-1 h-1 rounded-full bg-slate-400/40" />
        <div className="absolute top-24 right-1/3 w-1.5 h-1.5 rounded-full bg-blue-400/40 blur-[0.5px]" />
        <div className="absolute bottom-14 left-1/3 w-1 h-1 rounded-full bg-amber-400/30" />
        <div className="absolute bottom-20 right-1/4 w-1.5 h-1.5 rounded-full bg-slate-400/30" />
        <div className="absolute top-1/3 right-12 w-1 h-1 rounded-full bg-cyan-400/40" />
        <div className="absolute bottom-10 left-16 w-1 h-1 rounded-full bg-slate-500/40" />
      </div>

      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-[#142334] relative z-10">
        <div>
          {/* Top-left Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-amber-500/40 bg-amber-500/10 text-amber-300 font-mono text-[11px] tracking-widest uppercase font-semibold mb-2 shadow-sm shadow-amber-500/10">
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
            <span>REAL SOLAR SYSTEM PROTOCOL</span>
          </div>

          {/* Heading */}
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
            From <span className="text-amber-400">Idea</span> <span className="text-slate-400">→</span> System.
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Astronomically anchored engineering sequence mapped across the eight planets of our Solar System.
          </p>
        </div>

        {/* Right Mission Control Telemetry */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#080D16] border border-slate-800 text-[11px] font-mono text-slate-400">
            <Compass className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '24s' }} />
            <span className="text-slate-300 font-semibold">HELIOCENTRIC VECTOR</span>
            <span className="text-emerald-400">0.0 → 30.1 AU</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP & TABLET: 9-STATION HORIZONTAL SYSTEM            */}
      {/* ======================================================== */}
      <div className="hidden md:block relative z-10 overflow-x-auto pb-4 scrollbar-thin">
        <div className="min-w-[1240px] px-2 py-2">
          
          {/* TOP ROW: Floating HUD Information Cards (Information Layer) */}
          <div className="grid grid-cols-9 gap-3 mb-2 items-end">
            {SOLAR_SYSTEM_STATIONS.map((station, idx) => {
              const Icon = station.icon;
              const isHovered = activeStationIdx === idx;
              const isAmber = station.accentBadge === 'amber';
              const isEmerald = station.accentBadge === 'emerald';
              const isCyan = station.accentBadge === 'cyan';
              const isOrange = station.accentBadge === 'orange';
              const isIndigo = station.accentBadge === 'indigo';

              return (
                <div
                  key={station.id}
                  onMouseEnter={() => handleStationHover(idx)}
                  onMouseLeave={handleStationLeave}
                  onClick={() => handleStationClick(idx)}
                  className={`p-3 rounded-xl bg-[#080D16]/95 border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[158px] relative group backdrop-blur-md ${
                    isHovered
                      ? isEmerald
                        ? 'border-emerald-400 bg-[#061812] shadow-lg shadow-emerald-500/20 -translate-y-1'
                        : isAmber
                        ? 'border-amber-400 bg-[#161208] shadow-lg shadow-amber-500/20 -translate-y-1'
                        : isCyan
                        ? 'border-cyan-400 bg-[#081520] shadow-lg shadow-cyan-500/20 -translate-y-1'
                        : isOrange
                        ? 'border-orange-400 bg-[#180E08] shadow-lg shadow-orange-500/20 -translate-y-1'
                        : isIndigo
                        ? 'border-indigo-400 bg-[#0E0F24] shadow-lg shadow-indigo-500/20 -translate-y-1'
                        : 'border-blue-400 bg-[#0A1220] shadow-lg shadow-blue-500/20 -translate-y-1'
                      : 'border-[#172535] hover:border-slate-600'
                  }`}
                >
                  <div>
                    {/* Card Top: Stage Pill + Icon */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          isEmerald
                            ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'
                            : isAmber
                            ? 'text-amber-400 border-amber-500/40 bg-amber-500/10'
                            : isCyan
                            ? 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10'
                            : isOrange
                            ? 'text-orange-400 border-orange-500/40 bg-orange-500/10'
                            : isIndigo
                            ? 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10'
                            : 'text-blue-400 border-blue-500/40 bg-blue-500/10'
                        }`}
                      >
                        {station.stageNumber || (station.isOrigin ? 'GENESIS' : 'END')}
                      </span>
                      <Icon
                        className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${
                          isEmerald
                            ? 'text-emerald-400'
                            : isAmber
                            ? 'text-amber-400'
                            : isCyan
                            ? 'text-cyan-400'
                            : isOrange
                            ? 'text-orange-400'
                            : isIndigo
                            ? 'text-indigo-400'
                            : 'text-blue-400'
                        }`}
                      />
                    </div>

                    {/* Stage Name */}
                    <h4 className="text-sm font-heading font-black text-white mb-1 tracking-tight">
                      {station.stageName}
                    </h4>

                    {/* Stage Summary */}
                    <p className="text-[11px] text-slate-300 font-sans leading-snug line-clamp-2">
                      {station.stageSummary}
                    </p>
                  </div>

                  {/* Card Bottom Meta: Real Astronomical Planet Link */}
                  <div className="mt-2 pt-1.5 border-t border-slate-800/80 text-[9px] font-mono flex items-center justify-between">
                    <span className="text-slate-400 font-bold truncate max-w-[85px]">
                      {station.planetName.split('/')[0].trim()}
                    </span>
                    <span
                      className={`font-semibold ${
                        isHovered ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {station.isOrigin ? 'ORIGIN' : station.isEndpoint ? 'VERIFIED' : `STG ${idx}/7`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MIDDLE ROW: Vertical Light Connector Lines dropping to Planets */}
          <div className="grid grid-cols-9 gap-3 my-0">
            {SOLAR_SYSTEM_STATIONS.map((station, idx) => {
              const isHovered = activeStationIdx === idx;
              return (
                <div
                  key={`conn-${station.id}`}
                  className="flex flex-col items-center justify-center h-9 relative"
                >
                  {/* Top Pip */}
                  <div
                    className="w-1.5 h-1.5 rounded-full mb-auto transition-all"
                    style={{
                      backgroundColor: isHovered ? station.accentColor : '#334155',
                      boxShadow: isHovered ? `0 0 8px ${station.accentColor}` : 'none'
                    }}
                  />
                  {/* Vertical Laser Beam */}
                  <div
                    className="w-[1px] h-full transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? station.accentColor : '#1E293B',
                      boxShadow: isHovered ? `0 0 10px ${station.accentColor}` : 'none'
                    }}
                  />
                  {/* Bottom Pip */}
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-auto transition-all"
                    style={{
                      backgroundColor: isHovered ? station.accentColor : '#334155',
                      boxShadow: isHovered ? `0 0 8px ${station.accentColor}` : 'none'
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* BOTTOM ROW: The Real Astronomical Solar System Highway */}
          <div className="relative pt-2 pb-6 min-h-[170px] flex items-center">
            
            {/* Horizontal Orbital Vector Highway SVG Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 1200 140"
            >
              <defs>
                <linearGradient id="orbital-highway-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
                  <stop offset="11%" stopColor="#94A3B8" stopOpacity="0.75" />
                  <stop offset="22%" stopColor="#F59E0B" stopOpacity="0.8" />
                  <stop offset="33%" stopColor="#38BDF8" stopOpacity="0.85" />
                  <stop offset="44%" stopColor="#F97316" stopOpacity="0.8" />
                  <stop offset="55%" stopColor="#818CF8" stopOpacity="0.9" />
                  <stop offset="66%" stopColor="#FBBF24" stopOpacity="0.85" />
                  <stop offset="77%" stopColor="#06B6D4" stopOpacity="0.8" />
                  <stop offset="90%" stopColor="#10B981" stopOpacity="0.95" />
                </linearGradient>

                <filter id="highway-laser-glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Resonance Orbit Ellipse Traces */}
              <path
                d="M 30 70 Q 300 35 600 70 T 1170 65"
                fill="none"
                stroke="rgba(56, 189, 248, 0.12)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <path
                d="M 50 60 Q 350 95 700 60 T 1180 75"
                fill="none"
                stroke="rgba(245, 158, 11, 0.1)"
                strokeWidth="1"
                strokeDasharray="3 5"
              />

              {/* Main Progress Orbital Highway Line passing through all planet centers */}
              <path
                d="M 65 70 L 1150 70"
                fill="none"
                stroke="url(#orbital-highway-gradient)"
                strokeWidth="2"
                filter="url(#highway-laser-glow)"
              />

              {/* Arrow Head terminating into VERIFIED SYSTEM */}
              <path
                d="M 1146 64 L 1162 70 L 1146 76 Z"
                fill="#10B981"
                filter="url(#highway-laser-glow)"
              />
            </svg>

            {/* Planets & Central Idea Sun 9-Column Flex Container */}
            <div className="grid grid-cols-9 gap-3 items-center w-full relative z-10">
              
              {/* STAGE 0: The Central Glowing IDEA Sun */}
              <div className="flex flex-col items-center justify-center">
                <SolarIdeaGenesis
                  isHovered={activeStationIdx === 0}
                  onClick={() => handleStationClick(0)}
                />
              </div>

              {/* STAGES 1-8: The Seven Stages (Mercury to Uranus) + Neptune System */}
              {SOLAR_SYSTEM_STATIONS.slice(1).map((station, sliceIdx) => {
                const idx = sliceIdx + 1;
                const isHovered = activeStationIdx === idx;

                // Subtle orbital harmonic floating motion along path
                // Mercury oscillates fastest -> Neptune slowest
                const oscDuration = station.orbitalOscillationSec;

                return (
                  <div
                    key={`station-${station.id}`}
                    onMouseEnter={() => handleStationHover(idx)}
                    onMouseLeave={handleStationLeave}
                    onClick={() => handleStationClick(idx)}
                    className="flex flex-col items-center justify-center cursor-pointer group py-2 relative"
                  >
                    {/* Subtle Orbital Sway Motion */}
                    <motion.div
                      animate={{
                        y: [-2.5, 2.5, -2.5]
                      }}
                      transition={{
                        duration: oscDuration,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="flex flex-col items-center justify-center"
                    >
                      {/* Rotating Astronomical Planet */}
                      <AstronomicalPlanetCanvas
                        station={station}
                        isHovered={isHovered}
                      />

                      {/* Planet Identity Label underneath */}
                      <div className="mt-2 flex flex-col items-center text-center pointer-events-none">
                        <span
                          className={`text-[10px] font-mono font-bold tracking-wider uppercase transition-colors ${
                            isHovered ? 'text-white' : 'text-slate-400'
                          }`}
                        >
                          {station.planetName}
                        </span>
                        <span className="text-[8px] font-mono text-slate-500">
                          {station.specs.distanceAU}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                );
              })}

            </div>

          </div>

          {/* ======================================================== */}
          {/* FLOATING MISSION CONTROL TELEMETRY HUD (Active on Hover) */}
          {/* ======================================================== */}
          <AnimatePresence>
            {activeStation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="mt-4 p-4 rounded-2xl bg-[#070D18]/95 border border-[#1E3048] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl relative overflow-hidden backdrop-blur-md"
              >
                {/* Accent border strip */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1.5"
                  style={{ backgroundColor: activeStation.accentColor }}
                />

                <div className="flex items-center gap-3.5 pl-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
                    style={{
                      borderColor: `${activeStation.accentColor}60`,
                      backgroundColor: `${activeStation.accentColor}15`
                    }}
                  >
                    <activeStation.icon
                      className="w-5 h-5"
                      style={{ color: activeStation.accentColor }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-black text-white text-base">
                        {activeStation.planetName}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {activeStation.isOrigin
                          ? 'GENESIS'
                          : activeStation.isEndpoint
                          ? 'SYSTEM ENDPOINT'
                          : `STAGE ${activeStation.stageNumber} / 07`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans mt-0.5">
                      <strong className="text-white">{activeStation.stageName}:</strong> {activeStation.stageAction}
                    </p>
                  </div>
                </div>

                {/* Real NASA Telemetry Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono border-t sm:border-t-0 sm:border-l border-slate-800 sm:pl-4">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">AXIAL TILT</span>
                    <span className="text-slate-200 font-bold">{activeStation.specs.tiltFormatted}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">ROTATION PERIOD</span>
                    <span className="text-slate-200 font-bold">{activeStation.specs.realPeriod}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">HELIOCENTRIC DIST</span>
                    <span className="text-slate-200 font-bold">{activeStation.specs.distanceAU}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">DIAMETER</span>
                    <span className="text-slate-200 font-bold">{activeStation.specs.diameterKm}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE: VERTICAL ORBITAL MISSION TIMELINE (< md)        */}
      {/* ======================================================== */}
      <div className="block md:hidden relative z-10 pt-2">
        
        {/* Mobile Sun Origin */}
        <div
          onClick={() => handleStationClick(0)}
          className="flex items-center gap-4 mb-6 p-3.5 rounded-2xl bg-[#080D16] border border-amber-500/35 cursor-pointer shadow-lg"
        >
          <div className="shrink-0">
            <SolarIdeaGenesis isHovered={activeStationIdx === 0} />
          </div>
          <div>
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
              GENESIS POINT // SUN
            </div>
            <div className="text-base font-heading font-black text-white">
              Raw Concept & Ambiguous Need
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Origin energy driving the 7-stage verification protocol.
            </p>
          </div>
        </div>

        {/* Vertical Orbital Spine Flow */}
        <div className="relative pl-6 space-y-4 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-amber-500 before:via-blue-500 before:to-emerald-500">
          {SOLAR_SYSTEM_STATIONS.slice(1).map((station, sliceIdx) => {
            const idx = sliceIdx + 1;
            const Icon = station.icon;
            const isHovered = activeStationIdx === idx;

            return (
              <div
                key={`mobile-${station.id}`}
                onClick={() => handleStationClick(idx)}
                className="relative flex items-start gap-3.5 group cursor-pointer"
              >
                {/* Node on the spine */}
                <div className="absolute -left-[23px] top-4 z-10">
                  <div
                    className="w-3.5 h-3.5 rounded-full border-2 transition-all duration-200"
                    style={{
                      borderColor: station.accentColor,
                      backgroundColor: isHovered ? station.accentColor : '#080D16'
                    }}
                  />
                </div>

                {/* Mobile Stage Card with Real Rotating Planet Avatar */}
                <div
                  className={`w-full p-4 rounded-xl bg-[#080D16]/95 border transition-all duration-200 flex items-center justify-between gap-3 ${
                    isHovered
                      ? 'border-slate-500 bg-[#0C1524] shadow-lg'
                      : 'border-[#172535]'
                  }`}
                  style={{
                    borderColor: isHovered ? station.accentColor : undefined
                  }}
                >
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border"
                        style={{
                          color: station.accentColor,
                          borderColor: `${station.accentColor}50`,
                          backgroundColor: `${station.accentColor}15`
                        }}
                      >
                        {station.stageNumber || 'SYS'}
                      </span>
                      <Icon className="w-3.5 h-3.5" style={{ color: station.accentColor }} />
                      <h4 className="text-sm font-heading font-black text-white">
                        {station.stageName}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-snug">
                      {station.stageSummary}
                    </p>
                    <div className="mt-1 text-[10px] font-mono text-slate-400">
                      {station.planetName} • {station.specs.distanceAU}
                    </div>
                  </div>

                  {/* Compact Real Rotating Planet Avatar */}
                  <div className="shrink-0 flex items-center justify-center w-14 h-14">
                    <AstronomicalPlanetCanvas
                      station={station}
                      isHovered={isHovered}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}

export default OrbitalMethodology;
