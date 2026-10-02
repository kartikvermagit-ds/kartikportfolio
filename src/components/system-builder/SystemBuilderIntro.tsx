import React from 'react';
import { motion } from 'framer-motion';
import { Network, Play, ExternalLink, ArrowRight, ShieldCheck, Sparkles, Cpu } from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface SystemBuilderIntroProps {
  onStart: () => void;
  reducedMotion?: boolean;
}

export function SystemBuilderIntro({ onStart, reducedMotion = false }: SystemBuilderIntroProps) {
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
      className="relative rounded-2xl border border-blue-500/30 bg-[#070B14]/95 backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden text-center space-y-6"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 blur-3xl pointer-events-none" />

      {/* Cyber brackets */}
      <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-blue-500/60 pointer-events-none" />
      <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-blue-500/60 pointer-events-none" />
      <span className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-blue-500/60 pointer-events-none" />
      <span className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-blue-500/60 pointer-events-none" />

      {/* Top Header Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px]">
        <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/40 text-blue-300 font-semibold tracking-wider flex items-center gap-1.5">
          <Network className="w-3.5 h-3.5 text-blue-400" />
          SYSTEM BUILDER • ARCHITECTURE WORKBENCH
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 font-bold">
          DESIGN THE SYSTEM • FOLLOW THE DATA
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
          PORTFOLIO SIMULATION
        </span>
      </div>

      {/* Title & Narrative */}
      <div className="space-y-3 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          SYSTEM BUILDER
        </h2>
        <p className="text-sm sm:text-base font-semibold text-blue-300 font-mono">
          Every product starts with a flow of information. Choose the components and watch the architecture come alive.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          Assemble real software and AI architectures across six architectural tiers: Data Source, Processing, Intelligence, Storage, API, and Frontend. Run live simulated data flows, evaluate structural invariants, and see how the exact same architectural thinking powers PYRAVEX, Veridexa, ChronoSat, and HostelHub.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleStart}
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono text-sm font-bold tracking-wider shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-3 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
          <span>START BUILDING</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <a
          href="#work"
          className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
        >
          <span>VIEW REAL PROJECTS</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Subtle Educational Disclaimer */}
      <div className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2 pt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        <span>EDUCATIONAL ARCHITECTURAL SIMULATION • GROUNDED IN VERIFIED PORTFOLIO REPOSITORIES</span>
      </div>
    </motion.div>
  );
}

export default SystemBuilderIntro;
