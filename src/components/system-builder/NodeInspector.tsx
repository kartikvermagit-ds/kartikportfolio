import React from 'react';
import { motion } from 'framer-motion';
import { X, Info, ExternalLink, ArrowRight, ShieldCheck, Database, Layers } from 'lucide-react';
import type { SystemComponent } from '../../types/systemBuilder';
import { playPathFeedback } from '../../utils/audioFeedback';

interface NodeInspectorProps {
  component: SystemComponent | null;
  onClose: () => void;
  reducedMotion?: boolean;
}

export function NodeInspector({ component, onClose, reducedMotion = false }: NodeInspectorProps) {
  if (!component) return null;

  const projectLinks: Record<string, string> = {
    PYRAVEX: '#pyravex',
    VERIDEXA: '#veridexa',
    CHRONOSAT: '#chronosat',
    HOSTELHUB: '#hostelhub'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl bg-[#090D1A] border border-blue-500/40 p-6 shadow-2xl font-mono space-y-5 text-left"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            onClose();
            playPathFeedback('tick');
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: component.color }}
            />
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
              NODE INSPECTOR • {component.category.toUpperCase()}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">{component.name}</h3>
          <div className="text-xs text-blue-300 font-semibold">{component.tagline}</div>
        </div>

        {/* Description & Role */}
        <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-1.5 text-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase">ARCHITECTURAL ROLE</div>
          <p className="text-slate-300 font-sans leading-relaxed">{component.description}</p>
        </div>

        {/* Why this component? */}
        <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-1.5 text-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase">TECHNICAL JUSTIFICATION</div>
          <p className="text-slate-300 font-sans leading-relaxed">{component.why}</p>
        </div>

        {/* Input / Output Contracts */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-black/60 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400">INGESTION INPUT:</div>
            <div className="text-white font-semibold text-[11px] truncate">{component.input}</div>
          </div>
          <div className="p-3 rounded-xl bg-black/60 border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400">EMITTED OUTPUT:</div>
            <div className="text-white font-semibold text-[11px] truncate">{component.output}</div>
          </div>
        </div>

        {/* Used in Real Projects */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="text-[10px] text-slate-400 font-bold uppercase">
            IMPLEMENTED IN KARTIK'S REAL PROJECTS:
          </div>
          <div className="flex flex-wrap gap-2">
            {component.usedInProjects.map((proj) => (
              <a
                key={proj}
                href={projectLinks[proj] || '#work'}
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>{proj}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default NodeInspector;
