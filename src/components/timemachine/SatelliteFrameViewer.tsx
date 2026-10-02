import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Layers, Compass, Zap, ShieldCheck, Activity } from 'lucide-react';
import type { TemporalScenario } from '../../types/chronosatGame';

interface SatelliteFrameViewerProps {
  progress: number; // 0 to 100
  scenario: TemporalScenario;
  reducedMotion?: boolean;
}

export function SatelliteFrameViewer({
  progress,
  scenario,
  reducedMotion = false
}: SatelliteFrameViewerProps) {
  const [bandView, setBandView] = useState<'NATURAL' | 'INFRARED' | 'VECTORS'>('NATURAL');

  // Interpolation calculations
  const t = progress / 100;
  const isInterpolated = progress >= 25 && progress <= 75;
  const isT0 = progress < 25;
  const isT1 = progress > 75;

  // Cloud coordinates shift along vector trajectory (heading East-Northeast)
  const cloud1X = 28 + t * 44; // Moves from 28% to 72%
  const cloud1Y = 32 - t * 14; // Moves from 32% to 18%
  const cloud2X = 52 + t * 36;
  const cloud2Y = 64 - t * 20;

  // Estuarine sediment plume expansion
  const sedimentScale = 1 + t * 0.45;
  const sedimentOpacity = 0.55 + Math.sin(t * Math.PI) * 0.25;

  return (
    <div className="relative w-full rounded-2xl bg-[#060913] border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-black/60 border-b border-slate-800/90 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
          <span className="text-white font-bold tracking-wider">CHRONOSAT SATELLITE VIEWER</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300 hidden sm:inline">{scenario.regionName}</span>
          <span className="text-[10px] text-pink-300 font-semibold px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/30">
            SIMULATION
          </span>
        </div>

        {/* Spectral Band Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-[10px]">
          <button
            type="button"
            onClick={() => setBandView('NATURAL')}
            className={`px-2.5 py-1 rounded transition-colors ${
              bandView === 'NATURAL'
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            NATURAL RGB
          </button>
          <button
            type="button"
            onClick={() => setBandView('VECTORS')}
            className={`px-2.5 py-1 rounded transition-colors ${
              bandView === 'VECTORS'
                ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            MOTION VECTORS
          </button>
          <button
            type="button"
            onClick={() => setBandView('INFRARED')}
            className={`px-2.5 py-1 rounded transition-colors ${
              bandView === 'INFRARED'
                ? 'bg-pink-500/20 text-pink-300 font-bold border border-pink-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            NIR VEGETATION
          </button>
        </div>
      </div>

      {/* Main Satellite GIS Canvas Display */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[320px] max-h-[520px] overflow-hidden select-none bg-slate-950">
        {/* Synthetic Multi-Spectral Geographic Terrain Map */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Ocean Water Gradient */}
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1A2E" />
              <stop offset="60%" stopColor="#061224" />
              <stop offset="100%" stopColor="#030812" />
            </linearGradient>

            {/* Coastal Landmass Gradient based on band */}
            <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              {bandView === 'INFRARED' ? (
                <>
                  <stop offset="0%" stopColor="#831843" />
                  <stop offset="50%" stopColor="#9D174D" />
                  <stop offset="100%" stopColor="#500724" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="40%" stopColor="#132338" />
                  <stop offset="100%" stopColor="#0F172A" />
                </>
              )}
            </linearGradient>

            {/* River Delta Sediment Plume */}
            <radialGradient id="sedimentPlume" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity={sedimentOpacity * 0.6} />
              <stop offset="60%" stopColor="#0284C7" stopOpacity={sedimentOpacity * 0.3} />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
            </radialGradient>

            {/* Grid Pattern */}
            <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Deep Ocean Base */}
          <rect width="1000" height="600" fill="url(#oceanGrad)" />

          {/* Coastal Terrain / Mangrove Delta Landmass */}
          <path
            d="M 0,0 L 450,0 Q 480,120 410,210 T 360,340 Q 320,440 280,510 L 0,600 Z"
            fill="url(#landGrad)"
            stroke="#334155"
            strokeWidth="1.5"
          />

          {/* River Inlets and Estuary Channels */}
          <path
            d="M 0,180 Q 220,195 380,240 T 430,260"
            fill="none"
            stroke="#0284C7"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 0,360 Q 180,340 340,365 T 390,380"
            fill="none"
            stroke="#0369A1"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Sediment Plume Dispersal into Ocean */}
          <ellipse
            cx="440"
            cy="270"
            rx={80 * sedimentScale}
            ry={55 * sedimentScale}
            fill="url(#sedimentPlume)"
          />

          {/* Mangrove Delta Barrier Islands */}
          <path
            d="M 440,310 Q 470,300 480,330 T 450,370 Z"
            fill="url(#landGrad)"
            stroke="#475569"
            strokeWidth="1"
          />
          <path
            d="M 470,220 Q 500,210 510,240 T 480,270 Z"
            fill="url(#landGrad)"
            stroke="#475569"
            strokeWidth="1"
          />

          {/* Coordinate GIS Grid Overlay */}
          <rect width="1000" height="600" fill="url(#gridPattern)" />

          {/* Dynamic Cloud Formation Layer (Shifting along vector trajectory) */}
          <g transform={`translate(${cloud1X * 10 - 280}, ${cloud1Y * 6 - 192})`}>
            {/* Primary Cumulus Cloud Bank */}
            <path
              d="M 280,140 Q 330,100 390,120 Q 440,90 490,130 Q 530,160 500,210 Q 460,250 400,240 Q 340,260 300,220 Q 250,190 280,140 Z"
              fill={bandView === 'INFRARED' ? '#F43F5E' : '#FFFFFF'}
              opacity={0.72}
              filter="blur(1px)"
            />
            {/* Cloud Shadow on Ocean/Land (Offset) */}
            <path
              d="M 295,155 Q 345,115 405,135 Q 455,105 505,145 Q 545,175 515,225 Q 475,265 415,255 Q 355,275 315,235 Q 265,205 295,155 Z"
              fill="#000000"
              opacity={0.35}
            />
          </g>

          {/* Secondary Cloud Stratus Bank */}
          <g transform={`translate(${cloud2X * 10 - 520}, ${cloud2Y * 6 - 384})`}>
            <ellipse
              cx="540"
              cy="400"
              rx={110 + t * 25}
              ry={60 + t * 15}
              fill={bandView === 'INFRARED' ? '#FB7185' : '#E2E8F0'}
              opacity={0.65}
            />
          </g>

          {/* OPTICAL FLOW MOTION VECTORS (Shown strongly when interpolated or toggled) */}
          {(isInterpolated || bandView === 'VECTORS') && (
            <g className="transition-opacity duration-300">
              {/* Dense vector arrow field representing computed displacement */}
              {[
                { x: 340, y: 150, dx: 35, dy: -12 },
                { x: 380, y: 170, dx: 42, dy: -14 },
                { x: 420, y: 140, dx: 38, dy: -10 },
                { x: 460, y: 160, dx: 45, dy: -15 },
                { x: 500, y: 190, dx: 40, dy: -12 },
                { x: 370, y: 220, dx: 36, dy: -8 },
                { x: 430, y: 230, dx: 48, dy: -16 },
                { x: 490, y: 250, dx: 44, dy: -14 },
                { x: 550, y: 280, dx: 39, dy: -10 },
                { x: 520, y: 390, dx: 32, dy: -18 },
                { x: 570, y: 410, dx: 35, dy: -15 },
                { x: 620, y: 430, dx: 38, dy: -16 },
                { x: 430, y: 280, dx: 25, dy: 10 }, // Sediment flow into sea
                { x: 460, y: 310, dx: 28, dy: 12 },
              ].map((v, i) => (
                <g key={`vector-${i}`} opacity={isInterpolated ? 0.95 : 0.6}>
                  <line
                    x1={v.x}
                    y1={v.y}
                    x2={v.x + v.dx * 1.2}
                    y2={v.y + v.dy * 1.2}
                    stroke="#C084FC"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                  />
                  <circle
                    cx={v.x + v.dx * 1.2}
                    cy={v.y + v.dy * 1.2}
                    r="2.5"
                    fill="#F472B6"
                  />
                  <circle cx={v.x} cy={v.y} r="1.5" fill="#38BDF8" />
                </g>
              ))}

              {/* Optical Flow Grid Mesh Lines */}
              <path
                d="M 320,130 L 520,150 L 580,290 L 360,250 Z"
                fill="rgba(192, 132, 252, 0.08)"
                stroke="#A855F7"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </g>
          )}

          {/* Coordinate Crosshairs */}
          <line x1="500" y1="280" x2="500" y2="320" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
          <line x1="480" y1="300" x2="520" y2="300" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
          <circle cx="500" cy="300" r="12" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
        </svg>

        {/* Scanline Sweep Animation (Disabled if reducedMotion) */}
        {!reducedMotion && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
            <div className="w-full h-24 bg-gradient-to-b from-transparent via-pink-500/20 to-transparent animate-scan" />
          </div>
        )}

        {/* Top-Left Geographic HUD */}
        <div className="absolute top-3 left-3 z-10 p-2.5 rounded-lg bg-black/80 border border-slate-800 backdrop-blur-md font-mono text-[10px] space-y-1 text-slate-300">
          <div className="flex items-center gap-2 text-pink-400 font-bold">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>{scenario.coordinates}</span>
          </div>
          <div>SWATH: {scenario.sensorConstellation}</div>
          <div className="text-[9px] text-slate-400">RESOLUTION: 10m GSD Multi-Band</div>
        </div>

        {/* Top-Right Active State Badge */}
        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1.5 font-mono">
          {isT0 && (
            <div className="px-3 py-1.5 rounded-lg bg-sky-950/80 border border-sky-400/50 text-sky-300 text-xs font-bold backdrop-blur-md shadow-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>FRAME T0 (GROUND TRUTH)</span>
            </div>
          )}

          {isInterpolated && (
            <div className="px-3 py-1.5 rounded-lg bg-purple-950/90 border border-pink-400/60 text-pink-200 text-xs font-bold backdrop-blur-md shadow-lg shadow-purple-900/40 flex items-center gap-1.5 animate-pulse">
              <Zap className="w-3.5 h-3.5 text-pink-400" />
              <span>FRAME T+Δ (SYNTHESIZED INTERPOLATION)</span>
            </div>
          )}

          {isT1 && (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-400/50 text-emerald-300 text-xs font-bold backdrop-blur-md shadow-lg flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>FRAME T1 (REVISIT GROUND TRUTH)</span>
            </div>
          )}

          <div className="text-[10px] text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-slate-800">
            TEMPORAL DELTA: {progress.toFixed(0)}% (+{(progress * 0.48).toFixed(1)}h)
          </div>
        </div>

        {/* Center Interpolating Pill Banner */}
        <AnimatePresence>
          {isInterpolated && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-black/90 border border-purple-500/50 text-purple-200 text-[11px] font-mono backdrop-blur-md flex items-center gap-2 shadow-xl pointer-events-none"
            >
              <Activity className="w-3.5 h-3.5 text-pink-400 animate-spin" />
              <span>OPTICAL FLOW SYNTHESIZING MISSING MOMENT (SSIM: 91.4%)</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Corner Cyber Brackets */}
        <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-pink-500/50 pointer-events-none" />
        <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-pink-500/50 pointer-events-none" />
        <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-pink-500/50 pointer-events-none" />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-pink-500/50 pointer-events-none" />
      </div>

      {/* Bottom Sub-Telemetry Bar */}
      <div className="px-4 py-2.5 bg-black/80 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">TIMESTAMP:</span>
          <span className="text-white font-semibold">
            {progress < 30
              ? scenario.frames.t0.timestamp
              : progress > 70
              ? scenario.frames.t1.timestamp
              : scenario.frames.intermediate.timestamp}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span>CLOUD: {(14.2 + (progress / 100) * 34.4).toFixed(1)}%</span>
          <span>•</span>
          <span>VECTORS: {isInterpolated ? '14,280 ACTIVE' : '0 (STATIC PASS)'}</span>
          <span>•</span>
          <span>ESTIMATED BLINDSPOT: 48h REVISIT</span>
        </div>
      </div>
    </div>
  );
}

export default SatelliteFrameViewer;
