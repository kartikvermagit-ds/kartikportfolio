import {
  Compass,
  Layers,
  Terminal,
  Volume2,
  Sliders,
  Copy,
  Mail,
  ExternalLink,
  Code2,
  Sparkles,
  Search,
  Activity,
  Cpu,
  Trophy,
  Binary,
  Globe
} from 'lucide-react';
import {
  GithubIcon,
  LinkedinIcon,
  LeetCodeIcon,
  CodeforcesIcon,
  HackerRankIcon
} from '../components/common/Icons';
import { FLAGSHIP_PROJECTS } from './projects';
import { SOCIAL_LINKS } from './profiles';
import type { CommandItem } from '../types/command';

// Safe smooth navigation helper with fallback
export function navigateTo(targetId: string, offset = 0) {
  if (targetId === 'hero' || targetId === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.getElementById(targetId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (offset !== 0) {
      window.scrollBy({ top: offset, behavior: 'smooth' });
    }
  }
}

// Generate the complete registry of commands
export function getCommandRegistry(callbacks: {
  closeOS: () => void;
  setFeedback: (msg: string) => void;
  toggleAudio: () => void;
  toggleReducedMotion: () => void;
}): CommandItem[] {
  const { closeOS, setFeedback, toggleAudio, toggleReducedMotion } = callbacks;

  const commands: CommandItem[] = [
    // ==========================================
    // 1. NAVIGATION
    // ==========================================
    {
      id: 'nav-hero',
      title: 'Go to Command Core (Hero)',
      category: 'NAVIGATION',
      description: 'Top of page with 3D Intelligence Core & identity',
      keywords: ['home', 'top', 'hero', 'start', 'core'],
      shortcut: 'H',
      icon: Compass,
      badge: '00',
      badgeType: 'blue',
      action: () => {
        closeOS();
        navigateTo('hero');
      }
    },
    {
      id: 'nav-pathways',
      title: 'Go to Pathways (Choose Your Path)',
      category: 'NAVIGATION',
      description: 'Interactive visitor routing system (Work, Play, Stack, Person)',
      keywords: ['path', 'pathways', 'routing', 'what brings you here', 'choose', 'route', 'journey', 'explore'],
      shortcut: 'P',
      icon: Compass,
      badge: 'PATH',
      badgeType: 'blue',
      action: () => {
        closeOS();
        navigateTo('pathways');
      }
    },
    {
      id: 'route-work',
      title: 'Initialize Route: Explore My Work (01)',
      category: 'NAVIGATION',
      description: 'Projects, systems, experiments & real-world builds',
      keywords: ['work', 'route work', 'explore work', 'flagship', 'projects'],
      icon: Code2,
      badge: '01',
      badgeType: 'blue',
      action: () => {
        closeOS();
        try { localStorage.setItem('kartik-portfolio-path', 'work'); } catch {}
        window.dispatchEvent(new CustomEvent('kartik-path-selected', { detail: { pathId: 'work' } }));
        setFeedback('Route Initialized: WORK');
        navigateTo('work');
      }
    },
    {
      id: 'route-play',
      title: 'Initialize Route: Play & Experiment (02)',
      category: 'NAVIGATION',
      description: 'Interactive demos, 3D simulations & hidden experiences',
      keywords: ['play', 'experiment', 'route play', 'games', '3d'],
      icon: Sparkles,
      badge: '02',
      badgeType: 'amber',
      action: () => {
        closeOS();
        try { localStorage.setItem('kartik-portfolio-path', 'play'); } catch {}
        window.dispatchEvent(new CustomEvent('kartik-path-selected', { detail: { pathId: 'play' } }));
        setFeedback('Route Initialized: PLAY');
        navigateTo('work');
      }
    },
    {
      id: 'route-stack',
      title: 'Initialize Route: Explore The Stack (03)',
      category: 'NAVIGATION',
      description: 'Technologies, architecture, algorithms & engineering',
      keywords: ['stack', 'route stack', 'tech', 'architecture', 'dsa'],
      icon: Binary,
      badge: '03',
      badgeType: 'blue',
      action: () => {
        closeOS();
        try { localStorage.setItem('kartik-portfolio-path', 'stack'); } catch {}
        window.dispatchEvent(new CustomEvent('kartik-path-selected', { detail: { pathId: 'stack' } }));
        setFeedback('Route Initialized: STACK');
        navigateTo('stack');
      }
    },
    {
      id: 'route-person',
      title: 'Initialize Route: Get To Know Kartik (04)',
      category: 'NAVIGATION',
      description: 'Background, learning journey, interests & current focus',
      keywords: ['person', 'kartik', 'route person', 'about', 'journey'],
      icon: Cpu,
      badge: '04',
      badgeType: 'emerald',
      action: () => {
        closeOS();
        try { localStorage.setItem('kartik-portfolio-path', 'person'); } catch {}
        window.dispatchEvent(new CustomEvent('kartik-path-selected', { detail: { pathId: 'person' } }));
        setFeedback('Route Initialized: PERSON');
        navigateTo('about');
      }
    },
    {
      id: 'nav-about',
      title: 'Go to About (Building by Doing)',
      category: 'NAVIGATION',
      description: 'Philosophy, background, and interactive engineering topology',
      keywords: ['about', 'bio', 'who', 'education', 'philosophy', 'psit'],
      shortcut: 'A',
      icon: Cpu,
      badge: '01',
      badgeType: 'blue',
      action: () => {
        closeOS();
        navigateTo('about');
      }
    },
    {
      id: 'nav-capabilities',
      title: 'Go to Capabilities (What I Build)',
      category: 'NAVIGATION',
      description: 'Architecture cards covering AI, Data Science, and Systems',
      keywords: ['capabilities', 'skills', 'what i build', 'domains', 'features'],
      shortcut: 'C',
      icon: Layers,
      badge: '02',
      badgeType: 'blue',
      action: () => {
        closeOS();
        navigateTo('capabilities');
      }
    },
    {
      id: 'nav-stack',
      title: 'Go to Tech Universe (Stack)',
      category: 'NAVIGATION',
      description: 'Interactive node network of languages, frameworks & telemetry tools',
      keywords: ['stack', 'tech', 'technologies', 'tools', 'languages', 'python', 'react'],
      shortcut: 'S',
      icon: Binary,
      badge: '03',
      badgeType: 'blue',
      action: () => {
        closeOS();
        navigateTo('stack');
      }
    },
    {
      id: 'nav-work',
      title: 'Go to Flagship Projects',
      category: 'NAVIGATION',
      description: 'End-to-end architectures and verified engineering systems',
      keywords: ['work', 'projects', 'featured', 'flagship', 'portfolio', 'systems'],
      shortcut: 'W',
      icon: Code2,
      badge: '04',
      badgeType: 'amber',
      action: () => {
        closeOS();
        navigateTo('work');
      }
    },
    {
      id: 'nav-registry',
      title: 'Go to Project & Tool Registry',
      category: 'NAVIGATION',
      description: 'Searchable archive of public tools, utilities, and experimental repos',
      keywords: ['registry', 'archive', 'tools', 'search', 'repos', 'explorer'],
      shortcut: 'R',
      icon: Search,
      badge: '05',
      badgeType: 'blue',
      action: () => {
        closeOS();
        navigateTo('registry');
      }
    },
    {
      id: 'nav-github',
      title: 'Go to Live GitHub Telemetry',
      category: 'NAVIGATION',
      description: 'Live synchronized repository commit & star analytics',
      keywords: ['github', 'telemetry', 'analytics', 'repos', 'commits', 'stars'],
      shortcut: 'G',
      icon: Activity,
      badge: '06',
      badgeType: 'blue',
      action: () => {
        closeOS();
        navigateTo('github');
      }
    },
    {
      id: 'nav-journey',
      title: 'Go to Hackathon Journey',
      category: 'NAVIGATION',
      description: 'Timed hackathons, Bharatiya Antariksh, and 24h build sprints',
      keywords: ['journey', 'hackathons', 'bah', 'timeline', 'experience'],
      shortcut: 'J',
      icon: Trophy,
      badge: '07',
      badgeType: 'amber',
      action: () => {
        closeOS();
        navigateTo('journey');
      }
    },
    {
      id: 'nav-dsa',
      title: 'Go to Problem Solving & DSA',
      category: 'NAVIGATION',
      description: '3D algorithmic graph, LeetCode, Codeforces, and problem solving',
      keywords: ['dsa', 'problem solving', 'leetcode', 'codeforces', 'algorithms', 'graph'],
      shortcut: 'D',
      icon: Activity,
      badge: '08',
      badgeType: 'blue',
      action: () => {
        closeOS();
        navigateTo('problem-solving');
      }
    },
    {
      id: 'nav-building',
      title: 'Go to Currently Building',
      category: 'NAVIGATION',
      description: 'Active development terminal & work-in-progress streams',
      keywords: ['currently building', 'terminal', 'active', 'tracks', 'status'],
      icon: Terminal,
      badge: '09',
      badgeType: 'emerald',
      action: () => {
        closeOS();
        navigateTo('currently-building');
      }
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact Finale',
      category: 'NAVIGATION',
      description: 'Direct inquiries, encrypted communication channels & social links',
      keywords: ['contact', 'email', 'touch', 'message', 'hire', 'talk'],
      shortcut: 'M',
      icon: Mail,
      badge: '10',
      badgeType: 'blue',
      action: () => {
        closeOS();
        navigateTo('contact');
      }
    },

    // ==========================================
    // 2. FLAGSHIP PROJECTS
    // ==========================================
    ...FLAGSHIP_PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      title: `Open ${proj.title}`,
      category: 'PROJECTS' as const,
      description: `${proj.subtitle} — ${proj.technologies.slice(0, 3).join(', ')}`,
      keywords: [
        proj.title.toLowerCase(),
        proj.id.toLowerCase(),
        proj.subtitle.toLowerCase(),
        ...proj.technologies.map((t) => t.toLowerCase())
      ],
      icon: Code2,
      badge: proj.number,
      badgeType: 'amber' as const,
      action: () => {
        closeOS();
        window.dispatchEvent(new CustomEvent('open-case-study', { detail: { projectId: proj.id } }));
        navigateTo('work');
      }
    })),

    // Live link direct triggers for projects with deployments
    {
      id: 'proj-pyravex-live',
      title: 'Launch PYRAVEX Live App',
      category: 'PROJECTS',
      description: 'Open satellite thermal monitoring interface in a new window',
      keywords: ['pyravex', 'live', 'satellite', 'map', 'launch'],
      icon: ExternalLink,
      badge: 'LIVE',
      badgeType: 'live',
      action: () => {
        closeOS();
        window.open('https://pyravex-2.vercel.app/', '_blank', 'noopener,noreferrer');
      }
    },

    // ==========================================
    // 3. EXPERIENCES & EXPLORER
    // ==========================================
    {
      id: 'exp-3d-brain',
      title: 'Inspect 3D Digital Brain Core',
      category: 'EXPLORER',
      description: 'Navigate to interactive WebGL systems transition sphere',
      keywords: ['3d', 'brain', 'webgl', 'threejs', 'scene', 'visualizer'],
      icon: Sparkles,
      badge: '3D',
      badgeType: 'tech',
      action: () => {
        closeOS();
        navigateTo('about', -120);
      }
    },
    {
      id: 'exp-algo-graph',
      title: 'Explore 3D DSA Algorithm Graph',
      category: 'EXPLORER',
      description: 'Inspect interactive force-directed node cluster for algorithms',
      keywords: ['algo', 'graph', '3d graph', 'nodes', 'dsa visualizer'],
      icon: Binary,
      badge: '3D',
      badgeType: 'tech',
      action: () => {
        closeOS();
        navigateTo('problem-solving');
      }
    },
    {
      id: 'exp-satellite-globe',
      title: 'Inspect Satellite Thermal Globe',
      category: 'EXPLORER',
      description: '3D WebGL sphere simulating NASA FIRMS telemetry ingestion',
      keywords: ['globe', 'satellite', 'thermal', 'nasa', '3d earth'],
      icon: Globe,
      badge: '3D',
      badgeType: 'tech',
      action: () => {
        closeOS();
        navigateTo('pyravex');
      }
    },

    // ==========================================
    // 4. ENGINEERING & PROFILES
    // ==========================================
    {
      id: 'eng-github',
      title: 'Open GitHub Profile (kartikvermagit-ds)',
      category: 'ENGINEERING',
      description: 'Explore public repositories, open source builds, and commit streams',
      keywords: ['github', 'profile', 'repos', 'git', 'kartikvermagit-ds'],
      icon: GithubIcon,
      badge: 'EXT',
      badgeType: 'default',
      action: () => {
        closeOS();
        window.open(SOCIAL_LINKS.github, '_blank', 'noopener,noreferrer');
      }
    },
    {
      id: 'eng-leetcode',
      title: 'Open LeetCode Profile (kartik-verma_29)',
      category: 'ENGINEERING',
      description: 'Algorithmic practice and data structure challenge history',
      keywords: ['leetcode', 'dsa', 'problems', 'code', 'ranking'],
      icon: LeetCodeIcon,
      badge: 'EXT',
      badgeType: 'amber',
      action: () => {
        closeOS();
        window.open(SOCIAL_LINKS.leetcode, '_blank', 'noopener,noreferrer');
      }
    },
    {
      id: 'eng-codeforces',
      title: 'Open Codeforces Profile (kv5612872)',
      category: 'ENGINEERING',
      description: 'Competitive programming rounds and contest history',
      keywords: ['codeforces', 'cp', 'contests', 'rating'],
      icon: CodeforcesIcon,
      badge: 'EXT',
      badgeType: 'blue',
      action: () => {
        closeOS();
        window.open(SOCIAL_LINKS.codeforces, '_blank', 'noopener,noreferrer');
      }
    },
    {
      id: 'eng-hackerrank',
      title: 'Open HackerRank Profile (kv5612872)',
      category: 'ENGINEERING',
      description: 'Problem solving stars, domain evaluations, and certificates',
      keywords: ['hackerrank', 'challenges', 'certificates'],
      icon: HackerRankIcon,
      badge: 'EXT',
      badgeType: 'emerald',
      action: () => {
        closeOS();
        window.open(SOCIAL_LINKS.hackerrank, '_blank', 'noopener,noreferrer');
      }
    },
    {
      id: 'eng-linkedin',
      title: 'Open LinkedIn Profile (Kartik Verma)',
      category: 'ENGINEERING',
      description: 'Connect professionally and view academic trajectory',
      keywords: ['linkedin', 'social', 'network', 'connect', 'resume'],
      icon: LinkedinIcon,
      badge: 'EXT',
      badgeType: 'blue',
      action: () => {
        closeOS();
        window.open(SOCIAL_LINKS.linkedin, '_blank', 'noopener,noreferrer');
      }
    },

    // ==========================================
    // 5. SYSTEM & PREFERENCES
    // ==========================================
    {
      id: 'sys-toggle-audio',
      title: 'Toggle Ambient Audio',
      category: 'SYSTEM',
      description: 'Play / Mute the procedural ambient background music track',
      keywords: ['audio', 'music', 'sound', 'mute', 'unmute', 'ambient', 'volume'],
      icon: Volume2,
      badge: 'AUDIO',
      badgeType: 'tech',
      action: () => {
        toggleAudio();
        setFeedback('Ambient audio state toggled.');
      }
    },
    {
      id: 'sys-toggle-motion',
      title: 'Toggle Reduced Motion Mode',
      category: 'SYSTEM',
      description: 'Minimize or restore 3D particle motion and spring physics',
      keywords: ['motion', 'reduced motion', 'accessibility', 'fps', 'performance', 'disable animations'],
      icon: Sliders,
      badge: 'A11Y',
      badgeType: 'blue',
      action: () => {
        toggleReducedMotion();
        setFeedback('Motion preference toggled.');
      }
    },
    {
      id: 'sys-copy-url',
      title: 'Copy Portfolio URL',
      category: 'SYSTEM',
      description: 'Copy live portfolio address to your clipboard',
      keywords: ['copy', 'url', 'share', 'link', 'portfolio'],
      icon: Copy,
      badge: 'CLIP',
      badgeType: 'default',
      action: () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.origin || 'https://kartikverma.dev');
          setFeedback('Portfolio URL copied to clipboard.');
        }
      }
    },
    {
      id: 'sys-copy-email',
      title: 'Copy Contact Email',
      category: 'SYSTEM',
      description: 'Copy kv5612872@gmail.com directly to clipboard',
      keywords: ['copy email', 'email address', 'mail', 'clipboard'],
      icon: Mail,
      badge: 'CLIP',
      badgeType: 'default',
      action: () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText('kv5612872@gmail.com');
          setFeedback('Email (kv5612872@gmail.com) copied.');
        }
      }
    },

    // ==========================================
    // 6. EASTER EGGS / CLI COMMANDS
    // ==========================================
    {
      id: 'cmd-whoami',
      title: 'whoami',
      category: 'EASTER_EGGS',
      description: 'KARTIK VERMA // AI, Data Science & Full-Stack Systems Engineer',
      keywords: ['whoami', 'who am i', 'user', 'identity'],
      icon: Terminal,
      badge: 'CLI',
      badgeType: 'emerald',
      action: () => {
        setFeedback('KARTIK VERMA — B.Tech CSE (Data Science) @ PSIT Kanpur [2026 Developer]');
      }
    },
    {
      id: 'cmd-status',
      title: 'status',
      category: 'EASTER_EGGS',
      description: 'Run diagnostic health check on all client subsystems',
      keywords: ['status', 'health', 'system', 'diagnostics', 'telemetry'],
      icon: Activity,
      badge: 'CLI',
      badgeType: 'emerald',
      action: () => {
        setFeedback('SYSTEM READY • WebGL2 Online • DOM Verified • All Subsystems Nominal');
      }
    },
    {
      id: 'cmd-help',
      title: 'help',
      category: 'EASTER_EGGS',
      description: 'Display available command categories and navigation syntax',
      keywords: ['help', 'man', 'manual', 'shortcuts', 'info'],
      icon: Terminal,
      badge: 'CLI',
      badgeType: 'emerald',
      action: () => {
        setFeedback('Categories: NAVIGATION, PROJECTS, EXPLORER, ENGINEERING, SYSTEM. Use ↑↓ arrows to navigate, Enter to run.');
      }
    },
    {
      id: 'cmd-skills',
      title: 'skills',
      category: 'EASTER_EGGS',
      description: 'Fast printout of primary technical engineering stack',
      keywords: ['skills', 'stack', 'languages', 'tools'],
      icon: Cpu,
      badge: 'CLI',
      badgeType: 'emerald',
      action: () => {
        setFeedback('CORE: Python, TypeScript, React 19, FastAPI, Three.js, PyTorch, Supabase, PostgreSQL, Docker');
      }
    }
  ];

  return commands;
}

