import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface KartikOSTriggerProps {
  onOpen: () => void;
  isOpen: boolean;
}

export function KartikOSTrigger({ onOpen, isOpen }: KartikOSTriggerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [shortcutText, setShortcutText] = useState('Ctrl+K');

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const isMac = navigator.userAgent.includes('Mac');
      setShortcutText(isMac ? '⌘K' : 'Ctrl+K');
    }
  }, []);

  if (isOpen) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center">
        {/* Tooltip on desktop hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="hidden sm:flex absolute bottom-full right-0 mb-2.5 px-3 py-1.5 rounded-lg bg-[#080D16]/95 border border-slate-700/80 shadow-2xl backdrop-blur-md text-xs font-mono text-slate-300 whitespace-nowrap items-center gap-2 pointer-events-none z-50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>Open Kartik OS Command Center</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-blue-300 border border-slate-700 font-semibold">
                {shortcutText}
              </kbd>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <button
          type="button"
          onClick={onOpen}
          aria-label="Open Kartik OS Developer Command Center"
          data-cursor="pointer"
          className="group min-h-[44px] min-w-[44px] flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-slate-800 bg-[#080D16]/90 hover:bg-[#0B1220] hover:border-blue-500/50 text-slate-300 hover:text-white shadow-xl shadow-black/50 backdrop-blur-md transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          {/* Glowing Terminal Indicator Icon */}
          <div className="relative flex items-center justify-center w-5 h-5">
            <span className="absolute inset-0 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 blur-xs transition-colors" />
            <Terminal className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300 transition-colors relative z-10" />
          </div>

          {/* Monospace Badge Label */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="font-bold tracking-wider text-slate-200 group-hover:text-blue-200 transition-colors">
              SYSTEM
            </span>
            <span className="text-slate-600 hidden xs:inline">|</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-semibold text-blue-400 group-hover:border-blue-500/40 transition-colors">
              {shortcutText}
            </span>
          </div>

          {/* Pulse Signal */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
          </span>
        </button>
      </div>
    </div>
  );
}
export default KartikOSTrigger;
