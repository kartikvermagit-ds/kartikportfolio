import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import type { ReactorState } from '../../types/codeReactor';

interface ReactorCoreProps {
  state: ReactorState;
  reducedMotion?: boolean;
}

export function ReactorCore({ state, reducedMotion = false }: ReactorCoreProps) {
  const getStatusColor = () => {
    switch (state) {
      case 'SUCCESS':
      case 'COMPLETE':
        return {
          glow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
          border: 'border-emerald-500/50',
          text: 'text-emerald-300',
          badge: 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300',
          coreRing: 'border-emerald-400'
        };
      case 'ERROR':
        return {
          glow: 'from-red-500/20 via-orange-500/10 to-transparent',
          border: 'border-red-500/50',
          text: 'text-red-300',
          badge: 'bg-red-950/70 border-red-500/40 text-red-300',
          coreRing: 'border-red-400'
        };
      case 'PROCESSING':
        return {
          glow: 'from-purple-500/20 via-blue-500/10 to-transparent',
          border: 'border-purple-500/50',
          text: 'text-purple-300',
          badge: 'bg-purple-950/70 border-purple-500/40 text-purple-300',
          coreRing: 'border-purple-400'
        };
      default:
        return {
          glow: 'from-blue-500/15 via-indigo-500/10 to-transparent',
          border: 'border-blue-500/40',
          text: 'text-blue-300',
          badge: 'bg-blue-950/70 border-blue-500/40 text-blue-300',
          coreRing: 'border-blue-400'
        };
    }
  };

  const style = getStatusColor();

  const pipelineStages = [
    { label: 'INPUT', active: ['IDLE', 'INITIALIZING', 'READY', 'PLAYING', 'PROCESSING', 'SUCCESS', 'COMPLETE'].includes(state) },
    { label: 'ANALYZE', active: ['PLAYING', 'PROCESSING', 'SUCCESS', 'COMPLETE'].includes(state) },
    { label: 'EXECUTE', active: ['PROCESSING', 'SUCCESS', 'COMPLETE'].includes(state) },
    { label: 'VERIFY', active: ['SUCCESS', 'COMPLETE'].includes(state) },
    { label: 'RESULT', active: ['SUCCESS', 'COMPLETE'].includes(state) }
  ];

  return (
    <div className="w-full rounded-2xl bg-[#070B14]/90 border border-slate-800 p-4 sm:p-5 shadow-2xl font-mono overflow-hidden relative">
      {/* Background glow based on reactor state */}
      <div className={`absolute inset-0 bg-gradient-to-b ${style.glow} blur-2xl pointer-events-none transition-all duration-500`} />

      {/* Header telemetry */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3 text-xs">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-400" />
          <span className="text-white font-bold tracking-wider">CENTRAL CODE CORE</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${style.badge} flex items-center gap-1.5`}>
            {state === 'PROCESSING' && <Activity className="w-3 h-3 animate-spin" />}
            {state === 'SUCCESS' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            {state === 'ERROR' && <AlertTriangle className="w-3 h-3 text-red-400" />}
            <span>STATUS: {state}</span>
          </span>
        </div>
      </div>

      {/* Visual Reactor Core Diagram */}
      <div className="relative z-10 py-4 flex flex-col items-center justify-center">
        {/* Central Core Concentric Geometry */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
          {/* Outer rotating cyber ring */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-dashed ${style.coreRing} opacity-40 ${
              reducedMotion ? '' : 'animate-spin-slow'
            }`}
          />

          {/* Inner pulsating glow circle */}
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border ${style.border} bg-black/80 flex flex-col items-center justify-center shadow-xl backdrop-blur-md transition-all duration-300`}
          >
            <Zap className={`w-6 h-6 sm:w-8 sm:h-8 ${style.text} transition-colors ${state === 'PROCESSING' ? 'animate-bounce' : ''}`} />
            <span className="text-[10px] font-bold text-white tracking-widest mt-1">CORE</span>
            <span className="text-[8px] text-slate-400">ACTIVE</span>
          </div>

          {/* Orbiting data particle dots */}
          {!reducedMotion && (
            <>
              <div className="absolute top-1 left-8 w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <div className="absolute bottom-2 right-8 w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            </>
          )}
        </div>

        {/* Dynamic Data Flow Pipeline (INPUT -> ANALYZE -> EXECUTE -> VERIFY -> RESULT) */}
        <div className="w-full max-w-xl pt-4">
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            {pipelineStages.map((stageItem, idx) => (
              <React.Fragment key={`stage-${stageItem.label}`}>
                <div
                  className={`px-2.5 py-1 rounded-md border font-bold transition-all ${
                    stageItem.active
                      ? 'bg-blue-950/80 border-blue-400/60 text-blue-200 shadow-md shadow-blue-900/30'
                      : 'bg-black/50 border-slate-800 text-slate-400'
                  }`}
                >
                  {stageItem.label}
                </div>
                {idx < pipelineStages.length - 1 && (
                  <ArrowRight
                    className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
                      pipelineStages[idx + 1].active ? 'text-blue-400' : 'text-slate-400'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReactorCore;
