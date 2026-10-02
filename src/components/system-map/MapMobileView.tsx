import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Code2,
  Lightbulb,
  Wrench,
  ArrowRight,
  ExternalLink,
  Network,
  Sparkles,
  GitBranch,
  Terminal,
  Cpu
} from 'lucide-react';
import type { GraphNode, GraphEdge } from '../../types/systemGraph';
import { playPathFeedback } from '../../utils/audioFeedback';

interface MapMobileViewProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNode: GraphNode | null;
  onSelectNode: (nodeId: string) => void;
  onViewProject: (projectId: string) => void;
  onOpenSystemBuilder: (presetId?: string) => void;
  onOpenTechDetective: (techCaseId?: string) => void;
  onOpenCodeReactor: (challengeId?: string) => void;
  reducedMotion?: boolean;
}

export function MapMobileView({
  nodes,
  edges,
  selectedNode,
  onSelectNode,
  onViewProject,
  onOpenSystemBuilder,
  onOpenTechDetective,
  onOpenCodeReactor,
  reducedMotion = false
}: MapMobileViewProps) {
  // Flagship projects list
  const projectNodes = nodes.filter((n) => n.type === 'project');

  // If a node is selected, find its direct connected edges
  const connectedItems = selectedNode
    ? edges
        .filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
        .map((e) => {
          const otherId = e.source === selectedNode.id ? e.target : e.source;
          const otherNode = nodes.find((n) => n.id === otherId);
          return { edge: e, node: otherNode };
        })
        .filter((item): item is { edge: GraphEdge; node: GraphNode } => Boolean(item.node))
    : [];

  return (
    <div className="w-full space-y-5 font-mono text-xs block lg:hidden">
      {/* Active Selected Node Card (if selected) */}
      {selectedNode ? (
        <div className="rounded-xl border border-white/15 bg-[#090E1A] p-4 space-y-4 shadow-xl">
          <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] pb-3">
            <div>
              <span
                className="text-[10px] uppercase font-bold px-2 py-0.5 rounded border"
                style={{
                  color: selectedNode.color,
                  borderColor: `${selectedNode.color}40`,
                  backgroundColor: `${selectedNode.color}15`
                }}
              >
                {selectedNode.type} • {selectedNode.category}
              </span>
              <h4 className="text-lg font-bold text-white mt-1">{selectedNode.label}</h4>
              {selectedNode.sublabel && (
                <p className="text-xs text-slate-400 font-sans">{selectedNode.sublabel}</p>
              )}
            </div>

            <span
              className="w-3 h-3 rounded-full mt-1 shrink-0"
              style={{ backgroundColor: selectedNode.color }}
            />
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {selectedNode.description}
          </p>

          {/* Contextual Actions */}
          <div className="flex flex-wrap gap-2 pt-1 border-t border-white/[0.06]">
            {selectedNode.type === 'project' && selectedNode.projectId && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    playPathFeedback('select');
                    onViewProject(selectedNode.projectId!);
                  }}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>VIEW PROJECT</span>
                </button>

                {selectedNode.systemBuilderPresetId && (
                  <button
                    type="button"
                    onClick={() => {
                      playPathFeedback('select');
                      onOpenSystemBuilder(selectedNode.systemBuilderPresetId);
                    }}
                    className="min-h-[44px] px-3.5 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Network className="w-3.5 h-3.5" />
                    <span>BUILD SYSTEM</span>
                  </button>
                )}
              </>
            )}

            {selectedNode.type === 'technology' && (
              <button
                type="button"
                onClick={() => {
                  playPathFeedback('select');
                  onOpenTechDetective(selectedNode.techDetectiveId);
                }}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>DETECTIVE CASE</span>
              </button>
            )}
          </div>

          {/* Connected Dependencies List */}
          <div className="space-y-2 pt-2 border-t border-white/[0.06]">
            <div className="text-[11px] text-slate-400 font-semibold uppercase flex items-center justify-between">
              <span>CONNECTED ECOSYSTEM ({connectedItems.length})</span>
              <span className="text-emerald-400">TAP TO EXPLORE</span>
            </div>

            <div className="space-y-1.5">
              {connectedItems.map(({ edge, node }) => (
                <button
                  key={edge.id}
                  type="button"
                  onClick={() => {
                    playPathFeedback('select');
                    onSelectNode(node.id);
                  }}
                  className="w-full min-h-[44px] p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-between gap-3 text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: node.color }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-white">{node.label}</div>
                      <div className="text-[10px] text-slate-500 uppercase">{node.type}</div>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300">
                    {edge.relationshipLabel}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Default Initial State: Flagship Systems Directory */
        <div className="rounded-xl border border-white/10 bg-[#090E1A] p-4 space-y-3">
          <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>SELECT A FLAGSHIP PROJECT TO EXPLORE CONNECTIONS</span>
          </div>

          <div className="space-y-2">
            {projectNodes.map((proj) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => {
                  playPathFeedback('select');
                  onSelectNode(proj.id);
                }}
                className="w-full min-h-[44px] p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-between gap-3 text-left transition-all cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-white">{proj.label}</div>
                  <div className="text-[11px] text-slate-400 font-sans">{proj.sublabel}</div>
                </div>

                <ArrowRight className="w-4 h-4 text-blue-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
