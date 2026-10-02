import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, ArrowRight, ShieldCheck, Radio } from 'lucide-react';
import { ProjectHero } from './ProjectHero';
import { ProjectInteractiveWorld } from './ProjectInteractiveWorld';
import { ProjectArchitecture } from './ProjectArchitecture';
import { ProjectTechEcosystem } from './ProjectTechEcosystem';
import type { ProjectCaseStudy } from '../../types/caseStudy';
import { playPathFeedback } from '../../utils/audioFeedback';

interface CaseStudyViewProps {
  project: ProjectCaseStudy;
  nextProject: ProjectCaseStudy;
  onSelectNextProject: (nextProject: ProjectCaseStudy) => void;
  reducedMotion?: boolean;
}

export function CaseStudyView({
  project,
  nextProject,
  onSelectNextProject,
  reducedMotion = false
}: CaseStudyViewProps) {
  const [secretRevealed, setSecretRevealed] = useState(false);

  const getSecretMessage = () => {
    switch (project.id) {
      case 'pyravex':
        return 'THERMAL SIGNAL > ANALYSIS LAYER: NASA thermal deviation baseline verified across spectral channels.';
      case 'veridexa':
        return 'DOCUMENT TRACE > EVIDENCE CHAIN AVAILABLE: Ground truth bounding boxes linked to verification chain.';
      case 'chronosat':
        return 'TEMPORAL STATE > INTERPOLATION LAYER: Multi-band optical flow frame synthesized.';
      case 'hostelhub':
        return 'RESOURCE NODE > CONNECTED: Distributed multi-tenant residency dispatch pipeline synchronized.';
      case 'nudgekavach':
        return 'EVIDENCE TRACE > INSPECTION LAYER: Anonymized civic telemetry coordinate stream verified.';
      default:
        return 'SUBSURFACE LAYER > ACTIVE: Architectural specifications verified.';
    }
  };

  const handleRevealSecret = () => {
    setSecretRevealed(true);
    playPathFeedback('correct');
    window.dispatchEvent(
      new CustomEvent('discover-easter-egg', { detail: { id: 'ee-project-secrets' } })
    );
  };

  const handleNextClick = () => {
    playPathFeedback('select');
    onSelectNextProject(nextProject);
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id={project.id} className="relative scroll-mt-28">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          {/* 1. Cinematic Project Hero & 3D Environment */}
          <ProjectHero project={project} reducedMotion={reducedMotion} />

          {/* Subtle Discoverable Telemetry Marker (Task 13: Project Secrets) */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6 px-1">
            <button
              type="button"
              onClick={handleRevealSecret}
              title="Inspect hidden project telemetry"
              className="group inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-500 hover:text-amber-400 transition-colors cursor-pointer py-1"
            >
              <Radio className="w-3 h-3 text-slate-600 group-hover:text-amber-400 transition-colors" />
              <span>PROJECT TELEMETRY TRACE</span>
            </button>

            {secretRevealed && (
              <div className="text-[11px] font-mono text-amber-300 bg-amber-950/40 border border-amber-500/40 px-3 py-1 rounded-lg animate-in fade-in duration-200">
                &gt; {getSecretMessage()}
              </div>
            )}
          </div>

          {/* 2. Problem Statement & What Was Built */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-14">
            {/* The Problem */}
            <div className="md:col-span-6 p-6 rounded-3xl bg-[#080D16]/95 border border-slate-800/90 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-3 uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>02 — THE CORE PROBLEM</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                REAL TECHNICAL CONSTRAINT SOLVED
              </div>
            </div>

            {/* What Kartik Built */}
            <div className="md:col-span-6 p-6 rounded-3xl bg-[#080D16]/95 border border-slate-800/90 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 mb-3 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>03 — ARCHITECTURAL SOLUTION</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {project.whatIBuilt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>FUNCTIONAL REPOSITORY IMPLEMENTATION</span>
              </div>
            </div>
          </div>

          {/* 3. Interactive System Pipeline Simulator */}
          <ProjectInteractiveWorld project={project} reducedMotion={reducedMotion} />

          {/* 4. Interactive Architecture Graph */}
          <ProjectArchitecture project={project} reducedMotion={reducedMotion} />

          {/* 5. Connected Technology Ecosystem */}
          <ProjectTechEcosystem project={project} reducedMotion={reducedMotion} />

          {/* 6. Factual Technical Facts Grid */}
          <div className="p-6 rounded-3xl bg-[#080D16]/95 border border-slate-800/90 shadow-xl mb-14">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                07 — VERIFIED TECHNICAL FACTS
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                AUDIT-PROOF ATTRIBUTES
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.technicalFacts.map((fact, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#05070B] border border-slate-800/80">
                  <div className="text-[9px] font-mono text-slate-400 uppercase font-medium">
                    {fact.label}
                  </div>
                  <div className="text-xs font-mono font-bold text-white mt-1 truncate">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Next Project Transition Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#080D16]/90 border border-slate-800/90 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase mb-1">
                READY FOR THE NEXT SYSTEM?
              </div>
              <div className="text-xl sm:text-2xl font-heading font-black text-white">
                Explore {nextProject.title}
              </div>
              <div className="text-xs font-mono text-slate-400 mt-0.5">
                {nextProject.number} — {nextProject.subtitle}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextClick}
              data-cursor="pointer"
              aria-label={`Advance to next project case study: ${nextProject.title}`}
              className="px-6 py-3 rounded-full text-white font-mono text-xs font-semibold tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{
                backgroundColor: nextProject.domainTheme.accentColor,
                boxShadow: `0 0 25px ${nextProject.domainTheme.accentColor}35`
              }}
            >
              <span>NEXT SYSTEM: {nextProject.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default CaseStudyView;
