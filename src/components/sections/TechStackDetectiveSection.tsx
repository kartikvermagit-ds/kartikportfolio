import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { TechStackDetective } from '../tech-stack-detective/TechStackDetective';

export function TechStackDetectiveSection() {
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
      id="tech-stack-detective"
      className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24"
    >
      {/* Standardized Section Heading */}
      <SectionHeading
        number="11 — STACK TRACE"
        tag="INTERACTIVE TECHNOLOGY DETECTIVE"
        title="TECH STACK DETECTIVE: Inspect the System. Find the Stack."
        subtitle="Every engineering system is built from intentional decisions. Follow verified architectural clues, inspect telemetry data flows, and uncover the technologies behind real-world projects."
      />

      {/* Playable Tech Stack Detective Experience */}
      <TechStackDetective reducedMotion={reducedMotion} />
    </section>
  );
}

export default TechStackDetectiveSection;
