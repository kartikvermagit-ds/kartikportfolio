import type { EasterEggItem, DeveloperPreferences } from '../types/developer';

export const DEV_MODE_STORAGE_KEY = 'kartik-dev-mode';
export const EASTER_EGGS_STORAGE_KEY = 'kartik-easter-eggs';
export const DEV_PREFERENCES_STORAGE_KEY = 'kartik-dev-preferences';
export const EASTER_EGGS_VERSION = 1;

export const DEFAULT_DEV_PREFERENCES: DeveloperPreferences = {
  wireframeEnabled: false,
  overlayMinimized: false,
  soundEnabled: true,
  showDevLabels: true
};

export const INITIAL_EASTER_EGGS: EasterEggItem[] = [
  {
    id: 'ee-kartik-sequence',
    title: 'Signal Detected',
    category: 'SECRET',
    triggerDescription: 'Typed secret sequence: K A R T I K',
    discoveryMessage: 'Curiosity is a feature.',
    isDiscovered: false
  },
  {
    id: 'ee-source-inspector',
    title: 'Source Inspector',
    category: 'DEVELOPER',
    triggerDescription: 'Clicked identity badge 5 times rapidly',
    discoveryMessage: 'Portfolio component topology & tech stack revealed.',
    isDiscovered: false
  },
  {
    id: 'ee-terminal',
    title: 'Developer Terminal',
    category: 'SYSTEM',
    triggerDescription: 'Opened interactive CLI via terminal command or key T',
    discoveryMessage: 'Interactive developer workstation online.',
    isDiscovered: false
  },
  {
    id: 'ee-system-ping',
    title: 'System Ping',
    category: 'SYSTEM',
    triggerDescription: 'Pushed ping diagnostic probe 3 times',
    discoveryMessage: 'Telemetry handshake verified: PING → PONG → OK.',
    isDiscovered: false
  },
  {
    id: 'ee-konami',
    title: 'Legacy Input',
    category: 'SECRET',
    triggerDescription: 'Directional input sequence: ↑ ↑ ↓ ↓ ← → ← →',
    discoveryMessage: 'Legacy developer instincts honored.',
    isDiscovered: false
  },
  {
    id: 'ee-project-secrets',
    title: 'Project Telemetry Trace',
    category: 'PROJECT',
    triggerDescription: 'Inspected hidden telemetry markers across flagship projects',
    discoveryMessage: 'Satellite & document evidence verification layers revealed.',
    isDiscovered: false
  },
  {
    id: 'ee-deep-layer',
    title: 'The Deep Layer',
    category: 'SPECIAL',
    triggerDescription: 'Discovered at least 3 portfolio Easter eggs',
    discoveryMessage: 'Most people scroll. You explored. Curiosity compounds.',
    isDiscovered: false
  }
];
