import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { ChronoSatTimeMachine } from '../timemachine/ChronoSatTimeMachine';

export function ChronoSatMissionSection() {
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
    <section
      id="chronosat-timemachine"
      className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24"
    >
      {/* Standardized Section Heading */}
      <SectionHeading
        number="07 — TEMPORAL SATELLITE INTELLIGENCE"
        tag="INTERACTIVE TIME MACHINE"
        title="CHRONOSAT: Temporal Time Machine."
        subtitle="A satellite-image temporal interpolation simulation developed for Bharatiya Antariksh Hackathon 2026. Scrub across a 48-hour orbital revisit blindspot to discover how multi-band optical flow synthesizes intermediate observation frames."
      />

      {/* Playable Time Machine Experience */}
      <ChronoSatTimeMachine reducedMotion={reducedMotion} />
    </section>
  );
}

export default ChronoSatMissionSection;
