import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Database,
  ShieldCheck,
  Layers
} from 'lucide-react';
import type { ProjectCaseStudy, InteractiveStage } from '../../types/caseStudy';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ProjectInteractiveWorldProps {
  project: ProjectCaseStudy;
  reducedMotion?: boolean;
}

export function ProjectInteractiveWorld({ project, reducedMotion = false }: ProjectInteractiveWorldProps) {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [chronosatSlider, setChronosatSlider] = useState<number>(50); // For ChronoSat temporal slider

  const stages = project.worldConcept.interactiveStages;
  const currentStage = stages[activeStageIndex] || stages[0];
  const accent = project.domainTheme.accentColor;

  const handleSelectStage = (idx: number) => {
    setActiveStageIndex(idx);
    playPathFeedback('tick');
  };

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-[#080D16]/95 border border-slate-800/90 shadow-2xl mb-14 relative overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-10" style={{ backgroundColor: accent }} />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
              04 — INTERACTIVE SYSTEM PIPELINE
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono font-bold" style={{ color: accent }}>
              {project.worldConcept.title}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
            {project.worldConcept.description}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#05070B] border border-slate-800 text-[10px] font-mono">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
          <span className="text-slate-300 font-semibold">{currentStage.statusLabel || 'ACTIVE'}</span>
        </div>
      </div>

      {/* Sequential Flow Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {stages.map((stage, idx) => {
          const isActive = idx === activeStageIndex;
          const isPassed = idx < activeStageIndex;
          const isLast = idx === stages.length - 1;

          return (
            <React.Fragment key={stage.id}>
              <button
                type="button"
                onClick={() => handleSelectStage(idx)}
                onMouseEnter={() => playPathFeedback('hover')}
                data-cursor="pointer"
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 ${
                  isActive
                    ? 'bg-[#0B1528] text-white shadow-lg border'
                    : isPassed
                    ? 'bg-[#080D16] text-slate-300 border-slate-700/80 hover:border-slate-600'
                    : 'bg-[#05070B] text-slate-400 border-slate-800/80 hover:border-slate-700'
                }`}
                style={{
                  borderColor: isActive ? accent : undefined,
                  boxShadow: isActive ? `0 0 15px ${accent}30` : undefined
                }}
              >
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={{
                    backgroundColor: isActive ? accent : '#1E293B',
                    color: isActive ? '#FFFFFF' : '#94A3B8'
                  }}
                >
                  {stage.step}
                </span>
                <span className="font-semibold tracking-wider whitespace-nowrap">
                  {stage.label}
                </span>
              </button>

              {!isLast && (
                <span className="text-slate-600 font-mono text-xs flex-shrink-0 select-none">
                  →
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Domain-Specific Interactive Canvas & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Stage Deep Dive Explanation */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#05070B] border border-slate-800/90 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono tracking-wider font-semibold text-slate-400">
                STEP {currentStage.step} OF {stages.length}
              </span>
              {currentStage.telemetryKey && (
                <span
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${accent}15`,
                    color: accent,
                    border: `1px solid ${accent}35`
                  }}
                >
                  {currentStage.telemetryKey}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-heading font-black text-white mb-2">
              {currentStage.label}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4">
              {currentStage.description}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">TELEMETRY PARAMETER:</span>
            <span className="font-bold text-slate-200">{currentStage.telemetryValue || 'N/A'}</span>
          </div>
        </div>

        {/* Right: Project-Specific World Simulation */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#05070B] border border-slate-800/90 flex flex-col justify-center min-h-[220px]">
          {/* 1. PYRAVEX: Hotspot Telemetry Simulator */}
          {project.id === 'pyravex' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                <span className="text-blue-400 font-bold">LIVE TELEMETRY INGESTION</span>
                <span>GEO: 24.8°N, 78.4°E</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-[#080D16] border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">BRIGHTNESS TEMP</span>
                  <span className="text-amber-400 font-bold">342.6 Kelvin</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#080D16] border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">RADIATIVE POWER</span>
                  <span className="text-red-400 font-bold">84.2 MW (FRP)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#080D16] border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">WIND VECTOR</span>
                  <span className="text-sky-400 font-bold">14 km/h @ 210° SW</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#080D16] border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">CLUSTER CONFIDENCE</span>
                  <span className="text-emerald-400 font-bold">96% High (MODIS)</span>
                </div>
              </div>
              <div className="text-[9px] text-slate-400 text-right">
                DATA SOURCE: NASA FIRMS + OPEN-METEO
              </div>
            </div>
          )}

          {/* 2. VERIDEXA: Grounded Coordinate Citation Inspector */}
          {project.id === 'veridexa' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                <span className="text-purple-400 font-bold">COORDINATE CITATION AUDITOR</span>
                <span className="text-[9px] text-amber-300">ILLUSTRATIVE EXAMPLE</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#080D16] border border-slate-800 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">EXTRACTED FIELD:</span>
                  <span className="text-purple-300 font-semibold">Max Input Voltage</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">NORMALIZED VALUE:</span>
                  <span className="text-white font-bold">48.0 V DC (±0.5V)</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400">SOURCE CITATION:</span>
                  <span className="text-emerald-400 font-mono">Page 4 • Box [x:142, y:310, w:84, h:22]</span>
                </div>
              </div>
              <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-200">
                Rule Check: Invariance test passed. Value grounded in source PDF table. Zero hallucination.
              </div>
            </div>
          )}

          {/* 3. NUDGEKAVACH: Tamper-Evident SHA-256 Checksum */}
          {project.id === 'nudgekavach' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-bold">LOCAL EVIDENCE DOSSIER</span>
                <span>MUTATION OBSERVER ACTIVE</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#080D16] border border-slate-800 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">SIGNAL PATTERN:</span>
                  <span className="text-amber-400 font-semibold">Looping Timer Script Reset</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">STORAGE LOCATION:</span>
                  <span className="text-white">100% Local Device Storage</span>
                </div>
                <div className="mt-1 pt-1 border-t border-slate-800">
                  <span className="text-[9px] text-slate-400 block mb-0.5">SHA-256 TAMPER EVIDENCE:</span>
                  <div className="text-[9px] text-emerald-400 break-all bg-black/60 p-1.5 rounded border border-emerald-500/20">
                    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                  </div>
                </div>
              </div>
              <div className="text-[9px] text-slate-400">
                Evidence-first auditing protocol without cloud surveillance.
              </div>
            </div>
          )}

          {/* 4. CHRONOSAT: Interactive Temporal Scrubber Slider */}
          {project.id === 'chronosat' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                <span className="text-pink-400 font-bold">TEMPORAL INTERPOLATION SCRUBBER</span>
                <span className="text-[9px] text-amber-300">CONCEPTUAL SIMULATION</span>
              </div>

              {/* Scrubber slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span className={chronosatSlider < 30 ? 'text-pink-400 font-bold' : ''}>T0 (Day 0)</span>
                  <span className={chronosatSlider >= 30 && chronosatSlider <= 70 ? 'text-purple-400 font-bold' : ''}>
                    T+Δ (Synthesized Intermediate)
                  </span>
                  <span className={chronosatSlider > 70 ? 'text-pink-400 font-bold' : ''}>T1 (Day 3 Revisit)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={chronosatSlider}
                  onChange={(e) => setChronosatSlider(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              <div className="p-2.5 rounded-lg bg-[#080D16] border border-slate-800 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">CURRENT POSITION:</span>
                  <span className="text-pink-300 font-bold">{chronosatSlider}% Temporal Delta</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">MOTION VECTOR MATRIX:</span>
                  <span className="text-white">Gunnar Farneback Dense Flow</span>
                </div>
                <div className="text-[9px] text-slate-400 pt-1">
                  Synthesizes intermediate observation frames to fill satellite revisit blindspots.
                </div>
              </div>
            </div>
          )}

          {/* 5. HOSTELHUB: Digital Campus Network Graph */}
          {project.id === 'hostelhub' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                <span className="text-amber-400 font-bold">CAMPUS RESOURCE ECOSYSTEM</span>
                <span>AUTHENTICATED ACCESS</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-[#080D16] border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">CT EXAM ARCHIVES</span>
                  <span className="text-amber-300 font-bold">Categorized by Semester</span>
                </div>
                <div className="p-2 rounded bg-[#080D16] border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">STORAGE SECURITY</span>
                  <span className="text-emerald-400 font-bold">Supabase Row-Level Security</span>
                </div>
                <div className="p-2 rounded bg-[#080D16] border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">FILE HANDLING</span>
                  <span className="text-sky-400 font-bold">PDF In-Browser Previewer</span>
                </div>
                <div className="p-2 rounded bg-[#080D16] border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">COLLABORATION</span>
                  <span className="text-purple-400 font-bold">Subject Discussion Threads</span>
                </div>
              </div>
              <div className="text-[9px] text-slate-400 text-right">
                ARCHITECTURE: REACT + NODE + SUPABASE POSTGRESQL
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectInteractiveWorld;
