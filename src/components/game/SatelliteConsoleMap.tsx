import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Crosshair,
  Radio,
  AlertCircle,
  Satellite,
  Compass,
  CheckCircle2,
  TrendingUp,
  Activity
} from 'lucide-react';
import type { ThermalSignal } from '../../types/pyravexGame';
import { playPathFeedback } from '../../utils/audioFeedback';

interface SatelliteConsoleMapProps {
  signals: ThermalSignal[];
  selectedSignal: ThermalSignal | null;
  investigatedSignalIds: string[];
  onSelectSignal: (signal: ThermalSignal) => void;
  reducedMotion?: boolean;
}

export function SatelliteConsoleMap({
  signals,
  selectedSignal,
  investigatedSignalIds,
  onSelectSignal,
  reducedMotion = false
}: SatelliteConsoleMapProps) {
  const [hoveredSignal, setHoveredSignal] = useState<ThermalSignal | null>(null);

  const handleSignalClick = (signal: ThermalSignal) => {
    playPathFeedback('tick');
    onSelectSignal(signal);
  };

  const handleHover = (signal: ThermalSignal | null) => {
    setHoveredSignal(signal);
    if (signal) {
      playPathFeedback('hover');
    }
  };

  return (
    <div className="space-y-3 font-mono select-none">
      {/* 1. Tactical Geospatial Screen Container */}
      <div className="relative w-full h-[390px] sm:h-[480px] rounded-3xl bg-[#03060B] border border-slate-800/90 overflow-hidden shadow-2xl">
        {/* Subtle Coordinate Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] opacity-45 pointer-events-none" />

        {/* Faint CRT Phosphor Scanline Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

        {/* Tactical Subcontinent Vector Map & Orbit Overlays */}
        <svg
          viewBox="0 0 800 500"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-35"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="orbital-track-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Concentric Scan Radius Rings */}
          <circle cx="390" cy="245" r="140" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" />
          <circle cx="390" cy="245" r="230" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />

          {/* Geospatial Landmass Contours: Indian Subcontinent & South Asia */}
          {/* North Himalayas / Kashmir */}
          <path
            d="M 270 45 L 320 60 L 370 70 L 440 95 L 530 115 L 610 130 L 630 160 L 590 190 L 540 185 L 520 220 L 530 270 L 490 340 L 440 400 L 400 455 L 370 455 L 325 385 L 285 305 L 245 250 L 210 230 L 225 170 L 255 120 Z"
            fill="rgba(30, 41, 59, 0.2)"
            stroke="#64748B"
            strokeWidth="1.6"
            strokeDasharray="4 3"
          />

          {/* Sri Lanka teardrop outline */}
          <path
            d="M 430 465 C 445 475 440 495 425 490 C 415 485 420 470 430 465 Z"
            fill="rgba(30, 41, 59, 0.25)"
            stroke="#64748B"
            strokeWidth="1.2"
          />

          {/* Latitude / Longitude Graticule Reference Lines */}
          <line x1="60" y1="110" x2="740" y2="110" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="60" y1="230" x2="740" y2="230" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="60" y1="360" x2="740" y2="360" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="230" y1="30" x2="230" y2="470" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="390" y1="30" x2="390" y2="470" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="570" y1="30" x2="570" y2="470" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 4" />

          {/* MODIS / VIIRS Terra-Aqua Orbital Ground Track Line */}
          <line
            x1="120"
            y1="30"
            x2="680"
            y2="470"
            stroke="url(#orbital-track-grad)"
            strokeWidth="1.8"
            strokeDasharray="6 6"
          />
        </svg>

        {/* Sweeping Radar Scan Beam */}
        {!reducedMotion && (
          <motion.div
            animate={{ x: ['-100%', '220%'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 bottom-0 w-36 bg-gradient-to-r from-transparent via-cyan-500/12 to-transparent pointer-events-none transform -skew-x-12"
          />
        )}

        {/* Top Status & Sensor Telemetry Strip */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] text-slate-400 bg-[#05070B]/85 px-3.5 py-1.5 rounded-xl border border-slate-800 backdrop-blur-md pointer-events-none z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-bold text-slate-200">SENSOR: MODIS / VIIRS SATELLITE PASS</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">SPECTRAL BANDS: 4µm & 11µm LWIR</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">
              {signals.length} OBSERVATIONS ACTIVE
            </span>
          </div>
        </div>

        {/* Lat-Lon Edge Coordinate Labels */}
        <div className="absolute left-2.5 top-[108px] text-[8px] text-slate-400 pointer-events-none">30°N</div>
        <div className="absolute left-2.5 top-[228px] text-[8px] text-slate-400 pointer-events-none">20°N</div>
        <div className="absolute left-2.5 top-[358px] text-[8px] text-slate-400 pointer-events-none">10°N</div>
        <div className="absolute bottom-2 left-[225px] text-[8px] text-slate-400 pointer-events-none">72°E</div>
        <div className="absolute bottom-2 left-[385px] text-[8px] text-slate-400 pointer-events-none">82°E</div>
        <div className="absolute bottom-2 left-[565px] text-[8px] text-slate-400 pointer-events-none">92°E</div>

        {/* 2. Interactive Thermal Signal Pins on Map */}
        {signals.map((sig) => {
          const isSelected = selectedSignal?.id === sig.id;
          const isInvestigated = investigatedSignalIds.includes(sig.id);
          const isHovered = hoveredSignal?.id === sig.id;

          // Visual Pin Color Coding
          const pinColor = isSelected ? '#EF4444' : isInvestigated ? '#F59E0B' : '#38BDF8';

          return (
            <div
              key={sig.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ left: `${sig.coordinates.mapX}%`, top: `${sig.coordinates.mapY}%` }}
            >
              {/* Thermal Heat Dispersion Halo */}
              <div
                className="absolute inset-0 -left-3 -top-3 w-12 h-12 rounded-full pointer-events-none blur-sm opacity-35 transition-transform"
                style={{
                  backgroundColor: sig.intensityPercent > 80 ? '#EF4444' : '#F97316',
                  transform: `scale(${0.7 + sig.intensityPercent / 120})`
                }}
              />

              {/* Pulsing Radar Reticle on Target */}
              {!reducedMotion && (
                <motion.div
                  animate={{ scale: [1, 2.3, 1], opacity: [0.65, 0, 0.65] }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: Math.random() }}
                  className="absolute inset-0 w-10 h-10 -left-1 -top-1 rounded-full pointer-events-none border"
                  style={{ borderColor: `${pinColor}80` }}
                />
              )}

              {/* Selected Crosshair Marker */}
              {isSelected && (
                <div className="absolute -inset-2.5 rounded-full border border-red-500 pointer-events-none animate-spin" style={{ animationDuration: '8s' }} />
              )}

              {/* Clickable Pin Button */}
              <button
                type="button"
                onClick={() => handleSignalClick(sig)}
                onMouseEnter={() => handleHover(sig)}
                onMouseLeave={() => handleHover(null)}
                onFocus={() => handleHover(sig)}
                onBlur={() => handleHover(null)}
                data-cursor="pointer"
                aria-label={`Investigate ${sig.name} (${sig.code}) in ${sig.region}. Temperature ${sig.currentTempKelvin} Kelvin.`}
                className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white group cursor-pointer ${
                  isSelected
                    ? 'bg-red-950/95 text-white border-red-500 scale-110 shadow-lg shadow-red-500/35'
                    : isHovered
                    ? 'bg-slate-900 text-white border-blue-400 scale-105 shadow-md shadow-blue-500/25'
                    : 'bg-[#080D16]/95 text-slate-300 border-slate-700 hover:border-slate-500 shadow-md'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: pinColor }}
                />

                <span className="text-[10px] font-bold tracking-wider">
                  {sig.code}
                </span>

                {isInvestigated && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-amber-400"
                    title="Investigated in current session"
                  />
                )}
              </button>
            </div>
          );
        })}

        {/* 3. Hover Preview HUD Card */}
        <AnimatePresence>
          {hoveredSignal && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-3 left-3 right-3 sm:right-auto sm:w-84 p-3.5 rounded-2xl bg-[#05070B]/95 border border-slate-750 backdrop-blur-md shadow-2xl pointer-events-none z-30 text-[11px]"
            >
              <div className="flex items-center justify-between mb-2 border-b border-slate-800 pb-1.5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>{hoveredSignal.name}</span>
                </span>
                <span className="text-[10px] text-slate-400">{hoveredSignal.region}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] mb-2.5">
                <div>
                  <span className="text-slate-400 block">BRIGHTNESS TEMP</span>
                  <span className="font-bold text-slate-200">
                    {hoveredSignal.currentTempKelvin} K ({hoveredSignal.intensityPercent}% Max)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">7-DAY VARIANCE</span>
                  <span
                    className="font-bold"
                    style={{ color: hoveredSignal.recentChangePercent > 50 ? '#EF4444' : '#34D399' }}
                  >
                    {hoveredSignal.recentChangePercent > 0 ? `+${hoveredSignal.recentChangePercent}%` : `${hoveredSignal.recentChangePercent}%`}
                  </span>
                </div>
              </div>

              <div className="text-[9px] text-cyan-300 font-mono flex items-center gap-1">
                <span>Click pin to inspect full 7-day timeline dossier →</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Legend Watermark */}
        <div className="absolute bottom-2.5 right-3.5 pointer-events-none text-[9px] text-slate-400 flex items-center gap-2">
          <Satellite className="w-3 h-3 text-cyan-400" />
          <span>PYRAVEX GEOSPATIAL INTELLIGENCE CONSOLE</span>
        </div>
      </div>

      {/* 2. TOUCH-FRIENDLY SIGNAL SELECTOR STRIP (Mobile & Desktop) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span className="uppercase tracking-wider font-semibold">SIGNAL OBSERVATIONS LIST (TAP TO INSPECT)</span>
          <span className="text-slate-400">TOUCH TARGETS ≥ 44px</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {signals.map((sig) => {
            const isSelected = selectedSignal?.id === sig.id;
            const isInvestigated = investigatedSignalIds.includes(sig.id);

            return (
              <button
                key={`btn-${sig.id}`}
                type="button"
                onClick={() => handleSignalClick(sig)}
                data-cursor="pointer"
                aria-label={`Select ${sig.code} in ${sig.region}`}
                className={`min-h-[46px] p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  isSelected
                    ? 'bg-red-950/80 border-red-500 shadow-md shadow-red-500/20'
                    : isInvestigated
                    ? 'bg-[#080D16] border-slate-700 hover:border-slate-500'
                    : 'bg-[#05070B] border-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor: isSelected
                          ? '#EF4444'
                          : isInvestigated
                          ? '#F59E0B'
                          : '#38BDF8'
                      }}
                    />
                    <span className="text-xs font-bold text-white">{sig.code}</span>
                  </div>
                  {isInvestigated ? (
                    <span className="text-[8px] text-emerald-400 font-semibold uppercase">SEEN</span>
                  ) : (
                    <span className="text-[8px] text-slate-400 uppercase">NEW</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1">
                  <span className="truncate max-w-[80px]">{sig.region.split(' ')[0]}</span>
                  <span
                    className="font-bold"
                    style={{
                      color: sig.recentChangePercent > 50 ? '#EF4444' : '#94A3B8'
                    }}
                  >
                    {sig.recentChangePercent > 0 ? `+${sig.recentChangePercent}%` : `${sig.recentChangePercent}%`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SatelliteConsoleMap;
