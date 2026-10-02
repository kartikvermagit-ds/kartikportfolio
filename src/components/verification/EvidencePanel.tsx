import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Building2,
  TrendingDown,
  ArrowRight,
  Info,
  Sparkles,
  Compass
} from 'lucide-react';
import type { DocumentSpecificationField } from '../../types/veridexaGame';
import { playPathFeedback } from '../../utils/audioFeedback';

interface EvidencePanelProps {
  selectedField: DocumentSpecificationField | null;
  onVerifyField: (field: DocumentSpecificationField, decision: 'ACCEPT' | 'FLAG') => void;
  reducedMotion?: boolean;
}

export function EvidencePanel({
  selectedField,
  onVerifyField,
  reducedMotion = false
}: EvidencePanelProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!selectedField) {
    return (
      <div className="flex flex-col h-full rounded-2xl bg-[#03060B] border border-slate-800 shadow-xl overflow-hidden font-mono select-none">
        <div className="p-3 bg-[#080D16] border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-200">EVIDENCE AUDITOR</span>
          <span className="text-[10px] text-slate-400">AWAITING TARGET</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#05080E] text-xs">
          <Compass className="w-8 h-8 text-purple-400/60 mb-3 animate-spin" style={{ animationDuration: '24s' }} />
          <h5 className="font-bold text-white mb-1.5">Select a Specification</h5>
          <p className="text-[11px] text-slate-400 font-sans max-w-xs leading-relaxed">
            Extract and select an attribute from the structured table to cross-reference against third-party lab reports, metrology logs, and material certifications.
          </p>
        </div>
      </div>
    );
  }

  const { evidenceSource, hasConflict } = selectedField;

  const handleDecision = (decision: 'ACCEPT' | 'FLAG') => {
    if (decision === 'ACCEPT' && hasConflict) {
      playPathFeedback('tick');
      setErrorMessage(
        'CONFLICT REMAINS UNRESOLVED: Laboratory electrical bench testing recorded 150W sustained under peak duty cycle. Accepting 120W without engineering sign-off presents a severe power supply thermal failure risk. Flag this specification for verification.'
      );
      return;
    }

    setErrorMessage(null);
    playPathFeedback('select');
    onVerifyField(selectedField, decision);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl bg-[#03060B] border border-slate-800 shadow-xl overflow-hidden font-mono select-none">
      {/* Panel Header */}
      <div className="p-3 bg-[#080D16] border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-purple-400" />
          <span className="font-bold text-slate-200">EVIDENCE DOSSIER</span>
        </div>
        <span
          className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
            hasConflict
              ? 'bg-red-500/20 text-red-300 border-red-500/40'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          }`}
        >
          {hasConflict ? 'DISCREPANCY DETECTED' : 'CROSS-REFERENCE MATCH'}
        </span>
      </div>

      {/* Evidence Body */}
      <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 bg-[#05080E] text-xs scrollbar-thin">
        {/* Target Field Summary Card */}
        <div className="p-3.5 rounded-xl bg-[#080D16] border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase font-semibold mb-1">
            TARGET SPECIFICATION
          </div>
          <div className="flex items-center justify-between">
            <span className="font-heading font-black text-white text-sm">
              {selectedField.name}
            </span>
            <span className="font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/60">
              Doc: {selectedField.documentValue}
            </span>
          </div>
        </div>

        {/* Evidence Source Card */}
        <div
          className={`p-4 rounded-2xl border space-y-3 ${
            hasConflict
              ? 'bg-[#15070B] border-red-500/50 shadow-lg shadow-red-500/10'
              : 'bg-[#080D16] border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-bold text-slate-300">{evidenceSource.sourceName}</span>
            </div>
            <span className="text-[9px] text-slate-400">
              SIMULATED CONFIDENCE: <strong className="text-white">{evidenceSource.simulatedConfidence}%</strong>
            </span>
          </div>

          <div className="text-[10px] text-slate-400">
            SOURCE TYPE: <span className="text-slate-300 font-semibold">{evidenceSource.sourceType}</span>
          </div>

          {/* Comparison View */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2.5 rounded-xl bg-[#05070B] border border-slate-800">
              <span className="text-[9px] text-slate-400 block mb-0.5">DOCUMENT CLAIM</span>
              <span className="font-bold text-slate-200">{selectedField.documentValue}</span>
            </div>
            <div
              className={`p-2.5 rounded-xl border ${
                hasConflict
                  ? 'bg-red-950/40 border-red-500/50'
                  : 'bg-emerald-950/30 border-emerald-500/40'
              }`}
            >
              <span className="text-[9px] text-slate-400 block mb-0.5">EVIDENCE MEASURED</span>
              <span
                className="font-bold"
                style={{ color: hasConflict ? '#EF4444' : '#10B981' }}
              >
                {evidenceSource.evidenceValue}
              </span>
            </div>
          </div>

          {/* Detailed Note */}
          <div className="p-3 rounded-xl bg-[#05070B] border border-slate-800/80 text-[11px] font-sans leading-relaxed text-slate-300">
            {evidenceSource.discrepancyNote}
          </div>
        </div>

        {/* Warning Error Prompt (If visitor attempted to accept a conflicting value) */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
              className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/80 text-xs text-red-200 space-y-1 shadow-lg"
            >
              <div className="flex items-center gap-1.5 text-red-400 font-bold uppercase text-[10px]">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>VERIFICATION RULE WARNING</span>
              </div>
              <p className="font-sans text-[11px] leading-relaxed">
                {errorMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Decision Section */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">
            INVESTIGATOR ACTION DECISION
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDecision('ACCEPT')}
              data-cursor="pointer"
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#080D16] border border-slate-700 hover:border-slate-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
              <span>ACCEPT DOC VALUE</span>
            </button>

            <button
              type="button"
              onClick={() => handleDecision('FLAG')}
              data-cursor="pointer"
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 shadow-lg cursor-pointer ${
                hasConflict
                  ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/25 scale-[1.02]'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-white" />
              <span>FLAG FOR AUDIT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvidencePanel;
