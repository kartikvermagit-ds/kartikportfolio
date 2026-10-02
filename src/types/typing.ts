export type TypingModeType = 'TIME' | 'WORDS';
export type TimeOption = 15 | 30 | 60;
export type WordsOption = 10 | 25 | 50;

export type TypingCategory =
  | 'GENERAL'
  | 'CODE'
  | 'ALGORITHMS'
  | 'AI'
  | 'DATA'
  | 'SYSTEMS'
  | 'PROJECTS';

export interface TypingPassage {
  id: string;
  category: TypingCategory;
  text: string;
  title?: string;
  projectKey?: 'pyravex' | 'veridexa' | 'chronosat' | 'hostelhub' | 'nudgekavach';
  projectTargetId?: string;
}

export type CharacterState = 'untouched' | 'current' | 'correct' | 'incorrect';

export type GameStatus = 'IDLE' | 'READY' | 'RUNNING' | 'PAUSED' | 'COMPLETE';

export interface TypingMetrics {
  wpm: number;
  netWpm: number;
  grossWpm: number;
  accuracy: number;
  totalTyped: number;
  correctChars: number;
  incorrectChars: number;
  errorCount: number;
  elapsedSeconds: number;
  consistency: number;
  wpmHistory: number[]; // WPM sample per second
}

export interface TypingSessionResult extends TypingMetrics {
  id: string;
  timestamp: number;
  mode: TypingModeType;
  modeValue: number; // e.g. 30s or 25 words
  category: TypingCategory;
  passageId: string;
  projectKey?: string;
}

export interface PersonalBest {
  wpm: number;
  accuracy: number;
  timestamp: number;
  mode: string;
}
