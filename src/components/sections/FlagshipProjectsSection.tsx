import React, { useState, useEffect, useCallback } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { ProjectSelector } from '../case-study/ProjectSelector';
import { CaseStudyView } from '../case-study/CaseStudyView';
import { CASE_STUDIES } from '../../data/caseStudies';
import type { ProjectCaseStudy } from '../../types/caseStudy';

export function FlagshipProjectsSection() {
  const [activeProjectId, setActiveProjectId] = useState<string>(CASE_STUDIES[0].id);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        document.documentElement.getAttribute('data-reduced-motion') === 'true'
      );
    }
    return false;
  });

  // Check URL hash on mount and hashchange to open specific project directly (e.g. #pyravex)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const match = CASE_STUDIES.find((p) => p.id === hash);
      if (match) {
        setActiveProjectId(match.id);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);

    // Custom event listener for external triggers (Kartik OS or Choose Your Path)
    const handleCustomTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectId: string }>;
      if (customEvent.detail?.projectId) {
        const match = CASE_STUDIES.find((p) => p.id === customEvent.detail.projectId);
        if (match) {
          setActiveProjectId(match.id);
        }
      }
    };
    window.addEventListener('open-case-study', handleCustomTrigger);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('open-case-study', handleCustomTrigger);
    };
  }, []);

  const activeProject = CASE_STUDIES.find((p) => p.id === activeProjectId) || CASE_STUDIES[0];
  const nextProject = CASE_STUDIES.find((p) => p.id === activeProject.nextProjectId) || CASE_STUDIES[0];

  const handleSelectProject = useCallback((project: ProjectCaseStudy) => {
    setActiveProjectId(project.id);
    if (window.history.pushState) {
      window.history.pushState(null, '', `#${project.id}`);
    }
  }, []);

  return (
    <section id="work" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24">
      {/* Anchor targets to preserve deep links and external navigation */}
      <div className="absolute top-0 left-0 pointer-events-none">
        <span id="pyravex" className="block -mt-24 h-24" />
        <span id="veridexa" className="block -mt-24 h-24" />
        <span id="nudgekavach" className="block -mt-24 h-24" />
        <span id="chronosat" className="block -mt-24 h-24" />
        <span id="hostelhub" className="block -mt-24 h-24" />
      </div>

      {/* Cinematic Section Heading */}
      <SectionHeading
        number="04 — FLAGSHIP SYSTEMS"
        tag="SYSTEMS I'VE BUILT"
        title="Interactive Project Case Studies."
        subtitle="Real projects. Real systems. Real experiments. Enter each architecture to inspect problem statements, data pipelines, and verified codebase telemetry."
      />

      {/* Elegant Systems Selector Bar */}
      <ProjectSelector
        projects={CASE_STUDIES}
        activeProject={activeProject}
        onSelectProject={handleSelectProject}
        reducedMotion={reducedMotion}
      />

      {/* Active Project Case Study World */}
      <CaseStudyView
        project={activeProject}
        nextProject={nextProject}
        onSelectNextProject={handleSelectProject}
        reducedMotion={reducedMotion}
      />
    </section>
  );
}

export default FlagshipProjectsSection;
