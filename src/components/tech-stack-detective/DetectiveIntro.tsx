import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
  Terminal,
  Network
} from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface DetectiveIntroProps {
  onStart: () => void;
  onResume: () => void;
  onOpenConstellation: () => void;
  onReset: () => void;
  hasStarted: boolean;
  completedCasesCount: number;
  totalCasesCount: number;
  reducedMotion?: boolean;
}

export function DetectiveIntro({
  onStart,
  onResume,
  onOpenConstellation,
  onReset,
  hasStarted,
  completedCasesCount,
  totalCasesCount,
  reducedMotion = false
}: DetectiveIntroProps) {
  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-white/10 bg-[#070B14]/90 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-2xl">
      {/* Background Decorative Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        {/* Top Header Monospace Badge */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono uppercase tracking-widest"
        >
          <Search className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>FORENSIC ARCHITECTURE DOSSIER // STACK TRACE</span>
        </motion.div>

        {/* Main Title & Positioning */}
        <div className="space-y-4">
          <motion.h2
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-white font-mono"
          >
            TECH STACK DETECTIVE
          </motion.h2>

          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg sm:text-xl font-medium text-blue-200/90 font-mono"
          >
            Can you identify the technology behind the system?
          </motion.p>

          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed"
          >
            Follow the clues. Inspect the architecture. Find the stack. An evidence-first investigation discovering how real engineering systems connect.
          </motion.p>
        </div>

        {/* Small Metadata Chips */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono text-slate-400"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-white font-semibold">{totalCasesCount} CASE FILES</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>REAL VERIFIED PROJECTS</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>DETERMINISTIC CLUES</span>
          </div>
        </motion.div>

        {/* Existing Session Alert if partially complete */}
        {hasStarted && completedCasesCount > 0 && completedCasesCount < totalCasesCount && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-mono text-left"
          >
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              INVESTIGATION IN PROGRESS: <strong className="text-white">{completedCasesCount} of {totalCasesCount}</strong> cases solved in this session.
            </span>
          </motion.div>
        )}

        {/* Primary Action Buttons */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          {hasStarted && completedCasesCount > 0 && completedCasesCount < totalCasesCount ? (
            <>
              <button
                type="button"
                onClick={() => {
                  playPathFeedback('select');
                  onResume();
                }}
                className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-mono text-sm font-semibold tracking-wider flex items-center justify-center gap-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>RESUME INVESTIGATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  playPathFeedback('tick');
                  onReset();
                }}
                className="w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>START FRESH</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                playPathFeedback('select');
                onStart();
              }}
              className="w-full sm:w-auto min-h-[44px] px-9 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-sm font-bold tracking-wider flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>[ START INVESTIGATION ]</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              playPathFeedback('select');
              onOpenConstellation();
            }}
            className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-white font-mono text-xs tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Network className="w-4 h-4 text-purple-400" />
            <span>EXPLORE TECH CONSTELLATION</span>
          </button>
        </motion.div>

        {/* Methodology Footer Note */}
        <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-500 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span>NO TRIVIA • NO FABRICATIONS</span>
          <span>•</span>
          <span>DIRECT PROJECT TELEMETRY</span>
          <span>•</span>
          <span>EXPLORE • DISCOVER • UNDERSTAND</span>
        </div>
      </div>
    </div>
  );
}
