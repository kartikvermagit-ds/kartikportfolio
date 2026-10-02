import React, { useState } from 'react';
import {
  Terminal,
  Grid,
  HelpCircle,
  Code,
  Radio,
  ChevronDown,
  ChevronUp,
  X,
  Compass
} from 'lucide-react';

interface DevOverlayProps {
  isDevMode: boolean;
  activeSectionId: string;
  wireframeEnabled: boolean;
  onToggleWireframe: () => void;
  onOpenTerminal: () => void;
  onOpenSourceInspector: () => void;
  onOpenShortcuts: () => void;
  onCloseDevMode: () => void;
  discoveredEggsCount: number;
  totalEggsCount: number;
  totalExplorationDiscovered: number;
  totalExplorationItems: number;
  onProbePing: () => { message: string; isComplete: boolean };
}

export const DevOverlay: React.FC<DevOverlayProps> = ({
  isDevMode,
  activeSectionId,
  wireframeEnabled,
  onToggleWireframe,
  onOpenTerminal,
  onOpenSourceInspector,
  onOpenShortcuts,
  onCloseDevMode,
  discoveredEggsCount,
  totalEggsCount,
  totalExplorationDiscovered,
  totalExplorationItems,
  onProbePing
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [pingStatus, setPingStatus] = useState<string | null>(null);

  if (!isDevMode) return null;

  const handlePingClick = () => {
    const result = onProbePing();
    setPingStatus(result.message);
    setTimeout(() => {
      setPingStatus(null);
    }, 2800);
  };

  return (
    <aside
      className="fixed top-20 right-4 sm:right-6 z-40 max-w-[280px] w-full font-mono text-xs transition-all duration-200 select-none"
      role="region"
      aria-label="Developer Mode HUD Overlay"
    >
      <div className="bg-slate-950/95 border border-blue-500/40 rounded-xl shadow-2xl shadow-black/80 backdrop-blur-md overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-blue-950/40 border-b border-blue-900/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold tracking-wider text-slate-100 uppercase">
              KARTIK.DEV
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-semibold">
              ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsMinimized((prev) => !prev)}
              aria-label={isMinimized ? 'Expand Developer HUD' : 'Minimize Developer HUD'}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800/60 transition-colors"
            >
              {isMinimized ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={onCloseDevMode}
              aria-label="Close Developer Mode"
              className="p-1 text-slate-400 hover:text-red-300 rounded hover:bg-slate-800/60 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Minimized view */}
        {isMinimized ? (
          <div className="px-3 py-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>#{activeSectionId}</span>
            <span className="text-blue-400 font-medium">EGGS: {discoveredEggsCount}/{totalEggsCount}</span>
          </div>
        ) : (
          /* Expanded Body */
          <div className="p-3 space-y-3">
            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[11px]">
              <div>
                <span className="text-slate-500 text-[10px] block">SECTION</span>
                <span className="text-blue-300 font-semibold truncate block">
                  #{activeSectionId}
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">DISCOVERIES</span>
                <span className="text-slate-200 font-semibold block">
                  {totalExplorationDiscovered} / {totalExplorationItems}
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">SECRETS</span>
                <span className="text-amber-300 font-semibold block">
                  {discoveredEggsCount} / {totalEggsCount} FOUND
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">WIREFRAME</span>
                <span className={wireframeEnabled ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                  {wireframeEnabled ? 'ON' : 'OFF'}
                </span>
              </div>
            </div>

            {/* Ping diagnostic readout */}
            {pingStatus && (
              <div className="p-2 rounded bg-blue-900/30 border border-blue-600/40 text-[10px] text-blue-300 animate-in fade-in duration-150">
                &gt; {pingStatus}
              </div>
            )}

            {/* Quick Action Tools */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                type="button"
                onClick={onToggleWireframe}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-colors min-h-[36px] ${
                  wireframeEnabled
                    ? 'bg-blue-600/20 text-blue-200 border-blue-500/50'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Grid className="w-3.5 h-3.5 text-blue-400" />
                <span>WIREFRAME</span>
              </button>

              <button
                type="button"
                onClick={onOpenTerminal}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 transition-colors min-h-[36px]"
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>CLI [T]</span>
              </button>

              <button
                type="button"
                onClick={onOpenSourceInspector}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 transition-colors min-h-[36px]"
              >
                <Code className="w-3.5 h-3.5 text-purple-400" />
                <span>SOURCE</span>
              </button>

              <button
                type="button"
                onClick={handlePingClick}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 transition-colors min-h-[36px]"
              >
                <Radio className="w-3.5 h-3.5 text-amber-400" />
                <span>PING PROBE</span>
              </button>
            </div>

            {/* Bottom helper info */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px] text-slate-500">
              <button
                type="button"
                onClick={onOpenShortcuts}
                className="flex items-center gap-1 text-slate-400 hover:text-blue-300 transition-colors py-1"
              >
                <HelpCircle className="w-3 h-3" />
                <span>KEYBINDINGS [?]</span>
              </button>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-exploration-panel'))}
                className="flex items-center gap-1 text-slate-400 hover:text-blue-300 transition-colors py-1"
              >
                <Compass className="w-3 h-3" />
                <span>EXPLORE</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
