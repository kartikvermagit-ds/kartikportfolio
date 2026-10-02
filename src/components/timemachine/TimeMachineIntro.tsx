import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, Sparkles, Orbit, ShieldCheck, ArrowRight } from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface TimeMachineIntroProps {
  onStart: () => void;
  reducedMotion?: boolean;
}

export function TimeMachineIntro({ onStart, reducedMotion = false }: TimeMachineIntroProps) {
  const handleStart = () => {
    playPathFeedback('select');
    onStart();
  };

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-2xl border border-pink-500/30 bg-[#090D18]/95 backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-500/10 via-purple-600/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-sky-500/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none" />

      {/* Cyber corner accents */}
      <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-pink-500/60 pointer-events-none" />
      <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-pink-500/60 pointer-events-none" />
      <span className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-pink-500/60 pointer-events-none" />
      <span className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-pink-500/60 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px]">
          <span className="px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-300 font-semibold tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            CHRONOSAT • TEMPORAL INTELLIGENCE
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
            BHARATIYA ANTARIKSH HACKATHON 2026
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300">
            PORTFOLIO SIMULATION
          </span>
        </div>

        {/* Mission Title */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-pink-400 tracking-widest uppercase">
            MISSION 01 • TEMPORAL GAP EXPLORATION
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            WHAT HAPPENED BETWEEN TWO SATELLITE OBSERVATIONS?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
            Earth observation satellites follow fixed orbital revisit schedules (often 24 to 72 hours), leaving critical blindspots during evolving environmental disasters. Step into the temporal intelligence console to reconstruct missing moments through deep optical flow interpolation.
          </p>
        </div>

        {/* Mission Telemetry Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
          <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800/90 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Orbit className="w-3 h-3 text-sky-400" />
              TEMPORAL GAP
            </div>
            <div className="text-sm font-mono font-bold text-sky-300">48-Hour Blindspot</div>
            <div className="text-[11px] text-slate-400">Between consecutive satellite passes</div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800/90 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-pink-400" />
              SYNTHESIS CORE
            </div>
            <div className="text-sm font-mono font-bold text-pink-300">Optical Flow Vectors</div>
            <div className="text-[11px] text-slate-400">Pixel motion trajectory modeling</div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800/90 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              EVIDENCE VERIFICATION
            </div>
            <div className="text-sm font-mono font-bold text-emerald-300">T1 Revisit Pass</div>
            <div className="text-[11px] text-slate-400">Ground-truth validation check</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-mono text-sm font-bold tracking-wider shadow-lg shadow-pink-600/25 hover:shadow-pink-600/40 transition-all flex items-center justify-center gap-3 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
            <span>ENTER TIME MACHINE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Clear Simulation Notice */}
        <div className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2 pt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
          <span>PORTFOLIO SIMULATION • DEMONSTRATES CHRONOSAT TEMPORAL RECONSTRUCTION CONCEPT</span>
        </div>
      </div>
    </motion.div>
  );
}

export default TimeMachineIntro;
