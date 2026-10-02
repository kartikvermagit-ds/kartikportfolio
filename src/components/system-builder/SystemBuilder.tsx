import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Network,
  RotateCcw,
  Target,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Code2,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import type { SystemCategory, SystemComponent, SystemPreset } from '../../types/systemBuilder';
import {
  CATEGORY_DEFINITIONS,
  SYSTEM_COMPONENTS,
  SYSTEM_PRESETS
} from '../../data/systemBuilderData';
import { SystemBuilderIntro } from './SystemBuilderIntro';
import { SystemBuilderCanvas } from './SystemBuilderCanvas';
import { ComponentSelector } from './ComponentSelector';
import { NodeInspector } from './NodeInspector';
import { SystemValidationPanel } from './SystemValidationPanel';
import { PresetPicker } from './PresetPicker';
import { ArchitectureChallengeModal } from './ArchitectureChallengeModal';
import { playPathFeedback } from '../../utils/audioFeedback';

interface SystemBuilderProps {
  reducedMotion?: boolean;
}

export function SystemBuilder({ reducedMotion = false }: SystemBuilderProps) {
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Initialize with PYRAVEX preset by default for an immediately rich architectural preview
  const [selectedComponents, setSelectedComponents] = useState<
    Partial<Record<SystemCategory, SystemComponent>>
  >(() => {
    const defaultMap: Partial<Record<SystemCategory, SystemComponent>> = {};
    const defaultPreset = SYSTEM_PRESETS[0];
    Object.entries(defaultPreset.components).forEach(([cat, compId]) => {
      const comp = SYSTEM_COMPONENTS.find((c) => c.id === compId);
      if (comp) defaultMap[cat as SystemCategory] = comp;
    });
    return defaultMap;
  });

  const [activeCategory, setActiveCategory] = useState<SystemCategory>('data-source');
  const [activePresetId, setActivePresetId] = useState<string | null>('preset-pyravex');
  const [inspectingComponent, setInspectingComponent] = useState<SystemComponent | null>(null);
  const [showChallenge, setShowChallenge] = useState<boolean>(false);

  // Simulation state
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);

  // Sequential data flow simulation
  useEffect(() => {
    if (!isSimulating) return;

    if (simulationStep < 6) {
      const timer = setTimeout(() => {
        setSimulationStep((prev) => prev + 1);
        playPathFeedback('tick');
      }, 550);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        setIsSimulating(false);
        setSimulationStep(0);
        playPathFeedback('select');
      }, 600);
      return () => clearTimeout(finishTimer);
    }
  }, [isSimulating, simulationStep]);

  // External trigger listener from Tech Stack Detective (Task 10)
  useEffect(() => {
    const handleCustomTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ presetId?: string }>;
      setHasStarted(true);
      if (customEvent.detail?.presetId) {
        const found = SYSTEM_PRESETS.find((p) => p.id === customEvent.detail.presetId);
        if (found) {
          handleLoadPreset(found);
        }
      }
    };
    window.addEventListener('system-builder-select-preset', handleCustomTrigger);
    return () => window.removeEventListener('system-builder-select-preset', handleCustomTrigger);
  }, []);

  const handleSelectComponent = (comp: SystemComponent) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [comp.category]: comp
    }));
    setActivePresetId(null);

    // Auto advance to next tier in sequence if available
    const currentIndex = CATEGORY_DEFINITIONS.findIndex((c) => c.id === comp.category);
    if (currentIndex < CATEGORY_DEFINITIONS.length - 1) {
      setActiveCategory(CATEGORY_DEFINITIONS[currentIndex + 1].id);
    }
  };

  const handleRemoveNode = (cat: SystemCategory) => {
    setSelectedComponents((prev) => {
      const next = { ...prev };
      delete next[cat];
      return next;
    });
    setActivePresetId(null);
  };

  const handleLoadPreset = (preset: SystemPreset) => {
    const newMap: Partial<Record<SystemCategory, SystemComponent>> = {};
    Object.entries(preset.components).forEach(([cat, compId]) => {
      const comp = SYSTEM_COMPONENTS.find((c) => c.id === compId);
      if (comp) newMap[cat as SystemCategory] = comp;
    });
    setSelectedComponents(newMap);
    setActivePresetId(preset.id);
  };

  const handleReset = () => {
    setSelectedComponents({});
    setActivePresetId(null);
    setIsSimulating(false);
    setSimulationStep(0);
    playPathFeedback('tick');
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(1);
    playPathFeedback('select');
  };

  return (
    <div className="w-full space-y-8 text-left font-mono">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <SystemBuilderIntro
            key="builder-intro"
            onStart={() => setHasStarted(true)}
            reducedMotion={reducedMotion}
          />
        ) : (
          <motion.div
            key="builder-workspace"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Top Workspace Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#080D1A]/95 border border-slate-800 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 flex items-center justify-center">
                  <Network className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-wide">
                      SYSTEM BUILDER WORKBENCH
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300 font-semibold">
                      SIMULATED
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    INTERACTIVE END-TO-END ARCHITECTURAL PIPELINE DESIGN
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setShowChallenge(true);
                    playPathFeedback('tick');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-blue-200 border border-blue-400/40 font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Target className="w-3.5 h-3.5 text-blue-400" />
                  <span>ARCHITECTURE CHALLENGE</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  title="Clear all architectural tiers"
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET ARCHITECTURE</span>
                </button>
              </div>
            </div>

            {/* Presets Bar */}
            <PresetPicker
              activePresetId={activePresetId}
              onSelectPreset={handleLoadPreset}
            />

            {/* Central Architecture Canvas */}
            <SystemBuilderCanvas
              selectedComponents={selectedComponents}
              activeCategory={activeCategory}
              simulationStep={simulationStep}
              isSimulating={isSimulating}
              onSelectCategory={setActiveCategory}
              onInspectNode={setInspectingComponent}
              onRemoveNode={handleRemoveNode}
              reducedMotion={reducedMotion}
            />

            {/* Tier Configuration & Component Selector */}
            <ComponentSelector
              activeCategory={activeCategory}
              selectedComponents={selectedComponents}
              onSelectCategory={setActiveCategory}
              onSelectComponent={handleSelectComponent}
              reducedMotion={reducedMotion}
            />

            {/* Validation, Data Simulation & Export */}
            <SystemValidationPanel
              selectedComponents={selectedComponents}
              isSimulating={isSimulating}
              onRunSimulation={handleRunSimulation}
              onResetSystem={handleReset}
              reducedMotion={reducedMotion}
            />

            {/* Educational Architectural Distinction Note */}
            <div className="p-4 rounded-xl bg-black/60 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed flex items-start gap-3">
              <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white font-mono">ARCHITECTURE VS IMPLEMENTATION: </span>
                Architecture describes how the major tiers and contracts of a software system interact. Implementation is the concrete code written inside each tier (FastAPI endpoints, SQL migration schemas, and React components) to fulfill those contracts.
              </div>
            </div>

            {/* See This Thinking In Practice: Real Project Cards */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#070B16] border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SEE THIS THINKING IN PRACTICE (REAL PROJECTS)</span>
                </div>
                <span className="text-[10px] text-slate-400">GROUNDED IN GITHUB CODEBASES</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <a
                  href="#pyravex"
                  className="p-3.5 rounded-xl bg-black/60 border border-slate-800/90 hover:border-blue-500/50 hover:bg-slate-900/60 transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div>
                    <div className="text-blue-400 font-bold text-[11px]">PYRAVEX</div>
                    <div className="text-[10px] text-slate-300 font-sans mt-0.5">
                      Satellite Telemetry → Python Pipeline → DBSCAN ML → PostgreSQL → FastAPI → Leaflet Map
                    </div>
                  </div>
                  <div className="text-[10px] text-blue-300 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-bold">
                    <span>EXPLORE ARCHITECTURE</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </a>

                <a
                  href="#veridexa"
                  className="p-3.5 rounded-xl bg-black/60 border border-slate-800/90 hover:border-purple-500/50 hover:bg-slate-900/60 transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div>
                    <div className="text-purple-400 font-bold text-[11px]">VERIDEXA</div>
                    <div className="text-[10px] text-slate-300 font-sans mt-0.5">
                      PDF Datasheets → PyMuPDF Extraction → Deterministic Rules → Blob Storage → Audit Console
                    </div>
                  </div>
                  <div className="text-[10px] text-purple-300 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-bold">
                    <span>EXPLORE ARCHITECTURE</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </a>

                <a
                  href="#chronosat"
                  className="p-3.5 rounded-xl bg-black/60 border border-slate-800/90 hover:border-pink-500/50 hover:bg-slate-900/60 transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div>
                    <div className="text-pink-400 font-bold text-[11px]">CHRONOSAT</div>
                    <div className="text-[10px] text-slate-300 font-sans mt-0.5">
                      Orbital Passes → Spectral Normalization → Optical Flow Motion → File Cache → Frame Scrubber
                    </div>
                  </div>
                  <div className="text-[10px] text-pink-300 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-bold">
                    <span>EXPLORE ARCHITECTURE</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </a>

                <a
                  href="#hostelhub"
                  className="p-3.5 rounded-xl bg-black/60 border border-slate-800/90 hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div>
                    <div className="text-emerald-400 font-bold text-[11px]">HOSTELHUB</div>
                    <div className="text-[10px] text-slate-300 font-sans mt-0.5">
                      Student Uploads → Node.js Runtime → Supabase Postgres → REST API → React Search UI
                    </div>
                  </div>
                  <div className="text-[10px] text-emerald-300 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-bold">
                    <span>EXPLORE ARCHITECTURE</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </a>
              </div>

              {/* Task 8 Connection Trigger */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-slate-400 font-sans">
                  Ready to test how algorithmic decisions work inside the codebase?
                </div>
                <a
                  href="#code-reactor"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>TEST THE LOGIC IN CODE REACTOR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Node Inspector Modal */}
      <NodeInspector
        component={inspectingComponent}
        onClose={() => setInspectingComponent(null)}
        reducedMotion={reducedMotion}
      />

      {/* Challenge Modal */}
      <ArchitectureChallengeModal
        isOpen={showChallenge}
        onClose={() => setShowChallenge(false)}
        selectedComponents={selectedComponents}
        onAutoSolveChallenge={() => {
          handleLoadPreset(SYSTEM_PRESETS[0]);
        }}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}

export default SystemBuilder;
