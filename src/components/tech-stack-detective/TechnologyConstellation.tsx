import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Network,
  Filter,
  Search,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import type { ConstellationNode } from '../../types/techStackDetective';
import { CONSTELLATION_NODES } from '../../data/techStackCases';
import { playPathFeedback } from '../../utils/audioFeedback';

interface TechnologyConstellationProps {
  onSelectNode: (node: ConstellationNode) => void;
  onViewProject: (projectId: string) => void;
  reducedMotion?: boolean;
}

const CATEGORIES = [
  'ALL',
  'LANGUAGES',
  'FRONTEND',
  'BACKEND',
  'GEOSPATIAL',
  'DATA',
  'AI',
  'SYSTEMS'
];

export function TechnologyConstellation({
  onSelectNode,
  onViewProject,
  reducedMotion = false
}: TechnologyConstellationProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<'CATEGORY' | 'PROJECT'>('CATEGORY');

  const filteredNodes =
    selectedCategory === 'ALL'
      ? CONSTELLATION_NODES
      : CONSTELLATION_NODES.filter((n) => n.category === selectedCategory);

  const hoveredNode = CONSTELLATION_NODES.find((n) => n.id === hoveredNodeId);

  // Group by project if in PROJECT mode
  const projectsList = [
    { id: 'pyravex', name: 'PYRAVEX', color: '#3B82F6', subtitle: 'Satellite Thermal Intelligence' },
    { id: 'veridexa', name: 'VERIDEXA', color: '#8B5CF6', subtitle: 'Industrial Document Grounding' },
    { id: 'chronosat', name: 'CHRONOSAT', color: '#EC4899', subtitle: 'Temporal Resolution Synthesis' },
    { id: 'hostelhub', name: 'HOSTELHUB', color: '#10B981', subtitle: 'Campus Academic Resource Platform' },
    { id: 'nudgekavach', name: 'NUDGEKAVACH', color: '#F59E0B', subtitle: 'Interface Manipulation Auditing' }
  ];

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#070B14]/90 backdrop-blur-xl p-5 sm:p-8 shadow-2xl space-y-6">
      {/* Top Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
            <Network className="w-4 h-4 text-blue-400" />
            <span>TOPOLOGY MATRIX // VERIFIED ARCHITECTURAL GRAPH</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
            TECH STACK CONSTELLATION
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Hover to trace connections. Click any node for architectural specifications and project links.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 self-start md:self-auto font-mono text-xs">
          <button
            type="button"
            onClick={() => {
              playPathFeedback('tick');
              setActiveViewMode('CATEGORY');
            }}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeViewMode === 'CATEGORY'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            BY CATEGORY
          </button>
          <button
            type="button"
            onClick={() => {
              playPathFeedback('tick');
              setActiveViewMode('PROJECT');
            }}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeViewMode === 'PROJECT'
                ? 'bg-purple-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            BY PROJECT GRAPH
          </button>
        </div>
      </div>

      {/* Category Filter Pills (if in CATEGORY mode) */}
      {activeViewMode === 'CATEGORY' && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                playPathFeedback('tick');
                setSelectedCategory(cat);
              }}
              className={`min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white/15 border border-white/30 text-white font-bold'
                  : 'bg-white/[0.02] border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Main Constellation Canvas Display */}
      {activeViewMode === 'CATEGORY' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {filteredNodes.map((node) => {
            const isHovered = hoveredNodeId === node.id;

            return (
              <motion.div
                key={node.id}
                onMouseEnter={() => {
                  playPathFeedback('hover');
                  setHoveredNodeId(node.id);
                }}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => {
                  playPathFeedback('select');
                  onSelectNode(node);
                }}
                whileHover={!reducedMotion ? { y: -2 } : {}}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative overflow-hidden group ${
                  isHovered
                    ? 'border-blue-500/60 bg-blue-500/10 shadow-lg shadow-blue-500/15'
                    : 'border-white/[0.08] bg-black/40 hover:border-white/20'
                }`}
              >
                {/* Left Accent Stripe */}
                <div
                  className="absolute top-0 bottom-0 left-0 w-1"
                  style={{ backgroundColor: node.color }}
                />

                <div className="pl-2 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-semibold"
                      style={{
                        color: node.color,
                        borderColor: `${node.color}40`,
                        backgroundColor: `${node.color}15`
                      }}
                    >
                      {node.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {node.projects.length} SYSTEM{node.projects.length > 1 ? 'S' : ''}
                    </span>
                  </div>

                  <div className="text-base font-mono font-bold text-white group-hover:text-blue-200 transition-colors">
                    {node.name}
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 font-sans leading-relaxed">
                    {node.description}
                  </p>

                  {/* Connected Projects Badges */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {node.projects.map((p) => (
                      <span
                        key={p.id}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-slate-300"
                      >
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* PROJECT ↔ TECHNOLOGY GRAPH MODE (Section 17) */
        <div className="space-y-4 pt-2">
          {projectsList.map((proj) => {
            const connectedTechs = CONSTELLATION_NODES.filter((n) =>
              n.projects.some((p) => p.id === proj.id)
            );

            return (
              <div
                key={proj.id}
                className="p-5 rounded-xl border border-white/[0.08] bg-black/40 space-y-3 hover:border-white/20 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-2.5">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: proj.color }}
                    />
                    <div>
                      <h4 className="text-base font-mono font-bold text-white tracking-wide">
                        {proj.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-sans">{proj.subtitle}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onViewProject(proj.id)}
                    className="min-h-[44px] px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>CASE STUDY</span>
                    <ExternalLink className="w-3 h-3 text-blue-400" />
                  </button>
                </div>

                {/* Connected Verified Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {connectedTechs.map((tech) => (
                    <button
                      key={tech.id}
                      type="button"
                      onClick={() => onSelectNode(tech)}
                      className="min-h-[44px] px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-blue-500/40 text-xs font-mono text-slate-200 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: tech.color }}
                      />
                      <span className="font-semibold">{tech.name}</span>
                      <span className="text-[10px] text-slate-500 font-sans">
                        (
                        {tech.projects.find((p) => p.id === proj.id)?.role || tech.category}
                        )
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
