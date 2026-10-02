import React from 'react';
import type { SystemTelemetry } from '../../types/command';

interface SystemStatusProps {
  telemetry: SystemTelemetry;
}

export function SystemStatus({ telemetry }: SystemStatusProps) {
  return (
    <div className="px-4 py-2.5 bg-[#05070B] border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-y-2 text-[10px] font-mono text-slate-400 select-none">
      {/* Real-time Subsystem Status Badges */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-slate-500">CORE:</span>
          <span className="text-slate-200">{telemetry.coreStatus}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              telemetry.webglStatus === 'READY' ? 'bg-sky-400' : 'bg-amber-400'
            }`}
          />
          <span className="text-slate-500">3D ENGINE:</span>
          <span className="text-slate-200">{telemetry.webglStatus}</span>
        </div>

        <div className="flex items-center gap-1.5 hidden sm:flex">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              telemetry.audioStatus === 'ACTIVE' ? 'bg-orange-400' : 'bg-slate-600'
            }`}
          />
          <span className="text-slate-500">AUDIO:</span>
          <span className="text-slate-200">{telemetry.audioStatus}</span>
        </div>

        <div className="flex items-center gap-1.5 hidden md:flex">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="text-slate-500">GITHUB:</span>
          <span className="text-slate-200">
            {telemetry.githubStatus} ({telemetry.reposCount} REPOS)
          </span>
        </div>
      </div>

      {/* Navigation Keyboard Legend */}
      <div className="flex items-center gap-2 text-slate-500 ml-auto">
        <span className="hidden sm:inline">
          <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] text-slate-400">
            ↑↓
          </kbd>{' '}
          Navigate
        </span>
        <span className="hidden sm:inline">•</span>
        <span>
          <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] text-slate-400">
            ↵
          </kbd>{' '}
          Execute
        </span>
        <span>•</span>
        <span>
          <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] text-slate-400">
            ESC
          </kbd>{' '}
          Exit
        </span>
      </div>
    </div>
  );
}
export default SystemStatus;
