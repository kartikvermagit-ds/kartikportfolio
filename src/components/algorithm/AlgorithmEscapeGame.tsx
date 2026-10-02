import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EscapeStage } from '../../types/algorithmEscape';
import {
  ARRAY_PUZZLE_DATA,
  STACK_PUZZLE_DATA,
  GRAPH_PUZZLE_DATA
} from '../../data/algorithmPuzzles';
import { AlgorithmEscapeIntro } from './AlgorithmEscapeIntro';
import { PuzzleProgressHeader } from './PuzzleProgressHeader';
import { ArrayPuzzle } from './ArrayPuzzle';
import { StackPuzzle } from './StackPuzzle';
import { GraphEscapePuzzle } from './GraphEscapePuzzle';
import { EscapeSuccessModal } from './EscapeSuccessModal';

interface AlgorithmEscapeGameProps {
  reducedMotion?: boolean;
}

export function AlgorithmEscapeGame({ reducedMotion = false }: AlgorithmEscapeGameProps) {
  const [stage, setStage] = useState<EscapeStage>('INTRO');
  const [solvedStages, setSolvedStages] = useState<{ array: boolean; stack: boolean; graph: boolean }>({
    array: false,
    stack: false,
    graph: false
  });
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const [attemptsCount, setAttemptsCount] = useState<number>(0);
  const [puzzleKey, setPuzzleKey] = useState<number>(0); // Used to force reset active puzzle state

  const handleResetActivePuzzle = () => {
    setPuzzleKey((prev) => prev + 1);
  };

  const handlePlayAgain = () => {
    setSolvedStages({ array: false, stack: false, graph: false });
    setHintsUsedCount(0);
    setAttemptsCount(0);
    setPuzzleKey((prev) => prev + 1);
    setStage('PUZZLE_ARRAY');
  };

  // Active puzzle hints
  const getActiveHints = (): string[] => {
    switch (stage) {
      case 'PUZZLE_ARRAY':
        return ARRAY_PUZZLE_DATA.hints;
      case 'PUZZLE_STACK':
        return STACK_PUZZLE_DATA.hints;
      case 'PUZZLE_GRAPH':
        return GRAPH_PUZZLE_DATA.hints;
      default:
        return [];
    }
  };

  return (
    <div className="w-full space-y-6">
      <AnimatePresence mode="wait">
        {stage === 'INTRO' && (
          <AlgorithmEscapeIntro
            key="escape-intro"
            onStart={() => setStage('PUZZLE_ARRAY')}
            reducedMotion={reducedMotion}
          />
        )}

        {(stage === 'PUZZLE_ARRAY' || stage === 'PUZZLE_STACK' || stage === 'PUZZLE_GRAPH') && (
          <motion.div
            key={`escape-workspace-${stage}`}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {/* Progression & Hint Control Header */}
            <PuzzleProgressHeader
              currentStage={stage}
              solvedStages={solvedStages}
              hints={getActiveHints()}
              hintsUsedCount={hintsUsedCount}
              attemptsCount={attemptsCount}
              onUseHint={() => setHintsUsedCount((c) => c + 1)}
              onResetPuzzle={handleResetActivePuzzle}
              reducedMotion={reducedMotion}
            />

            {/* Active Puzzle View */}
            {stage === 'PUZZLE_ARRAY' && (
              <ArrayPuzzle
                key={`array-${puzzleKey}`}
                onSolved={() => {
                  setSolvedStages((p) => ({ ...p, array: true }));
                  setStage('PUZZLE_STACK');
                }}
                onAttempt={() => setAttemptsCount((c) => c + 1)}
                reducedMotion={reducedMotion}
              />
            )}

            {stage === 'PUZZLE_STACK' && (
              <StackPuzzle
                key={`stack-${puzzleKey}`}
                onSolved={() => {
                  setSolvedStages((p) => ({ ...p, stack: true }));
                  setStage('PUZZLE_GRAPH');
                }}
                onAttempt={() => setAttemptsCount((c) => c + 1)}
                reducedMotion={reducedMotion}
              />
            )}

            {stage === 'PUZZLE_GRAPH' && (
              <GraphEscapePuzzle
                key={`graph-${puzzleKey}`}
                onSolved={() => {
                  setSolvedStages((p) => ({ ...p, graph: true }));
                  setStage('ESCAPE_SUCCESS');
                }}
                onAttempt={() => setAttemptsCount((c) => c + 1)}
                reducedMotion={reducedMotion}
              />
            )}
          </motion.div>
        )}

        {stage === 'ESCAPE_SUCCESS' && (
          <EscapeSuccessModal
            key="escape-success"
            hintsUsedCount={hintsUsedCount}
            attemptsCount={attemptsCount}
            onPlayAgain={handlePlayAgain}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default AlgorithmEscapeGame;
