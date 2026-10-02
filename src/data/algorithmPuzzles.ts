// Deterministic puzzle configurations for Task 7: Algorithm Escape
import type {
  ArrayPuzzleConfig,
  StackPuzzleConfig,
  GraphPuzzleConfig
} from '../types/algorithmEscape';

export const ARRAY_PUZZLE_DATA: ArrayPuzzleConfig = {
  id: 'array',
  title: 'PUZZLE 01 — ARRAY LOGIC (TWO SUM)',
  category: 'ARRAYS & HASHING',
  target: 9,
  array: [
    { index: 0, value: 2 },
    { index: 1, value: 7 },
    { index: 2, value: 4 },
    { index: 3, value: 3 },
    { index: 4, value: 8 }
  ],
  correctIndices: [0, 1], // 2 + 7 = 9
  conceptTitle: 'HASHING / COMPLEMENT LOOKUP',
  conceptDescription:
    'Instead of checking every pair with nested iteration, a lookup map remembers visited numbers. For each number x, it checks if complement (TARGET - x) already exists.',
  timeComplexities: {
    bruteForce: 'O(n²) Two-pointer or nested scan',
    optimal: 'O(n) Single-pass hash map lookup'
  },
  hints: [
    'Observe the target value: 9. Look for two elements that sum exactly to this target.',
    'For the first selected element (e.g. 2), compute complement: 9 - 2 = 7.'
  ]
};

export const STACK_PUZZLE_DATA: StackPuzzleConfig = {
  id: 'stack',
  title: 'PUZZLE 02 — STACK INTEGRITY (VALID PARENTHESES)',
  category: 'STACK & STRINGS (LIFO)',
  bracketStream: ['[', '(', '{', '}', ')', ']'],
  matchingPairs: {
    ')': '(',
    '}': '{',
    ']': '['
  },
  conceptTitle: 'DATA STRUCTURE: STACK (LIFO)',
  conceptDescription:
    'Last-In, First-Out (LIFO) order ensures the most recently opened bracket is validated and closed first before outer scopes can close.',
  hints: [
    'Push opening brackets ([{) into the stack. When you hit a closing bracket, pop the top element to verify a match.',
    'The inner-most bracket "{" at the top of the stack must be closed by "}" before "(" or "[" can resolve.'
  ]
};

export const GRAPH_PUZZLE_DATA: GraphPuzzleConfig = {
  id: 'graph',
  title: 'PUZZLE 03 — GRAPH TRAVERSAL (PATH FINDER)',
  category: 'GRAPHS & NETWORKS',
  startNode: 'A',
  exitNode: 'F',
  nodes: [
    { id: 'A', label: 'START (A)', x: 80, y: 110 },
    { id: 'B', label: 'NODE B', x: 260, y: 80 },
    { id: 'C', label: 'NODE C', x: 120, y: 270 },
    { id: 'D', label: 'NODE D', x: 440, y: 80 },
    { id: 'E', label: 'NODE E', x: 300, y: 250 },
    { id: 'F', label: 'EXIT (F)', x: 480, y: 250 }
  ],
  edges: [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'B', to: 'E' },
    { from: 'C', to: 'E' },
    { from: 'D', to: 'F' },
    { from: 'E', to: 'F' }
  ],
  conceptTitle: 'GRAPH TRAVERSAL (BFS & DFS)',
  conceptDescription:
    'Graphs model relationships between connected nodes. Traversal algorithms explore adjacency lists to systematically establish paths from a source to a destination.',
  hints: [
    'Inspect valid outgoing edges from START (A). You can step to B or C.',
    'From Node E or Node D, there is a direct edge to EXIT (F). Complete the path without skipping intermediate connections.'
  ]
};
