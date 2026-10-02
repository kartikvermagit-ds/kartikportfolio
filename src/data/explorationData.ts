// Centralized exploration data and milestone registry for Task 12: KARTIK.EXPLORE
import type {
  ExplorationItem,
  ExplorationMilestone,
  ExplorationCategory
} from '../types/exploration';

export const EXPLORATION_STORAGE_KEY = 'kartik-explore-progress';
export const EXPLORATION_VERSION = 1;

export const CATEGORY_COLORS: Record<ExplorationCategory, { primary: string; secondary: string }> = {
  WORK: { primary: '#3B82F6', secondary: '#60A5FA' },
  PLAY: { primary: '#F59E0B', secondary: '#FBBF24' },
  STACK: { primary: '#8B5CF6', secondary: '#A78BFA' },
  PERSON: { primary: '#10B981', secondary: '#34D399' }
};

export const EXPLORATION_ITEMS: ExplorationItem[] = [
  // ==========================================
  // 01 WORK (5 items)
  // ==========================================
  {
    id: 'exp-work',
    targetId: 'work',
    label: 'Flagship Projects',
    sublabel: 'PYRAVEX, Veridexa, ChronoSat, HostelHub, NudgeKavach',
    category: 'WORK'
  },
  {
    id: 'exp-case-studies',
    targetId: 'work',
    label: 'Project Case Studies',
    sublabel: 'Deep dive into real-world architecture specifications',
    category: 'WORK',
    isInteractive: true
  },
  {
    id: 'exp-registry',
    targetId: 'registry',
    label: 'Public Tool Registry',
    sublabel: 'Searchable repository of open-source utilities',
    category: 'WORK'
  },
  {
    id: 'exp-github',
    targetId: 'github',
    label: 'GitHub Live Telemetry',
    sublabel: 'Synchronized commit history and repository analytics',
    category: 'WORK'
  },
  {
    id: 'exp-building',
    targetId: 'currently-building',
    label: 'Currently Building',
    sublabel: 'Active development terminal & work-in-progress streams',
    category: 'WORK'
  },

  // ==========================================
  // 02 PLAY (5 items)
  // ==========================================
  {
    id: 'exp-code-reactor',
    targetId: 'code-reactor',
    label: 'Code Reactor',
    sublabel: 'Interactive developer workstation for code reasoning',
    category: 'PLAY',
    isInteractive: true
  },
  {
    id: 'exp-algorithm-escape',
    targetId: 'algorithm-escape',
    label: 'Algorithm Escape',
    sublabel: 'Hands-on DSA puzzle experience & bracket validation',
    category: 'PLAY',
    isInteractive: true
  },
  {
    id: 'exp-pyravex-mission',
    targetId: 'pyravex-mission',
    label: 'PYRAVEX Mission',
    sublabel: 'Find the anomaly: satellite thermal intelligence console',
    category: 'PLAY',
    isInteractive: true
  },
  {
    id: 'exp-veridexa-mission',
    targetId: 'veridexa-verification',
    label: 'Veridexa Investigation',
    sublabel: 'Verify the document: industrial coordinate grounding',
    category: 'PLAY',
    isInteractive: true
  },
  {
    id: 'exp-chronosat-timemachine',
    targetId: 'chronosat-timemachine',
    label: 'ChronoSat Time Machine',
    sublabel: 'Satellite temporal resolution frame interpolation',
    category: 'PLAY',
    isInteractive: true
  },
  {
    id: 'exp-kartik-type',
    targetId: 'kartik-type',
    label: 'KARTIK.TYPE Lab',
    sublabel: 'Developer-grade typing speed & precision laboratory',
    category: 'PLAY',
    isInteractive: true
  },

  // ==========================================
  // 03 STACK (5 items)
  // ==========================================
  {
    id: 'exp-tech-universe',
    targetId: 'stack',
    label: 'Tech Universe',
    sublabel: 'Interactive node network of languages & frameworks',
    category: 'STACK'
  },
  {
    id: 'exp-system-builder',
    targetId: 'system-builder',
    label: 'System Builder',
    sublabel: 'Interactive architecture canvas across 6 core tiers',
    category: 'STACK',
    isInteractive: true
  },
  {
    id: 'exp-tech-detective',
    targetId: 'tech-stack-detective',
    label: 'Tech Stack Detective',
    sublabel: 'Forensic architecture clues & stack verification',
    category: 'STACK',
    isInteractive: true
  },
  {
    id: 'exp-system-map',
    targetId: 'system-map',
    label: 'Live System Map',
    sublabel: 'Living technical ecosystem & relationship graph',
    category: 'STACK',
    isInteractive: true
  },
  {
    id: 'exp-problem-solving',
    targetId: 'problem-solving',
    label: 'DSA & Algorithmic Graph',
    sublabel: '3D algorithmic topology and problem solving profiles',
    category: 'STACK'
  },

  // ==========================================
  // 04 PERSON (4 items)
  // ==========================================
  {
    id: 'exp-about',
    targetId: 'about',
    label: 'About: Building by Doing',
    sublabel: 'Engineering philosophy, background & topology',
    category: 'PERSON'
  },
  {
    id: 'exp-capabilities',
    targetId: 'capabilities',
    label: 'Core Capabilities',
    sublabel: 'Architecture cards covering AI, Data Science & Systems',
    category: 'PERSON'
  },
  {
    id: 'exp-journey',
    targetId: 'journey',
    label: 'Hackathon Journey',
    sublabel: 'Timed hackathons, Bharatiya Antariksh, and 24h sprints',
    category: 'PERSON'
  },
  {
    id: 'exp-contact',
    targetId: 'contact',
    label: 'Contact Finale',
    sublabel: 'Direct dialogue, communication channels & profiles',
    category: 'PERSON'
  }
];

