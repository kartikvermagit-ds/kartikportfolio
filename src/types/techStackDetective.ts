// Types for Task 10: Tech Stack Detective (Stack Trace) Interactive Experience

export type DetectiveState =
  | 'INTRO'
  | 'INVESTIGATING'
  | 'ANSWERING'
  | 'VERIFIED'
  | 'FAILED'
  | 'REVEALED'
  | 'COMPLETE';

export type QuestionType =
  | 'IDENTIFY_TECH'     // TYPE A — Identify Technology
  | 'IDENTIFY_ROLE'     // TYPE B — Identify Role
  | 'MATCH_PROJECT'     // TYPE C — Match Technology to Project
  | 'ARCHITECTURE_CLUE' // TYPE D — Architecture Flow Clue
  | 'STACK_DETECTION';  // TYPE E — Full Stack Detection

export type CaseLevel =
  | 'LEVEL 01 — FOUNDATION'
  | 'LEVEL 02 — STACK DETECTION'
  | 'LEVEL 03 — ARCHITECTURE CLUES';

export interface EvidenceCard {
  id: string;
  badge: string;
  label: string;
  value: string;
  detail: string;
}

export interface CaseOption {
  id: string;
  text: string;
  subtext?: string;
  codeTag?: string;
}

export interface StackCase {
  id: string;
  number: string; // e.g. "01 / 06"
  caseId: string; // e.g. "CASE 01"
  level: CaseLevel;
  projectId: string; // e.g. "pyravex"
  projectName: string; // e.g. "PYRAVEX"
  projectSubtitle: string;
  title: string;
  question: string;
  type: QuestionType;
  typeLabel: string;
  evidence: EvidenceCard[];
  architectureFlow?: string[]; // sequential flow for architecture clues
  options: CaseOption[];
  correctAnswerId: string;
  hints: string[]; // Up to two educational hints
  technology: string;
  role: string;
  whyItFits: string;
  systemBuilderPresetId?: string; // Links to Task 9 System Builder preset
  category: 'BACKEND' | 'FRONTEND' | 'AI' | 'GEOSPATIAL' | 'DATA' | 'SYSTEMS';
}

export interface ConstellationNode {
  id: string;
  name: string;
  category: string;
  color: string;
  projects: { id: string; name: string; role: string }[];
  description: string;
}

export interface DetectiveSessionProgress {
  currentCaseIndex: number;
  completedCaseIds: string[];
  discoveredTechs: string[];
  hintsUsed: number;
  attemptsPerCase: Record<string, number>;
  hasRevealedAnswer: Record<string, boolean>;
  isComplete: boolean;
  hasStarted: boolean;
}
