import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Crosshair, Radio, AlertCircle } from 'lucide-react';
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
    <div className="relative w-full h-[380px] sm:h-[460px] rounded-2xl bg-[#03060B] border border-slate-800/90 overflow-hidden shadow-2xl select-none font-mono">
      {/* 1. Tactical Geospatial Coordinate Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* 2. Abstract Geospatial Landmass Outlines & Reference Circles */}
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Orbital Scan Rings */}
        <circle cx="400" cy="250" r="160" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="400" cy="250" r="260" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 8" />

        {/* Abstract Subcontinent Coastline Polyline Vectors */}
        <path
          d="M 280 80 L 340 120 L 460 130 L 520 180 L 580 230 L 520 310 L 460 380 L 400 440 L 340 370 L 290 280 L 240 210 L 230 140 Z"
          fill="rgba(30, 41, 59, 0.15)"
          stroke="#64748B"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Latitude / Longitude Graticules */}
        <line x1="80" y1="120" x2="720" y2="120" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 4" />
        <line x1="80" y1="250" x2="720" y2="250" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 4" />
        <line x1="80" y1="380" x2="720" y2="380" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 4" />
        <line x1="260" y1="40" x2="260" y2="460" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 4" />
        <line x1="400" y1="40" x2="400" y2="460" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 4" />
        <line x1="560" y1="40" x2="560" y2="460" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 4" />
      </svg>

      {/* 3. Sweeping Radar Scan Beam */}
      {!reducedMotion && (
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent pointer-events-none transform -skew-x-12"
        />
      )}

      {/* 4. Top Telemetry Status Strip */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] text-slate-400 bg-[#05070B]/80 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm pointer-events-none z-10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold text-slate-200">ORBITAL PASS: MODIS / VIIRS TERRA-AQUA</span>
        </div>
        <div className="text-slate-500 hidden sm:block">
          GRID: 08°N–35°N • 68°E–94°E
        </div>
        <div className="text-amber-400 font-bold">
          {signals.length} ACTIVE OBSERVATIONS
        </div>
      </div>

      {/* 5. Render Interactive Thermal Signal Pins */}
      {signals.map((sig) => {
        const isSelected = selectedSignal?.id === sig.id;
        const isInvestigated = investigatedSignalIds.includes(sig.id);
        const isHovered = hoveredSignal?.id === sig.id;

        // Color coding
        const pinColor = isSelected ? '#EF4444' : isInvestigated ? '#F59E0B' : '#38BDF8';

        return (
          <div
            key={sig.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ left: `${sig.coordinates.mapX}%`, top: `${sig.coordinates.mapY}%` }}
          >
            {/* Target Reticle Ping Rings */}
            {!reducedMotion && (
              <motion.div
                animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() }}
                className="absolute inset-0 w-9 h-9 -left-1 -top-1 rounded-full pointer-events-none border"
                style={{ borderColor: `${pinColor}88` }}
              />
            )}

            {/* Clickable Signal Pin Button */}
            <button
              type="button"
              onClick={() => handleSignalClick(sig)}
              onMouseEnter={() => handleHover(sig)}
              onMouseLeave={() => handleHover(null)}
              onFocus={() => handleHover(sig)}
              onBlur={() => handleHover(null)}
              data-cursor="pointer"
              aria-label={`Investigate ${sig.name} in ${sig.region}. Temperature ${sig.currentTempKelvin} Kelvin.`}
              className={`relative flex items-center gap-1 px-2 py-1 rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white group ${
                isSelected
                  ? 'bg-red-950/90 text-white border-red-500 scale-110 shadow-lg shadow-red-500/30'
                  : isHovered
                  ? 'bg-slate-900 text-white border-blue-400 scale-105 shadow-md shadow-blue-500/20'
                  : 'bg-[#080D16]/90 text-slate-300 border-slate-700/80 hover:border-slate-500'
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
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Investigated" />
              )}
            </button>
          </div>
        );
      })}

      {/* 6. Hover Preview HUD Card */}
      <AnimatePresence>
        {hoveredSignal && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-3 left-3 right-3 sm:right-auto sm:w-80 p-3 rounded-xl bg-[#05070B]/95 border border-slate-700/80 backdrop-blur-md shadow-2xl pointer-events-none z-30 text-[11px]"
          >
            <div className="flex items-center justify-between mb-1.5 border-b border-slate-800 pb-1">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>{hoveredSignal.name}</span>
              </span>
              <span className="text-[10px] text-slate-400">{hoveredSignal.region}</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[10px] mb-2">
              <div>
                <span className="text-slate-400 block">INTENSITY</span>
                <span className="font-bold text-slate-200">{hoveredSignal.currentTempKelvin} K ({hoveredSignal.intensityPercent}%)</span>
              </div>
              <div>
                <span className="text-slate-400 block">RECENT CHANGE</span>
                <span
                  className="font-bold"
                  style={{ color: hoveredSignal.recentChangePercent > 50 ? '#EF4444' : '#34D399' }}
                >
                  {hoveredSignal.recentChangePercent > 0 ? `+${hoveredSignal.recentChangePercent}%` : `${hoveredSignal.recentChangePercent}%`}
                </span>
              </div>
            </div>

            <div className="text-[9px] text-cyan-300 font-mono">
              Click pin to launch deep investigation dossier →
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. Bottom Corner Watermark / Lat-Lon */}
      <div className="absolute bottom-2 right-3 pointer-events-none text-[9px] text-slate-400">
        PYRAVEX SATELLITE ENGINE • SIMULATED SENSOR PASS
      </div>
    </div>
  );
}

export default SatelliteConsoleMap;
