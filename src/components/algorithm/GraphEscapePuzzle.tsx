import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight, Zap, Network, RotateCcw, ShieldCheck } from 'lucide-react';
import { GRAPH_PUZZLE_DATA } from '../../data/algorithmPuzzles';
import { playPathFeedback } from '../../utils/audioFeedback';

interface GraphEscapePuzzleProps {
  onSolved: () => void;
  onAttempt: () => void;
  reducedMotion?: boolean;
}

export function GraphEscapePuzzle({ onSolved, onAttempt, reducedMotion = false }: GraphEscapePuzzleProps) {
  const [currentPath, setCurrentPath] = useState<string[]>(['A']);
  const [feedback, setFeedback] = useState<{ isCorrect?: boolean; message?: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const { nodes, edges, startNode, exitNode } = GRAPH_PUZZLE_DATA;

  // Check if two nodes have an edge
  const isAdjacent = (node1: string, node2: string): boolean => {
    return edges.some(
      (e) => (e.from === node1 && e.to === node2) || (e.from === node2 && e.to === node1)
    );
  };

  const handleNodeClick = (nodeId: string) => {
    if (isCompleted) return;

    const currentHead = currentPath[currentPath.length - 1];

    // Clicking current head or clicking back to previous step
    if (nodeId === currentHead) return;

    if (currentPath.length > 1 && currentPath[currentPath.length - 2] === nodeId) {
      // Step back
      setCurrentPath((prev) => prev.slice(0, -1));
      setFeedback(null);
      playPathFeedback('tick');
      return;
    }

    onAttempt();

    if (isAdjacent(currentHead, nodeId)) {
      const nextPath = [...currentPath, nodeId];
      setCurrentPath(nextPath);
      setFeedback(null);
      playPathFeedback('tick');

      // Check if reached exit node
      if (nodeId === exitNode) {
        setIsCompleted(true);
        setFeedback({
          isCorrect: true,
          message: `ESCAPE ROUTE ESTABLISHED: ${nextPath.join(' → ')} reached EXIT (F)!`
        });
        playPathFeedback('select');
      }
    } else {
      setFeedback({
        isCorrect: false,
        message: `NO DIRECT CONNECTION: Node "${nodeId}" is not directly linked to current head "${currentHead}".`
      });
      playPathFeedback('tick');
    }
  };

  const handleClearPath = () => {
    setCurrentPath(['A']);
    setFeedback(null);
    setIsCompleted(false);
    playPathFeedback('tick');
  };

  // Helper to determine if an edge is in current active path
  const isEdgeInPath = (from: string, to: string): boolean => {
    for (let i = 0; i < currentPath.length - 1; i++) {
      const a = currentPath[i];
      const b = currentPath[i + 1];
      if ((a === from && b === to) || (a === to && b === from)) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="w-full rounded-2xl bg-[#080D1A]/95 border border-slate-800 p-5 sm:p-7 shadow-2xl font-mono space-y-6 text-left">
      {/* Title Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-black/60 border border-slate-800">
        <div className="space-y-0.5">
          <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5" />
            {GRAPH_PUZZLE_DATA.title}
          </div>
          <div className="text-xs text-slate-300 font-sans">
            Navigate from START (A) to EXIT (F) by selecting connected neighboring nodes.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearPath}
            disabled={currentPath.length <= 1 && !isCompleted}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET ROUTE</span>
          </button>
        </div>
      </div>

      {/* Path Breadcrumbs Display */}
      <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-[10px]">CURRENT TRAVERSAL ROUTE:</span>
          <span className="text-white font-bold tracking-wider">
            {currentPath.join(' ➔ ')}
          </span>
        </div>
        <div className="text-[11px] text-emerald-400 font-bold">
          {isCompleted ? 'EXIT REACHED' : `HOP ${currentPath.length - 1} OF MAX 3-4`}
        </div>
      </div>

      {/* Interactive SVG Graph Area */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[280px] max-h-[420px] rounded-2xl bg-black/70 border border-slate-800/90 overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 560 340"
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Edge Connection Lines */}
          {edges.map((edge, idx) => {
            const nodeA = nodes.find((n) => n.id === edge.from);
            const nodeB = nodes.find((n) => n.id === edge.to);
            if (!nodeA || !nodeB) return null;

            const active = isEdgeInPath(edge.from, edge.to);

            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={nodeA.x}
                  y1={nodeA.y}
                  x2={nodeB.x}
                  y2={nodeB.y}
                  stroke={active ? '#10B981' : '#334155'}
                  strokeWidth={active ? 3.5 : 2}
                  strokeDasharray={active ? undefined : '5 4'}
                  className="transition-colors duration-300"
                />
                {active && (
                  <circle
                    cx={(nodeA.x + nodeB.x) / 2}
                    cy={(nodeA.y + nodeB.y) / 2}
                    r="3"
                    fill="#34D399"
                    className="animate-ping"
                  />
                )}
              </g>
            );
          })}

          {/* Interactive Graph Nodes */}
          {nodes.map((node) => {
            const isInPath = currentPath.includes(node.id);
            const isHead = currentPath[currentPath.length - 1] === node.id;
            const isStart = node.id === startNode;
            const isExit = node.id === exitNode;

            return (
              <g
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                className="cursor-pointer group"
              >
                {/* Outer Glow Halo */}
                {(isHead || isExit) && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="28"
                    fill={isExit ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.15)'}
                    className="animate-pulse"
                  />
                )}

                {/* Node Main Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill={
                    isExit && isInPath
                      ? '#064E3B'
                      : isHead
                      ? '#0284C7'
                      : isInPath
                      ? '#0F766E'
                      : '#0F172A'
                  }
                  stroke={
                    isExit
                      ? '#10B981'
                      : isHead
                      ? '#38BDF8'
                      : isInPath
                      ? '#14B8A6'
                      : '#475569'
                  }
                  strokeWidth={isInPath || isExit ? 2.5 : 1.5}
                  className="transition-all duration-300 group-hover:scale-110"
                />

                {/* Node Letter */}
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill={isInPath ? '#FFFFFF' : '#94A3B8'}
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="monospace"
                  className="pointer-events-none"
                >
                  {node.id}
                </text>

                {/* Tag Label Below Node */}
                <text
                  x={node.x}
                  y={node.y + 36}
                  textAnchor="middle"
                  fill={isExit ? '#34D399' : isStart ? '#38BDF8' : '#64748B'}
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="monospace"
                  className="pointer-events-none"
                >
                  {isStart ? 'START' : isExit ? 'EXIT' : node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Cyber Brackets */}
        <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-emerald-500/50 pointer-events-none" />
        <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-emerald-500/50 pointer-events-none" />
        <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-500/50 pointer-events-none" />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-500/50 pointer-events-none" />
      </div>

      {/* Feedback Toast */}
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
            className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3"
          >
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Zap className="w-4 h-4" />
              <span>CONCEPT: {GRAPH_PUZZLE_DATA.conceptTitle}</span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {GRAPH_PUZZLE_DATA.conceptDescription}
            </p>

            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 text-[11px] text-slate-300">
              By evaluating neighbor lists (adjacency matrix), depth-first (DFS) or breadth-first (BFS) exploration paths can discover shortest paths, cycle boundaries, and connected components.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onSolved}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                <span>COMPLETE ESCAPE & UNLOCK KARTIK.OS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GraphEscapePuzzle;
