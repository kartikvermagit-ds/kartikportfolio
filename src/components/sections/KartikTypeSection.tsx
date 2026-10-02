import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { DevLabel } from '../developer/DevLabel';
import { KartikType } from '../typing/KartikType';

export function KartikTypeSection() {
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
      id="kartik-type"
      className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24"
    >
      {/* Developer Mode Section Debug Label */}
      <div className="mb-2">
        <DevLabel section="KARTIK.TYPE LAB" id="kartik-type" type="LAB" state="ACTIVE" />
      </div>

      {/* Standardized Section Heading */}
      <SectionHeading
        number="08 — TYPING LAB"
        tag="KEYBOARD LABORATORY"
        title="KARTIK.TYPE: Speed & Precision."
        subtitle="Type fast. Think clearly. Build precisely. An interactive developer typing laboratory evaluating net words-per-minute, keystroke accuracy, and performance consistency across real engineering passages."
      />

      {/* Main Interactive Typing Laboratory Experience */}
      <KartikType reducedMotion={reducedMotion} />
    </section>
  );
}

export default KartikTypeSection;
