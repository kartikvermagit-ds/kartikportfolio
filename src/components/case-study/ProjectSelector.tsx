import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Sparkles, Terminal } from 'lucide-react';
import type { ProjectCaseStudy } from '../../types/caseStudy';
import { playPathFeedback } from '../../utils/audioFeedback';

interface ProjectSelectorProps {
  projects: ProjectCaseStudy[];
  activeProject: ProjectCaseStudy;
  onSelectProject: (project: ProjectCaseStudy) => void;
  reducedMotion?: boolean;
}

export function ProjectSelector({
  projects,
  activeProject,
  onSelectProject,
  reducedMotion = false
}: ProjectSelectorProps) {
  const handleSelect = (project: ProjectCaseStudy) => {
    if (project.id === activeProject.id) return;
    playPathFeedback('select');
    onSelectProject(project);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % projects.length;
      handleSelect(projects[nextIndex]);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + projects.length) % projects.length;
      handleSelect(projects[prevIndex]);
    }
  };

  return (
    <div className="w-full mb-10 select-none">
      {/* Selector Header Bar */}
      <div className="flex items-center justify-between mb-3 px-1 text-[10px] font-mono tracking-wider text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-semibold text-slate-300 uppercase">SYSTEM SELECTOR</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">5 ACTIVE ARCHITECTURES</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: activeProject.domainTheme.accentColor }}
          />
          <span className="text-slate-300 font-semibold uppercase">
            {activeProject.domainTheme.systemLabel}
          </span>
        </div>
      </div>

      {/* Selector Track */}
      <div
        role="tablist"
        aria-label="Flagship Engineering Project Systems"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 p-1.5 rounded-2xl bg-[#080D16]/90 border border-slate-800/90 backdrop-blur-md shadow-xl"
      >
        {projects.map((proj, idx) => {
          const isActive = proj.id === activeProject.id;
          const accent = proj.domainTheme.accentColor;

          return (
            <button
              key={proj.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelect(proj)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onMouseEnter={() => playPathFeedback('hover')}
              data-cursor="pointer"
              className={`relative px-3.5 py-3 rounded-xl transition-all duration-300 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 overflow-hidden group ${
                isActive
                  ? 'bg-[#0B1528] text-white shadow-lg border'
                  : 'bg-[#05070B]/70 text-slate-400 hover:text-slate-200 border border-slate-800/70 hover:border-slate-700'
              }`}
              style={{
                borderColor: isActive ? `${accent}88` : undefined,
                boxShadow: isActive ? `0 0 20px ${accent}25, 0 8px 20px rgba(0,0,0,0.4)` : undefined
              }}
            >
              {/* Active Ambient Glow Pill */}
              {isActive && !reducedMotion && (
                <motion.div
                  layoutId="active-selector-glow"
                  className="absolute inset-0 pointer-events-none rounded-xl"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${accent}22 0%, transparent 80%)`
                  }}
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}

              {/* Number and Status Header */}
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span
                  className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded transition-colors"
                  style={{
                    backgroundColor: isActive ? `${accent}25` : '#0B1220',
                    color: isActive ? accent : '#64748B',
                    border: `1px solid ${isActive ? `${accent}40` : 'rgba(51, 65, 85, 0.4)'}`
                  }}
                >
                  {proj.number}
                </span>

                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                )}
              </div>

              {/* Project Title */}
              <div className="font-heading font-black text-sm tracking-wide text-white truncate">
                {proj.title}
              </div>

              {/* Subtitle / Domain */}
              <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                {proj.subtitle}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectSelector;
