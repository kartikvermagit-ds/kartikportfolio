import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, HelpCircle, RotateCcw, Lightbulb, Lock, Unlock } from 'lucide-react';
import type { EscapeStage } from '../../types/algorithmEscape';
import { playPathFeedback } from '../../utils/audioFeedback';

interface PuzzleProgressHeaderProps {
  currentStage: EscapeStage;
  solvedStages: { array: boolean; stack: boolean; graph: boolean };
  hints: string[];
  hintsUsedCount: number;
  attemptsCount: number;
  onUseHint: () => void;
  onResetPuzzle: () => void;
  reducedMotion?: boolean;
}

export function PuzzleProgressHeader({
  currentStage,
  solvedStages,
  hints,
  hintsUsedCount,
  attemptsCount,
  onUseHint,
  onResetPuzzle,
  reducedMotion = false
}: PuzzleProgressHeaderProps) {
  const [hintIndex, setHintIndex] = useState<number>(-1);
  const [showHintDrawer, setShowHintDrawer] = useState<boolean>(false);

  const stages = [
    { id: 'PUZZLE_ARRAY', number: '01 / 03', label: 'ARRAY', isSolved: solvedStages.array },
    { id: 'PUZZLE_STACK', number: '02 / 03', label: 'STACK', isSolved: solvedStages.stack },
    { id: 'PUZZLE_GRAPH', number: '03 / 03', label: 'GRAPH', isSolved: solvedStages.graph }
  ];

  const handleToggleHint = () => {
    if (!showHintDrawer) {
      const nextIdx = Math.min(hintIndex + 1, hints.length - 1);
      setHintIndex(nextIdx);
      setShowHintDrawer(true);
      onUseHint();
      playPathFeedback('select');
    } else {
      if (hintIndex < hints.length - 1) {
        setHintIndex(hintIndex + 1);
        onUseHint();
        playPathFeedback('select');
      } else {
        setShowHintDrawer(false);
        playPathFeedback('tick');
      }
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#080D1A]/95 border border-slate-800 p-4 sm:p-5 shadow-xl font-mono space-y-4">
      {/* Top Bar with System Status & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
          <span className="text-white font-bold text-xs tracking-wider">ALGORITHM ESCAPE CONSOLE</span>
          <span className="text-slate-400">|</span>
          <span className="text-[11px] text-red-400 font-semibold flex items-center gap-1">
            <Lock className="w-3 h-3" /> LOCKED
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Hint Trigger */}
          <button
            type="button"
            onClick={handleToggleHint}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showHintDrawer
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-500/40 hover:text-amber-300'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {showHintDrawer && hintIndex < hints.length - 1
                ? 'NEXT HINT'
                : showHintDrawer
                ? 'HIDE HINT'
                : 'HINT'}
            </span>
            <span className="text-[10px] text-amber-400/80">
              ({hintIndex + 1}/{hints.length})
            </span>
          </button>

          {/* Reset Puzzle */}
          <button
            type="button"
            onClick={() => {
              onResetPuzzle();
              playPathFeedback('tick');
            }}
            title="Reset active puzzle"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESET</span>
          </button>
        </div>
      </div>

      {/* Stage Progression Bar */}
      <div className="grid grid-cols-3 gap-2">
        {stages.map((st) => {
          const isActive = currentStage === st.id;
          const isDone = st.isSolved;

          return (
            <div
              key={st.id}
              className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
                isDone
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : isActive
                  ? 'bg-blue-950/50 border-blue-500/60 text-blue-200 shadow-md shadow-blue-950/50'
                  : 'bg-black/40 border-slate-800/80 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span>{st.number}</span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isActive ? (
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                ) : (
                  <Lock className="w-3 h-3 text-slate-400" />
                )}
              </div>
              <div className="text-xs sm:text-sm font-bold truncate">{st.label}</div>
            </div>
          );
        })}
      </div>

      {/* Expandable Hint Drawer */}
      <AnimatePresence>
        {showHintDrawer && hintIndex >= 0 && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs space-y-1 text-left"
          >
            <div className="flex items-center justify-between text-amber-400 font-bold text-[11px]">
              <span className="flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                PROGRESSIVE HINT {hintIndex + 1} OF {hints.length}
              </span>
              <span className="text-[10px] text-amber-400/80">NO PENALTY</span>
            </div>
            <p className="text-slate-200 font-sans leading-relaxed pt-0.5">{hints[hintIndex]}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Telemetry Meta */}
      <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-2.5">
        <div>
          ATTEMPTS: <span className="text-slate-200 font-semibold">{attemptsCount}</span>
          <span className="mx-2">•</span>
          HINTS CONSULTED: <span className="text-amber-300 font-semibold">{hintsUsedCount}</span>
        </div>
        <div className="text-slate-400 hidden sm:inline">ALGORITHMIC LOGIC & PROBLEM-SOLVING PRACTICE</div>
      </div>
    </div>
  );
}

export default PuzzleProgressHeader;
