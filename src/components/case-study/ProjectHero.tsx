import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Activity, ArrowRight, Gamepad2 } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { MagneticButton } from '../common/MagneticButton';
import { PyravexGlobeScene } from '../3d/PyravexGlobeScene';
import { VeridexaPipelineScene } from '../3d/VeridexaPipelineScene';
import { NudgeKavachAuditorScene } from '../3d/NudgeKavachAuditorScene';
import { ChronoSatInterpolationScene } from '../3d/ChronoSatInterpolationScene';
import { HostelHubCampusScene } from '../3d/HostelHubCampusScene';
import type { ProjectCaseStudy } from '../../types/caseStudy';

interface ProjectHeroProps {
  project: ProjectCaseStudy;
  reducedMotion?: boolean;
}

function render3DVisual(visualType: ProjectCaseStudy['visualType']) {
  switch (visualType) {
    case 'satellite':
      return <PyravexGlobeScene />;
    case 'pipeline':
      return <VeridexaPipelineScene />;
    case 'auditor':
      return <NudgeKavachAuditorScene />;
    case 'interpolation':
      return <ChronoSatInterpolationScene />;
    case 'campus':
      return <HostelHubCampusScene />;
    default:
      return null;
  }
}

export function ProjectHero({ project, reducedMotion = false }: ProjectHeroProps) {
  const accent = project.domainTheme.accentColor;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-14">
      {/* Left Column: Dossier Hero */}
      <motion.div
        key={`hero-text-${project.id}`}
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1"
      >
        {/* System Identifier Header */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-4xl sm:text-5xl font-heading font-black tracking-tight"
            style={{ color: accent }}
          >
            {project.number}
          </span>
          <div className="h-6 w-[1px] bg-slate-700" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              CASE STUDY DOSSIER
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
              {project.subtitle}
            </span>
          </div>
        </div>

        {/* Project Name */}
        <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white mb-3">
          {project.title}
        </h2>

        {/* Real Tagline & Positioning */}
        <p
          className="text-sm sm:text-base font-mono font-semibold mb-4 leading-relaxed"
          style={{ color: project.domainTheme.secondaryColor }}
        >
          "{project.heroTagline}"
        </p>

        {/* Positioning Summary */}
        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
          {project.positioning}
        </p>

        {/* Key Systems Quick Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
          {project.keySystems.map((system, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-2 rounded-lg bg-[#080D16]/90 border border-slate-800/80 text-[11px] font-mono text-slate-300"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
              <span className="truncate">{system}</span>
            </div>
          ))}
        </div>

        {/* Real Action Links */}
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton href={project.githubUrl} target="_blank" rel="noopener noreferrer" cursorType="github">
            <div className="px-6 py-2.5 rounded-full bg-[#080D16] hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 font-mono text-xs font-semibold flex items-center gap-2 transition-all">
              <GithubIcon className="w-4 h-4 text-white" />
              <span>INSPECT SOURCE</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </div>
          </MagneticButton>

          {project.liveUrl && (
            <MagneticButton href={project.liveUrl} target="_blank" rel="noopener noreferrer" cursorType="project">
              <div
                className="px-6 py-2.5 rounded-full text-white font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-lg hover:scale-105"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 0 20px ${accent}40`
                }}
              >
                <span>LAUNCH LIVE DEMO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </MagneticButton>
          )}

          {project.backendUrl && (
            <MagneticButton href={project.backendUrl} target="_blank" rel="noopener noreferrer" cursorType="project">
              <div className="px-4 py-2.5 rounded-full bg-[#080D16]/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 font-mono text-xs flex items-center gap-1.5 transition-all">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>API TELEMETRY</span>
              </div>
            </MagneticButton>
          )}

          {project.id === 'pyravex' && (
            <MagneticButton href="#pyravex-mission" cursorType="project">
              <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-200 border border-amber-400/40 font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-md">
                <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
                <span>PLAY MISSION GAME</span>
              </div>
            </MagneticButton>
          )}
        </div>
      </motion.div>

      {/* Right Column: Large Interactive 3D Miniature Simulation */}
      <motion.div
        key={`hero-visual-${project.id}`}
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-6 h-[400px] sm:h-[480px] rounded-3xl bg-[#080D16] border border-slate-800/90 shadow-2xl relative overflow-hidden order-1 lg:order-2"
        style={{
          boxShadow: `0 0 30px ${accent}15, 0 15px 35px rgba(0,0,0,0.6)`
        }}
      >
        {/* Corner Cyber Brackets */}
        <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-slate-600/70 z-10 pointer-events-none" />
        <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-slate-600/70 z-10 pointer-events-none" />
        <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-slate-600/70 z-10 pointer-events-none" />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-slate-600/70 z-10 pointer-events-none" />

        {/* Existing 3D Scene */}
        {render3DVisual(project.visualType)}

        {/* Watermark Index */}
        <div className="absolute bottom-3 right-4 pointer-events-none font-heading font-black text-6xl sm:text-7xl text-white/[0.04] select-none">
          {project.number}
        </div>
      </motion.div>
    </div>
  );
}

export default ProjectHero;
