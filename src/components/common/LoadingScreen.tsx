import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            onLoaded();
          }, 200);
          return 100;
        }
        // Rapid increment for sleek snappy initialization
        const step = Math.floor(Math.random() * 25) + 12;
        return Math.min(prev + step, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#05070B] flex flex-col items-center justify-center pointer-events-auto"
        >
          <div className="flex flex-col items-center max-w-xs w-full px-6">
            {/* Animated Symbol */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1.5px] shadow-2xl shadow-blue-500/30 mb-6">
              <div className="w-full h-full bg-[#05070B] rounded-[10px] flex items-center justify-center">
                <span className="font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-lg">
                  KV
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-sm font-heading font-bold tracking-widest text-slate-200 uppercase mb-1">
              Kartik Verma
            </h2>
            <div className="text-[11px] font-mono text-blue-400 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>INITIALIZING SYSTEM... {progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-1 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 text-[10px] font-mono text-slate-500">
              3D Canvas • Telemetry • Spatial Audio Offline
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default LoadingScreen;
