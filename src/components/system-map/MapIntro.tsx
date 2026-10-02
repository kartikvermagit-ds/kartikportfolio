import React from 'react';
import { motion } from 'framer-motion';
import {
  Network,
  ArrowRight,
  Info,
  Layers,
  Cpu,
  Globe,
  Sparkles,
  GitBranch
} from 'lucide-react';
import { SYSTEM_GRAPH_DATA } from '../../data/systemGraph';
import { playPathFeedback } from '../../utils/audioFeedback';

interface MapIntroProps {
  onEnter: () => void;
  onOpenLegend: () => void;
  hasEntered: boolean;
  reducedMotion?: boolean;
}

export function MapIntro({
  onEnter,
  onOpenLegend,
  hasEntered,
  reducedMotion = false
}: MapIntroProps) {
  // Dynamically calculate counts from verified graph data
  const projectCount = SYSTEM_GRAPH_DATA.nodes.filter((n) => n.type === 'project').length;
  const techCount = SYSTEM_GRAPH_DATA.nodes.filter((n) => n.type === 'technology').length;
  const conceptCount = SYSTEM_GRAPH_DATA.nodes.filter((n) => n.type === 'concept').length;
  const toolCount = SYSTEM_GRAPH_DATA.nodes.filter((n) => n.type === 'tool').length;
  const edgeCount = SYSTEM_GRAPH_DATA.edges.length;

  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-white/10 bg-[#070B14]/90 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-2xl">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        {/* Monospace System Badge */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono uppercase tracking-widest"
        >
          <Network className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>INTERACTIVE TOPOLOGY // KARTIK SYSTEM GRAPH</span>
        </motion.div>

        {/* Title & Core Copy */}
        <div className="space-y-4">
          <motion.h2
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-white font-mono"
          >
            LIVE SYSTEM MAP
          </motion.h2>

          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg sm:text-xl font-medium text-blue-200/90 font-mono"
          >
            Explore the systems behind the work.
          </motion.p>

          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed"
          >
            Projects are rarely isolated. Follow the technologies, ideas and systems connecting them across an interactive developer ecosystem.
          </motion.p>
        </div>

        {/* Small Metadata Chips (Calculated Dynamically) */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono text-slate-300"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-white font-semibold">{projectCount}</span>
            <span className="text-slate-400">PROJECTS</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white font-semibold">{techCount}</span>
            <span className="text-slate-400">TECHNOLOGIES</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-white font-semibold">{conceptCount}</span>
            <span className="text-slate-400">CONCEPTS</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-white font-semibold">{toolCount}</span>
            <span className="text-slate-400">TOOLS</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-semibold">{edgeCount}</span>
            <span className="text-slate-400">VERIFIED CONNECTIONS</span>
          </div>
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <button
            type="button"
            onClick={() => {
              playPathFeedback('select');
              onEnter();
            }}
            className="w-full sm:w-auto min-h-[44px] px-9 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono text-sm font-bold tracking-wider flex items-center justify-center gap-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{hasEntered ? '[ RESUME SYSTEM MAP ]' : '[ ENTER SYSTEM MAP ]'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              playPathFeedback('tick');
              onOpenLegend();
            }}
            className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-white font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Info className="w-4 h-4 text-blue-400" />
            <span>HOW TO READ THIS MAP</span>
          </button>
        </motion.div>

        {/* Status Label */}
        <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-500 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SYSTEM MAP ONLINE
          </span>
          <span>•</span>
          <span>100% EVIDENCE-BACKED ARCHITECTURE</span>
          <span>•</span>
          <span>ZERO FABRICATED METRICS</span>
        </div>
      </div>
    </div>
  );
}
