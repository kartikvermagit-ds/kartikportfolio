// Type definitions for Task 13: Easter Eggs & Developer Mode (KARTIK.DEV MODE)

export type EasterEggCategory = 'SECRET' | 'DEVELOPER' | 'SYSTEM' | 'PROJECT' | 'SPECIAL';

export interface EasterEggItem {
  id: string;
  title: string;
  category: EasterEggCategory;
  triggerDescription: string; // Factual trigger description (shown only after discovery)
  discoveryMessage: string;
  isDiscovered: boolean;
  discoveredAt?: number;
}

export interface DeveloperPreferences {
  wireframeEnabled: boolean;
  overlayMinimized: boolean;
  soundEnabled: boolean;
  showDevLabels: boolean;
}

export interface DeveloperSessionState {
  isDevMode: boolean;
  activeSectionId: string;
  wireframeEnabled: boolean;
  isTerminalOpen: boolean;
  isSourceInspectorOpen: boolean;
  isShortcutHelpOpen: boolean;
  isDeepLayerOpen: boolean;
  overlayMinimized: boolean;
  pingCount: number;
}

export interface TerminalCommandOutput {
  command: string;
  timestamp: string;
  output: string | string[];
  isError?: boolean;
}
