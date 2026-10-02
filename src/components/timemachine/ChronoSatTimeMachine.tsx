import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Sparkles,
  Columns,
  RotateCcw,
  ExternalLink,
  Target,
  Box,
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { CHRONOSAT_SCENARIO } from '../../data/chronosatScenario';
import type { TimeMachineMode } from '../../types/chronosatGame';
import { TimeMachineIntro } from './TimeMachineIntro';
import { SatelliteFrameViewer } from './SatelliteFrameViewer';
import { TemporalTimeline } from './TemporalTimeline';
import { BeforeAfterView } from './BeforeAfterView';
import { FrameInspector } from './FrameInspector';
import { TemporalLearningNodes } from './TemporalLearningNodes';
import { ReconstructionChallengeModal } from './ReconstructionChallengeModal';
import { ChronoSatInterpolationScene } from '../3d/ChronoSatInterpolationScene';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ChronoSatTimeMachineProps {
  reducedMotion?: boolean;
}

export function ChronoSatTimeMachine({ reducedMotion = false }: ChronoSatTimeMachineProps) {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(50); // Start at 50% intermediate synthesis
  const [mode, setMode] = useState<TimeMachineMode>('TIMELINE');
  const [show3DPreview, setShow3DPreview] = useState<boolean>(false);
  const [showChallenge, setShowChallenge] = useState<boolean>(false);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(false);

  const handleModeChange = (newMode: TimeMachineMode) => {
    setMode(newMode);
    playPathFeedback('select');
  };

  const handleReset = () => {
    setProgress(0);
    setMode('TIMELINE');
    setShow3DPreview(false);
    playPathFeedback('tick');
  };

  return (
    <div className="w-full space-y-8 text-left">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <TimeMachineIntro
            key="timemachine-intro"
            onStart={() => setHasStarted(true)}
            reducedMotion={reducedMotion}
          />
        ) : (
          <motion.div
            key="timemachine-console"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Top Tactical Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#080D1A]/95 border border-slate-800 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-300 flex items-center justify-center">
                  <Clock className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-wide">
                      CHRONOSAT — TEMPORAL TIME MACHINE
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/30 text-pink-300">
                      SIMULATION
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    SATELLITE IMAGE FRAME INTERPOLATION • BAH 2026
                  </div>
                </div>
              </div>

              {/* Mode Switchers and Actions */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => handleModeChange('TIMELINE')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                      mode === 'TIMELINE'
                        ? 'bg-pink-600 text-white font-bold shadow-md shadow-pink-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>TIMELINE SCRUBBER</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleModeChange('BEFORE_AFTER')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                      mode === 'BEFORE_AFTER'
                        ? 'bg-pink-600 text-white font-bold shadow-md shadow-pink-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span>BEFORE / AFTER</span>
                  </button>
                </div>

                {/* 3D Model Toggle */}
                <button
                  type="button"
                  onClick={() => setShow3DPreview(!show3DPreview)}
                  className={`px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                    show3DPreview
                      ? 'bg-purple-600/30 text-purple-200 border-purple-400/50'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-purple-400" />
                  <span className="hidden sm:inline">3D INTERPOLATION CORE</span>
                  <span className="sm:hidden">3D</span>
                </button>

                {/* Challenge Button */}
                <button
                  type="button"
                  onClick={() => setShowChallenge(true)}
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-pink-500/20 hover:from-amber-500/30 hover:to-pink-500/30 text-amber-200 border border-amber-400/40 font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">RECONSTRUCT CHALLENGE</span>
                  <span className="sm:hidden">CHALLENGE</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset Simulation"
                  className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Optional 3D Interpolation Scene Projection */}
            <AnimatePresence>
              {show3DPreview && (
                <motion.div
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-2xl border border-purple-500/40 bg-black/80 shadow-2xl relative"
                >
                  <div className="p-3 bg-purple-950/40 border-b border-purple-500/30 flex items-center justify-between text-xs font-mono text-purple-300">
                    <span className="flex items-center gap-2">
                      <Box className="w-3.5 h-3.5 text-purple-400" />
                      3D MULTI-FRAME ORBITAL PROJECTION (T0 → SYNTHESIZED → T1)
                    </span>
                    <button
                      type="button"
                      onClick={() => setShow3DPreview(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      CLOSE 3D [X]
                    </button>
                  </div>
                  <div className="h-[360px] w-full">
                    <ChronoSatInterpolationScene />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Visual Display (Timeline GIS or Split View) */}
            {mode === 'TIMELINE' ? (
              <div className="space-y-4">
                <SatelliteFrameViewer
                  progress={progress}
                  scenario={CHRONOSAT_SCENARIO}
                  reducedMotion={reducedMotion}
                />
                <TemporalTimeline
                  progress={progress}
                  onChange={setProgress}
                  reducedMotion={reducedMotion}
                />
              </div>
            ) : (
              <BeforeAfterView scenario={CHRONOSAT_SCENARIO} />
            )}

            {/* Two-Column Telemetry & Interactive Concepts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <FrameInspector progress={progress} scenario={CHRONOSAT_SCENARIO} />
              <TemporalLearningNodes reducedMotion={reducedMotion} />
            </div>

            {/* Educational Explanation & Grounded Project Capabilities */}
            <div className="p-6 rounded-2xl bg-[#070B16] border border-slate-800 space-y-4 font-mono">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-pink-400 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>THE ENGINEERING BEHIND CHRONOSAT</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  DEVELOPED FOR BHARATIYA ANTARIKSH HACKATHON 2026
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-300 font-sans leading-relaxed">
                <p className="font-semibold text-white">
                  "Satellite observations can leave temporal gaps. ChronoSat explores methods for enhancing temporal resolution by generating information between observations."
                </p>
                <p className="text-xs text-slate-400">
                  Built as a challenge response for Bharatiya Antariksh Hackathon 2026, the system combines multi-band Gunnar Farneback optical flow estimation with deep learning frame synthesis. Instead of waiting 24 to 72 hours for the next physical satellite orbit, emergency responders can interpolate plausible intermediate observation states to track flood line advance, coastal silt dispersion, and cloud systems.
                </p>
              </div>

              {/* Capability Tags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800">
                  <span className="text-pink-400 font-bold block">OPTICAL FLOW</span>
                  <span className="text-slate-400 text-[10px]">Dense pixel displacement</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800">
                  <span className="text-sky-400 font-bold block">BAND ALIGNMENT</span>
                  <span className="text-slate-400 text-[10px]">Multi-spectral coherence</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800">
                  <span className="text-purple-400 font-bold block">EDGE PRESERVATION</span>
                  <span className="text-slate-400 text-[10px]">Anti-blur loss weights</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800">
                  <span className="text-emerald-400 font-bold block">REVISIT EXPANSION</span>
                  <span className="text-slate-400 text-[10px]">Temporal resolution boost</span>
                </div>
              </div>

              {/* Action Links & Case Study Integration */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 text-xs">
                <a
                  href="#chronosat"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180 text-pink-400" />
                  <span>BACK TO CHRONOSAT CASE STUDY</span>
                </a>

                <a
                  href="https://github.com/kartikvermagit-ds/ChronoSat-BAH2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/40 transition-colors flex items-center gap-1.5 font-bold"
                >
                  <span>EXPLORE CHRONOSAT REPOSITORY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Simulation Disclaimer Footer */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800/80 flex items-start gap-3 font-mono text-[11px] text-slate-400 text-left">
              <Info className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold">PORTFOLIO SIMULATION DISCLAIMER: </span>
                This interactive experience is an illustrative conceptual visualization created to explain the principles of temporal satellite frame interpolation. While based on the algorithmic pipeline developed for the Bharatiya Antariksh Hackathon 2026, the rendered coastal terrain, cloud fields, and synthesized frames are client-side simulated demonstration assets.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Challenge Modal */}
      <ReconstructionChallengeModal
        isOpen={showChallenge}
        onClose={() => setShowChallenge(false)}
        onComplete={() => {
          setShowChallenge(false);
          setChallengeCompleted(true);
          setProgress(50);
          playPathFeedback('select');
        }}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}

export default ChronoSatTimeMachine;