// Perform fast fuzzy substring match with intelligent scoring
export function filterCommands(commands: CommandItem[], query: string): CommandItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return commands;

  // Handle special single-word easter eggs directly
  if (q === 'whoami' || q === 'status' || q === 'help' || q === 'skills') {
    const directEgg = commands.filter((c) => c.category === 'EASTER_EGGS' && c.title.toLowerCase() === q);
    if (directEgg.length > 0) {
      const rest = commands.filter((c) => c.id !== directEgg[0].id);
      return [...directEgg, ...rest];
    }
  }

  const scored = commands
    .map((cmd) => {
      let score = 0;
      const title = cmd.title.toLowerCase();
      const desc = cmd.description.toLowerCase();
      const category = cmd.category.toLowerCase();
      const keywords = cmd.keywords || [];

      // Exact title match
      if (title === q) score += 100;
      // Title starts with query
      else if (title.startsWith(q)) score += 60;
      // Title includes query
      else if (title.includes(q)) score += 40;

      // Keyword matches
      for (const kw of keywords) {
        if (kw === q) score += 50;
        else if (kw.startsWith(q)) score += 30;
        else if (kw.includes(q)) score += 20;
      }

      // Category matches
      if (category.includes(q)) score += 15;

      // Description matches
      if (desc.includes(q)) score += 10;

      // Acronym check (e.g. "pv" for Pyravex, "cs" for ChronoSat)
      const initials = title
        .split(/\s+/)
        .map((w) => w[0])
        .join('');
      if (initials.includes(q)) score += 25;

      return { cmd, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.cmd);

  return scored;
}
