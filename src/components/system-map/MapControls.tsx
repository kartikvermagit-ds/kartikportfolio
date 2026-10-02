import React, { useRef, useEffect } from 'react';
import {
  Search,
  X,
  Filter,
  RotateCcw,
  Focus,
  Eye,
  GitCommit,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import type { GraphFilterType, GraphNode } from '../../types/systemGraph';
import { playPathFeedback } from '../../utils/audioFeedback';

interface MapControlsProps {
  filter: GraphFilterType;
  onFilterChange: (newFilter: GraphFilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  isFocused: boolean;
  onToggleFocus: () => void;
  hasSelectedNode: boolean;
  selectedNode: GraphNode | null;
  onTracePath: (projectId: string) => void;
  isTracingPath: boolean;
  onReset: () => void;
  onOpenLegend: () => void;
  matchingCount: number;
  totalCount: number;
}

const FILTERS: { id: GraphFilterType; label: string }[] = [
  { id: 'ALL', label: 'ALL NODES' },
  { id: 'PROJECTS', label: 'PROJECTS' },
  { id: 'TECH', label: 'TECHNOLOGIES' },
  { id: 'CONCEPTS', label: 'CONCEPTS' },
  { id: 'TOOLS', label: 'TOOLS' }
];

export function MapControls({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onClearSearch,
  isFocused,
  onToggleFocus,
  hasSelectedNode,
  selectedNode,
  onTracePath,
  isTracingPath,
  onReset,
  onOpenLegend,
  matchingCount,
  totalCount
}: MapControlsProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: '/' focuses search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 font-mono">
      {/* Top Row: Search and Action Buttons */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-blue-400" />
          </div>

          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="SEARCH SYSTEM... (PRESS '/' TO FOCUS)"
            aria-label="Search system graph nodes"
            className="w-full min-h-[44px] pl-10 pr-9 py-2 rounded-xl bg-black/50 border border-white/10 hover:border-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder:text-slate-500 text-xs tracking-wider transition-all"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                playPathFeedback('tick');
                onClearSearch();
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Focus Toggle */}
          {hasSelectedNode && (
            <button
              type="button"
              onClick={() => {
                playPathFeedback('select');
                onToggleFocus();
              }}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                isFocused
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300'
              }`}
            >
              <Focus className="w-3.5 h-3.5" />
              <span>{isFocused ? 'EXIT FOCUS' : 'FOCUS NODE'}</span>
            </button>
          )}

          {/* Trace Path (Project only) */}
          {selectedNode?.type === 'project' && selectedNode.projectId && (
            <button
              type="button"
              onClick={() => {
                playPathFeedback('select');
                onTracePath(selectedNode.projectId!);
              }}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                isTracingPath
                  ? 'bg-purple-500/25 border border-purple-500/50 text-purple-200 font-bold shadow-md shadow-purple-500/20'
                  : 'bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{isTracingPath ? 'CLEAR PATH' : 'TRACE PATH'}</span>
            </button>
          )}

          {/* Reset Map View */}
          <button
            type="button"
            onClick={() => {
              playPathFeedback('tick');
              onReset();
            }}
            className="min-h-[44px] px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="Reset focus, filter, and camera position"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET MAP</span>
          </button>

          {/* How To Read This Map Button */}
          <button
            type="button"
            onClick={() => {
              playPathFeedback('tick');
              onOpenLegend();
            }}
            className="min-h-[44px] px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span>GUIDE</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {FILTERS.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  playPathFeedback('tick');
                  onFilterChange(f.id);
                }}
                className={`min-h-[44px] px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 border border-blue-400/50 text-white font-bold shadow-md shadow-blue-500/20'
                    : 'bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Live Filter/Search Match Count */}
        <div className="text-[11px] text-slate-500 font-mono">
          DISPLAYING <span className="text-white font-semibold">{matchingCount}</span> / {totalCount} NODES
        </div>
      </div>
    </div>
  );
}
