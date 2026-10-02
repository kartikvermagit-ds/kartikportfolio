// Types for Task 7: Algorithm Escape Interactive DSA Puzzle Experience

export type EscapeStage = 'INTRO' | 'PUZZLE_ARRAY' | 'PUZZLE_STACK' | 'PUZZLE_GRAPH' | 'ESCAPE_SUCCESS';

export type PuzzleId = 'array' | 'stack' | 'graph';

export interface ArrayPuzzleConfig {
  id: 'array';
  title: string;
  category: string;
  target: number;
  array: { index: number; value: number }[];
  correctIndices: [number, number];
  conceptTitle: string;
  conceptDescription: string;
  timeComplexities: { bruteForce: string; optimal: string };
  hints: string[];
}

export interface StackPuzzleConfig {
  id: 'stack';
  title: string;
  category: string;
  bracketStream: string[];
  matchingPairs: Record<string, string>;
  conceptTitle: string;
  conceptDescription: string;
  hints: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface GraphPuzzleConfig {
  id: 'graph';
  title: string;
  category: string;
  startNode: string;
  exitNode: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  conceptTitle: string;
  conceptDescription: string;
  hints: string[];
}

export interface EscapeStats {
  puzzlesSolved: number;
  totalPuzzles: number;
  hintsUsed: number;
  attempts: number;
}