export const EXPLORATION_MILESTONES: ExplorationMilestone[] = [
  {
    id: 'ms-first-step',
    title: 'FIRST STEP',
    description: 'Entered the portfolio systems.',
    category: 'PERSON'
  },
  {
    id: 'ms-path-chosen',
    title: 'PATHFINDER',
    description: 'Selected a personalized visitor pathway.',
    category: 'PERSON'
  },
  {
    id: 'ms-project-diver',
    title: 'PROJECT DIVER',
    description: 'Inspected a flagship project architecture case study.',
    category: 'WORK',
    associatedItemId: 'exp-case-studies'
  },
  {
    id: 'ms-anomaly-hunter',
    title: 'ANOMALY HUNTER',
    description: 'Entered the PYRAVEX satellite intelligence console.',
    category: 'PLAY',
    associatedItemId: 'exp-pyravex-mission'
  },
  {
    id: 'ms-document-auditor',
    title: 'DOCUMENT AUDITOR',
    description: 'Entered the Veridexa document verification workbench.',
    category: 'PLAY',
    associatedItemId: 'exp-veridexa-mission'
  },
  {
    id: 'ms-temporal-pilot',
    title: 'TEMPORAL PILOT',
    description: 'Entered the ChronoSat temporal interpolation simulation.',
    category: 'PLAY',
    associatedItemId: 'exp-chronosat-timemachine'
  },
  {
    id: 'ms-puzzle-resolver',
    title: 'PUZZLE RESOLVER',
    description: 'Entered the Algorithm Escape DSA puzzle.',
    category: 'PLAY',
    associatedItemId: 'exp-algorithm-escape'
  },
  {
    id: 'ms-code-mode',
    title: 'CODE MODE',
    description: 'Started the Code Reactor interactive developer workstation.',
    category: 'PLAY',
    associatedItemId: 'exp-code-reactor'
  },
  {
    id: 'ms-type-lab',
    title: 'TYPE LAB EXPLORED',
    description: 'Entered the KARTIK.TYPE speed and precision laboratory.',
    category: 'PLAY',
    associatedItemId: 'exp-kartik-type'
  },
  {
    id: 'ms-system-thinker',
    title: 'SYSTEM THINKER',
    description: 'Opened the System Builder architecture canvas.',
    category: 'STACK',
    associatedItemId: 'exp-system-builder'
  },
  {
    id: 'ms-stack-trace',
    title: 'STACK TRACE',
    description: 'Entered the Tech Stack Detective forensic investigation.',
    category: 'STACK',
    associatedItemId: 'exp-tech-detective'
  },
  {
    id: 'ms-map-explorer',
    title: 'MAP EXPLORER',
    description: 'Entered the Live System Map living ecosystem graph.',
    category: 'STACK',
    associatedItemId: 'exp-system-map'
  },
  {
    id: 'ms-full-circle',
    title: 'FULL CIRCLE',
    description: 'Reached the Contact collaboration finale.',
    category: 'PERSON',
    associatedItemId: 'exp-contact'
  }
];
