import React from 'react';

export type CommandCategory =
  | 'NAVIGATION'
  | 'PROJECTS'
  | 'EXPLORER'
  | 'ENGINEERING'
  | 'SYSTEM'
  | 'EASTER_EGGS';

export interface CommandItem {
  id: string;
  title: string;
  category: CommandCategory;
  description: string;
  keywords?: string[];
  shortcut?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeType?: 'default' | 'live' | 'tech' | 'amber' | 'blue' | 'emerald';
  action: () => void | Promise<void>;
}

export interface SystemTelemetry {
  coreStatus: 'ONLINE' | 'STANDBY';
  webglStatus: 'READY' | 'UNAVAILABLE';
  audioStatus: 'ACTIVE' | 'MUTED';
  githubStatus: 'CONNECTED' | 'ONLINE' | 'OFFLINE';
  reposCount: number;
  reducedMotion: boolean;
  registeredCommandsCount: number;
}
