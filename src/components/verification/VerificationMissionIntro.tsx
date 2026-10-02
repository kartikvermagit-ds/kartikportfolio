import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, ShieldCheck, ArrowRight, Sparkles, AlertTriangle, Layers } from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface VerificationMissionIntroProps {
  onStartMission: () => void;
  reducedMotion?: boolean;
}

export function VerificationMissionIntro({
  onStartMission,
  reducedMotion = false
}: VerificationMissionIntroProps) {
  const handleStart = () => {
    playPathFeedback('select');
    onStartMission();
  };

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      className="p-6 sm:p-10 rounded-3xl bg-[#080D16]/95 border border-purple-500/30 shadow-2xl relative overflow-hidden text-center max-w-3xl mx-auto font-mono select-none"
    >
      {/* Background Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Monospace Identifier Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#05070B] border border-purple-500/30 text-[10px] text-purple-400 mb-6">
        <Layers className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
        <span className="font-bold tracking-widest uppercase">VERIDEXA DOCUMENT INTELLIGENCE</span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-300 font-semibold">MISSION 01</span>
      </div>

      {/* Main Title */}
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight mb-4">
        Verify the Document.
      </h3>

      {/* Core Premise */}
      <p className="text-sm sm:text-base text-slate-300 font-sans max-w-xl mx-auto leading-relaxed mb-6">
        "Something doesn't look consistent." An industrial IoT gateway specification sheet has been received. Multiple candidate attributes appear standard, but subtle physical contradictions may lurk between vendor declarations and third-party laboratory test reports.
      </p>

      {/* Operational Objective Card */}
      <div className="p-4 rounded-2xl bg-[#05070B] border border-slate-800 max-w-lg mx-auto text-left mb-8 text-xs font-sans">
        <div className="flex items-center gap-2 text-purple-400 font-mono font-bold text-[11px] mb-1.5 uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>INVESTIGATION OBJECTIVE:</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Click and extract key attributes from the document, compare normalized values against independent laboratory evidence, isolate the hidden discrepancy, and submit an evidence-grounded verification audit.
        </p>
        <div className="mt-2 text-[10px] font-mono text-purple-300">
          CORE PRINCIPLE: "Documents alone cannot be trusted without grounded coordinate citations and cross-field invariance rules."
        </div>
      </div>

      {/* Start Button */}
      <button
        type="button"
        onClick={handleStart}
        data-cursor="pointer"
        className="px-8 py-3.5 rounded-full text-white font-mono text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-2 mx-auto shadow-xl hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 cursor-pointer"
        style={{
          backgroundColor: '#8B5CF6',
          boxShadow: '0 0 25px rgba(139, 92, 246, 0.45)'
        }}
      >
        <FileText className="w-4 h-4 text-purple-200" />
        <span>START INVESTIGATION WORKBENCH</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Disclaimer Subtext */}
      <div className="mt-4 text-[9px] text-slate-500 font-mono uppercase tracking-wider">
        PORTFOLIO SIMULATION • ILLUSTRATIVE TRAINING SPECIFICATION
      </div>
    </motion.div>
  );
}

export default VerificationMissionIntro;
