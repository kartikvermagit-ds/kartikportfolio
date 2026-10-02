import React, { useState, useRef, useCallback } from 'react';
import { Columns, ArrowLeftRight, Clock, ShieldCheck } from 'lucide-react';
import type { TemporalScenario } from '../../types/chronosatGame';
import { playPathFeedback } from '../../utils/audioFeedback';

interface BeforeAfterViewProps {
  scenario: TemporalScenario;
}

export function BeforeAfterView({ scenario }: BeforeAfterViewProps) {
  const [splitPos, setSplitPos] = useState<number>(50); // 0 to 100%
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const pct = Math.round((x / rect.width) * 100);
    setSplitPos(pct);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
    playPathFeedback('tick');
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div className="w-full rounded-2xl bg-[#060913] border border-slate-800 shadow-2xl overflow-hidden flex flex-col font-mono">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-black/60 border-b border-slate-800/90 text-xs">
        <div className="flex items-center gap-2">
          <Columns className="w-4 h-4 text-pink-400" />
          <span className="text-white font-bold">SPLIT BEFORE / AFTER REVISIT COMPARISON</span>
          <span className="text-[10px] text-pink-300 font-semibold px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/30">
            DRAGGABLE CURTAIN
          </span>
        </div>
        <div className="text-[11px] text-slate-400">
          TEMPORAL OBSERVATION GAP: <span className="text-white font-bold">48 HOURS</span>
        </div>
      </div>

      {/* Split Comparison Canvas */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[320px] max-h-[520px] overflow-hidden select-none bg-slate-950 cursor-ew-resize touch-none"
      >
        {/* Full Image T1: REVISIT PASS (Right / Underneath) */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <rect width="1000" height="600" fill="#061224" />
            {/* Landmass */}
            <path
              d="M 0,0 L 450,0 Q 480,120 410,210 T 360,340 Q 320,440 280,510 L 0,600 Z"
              fill="#0F172A"
              stroke="#334155"
              strokeWidth="1.5"
            />
            {/* River Inlets with Dispersed Sediment Plume (T1 state) */}
            <path d="M 0,180 Q 220,195 380,240 T 430,260" fill="none" stroke="#0284C7" strokeWidth="16" />
            <ellipse cx="490" cy="280" rx="120" ry="75" fill="#0284C7" opacity="0.3" filter="blur(4px)" />
            {/* T1 Cloud: Shifted East-Northeast */}
            <path
              d="M 620,80 Q 670,40 730,60 Q 780,30 830,70 Q 870,100 840,150 Q 800,190 740,180 Q 680,200 640,160 Z"
              fill="#FFFFFF"
              opacity="0.75"
              filter="blur(1px)"
            />
          </svg>
        </div>

        {/* Clipped Image T0: INITIAL PASS (Left Side) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${splitPos}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current?.clientWidth || '100%' }}>
            <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
              <rect width="1000" height="600" fill="#0B1A2E" />
              {/* Landmass */}
              <path
                d="M 0,0 L 450,0 Q 480,120 410,210 T 360,340 Q 320,440 280,510 L 0,600 Z"
                fill="#1E293B"
                stroke="#475569"
                strokeWidth="1.5"
              />
              {/* River Inlets (T0 state) */}
              <path d="M 0,180 Q 220,195 380,240 T 430,260" fill="none" stroke="#0284C7" strokeWidth="16" />
              <ellipse cx="440" cy="270" rx="75" ry="50" fill="#0284C7" opacity="0.5" filter="blur(2px)" />
              {/* T0 Cloud: Positioned West */}
              <path
                d="M 280,140 Q 330,100 390,120 Q 440,90 490,130 Q 530,160 500,210 Q 460,250 400,240 Q 340,260 300,220 Z"
                fill="#F8FAFC"
                opacity="0.8"
                filter="blur(1px)"
              />
            </svg>
          </div>
        </div>

        {/* Interactive Vertical Divider Line */}
        <div
          className="absolute inset-y-0 z-20 w-0.5 bg-gradient-to-b from-pink-400 via-white to-pink-400 shadow-[0_0_12px_#EC4899] pointer-events-none"
          style={{ left: `${splitPos}%` }}
        >
          {/* Central Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-black/90 border-2 border-pink-400 shadow-lg shadow-pink-500/30 flex items-center justify-center text-pink-300 pointer-events-auto cursor-ew-resize">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Labels Overlays */}
        <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-lg bg-sky-950/90 border border-sky-400/50 text-sky-300 text-xs font-bold backdrop-blur-md">
          <span>LEFT: FRAME T0 (DAY 0 PASS)</span>
        </div>

        <div className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-lg bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 text-xs font-bold backdrop-blur-md">
          <span>RIGHT: FRAME T1 (DAY 2 REVISIT)</span>
        </div>

        {/* Drag Hint at Bottom */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/80 border border-slate-700 text-slate-300 text-[10px] backdrop-blur-md pointer-events-none">
          DRAG DIVIDER TO REVEAL 48-HOUR OBSERVATION EVOLUTION
        </div>
      </div>

      {/* Telemetry Comparison Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-black/80 border-t border-slate-800 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[10px] text-sky-400 font-bold">FRAME T0: {scenario.frames.t0.timestamp}</div>
          <div className="text-[11px] text-slate-300">
            Cloud formation upstream at 28% swath width. Estuary sediment confined to inner shelf.
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[10px] text-emerald-400 font-bold">FRAME T1: {scenario.frames.t1.timestamp}</div>
          <div className="text-[11px] text-slate-300">
            Cloud bank translated 44% eastward and dissipated. Estuarine silt plume expanded offshore by 45%.
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeforeAfterView;
