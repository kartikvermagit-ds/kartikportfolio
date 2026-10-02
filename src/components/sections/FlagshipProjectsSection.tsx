import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Activity, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { SectionHeading } from '../common/SectionHeading';
import { FLAGSHIP_PROJECTS } from '../../data/projects';
import { PyravexGlobeScene } from '../3d/PyravexGlobeScene';
import { VeridexaPipelineScene } from '../3d/VeridexaPipelineScene';
import { NudgeKavachAuditorScene } from '../3d/NudgeKavachAuditorScene';
import { ChronoSatInterpolationScene } from '../3d/ChronoSatInterpolationScene';
import { HostelHubCampusScene } from '../3d/HostelHubCampusScene';
import { MagneticButton } from '../common/MagneticButton';
import type { Project } from '../../types';

function renderProject3DVisual(visualType: Project['visualType']) {
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

export function FlagshipProjectsSection() {
  return (
    <section id="work" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24">
      {/* Standardized Section Heading */}
      <SectionHeading
        number="04 — FLAGSHIP SYSTEMS"
        tag="END-TO-END ARCHITECTURES"
        title="Featured Engineering."
        subtitle="Five systems built to solve specific technical constraints in satellite intelligence, automated audit trails, frame interpolation, and student resource sharing."
      />

      <div className="space-y-28 sm:space-y-36">
        {FLAGSHIP_PROJECTS.map((project) => (
          <div
            key={project.id}
            id={project.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px] pt-4"
          >
            {/* Left Column: Standardized Project Dossier */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1"
            >
              {/* Project Index & Category */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl sm:text-4xl font-heading font-black text-blue-500/80">
                  {project.number}
                </span>
                <div className="h-4 w-[1px] bg-slate-700" />
                <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  {project.subtitle}
                </span>
              </div>

              {/* Title & One-Line Positioning */}
              <h3 className="text-3xl sm:text-4xl font-heading font-black text-white mb-2 tracking-tight">
                {project.title}
              </h3>
              <p className="text-blue-400 font-mono text-xs sm:text-sm mb-4 leading-relaxed">
                "{project.positioning}"
              </p>

              {/* Problem Statement */}
              <div className="p-3.5 rounded-xl bg-[#080D16] border border-slate-800/90 mb-4">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-1 flex items-center gap-1.5 text-amber-400/90">
                  <AlertCircle className="w-3 h-3" />
                  <span>The Problem:</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* What I Built */}
              <div className="mb-4">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-1 text-blue-400">
                  What I Built:
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {project.whatIBuilt}
                </p>
              </div>

              {/* Key Systems List */}
              <div className="space-y-1.5 mb-5">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                  Key Systems:
                </div>
                {project.keySystems.map((system, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                    <span>{system}</span>
                  </div>
                ))}
              </div>

              {/* Verified Technical Facts (Audit-proof replacement for fake metrics) */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#05070B] border border-slate-800/80 mb-5">
                {project.technicalFacts.map((fact, fIdx) => (
                  <div key={fIdx} className="text-left">
                    <div className="text-[9px] font-mono text-slate-400 uppercase font-medium">{fact.label}</div>
                    <div className="text-[11px] font-mono font-bold text-slate-200 mt-0.5 truncate">{fact.value}</div>
                  </div>
                ))}
              </div>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#080D16] text-slate-300 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton href={project.githubUrl} target="_blank" rel="noopener noreferrer" cursorType="github">
                  <div className="px-5 py-2.5 rounded-full bg-[#080D16] hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 font-mono text-xs font-semibold flex items-center gap-2 transition-all">
                    <GithubIcon className="w-4 h-4 text-blue-400" />
                    <span>View Repository</span>
                  </div>
                </MagneticButton>

                {project.liveUrl && (
                  <MagneticButton href={project.liveUrl} target="_blank" rel="noopener noreferrer" cursorType="project">
                    <div className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/25 border border-blue-400/40">
                      <span>Launch App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </MagneticButton>
                )}

                {project.backendUrl && (
                  <MagneticButton href={project.backendUrl} target="_blank" rel="noopener noreferrer" cursorType="project">
                    <div className="px-4 py-2.5 rounded-full bg-[#080D16]/60 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-800 font-mono text-xs flex items-center gap-1.5 transition-all">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      <span>API Endpoint</span>
                    </div>
                  </MagneticButton>
                )}
              </div>
            </motion.div>

            {/* Right Column: 3D Miniature Environment Simulation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 h-[420px] sm:h-[480px] lg:h-[530px] rounded-3xl bg-[#080D16] border border-slate-800/90 shadow-2xl relative overflow-hidden order-1 lg:order-2"
            >
              {renderProject3DVisual(project.visualType)}

              {/* Watermark Index */}
              <div className="absolute bottom-4 right-4 pointer-events-none font-heading font-black text-6xl sm:text-7xl text-white/[0.03] select-none">
                {project.number}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default FlagshipProjectsSection;
