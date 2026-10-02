import React, { useRef, useEffect } from 'react';
import type { CharacterState } from '../../types/typing';

interface TypingDisplayProps {
  characters: string[];
  charStates: CharacterState[];
  currentIndex: number;
  isFocused: boolean;
  isRunning: boolean;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const TypingDisplay: React.FC<TypingDisplayProps> = ({
  characters,
  charStates,
  currentIndex,
  isFocused,
  isRunning,
  onFocus,
  onKeyDown,
  inputRef
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);

  // Auto-scroll passage if multiple lines exist
  useEffect(() => {
    if (activeCharRef.current && containerRef.current) {
      const activeEl = activeCharRef.current;
      const containerEl = containerRef.current;
      const topOffset = activeEl.offsetTop - containerEl.offsetTop;
      if (topOffset > 100) {
        containerEl.scrollTo({ top: topOffset - 40, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      onClick={onFocus}
      className={`relative w-full min-h-[160px] sm:min-h-[190px] max-h-[260px] p-6 sm:p-8 rounded-2xl border transition-all duration-300 overflow-y-auto cursor-text select-none ${
        isFocused
          ? 'bg-[#080D16]/95 border-blue-500/50 shadow-2xl shadow-blue-500/10'
          : 'bg-[#080D16]/60 border-slate-800/80 hover:border-slate-700'
      }`}
      role="region"
      aria-label="Interactive Typing Surface"
    >
      {/* Hidden high-performance input receiver */}
      <input
        ref={inputRef}
        type="text"
        tabIndex={0}
        aria-label="Type the passage text here"
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
      />

      {/* Unfocused Blur Overlay */}
      {!isFocused && !isRunning && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-xs rounded-2xl transition-opacity">
          <div className="px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-mono text-xs sm:text-sm font-semibold tracking-wider shadow-lg shadow-blue-500/10 animate-pulse">
            CLICK OR PRESS ANY KEY TO FOCUS &amp; TYPE
          </div>
          <span className="text-[11px] font-mono text-slate-500 mt-2">
            Standard desktop keyboard input recommended
          </span>
        </div>
      )}

      {/* Rendered Text Characters */}
      <div className="font-mono text-lg sm:text-2xl leading-relaxed sm:leading-loose tracking-wide break-words text-slate-500">
        {characters.map((char, idx) => {
          const state = charStates[idx] || 'untouched';
          const isCurrent = idx === currentIndex;

          let colorClass = 'text-slate-600';
          if (state === 'correct') {
            colorClass = 'text-slate-100 font-medium';
          } else if (state === 'incorrect') {
            colorClass = 'text-rose-400 bg-rose-950/60 rounded px-0.5';
          }

          return (
            <span
              key={idx}
              ref={isCurrent ? activeCharRef : undefined}
              className={`relative transition-colors duration-75 ${colorClass}`}
            >
              {/* Caret Cursor Indicator */}
              {isCurrent && isFocused && (
                <span
                  className="absolute -left-[1.5px] top-0 bottom-0 w-[2px] bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse"
                  aria-hidden="true"
                />
              )}
              {char}
            </span>
          );
        })}
      </div>

      {/* Mobile Keyboard Focus Cue */}
      <div className="sm:hidden mt-4 pt-3 border-t border-slate-800/60 text-center">
        <span className="text-[10px] font-mono text-slate-500">
          Mobile: Tap here to bring up virtual keyboard
        </span>
      </div>
    </div>
  );
};
