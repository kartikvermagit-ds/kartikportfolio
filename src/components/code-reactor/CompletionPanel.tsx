import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, ArrowRight, Terminal, Sparkles, Cpu, Layers } from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface CompletionPanelProps {
  onReplay: () => void;
  reducedMotion?: boolean;
}

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight'
];

export function CompletionPanel({ onReplay, reducedMotion = false }: CompletionPanelProps) {
  const [easterEggActive, setEasterEggActive] = useState<boolean>(false);
  const [konamiProgress, setKonamiProgress] = useState<number>(0);

  // Listen for developer sequence key inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI_SEQUENCE[konamiProgress]) {
        const nextProgress = konamiProgress + 1;
        if (nextProgress === KONAMI_SEQUENCE.length) {
          setEasterEggActive(true);
          playPathFeedback('select');
          setKonamiProgress(0);
        } else {
          setKonamiProgress(nextProgress);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  const concepts = [
    { title: 'ARRAYS & HASHING', desc: 'Complement lookup converting O(n²) scans to O(n) linear retrieval.' },
    { title: 'STACK (LIFO)', desc: 'Reversing chronological scopes for balanced syntax verification.' },
    { title: 'DEBUGGING & BOUNDARIES', desc: 'Isolating off-by-one indices to preserve buffer integrity.' },
    { title: 'GRAPH TRAVERSAL', desc: 'Evaluating neighbor adjacency to discover valid state routes.' },
    { title: 'OPERATOR PRECEDENCE', desc: 'Deterministic AST expression parsing and mathematical binding order.' }
  ];

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full rounded-2xl bg-[#070B14]/95 border border-blue-500/40 p-6 sm:p-10 shadow-2xl font-mono text-center space-y-6 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-3xl pointer-events-none" />

      {/* Cyber brackets */}
      <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-blue-500/60 pointer-events-none" />
      <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-blue-500/60 pointer-events-none" />
      <span className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-blue-500/60 pointer-events-none" />
      <span className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-blue-500/60 pointer-events-none" />

      {/* Top Status */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-bold flex items-center gap-1.5 animate-pulse">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          REACTOR COMPLETE
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
          SYSTEM UNDERSTOOD
        </span>
      </div>

      {/* Main Title */}
      <div className="space-y-2 max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          ALL REACTOR CYCLES VERIFIED
        </h2>
        <div className="text-sm font-bold text-blue-400">
          FIVE CORE PROGRAMMING CONCEPTS EXPLORED
        </div>
      </div>

      {/* Concepts Explored Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto pt-2 text-left">
        {concepts.map((c, i) => (
          <div
            key={`conc-${i}`}
            className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-1"
          >
            <div className="text-[10px] text-blue-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>{c.title}</span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Philosophy Quote */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/70 border border-slate-800 max-w-2xl mx-auto text-left space-y-2">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          PROBLEM SOLVING TAKEAWAY
        </div>
        <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed italic">
          "Problem solving is not about memorizing every solution. It is about understanding the system behind the problem."
        </p>
        <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
          Whether optimizing an API route, debugging memory boundaries, or designing real-time satellite telemetry pipelines, the same fundamental principles of structural invariants and algorithmic efficiency govern reliable software engineering.
        </p>
      </div>

      {/* Developer Mode Easter Egg Reveal */}
      <AnimatePresence>
        {easterEggActive && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/50 max-w-md mx-auto text-xs text-purple-200 space-y-1 shadow-lg shadow-purple-950/50"
          >
            <div className="font-bold flex items-center justify-center gap-2 text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>DEVELOPER MODE DETECTED</span>
            </div>
            <div className="text-[11px] text-slate-300 font-mono">
              SYSTEM ACCESS: GRANTED • ROOT OPERATIONAL PRIVILEGES UNLOCKED
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons to Existing Portfolio Routes */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
        <button
          type="button"
          onClick={() => {
            playPathFeedback('select');
            onReplay();
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>REPLAY REACTOR</span>
        </button>

        <a
          href="#work"
          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <span>EXPLORE MY PROJECTS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

        <a
          href="#stack"
          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <span>EXPLORE MY STACK</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

export default CompletionPanel;
