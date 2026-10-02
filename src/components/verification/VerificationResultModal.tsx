import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  FileCheck,
  FileText,
  Layers,
  Sparkles
} from 'lucide-react';
import type { DocumentSpecificationField } from '../../types/veridexaGame';
import { playPathFeedback } from '../../utils/audioFeedback';

interface VerificationResultModalProps {
  flaggedField: DocumentSpecificationField;
  allFields: DocumentSpecificationField[];
  onContinueToPipeline: () => void;
  onReset: () => void;
  reducedMotion?: boolean;
}

export function VerificationResultModal({
  flaggedField,
  allFields,
  onContinueToPipeline,
  onReset,
  reducedMotion = false
}: VerificationResultModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none font-mono">
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-[#080D16] border border-purple-500/50 shadow-2xl relative overflow-hidden"
        style={{
          boxShadow: '0 0 50px rgba(139, 92, 246, 0.25), 0 25px 50px rgba(0,0,0,0.85)'
        }}
      >
        {/* Status Header */}
        <div className="flex items-center gap-2 mb-3 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-5 h-5 text-purple-400" />
          <span>VERIFICATION AUDIT COMPLETE</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mb-2">
          Discrepancy Successfully Grounded.
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-5">
          You correctly identified that <strong>{flaggedField.name}</strong> contains a critical contradiction between the vendor product sheet and independent electrical testing evidence.
        </p>

        {/* Conflict Highlight Box */}
        <div className="p-4 rounded-2xl bg-[#05070B] border border-purple-500/30 space-y-2 mb-5 text-xs">
          <div className="flex items-center justify-between text-[11px] pb-2 border-b border-slate-800">
            <span className="text-slate-400">DISCREPANCY TARGET:</span>
            <span className="font-bold text-white">{flaggedField.name}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[9px] text-slate-400 block">DOCUMENT VALUE</span>
              <span className="font-bold text-purple-300">{flaggedField.documentValue}</span>
            </div>
            <div className="p-2 rounded-lg bg-red-950/40 border border-red-500/40">
              <span className="text-[9px] text-slate-400 block">LAB BENCH EVIDENCE</span>
              <span className="font-bold text-red-400">{flaggedField.evidenceSource.evidenceValue}</span>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-slate-300 font-sans leading-relaxed">
            {flaggedField.evidenceSource.resolutionExplanation}
          </div>
        </div>

        {/* Audit Stats Breakdown */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#05070B] border border-slate-800 text-center mb-6 text-[11px]">
          <div>
            <span className="text-[9px] text-slate-400 block">FIELDS EXTRACTED</span>
            <span className="font-bold text-white">{allFields.length} / {allFields.length}</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 block">CONFLICTS ISOLATED</span>
            <span className="font-bold text-red-400">1 Critical</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 block">GROUNDED CITATIONS</span>
            <span className="font-bold text-emerald-400">100% Verified</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onReset}
            data-cursor="pointer"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-[#05070B] border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>VERIFY ANOTHER</span>
          </button>

          <button
            type="button"
            onClick={onContinueToPipeline}
            data-cursor="pointer"
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            style={{
              backgroundColor: '#8B5CF6',
              boxShadow: '0 0 25px rgba(139, 92, 246, 0.45)'
            }}
          >
            <span>HOW VERIDEXA WORKS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default VerificationResultModal;
