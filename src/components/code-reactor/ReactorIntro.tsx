import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Play, CheckCircle2, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ReactorIntroProps {
  onInitialize: () => void;
  reducedMotion?: boolean;
}

const BOOT_LOGS = [
  'BOOTING CODE CORE...',
  'LOADING LOGIC MATRIX...',
  'CHECKING INPUT TELEMETRY...',
  'COMPILING CHALLENGE 01...',
  'SYSTEM READY. REACTOR ONLINE.'
];

export function ReactorIntro({ onInitialize, reducedMotion = false }: ReactorIntroProps) {
  const [isBooting, setIsBooting] = useState<boolean>(false);
  const [bootStep, setBootStep] = useState<number>(0);

  const handleStartBoot = () => {
    setIsBooting(true);
    playPathFeedback('select');
  };

  useEffect(() => {
    if (!isBooting) return;

    if (bootStep < BOOT_LOGS.length - 1) {
      const timer = setTimeout(() => {
        setBootStep((prev) => prev + 1);
        playPathFeedback('tick');
      }, 400);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onInitialize();
      }, 500);
      return () => clearTimeout(finishTimer);
    }
  }, [isBooting, bootStep, onInitialize]);

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-2xl border border-blue-500/30 bg-[#070B14]/95 backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden text-center space-y-6"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 blur-3xl pointer-events-none" />

      {/* Cyber brackets */}
      <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-blue-500/60 pointer-events-none" />
      <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-blue-500/60 pointer-events-none" />
      <span className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-blue-500/60 pointer-events-none" />
      <span className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-blue-500/60 pointer-events-none" />

      {/* Top Header Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px]">
        <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/40 text-blue-300 font-semibold tracking-wider flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          CODE REACTOR • INTERACTIVE WORKSTATION
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 font-bold">
          DEBUG • REASON • EXECUTE
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
          PORTFOLIO INTERACTION
        </span>
      </div>

      {/* Title & Narrative */}
      <div className="space-y-3 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          CODE REACTOR
        </h2>
        <p className="text-sm sm:text-base font-semibold text-blue-300 font-mono">
          Small problems. Real reasoning. One decision at a time.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          Step into a futuristic developer workstation where algorithmic decisions drive system execution. Trace complement lookups, simulate LIFO memory, isolate memory boundary bugs, explore state graphs, and evaluate arithmetic AST expressions.
        </p>
      </div>

      {/* Booting Terminal Telemetry or Start Trigger */}
      {!isBooting ? (
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleStartBoot}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-mono text-sm font-bold tracking-wider shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-3 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <Zap className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
            <span>INITIALIZE REACTOR</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-black/80 border border-blue-500/40 max-w-md mx-auto font-mono text-xs text-left space-y-2 shadow-inner">
          <div className="flex items-center justify-between text-blue-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 animate-spin" />
              REACTOR BOOT SEQUENCE
            </span>
            <span>{Math.round(((bootStep + 1) / BOOT_LOGS.length) * 100)}%</span>
          </div>
          <div className="space-y-1 font-mono text-[11px]">
            {BOOT_LOGS.slice(0, bootStep + 1).map((log, i) => (
              <div
                key={`boot-${i}`}
                className={i === bootStep ? 'text-blue-300 font-bold' : 'text-slate-400'}
              >
                <span className="text-blue-500 mr-2">›</span>
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtle Notice */}
      <div className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2 pt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        <span>DEMONSTRATES PROGRAMMING CONCEPTS THROUGH CONTROLLED INTERACTION</span>
      </div>
    </motion.div>
  );
}

export default ReactorIntro;
