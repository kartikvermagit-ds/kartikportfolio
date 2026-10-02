import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Eye,
  ExternalLink,
  Code2,
  Network,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import type { StackCase, DetectiveState } from '../../types/techStackDetective';
import { playPathFeedback } from '../../utils/audioFeedback';

interface QuestionPanelProps {
  activeCase: StackCase;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  onSubmitAnswer: () => void;
  onRetry: () => void;
  onRevealAnswer: () => void;
  onNextCase: () => void;
  onViewProject: (projectId: string) => void;
  onOpenSystemBuilder: (presetId?: string) => void;
  state: DetectiveState;
  attemptsCount: number;
  hasRevealed: boolean;
  isLastCase: boolean;
  reducedMotion?: boolean;
}

const OPTION_KEYS = ['A', 'B', 'C', 'D'];

export function QuestionPanel({
  activeCase,
  selectedOptionId,
  onSelectOption,
  onSubmitAnswer,
  onRetry,
  onRevealAnswer,
  onNextCase,
  onViewProject,
  onOpenSystemBuilder,
  state,
  attemptsCount,
  hasRevealed,
  isLastCase,
  reducedMotion = false
}: QuestionPanelProps) {
  const isVerified = state === 'VERIFIED' || hasRevealed;
  const isFailed = state === 'FAILED';

  // Keyboard shortcut listener for options [A, B, C, D] and Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toUpperCase();
      const index = OPTION_KEYS.indexOf(key);

      if (index !== -1 && index < activeCase.options.length) {
        if (!isVerified && !isFailed) {
          e.preventDefault();
          playPathFeedback('tick');
          onSelectOption(activeCase.options[index].id);
        }
      } else if (e.key === 'Enter') {
        if (!isVerified && !isFailed && selectedOptionId) {
          e.preventDefault();
          onSubmitAnswer();
        } else if (isFailed) {
          e.preventDefault();
          onRetry();
        } else if (isVerified) {
          e.preventDefault();
          onNextCase();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeCase,
    selectedOptionId,
    isVerified,
    isFailed,
    onSelectOption,
    onSubmitAnswer,
    onRetry,
    onNextCase
  ]);

  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#090D18]/90 backdrop-blur-md p-5 sm:p-7 lg:p-8 shadow-xl space-y-6">
      {/* Top Case Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-blue-500/20 border border-blue-500/40 text-blue-300">
            {activeCase.caseId}
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-slate-300">
            {activeCase.level}
          </span>
          <span className="text-xs font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
            {activeCase.typeLabel}
          </span>
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <span>PROJECT:</span>
          <strong className="text-white tracking-wider">{activeCase.projectName}</strong>
        </div>
      </div>

      {/* Question Prompt Box */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
          <span>INVESTIGATION PROMPT</span>
        </div>
        <h3 className="text-base sm:text-lg lg:text-xl font-mono font-medium text-white leading-relaxed">
          {activeCase.question}
        </h3>
      </div>

      {/* Answer Options Grid */}
      <div className="space-y-3 pt-1">
        <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>SELECT CONCLUSION [KEYS A-D]</span>
          {attemptsCount > 0 && !isVerified && (
            <span className="text-amber-400">ATTEMPT #{attemptsCount + 1}</span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {activeCase.options.map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrectAnswer = opt.id === activeCase.correctAnswerId;
            const keyLabel = OPTION_KEYS[idx];

            let stateStyle = 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-blue-500/40 text-slate-200';

            if (isVerified) {
              if (isCorrectAnswer) {
                stateStyle = 'border-emerald-500/60 bg-emerald-500/15 text-white ring-1 ring-emerald-500/50 shadow-md shadow-emerald-500/20';
              } else if (isSelected) {
                stateStyle = 'border-red-500/40 bg-red-500/10 text-slate-400 opacity-60';
              } else {
                stateStyle = 'border-white/5 bg-black/20 text-slate-500 opacity-40';
              }
            } else if (isFailed) {
              if (isSelected) {
                stateStyle = 'border-red-500/60 bg-red-500/15 text-white ring-1 ring-red-500/40 animate-shake';
              } else {
                stateStyle = 'border-white/10 bg-white/[0.02] text-slate-400 opacity-70';
              }
            } else if (isSelected) {
              stateStyle = 'border-blue-500 bg-blue-500/20 text-white ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/15';
            }

            return (
              <motion.button
                key={opt.id}
                type="button"
                disabled={isVerified}
                onClick={() => {
                  if (isVerified) return;
                  playPathFeedback('tick');
                  onSelectOption(opt.id);
                }}
                whileHover={!reducedMotion && !isVerified ? { y: -1 } : {}}
                whileTap={!reducedMotion && !isVerified ? { scale: 0.99 } : {}}
                className={`w-full min-h-[48px] text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${stateStyle}`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                    isVerified && isCorrectAnswer
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/50'
                      : isSelected
                      ? 'bg-blue-500 text-white shadow-sm shadow-blue-500/50'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {keyLabel}
                </span>

                <div className="flex-1 space-y-1">
                  <div className="text-sm sm:text-base font-mono font-medium leading-snug">
                    {opt.text}
                  </div>
                  {opt.subtext && (
                    <div className="text-xs text-slate-400 font-sans leading-relaxed">
                      {opt.subtext}
                    </div>
                  )}
                  {opt.codeTag && (
                    <div className="text-[11px] font-mono text-blue-300/80 bg-black/40 px-2 py-0.5 rounded w-fit mt-1 border border-white/[0.06]">
                      <code>{opt.codeTag}</code>
                    </div>
                  )}
                </div>

                {isVerified && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                {isFailed && isSelected && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Action / Feedback Status Panel */}
      <AnimatePresence mode="wait">
        {!isVerified && !isFailed && (
          <motion.div
            key="submit-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-end pt-2"
          >
            <button
              type="button"
              disabled={!selectedOptionId}
              onClick={() => {
                playPathFeedback('select');
                onSubmitAnswer();
              }}
              className="min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-mono text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer transition-all"
            >
              <span>CONFIRM CONCLUSION [ENTER]</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {isFailed && (
          <motion.div
            key="failed-feedback"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs sm:text-sm font-mono space-y-3"
          >
            <div className="flex items-center gap-2 text-red-400 font-bold">
              <XCircle className="w-4 h-4 text-red-400" />
              <span>NOT THIS ONE — RE-INSPECT EVIDENCE</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">
              The selected technology or role does not align with the verified architecture of this system. Consult the clues or hints to reconsider.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  playPathFeedback('tick');
                  onRetry();
                }}
                className="min-h-[44px] px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>TRY AGAIN</span>
              </button>

              {attemptsCount >= 2 && (
                <button
                  type="button"
                  onClick={() => {
                    playPathFeedback('select');
                    onRevealAnswer();
                  }}
                  className="min-h-[44px] px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>REVEAL ANSWER & LEARN</span>
                </button>
              )}
            </div>
          </motion.div>
        )}

        {isVerified && (
          <motion.div
            key="verified-feedback"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-emerald-950/40 border border-emerald-500/30 p-5 space-y-4 shadow-xl"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>VERIFIED ✓ ARCHITECTURAL MATCH</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-300/80 px-2 py-0.5 rounded bg-emerald-500/10">
                USED IN: {activeCase.projectName}
              </span>
            </div>

            {/* Revealed Tech & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-black/40 border border-emerald-500/20">
                <div className="text-[10px] text-slate-400 uppercase">TECHNOLOGY</div>
                <div className="text-base font-bold text-white mt-0.5">{activeCase.technology}</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-emerald-500/20">
                <div className="text-[10px] text-slate-400 uppercase">SYSTEM ROLE</div>
                <div className="text-sm font-semibold text-emerald-300 mt-0.5">{activeCase.role}</div>
              </div>
            </div>

            {/* Why It Fits Explanation */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-mono uppercase text-emerald-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>WHY IT FITS THIS ARCHITECTURE</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {activeCase.whyItFits}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-emerald-500/20">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onViewProject(activeCase.projectId)}
                  className="min-h-[44px] px-3.5 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-blue-500/40 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  <span>EXPLORE PROJECT</span>
                </button>

                {activeCase.systemBuilderPresetId && (
                  <button
                    type="button"
                    onClick={() => onOpenSystemBuilder(activeCase.systemBuilderPresetId)}
                    className="min-h-[44px] px-3.5 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-purple-500/40 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Network className="w-3.5 h-3.5 text-purple-400" />
                    <span>SEE IT IN A SYSTEM</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  playPathFeedback('select');
                  onNextCase();
                }}
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs sm:text-sm font-bold tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all"
              >
                <span>{isLastCase ? 'COMPLETE INVESTIGATION' : 'NEXT CASE →'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
