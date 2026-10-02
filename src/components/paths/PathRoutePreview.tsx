import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import type { PathItem, RouteStep } from '../../types/path';

interface PathRoutePreviewProps {
  path: PathItem;
  onNavigateToStep: (step: RouteStep) => void;
  onInitializeRoute: (path: PathItem) => void;
  isRouting: boolean;
  reducedMotion?: boolean;
}

export function PathRoutePreview({
  path,
  onNavigateToStep,
  onInitializeRoute,
  isRouting,
  reducedMotion = false
}: PathRoutePreviewProps) {
  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className="w-full max-w-4xl mx-auto mt-6 p-4 sm:p-5 rounded-2xl bg-[#080D16]/95 border backdrop-blur-md shadow-2xl relative overflow-hidden"
      style={{
        borderColor: `${path.color}60`,
        boxShadow: `0 0 35px ${path.color}15, 0 15px 30px rgba(0,0,0,0.6)`
      }}
    >
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-2.5 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: path.color }}
          />
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
            ROUTE PREVIEW
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs font-mono font-bold" style={{ color: path.color }}>
            {path.number} — {path.title}
          </span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => onInitializeRoute(path)}
          disabled={isRouting}
          data-cursor="pointer"
          className="px-4 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider text-white transition-all flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{
            backgroundColor: path.color,
            boxShadow: `0 0 15px ${path.color}40`
          }}
        >
          {isRouting ? (
            <>
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>ROUTING...</span>
            </>
          ) : (
            <>
              <span>INITIALIZE ROUTE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Sequential Route Concept Steps */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {path.steps.map((step, idx) => {
          const isLast = idx === path.steps.length - 1;

          return (
            <React.Fragment key={step.label}>
              <button
                type="button"
                onClick={() => onNavigateToStep(step)}
                data-cursor="pointer"
                className="group flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#05070B] border border-slate-800 hover:border-slate-600 transition-all text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
              >
                <span className="text-[9px] font-mono font-bold text-slate-500 group-hover:text-slate-300">
                  0{idx + 1}
                </span>
                <div>
                  <div className="text-[11px] font-mono font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-[9px] text-slate-400 truncate max-w-[130px]">
                      {step.description}
                    </div>
                  )}
                </div>
              </button>

              {!isLast && (
                <span className="text-slate-600 font-mono text-xs flex-shrink-0 select-none">
                  →
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
}

export default PathRoutePreview;
