import React from 'react';
import { Eye, ShieldCheck, Zap, Layers, Clock, Activity, Cpu } from 'lucide-react';
import type { TemporalScenario } from '../../types/chronosatGame';

interface FrameInspectorProps {
  progress: number;
  scenario: TemporalScenario;
}

export function FrameInspector({ progress, scenario }: FrameInspectorProps) {
  const isInterpolated = progress >= 25 && progress <= 75;
  const isT0 = progress < 25;
  const isT1 = progress > 75;

  const currentFrame = isT0
    ? scenario.frames.t0
    : isT1
    ? scenario.frames.t1
    : scenario.frames.intermediate;

  return (
    <div className="w-full rounded-2xl bg-[#080D1A]/95 border border-slate-800 p-4 sm:p-5 shadow-xl font-mono space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-pink-400" />
          <span className="text-white font-bold text-xs tracking-wider">FRAME TELEMETRY INSPECTOR</span>
        </div>
        <span className="text-[10px] text-slate-400">CHRONOSAT BAH 2026</span>
      </div>

      {/* Frame Status Badge & Title */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white">{currentFrame.label}</span>
          {isT0 && (
            <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 text-[10px] font-bold">
              GROUND TRUTH
            </span>
          )}
          {isInterpolated && (
            <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40 text-[10px] font-bold flex items-center gap-1 animate-pulse">
              <Zap className="w-3 h-3 text-pink-400" />
              SYNTHESIZED
            </span>
          )}
          {isT1 && (
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              TARGET TRUTH
            </span>
          )}
        </div>
        <div className="text-[11px] text-slate-400">{currentFrame.subLabel}</div>
      </div>

      {/* Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2.5 rounded-lg bg-black/50 border border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-pink-400" /> TIMESTAMP
          </span>
          <div className="text-slate-200 font-semibold truncate">{currentFrame.timestamp}</div>
        </div>

        <div className="p-2.5 rounded-lg bg-black/50 border border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Layers className="w-3 h-3 text-sky-400" /> SENSOR RESOLUTION
          </span>
          <div className="text-slate-200 font-semibold">{currentFrame.resolution}</div>
        </div>

        <div className="p-2.5 rounded-lg bg-black/50 border border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Activity className="w-3 h-3 text-purple-400" /> CLOUD DENSITY
          </span>
          <div className="text-slate-200 font-semibold">
            {(14.2 + (progress / 100) * 34.4).toFixed(1)}% Coverage
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-black/50 border border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-emerald-400" /> SYNTHESIS ACCURACY
          </span>
          <div className="text-slate-200 font-semibold">
            {isInterpolated ? currentFrame.synthesisConfidence : '100% Ground Truth'}
          </div>
        </div>
      </div>

      {/* Optical Flow Motion Vector Block (if in interpolation state) */}
      {isInterpolated && (
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-pink-300 font-bold text-[11px]">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-pink-400" />
              OPTICAL FLOW MOTION FIELD
            </span>
            <span>14,280 VECTORS</span>
          </div>
          <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
            Gunnar Farneback motion estimation tracks non-linear cloud displacement vectors across the estuarine inlet, generating intermediate pixel values without physical satellite sensors.
          </p>
        </div>
      )}

      {/* Frame Narrative Description */}
      <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-[11px] space-y-1">
        <span className="text-[10px] text-slate-400 block font-bold">PHYSICAL SURFACE DYNAMICS</span>
        <p className="text-slate-300 font-sans leading-relaxed">{currentFrame.description}</p>
      </div>

      {/* Spectral Bands Pills */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] text-slate-400 block font-bold">SPECTRAL CHANNELS</span>
        <div className="flex flex-wrap gap-1.5">
          {currentFrame.spectralBands.map((band, idx) => (
            <span
              key={`band-${idx}`}
              className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300"
            >
              {band}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FrameInspector;
