import React from 'react';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';
import { SYSTEM_PRESETS } from '../../data/systemBuilderData';
import type { SystemPreset } from '../../types/systemBuilder';
import { playPathFeedback } from '../../utils/audioFeedback';

interface PresetPickerProps {
  activePresetId: string | null;
  onSelectPreset: (preset: SystemPreset) => void;
}

export function PresetPicker({ activePresetId, onSelectPreset }: PresetPickerProps) {
  return (
    <div className="w-full rounded-2xl bg-[#080D1A]/95 border border-slate-800 p-4 sm:p-5 shadow-xl font-mono space-y-3 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-white font-bold tracking-wider">LOAD PRESET ARCHITECTURES</span>
        </div>
        <span className="text-[10px] text-slate-400">GROUNDED IN REAL REPOSITORIES</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {SYSTEM_PRESETS.map((preset) => {
          const isActive = activePresetId === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                onSelectPreset(preset);
                playPathFeedback('select');
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-purple-950/40 border-purple-400 shadow-md shadow-purple-900/30'
                  : 'bg-black/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-400">{preset.projectTag}</span>
                  {isActive && <span className="text-[9px] text-emerald-400 font-bold">LOADED</span>}
                </div>
                <div className="text-xs font-bold text-white line-clamp-1">{preset.title}</div>
                <p className="text-[10px] text-slate-300 font-sans line-clamp-2 leading-relaxed">
                  {preset.subtitle}
                </p>
              </div>

              <div className="pt-2 text-[10px] text-purple-300 flex items-center gap-1 font-bold">
                <span>LOAD ARCHITECTURE</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PresetPicker;
