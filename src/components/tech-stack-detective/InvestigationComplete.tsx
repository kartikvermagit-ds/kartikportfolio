import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Network,
  Cpu,
  Layers,
  Code2,
  ExternalLink,
  Terminal,
  Compass
} from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface InvestigationCompleteProps {
  completedCasesCount: number;
  totalCasesCount: number;
  hintsUsed: number;
  discoveredTechs: string[];
  onExploreProjects: () => void;
  onExploreStack: () => void;
  onOpenSystemBuilder: () => void;
  onOpenCodeReactor: () => void;
  onReset: () => void;
  onOpenConstellation: () => void;
  reducedMotion?: boolean;
}

export function InvestigationComplete({
  completedCasesCount,
  totalCasesCount,
  hintsUsed,
  discoveredTechs,
  onExploreProjects,
  onExploreStack,
  onOpenSystemBuilder,
  onOpenCodeReactor,
  onReset,
  onOpenConstellation,
  reducedMotion = false
}: InvestigationCompleteProps) {
  const verifiedCategories = [
    {
      category: 'CORE LANGUAGES',
      techs: ['Python 3.11', 'TypeScript', 'JavaScript'],
      color: '#38BDF8'
    },
    {
      category: 'BACKEND & APIS',
      techs: ['FastAPI (Async)', 'Node.js', 'REST Endpoints'],
      color: '#10B981'
    },
    {
      category: 'FRONTEND UI',
      techs: ['React 19', 'Vite', 'Tailwind CSS'],
      color: '#60A5FA'
    },
    {
      category: 'GEOSPATIAL & TELEMETRY',
      techs: ['Leaflet GIS', 'NASA FIRMS API', 'Open-Meteo'],
      color: '#34D399'
    },
    {
      category: 'STORAGE & GROUNDING',
      techs: ['Supabase', 'PostgreSQL', 'Rule-Based Grounding'],
      color: '#A855F7'
    },
    {
      category: 'VISION & CLIENT SHELL',
      techs: ['Optical Flow', 'Electron', 'MutationObserver'],
      color: '#F59E0B'
    }
  ];

  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#070B14]/95 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-10">
      {/* Background Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.18),rgba(255,255,255,0))]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center">
        {/* Verification Success Pill */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono tracking-widest uppercase font-semibold"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>INVESTIGATION COMPLETE // STACK REVEALED</span>
        </motion.div>

        {/* Title */}
        <div className="space-y-3">
          <motion.h2
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-white font-mono"
          >
            STACK TRACE RESOLVED
          </motion.h2>

          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-emerald-200/90 font-mono"
          >
            You just traced the stack behind real projects.
          </motion.p>

          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed"
          >
            From NASA FIRMS satellite ingestion to document conflict grounding and temporal interpolation — every technology serves an architectural purpose.
          </motion.p>
        </div>

        {/* Lightweight Metrics Dashboard */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto font-mono text-xs"
        >
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
            <div className="text-slate-400 text-[10px] uppercase">CASES SOLVED</div>
            <div className="text-xl font-bold text-white mt-1">
              {completedCasesCount} / {totalCasesCount}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
            <div className="text-slate-400 text-[10px] uppercase">HINTS CONSULTED</div>
            <div className="text-xl font-bold text-amber-300 mt-1">{hintsUsed}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
            <div className="text-slate-400 text-[10px] uppercase">NODES VERIFIED</div>
            <div className="text-xl font-bold text-emerald-300 mt-1">
              {discoveredTechs.length > 0 ? discoveredTechs.length : 12}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
            <div className="text-slate-400 text-[10px] uppercase">CONFIDENCE</div>
            <div className="text-xl font-bold text-blue-300 mt-1">100%</div>
          </div>
        </motion.div>

        {/* Categorized Verified Stack Nodes Grid */}
        <div className="pt-4 space-y-3 text-left">
          <div className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center justify-between border-b border-white/[0.08] pb-2">
            <span>VERIFIED ARCHITECTURAL STACK SUMMARY</span>
            <span className="text-emerald-400">100% EVIDENCE-BACKED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {verifiedCategories.map((cat, idx) => (
              <motion.div
                key={cat.category}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + idx * 0.05 }}
                className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-2 hover:border-emerald-500/30 transition-all"
              >
                <div
                  className="text-[10px] font-mono font-bold tracking-wider uppercase"
                  style={{ color: cat.color }}
                >
                  {cat.category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-white font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Action Links */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              playPathFeedback('select');
              onExploreProjects();
            }}
            className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>EXPLORE PROJECTS</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPathFeedback('select');
              onOpenSystemBuilder();
            }}
            className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 transition-all cursor-pointer"
          >
            <Network className="w-4 h-4" />
            <span>SEE IT IN A SYSTEM</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPathFeedback('select');
              onOpenCodeReactor();
            }}
            className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
          >
            <Cpu className="w-4 h-4" />
            <span>TEST YOUR LOGIC (CODE REACTOR)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPathFeedback('select');
              onOpenConstellation();
            }}
            className="w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-200 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>OPEN CONSTELLATION GRAPH</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPathFeedback('tick');
              onReset();
            }}
            className="w-full sm:w-auto min-h-[44px] px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>PLAY AGAIN</span>
          </button>
        </div>
      </div>
    </div>
  );
}
