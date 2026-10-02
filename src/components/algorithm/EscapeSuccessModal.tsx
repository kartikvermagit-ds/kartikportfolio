import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Unlock, RotateCcw, ExternalLink, ArrowRight, ShieldCheck, Terminal, Sparkles } from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface EscapeSuccessModalProps {
  hintsUsedCount: number;
  attemptsCount: number;
  onPlayAgain: () => void;
  reducedMotion?: boolean;
}

export function EscapeSuccessModal({
  hintsUsedCount,
  attemptsCount,
  onPlayAgain,
  reducedMotion = false
}: EscapeSuccessModalProps) {
  const handleReplay = () => {
    playPathFeedback('select');
    onPlayAgain();
  };

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full rounded-2xl bg-[#070B14]/95 border border-emerald-500/40 p-6 sm:p-10 shadow-2xl font-mono text-center space-y-6 relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-3xl pointer-events-none" />

      {/* Cyber Brackets */}
      <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-500/60 pointer-events-none" />
      <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-500/60 pointer-events-none" />
      <span className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-500/60 pointer-events-none" />
      <span className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-500/60 pointer-events-none" />

      {/* Top Status */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-bold flex items-center gap-1.5 animate-pulse">
          <Unlock className="w-3.5 h-3.5 text-emerald-400" />
          SYSTEM STATUS: UNLOCKED
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
          KARTIK.OS ACCESS GRANTED
        </span>
      </div>

      {/* Main Success Title */}
      <div className="space-y-2 max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          ALL SYSTEMS SOLVED
        </h2>
        <div className="text-sm font-bold text-emerald-400">
          ALGORITHM ESCAPE COMPLETE
        </div>
      </div>

      {/* Completed Puzzles Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2 text-left">
        <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400">01. ARRAY LOGIC</div>
            <div className="text-xs font-bold text-white">Two Sum Complement</div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>

        <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400">02. STACK VALIDATION</div>
            <div className="text-xs font-bold text-white">LIFO Scope Integrity</div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>

        <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400">03. GRAPH ESCAPE</div>
            <div className="text-xs font-bold text-white">Neighbor Traversal</div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>
      </div>

      {/* Narrative Reflection */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/70 border border-slate-800 max-w-2xl mx-auto text-left space-y-2">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          CORE PHILOSOPHY
        </div>
        <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed italic">
          "Problem solving is less about memorizing answers and more about finding the right way to think about the problem."
        </p>
        <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
          From recognizing when an associative hash map trades memory for linear time, to using a LIFO stack for tracking recursive syntax nesting, to systematically navigating graph adjacency — disciplined computer science thinking turns complex systems into solvable steps.
        </p>
      </div>

      {/* Telemetry Summary */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-1">
        <div>
          PUZZLES SOLVED: <span className="text-emerald-300 font-bold">3 / 3</span>
        </div>
        <span>•</span>
        <div>
          TOTAL ATTEMPTS: <span className="text-white font-bold">{attemptsCount}</span>
        </div>
        <span>•</span>
        <div>
          HINTS CONSULTED: <span className="text-amber-300 font-bold">{hintsUsedCount}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
        <button
          type="button"
          onClick={handleReplay}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>PLAY AGAIN</span>
        </button>

        <a
          href="#problem-solving"
          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <span>VIEW CODING PROFILES & 3D DSA GRAPH</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

export default EscapeSuccessModal;
