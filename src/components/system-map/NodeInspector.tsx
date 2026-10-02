import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  ExternalLink,
  Network,
  Sparkles,
  Focus,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Database,
  Terminal,
  Globe
} from 'lucide-react';
import type { GraphNode, GraphEdge } from '../../types/systemGraph';
import { playPathFeedback } from '../../utils/audioFeedback';

interface NodeInspectorProps {
  node: GraphNode | null;
  directEdges: { edge: GraphEdge; connectedNode: GraphNode }[];
  twoHopNodes: GraphNode[];
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
  onSelectEdge: (edgeId: string) => void;
  onFocusNode: (nodeId: string) => void;
  isFocused: boolean;
  onTracePath: (projectId: string) => void;
  isTracingPath: boolean;
  onViewProject: (projectId: string) => void;
  onOpenSystemBuilder: (presetId?: string) => void;
  onOpenTechDetective: (techCaseId?: string) => void;
  onOpenCodeReactor: (challengeId?: string) => void;
  reducedMotion?: boolean;
}

export function NodeInspector({
  node,
  directEdges,
  twoHopNodes,
  onClose,
  onSelectNode,
  onSelectEdge,
  onFocusNode,
  isFocused,
  onTracePath,
  isTracingPath,
  onViewProject,
  onOpenSystemBuilder,
  onOpenTechDetective,
  onOpenCodeReactor,
  reducedMotion = false
}: NodeInspectorProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!node) return null;

  return (
    <div className="w-full rounded-2xl border border-white/15 bg-[#090E1A]/95 backdrop-blur-xl p-5 sm:p-6 shadow-2xl space-y-6 font-mono relative overflow-hidden">
      {/* Decorative Top Accent Stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: node.color }}
      />

      {/* Top Header Bar */}
      <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold uppercase px-2 py-0.5 rounded border"
              style={{
                color: node.color,
                borderColor: `${node.color}40`,
                backgroundColor: `${node.color}15`
              }}
            >
              {node.type} • {node.category}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {node.label}
          </h3>

          {node.sublabel && (
            <p className="text-xs text-slate-400 font-sans">{node.sublabel}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            playPathFeedback('tick');
            onClose();
          }}
          className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider">
          ARCHITECTURAL SPECIFICATION
        </div>
        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          {node.description}
        </p>
      </div>

      {/* Metadata Table (if provided) */}
      {node.metadata && Object.keys(node.metadata).length > 0 && (
        <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] space-y-1.5 text-xs">
          {Object.entries(node.metadata).map(([key, val]) => (
            <div key={key} className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-[11px] text-slate-500 uppercase">{key}:</span>
              <span className="text-white font-semibold text-right">{val}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="flex flex-wrap gap-2 pt-1">
        {/* Project Specific Actions */}
        {node.type === 'project' && node.projectId && (
          <>
            <button
              type="button"
              onClick={() => {
                playPathFeedback('select');
                onViewProject(node.projectId!);
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>VIEW PROJECT</span>
            </button>

            {node.systemBuilderPresetId && (
              <button
                type="button"
                onClick={() => {
                  playPathFeedback('select');
                  onOpenSystemBuilder(node.systemBuilderPresetId);
                }}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-500/20 cursor-pointer transition-all"
              >
                <Network className="w-3.5 h-3.5" />
                <span>BUILD THIS SYSTEM</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                playPathFeedback('select');
                onTracePath(node.projectId!);
              }}
              className="min-h-[44px] px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-purple-300 text-xs flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{isTracingPath ? 'CLEAR TRACE' : 'TRACE PATH'}</span>
            </button>
          </>
        )}

        {/* Technology Specific Actions */}
        {node.type === 'technology' && (
          <>
            <button
              type="button"
              onClick={() => {
                playPathFeedback('select');
                onOpenTechDetective(node.techDetectiveId);
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>INVESTIGATE IN DETECTIVE</span>
            </button>
          </>
        )}

        {/* Concept / Reasoning Specific Actions */}
        {node.codeReactorTopic && (
          <button
            type="button"
            onClick={() => {
              playPathFeedback('select');
              onOpenCodeReactor(node.codeReactorTopic);
            }}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-500/20 cursor-pointer transition-all"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>TEST THE LOGIC</span>
          </button>
        )}

        {/* Focus Node Toggle */}
        <button
          type="button"
          onClick={() => {
            playPathFeedback('select');
            onFocusNode(node.id);
          }}
          className={`min-h-[44px] px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 border transition-all cursor-pointer ${
            isFocused
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-slate-300'
          }`}
        >
          <Focus className="w-3.5 h-3.5" />
          <span>{isFocused ? 'EXIT FOCUS' : 'FOCUS NODE'}</span>
        </button>
      </div>

      {/* Direct Connections List (Section 8) */}
      <div className="space-y-2 pt-2 border-t border-white/[0.08]">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>DIRECT CONNECTIONS ({directEdges.length})</span>
          <span className="text-emerald-400 font-semibold">1-HOP VERIFIED</span>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {directEdges.map(({ edge, connectedNode }) => (
            <div
              key={edge.id}
              className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-blue-500/30 flex items-center justify-between gap-2 transition-all"
            >
              <button
                type="button"
                onClick={() => {
                  playPathFeedback('select');
                  onSelectNode(connectedNode.id);
                }}
                className="flex items-center gap-2 text-left cursor-pointer group"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: connectedNode.color }}
                />
                <span className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {connectedNode.label}
                </span>
                <span className="text-[10px] text-slate-500">({connectedNode.type})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playPathFeedback('tick');
                  onSelectEdge(edge.id);
                }}
                className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/25 text-blue-300 hover:bg-blue-500/20 shrink-0 cursor-pointer"
              >
                {edge.relationshipLabel}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Hop Indirect Connections (Section 8) */}
      {twoHopNodes.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-white/[0.08]">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>INDIRECT ECOSYSTEM REACH ({twoHopNodes.length})</span>
            <span className="text-purple-400 font-semibold">2-HOP CONNECTED</span>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {twoHopNodes.map((hopNode) => (
              <button
                key={hopNode.id}
                type="button"
                onClick={() => {
                  playPathFeedback('tick');
                  onSelectNode(hopNode.id);
                }}
                className="text-[11px] px-2 py-1 rounded bg-black/40 hover:bg-white/[0.08] border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: hopNode.color }}
                />
                <span>{hopNode.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
