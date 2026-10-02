import { TechNode } from '../types';

export const TECH_CATEGORIES = [
  'ALL',
  'LANGUAGES',
  'FRONTEND',
  'BACKEND',
  'DATA / CLOUD',
  'AI',
  'TOOLS'
] as const;

export const TECH_NODES: TechNode[] = [
  // LANGUAGES
  {
    id: 'python',
    name: 'Python',
    category: 'LANGUAGES',
    level: 'Core Language',
    description: 'Primary language for AI pipelines, geospatial processing, FastAPI backends, and algorithmic analysis.',
    relatedProjects: ['PYRAVEX', 'Veridexa', 'ChronoSat-BAH2026', 'Task-CRUD-API'],
    color: '#38BDF8'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'LANGUAGES',
    level: 'Production Frontend & Tools',
    description: 'Strongly typed development for interactive dashboards, stateful UI components, and web applications.',
    relatedProjects: ['PYRAVEX', 'Veridexa', 'KAVAAI-NWIS', 'Portfolio'],
    color: '#60A5FA'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'LANGUAGES',
    level: 'Web & Extensions',
    description: 'Core web runtime powering browser extension auditing tools, Electron apps, and DOM manipulation inspectors.',
    relatedProjects: ['NudgeKavach', 'HostelHub', 'GangaMitra-KAVAAI'],
    color: '#FBBF24'
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'LANGUAGES',
    level: 'DSA & Systems',
    description: 'Algorithmic problem solving, data structures implementation, and performance-critical routines on LeetCode/Codeforces.',
    relatedProjects: ['Competitive Programming', 'Coding-Practice'],
    color: '#818CF8'
  },
  {
    id: 'c',
    name: 'C',
    category: 'LANGUAGES',
    level: 'Foundational Programming',
    description: 'Low-level memory awareness, recursion drills, pointers, and foundational computer architecture understanding.',
    relatedProjects: ['Recursion_Kartik', 'Academic coursework'],
    color: '#94A3B8'
  },
  {
    id: 'java',
    name: 'Java',
    category: 'LANGUAGES',
    level: 'OOP & Data Structures',
    description: 'Object-oriented programming, standard collections, and academic computer science fundamentals.',
    relatedProjects: ['Academic coursework', 'Problem Solving'],
    color: '#FB923C'
  },

  // FRONTEND
  {
    id: 'react',
    name: 'React',
    category: 'FRONTEND',
    level: 'Core Framework',
    description: 'Component architecture, custom hooks, reactive state workflows, and modular application development.',
    relatedProjects: ['PYRAVEX', 'Veridexa', 'HostelHub', 'ChronoSat UI'],
    color: '#38BDF8'
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'FRONTEND',
    level: 'Build Engine',
    description: 'Lightning-fast ESM development server and optimized production bundler for modern web applications.',
    relatedProjects: ['PYRAVEX', 'ChronoSat', 'Portfolio'],
    color: '#A855F7'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'FRONTEND',
    level: 'Design Systems',
    description: 'Utility-first styling, responsive layout grids, dark mode palettes, and refined design tokens.',
    relatedProjects: ['HostelHub', 'PYRAVEX', 'Portfolio'],
    color: '#06B6D4'
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'FRONTEND',
    level: 'Motion & Scrollytelling',
    description: 'Declarative physics-based animations, layout transitions, and scroll-linked interaction triggers.',
    relatedProjects: ['Portfolio', 'Interactive Dashboards'],
    color: '#EC4899'
  },

  // BACKEND
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'BACKEND',
    level: 'High-Speed Python APIs',
    description: 'Asynchronous Python web framework with automated OpenAPI documentation and Pydantic validation.',
    relatedProjects: ['PYRAVEX Backend', 'Veridexa', 'ChronoSat API', 'Task-CRUD-API'],
    color: '#10B981'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'BACKEND',
    level: 'Runtime & Tools',
    description: 'Event-driven server runtime powering backend microservices, scripts, and Electron desktop processes.',
    relatedProjects: ['HostelHub', 'NudgeKavach Electron'],
    color: '#22C55E'
  },
  {
    id: 'express',
    name: 'Express',
    category: 'BACKEND',
    level: 'REST APIs',
    description: 'Minimalist web middleware and endpoint orchestration for full-stack Node applications.',
    relatedProjects: ['HostelHub Server'],
    color: '#E2E8F0'
  },

  // DATA / CLOUD
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'DATA / CLOUD',
    level: 'Auth & Relational Backend',
    description: 'Managed PostgreSQL with Row-Level Security, authenticated endpoints, and file storage buckets.',
    relatedProjects: ['HostelHub'],
    color: '#34D399'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'DATA / CLOUD',
    level: 'Relational Database',
    description: 'Structured schemas, indexing, foreign key constraints, and relational query design.',
    relatedProjects: ['HostelHub', 'Veridexa'],
    color: '#60A5FA'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'DATA / CLOUD',
    level: 'Document Storage',
    description: 'Flexible NoSQL document modeling, JSON payloads, and dynamic collection schemas.',
    relatedProjects: ['Full-stack prototypes'],
    color: '#4ADE80'
  },
  {
    id: 'render',
    name: 'Render',
    category: 'DATA / CLOUD',
    level: 'Backend Cloud Hosting',
    description: 'Containerized deployment of FastAPI web services, environment configurations, and background jobs.',
    relatedProjects: ['PYRAVEX Live API'],
    color: '#818CF8'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'DATA / CLOUD',
    level: 'Edge & Frontend Deployment',
    description: 'Edge network deployment with automatic CI/CD git triggers, SSL, and instant preview branches.',
    relatedProjects: ['PYRAVEX Web App', 'Portfolio'],
    color: '#F8FAFC'
  },

  // AI
  {
    id: 'ollama',
    name: 'Ollama',
    category: 'AI',
    level: 'Local LLM Inference',
    description: 'Self-hosted open weights execution for privacy-first, zero-cloud data parsing and local experimentation.',
    relatedProjects: ['Local AI Workflows', 'Veridexa Experiments'],
    color: '#F43F5E'
  },
  {
    id: 'llms',
    name: 'LLM Workflows',
    category: 'AI',
    level: 'Extraction & Verification',
    description: 'Prompt engineering, structured schema-constrained outputs, and multi-step grounded extraction pipelines.',
    relatedProjects: ['Veridexa', 'PathPilot-AI'],
    color: '#A855F7'
  },
  {
    id: 'ai-apis',
    name: 'AI & Geospatial APIs',
    category: 'AI',
    level: 'Data Integration',
    description: 'Integrating NASA FIRMS satellite feeds, Open-Meteo meteorological vectors, and model endpoints.',
    relatedProjects: ['PYRAVEX', 'ChronoSat-BAH2026'],
    color: '#3B82F6'
  },

  // TOOLS
  {
    id: 'git',
    name: 'Git',
    category: 'TOOLS',
    level: 'Version Control',
    description: 'Branching workflows, atomic commit history, rebasing, and collaborative source management.',
    relatedProjects: ['All 37+ repositories'],
    color: '#F97316'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'TOOLS',
    level: 'Project Source & CI',
    description: 'Public open-source repository management, issue tracking, and automated deployment integrations.',
    relatedProjects: ['kartikvermagit-ds'],
    color: '#CBD5E1'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'TOOLS',
    level: 'Containerization',
    description: 'Reproducible microservice environments, isolated Python runtime packaging, and deployment parity.',
    relatedProjects: ['Cloud service containers'],
    color: '#38BDF8'
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'TOOLS',
    level: 'Engineering Environment',
    description: 'Customized development workstation configured for Python, TypeScript, debuggers, and terminal workflows.',
    relatedProjects: ['Daily Development'],
    color: '#60A5FA'
  }
];
