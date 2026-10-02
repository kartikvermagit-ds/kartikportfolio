import type { PathItem } from '../types/path';

export const EXPLORATION_PATHS: PathItem[] = [
  {
    id: 'work',
    number: '01',
    title: 'EXPLORE MY WORK',
    shortTitle: 'WORK',
    description: 'Projects, systems, experiments & real-world builds.',
    routeConcept: 'PROJECTS → CASE STUDIES → MORE PROJECTS → GITHUB → CONTACT',
    primaryTargetId: 'work',
    color: '#3B82F6', // Blue
    secondaryColor: '#60A5FA',
    iconName: 'Briefcase',
    steps: [
      { label: 'PROJECTS', targetId: 'work', description: 'Flagship engineering architectures' },
      { label: 'CASE STUDIES', targetId: 'pyravex', description: 'NASA satellite & AI pipelines' },
      { label: 'MORE PROJECTS', targetId: 'registry', description: 'Curated public code registry' },
      { label: 'GITHUB', targetId: 'github', description: 'Live verified repository telemetry' },
      { label: 'CONTACT', targetId: 'contact', description: 'Direct project collaboration' }
    ]
  },
  {
    id: 'play',
    number: '02',
    title: 'PLAY & EXPERIMENT',
    shortTitle: 'PLAY',
    description: 'Interactive demos, games, simulations & hidden experiences.',
    routeConcept: '3D WORLD → PLAYGROUND → GAMES → EXPERIMENTS → EASTER EGGS',
    primaryTargetId: 'work', // Routes to the interactive 3D WebGL scenes
    color: '#F59E0B', // Amber
    secondaryColor: '#FBBF24',
    iconName: 'Gamepad2',
    steps: [
      { label: '3D WORLD', targetId: 'work', description: 'Interactive WebGL simulations & shaders' },
      { label: 'PLAYGROUND', targetId: 'capabilities', description: 'Interactive 3D capability cards' },
      { label: 'SIMULATIONS', targetId: 'chronosat', description: 'ChronoSat temporal interpolation' },
      { label: 'EXPERIMENTS', targetId: 'registry', description: 'Standalone interactive utilities' },
      { label: 'EASTER EGGS', targetId: 'hero', description: 'Kartik OS terminal triggers & hidden commands' }
    ]
  },
  {
    id: 'stack',
    number: '03',
    title: 'EXPLORE THE STACK',
    shortTitle: 'STACK',
    description: 'Technologies, architecture, algorithms & engineering.',
    routeConcept: 'TECHNOLOGY → ARCHITECTURE → CODE → DSA → GITHUB',
    primaryTargetId: 'stack',
    color: '#8B5CF6', // Purple
    secondaryColor: '#A78BFA',
    iconName: 'Cpu',
    steps: [
      { label: 'TECHNOLOGY', targetId: 'stack', description: 'Constellation matrix of technologies' },
      { label: 'ARCHITECTURE', targetId: 'capabilities', description: 'System design & verified pipelines' },
      { label: 'CODE', targetId: 'registry', description: 'TypeScript, Python & C++ implementations' },
      { label: 'DSA', targetId: 'problem-solving', description: 'Algorithmic graphs & LeetCode/Codeforces' },
      { label: 'GITHUB', targetId: 'github', description: 'Language distribution & commit activity' }
    ]
  },
  {
    id: 'person',
    number: '04',
    title: 'GET TO KNOW KARTIK',
    shortTitle: 'PERSON',
    description: 'Background, learning journey, interests & current focus.',
    routeConcept: 'ABOUT → JOURNEY → CURRENTLY BUILDING → CONTACT',
    primaryTargetId: 'about',
    color: '#10B981', // Emerald
    secondaryColor: '#34D399',
    iconName: 'User',
    steps: [
      { label: 'ABOUT', targetId: 'about', description: 'Philosophy, education & core disciplines' },
      { label: 'JOURNEY', targetId: 'journey', description: 'Hackathon timeline & timed sprints' },
      { label: 'CURRENTLY BUILDING', targetId: 'currently-building', description: 'Live terminal dashboard & focus areas' },
      { label: 'CONTACT', targetId: 'contact', description: 'Direct dialogue & social links' }
    ]
  }
];

export const PATH_STORAGE_KEY = 'kartik-portfolio-path';
