import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { CodeReactor } from '../code-reactor/CodeReactor';
import { DevLabel } from '../developer/DevLabel';

export function CodeReactorSection() {
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
      id="code-reactor"
      className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24"
    >
      {/* Developer Mode Section Debug Label */}
      <div className="mb-2">
        <DevLabel section="CODE REACTOR" id="code-reactor" type="LAB" state="ACTIVE" />
      </div>

      {/* Standardized Section Heading */}
      <SectionHeading
        number="09 — CODE REACTOR"
        tag="INTERACTIVE CODING WORKSTATION"
        title="CODE REACTOR: Debug. Reason. Execute."
        subtitle="Small problems. Real reasoning. One decision at a time. Step through five essential software engineering challenges — from associative array hashing and LIFO scope validation to loop boundary debugging, directed graph traversal, and AST expression precedence."
      />

      {/* Playable Code Reactor Experience */}
      <CodeReactor reducedMotion={reducedMotion} />
    </section>
  );
}

export default CodeReactorSection;
