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
    description: 'Interactive demos, games, simulations & hidden secret discoveries.',
    routeConcept: 'GAMES → SIMULATIONS → EXPERIMENTS → SECRET DISCOVERIES',
    primaryTargetId: 'work', // Routes to the interactive 3D WebGL scenes
    color: '#F59E0B', // Amber
    secondaryColor: '#FBBF24',
    iconName: 'Gamepad2',
    steps: [
      { label: '3D WORLD', targetId: 'work', description: 'Interactive WebGL simulations & shaders' },
      { label: 'PYRAVEX', targetId: 'pyravex-mission', description: 'PYRAVEX satellite anomaly detection game' },
      { label: 'VERIDEXA', targetId: 'veridexa-verification', description: 'Veridexa document verification intelligence game' },
      { label: 'CHRONOSAT', targetId: 'chronosat-timemachine', description: 'ChronoSat temporal interpolation time machine' },
      { label: 'ALGO ESCAPE', targetId: 'algorithm-escape', description: 'Interactive DSA problem-solving escape puzzle' }
    ]
  },
  {
    id: 'stack',
    number: '03',
    title: 'EXPLORE THE STACK',
    shortTitle: 'STACK',
    description: 'Technologies, architecture, algorithms & developer mode.',
    routeConcept: 'TECHNOLOGY → SYSTEM MAP → DETECTIVE → BUILDER → DEV MODE',
    primaryTargetId: 'stack',
    color: '#8B5CF6', // Purple
    secondaryColor: '#A78BFA',
    iconName: 'Cpu',
    steps: [
      { label: 'TECHNOLOGY', targetId: 'stack', description: 'Constellation matrix of technologies' },
      { label: 'SYSTEM MAP', targetId: 'system-map', description: 'Interactive developer ecosystem & relationship graph' },
      { label: 'DETECTIVE', targetId: 'tech-stack-detective', description: 'Tech Stack Detective interactive architectural clues' },
      { label: 'SYSTEM BUILDER', targetId: 'system-builder', description: 'Interactive architecture canvas & data flow simulation' },
      { label: 'CODE REACTOR', targetId: 'code-reactor', description: 'Interactive Code Reactor & algorithmic reasoning' }
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
