import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, CheckCircle2, Sparkles, Terminal } from 'lucide-react';
import type { ProjectCaseStudy, TechEcosystemItem } from '../../types/caseStudy';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ProjectTechEcosystemProps {
  project: ProjectCaseStudy;
  reducedMotion?: boolean;
}

export function ProjectTechEcosystem({ project, reducedMotion = false }: ProjectTechEcosystemProps) {
  const [hoveredTech, setHoveredTech] = useState<TechEcosystemItem | null>(null);
  const items = project.techEcosystem;
  const accent = project.domainTheme.accentColor;

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-[#080D16]/95 border border-slate-800/90 shadow-2xl mb-14 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
              06 — CONNECTED TECHNOLOGY ECOSYSTEM
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono font-bold" style={{ color: accent }}>
              TECHNICAL DEPENDENCY MATRIX
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
            Hover or tap any technology to inspect its specific architectural responsibility in this project.
          </p>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          ZERO ARBITRARY METRIC BARS • 100% EVIDENCE-BACKED
        </div>
      </div>

      {/* Tech Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 mb-5">
        {items.map((tech) => {
          const isHovered = hoveredTech?.name === tech.name;

          return (
            <div
              key={tech.name}
              onMouseEnter={() => {
                setHoveredTech(tech);
                playPathFeedback('hover');
              }}
              onMouseLeave={() => setHoveredTech(null)}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-default ${
                isHovered
                  ? 'bg-[#0B1528] text-white border-blue-400/80 shadow-md'
                  : 'bg-[#05070B] text-slate-300 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-heading font-black text-xs text-white truncate">
                  {tech.name}
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase">
                  {tech.category}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans line-clamp-2">
                {tech.role}
              </p>
            </div>
          );
        })}
      </div>

      {/* Dynamic Hover Detail Strip */}
      <div className="p-3.5 rounded-xl bg-[#05070B] border border-slate-800 text-[11px] font-mono flex items-center justify-between">
        {hoveredTech ? (
          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-bold">{hoveredTech.name}</span>
            <span className="text-slate-600">→</span>
            <span className="text-slate-300">{hoveredTech.role}</span>
          </div>
        ) : (
          <div className="text-slate-500">
            Hover over any technical module above to inspect its real-world implementation context.
          </div>
        )}

        <span className="text-[9px] text-slate-500 hidden sm:inline uppercase">
          SYSTEM MATRIX
        </span>
      </div>
    </div>
  );
}

export default ProjectTechEcosystem;
