import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  Play,
  Copy,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import type { SystemCategory, SystemComponent, SystemValidationResult } from '../../types/systemBuilder';
import { CATEGORY_DEFINITIONS } from '../../data/systemBuilderData';
import { playPathFeedback } from '../../utils/audioFeedback';

interface SystemValidationPanelProps {
  selectedComponents: Partial<Record<SystemCategory, SystemComponent>>;
  isSimulating: boolean;
  onRunSimulation: () => void;
  onResetSystem: () => void;
  reducedMotion?: boolean;
}

export function SystemValidationPanel({
  selectedComponents,
  isSimulating,
  onRunSimulation,
  onResetSystem,
  reducedMotion = false
}: SystemValidationPanelProps) {
  const [showValidation, setShowValidation] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Validate the current architecture
  const validateArchitecture = (): SystemValidationResult => {
    const checks = CATEGORY_DEFINITIONS.map((def) => {
      const comp = selectedComponents[def.id];
      return {
        category: def.id,
        label: def.label,
        passed: Boolean(comp),
        message: comp ? `${comp.name} configured` : `Missing ${def.label.toLowerCase()}`
      };
    });

    const hasInput = Boolean(selectedComponents['data-source']);
    const hasProc = Boolean(selectedComponents['processing']);
    const hasStorage = Boolean(selectedComponents['storage']);
    const hasAPI = Boolean(selectedComponents['api']);
    const hasFrontend = Boolean(selectedComponents['frontend']);

    let isValid = checks.every((c) => c.passed);
    let statusLabel = isValid ? 'SYSTEM STRUCTURE VALID' : 'STRUCTURAL INCOMPLETE';
    let summaryText = isValid
      ? 'All six architectural tiers are fully connected in a continuous end-to-end flow.'
      : 'Some architectural tiers are not yet configured. Review structural warnings below.';

    if (hasFrontend && !hasAPI) {
      statusLabel = 'WARNING: ORPHANED FRONTEND';
      summaryText = 'Frontend has no backend API service configured to supply data.';
      isValid = false;
    } else if (hasStorage && !hasProc && !hasInput) {
      statusLabel = 'WARNING: ORPHANED STORAGE';
      summaryText = 'Database storage exists without an upstream processing or data ingestion flow.';
      isValid = false;
    }

    // Generate deterministic narrative flow
    const narrative: string[] = [];
    if (selectedComponents['data-source']) {
      narrative.push(`1. Data Ingestion: Raw events enter through ${selectedComponents['data-source'].name}.`);
    }
    if (selectedComponents['processing']) {
      narrative.push(`2. Processing & Normalization: ${selectedComponents['processing'].name} sanitizes and transforms raw tensors/entities.`);
    }
    if (selectedComponents['intelligence']) {
      narrative.push(`3. Analytical Intelligence: ${selectedComponents['intelligence'].name} models signals, clusters, or heuristic validation.`);
    }
    if (selectedComponents['storage']) {
      narrative.push(`4. State Persistence: ${selectedComponents['storage'].name} archives structured records and spatial tables.`);
    }
    if (selectedComponents['api']) {
      narrative.push(`5. Endpoint Gateway: ${selectedComponents['api'].name} exposes typed query routes to client consumers.`);
    }
    if (selectedComponents['frontend']) {
      narrative.push(`6. Client Presentation: ${selectedComponents['frontend'].name} renders interactive components and telemetry.`);
    }

    return {
      isValid,
      statusLabel,
      summaryText,
      checks,
      dataFlowNarrative: narrative
    };
  };

  const validation = validateArchitecture();

  // Easter egg check: Python + FastAPI + React
  const isKartikStack =
    selectedComponents['processing']?.id === 'proc-python' &&
    selectedComponents['api']?.id === 'api-fastapi' &&
    selectedComponents['frontend']?.id === 'front-react';

  const handleCopyArchitecture = () => {
    const textLines = [
      'KARTIK.OS ARCHITECTURE EXPORT (SIMULATION)',
      '==========================================',
      ...CATEGORY_DEFINITIONS.map(
        (def) => `${def.label.padEnd(16)}: ${selectedComponents[def.id]?.name || '[NOT CONFIGURED]'}`
      ),
      '==========================================',
      `STATUS: ${validation.statusLabel}`
    ].join('\n');

    try {
      navigator.clipboard.writeText(textLines);
      setCopied(true);
      playPathFeedback('select');
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="w-full rounded-2xl bg-[#080D1A]/95 border border-slate-800 p-4 sm:p-6 shadow-2xl font-mono space-y-5 text-left">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span className="text-white font-bold text-xs tracking-wider">
            SYSTEM VALIDATION & SIMULATION
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onRunSimulation}
            disabled={isSimulating}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-600/25 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{isSimulating ? 'SIMULATING DATA FLOW...' : 'RUN SYSTEM'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setShowValidation(!showValidation);
              playPathFeedback('tick');
            }}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              showValidation
                ? 'bg-blue-950/80 border-blue-400 text-blue-200'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>VALIDATE SYSTEM</span>
          </button>

          <button
            type="button"
            onClick={handleCopyArchitecture}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED' : 'COPY ARCHITECTURE'}</span>
          </button>
        </div>
      </div>

      {/* 6-Point Structural Checklist */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-[11px]">
        {validation.checks.map((chk) => (
          <div
            key={chk.category}
            className={`p-2.5 rounded-xl border flex flex-col justify-between ${
              chk.passed
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-black/50 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[10px]">{chk.label}</span>
              {chk.passed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-slate-700" />
              )}
            </div>
            <div className="text-[10px] text-slate-300 truncate mt-1">
              {selectedComponents[chk.category]?.name || 'Not set'}
            </div>
          </div>
        ))}
      </div>

      {/* Easter Egg Notice */}
      {isKartikStack && (
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/50 flex items-center gap-2.5 text-xs text-purple-200">
          <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 animate-pulse" />
          <div>
            <span className="font-bold">DETECTED: </span>
            A familiar stack (Python + FastAPI + React). "Looks like something I'd build."
          </div>
        </div>
      )}

      {/* Expandable Validation & Data Flow Narrative */}
      <AnimatePresence>
        {showValidation && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            className="p-4 rounded-xl bg-black/70 border border-blue-500/40 space-y-3 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className={`font-bold ${validation.isValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                {validation.statusLabel}
              </span>
              <span className="text-[10px] text-slate-400">STRUCTURAL EVALUATION</span>
            </div>

            <p className="text-slate-300 font-sans leading-relaxed">{validation.summaryText}</p>

            {validation.dataFlowNarrative.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">
                  HOW YOUR SYSTEM WORKS (DATA FLOW STEP-BY-STEP):
                </span>
                <div className="space-y-1 text-[11px] text-slate-300 font-sans">
                  {validation.dataFlowNarrative.map((step, i) => (
                    <div key={`flow-${i}`} className="p-1.5 rounded bg-slate-900/60 border border-slate-800">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SystemValidationPanel;
