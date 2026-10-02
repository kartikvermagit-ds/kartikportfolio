import type { TypingPassage } from '../types/typing';

export const TYPING_PASSAGES: TypingPassage[] = [
  // ==========================================================================
  // 1. GENERAL DEVELOPER PASSAGES
  // ==========================================================================
  {
    id: 'gen-1',
    category: 'GENERAL',
    text: 'Great software starts with clear thinking and careful execution.',
    title: 'Software Philosophy'
  },
  {
    id: 'gen-2',
    category: 'GENERAL',
    text: 'Building reliable applications requires discipline, continuous testing, and empathy for the end user.',
    title: 'Engineering Mindset'
  },
  {
    id: 'gen-3',
    category: 'GENERAL',
    text: 'Simplicity is prerequisite for reliability. Solve the fundamental problem before adding abstraction layers.',
    title: 'Simplicity Principle'
  },

  // ==========================================================================
  // 2. CODE & REFACTORING
  // ==========================================================================
  {
    id: 'code-1',
    category: 'CODE',
    text: 'Clean code is easier to understand, test, refactor, and maintain across growing engineering teams.',
    title: 'Clean Architecture'
  },
  {
    id: 'code-2',
    category: 'CODE',
    text: 'const response = await fetch("/api/telemetry"); const data = await response.json();',
    title: 'Async Fetch Snippet'
  },
  {
    id: 'code-3',
    category: 'CODE',
    text: 'for (let i = 0; i < items.length; i++) { if (items[i].isValid) return items[i]; }',
    title: 'Iteration Logic'
  },
  {
    id: 'code-4',
    category: 'CODE',
    text: 'export function processBatch<T>(queue: T[]): Promise<void> { return Promise.all(queue.map(worker)); }',
    title: 'TypeScript Generics'
  },

  // ==========================================================================
  // 3. ALGORITHMS & DATA STRUCTURES
  // ==========================================================================
  {
    id: 'algo-1',
    category: 'ALGORITHMS',
    text: 'Choose the right data structure before optimizing the concrete implementation.',
    title: 'Data Structure Choice'
  },
  {
    id: 'algo-2',
    category: 'ALGORITHMS',
    text: 'Use a hash map when constant average lookup time can reduce a quadratic search down to linear complexity.',
    title: 'Hash Map Optimization'
  },
  {
    id: 'algo-3',
    category: 'ALGORITHMS',
    text: 'Breadth-first search traverses level by level with a queue, while depth-first search explores branch paths with a stack.',
    title: 'Graph Traversals'
  },
  {
    id: 'algo-4',
    category: 'ALGORITHMS',
    text: 'Dynamic programming breaks complex optimization problems into overlapping subproblems with memoized state.',
    title: 'Dynamic Programming'
  },

  // ==========================================================================
  // 4. AI & INTELLIGENCE
  // ==========================================================================
  {
    id: 'ai-1',
    category: 'AI',
    text: 'Intelligent systems depend on reliable data, meaningful features, and careful objective evaluation.',
    title: 'Intelligence Pipelines'
  },
  {
    id: 'ai-2',
    category: 'AI',
    text: 'A neural model is only as effective as the ground-truth signals and gradient regularizations used during training.',
    title: 'Model Evaluation'
  },
  {
    id: 'ai-3',
    category: 'AI',
    text: 'Grounding large language models with schema constraints prevents hallucinations and yields deterministic outputs.',
    title: 'Constrained Extraction'
  },

  // ==========================================================================
  // 5. DATA SCIENCE & GEOSPATIAL
  // ==========================================================================
  {
    id: 'data-1',
    category: 'DATA',
    text: 'Data becomes useful when it can be transformed into reliable decisions.',
    title: 'Decision Intelligence'
  },
  {
    id: 'data-2',
    category: 'DATA',
    text: 'Satellite telemetry ingestion streams real-time sensor passes to monitor environmental shifts and thermal anomalies.',
    title: 'Satellite Telemetry'
  },
  {
    id: 'data-3',
    category: 'DATA',
    text: 'Geospatial clustering correlates localized coordinates with wind speed and atmospheric humidity vectors.',
    title: 'Spatial Clustering'
  },

  // ==========================================================================
  // 6. SYSTEMS & ARCHITECTURE
  // ==========================================================================
  {
    id: 'sys-1',
    category: 'SYSTEMS',
    text: 'Good systems are designed around clear boundaries, predictable behavior, and useful feedback.',
    title: 'System Boundaries'
  },
  {
    id: 'sys-2',
    category: 'SYSTEMS',
    text: 'Asynchronous event queues decouple compute-heavy workloads from responsive user interface threads.',
    title: 'Event Decoupling'
  },
  {
    id: 'sys-3',
    category: 'SYSTEMS',
    text: 'State machines eliminate impossible transition states and provide deterministic debugging traces.',
    title: 'Finite State Machines'
  },

  // ==========================================================================
  // 7. KARTIK FLAGSHIP PROJECTS (Verified Information)
  // ==========================================================================
  {
    id: 'proj-pyravex',
    category: 'PROJECTS',
    text: 'PYRAVEX combines satellite thermal data, geospatial analysis, historical behavior, and intelligence to investigate persistent thermal activity.',
    title: 'PYRAVEX Satellite Intelligence',
    projectKey: 'pyravex',
    projectTargetId: 'pyravex'
  },
  {
    id: 'proj-veridexa',
    category: 'PROJECTS',
    text: 'Veridexa transforms unstructured product information into validated, explainable product intelligence with coordinate evidence citations.',
    title: 'Veridexa Document Grounding',
    projectKey: 'veridexa',
    projectTargetId: 'veridexa'
  },
  {
    id: 'proj-chronosat',
    category: 'PROJECTS',
    text: 'ChronoSat explores temporal enhancement between satellite observations using computational optical flow interpolation techniques.',
    title: 'ChronoSat Temporal Interpolation',
    projectKey: 'chronosat',
    projectTargetId: 'chronosat'
  },
  {
    id: 'proj-hostelhub',
    category: 'PROJECTS',
    text: 'HostelHub connects students with academic resources, Class Test archives, announcements, and collaborative knowledge.',
    title: 'HostelHub Campus Platform',
    projectKey: 'hostelhub',
    projectTargetId: 'hostelhub'
  },
  {
    id: 'proj-nudgekavach',
    category: 'PROJECTS',
    text: 'NudgeKavach observes real-time browser mutations to capture deceptive interface manipulation patterns and build local evidence trails.',
    title: 'NudgeKavach Interface Auditor',
    projectKey: 'nudgekavach',
    projectTargetId: 'nudgekavach'
  }
];

export const CATEGORY_LABELS: Record<string, string> = {
  GENERAL: 'General Engineering',
  CODE: 'Code Syntax',
  ALGORITHMS: 'DSA Patterns',
  AI: 'AI & ML Systems',
  DATA: 'Data & Geospatial',
  SYSTEMS: 'Systems Architecture',
  PROJECTS: 'Kartik Projects'
};
