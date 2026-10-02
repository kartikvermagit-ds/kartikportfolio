import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  TYPING_PASSAGES
} from '../../data/typingTexts';
import type {
  TypingModeType,
  TimeOption,
  WordsOption,
  TypingCategory,
  TypingPassage,
  CharacterState,
  GameStatus,
  TypingSessionResult,
  PersonalBest
} from '../../types/typing';
import {
  calculateWpm,
  calculateAccuracy,
  calculateConsistency,
  loadPersonalBest,
  checkAndSavePersonalBest,
  loadSessionHistory,
  appendSessionHistory,
  clearSessionHistory
} from '../../utils/typingMetrics';
import { playPathFeedback } from '../../utils/audioFeedback';
import { TypingHeader } from './TypingHeader';
import { TypingMetricsBar } from './TypingMetricsBar';
import { TypingDisplay } from './TypingDisplay';
import { TypingResults } from './TypingResults';
import { TypingQuitModal } from './TypingQuitModal';

interface KartikTypeProps {
  reducedMotion?: boolean;
}

export const KartikType: React.FC<KartikTypeProps> = ({ reducedMotion = false }) => {
  // Mode & configuration state
  const [mode, setMode] = useState<TypingModeType>('TIME');
  const [timeOption, setTimeOption] = useState<TimeOption>(30);
  const [wordsOption, setWordsOption] = useState<WordsOption>(25);
  const [category, setCategory] = useState<TypingCategory>('GENERAL');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Active Passage State
  const [activePassage, setActivePassage] = useState<TypingPassage>(() => {
    return TYPING_PASSAGES[0];
  });
  const [targetText, setTargetText] = useState<string>(activePassage.text);
  const [charStates, setCharStates] = useState<CharacterState[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Game Lifecycle State
  const [status, setStatus] = useState<GameStatus>('IDLE');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isQuitModalOpen, setIsQuitModalOpen] = useState<boolean>(false);

  // Performance Telemetry
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(30);
  const [liveWpm, setLiveWpm] = useState<number>(0);
  const [liveAccuracy, setLiveAccuracy] = useState<number>(100);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [totalTypedCount, setTotalTypedCount] = useState<number>(0);
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);

  // Persistent storage state
  const [personalBest, setPersonalBest] = useState<PersonalBest | null>(() => loadPersonalBest());
  const [sessionHistory, setSessionHistory] = useState<TypingSessionResult[]>(() => loadSessionHistory());
  const [completedResult, setCompletedResult] = useState<TypingSessionResult | null>(null);
  const [isNewBest, setIsNewBest] = useState<boolean>(false);

  // References
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Helper to pick passage based on category and word mode
  const selectPassage = useCallback(
    (cat: TypingCategory, wordCount?: WordsOption) => {
      const candidates = TYPING_PASSAGES.filter((p) => p.category === cat);
      const chosen =
        candidates.length > 0
          ? candidates[Math.floor(Math.random() * candidates.length)]
          : TYPING_PASSAGES[0];

      let text = chosen.text;
      if (mode === 'WORDS' && wordCount) {
        // Truncate or repeat text to approximate desired word count
        const words = text.split(' ');
        if (words.length > wordCount) {
          text = words.slice(0, wordCount).join(' ');
        }
      }

      setActivePassage(chosen);
      setTargetText(text);
      setCharStates(new Array(text.length).fill('untouched'));
      setCurrentIndex(0);
      setElapsedSeconds(0);
      setRemainingTime(timeOption);
      setLiveWpm(0);
      setLiveAccuracy(100);
      setErrorCount(0);
      setTotalTypedCount(0);
      setWpmHistory([]);
      setStatus('READY');
      setCompletedResult(null);
      setIsNewBest(false);
      startTimeRef.current = null;
    },
    [mode, timeOption]
  );

  // Reset or change passage on configuration change
  useEffect(() => {
    selectPassage(category, wordsOption);
  }, [category, mode, timeOption, wordsOption, selectPassage]);

  // Finish Typing Test and calculate final session result
  const finishTest = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    const elapsed = Math.max(1, elapsedSeconds);
    const correctCount = charStates.filter((s) => s === 'correct').length;
    const { wpm, grossWpm } = calculateWpm(correctCount, totalTypedCount, elapsed);
    const accuracy = calculateAccuracy(correctCount, totalTypedCount);
    const consistency = calculateConsistency(wpmHistory);

    const session: TypingSessionResult = {
      id: `session-${Date.now()}`,
      timestamp: Date.now(),
      mode,
      modeValue: mode === 'TIME' ? timeOption : wordsOption,
      category,
      passageId: activePassage.id,
      projectKey: activePassage.projectKey,
      wpm,
      grossWpm,
      accuracy,
      totalTyped: totalTypedCount,
      correctChars: correctCount,
      incorrectChars: totalTypedCount - correctCount,
      errorCount,
      elapsedSeconds: elapsed,
      consistency,
      wpmHistory: wpmHistory.length > 0 ? wpmHistory : [wpm]
    };

    setCompletedResult(session);
    setStatus('COMPLETE');
    setIsFocused(false);

    // Check & save personal best
    const achievedNewBest = checkAndSavePersonalBest(
      wpm,
      accuracy,
      `${mode} ${mode === 'TIME' ? timeOption + 's' : wordsOption + 'w'}`
    );
    setIsNewBest(achievedNewBest);
    if (achievedNewBest) {
      setPersonalBest(loadPersonalBest());
    }

    // Append to local session history
    appendSessionHistory(session);
    setSessionHistory(loadSessionHistory());

    // Dispatch Exploration discovery
    window.dispatchEvent(
      new CustomEvent('discover-easter-egg', { detail: { id: 'ee-typing-lab' } })
    );
    window.dispatchEvent(
      new CustomEvent('kartik-exploration-action', { detail: { action: 'typing-completed' } })
    );

    if (soundEnabled) {
      playPathFeedback('select');
    }
  }, [
    elapsedSeconds,
    charStates,
    totalTypedCount,
    errorCount,
    wpmHistory,
    mode,
    timeOption,
    wordsOption,
    category,
    activePassage,
    soundEnabled
  ]);

  // High-precision second-by-second interval timer
  useEffect(() => {
    if (status === 'RUNNING') {
      timerIntervalRef.current = setInterval(() => {
        if (!startTimeRef.current) return;
        const now = Date.now();
        const elapsed = Math.floor((now - startTimeRef.current) / 1000);
        setElapsedSeconds(elapsed);

        // Update live WPM
        const correctCount = charStates.filter((s) => s === 'correct').length;
        const currentWpm = calculateWpm(correctCount, totalTypedCount, elapsed).wpm;
        setLiveWpm(currentWpm);
        setWpmHistory((prev) => [...prev, currentWpm]);

        // TIME mode countdown check
        if (mode === 'TIME') {
          const remaining = Math.max(0, timeOption - elapsed);
          setRemainingTime(remaining);
          if (remaining <= 0) {
            finishTest();
          }
        }
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [status, mode, timeOption, charStates, totalTypedCount, finishTest]);

  // Handle character input from hidden input element
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Escape pauses test and prompts confirmation
    if (e.key === 'Escape') {
      if (status === 'RUNNING') {
        setStatus('PAUSED');
        setIsQuitModalOpen(true);
      }
      return;
    }

    // Tab restarts test
    if (e.key === 'Tab') {
      e.preventDefault();
      selectPassage(category, wordsOption);
      setTimeout(() => inputRef.current?.focus(), 50);
      return;
    }

    // Ignore modifier keys alone
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) {
      return;
    }

    // Handle Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        setCharStates((prev) => {
          const next = [...prev];
          next[prevIndex] = 'untouched';
          return next;
        });
        if (soundEnabled) playPathFeedback('tick');
      }
      return;
    }

    // Start timer upon first valid typed character
    if (status === 'READY' || status === 'IDLE') {
      setStatus('RUNNING');
      startTimeRef.current = Date.now();
      window.dispatchEvent(
        new CustomEvent('kartik-exploration-action', { detail: { action: 'typing-started' } })
      );
      window.dispatchEvent(new CustomEvent('kartik-type-entered'));
    }

    // Prevent default scrolling for Spacebar
    if (e.key === ' ') {
      e.preventDefault();
    }

    // If test is complete or paused, stop input
    if (status === 'COMPLETE' || status === 'PAUSED') {
      return;
    }

    // Only process single characters
    if (e.key.length === 1) {
      e.preventDefault();
      const expectedChar = targetText[currentIndex];
      const isCorrect = e.key === expectedChar;

      // Update state for this character
      setCharStates((prev) => {
        const next = [...prev];
        next[currentIndex] = isCorrect ? 'correct' : 'incorrect';
        return next;
      });

      setTotalTypedCount((prev) => prev + 1);
      if (!isCorrect) {
        setErrorCount((prev) => prev + 1);
      }

      // Update live accuracy
      const currentCorrect =
        charStates.filter((s) => s === 'correct').length + (isCorrect ? 1 : 0);
      setLiveAccuracy(calculateAccuracy(currentCorrect, totalTypedCount + 1));

      // Play soft feedback
      if (soundEnabled) {
        playPathFeedback('tick');
      }

      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      // Check for completion of passage
      if (nextIndex >= targetText.length) {
        finishTest();
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const handleQuitConfirm = () => {
    setIsQuitModalOpen(false);
    selectPassage(category, wordsOption);
  };

  const handleQuitResume = () => {
    setIsQuitModalOpen(false);
    setStatus('RUNNING');
    inputRef.current?.focus();
  };

  const handleClearAllHistory = () => {
    clearSessionHistory();
    setSessionHistory([]);
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto flex flex-col items-center select-none"
      role="region"
      aria-label="KARTIK.TYPE Developer Typing Laboratory"
    >
      {/* 1. Header & Configuration */}
      <TypingHeader
        mode={mode}
        timeOption={timeOption}
        wordsOption={wordsOption}
        category={category}
        soundEnabled={soundEnabled}
        personalBest={personalBest}
        isRunning={status === 'RUNNING'}
        onSelectMode={(m) => setMode(m)}
        onSelectTime={(t) => setTimeOption(t)}
        onSelectWords={(w) => setWordsOption(w)}
        onSelectCategory={(c) => setCategory(c)}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* 2. Main Typing Interface (Active Test) */}
      {status !== 'COMPLETE' ? (
        <div className="w-full flex flex-col gap-6 mt-6">
          {/* Live Metrics Bar */}
          <TypingMetricsBar
            wpm={liveWpm}
            accuracy={liveAccuracy}
            mode={mode}
            remainingTime={remainingTime}
            totalWords={targetText.split(' ').length}
            completedWords={targetText.slice(0, currentIndex).split(' ').length - 1}
            errorCount={errorCount}
            isRunning={status === 'RUNNING'}
          />

          {/* Interactive Character Display */}
          <TypingDisplay
            characters={targetText.split('')}
            charStates={charStates}
            currentIndex={currentIndex}
            isFocused={isFocused}
            isRunning={status === 'RUNNING'}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
          />

          {/* Subtext and Keyboard Navigation Clues */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-2">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                TAB
              </kbd>
              <span>Quick Reset</span>
            </span>

            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                ESC
              </kbd>
              <span>Pause / Quit</span>
            </span>
          </div>
        </div>
      ) : (
        /* 3. Result Evaluation Screen */
        completedResult && (
          <div className="w-full mt-6">
            <TypingResults
              result={completedResult}
              personalBest={personalBest}
              history={sessionHistory}
              isNewBest={isNewBest}
              reducedMotion={reducedMotion}
              onRetry={() => selectPassage(category, wordsOption)}
              onNewText={() => selectPassage(category, wordsOption)}
              onClearHistory={handleClearAllHistory}
            />
          </div>
        )
      )}

      {/* Quit / Pause Modal */}
      <TypingQuitModal
        isOpen={isQuitModalOpen}
        onContinue={handleQuitResume}
        onQuit={handleQuitConfirm}
      />
    </div>
  );
};

export default KartikType;
