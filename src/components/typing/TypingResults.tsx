import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  ArrowRight,
  Award,
  History,
  Trash2,
  ExternalLink,
  Mail
} from 'lucide-react';
import { TypingGraph } from './TypingGraph';
import type {
  TypingSessionResult,
  PersonalBest
} from '../../types/typing';

interface TypingResultsProps {
  result: TypingSessionResult;
  personalBest: PersonalBest | null;
  history: TypingSessionResult[];
  isNewBest: boolean;
  reducedMotion?: boolean;
  onRetry: () => void;
  onNewText: () => void;
  onClearHistory: () => void;
}

export const TypingResults: React.FC<TypingResultsProps> = ({
  result,
  personalBest,
  history,
  isNewBest,
  reducedMotion = false,
  onRetry,
  onNewText,
  onClearHistory
}) => {
  const [showHistory, setShowHistory] = useState(false);

  const handleNavigateTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className="w-full max-w-2xl mx-auto flex flex-col gap-6 p-6 sm:p-8 rounded-2xl bg-[#080D16] border border-blue-500/40 shadow-2xl shadow-black font-mono animate-in fade-in zoom-in-95 duration-300"
      role="region"
      aria-label="Typing Test Results"
    >
      {/* Result Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
            KARTIK.TYPE // EVALUATION COMPLETE
          </span>
        </div>

        {isNewBest && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold animate-bounce">
            <Award className="w-3.5 h-3.5" />
            <span>NEW PERSONAL BEST!</span>
          </div>
        )}
      </div>

      {/* Hero Performance Figures */}
      <div className="grid grid-cols-2 gap-4 py-2">
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-semibold">
            NET SPEED
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              {result.wpm}
            </span>
            <span className="text-xs text-slate-400 font-normal">WPM</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 font-sans">
            Gross: {result.grossWpm} WPM
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-semibold">
            ACCURACY
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              {result.accuracy}
            </span>
            <span className="text-lg text-slate-400 font-bold">%</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 font-sans">
            Errors: {result.errorCount}
          </span>
        </div>
      </div>

      {/* Detailed Technical Metrics Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
            CHARACTERS
          </span>
          <span className="text-base font-bold text-slate-200 mt-0.5 block">
            {result.totalTyped}
            <span className="text-[10px] text-slate-500 font-normal ml-1">
              ({result.correctChars}/{result.incorrectChars})
            </span>
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
            TIME
          </span>
          <span className="text-base font-bold text-slate-200 mt-0.5 block">
            {result.elapsedSeconds}s
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
            CONSISTENCY
          </span>
          <span className="text-base font-bold text-slate-200 mt-0.5 block">
            {result.consistency}%
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
            MODE
          </span>
          <span className="text-base font-bold text-slate-200 mt-0.5 block uppercase">
            {result.category}
          </span>
        </div>
      </div>

      {/* Lightweight SVG Consistency Sparkline */}
      <TypingGraph wpmHistory={result.wpmHistory} reducedMotion={reducedMotion} />

      {/* Special Project Link Banner (if typed a Kartik Project passage) */}
      {result.category === 'PROJECTS' && result.projectKey && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-blue-500/10 border border-amber-500/30">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold text-amber-300 block uppercase tracking-wider">
              Typed through {result.projectKey.toUpperCase()}
            </span>
            <span className="text-[11px] text-slate-400 font-sans">
              Discover the full architecture, mission simulation, and code repository.
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleNavigateTo(result.projectKey || 'work')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-md shadow-amber-500/20 active:scale-95 whitespace-nowrap"
          >
            <span>EXPLORE PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-lg shadow-blue-500/25 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RETRY (TAB)</span>
          </button>

          <button
            type="button"
            onClick={onNewText}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 font-mono text-xs font-medium transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>NEW TEXT</span>
          </button>

          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors"
          >
            <History className="w-3.5 h-3.5" />
            <span>{showHistory ? 'HIDE LOGS' : 'HISTORY'}</span>
          </button>
        </div>

        {/* Portfolio Follow-up CTAs */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleNavigateTo('work')}
            className="text-slate-400 hover:text-blue-400 font-semibold transition-colors underline"
          >
            EXPLORE WORK
          </button>
          <span className="text-slate-600">•</span>
          <button
            type="button"
            onClick={() => handleNavigateTo('contact')}
            className="text-slate-400 hover:text-blue-400 font-semibold transition-colors underline"
          >
            CONTACT
          </button>
        </div>
      </div>

      {/* History Drawer */}
      {showHistory && (
        <div className="mt-2 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              RECENT SESSIONS (LAST {history.length})
            </span>
            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                className="flex items-center gap-1 text-[10px] text-rose-400 hover:text-rose-300 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>CLEAR</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="text-slate-500 text-center py-2">No previous sessions saved.</p>
          ) : (
            <div className="space-y-1.5">
              {history.map((sess) => (
                <div
                  key={sess.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/60 font-mono text-[11px]"
                >
                  <span className="text-blue-400 font-bold">{sess.wpm} WPM</span>
                  <span className="text-slate-300">{sess.accuracy}% Acc</span>
                  <span className="text-slate-500 uppercase">{sess.category}</span>
                  <span className="text-slate-500">{sess.elapsedSeconds}s</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
