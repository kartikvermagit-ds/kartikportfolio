import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Globe,
  Code2,
  Lightbulb,
  Wrench,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface MapLegendProps {
  isOpen: boolean;
  onClose: () => void;
  reducedMotion?: boolean;
}

export function MapLegend({ isOpen, onClose, reducedMotion = false }: MapLegendProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const legendItems = [
    {
      type: 'PROJECT',
      badge: 'LARGE NODE',
      color: '#3B82F6',
      icon: Globe,
      title: 'Flagship Engineering System',
      description: 'A verified end-to-end production build or hackathon award project from Kartik\'s portfolio (e.g., PYRAVEX, VERIDEXA, CHRONOSAT).'
    },
    {
      type: 'TECHNOLOGY',
      badge: 'MEDIUM NODE',
      color: '#10B981',
      icon: Code2,
      title: 'Language, Framework, or Library',
      description: 'A programming language, API framework, or client rendering engine powering the projects (e.g., Python, FastAPI, React, Leaflet).'
    },
    {
      type: 'CONCEPT',
      badge: 'PIPELINE NODE',
      color: '#8B5CF6',
      icon: Lightbulb,
      title: 'Architectural / Algorithmic Concept',
      description: 'A technical technique or core pattern applied in the system (e.g., Geospatial DBSCAN, Unit Invariant Grounding, Optical Flow).'
    },
    {
      type: 'TOOL',
      badge: 'UTILITY NODE',
      color: '#F59E0B',
      icon: Wrench,
      title: 'Deployment & Telemetry Tool',
      description: 'Infrastructure platforms, external telemetry APIs, or build tooling (e.g., NASA FIRMS API, Open-Meteo, Vercel, Render).'
    },
    {
      type: 'CONNECTION',
      badge: 'RELATIONSHIP EDGE',
      color: '#38BDF8',
      icon: GitBranch,
      title: 'Documented Technical Relationship',
      description: 'A documented architectural link (e.g., BACKEND API, MAP VIEWPORT, DATA SOURCE). Click any edge to view the exact data flow.'
    }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="map-legend-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#0A0E1A] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
      >
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500" />

        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-semibold">
              MAP GUIDE & ARCHITECTURE TAXONOMY
            </span>
            <h3
              id="map-legend-title"
              className="text-2xl font-mono font-bold text-white tracking-tight"
            >
              HOW TO READ THIS MAP
            </h3>
          </div>

          <button
            type="button"
            onClick={() => {
              playPathFeedback('tick');
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Legend Cards */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {legendItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.type}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3.5"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${item.color}15`,
                    borderColor: `${item.color}40`,
                    color: item.color
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white tracking-wide">
                      {item.type}
                    </span>
                    <span
                      className="text-[10px] font-mono px-2 py-0.2 rounded font-semibold"
                      style={{
                        backgroundColor: `${item.color}20`,
                        color: item.color
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-semibold">{item.title}</div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500">
            PRESS [ESC] OR CLICK DISMISS
          </span>
          <button
            type="button"
            onClick={() => {
              playPathFeedback('tick');
              onClose();
            }}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold tracking-wider cursor-pointer transition-all"
          >
            GOT IT
          </button>
        </div>
      </motion.div>
    </div>
  );
}
