import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Server, Database, Globe, Shield, Terminal, ArrowRight } from 'lucide-react';
import type { ProjectCaseStudy, ArchitectureNode } from '../../types/caseStudy';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ProjectArchitectureProps {
  project: ProjectCaseStudy;
  reducedMotion?: boolean;
}

const CATEGORY_ICONS = {
  CLIENT: Globe,
  API: Server,
  PIPELINE: Cpu,
  DATA: Terminal,
  STORAGE: Database,
  SECURITY: Shield
};

export function ProjectArchitecture({ project, reducedMotion = false }: ProjectArchitectureProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(project.architectureNodes[0]?.id || '');
  const nodes = project.architectureNodes;
  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];
  const accent = project.domainTheme.accentColor;

  const handleSelectNode = (id: string) => {
    setSelectedNodeId(id);
    playPathFeedback('tick');
  };

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-[#080D16]/95 border border-slate-800/90 shadow-2xl mb-14 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
              05 — INTERACTIVE ARCHITECTURE DIAGRAM
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono font-bold" style={{ color: accent }}>
              SYSTEM TOPOLOGY
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
            Derived directly from the verified codebase repository. Hover or select any node to inspect communication pathways and data payloads.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <span>{nodes.length} VERIFIED SUBSYSTEMS</span>
        </div>
      </div>

      {/* Horizontal Flow Graph */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {nodes.map((node, idx) => {
          const Icon = CATEGORY_ICONS[node.category] || Server;
          const isSelected = node.id === activeNode.id;
          const isConnected = activeNode.connectedTo?.includes(node.id) || false;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => handleSelectNode(node.id)}
              onMouseEnter={() => playPathFeedback('hover')}
              data-cursor="pointer"
              aria-label={`Architecture subsystem: ${node.label} (${node.tech})`}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-300 relative group overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                isSelected
                  ? 'bg-[#0B1528] text-white shadow-xl'
                  : isConnected
                  ? 'bg-[#080D16] text-slate-200 border-slate-700/90'
                  : 'bg-[#05070B] text-slate-400 border-slate-800/80 hover:border-slate-700'
              }`}
              style={{
                borderColor: isSelected ? accent : isConnected ? `${accent}60` : undefined,
                boxShadow: isSelected ? `0 0 20px ${accent}25` : undefined
              }}
            >
              {/* Category & Status */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <span
                  className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: isSelected ? `${accent}25` : '#1E293B',
                    color: isSelected ? accent : '#94A3B8'
                  }}
                >
                  {node.category}
                </span>

                <Icon
                  className="w-3.5 h-3.5 transition-colors"
                  style={{ color: isSelected ? accent : '#64748B' }}
                />
              </div>

              {/* Node Title */}
              <div className="font-heading font-black text-xs sm:text-sm text-white mb-1 truncate">
                {node.label}
              </div>

              {/* Tech Stack Spec */}
              <div className="text-[10px] font-mono text-slate-400 truncate">
                {node.tech}
              </div>

              {/* Connected arrow indicator */}
              {isConnected && (
                <div className="mt-2 text-[9px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                  <ArrowRight className="w-2.5 h-2.5" />
                  <span>CONNECTED PATH</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      <div className="p-5 rounded-2xl bg-[#05070B] border border-slate-800/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono font-bold tracking-wider"
              style={{ color: accent }}
            >
              SUBSYSTEM: {activeNode.label}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs font-mono text-slate-300 font-semibold">
              {activeNode.tech}
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed">
            {activeNode.description}
          </p>
        </div>

        {activeNode.connectedTo && activeNode.connectedTo.length > 0 && (
          <div className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-[#080D16] border border-slate-800 text-[10px] font-mono text-slate-400">
            <span className="text-slate-400 block mb-0.5">DISPATCHES DATA TO:</span>
            <span className="font-bold text-slate-200">
              {activeNode.connectedTo.length} downstream component{activeNode.connectedTo.length > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectArchitecture;
