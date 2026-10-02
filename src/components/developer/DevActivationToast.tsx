import React from 'react';
import { Terminal, X } from 'lucide-react';

interface DevActivationToastProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export const DevActivationToast: React.FC<DevActivationToastProps> = ({
  isVisible,
  onDismiss
}) => {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 left-4 sm:left-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto"
    >
      <div className="p-3.5 bg-[#05070B]/95 border border-blue-500/50 rounded-xl shadow-2xl shadow-black/80 backdrop-blur-md font-mono text-[11px]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-900/40 text-blue-400 font-bold">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>INITIALIZING DEV MODE</span>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss activation note"
            className="text-slate-500 hover:text-slate-300 p-0.5 rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-1 text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-400">SYSTEM ACCESS</span>
            <span className="text-emerald-400 font-semibold">OK</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">PORTFOLIO CORE</span>
            <span className="text-emerald-400 font-semibold">OK</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">PROJECT GRAPH</span>
            <span className="text-emerald-400 font-semibold">OK</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">INTERACTION LAYER</span>
            <span className="text-emerald-400 font-semibold">OK</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">EASTER EGGS</span>
            <span className="text-amber-400 font-semibold">FOUND</span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-800 text-blue-300 font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>&gt; DEVELOPER MODE ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
