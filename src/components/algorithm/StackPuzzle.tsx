import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight, Zap, Layers, ArrowUp, ArrowDown } from 'lucide-react';
import { STACK_PUZZLE_DATA } from '../../data/algorithmPuzzles';
import { playPathFeedback } from '../../utils/audioFeedback';

interface StackPuzzleProps {
  onSolved: () => void;
  onAttempt: () => void;
  reducedMotion?: boolean;
}

export function StackPuzzle({ onSolved, onAttempt, reducedMotion = false }: StackPuzzleProps) {
  const [pointer, setPointer] = useState<number>(0);
  const [stack, setStack] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect?: boolean; message?: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const stream = STACK_PUZZLE_DATA.bracketStream;
  const currentToken = pointer < stream.length ? stream[pointer] : null;
  const isOpening = currentToken ? ['[', '(', '{'].includes(currentToken) : false;

  const handlePush = () => {
    if (isCompleted || !currentToken) return;

    onAttempt();

    if (!isOpening) {
      setFeedback({
        isCorrect: false,
        message: `Token "${currentToken}" is a closing bracket. It must be matched against the stack top using POP.`
      });
      playPathFeedback('tick');
      return;
    }

    setStack((prev) => [...prev, currentToken]);
    setPointer((prev) => prev + 1);
    setFeedback({
      isCorrect: true,
      message: `PUSH: "${currentToken}" added to stack top.`
    });
    playPathFeedback('tick');
  };

  const handlePop = () => {
    if (isCompleted || !currentToken) return;

    onAttempt();

    if (isOpening) {
      setFeedback({
        isCorrect: false,
        message: `Token "${currentToken}" is an opening bracket. Push it into the stack to track its scope.`
      });
      playPathFeedback('tick');
      return;
    }

    if (stack.length === 0) {
      setFeedback({
        isCorrect: false,
        message: `STACK UNDERFLOW: No opening bracket available to match "${currentToken}".`
      });
      playPathFeedback('tick');
      return;
    }

    const top = stack[stack.length - 1];
    const expected = STACK_PUZZLE_DATA.matchingPairs[currentToken];

    if (top === expected) {
      const newStack = stack.slice(0, -1);
      setStack(newStack);
      const nextPointer = pointer + 1;
      setPointer(nextPointer);

      setFeedback({
        isCorrect: true,
        message: `VALID MATCH: "${top}" matches "${currentToken}". Popped from stack.`
      });
      playPathFeedback('tick');

      // Check if all brackets processed and stack empty
      if (nextPointer >= stream.length && newStack.length === 0) {
        setIsCompleted(true);
        setFeedback({
          isCorrect: true,
          message: 'ALL BRACKETS RESOLVED: Sequence is completely balanced!'
        });
        playPathFeedback('select');
      }
    } else {
      setFeedback({
        isCorrect: false,
        message: `MISMATCH ERROR: Top "${top}" does not match "${currentToken}". Expected "${expected}".`
      });
      playPathFeedback('tick');
    }
  };

  const handleResetInternal = () => {
    setPointer(0);
    setStack([]);
    setFeedback(null);
    setIsCompleted(false);
    playPathFeedback('tick');
  };

  return (
    <div className="w-full rounded-2xl bg-[#080D1A]/95 border border-slate-800 p-5 sm:p-7 shadow-2xl font-mono space-y-6 text-left">
      {/* Title Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-black/60 border border-slate-800">
        <div className="space-y-0.5">
          <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            {STACK_PUZZLE_DATA.title}
          </div>
          <div className="text-xs text-slate-300 font-sans">
            Validate the bracket sequence using stack operations (PUSH opening, POP & match closing).
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-purple-950/70 border border-purple-500/50 text-purple-300 text-xs font-bold flex items-center gap-1.5">
          <span>PRINCIPLE: LIFO</span>
        </div>
      </div>

      {/* Bracket Stream Visualizer */}
      <div className="space-y-2">
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>INPUT BRACKET STREAM:</span>
          <span>
            {pointer < stream.length ? `PROCESSING TOKEN ${pointer + 1} OF ${stream.length}` : 'STREAM COMPLETE'}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {stream.map((b, idx) => {
            const isProcessed = idx < pointer;
            const isCurrent = idx === pointer;

            return (
              <div
                key={`bracket-${idx}`}
                className={`relative flex flex-col items-center justify-center w-12 h-14 sm:w-14 sm:h-16 rounded-xl border font-bold text-xl sm:text-2xl transition-all ${
                  isCurrent
                    ? 'bg-purple-600/30 border-purple-400 text-white scale-105 shadow-lg shadow-purple-600/30'
                    : isProcessed
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400 opacity-60'
                    : 'bg-black/60 border-slate-800 text-slate-400'
                }`}
              >
                <span>{b}</span>
                <span className="text-[9px] text-slate-400 font-normal">
                  {idx}
                </span>

                {isCurrent && (
                  <span className="absolute -bottom-2 w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Physical Stack Chamber & Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Physical Stack Visualizer */}
        <div className="md:col-span-5 p-4 rounded-xl bg-black/70 border border-slate-800 flex flex-col items-center justify-end min-h-[220px]">
          <div className="text-[10px] text-purple-400 font-bold mb-2 flex items-center gap-1">
            <span>TOP OF STACK</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </div>

          {/* Physical Vertical Container */}
          <div className="w-36 flex flex-col-reverse gap-1.5 p-2 rounded-b-xl border-x-2 border-b-2 border-purple-500/50 min-h-[140px] bg-slate-950/60 justify-start">
            {stack.length === 0 ? (
              <div className="text-center text-[10px] text-slate-400 my-auto">
                [ STACK EMPTY ]
              </div>
            ) : (
              stack.map((item, idx) => (
                <motion.div
                  key={`stack-item-${idx}`}
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-2 rounded-lg text-center font-bold text-base border ${
                    idx === stack.length - 1
                      ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                      : 'bg-slate-900 border-slate-700 text-slate-300'
                  }`}
                >
                  {item}
                </motion.div>
              ))
            )}
          </div>
          <div className="text-[10px] text-slate-400 mt-2">DEPTH: {stack.length} ELEMENTS</div>
        </div>

        {/* Interactive Controls & Current State */}
        <div className="md:col-span-7 space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1 text-xs">
            <div className="text-slate-400 flex justify-between">
              <span>CURRENT CANDIDATE:</span>
              <span className="text-white font-bold">{currentToken ? `"${currentToken}"` : 'NONE (DONE)'}</span>
            </div>
            <div className="text-slate-400 flex justify-between">
              <span>ACTION REQUIRED:</span>
              <span className="text-purple-300 font-bold">
                {currentToken
                  ? isOpening
                    ? 'PUSH TO STACK'
                    : 'POP & VERIFY MATCH'
                  : 'VALIDATION COMPLETE'}
              </span>
            </div>
          </div>

          {/* Operation Buttons */}
          {!isCompleted ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handlePush}
                disabled={!currentToken}
                className="py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-purple-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:opacity-50"
              >
                <ArrowUp className="w-4 h-4" />
                <span>PUSH TOKEN</span>
              </button>

              <button
                type="button"
                onClick={handlePop}
                disabled={!currentToken}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:opacity-50"
              >
                <ArrowDown className="w-4 h-4" />
                <span>POP & MATCH</span>
              </button>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>STACK BALANCED • PUZZLE SOLVED</span>
              </span>
              <button
                type="button"
                onClick={handleResetInternal}
                className="text-[11px] underline text-emerald-400 hover:text-emerald-200"
              >
                Replay Step
              </button>
            </div>
          )}
        </div>
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

      {/* Educational Concept Layer */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/40 space-y-3"
          >
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold">
              <Zap className="w-4 h-4" />
              <span>CONCEPT: {STACK_PUZZLE_DATA.conceptTitle}</span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {STACK_PUZZLE_DATA.conceptDescription}
            </p>

            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 text-[11px] text-slate-300">
              Stack-based processing ensures that the most recently opened bracket is verified first. Any syntax mismatch or unclosed scope immediately exposes improper nesting.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onSolved}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer"
              >
                <span>PROCEED TO PUZZLE 03 (GRAPH ESCAPE)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default StackPuzzle;
