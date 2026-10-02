import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useKartikOS } from '../../hooks/useKartikOS';
import { KartikOSTrigger } from './KartikOSTrigger';
import { CommandPalette } from './CommandPalette';
import type { GitHubRepo } from '../../types';

interface KartikOSProps {
  repos?: GitHubRepo[];
}

export function KartikOS({ repos = [] }: KartikOSProps) {
  const {
    isOpen,
    openOS,
    closeOS,
    searchQuery,
    setSearchQuery,
    selectedIndex,
    setSelectedIndex,
    filteredCommands,
    feedback,
    telemetry,
    reducedMotion
  } = useKartikOS({ repos });

  return (
    <>
      {/* Bottom-right Floating System Trigger */}
      <KartikOSTrigger onOpen={openOS} isOpen={isOpen} />

      {/* Cinematic Modal Command Palette */}
      <AnimatePresence>
        {isOpen && (
          <CommandPalette
            isOpen={isOpen}
            onClose={closeOS}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedIndex={selectedIndex}
            onSelectIndex={setSelectedIndex}
            filteredCommands={filteredCommands}
            feedback={feedback}
            telemetry={telemetry}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default KartikOS;
