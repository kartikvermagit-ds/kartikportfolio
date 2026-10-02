import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { SystemMap } from '../system-map/SystemMap';
import { DevLabel } from '../developer/DevLabel';

export function SystemMapSection() {
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
      id="system-map"
      className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24"
    >
      {/* Developer Mode Section Debug Label */}
      <div className="mb-2">
        <DevLabel section="LIVE SYSTEM MAP" id="system-map" type="ECOSYSTEM" state="ACTIVE" />
      </div>

      {/* Standardized Section Heading */}
      <SectionHeading
        number="12 — SYSTEM TOPOLOGY"
        tag="INTERACTIVE DEVELOPER ECOSYSTEM"
        title="LIVE SYSTEM MAP: Explore the systems behind the work."
        subtitle="Projects are rarely isolated. Follow the technologies, ideas, and systems connecting them across an interconnected technical ecosystem."
      />

      {/* Playable Live System Map Experience */}
      <SystemMap reducedMotion={reducedMotion} />
    </section>
  );
}

export default SystemMapSection;
