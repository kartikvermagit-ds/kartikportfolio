import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight, Zap, Calculator, Hash } from 'lucide-react';
import { ARRAY_PUZZLE_DATA } from '../../data/algorithmPuzzles';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ArrayPuzzleProps {
  onSolved: () => void;
  onAttempt: () => void;
  reducedMotion?: boolean;
}

export function ArrayPuzzle({ onSolved, onAttempt, reducedMotion = false }: ArrayPuzzleProps) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect?: boolean; message?: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const toggleSelect = (index: number) => {
    if (isCompleted) return;

    setFeedback(null);
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
      playPathFeedback('tick');
    } else {
      if (selectedIndices.length < 2) {
        setSelectedIndices([...selectedIndices, index]);
        playPathFeedback('tick');
      } else {
        // Replace second index
        setSelectedIndices([selectedIndices[0], index]);
        playPathFeedback('tick');
      }
    }
  };

  const selectedValues = selectedIndices.map(
    (idx) => ARRAY_PUZZLE_DATA.array.find((item) => item.index === idx)?.value ?? 0
  );

  const currentSum = selectedValues.reduce((acc, curr) => acc + curr, 0);

  const handleCheck = () => {
    if (selectedIndices.length !== 2) {
      setFeedback({
        isCorrect: false,
        message: 'Please select exactly two elements to evaluate their sum.'
      });
      return;
    }

    onAttempt();

    if (currentSum === ARRAY_PUZZLE_DATA.target) {
      setFeedback({
        isCorrect: true,
        message: `MATCH VERIFIED: ${selectedValues[0]} + ${selectedValues[1]} = ${ARRAY_PUZZLE_DATA.target}`
      });
      setIsCompleted(true);
      playPathFeedback('select');
    } else {
      setFeedback({
        isCorrect: false,
        message: `SUM MISMATCH: ${selectedValues[0]} + ${selectedValues[1]} = ${currentSum} ≠ ${ARRAY_PUZZLE_DATA.target}. Try another pair.`
      });
      playPathFeedback('tick');
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#080D1A]/95 border border-slate-800 p-5 sm:p-7 shadow-2xl font-mono space-y-6 text-left">
      {/* Target Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-black/60 border border-slate-800">
        <div className="space-y-0.5">
          <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            {ARRAY_PUZZLE_DATA.title}
          </div>
          <div className="text-xs text-slate-300 font-sans">
            Select two elements whose sum equals the target value.
          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-blue-950/70 border border-blue-500/50 flex items-center gap-2 shadow-lg shadow-blue-950/40">
          <span className="text-[11px] text-blue-300">TARGET:</span>
          <span className="text-xl font-black text-white">{ARRAY_PUZZLE_DATA.target}</span>
        </div>
      </div>

      {/* Interactive Array Blocks */}
      <div className="space-y-3">
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>SELECT 2 ELEMENTS:</span>
          <span>{selectedIndices.length} / 2 SELECTED</span>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {ARRAY_PUZZLE_DATA.array.map((item) => {
            const isSelected = selectedIndices.includes(item.index);

            return (
              <button
                key={item.index}
                type="button"
                onClick={() => toggleSelect(item.index)}
                disabled={isCompleted}
                className={`flex flex-col items-center justify-between p-3 sm:p-5 rounded-2xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  isSelected
                    ? 'bg-blue-600/25 border-blue-400 scale-105 shadow-xl shadow-blue-500/20 text-white'
                    : 'bg-black/60 border-slate-800/90 hover:border-slate-700 text-slate-300 hover:bg-slate-900/60'
                }`}
              >
                <span className="text-[10px] font-mono text-slate-400 mb-2">
                  idx: {item.index}
                </span>
                <span className="text-2xl sm:text-3xl font-black">{item.value}</span>
                <span
                  className={`mt-2 w-2 h-2 rounded-full ${
                    isSelected ? 'bg-blue-400 animate-pulse' : 'bg-transparent'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Equation / Addition Display */}
      <div className="p-4 rounded-xl bg-black/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-bold text-white">
          <span className="text-slate-400 text-xs">EVALUATION:</span>
          {selectedValues.length === 2 ? (
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-500/40 text-blue-300">
                {selectedValues[0]}
              </span>
              <span className="text-slate-400">+</span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-500/40 text-blue-300">
                {selectedValues[1]}
              </span>
              <span className="text-slate-400">=</span>
              <span
                className={`px-3 py-1 rounded-lg font-black ${
                  currentSum === ARRAY_PUZZLE_DATA.target
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                    : 'bg-red-950 text-red-300 border border-red-500/50'
                }`}
              >
                {currentSum}
              </span>
            </div>
          ) : selectedValues.length === 1 ? (
            <div className="text-xs text-slate-400">
              Selected: <span className="text-blue-300 font-bold">{selectedValues[0]}</span> + [Choose 2nd Number]
            </div>
          ) : (
            <div className="text-xs text-slate-400 font-sans">
              Click two array cards above to formulate an equation.
            </div>
          )}
        </div>

        {/* Check Solution Trigger */}
        {!isCompleted ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={selectedIndices.length !== 2}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              selectedIndices.length === 2
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 cursor-pointer'
                : 'bg-slate-900 text-slate-400 border border-slate-800 cursor-not-allowed'
            }`}
          >
            <span>CHECK SOLUTION</span>
          </button>
        ) : (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>PUZZLE SOLVED</span>
          </span>
        )}
      </div>

      {/* Feedback Message */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
            className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              feedback.isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/40 border-red-500/40 text-red-200'
            }`}
          >
            {feedback.isCorrect ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span>{feedback.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Concept Revealed Upon Solving */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/40 space-y-3"
          >
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
              <Zap className="w-4 h-4" />
              <span>CONCEPT: {ARRAY_PUZZLE_DATA.conceptTitle}</span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {ARRAY_PUZZLE_DATA.conceptDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">BRUTE FORCE SCAN:</span>
                <span className="text-red-300 font-bold">{ARRAY_PUZZLE_DATA.timeComplexities.bruteForce}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">HASH COMPLEMENT LOOKUP:</span>
                <span className="text-emerald-300 font-bold">{ARRAY_PUZZLE_DATA.timeComplexities.optimal}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onSolved}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wider flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <span>PROCEED TO PUZZLE 02 (STACK)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ArrayPuzzle;
