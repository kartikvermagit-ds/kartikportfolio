import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight, Zap, ArrowDown, ArrowUp, Layers, HelpCircle } from 'lucide-react';
import type { CodeReactorChallenge } from '../../types/codeReactor';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ChallengePanelProps {
  challenge: CodeReactorChallenge;
  isSolved: boolean;
  onSubmitAnswer: (answer: any) => void;
  reducedMotion?: boolean;
}

export function ChallengePanel({
  challenge,
  isSolved,
  onSubmitAnswer,
  reducedMotion = false
}: ChallengePanelProps) {
  // Challenge 1 state: selected values
  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  // Challenge 2 state: stack simulator
  const [stackPointer, setStackPointer] = useState<number>(0);
  const [stackItems, setStackItems] = useState<string[]>([]);

  // Challenge 3 & 5 state: selected option
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Challenge 4 state: graph path
  const [graphPath, setGraphPath] = useState<string[]>(['A']);

  // Reset local states when challenge changes
  React.useEffect(() => {
    setSelectedValues([]);
    setStackPointer(0);
    setStackItems([]);
    setSelectedOptionId(null);
    setGraphPath(['A']);
  }, [challenge.id]);

  // Handle Challenge 1 (Array Signal)
  const handleToggleArrayVal = (val: number) => {
    if (isSolved) return;
    if (selectedValues.includes(val)) {
      setSelectedValues(selectedValues.filter((v) => v !== val));
      playPathFeedback('tick');
    } else {
      if (selectedValues.length < 2) {
        setSelectedValues([...selectedValues, val]);
        playPathFeedback('tick');
      } else {
        setSelectedValues([selectedValues[0], val]);
        playPathFeedback('tick');
      }
    }
  };

  const currentArraySum = selectedValues.reduce((a, b) => a + b, 0);

  // Handle Challenge 2 (Stack Simulation)
  const currentBracket = challenge.bracketStream && stackPointer < challenge.bracketStream.length
    ? challenge.bracketStream[stackPointer]
    : null;
  const isOpeningBracket = currentBracket ? ['{', '[', '('].includes(currentBracket) : false;

  const handlePushStack = () => {
    if (!currentBracket || isSolved) return;
    if (!isOpeningBracket) {
      playPathFeedback('tick');
      return;
    }
    setStackItems((prev) => [...prev, currentBracket]);
    setStackPointer((prev) => prev + 1);
    playPathFeedback('tick');
  };

  const handlePopStack = () => {
    if (!currentBracket || isSolved) return;
    if (isOpeningBracket || stackItems.length === 0) {
      playPathFeedback('tick');
      return;
    }

    const top = stackItems[stackItems.length - 1];
    const matchMap: Record<string, string> = { '}': '{', ']': '[', ')': '(' };

    if (top === matchMap[currentBracket]) {
      const nextStack = stackItems.slice(0, -1);
      setStackItems(nextStack);
      const nextPtr = stackPointer + 1;
      setStackPointer(nextPtr);
      playPathFeedback('tick');

      if (nextPtr >= (challenge.bracketStream?.length || 0) && nextStack.length === 0) {
        onSubmitAnswer('VALID');
      }
    } else {
      playPathFeedback('tick');
    }
  };

  // Handle Challenge 4 (Graph Traversal)
  const isAdjacent = (from: string, to: string) => {
    if (!challenge.graphEdges) return false;
    return challenge.graphEdges.some(
      (e) => (e.from === from && e.to === to) || (e.from === to && e.to === from)
    );
  };

  const handleGraphNodeClick = (nodeId: string) => {
    if (isSolved) return;
    const head = graphPath[graphPath.length - 1];
    if (nodeId === head) return;

    if (graphPath.length > 1 && graphPath[graphPath.length - 2] === nodeId) {
      setGraphPath((prev) => prev.slice(0, -1));
      playPathFeedback('tick');
      return;
    }

    if (isAdjacent(head, nodeId)) {
      const nextPath = [...graphPath, nodeId];
      setGraphPath(nextPath);
      playPathFeedback('tick');

      if (nodeId === challenge.exitNode) {
        onSubmitAnswer(nextPath);
      }
    } else {
      playPathFeedback('tick');
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#080D1A]/95 border border-slate-800 p-5 sm:p-6 shadow-2xl font-mono space-y-5 text-left">
      {/* Challenge Title & Prompt */}
      <div className="space-y-1.5 border-b border-slate-800 pb-3">
        <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
          {challenge.title}
        </div>
        <div className="text-sm font-semibold text-white font-sans leading-relaxed">
          {challenge.prompt}
        </div>
      </div>

      {/* Challenge 1: Array Signal Selector */}
      {challenge.type === 'ARRAY_SIGNAL' && challenge.arrayValues && (
        <div className="space-y-4">
          <div className="flex justify-between text-xs text-slate-400">
            <span>INPUT ARRAY VALUES:</span>
            <span>TARGET SUM: {challenge.targetSum}</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {challenge.arrayValues.map((val) => {
              const isSelected = selectedValues.includes(val);

              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleToggleArrayVal(val)}
                  disabled={isSolved}
                  className={`p-3 sm:p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600/30 border-blue-400 text-white scale-105 shadow-lg shadow-blue-500/20'
                      : 'bg-black/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xl sm:text-2xl font-bold">{val}</span>
                </button>
              );
            })}
          </div>

          {/* Equation and Verification Button */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">EVALUATION:</span>
              {selectedValues.length === 2 ? (
                <span className="text-white font-bold">
                  {selectedValues[0]} + {selectedValues[1]} = {currentArraySum}
                </span>
              ) : (
                <span className="text-slate-400">Select 2 numbers</span>
              )}
            </div>

            {!isSolved && (
              <button
                type="button"
                onClick={() => onSubmitAnswer(selectedValues)}
                disabled={selectedValues.length !== 2}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedValues.length === 2
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 cursor-pointer'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 cursor-not-allowed'
                }`}
              >
                VERIFY PAIR
              </button>
            )}
          </div>
        </div>
      )}

      {/* Challenge 2: Stack Simulation */}
      {challenge.type === 'STACK_SIMULATE' && challenge.bracketStream && (
        <div className="space-y-4">
          <div className="flex justify-between text-xs text-slate-400">
            <span>BRACKET STREAM:</span>
            <span>TOKEN {stackPointer + 1} OF {challenge.bracketStream.length}</span>
          </div>

          {/* Bracket Tokens */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {challenge.bracketStream.map((tok, idx) => (
              <div
                key={`tok-${idx}`}
                className={`w-10 h-12 rounded-lg border flex items-center justify-center text-lg font-bold transition-all ${
                  idx === stackPointer
                    ? 'bg-purple-600/30 border-purple-400 text-white scale-105'
                    : idx < stackPointer
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400 opacity-60'
                    : 'bg-black/60 border-slate-800 text-slate-400'
                }`}
              >
                {tok}
              </div>
            ))}
          </div>

          {/* Physical Stack Chamber */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="p-3 rounded-xl bg-black/70 border border-slate-800 flex flex-col items-center">
              <span className="text-[10px] text-purple-400 font-bold mb-1">TOP OF STACK</span>
              <div className="w-28 min-h-[90px] border-x-2 border-b-2 border-purple-500/50 rounded-b-xl p-1.5 flex flex-col-reverse gap-1 bg-slate-950/60 justify-start">
                {stackItems.length === 0 ? (
                  <span className="text-[10px] text-slate-400 my-auto text-center block">
                    [ EMPTY ]
                  </span>
                ) : (
                  stackItems.map((item, idx) => (
                    <div
                      key={`stk-${idx}`}
                      className="p-1 rounded text-center font-bold text-sm bg-purple-600/30 border border-purple-400 text-white"
                    >
                      {item}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handlePushStack}
                disabled={!currentBracket || !isOpeningBracket || isSolved}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
                <span>PUSH OPENING BRACKET</span>
              </button>

              <button
                type="button"
                onClick={handlePopStack}
                disabled={!currentBracket || isOpeningBracket || stackItems.length === 0 || isSolved}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowDown className="w-4 h-4" />
                <span>POP & MATCH CLOSING BRACKET</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenge 3 & 5: Multiple Choice Options */}
      {(challenge.type === 'DEBUG_LOGIC' || challenge.type === 'OUTPUT_PREDICTION') && challenge.options && (
        <div className="space-y-3">
          <div className="text-xs text-slate-400">CHOOSE CORRECT OPTION:</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {challenge.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    if (isSolved) return;
                    setSelectedOptionId(opt.id);
                    playPathFeedback('tick');
                    onSubmitAnswer(opt.id);
                  }}
                  disabled={isSolved}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600/30 border-blue-400 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-black/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white mb-0.5">{opt.label}</div>
                  {opt.subLabel && <div className="text-[10px] text-slate-400 font-sans">{opt.subLabel}</div>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Challenge 4: Graph Traversal */}
      {challenge.type === 'GRAPH_PATH' && challenge.graphNodes && challenge.graphEdges && (
        <div className="space-y-3">
          <div className="flex justify-between text-xs text-slate-400">
            <span>TRAVERSAL PATH:</span>
            <span className="text-white font-bold">{graphPath.join(' ➔ ')}</span>
          </div>

          <div className="relative w-full aspect-[16/9] min-h-[220px] max-h-[300px] rounded-xl bg-black/70 border border-slate-800 overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 540 260" className="w-full h-full select-none" preserveAspectRatio="xMidYMid meet">
              {/* Edges */}
              {challenge.graphEdges.map((e, i) => {
                const nodeA = challenge.graphNodes?.find((n) => n.id === e.from);
                const nodeB = challenge.graphNodes?.find((n) => n.id === e.to);
                if (!nodeA || !nodeB) return null;

                const inPath =
                  graphPath.includes(e.from) &&
                  graphPath.includes(e.to) &&
                  Math.abs(graphPath.indexOf(e.from) - graphPath.indexOf(e.to)) === 1;

                return (
                  <line
                    key={`ge-${i}`}
                    x1={nodeA.x}
                    y1={nodeA.y}
                    x2={nodeB.x}
                    y2={nodeB.y}
                    stroke={inPath ? '#10B981' : '#334155'}
                    strokeWidth={inPath ? 3 : 1.5}
                    strokeDasharray={inPath ? undefined : '4 3'}
                  />
                );
              })}

              {/* Nodes */}
              {challenge.graphNodes.map((n) => {
                const isInPath = graphPath.includes(n.id);
                const isExit = n.id === challenge.exitNode;

                return (
                  <g key={`gn-${n.id}`} onClick={() => handleGraphNodeClick(n.id)} className="cursor-pointer">
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="18"
                      fill={isInPath ? (isExit ? '#064E3B' : '#0284C7') : '#0F172A'}
                      stroke={isInPath ? (isExit ? '#10B981' : '#38BDF8') : '#475569'}
                      strokeWidth="2"
                    />
                    <text
                      x={n.x}
                      y={n.y + 4}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {n.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChallengePanel;
