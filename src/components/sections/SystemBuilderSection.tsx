import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { SystemBuilder } from '../system-builder/SystemBuilder';
import { DevLabel } from '../developer/DevLabel';

export function SystemBuilderSection() {
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
      id="system-builder"
      className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24"
    >
      {/* Developer Mode Section Debug Label */}
      <div className="mb-2">
        <DevLabel section="SYSTEM BUILDER" id="system-builder" type="LAB" state="ACTIVE" />
      </div>

      {/* Standardized Section Heading */}
      <SectionHeading
        number="10 — SYSTEM ARCHITECTURE"
        tag="INTERACTIVE ARCHITECTURE WORKBENCH"
        title="SYSTEM BUILDER: Design the System. Follow the Data."
        subtitle="Every product starts with a flow of information. Choose components across six core tiers — data ingestion, processing, intelligence, storage, APIs, and client frontends — and watch the architecture come alive."
      />

      {/* Playable System Builder Experience */}
      <SystemBuilder reducedMotion={reducedMotion} />
    </section>
  );
}

export default SystemBuilderSection;
