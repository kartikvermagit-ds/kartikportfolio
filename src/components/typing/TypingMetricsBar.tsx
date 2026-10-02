import React from 'react';
import type { TypingModeType } from '../../types/typing';

interface TypingMetricsBarProps {
  wpm: number;
  accuracy: number;
  mode: TypingModeType;
  remainingTime: number;
  totalWords: number;
  completedWords: number;
  errorCount: number;
  isRunning: boolean;
}

export const TypingMetricsBar: React.FC<TypingMetricsBarProps> = ({
  wpm,
  accuracy,
  mode,
  remainingTime,
  totalWords,
  completedWords,
  errorCount,
  isRunning
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  return (
    <div
      className={`w-full max-w-2xl mx-auto flex items-center justify-around p-3 rounded-xl border backdrop-blur-md transition-all duration-300 font-mono text-center ${
        isRunning
          ? 'bg-slate-950/80 border-blue-500/30 shadow-lg shadow-blue-500/5'
          : 'bg-slate-900/40 border-slate-800/80'
      }`}
    >
      {/* Primary Counter (Time or Word Progress) */}
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
          {mode === 'TIME' ? 'REMAINING' : 'WORDS'}
        </span>
        <span className="text-xl sm:text-2xl font-black text-blue-400">
          {mode === 'TIME' ? formatTime(remainingTime) : `${completedWords}/${totalWords}`}
        </span>
      </div>

      <div className="h-8 w-px bg-slate-800" />

      {/* Live WPM */}
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
          SPEED
        </span>
        <span className="text-xl sm:text-2xl font-black text-slate-100 flex items-baseline justify-center gap-1">
          {wpm}
          <span className="text-[10px] text-slate-400 font-normal">WPM</span>
        </span>
      </div>

      <div className="h-8 w-px bg-slate-800" />

      {/* Live Accuracy */}
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
          ACCURACY
        </span>
        <span className="text-xl sm:text-2xl font-black text-slate-100">
          {accuracy}
          <span className="text-xs text-slate-400 font-normal">%</span>
        </span>
      </div>

      <div className="h-8 w-px bg-slate-800" />

      {/* Errors */}
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
          ERRORS
        </span>
        <span
          className={`text-xl sm:text-2xl font-black ${
            errorCount > 0 ? 'text-amber-400' : 'text-slate-400'
          }`}
        >
          {errorCount}
        </span>
      </div>
    </div>
  );
};
