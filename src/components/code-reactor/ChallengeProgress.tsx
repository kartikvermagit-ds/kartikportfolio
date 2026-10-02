import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Lightbulb, RotateCcw, Lock, Zap } from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ChallengeProgressProps {
  currentIndex: number;
  completedIds: string[];
  totalChallenges: number;
  hint1: string;
  hint2: string;
  hintsUsedCount: number;
  attemptsCount: number;
  onUseHint: () => void;
  onRestart: () => void;
  reducedMotion?: boolean;
}

const CHALLENGE_TABS = [
  { id: 'cr-01-array', label: 'ARRAY' },
  { id: 'cr-02-stack', label: 'STACK' },
  { id: 'cr-03-debug', label: 'DEBUG' },
  { id: 'cr-04-graph', label: 'GRAPH' },
  { id: 'cr-05-output', label: 'OUTPUT' }
];

export function ChallengeProgress({
  currentIndex,
  completedIds,
  totalChallenges,
  hint1,
  hint2,
  hintsUsedCount,
  attemptsCount,
  onUseHint,
  onRestart,
  reducedMotion = false
}: ChallengeProgressProps) {
  const [hintTier, setHintTier] = useState<number>(0); // 0 = closed, 1 = hint1, 2 = hint2
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const handleToggleHint = () => {
    if (!showDrawer) {
      setHintTier(1);
      setShowDrawer(true);
      onUseHint();
      playPathFeedback('select');
    } else if (hintTier === 1) {
      setHintTier(2);
      onUseHint();
      playPathFeedback('select');
    } else {
      setShowDrawer(false);
      setHintTier(0);
      playPathFeedback('tick');
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#080D1A]/95 border border-slate-800 p-4 sm:p-5 shadow-xl font-mono space-y-4 text-left">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
          <span className="text-white font-bold tracking-wider">
            CODE REACTOR • CHALLENGE {currentIndex + 1} OF {totalChallenges}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Hint Trigger */}
          <button
            type="button"
            onClick={handleToggleHint}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showDrawer
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-500/40 hover:text-amber-300'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {showDrawer && hintTier === 1 ? 'NEXT HINT (2/2)' : showDrawer ? 'HIDE HINT' : 'HINT (1/2)'}
            </span>
          </button>

          {/* Reset Reactor */}
          <button
            type="button"
            onClick={() => {
              onRestart();
              playPathFeedback('tick');
            }}
            title="Restart Code Reactor from Challenge 01"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESTART</span>
          </button>
        </div>
      </div>

      {/* 5-Stage Progress Indicators */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {CHALLENGE_TABS.map((tab, idx) => {
          const isDone = completedIds.includes(tab.id);
          const isActive = idx === currentIndex;

          return (
            <div
              key={tab.id}
              className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all ${
                isDone
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : isActive
                  ? 'bg-blue-950/60 border-blue-500/60 text-blue-200 shadow-md shadow-blue-950/50'
                  : 'bg-black/40 border-slate-800/80 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center text-[10px] mb-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : isActive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                ) : (
                  <Lock className="w-2.5 h-2.5 text-slate-400" />
                )}
              </div>
              <div className="text-[10px] sm:text-xs font-bold truncate">{tab.label}</div>
            </div>
          );
        })}
      </div>

      {/* Expandable Hint Drawer */}
      <AnimatePresence>
        {showDrawer && hintTier > 0 && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs space-y-1.5 text-left"
          >
            <div className="flex items-center justify-between text-amber-400 font-bold text-[11px]">
              <span className="flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                {hintTier === 1 ? 'CONCEPTUAL HINT (1/2)' : 'DIRECT HINT (2/2)'}
              </span>
              <span className="text-[10px] text-amber-400/80">NO LEADERBOARD COST</span>
            </div>
            <p className="text-slate-200 font-sans leading-relaxed pt-0.5">
              {hintTier === 1 ? hint1 : hint2}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Telemetry Meta */}
      <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
        <div>
          ATTEMPTS: <span className="text-slate-200 font-semibold">{attemptsCount}</span>
          <span className="mx-2">•</span>
          HINTS CONSULTED: <span className="text-amber-300 font-semibold">{hintsUsedCount}</span>
        </div>
        <div className="text-slate-400 hidden sm:inline">CONTROLLED PORTFOLIO CHALLENGES</div>
      </div>
    </div>
  );
}

export default ChallengeProgress;
