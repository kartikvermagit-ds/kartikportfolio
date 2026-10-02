import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Clock, Sparkles } from 'lucide-react';
import { playPathFeedback } from '../../utils/audioFeedback';

interface TemporalTimelineProps {
  progress: number;
  onChange: (val: number) => void;
  reducedMotion?: boolean;
}

export function TemporalTimeline({
  progress,
  onChange,
  reducedMotion = false
}: TemporalTimelineProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Automated orbital playback loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      onChange(Math.round((progress + 1.2 > 100 ? 0 : progress + 1.2) * 10) / 10);
    }, 45);

    return () => clearInterval(interval);
  }, [isPlaying, progress, onChange]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false);
    const val = Number(e.target.value);
    onChange(val);
    if (Math.abs(val - progress) > 2) {
      playPathFeedback('tick');
    }
  };

  const jumpTo = (val: number) => {
    setIsPlaying(false);
    onChange(val);
    playPathFeedback('tick');
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    playPathFeedback('select');
  };

  return (
    <div className="w-full rounded-2xl bg-[#080D1A]/95 border border-slate-800 p-4 sm:p-5 shadow-xl font-mono space-y-4">
      {/* Timeline Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-pink-400" />
          <span className="text-white font-bold text-xs tracking-wider">TEMPORAL ORBITAL SCRUBBER</span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">• MOVE THROUGH TIME</span>
        </div>

        {/* Playback Controls & Quick Presets */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause timeline playback' : 'Play timeline orbital animation'}
            className="px-3 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-pink-300" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-pink-300" />
                <span>PLAY LOOP</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => jumpTo(0)}
            title="Reset to Day 0 Pass"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Slider Track */}
      <div className="relative pt-2 pb-1 space-y-2">
        {/* Keyframe Stage Labels */}
        <div className="flex justify-between text-[11px]">
          <button
            type="button"
            onClick={() => jumpTo(0)}
            className={`text-left transition-colors cursor-pointer ${
              progress < 25 ? 'text-sky-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="block text-[10px] opacity-75">T0 (00:00h)</span>
            <span>FRAME T0 PASS</span>
          </button>

          <button
            type="button"
            onClick={() => jumpTo(50)}
            className={`text-center transition-colors cursor-pointer ${
              progress >= 25 && progress <= 75
                ? 'text-pink-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="block text-[10px] text-pink-400 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" /> T+24h
            </span>
            <span>SYNTHESIS (50%)</span>
          </button>

          <button
            type="button"
            onClick={() => jumpTo(100)}
            className={`text-right transition-colors cursor-pointer ${
              progress > 75 ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="block text-[10px] opacity-75">T1 (+48:00h)</span>
            <span>FRAME T1 REVISIT</span>
          </button>
        </div>

        {/* Range Input Slider */}
        <div className="relative flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={progress}
            onChange={handleSliderChange}
            aria-label="Temporal interpolation timeline slider"
            className="w-full h-3 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-pink-500 border border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            style={{
              background: `linear-gradient(to right, #38BDF8 0%, #A855F7 50%, #10B981 100%)`
            }}
          />
        </div>

        {/* Milestone Tick Marks */}
        <div className="relative w-full h-2 flex justify-between px-1 text-[9px] text-slate-400">
          <span>| 0h</span>
          <span className="text-slate-400">| 12h</span>
          <span className="text-pink-400 font-bold">▲ 24h (GAP FILL)</span>
          <span className="text-slate-400">| 36h</span>
          <span>| 48h</span>
        </div>
      </div>

      {/* Preset Quick-Jumps Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
        <div className="text-[11px] text-slate-400 flex items-center gap-2">
          <span>PROGRESS:</span>
          <span className="text-pink-300 font-bold">{progress.toFixed(0)}%</span>
          <span>•</span>
          <span>DELTA: +{(progress * 0.48).toFixed(1)} HOURS</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => jumpTo(0)}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-sky-300 border border-slate-700/80 transition-colors"
          >
            JUMP TO T0
          </button>
          <button
            type="button"
            onClick={() => jumpTo(50)}
            className="px-2.5 py-1 rounded bg-purple-950/80 hover:bg-purple-900/80 text-[10px] text-pink-300 border border-purple-500/40 font-bold transition-colors"
          >
            JUMP TO 50% INTERPOLATION
          </button>
          <button
            type="button"
            onClick={() => jumpTo(100)}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-emerald-300 border border-slate-700/80 transition-colors"
          >
            JUMP TO T1
          </button>
        </div>
      </div>
    </div>
  );
}

export default TemporalTimeline;
