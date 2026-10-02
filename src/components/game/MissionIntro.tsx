import React from 'react';
import { motion } from 'framer-motion';
import { Satellite, Radio, Target, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface MissionIntroProps {
  onStartMission: () => void;
  reducedMotion?: boolean;
}

export function MissionIntro({ onStartMission, reducedMotion = false }: MissionIntroProps) {
  const handleStart = () => {
    playPathFeedback('select');
    onStartMission();
  };

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      className="p-6 sm:p-10 rounded-3xl bg-[#080D16]/95 border border-blue-500/30 shadow-2xl relative overflow-hidden text-center max-w-3xl mx-auto font-mono select-none"
    >
      {/* Background Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Monospace Identifier Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#05070B] border border-blue-500/30 text-[10px] text-blue-400 mb-6">
        <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span className="font-bold tracking-widest uppercase">PYRAVEX INTELLIGENCE SYSTEM</span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-300 font-semibold">MISSION 01</span>
      </div>

      {/* Main Title */}
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight mb-4">
        Find the Anomaly.
      </h3>

      {/* Core Premise */}
      <p className="text-sm sm:text-base text-slate-300 font-sans max-w-xl mx-auto leading-relaxed mb-6">
        Multiple thermal signals have appeared across the satellite observation pass. Most signals represent normal human or seasonal activity (industrial plants, agricultural burning, surface albedo).
      </p>

      {/* Objective Key Insight */}
      <div className="p-4 rounded-2xl bg-[#05070B] border border-slate-800 max-w-lg mx-auto text-left mb-8 text-xs font-sans">
        <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-[11px] mb-1.5 uppercase">
          <Target className="w-3.5 h-3.5 text-amber-400" />
          <span>OPERATIONAL OBJECTIVE:</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Inspect signal intensities, nocturnal persistence, and 7-day historical trend curves. Identify the one true uncontrolled breakout anomaly.
        </p>
        <div className="mt-2 text-[10px] font-mono text-cyan-400">
          CORE PRINCIPLE: "An anomaly is not simply a hot pixel — its behavior and context matter."
        </div>
      </div>

      {/* Start Button */}
      <button
        type="button"
        onClick={handleStart}
        data-cursor="pointer"
        className="px-8 py-3.5 rounded-full text-white font-mono text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-2 mx-auto shadow-xl hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        style={{
          backgroundColor: '#2563EB',
          boxShadow: '0 0 25px rgba(37, 99, 235, 0.45)'
        }}
      >
        <Satellite className="w-4 h-4 text-cyan-300" />
        <span>INITIALIZE SATELLITE SCAN</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Disclaimer Subtext */}
      <div className="mt-4 text-[9px] text-slate-500 font-mono uppercase tracking-wider">
        TRAINING SCENARIO • DEMO DATASET • ACCELERATED REPLAY
      </div>
    </motion.div>
  );
}

export default MissionIntro;
