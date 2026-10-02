import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, HelpCircle, Layers, Info } from 'lucide-react';
import type { SystemCategory, SystemComponent } from '../../types/systemBuilder';
import { CATEGORY_DEFINITIONS, SYSTEM_COMPONENTS } from '../../data/systemBuilderData';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ComponentSelectorProps {
  activeCategory: SystemCategory;
  selectedComponents: Partial<Record<SystemCategory, SystemComponent>>;
  onSelectCategory: (cat: SystemCategory) => void;
  onSelectComponent: (comp: SystemComponent) => void;
  reducedMotion?: boolean;
}

export function ComponentSelector({
  activeCategory,
  selectedComponents,
  onSelectCategory,
  onSelectComponent,
  reducedMotion = false
}: ComponentSelectorProps) {
  const currentCategoryDef = CATEGORY_DEFINITIONS.find((c) => c.id === activeCategory);
  const categoryComponents = SYSTEM_COMPONENTS.filter((c) => c.category === activeCategory);
  const selectedComp = selectedComponents[activeCategory];

  return (
    <div className="w-full rounded-2xl bg-[#080D1A]/95 border border-slate-800 p-4 sm:p-6 shadow-2xl font-mono space-y-5 text-left">
      {/* Category Tabs Header */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800">
        {CATEGORY_DEFINITIONS.map((def) => {
          const isCurrent = def.id === activeCategory;
          const isConfigured = Boolean(selectedComponents[def.id]);

          return (
            <button
              key={def.id}
              type="button"
              onClick={() => {
                onSelectCategory(def.id);
                playPathFeedback('tick');
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isCurrent
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-black/60 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800'
              }`}
            >
              <span>{def.number}. {def.label}</span>
              {isConfigured && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Category Description Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div>
          <span className="text-blue-400 font-bold">CONFIGURE {currentCategoryDef?.label}: </span>
          <span className="text-slate-300 font-sans">{currentCategoryDef?.description}</span>
        </div>
        <div className="text-[10px] text-slate-400">
          CHOOSE COMPONENT TO LINK TO ARCHITECTURE
        </div>
      </div>

      {/* Component Option Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {categoryComponents.map((comp) => {
          const isSelected = selectedComp?.id === comp.id;

          return (
            <div
              key={comp.id}
              onClick={() => {
                onSelectComponent(comp);
                playPathFeedback('select');
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-blue-950/40 border-blue-400 shadow-lg shadow-blue-900/30'
                  : 'bg-black/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              {/* Top Meta */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: comp.color }}
                    />
                    <h4 className="text-sm font-bold text-white">{comp.name}</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    {comp.badge}
                  </span>
                </div>
                <div className="text-xs text-blue-300 font-semibold">{comp.tagline}</div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
                  {comp.description}
                </p>
              </div>

              {/* Technical Rationale "Why This Component?" */}
              <div className="p-2.5 rounded-lg bg-black/70 border border-slate-800/80 text-[11px] space-y-1">
                <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-blue-400" />
                  <span>WHY THIS COMPONENT?</span>
                </div>
                <p className="text-slate-300 font-sans leading-relaxed">{comp.why}</p>
              </div>

              {/* Input / Output Data Contract & Real Projects */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                <div className="text-slate-400">
                  <span className="text-slate-400">INPUT:</span> {comp.input}
                  <span className="mx-1.5">•</span>
                  <span className="text-slate-400">OUTPUT:</span> {comp.output}
                </div>

                <div className="flex items-center gap-1">
                  {comp.usedInProjects.map((p) => (
                    <span
                      key={p}
                      className="px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-blue-300 font-bold"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ComponentSelector;
