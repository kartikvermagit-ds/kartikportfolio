// Terminal commands definitions for KARTIK TERMINAL simulation using real portfolio data
import { FLAGSHIP_PROJECTS } from './projects';
import { SOCIAL_LINKS } from './profiles';

export interface TerminalExecutionResult {
  output: string | string[];
  action?: 'CLEAR' | 'EXIT' | 'EXPLORE' | 'DEV_MODE' | 'NAVIGATE';
  targetId?: string;
  isError?: boolean;
}

export const TERMINAL_HELP_TEXT = [
  'KARTIK TERMINAL • v1.0.4',
  'Type commands to inspect portfolio systems & engineering telemetry:',
  '',
  '  help         Display this list of terminal commands',
  '  whoami       Identity statement and engineering profile',
  '  about        Background, engineering philosophy & topology',
  '  projects     List flagship projects and architecture specs',
  '  stack        Primary languages, frameworks, AI and 3D libraries',
  '  journey      Hackathons, Bharatiya Antariksh, and 24h sprints',
  '  explore      Open KARTIK.EXPLORE unified protocol panel',
  '  system       Display WebGL, viewport, and client health telemetry',
  '  github       Open GitHub telemetry profile',
  '  leetcode     Open LeetCode problem solving profile',
  '  codeforces   Open Codeforces competitive programming profile',
  '  clear        Clear the terminal display buffer',
  '  exit         Close the developer terminal'
];

export function executeTerminalCommand(input: string): TerminalExecutionResult {
  const trimmed = input.trim().toLowerCase();

  switch (trimmed) {
    case 'help':
    case '?':
      return { output: TERMINAL_HELP_TEXT };

    case 'whoami':
      return {
        output: [
          'NAME:       Kartik Verma',
          'ROLE:       AI • Data Science • Full-Stack Developer',
          'EDUCATION:  B.Tech CSE (Data Science) — PSIT Kanpur (2026 Developer)',
          'FOCUS:      Intelligent systems, geospatial satellite telemetry, and reactive UI architecture.',
          '',
          '> "I build intelligent systems, data-driven products, and real-world software."'
        ]
      };

    case 'about':
      return {
        output: [
          'ABOUT: Building by Doing.',
          'Specializing in full-stack architecture, machine learning pipelines, and spatial interfaces.',
          'Focus areas:',
          '  • Geospatial intelligence & satellite thermal anomaly detection',
          '  • Document verification & coordinate grounding models',
          '  • Temporal satellite frame interpolation',
          '  • High-performance interactive 3D WebGL visualizations'
        ]
      };

    case 'projects':
      return {
        output: [
          'FLAGSHIP ENGINEERING BUILDS:',
          ...FLAGSHIP_PROJECTS.map(
            (p, idx) => `  [0${idx + 1}] ${p.title.toUpperCase()} — ${p.subtitle} (${p.positioning})`
          ),
          '',
          'Tip: Use "explore" or click any project in the UI to inspect full architectural case studies.'
        ]
      };

    case 'stack':
      return {
        output: [
          'TECHNICAL STACK (VERIFIED):',
          '  • Languages:  Python, TypeScript, JavaScript, SQL, C++',
          '  • Frontend:   React 19, Vite, Tailwind CSS, Three.js, React Three Fiber, Framer Motion',
          '  • Backend/AI: FastAPI, PyTorch, Supabase, PostgreSQL, Docker, scikit-learn, OpenCV',
          '  • Systems:    Git, Linux, CI/CD, REST APIs, Web Audio API, WebGL2'
        ]
      };

    case 'journey':
    case 'hackathons':
      return {
        output: [
          'HACKATHON TELEMETRY:',
          '  • NASA Space Apps Challenge (Global Nominee — PYRAVEX)',
          '  • Bharatiya Antariksh Hackathon 2026 (ChronoSat temporal interpolation)',
          '  • Smart India Hackathon (SIH)',
          '  • 24h & 36h Rapid Prototyping Sprints'
        ]
      };

    case 'explore':
    case 'progress':
      return {
        output: 'Opening KARTIK.EXPLORE protocol panel...',
        action: 'EXPLORE'
      };

    case 'system':
    case 'status':
      return {
        output: [
          'SYSTEM TELEMETRY:',
          `  • User Agent:       ${typeof navigator !== 'undefined' ? navigator.userAgent.split(' ')[0] : 'Browser'}`,
          `  • Screen Resolution: ${typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'Standard'}`,
          '  • WebGL2 Engine:    ACTIVE (Three.js r128+)',
          '  • Client State:     Local only (Zero remote telemetry)',
          '  • Audio Context:    Initialized on demand',
          '  • Status:           All subsystems nominal'
        ]
      };

    case 'github':
      if (typeof window !== 'undefined') window.open(SOCIAL_LINKS.github, '_blank');
      return { output: `Opening ${SOCIAL_LINKS.github}...` };

    case 'linkedin':
      if (typeof window !== 'undefined') window.open(SOCIAL_LINKS.linkedin, '_blank');
      return { output: `Opening ${SOCIAL_LINKS.linkedin}...` };

    case 'leetcode':
      if (typeof window !== 'undefined') window.open(SOCIAL_LINKS.leetcode, '_blank');
      return { output: `Opening ${SOCIAL_LINKS.leetcode}...` };

    case 'codeforces':
      if (typeof window !== 'undefined') window.open(SOCIAL_LINKS.codeforces, '_blank');
      return { output: `Opening ${SOCIAL_LINKS.codeforces}...` };

    case 'clear':
    case 'cls':
      return { output: '', action: 'CLEAR' };

    case 'exit':
    case 'quit':
      return { output: 'Closing terminal...', action: 'EXIT' };

    case '':
      return { output: '' };

    default:
      return {
        output: `command not found: "${trimmed}". Type "help" for a list of available commands.`,
        isError: true
      };
  }
}
