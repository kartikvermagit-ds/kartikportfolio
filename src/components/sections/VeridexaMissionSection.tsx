import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { VeridexaVerificationGame } from '../verification/VeridexaVerificationGame';

export function VeridexaMissionSection() {
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
      id="veridexa-verification"
      className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24"
    >
      {/* Standardized Section Heading */}
      <SectionHeading
        number="06 — DOCUMENT INTELLIGENCE"
        tag="INTERACTIVE AUDIT WORKBENCH"
        title="VERIDEXA: Verify the Document."
        subtitle="A tactical document intelligence simulation. Extract technical specifications from unstructured engineering datasheets, cross-reference independent lab evidence, and flag hidden specification contradictions."
      />

      {/* Playable Verification Workspace */}
      <VeridexaVerificationGame reducedMotion={reducedMotion} />
    </section>
  );
}

export default VeridexaMissionSection;
