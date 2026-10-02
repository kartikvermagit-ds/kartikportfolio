import React from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  ArrowRight,
  ArrowDown,
  X,
  Info,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import type { SystemCategory, SystemComponent } from '../../types/systemBuilder';
import { CATEGORY_DEFINITIONS } from '../../data/systemBuilderData';
import { playPathFeedback } from '../../utils/audioFeedback';

interface SystemBuilderCanvasProps {
  selectedComponents: Partial<Record<SystemCategory, SystemComponent>>;
  activeCategory: SystemCategory;
  simulationStep: number; // 0 to 6 (0 = idle, 1..6 = active node)
  isSimulating: boolean;
  onSelectCategory: (cat: SystemCategory) => void;
  onInspectNode: (component: SystemComponent) => void;
  onRemoveNode: (cat: SystemCategory) => void;
  reducedMotion?: boolean;
}

export function SystemBuilderCanvas({
  selectedComponents,
  activeCategory,
  simulationStep,
  isSimulating,
  onSelectCategory,
  onInspectNode,
  onRemoveNode,
  reducedMotion = false
}: SystemBuilderCanvasProps) {
  return (
    <div className="w-full rounded-2xl bg-[#080D1A]/95 border border-slate-800 p-4 sm:p-6 shadow-2xl font-mono space-y-4 text-left">
      {/* Canvas Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 text-xs">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-400" />
          <span className="text-white font-bold tracking-wider">ARCHITECTURE CANVAS</span>
          <span className="text-[10px] text-blue-300 font-semibold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30">
            SIMULATION
          </span>
        </div>
        <div className="text-[10px] text-slate-400">
          CLICK NODE TO INSPECT • CONDUITS ANIMATE ON RUN
        </div>
      </div>

      {/* Grid of 6 Architecture Tiers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 pt-2">
        {CATEGORY_DEFINITIONS.map((def, idx) => {
          const comp = selectedComponents[def.id];
          const isCategoryActive = activeCategory === def.id;
          const isNodeSimulating = isSimulating && simulationStep === idx + 1;

          return (
            <div key={def.id} className="relative flex flex-col justify-between">
              {/* Node Box */}
              <div
                className={`w-full min-h-[160px] p-3.5 rounded-2xl border transition-all flex flex-col justify-between text-left ${
                  comp
                    ? isNodeSimulating
                      ? 'bg-blue-600/30 border-blue-400 shadow-xl shadow-blue-500/30 scale-102'
                      : isCategoryActive
                      ? 'bg-slate-900 border-blue-500/80 shadow-md shadow-blue-950/50'
                      : 'bg-black/70 border-slate-800 hover:border-slate-700'
                    : isCategoryActive
                    ? 'bg-blue-950/30 border-blue-500/50 border-dashed'
                    : 'bg-black/40 border-slate-800/80 border-dashed hover:border-slate-700'
                }`}
              >
                {/* Node Top Header */}
                <div className="flex items-center justify-between gap-1 text-[10px] text-slate-400 mb-1">
                  <span className="font-bold">{def.number}. {def.label}</span>
                  {comp && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveNode(def.id);
                        playPathFeedback('tick');
                      }}
                      title="Remove component"
                      className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Node Body */}
                {comp ? (
                  <div
                    onClick={() => {
                      onInspectNode(comp);
                      playPathFeedback('select');
                    }}
                    className="cursor-pointer space-y-1.5 py-1"
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: comp.color }}
                      />
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {comp.name}
                      </h4>
                    </div>

                    <p className="text-[10px] text-slate-300 font-sans line-clamp-2 leading-relaxed">
                      {comp.tagline}
                    </p>

                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {comp.badge}
                      </span>
                      {comp.usedInProjects.slice(0, 1).map((p) => (
                        <span
                          key={p}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-500/40 text-blue-300 font-semibold"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(def.id);
                      playPathFeedback('tick');
                    }}
                    className="w-full h-full flex flex-col items-center justify-center py-4 cursor-pointer text-slate-400 hover:text-blue-300 transition-colors text-center"
                  >
                    <span className="text-base font-bold text-blue-400 mb-1">+</span>
                    <span className="text-[11px] font-bold">CONFIGURE</span>
                    <span className="text-[9px] text-slate-400">{def.label}</span>
                  </button>
                )}

                {/* Node Footer Status */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-400">
                  {comp ? (
                    <button
                      type="button"
                      onClick={() => onInspectNode(comp)}
                      className="text-blue-400 hover:text-blue-200 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Info className="w-3 h-3" />
                      <span>INSPECT</span>
                    </button>
                  ) : (
                    <span>EMPTY</span>
                  )}
                  {isNodeSimulating && (
                    <span className="text-blue-300 font-bold animate-pulse flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5" /> RUNNING
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SystemBuilderCanvas;
