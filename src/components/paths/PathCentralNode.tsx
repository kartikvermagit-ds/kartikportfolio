import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity } from 'lucide-react';
import type { PathItem } from '../../types/path';

interface PathCentralNodeProps {
  activePath: PathItem | null;
  hoveredPath: PathItem | null;
  onOpenOS?: () => void;
  reducedMotion?: boolean;
}

export function PathCentralNode({
  activePath,
  hoveredPath,
  onOpenOS,
  reducedMotion = false
}: PathCentralNodeProps) {
  const currentPath = hoveredPath || activePath;
  const currentAccent = currentPath ? currentPath.color : '#F97316';

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer Radar Pulse Aura */}
      {!reducedMotion && (
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.4, 0.15]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${currentAccent}25 0%, transparent 70%)`
          }}
        />
      )}

      {/* Orbit Track Rings */}
      <div className="absolute w-44 h-44 sm:w-48 sm:h-48 rounded-full border border-dashed border-slate-700/50 pointer-events-none" />

      {/* Central Interactive Node Card */}
      <motion.button
        type="button"
        onClick={onOpenOS}
        data-cursor="pointer"
        whileHover={reducedMotion ? {} : { scale: 1.04 }}
        whileTap={reducedMotion ? {} : { scale: 0.98 }}
        aria-label="KARTIK.OS Central Routing Core. Click to launch command center."
        className="relative z-10 w-40 sm:w-44 p-3.5 sm:p-4 rounded-2xl bg-[#080D16]/95 border transition-all duration-300 text-center flex flex-col items-center shadow-2xl backdrop-blur-md group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        style={{
          borderColor: currentPath ? `${currentPath.color}80` : 'rgba(51, 65, 85, 0.7)',
          boxShadow: currentPath
            ? `0 0 30px ${currentPath.color}25, 0 10px 25px rgba(0,0,0,0.5)`
            : '0 10px 25px rgba(0,0,0,0.5)'
        }}
      >
        {/* Subtle Cyber Corner Accents */}
        <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-slate-500/70 pointer-events-none" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-slate-500/70 pointer-events-none" />
        <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-slate-500/70 pointer-events-none" />
        <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-slate-500/70 pointer-events-none" />

        {/* Top Status Indicators */}
        <div className="flex items-center justify-between w-full text-[9px] font-mono tracking-wider text-slate-400 mb-2 px-1">
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-ping"
              style={{ backgroundColor: currentAccent }}
            />
            <span className="font-semibold text-slate-300">ONLINE</span>
          </div>
          <span className="text-slate-500">v2.6</span>
        </div>

        {/* Core Node Title */}
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <Terminal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="text-sm sm:text-base font-heading font-black tracking-wider text-white">
            KARTIK.OS
          </span>
        </div>

        {/* Metadata Badges */}
        <div className="text-[9px] font-mono tracking-widest text-slate-400 uppercase mb-2.5">
          SYSTEM / ROUTER
        </div>

        {/* Dynamic Mode / Target Pill */}
        <div
          className="w-full py-1 px-2 rounded-lg text-[9px] font-mono tracking-wider transition-colors duration-300 flex items-center justify-center gap-1.5 border"
          style={{
            backgroundColor: currentPath ? `${currentPath.color}15` : 'rgba(15, 23, 42, 0.6)',
            borderColor: currentPath ? `${currentPath.color}40` : 'rgba(51, 65, 85, 0.6)',
            color: currentPath ? currentPath.color : '#94A3B8'
          }}
        >
          <Activity className="w-2.5 h-2.5 animate-pulse" />
          <span className="truncate font-semibold">
            {currentPath ? `TARGET: ${currentPath.shortTitle}` : 'MODE: EXPLORE'}
          </span>
        </div>

        {/* Tiny prompt hint */}
        <span className="mt-2 text-[8px] font-mono text-slate-500 group-hover:text-slate-400 transition-colors">
          PRESS ⌘K / CLICK FOR OS
        </span>
      </motion.button>
    </div>
  );
}

export default PathCentralNode;
