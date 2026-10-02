import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  X,
  ArrowRight,
  Sparkles,
  Layers,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import type { GraphEdge, GraphNode } from '../../types/systemGraph';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ConnectionInspectorProps {
  edge: GraphEdge | null;
  sourceNode: GraphNode | null;
  targetNode: GraphNode | null;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
  isLoopDetected?: boolean;
  reducedMotion?: boolean;
}

export function ConnectionInspector({
  edge,
  sourceNode,
  targetNode,
  onClose,
  onSelectNode,
  isLoopDetected = false,
  reducedMotion = false
}: ConnectionInspectorProps) {
  if (!edge || !sourceNode || !targetNode) return null;

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="w-full rounded-xl border border-blue-500/30 bg-[#090E1A]/95 backdrop-blur-md p-4 sm:p-5 shadow-2xl font-mono text-xs space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
        <div className="flex items-center gap-2 text-blue-400">
          <GitBranch className="w-4 h-4 text-blue-400" />
          <span className="font-bold tracking-wider uppercase">RELATIONSHIP INSPECTOR</span>
        </div>

        <button
          type="button"
          onClick={() => {
            playPathFeedback('tick');
            onClose();
          }}
          className="w-6 h-6 rounded bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Close relationship inspector"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Connection Flow Diagram */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-black/40 border border-white/[0.06]">
        <button
          type="button"
          onClick={() => {
            playPathFeedback('select');
            onSelectNode(sourceNode.id);
          }}
          className="text-left group cursor-pointer"
        >
          <div className="text-[10px] text-slate-500 uppercase">{sourceNode.type}</div>
          <div
            className="text-sm font-bold group-hover:underline transition-all"
            style={{ color: sourceNode.color }}
          >
            {sourceNode.label}
          </div>
        </button>

        <div className="flex flex-col items-center gap-0.5 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-bold">
          <span>{edge.relationshipLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
        </div>

        <button
          type="button"
          onClick={() => {
            playPathFeedback('select');
            onSelectNode(targetNode.id);
          }}
          className="text-right group cursor-pointer"
        >
          <div className="text-[10px] text-slate-500 uppercase">{targetNode.type}</div>
          <div
            className="text-sm font-bold group-hover:underline transition-all"
            style={{ color: targetNode.color }}
          >
            {targetNode.label}
          </div>
        </button>
      </div>

      {/* Explanation of Why Connected */}
      <div className="space-y-1">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider">
          ARCHITECTURAL ROLE & WHY CONNECTED
        </div>
        <p className="text-slate-300 font-sans leading-relaxed text-xs">
          {edge.description}
        </p>
      </div>

      {/* Easter Egg Notice (Section 39) */}
      {isLoopDetected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 rounded-lg bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-blue-500/15 border border-purple-500/40 text-purple-200 space-y-1"
        >
          <div className="flex items-center gap-1.5 font-bold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>CONNECTION LOOP DETECTED</span>
          </div>
          <p className="text-[11px] text-slate-300 italic font-sans">
            "You found the architecture rabbit hole." — You traced a shared foundation linking two distinct flagship systems through a unified engineering tier.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
