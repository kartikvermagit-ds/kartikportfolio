import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  ExternalLink,
  Network
} from 'lucide-react';
import type { ConstellationNode } from '../../types/techStackDetective';
import { playPathFeedback } from '../../utils/audioFeedback';

interface TechnologyInspectorProps {
  node: ConstellationNode | null;
  onClose: () => void;
  onViewProject: (projectId: string) => void;
  onOpenSystemBuilder: (presetId?: string) => void;
  reducedMotion?: boolean;
}

export function TechnologyInspector({
  node,
  onClose,
  onViewProject,
  onOpenSystemBuilder,
  reducedMotion = false
}: TechnologyInspectorProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!node) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tech-inspector-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#0A0E1A] p-6 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden"
      >
        {/* Decorative Top Accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: node.color }}
        />

        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="space-y-1">
            <span
              className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-semibold"
              style={{
                color: node.color,
                borderColor: `${node.color}40`,
                backgroundColor: `${node.color}15`
              }}
            >
              {node.category}
            </span>
            <h3
              id="tech-inspector-title"
              className="text-2xl font-mono font-bold text-white tracking-tight"
            >
              {node.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => {
              playPathFeedback('tick');
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close technology profile"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            ARCHITECTURAL ROLE & PROFILE
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            {node.description}
          </p>
        </div>

        {/* Connected Projects */}
        <div className="space-y-2.5">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>VERIFIED IN PROJECTS</span>
            <span className="text-emerald-400 text-[11px] font-semibold">
              {node.projects.length} SYSTEM{node.projects.length > 1 ? 'S' : ''}
            </span>
          </div>

          <div className="space-y-2">
            {node.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/30 transition-all flex items-center justify-between gap-3 group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-mono font-bold text-white group-hover:text-blue-300 transition-colors">
                    {proj.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">{proj.role}</div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playPathFeedback('select');
                    onClose();
                    onViewProject(proj.id);
                  }}
                  className="min-h-[44px] px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-mono flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
                >
                  <span>VIEW</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Global Action Footer */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              playPathFeedback('select');
              onClose();
              onOpenSystemBuilder();
            }}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Network className="w-3.5 h-3.5" />
            <span>SEE IN SYSTEM BUILDER</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPathFeedback('tick');
              onClose();
            }}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 font-mono text-xs cursor-pointer"
          >
            DISMISS
          </button>
        </div>
      </motion.div>
    </div>
  );
}
