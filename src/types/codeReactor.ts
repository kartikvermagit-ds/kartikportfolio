// Types for Task 8: Code Reactor Interactive Coding + Debugging Experience

export type ReactorState =
  | 'IDLE'
  | 'INITIALIZING'
  | 'READY'
  | 'PLAYING'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'ERROR'
  | 'COMPLETE';

export type ChallengeType =
  | 'ARRAY_SIGNAL'
  | 'STACK_SIMULATE'
  | 'DEBUG_LOGIC'
  | 'GRAPH_PATH'
  | 'OUTPUT_PREDICTION';

export interface CodeLine {
  lineNum: string;
  code: string;
  isHighlighted?: boolean;
  hasError?: boolean;
}

export interface ChallengeOption {
  id: string;
  label: string;
  subLabel?: string;
}

export interface CodeReactorChallenge {
  id: string;
  number: string;
  title: string;
  category: string;
  concept: string;
  difficulty: 'INTRO' | 'CORE' | 'APPLIED';
  prompt: string;
  codeSnippet: CodeLine[];
  language: string;
  type: ChallengeType;
  // Specific challenge payloads
  arrayValues?: number[];
  targetSum?: number;
  bracketStream?: string[];
  options?: ChallengeOption[];
  graphNodes?: { id: string; label: string; x: number; y: number }[];
  graphEdges?: { from: string; to: string }[];
  startNode?: string;
  exitNode?: string;
  correctAnswer: any; // Checked dynamically per type
  hint1: string;
  hint2: string;
  explanation: string;
  complexity: string;
  projectConnection: string;
}

export interface ReactorProgress {
  completedChallengeIds: string[];
  activeChallengeIndex: number;
  hintsUsedCount: number;
  attemptsCount: number;
}
