import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Lock, Play, ArrowRight, ShieldAlert, Cpu, Binary } from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface AlgorithmEscapeIntroProps {
  onStart: () => void;
  reducedMotion?: boolean;
}

export function AlgorithmEscapeIntro({ onStart, reducedMotion = false }: AlgorithmEscapeIntroProps) {
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
      {/* Background glow effects */}
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
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          KARTIK.OS • ALGORITHMIC PUZZLE SYSTEM
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-red-950/70 border border-red-500/40 text-red-300 font-bold flex items-center gap-1">
          <Lock className="w-3 h-3 text-red-400" />
          SYSTEM STATUS: LOCKED
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
          PORTFOLIO INTERACTION
        </span>
      </div>

      {/* Title & Narrative */}
      <div className="space-y-3 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          ALGORITHM ESCAPE
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          "Three problems stand between you and the exit."
        </p>
        <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
          Traverse an interactive sequence of core data structure and algorithmic challenges: array complement lookup, stack-based bracket verification, and graph traversal. Solve each puzzle to restore terminal continuity and unlock the system.
        </p>
      </div>

      {/* Algorithmic Methodology Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto pt-2 text-left font-mono">
        <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800/90 space-y-1">
          <div className="text-[10px] text-blue-400 font-bold flex items-center gap-1">
            <Binary className="w-3.5 h-3.5" /> 01. ARRAYS
          </div>
          <div className="text-sm font-bold text-white">Target Sum Pair</div>
          <div className="text-[11px] text-slate-400 font-sans">Linear search vs complement lookup</div>
        </div>

        <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800/90 space-y-1">
          <div className="text-[10px] text-purple-400 font-bold flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" /> 02. STACK
          </div>
          <div className="text-sm font-bold text-white">Bracket LIFO</div>
          <div className="text-[11px] text-slate-400 font-sans">Scope validation & memory order</div>
        </div>

        <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800/90 space-y-1">
          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" /> 03. GRAPH
          </div>
          <div className="text-sm font-bold text-white">Path Traversal</div>
          <div className="text-[11px] text-slate-400 font-sans">Adjacency exploration to exit node</div>
        </div>
      </div>

      {/* Action Trigger */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleStart}
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono text-sm font-bold tracking-wider shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-3 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
          <span>START CHALLENGE</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Subtle Disclaimer Footer */}
      <div className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2 pt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        <span>CONCEPTUAL INTERACTION DEMONSTRATING PROBLEM-SOLVING PRINCIPLES</span>
      </div>
    </motion.div>
  );
}

export default AlgorithmEscapeIntro;
