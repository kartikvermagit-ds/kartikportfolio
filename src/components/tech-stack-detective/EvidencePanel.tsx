import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import type { StackCase } from '../../types/techStackDetective';
import { playPathFeedback } from '../../utils/audioFeedback';

interface EvidencePanelProps {
  activeCase: StackCase;
  hintsRevealed: number; // 0, 1, or 2
  onRequestHint: () => void;
  reducedMotion?: boolean;
}

export function EvidencePanel({
  activeCase,
  hintsRevealed,
  onRequestHint,
  reducedMotion = false
}: EvidencePanelProps) {
  const [showHintsBox, setShowHintsBox] = useState<boolean>(true);

  return (
    <div className="w-full space-y-4">
      {/* Evidence Dossier Container */}
      <div className="rounded-xl border border-white/10 bg-[#090D18]/90 backdrop-blur-md p-5 sm:p-6 shadow-xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-blue-400">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="font-semibold uppercase">EVIDENCE DOSSIER // CASE TELEMETRY</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {activeCase.evidence.length} RECON ARTIFACTS
          </span>
        </div>

        {/* Evidence Cards Stack */}
        <div className="space-y-3">
          {activeCase.evidence.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="relative rounded-lg border border-white/[0.08] hover:border-blue-500/30 bg-white/[0.02] hover:bg-white/[0.04] p-3.5 transition-all group"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300">
                  EVIDENCE #0{idx + 1} • {item.badge}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{item.label}</span>
              </div>
              <div className="text-sm font-mono font-semibold text-white tracking-wide mb-1">
                {item.value}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed font-sans">
                {item.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture Flow Clue (if applicable for Type D) */}
        {activeCase.architectureFlow && activeCase.architectureFlow.length > 0 && (
          <div className="pt-2">
            <div className="text-[11px] font-mono uppercase text-purple-300 mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>ARCHITECTURE DATA PIPELINE FLOW</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-purple-500/20 space-y-1.5">
              {activeCase.architectureFlow.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center text-[10px] shrink-0 font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200">{step}</span>
                  {idx < activeCase.architectureFlow!.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-purple-400/60 ml-auto shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Educational Hint Accordion */}
      <div className="rounded-xl border border-white/10 bg-[#090D18]/90 backdrop-blur-md overflow-hidden shadow-lg">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="font-semibold uppercase">ARCHITECTURAL HINTS</span>
            <span className="text-[11px] text-slate-400 font-normal">
              ({hintsRevealed} of {activeCase.hints.length} unlocked)
            </span>
          </div>

          {hintsRevealed < activeCase.hints.length ? (
            <button
              type="button"
              onClick={() => {
                playPathFeedback('tick');
                onRequestHint();
              }}
              className="min-h-[44px] px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium tracking-wide flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>REQUEST HINT {hintsRevealed + 1}</span>
            </button>
          ) : (
            <span className="text-[11px] font-mono text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
              ALL HINTS UNLOCKED
            </span>
          )}
        </div>

        {hintsRevealed > 0 && (
          <div className="px-4 pb-4 pt-1 space-y-2 border-t border-white/[0.06]">
            {activeCase.hints.slice(0, hintsRevealed).map((hint, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-amber-500/[0.06] border border-amber-500/20 text-xs text-amber-100/90 leading-relaxed font-mono flex items-start gap-2.5"
              >
                <span className="font-bold text-amber-400 shrink-0">HINT {idx + 1}:</span>
                <span>{hint}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
