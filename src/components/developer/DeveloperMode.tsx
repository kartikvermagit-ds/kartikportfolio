import React from 'react';
import { useDeveloperMode } from '../../hooks/useDeveloperMode';
import { useEasterEggs } from '../../hooks/useEasterEggs';
import { DevOverlay } from './DevOverlay';
import { DevActivationToast } from './DevActivationToast';
import { DeveloperTerminal } from './DeveloperTerminal';
import { SourceInspector } from './SourceInspector';
import { DevShortcutPanel } from './DevShortcutPanel';
import { EasterEggNotification } from './EasterEggNotification';
import { DeepLayerModal } from './DeepLayerModal';

interface DeveloperModeProps {
  totalExplorationDiscovered?: number;
  totalExplorationItems?: number;
}

export const DeveloperMode: React.FC<DeveloperModeProps> = ({
  totalExplorationDiscovered = 0,
  totalExplorationItems = 19
}) => {
  const {
    isDevMode,
    preferences,
    activeSectionId,
    isTerminalOpen,
    isSourceInspectorOpen,
    isShortcutHelpOpen,
    isDeepLayerOpen,
    showActivationToast,
    toggleDevMode,
    toggleWireframe,
    setIsTerminalOpen,
    setIsSourceInspectorOpen,
    setIsShortcutHelpOpen,
    setIsDeepLayerOpen,
    closeActivationToast
  } = useDeveloperMode();

  const {
    discoveredCount,
    totalCount,
    activeNotification,
    discoverEgg,
    dismissNotification,
    probePing
  } = useEasterEggs();

  return (
    <>
      {/* Cinematic Dev Mode Activation Toast */}
      <DevActivationToast
        isVisible={showActivationToast}
        onDismiss={closeActivationToast}
      />

      {/* Developer HUD Overlay (Active when Dev Mode is On) */}
      <DevOverlay
        isDevMode={isDevMode}
        activeSectionId={activeSectionId}
        wireframeEnabled={preferences.wireframeEnabled}
        onToggleWireframe={toggleWireframe}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenSourceInspector={() => setIsSourceInspectorOpen(true)}
        onOpenShortcuts={() => setIsShortcutHelpOpen(true)}
        onCloseDevMode={toggleDevMode}
        discoveredEggsCount={discoveredCount}
        totalEggsCount={totalCount}
        totalExplorationDiscovered={totalExplorationDiscovered}
        totalExplorationItems={totalExplorationItems}
        onProbePing={probePing}
      />

      {/* Interactive Developer Terminal Simulation */}
      <DeveloperTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onEggDiscovered={discoverEgg}
      />

      {/* Source Architecture Inspector */}
      <SourceInspector
        isOpen={isSourceInspectorOpen}
        onClose={() => setIsSourceInspectorOpen(false)}
      />

      {/* Keybindings Help Panel */}
      <DevShortcutPanel
        isOpen={isShortcutHelpOpen}
        onClose={() => setIsShortcutHelpOpen(false)}
      />

      {/* Discovered Easter Egg Toast */}
      <EasterEggNotification
        egg={activeNotification}
        onDismiss={dismissNotification}
      />

      {/* Deep Layer Secret Modal */}
      <DeepLayerModal
        isOpen={isDeepLayerOpen}
        onClose={() => setIsDeepLayerOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />
    </>
  );
};
