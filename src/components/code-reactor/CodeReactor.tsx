import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactorState } from '../../types/codeReactor';
import { CODE_REACTOR_CHALLENGES } from '../../data/codeReactorChallenges';
import { ReactorIntro } from './ReactorIntro';
import { ReactorCore } from './ReactorCore';
import { ChallengeProgress } from './ChallengeProgress';
import { CodeEditor } from './CodeEditor';
import { ChallengePanel } from './ChallengePanel';
import { ResultPanel } from './ResultPanel';
import { CompletionPanel } from './CompletionPanel';
import { playPathFeedback } from '../../utils/audioFeedback';

interface CodeReactorProps {
  reducedMotion?: boolean;
}

const STORAGE_KEY = 'kartik-code-reactor-progress';

export function CodeReactor({ reducedMotion = false }: CodeReactorProps) {
  const [reactorState, setReactorState] = useState<ReactorState>('IDLE');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.activeChallengeIndex === 'number' ? parsed.activeChallengeIndex : 0;
      }
    } catch {}
    return 0;
  });

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.completedChallengeIds)) {
          return parsed.completedChallengeIds;
        }
      }
    } catch {}
    return [];
  });

  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const [attemptsCount, setAttemptsCount] = useState<number>(0);

  // Sync progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          completedChallengeIds: completedIds,
          activeChallengeIndex: currentChallengeIndex
        })
      );
    } catch {}
  }, [completedIds, currentChallengeIndex]);

  const currentChallenge = CODE_REACTOR_CHALLENGES[currentChallengeIndex];
  const isSolved = completedIds.includes(currentChallenge.id);

  const handleStartBoot = () => {
    setReactorState('INITIALIZING');
  };

  const handleBootComplete = () => {
    setReactorState('READY');
    setTimeout(() => {
      setReactorState('PLAYING');
    }, 300);
  };

  const handleSubmitAnswer = (answer: any) => {
    setAttemptsCount((c) => c + 1);
    setReactorState('PROCESSING');

    setTimeout(() => {
      let isCorrect = false;

      switch (currentChallenge.type) {
        case 'ARRAY_SIGNAL':
          if (Array.isArray(answer) && answer.length === 2) {
            const sorted = [...answer].sort((a, b) => a - b);
            isCorrect = sorted[0] === 2 && sorted[1] === 7;
          }
          break;

        case 'STACK_SIMULATE':
          isCorrect = answer === 'VALID';
          break;

        case 'DEBUG_LOGIC':
          isCorrect = answer === currentChallenge.correctAnswer;
          break;

        case 'GRAPH_PATH':
          if (Array.isArray(answer)) {
            isCorrect = answer.join('->') === 'A->C->E->F';
          }
          break;

        case 'OUTPUT_PREDICTION':
          isCorrect = answer === currentChallenge.correctAnswer;
          break;
      }

      if (isCorrect) {
        setReactorState('SUCCESS');
        playPathFeedback('select');
        if (!completedIds.includes(currentChallenge.id)) {
          setCompletedIds((prev) => [...prev, currentChallenge.id]);
        }
      } else {
        setReactorState('ERROR');
        playPathFeedback('tick');
      }
    }, 400);
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < CODE_REACTOR_CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setReactorState('PLAYING');
    } else {
      setReactorState('COMPLETE');
    }
  };

  const handleRestart = () => {
    setCurrentChallengeIndex(0);
    setCompletedIds([]);
    setHintsUsedCount(0);
    setAttemptsCount(0);
    setReactorState('PLAYING');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <div className="w-full space-y-6">
      <AnimatePresence mode="wait">
        {/* Intro Screen */}
        {(reactorState === 'IDLE' || reactorState === 'INITIALIZING') && (
          <ReactorIntro
            key="reactor-intro"
            onInitialize={handleBootComplete}
            reducedMotion={reducedMotion}
          />
        )}

        {/* Active Workstation Console */}
        {reactorState !== 'IDLE' && reactorState !== 'INITIALIZING' && reactorState !== 'COMPLETE' && (
          <motion.div
            key="reactor-workspace"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {/* Header with Progress Tracker & Hints */}
            <ChallengeProgress
              currentIndex={currentChallengeIndex}
              completedIds={completedIds}
              totalChallenges={CODE_REACTOR_CHALLENGES.length}
              hint1={currentChallenge.hint1}
              hint2={currentChallenge.hint2}
              hintsUsedCount={hintsUsedCount}
              attemptsCount={attemptsCount}
              onUseHint={() => setHintsUsedCount((c) => c + 1)}
              onRestart={handleRestart}
              reducedMotion={reducedMotion}
            />

            {/* Central Reactor Core Visualization */}
            <ReactorCore state={reactorState} reducedMotion={reducedMotion} />

            {/* Code Editor and Interactive Challenge Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Code Editor Preview */}
              <div className="lg:col-span-6">
                <CodeEditor
                  filename={currentChallenge.language === 'python' ? 'solution.py' : 'solution.cpp'}
                  language={currentChallenge.language === 'python' ? 'Python 3.11' : 'C++20'}
                  codeSnippet={currentChallenge.codeSnippet}
                  hasErrorState={reactorState === 'ERROR'}
                />
              </div>

              {/* Challenge Panel with Inputs */}
              <div className="lg:col-span-6">
                <ChallengePanel
                  challenge={currentChallenge}
                  isSolved={isSolved || reactorState === 'SUCCESS'}
                  onSubmitAnswer={handleSubmitAnswer}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>

            {/* Educational Result Panel revealed on success */}
            {(reactorState === 'SUCCESS' || isSolved) && (
              <ResultPanel
                challenge={currentChallenge}
                isLastChallenge={currentChallengeIndex === CODE_REACTOR_CHALLENGES.length - 1}
                onNext={handleNextChallenge}
                reducedMotion={reducedMotion}
              />
            )}
          </motion.div>
        )}

        {/* Completion Finale */}
        {reactorState === 'COMPLETE' && (
          <CompletionPanel
            key="reactor-complete"
            onReplay={handleRestart}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default CodeReactor;
