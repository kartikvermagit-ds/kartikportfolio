import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { PyravexAnomalyGame } from '../game/PyravexAnomalyGame';

export function PyravexMissionSection() {
  const [reducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        document.documentElement.getAttribute('data-reduced-motion') === 'true'
      );
    }
    return false;
  });

  return (
    <section id="pyravex-mission" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24">
      {/* Standardized Section Heading */}
      <SectionHeading
        number="05 — PLAY & EXPERIMENT"
        tag="SATELLITE INTELLIGENCE GAME"
        title="PYRAVEX: Find the Anomaly."
        subtitle="A tactical satellite intelligence simulation. Investigate 6 thermal observations across the geospatial grid, evaluate multi-day baselines, and isolate the true breakout anomaly."
      />

      {/* Playable Console Simulation */}
      <PyravexAnomalyGame reducedMotion={reducedMotion} />
    </section>
  );
}

export default PyravexMissionSection;
