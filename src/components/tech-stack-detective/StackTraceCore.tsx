import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Cpu,
  Sparkles,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Zap,
  Layers,
  Star
} from 'lucide-react';
import type { StackCase } from '../../types/techStackDetective';

interface StackTraceCoreProps {
  cases: StackCase[];
  currentCaseIndex: number;
  completedCaseIds: string[];
  discoveredTechs: string[];
  hintsUsed: number;
  onSelectCaseIndex: (index: number) => void;
  reducedMotion?: boolean;
}

export function StackTraceCore({
  cases,
  currentCaseIndex,
  completedCaseIds,
  discoveredTechs,
  hintsUsed,
  onSelectCaseIndex,
  reducedMotion = false
}: StackTraceCoreProps) {
  // Easter egg check: React + TypeScript + Python + FastAPI
  const hasReact = discoveredTechs.some((t) => t.toLowerCase().includes('react'));
  const hasTypeScript = discoveredTechs.some((t) => t.toLowerCase().includes('typescript') || t.toLowerCase().includes('nudgekavach')); // or core
  const hasPython = discoveredTechs.some((t) => t.toLowerCase().includes('python') || t.toLowerCase().includes('fastapi'));
  const hasFastAPI = discoveredTechs.some((t) => t.toLowerCase().includes('fastapi'));

  // If at least 3 cases solved including FastAPI and Python/React:
  const isEasterEggActive = (hasFastAPI && hasPython && completedCaseIds.length >= 2) || (completedCaseIds.length >= 4);

  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#090D18]/90 backdrop-blur-md p-5 sm:p-6 shadow-xl space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-purple-400">
          <Terminal className="w-4 h-4 text-purple-400" />
          <span>STACK TRACE // CORE TELEMETRY</span>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE RECON</span>
        </span>
      </div>

      {/* Case Progression Scrubber */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>INVESTIGATION DOSSIERS</span>
          <span className="text-white font-semibold">
            {completedCaseIds.length} / {cases.length} RESOLVED
          </span>
        </div>

        <div className="grid grid-cols-6 gap-1.5">
          {cases.map((c, idx) => {
            const isCompleted = completedCaseIds.includes(c.id);
            const isCurrent = idx === currentCaseIndex;

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectCaseIndex(idx)}
                className={`py-2 px-1 rounded-lg border text-center transition-all cursor-pointer font-mono text-xs flex flex-col items-center justify-center gap-1 ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-500/20 text-white shadow-md shadow-blue-500/25 ring-1 ring-blue-500/50'
                    : isCompleted
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                    : 'border-white/10 bg-white/[0.02] text-slate-500 hover:bg-white/[0.05]'
                }`}
                title={`${c.caseId}: ${c.title}`}
              >
                <span className="text-[10px] font-bold">0{idx + 1}</span>
                {isCompleted ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isCurrent ? 'bg-blue-400 animate-ping' : 'bg-slate-600'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Discovered Tech Stack Pill Matrix */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>DISCOVERED STACK NODES</span>
          <span className="text-xs text-blue-400 font-semibold">{discoveredTechs.length} NODES</span>
        </div>

        <div className="min-h-[96px] p-3 rounded-lg bg-black/40 border border-white/[0.06] flex flex-wrap gap-1.5 items-start content-start">
          {discoveredTechs.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-center py-5 text-slate-500 text-xs font-mono">
              <Cpu className="w-5 h-5 mb-1.5 opacity-40 text-slate-400" />
              <span>No technologies uncovered yet. Solve a case to reveal verified stack nodes.</span>
            </div>
          ) : (
            discoveredTechs.map((tech, idx) => (
              <motion.div
                key={tech}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-500/15 to-purple-500/15 border border-blue-500/30 text-white font-mono text-xs shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>{tech}</span>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Easter Egg Notice (Section 39) */}
      <AnimatePresence>
        {isEasterEggActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 rounded-lg bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-500/30 space-y-1"
          >
            <div className="flex items-center gap-1.5 text-xs font-mono text-purple-300 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>STACK PATTERN DETECTED</span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono italic">
              "That combination looks familiar." — React + Python + FastAPI + TypeScript architecture verified across Kartik's flagship systems.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightweight Session Metadata */}
      <div className="pt-2 border-t border-white/[0.06] grid grid-cols-2 gap-2 text-center text-xs font-mono">
        <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
          <div className="text-[10px] text-slate-500">HINTS USED</div>
          <div className="text-white font-bold text-sm mt-0.5">{hintsUsed}</div>
        </div>
        <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
          <div className="text-[10px] text-slate-500">STACK CONFIDENCE</div>
          <div className="text-emerald-400 font-bold text-sm mt-0.5">
            {Math.round((completedCaseIds.length / cases.length) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}
