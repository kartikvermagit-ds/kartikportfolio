import React from 'react';
import { Clock, Type, Volume2, VolumeX, Sparkles, Award } from 'lucide-react';
import type {
  TypingModeType,
  TimeOption,
  WordsOption,
  TypingCategory,
  PersonalBest
} from '../../types/typing';

interface TypingHeaderProps {
  mode: TypingModeType;
  timeOption: TimeOption;
  wordsOption: WordsOption;
  category: TypingCategory;
  soundEnabled: boolean;
  personalBest: PersonalBest | null;
  isRunning: boolean;
  onSelectMode: (mode: TypingModeType) => void;
  onSelectTime: (time: TimeOption) => void;
  onSelectWords: (words: WordsOption) => void;
  onSelectCategory: (category: TypingCategory) => void;
  onToggleSound: () => void;
}

const CATEGORIES: { id: TypingCategory; label: string }[] = [
  { id: 'GENERAL', label: 'General' },
  { id: 'CODE', label: 'Code' },
  { id: 'ALGORITHMS', label: 'DSA' },
  { id: 'AI', label: 'AI' },
  { id: 'DATA', label: 'Data' },
  { id: 'SYSTEMS', label: 'Systems' },
  { id: 'PROJECTS', label: 'Projects' }
];

export const TypingHeader: React.FC<TypingHeaderProps> = ({
  mode,
  timeOption,
  wordsOption,
  category,
  soundEnabled,
  personalBest,
  isRunning,
  onSelectMode,
  onSelectTime,
  onSelectWords,
  onSelectCategory,
  onToggleSound
}) => {
  return (
    <div
      className={`w-full transition-opacity duration-300 ${
        isRunning ? 'opacity-20 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Telemetry & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>TYPING LAB</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-semibold">{isRunning ? 'ACTIVE' : 'READY'}</span>
          </div>

          {personalBest && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-amber-300">
              <Award className="w-3 h-3 text-amber-400" />
              <span>BEST: {personalBest.wpm} WPM ({personalBest.accuracy}%)</span>
            </div>
          )}
        </div>

        {/* Sound Feedback Toggle Button */}
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Disable typing key clicks' : 'Enable typing key clicks'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border ${
            soundEnabled
              ? 'bg-blue-600/20 border-blue-500/40 text-blue-300'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-blue-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">AUDIO: {soundEnabled ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Mode & Category Selectors */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md">
        {/* Mode Selector Pill (TIME vs WORDS) */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-slate-800/80 w-full md:w-auto justify-center">
          <button
            type="button"
            onClick={() => onSelectMode('TIME')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              mode === 'TIME'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>TIME</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('WORDS')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              mode === 'WORDS'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>WORDS</span>
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* Sub-options based on active mode */}
          {mode === 'TIME' ? (
            <div className="flex items-center gap-1">
              {([15, 30, 60] as TimeOption[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => onSelectTime(t)}
                  className={`px-2 py-1 rounded-md text-xs font-mono transition-colors ${
                    timeOption === t
                      ? 'text-blue-400 font-bold bg-blue-500/10 border border-blue-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t}s
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              {([10, 25, 50] as WordsOption[]).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => onSelectWords(w)}
                  className={`px-2 py-1 rounded-md text-xs font-mono transition-colors ${
                    wordsOption === w
                      ? 'text-blue-400 font-bold bg-blue-500/10 border border-blue-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Text Category Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 w-full md:w-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
                category === cat.id
                  ? cat.id === 'PROJECTS'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20 font-semibold'
                    : 'bg-blue-600/20 text-blue-300 border-blue-500/50 shadow-sm shadow-blue-500/20 font-semibold'
                  : 'bg-slate-900/40 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {cat.id === 'PROJECTS' && <Sparkles className="w-3 h-3 inline mr-1 text-amber-400" />}
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
