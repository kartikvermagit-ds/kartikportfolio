// Types for Task 9: System Builder Interactive Architecture Experience

export type SystemCategory =
  | 'data-source'
  | 'processing'
  | 'intelligence'
  | 'storage'
  | 'api'
  | 'frontend';

export interface SystemComponent {
  id: string;
  name: string;
  category: SystemCategory;
  tagline: string;
  description: string;
  why: string;
  input: string;
  output: string;
  color: string;
  badge: string;
  usedInProjects: string[]; // Verified portfolio projects: PYRAVEX, VERIDEXA, HOSTELHUB, CHRONOSAT
}

export interface SystemPreset {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  projectTag: string;
  projectUrl: string;
  components: Record<SystemCategory, string>; // Category -> Component ID
}

export interface SystemValidationCheck {
  category: SystemCategory;
  label: string;
  passed: boolean;
  message: string;
}

export interface SystemValidationResult {
  isValid: boolean;
  statusLabel: string;
  summaryText: string;
  checks: SystemValidationCheck[];
  dataFlowNarrative: string[];
}
