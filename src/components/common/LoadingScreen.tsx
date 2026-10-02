import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoaded: () => void;
}

type LoadingStage = 'INIT' | 'ASSETS' | 'READY';

export function LoadingScreen({ onLoaded }: LoadingScreenProps) {
  const [stage, setStage] = useState<LoadingStage>('INIT');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Stage 1: Experience initialized
    const stage1Timer = setTimeout(() => {
      setStage('ASSETS');
    }, 380);

    // Stage 2: Assets / Scenes ready check
    const finishLoading = () => {
      setStage('READY');
      setTimeout(() => {
        setIsDone(true);
        onLoaded();
      }, 350);
    };

    let stage2Timer: ReturnType<typeof setTimeout>;
    if (document.readyState === 'complete') {
      stage2Timer = setTimeout(finishLoading, 750);
    } else {
      const handleLoad = () => {
        stage2Timer = setTimeout(finishLoading, 200);
      };
      window.addEventListener('load', handleLoad, { once: true });
      // Fallback safeguard so loading never blocks beyond 1000ms
      stage2Timer = setTimeout(finishLoading, 1000);
    }

    return () => {
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
    };
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#05070B] flex flex-col items-center justify-center pointer-events-auto select-none"
        >
          <div className="flex flex-col items-center max-w-sm w-full px-6">
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <span className="font-mono text-xs tracking-widest text-slate-400 uppercase font-semibold">
                KARTIK.OS
              </span>
            </div>

            {/* Central Animated Glyph */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1.5px] shadow-2xl shadow-blue-500/20 mb-6">
              <div className="w-full h-full bg-[#080D16] rounded-[14px] flex items-center justify-center">
                <span className="font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-purple-400 text-xl tracking-tight">
                  KV
                </span>
              </div>
            </div>

            {/* Dynamic Stage Text (No fake percentage) */}
            <div className="h-6 flex items-center justify-center mb-4">
              <AnimatePresence mode="wait">
                {stage === 'INIT' && (
                  <motion.div
                    key="init"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs font-mono tracking-wider text-slate-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    INITIALIZING EXPERIENCE
                  </motion.div>
                )}
                {stage === 'ASSETS' && (
                  <motion.div
                    key="assets"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs font-mono tracking-wider text-cyan-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    LOADING SCENES & PROJECTS
                  </motion.div>
                )}
                {stage === 'READY' && (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs font-mono tracking-wider text-emerald-400 font-bold flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    KARTIK.OS READY
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Indeterminate Scanning Cyber Bar */}
            <div className="w-full bg-slate-900/90 border border-slate-800 rounded-full h-1.5 overflow-hidden relative shadow-inner">
              {stage !== 'READY' ? (
                <motion.div
                  className="absolute top-0 bottom-0 w-2/5 bg-gradient-to-r from-blue-600 via-sky-400 to-purple-600 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                  animate={{
                    left: ['-40%', '100%']
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.1,
                    ease: 'easeInOut'
                  }}
                />
              ) : (
                <motion.div
                  className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                  initial={{ width: '40%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.25 }}
                />
              )}
            </div>

            {/* Cyber ASCII indicator preview */}
            <div className="mt-4 font-mono text-[10px] text-slate-500 tracking-widest">
              {stage === 'INIT' && '████░░░░░░░░░░░░'}
              {stage === 'ASSETS' && '████████████░░░░'}
              {stage === 'READY' && '████████████████'}
            </div>

            <div className="mt-3 text-[10px] font-mono text-slate-600 text-center">
              AI • Data Science • Full-Stack Systems
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
