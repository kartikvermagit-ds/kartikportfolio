import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, X, ChevronRight, RotateCcw } from 'lucide-react';
import { EXPLORATION_PATHS } from '../../data/paths';
import type { PathId, RouteStep } from '../../types/path';

interface RouteIndicatorProps {
  selectedPathId: PathId | null;
  onClearPath: () => void;
  onNavigateTo: (targetId: string) => void;
}

export function RouteIndicator({
  selectedPathId,
  onClearPath,
  onNavigateTo
}: RouteIndicatorProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!selectedPathId || isDismissed) return null;

  const currentPath = EXPLORATION_PATHS.find((p) => p.id === selectedPathId);
  if (!currentPath) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-30 select-none">
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="rounded-2xl bg-[#080D16]/92 border border-slate-700/70 backdrop-blur-md shadow-2xl p-2.5 sm:p-3 text-white max-w-xs transition-all duration-300"
        style={{
          boxShadow: `0 0 20px ${currentPath.color}20, 0 10px 25px rgba(0,0,0,0.5)`
        }}
      >
        {/* Compact Bar */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            data-cursor="pointer"
            aria-label="Toggle Route details"
            className="flex items-center gap-2 focus:outline-none text-left"
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center border"
              style={{
                backgroundColor: `${currentPath.color}20`,
                borderColor: `${currentPath.color}50`
              }}
            >
              <Compass className="w-3.5 h-3.5" style={{ color: currentPath.color }} />
            </div>

            <div className="text-[10px] font-mono leading-tight">
              <div className="text-slate-400 text-[9px] uppercase tracking-wider">YOUR ROUTE</div>
              <div className="font-bold flex items-center gap-1" style={{ color: currentPath.color }}>
                {currentPath.shortTitle}
                <span className="text-slate-500 font-normal">({currentPath.number})</span>
              </div>
            </div>
          </button>

          <div className="flex items-center gap-1 ml-auto">
            {/* Jump to Pathways */}
            <button
              type="button"
              onClick={() => onNavigateTo('pathways')}
              data-cursor="pointer"
              title="Change route in pathways section"
              aria-label="Change route"
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
            </button>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              data-cursor="pointer"
              title="Dismiss route indicator"
              aria-label="Dismiss route indicator"
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Collapsible Steps Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pt-2.5 mt-2 border-t border-slate-800"
            >
              <div className="text-[9px] font-mono text-slate-400 mb-2 uppercase tracking-wider">
                WAYPOINTS
              </div>
              <div className="space-y-1.5">
                {currentPath.steps.map((step, idx) => (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => onNavigateTo(step.targetId)}
                    data-cursor="pointer"
                    className="w-full flex items-center justify-between px-2 py-1 rounded bg-[#05070B] hover:bg-slate-800/80 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-white transition-all text-left group"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-[9px] text-slate-500 group-hover:text-blue-400">
                        0{idx + 1}
                      </span>
                      <span>{step.label}</span>
                    </span>
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-800 flex justify-between items-center text-[9px] font-mono">
                <button
                  type="button"
                  onClick={onClearPath}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  RESET PATH
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTo(currentPath.primaryTargetId)}
                  className="font-semibold transition-colors"
                  style={{ color: currentPath.color }}
                >
                  JUMP TO START →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default RouteIndicator;
