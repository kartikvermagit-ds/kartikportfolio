import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { AlgorithmEscapeGame } from '../algorithm/AlgorithmEscapeGame';

export function AlgorithmEscapeSection() {
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
      id="algorithm-escape"
      className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24"
    >
      {/* Standardized Section Heading */}
      <SectionHeading
        number="08 — ALGORITHMIC PUZZLE"
        tag="INTERACTIVE DSA ESCAPE"
        title="ALGORITHM ESCAPE: Break Free."
        subtitle="A tactical problem-solving simulation inside KARTIK.OS. Traverse three computer science challenges — array complement hashing, stack LIFO bracket validation, and graph network traversal — to unlock terminal continuity."
      />

      {/* Playable Escape Puzzle Experience */}
      <AlgorithmEscapeGame reducedMotion={reducedMotion} />
    </section>
  );
}

export default AlgorithmEscapeSection;
