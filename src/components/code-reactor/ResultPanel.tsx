import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Zap, ArrowRight, BookOpen, Layers, ChevronDown } from 'lucide-react';
import type { CodeReactorChallenge } from '../../types/codeReactor';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ResultPanelProps {
  challenge: CodeReactorChallenge;
  isLastChallenge: boolean;
  onNext: () => void;
  reducedMotion?: boolean;
}

export function ResultPanel({
  challenge,
  isLastChallenge,
  onNext,
  reducedMotion = false
}: ResultPanelProps) {
  const [showDeepExplanation, setShowDeepExplanation] = useState<boolean>(false);

  const handleNextClick = () => {
    playPathFeedback('select');
    onNext();
  };

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-2xl bg-[#080D1A]/95 border border-emerald-500/40 p-5 sm:p-6 shadow-2xl font-mono space-y-4 text-left"
    >
      {/* Result Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>REACTOR STABLE • CHALLENGE RESOLVED</span>
        </div>
        <span className="text-[10px] text-slate-400">CONCEPT REVEALED</span>
      </div>

      {/* Concept Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-black/60 border border-slate-800 space-y-1">
          <div className="text-[10px] text-blue-400 font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>PRIMARY CONCEPT</span>
          </div>
          <div className="text-white font-bold">{challenge.concept}</div>
        </div>

        <div className="p-3 rounded-xl bg-black/60 border border-slate-800 space-y-1">
          <div className="text-[10px] text-purple-400 font-bold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>ALGORITHMIC COMPLEXITY</span>
          </div>
          <div className="text-slate-200 font-bold">{challenge.complexity}</div>
        </div>
      </div>

      {/* Why & Engineering Context */}
      <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-2 text-xs">
        <div className="text-[10px] text-slate-400 font-bold uppercase">
          ENGINEERING SIGNIFICANCE
        </div>
        <p className="text-slate-300 font-sans leading-relaxed">
          {challenge.explanation}
        </p>
        <div className="text-[11px] text-blue-300 pt-1 flex items-center gap-1.5 font-sans">
          <span className="font-mono text-[9px] text-blue-400">▸</span>
          <span>{challenge.projectConnection}</span>
        </div>
      </div>

      {/* Expandable Deeper Explanation Toggle */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => {
            setShowDeepExplanation(!showDeepExplanation);
            playPathFeedback('tick');
          }}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          <span>{showDeepExplanation ? 'HIDE DETAILS' : 'SHOW DEEPER EXPLANATION'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${showDeepExplanation ? 'rotate-180 text-blue-400' : ''}`}
          />
        </button>

        <AnimatePresence>
          {showDeepExplanation && (
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              className="mt-2 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed space-y-1"
            >
              <div className="font-mono text-[10px] text-blue-400 font-bold">DEEP DIVE:</div>
              <p>
                In production systems, small algorithmic decisions determine responsiveness under load. Choosing appropriate invariants (e.g. strict loop upper bounds, constant-time associative queries, and non-recursive LIFO structures) directly mitigates memory leak vectors and latency spikes.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Next Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={handleNextClick}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold tracking-wider flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
        >
          <span>{isLastChallenge ? 'COMPLETE CODE REACTOR' : 'NEXT CHALLENGE'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export default ResultPanel;
