import type { TechNode } from '../types';

export const TECH_CATEGORIES = [
  'ALL',
  'LANGUAGES',
  'FRONTEND',
  'BACKEND',
  'DATA',
  'AI',
  'GEOSPATIAL',
  'TOOLS'
] as const;

export const TECH_NODES: TechNode[] = [
  // LANGUAGES
  {
    id: 'python',
    name: 'Python',
    category: 'LANGUAGES',
    level: 'Core Language',
    description: 'Primary language for AI pipelines, geospatial anomaly detection, and FastAPI microservices.',
    relatedProjects: ['PYRAVEX', 'Veridexa', 'ChronoSat-BAH2026', 'Task-CRUD-API'],
    color: '#38BDF8'
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'LANGUAGES',
    level: 'DSA & Systems',
    description: 'Algorithmic problem solving and data structures on LeetCode and Codeforces.',
    relatedProjects: ['Coding-Practice', 'Algorithmic Drills'],
    color: '#818CF8'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'LANGUAGES',
    level: 'Type-Safe Web',
    description: 'Strongly typed development for scalable frontend applications and UI systems.',
    relatedProjects: ['PYRAVEX', 'Veridexa', 'Portfolio'],
    color: '#60A5FA'
  },
  {
    id: 'java',
    name: 'Java',
    category: 'LANGUAGES',
    level: 'OOP & DSA',
    description: 'Object-oriented programming, standard collections, and academic foundations.',
    relatedProjects: ['Academic Coursework', 'Problem Solving'],
    color: '#FB923C'
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'LANGUAGES',
    level: 'Query & Schema Design',
    description: 'Relational database schema modeling, indexing, joins, and row-level security policies.',
    relatedProjects: ['HostelHub', 'Veridexa (SQLAlchemy)'],
    color: '#34D399'
  },

  // FRONTEND
  {
    id: 'react',
    name: 'React',
    category: 'FRONTEND',
    level: 'Component Architecture',
    description: 'Modular UI design, custom hooks, reactive state flow, and single-page apps.',
    relatedProjects: ['PYRAVEX', 'Veridexa', 'HostelHub', 'ChronoSat UI'],
    color: '#38BDF8'
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'FRONTEND',
    level: 'ESM Build Engine',
    description: 'High-speed ESM development bundling, HMR, and optimized production chunking.',
    relatedProjects: ['PYRAVEX', 'ChronoSat', 'Portfolio'],
    color: '#A855F7'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'FRONTEND',
    level: 'Design Systems',
    description: 'Utility-first styling, design token systems, dark interfaces, and responsive grids.',
    relatedProjects: ['HostelHub', 'PYRAVEX', 'Portfolio'],
    color: '#06B6D4'
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'FRONTEND',
    level: 'Motion Engineering',
    description: 'Physics-based spring transitions, layout animations, and scroll-linked interactions.',
    relatedProjects: ['Portfolio', 'Interactive Dashboards'],
    color: '#EC4899'
  },

  // BACKEND
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'BACKEND',
    level: 'Async Python Framework',
    description: 'Asynchronous Python endpoints with Pydantic schemas and auto-generated OpenAPI documentation.',
    relatedProjects: ['PYRAVEX Backend', 'Veridexa API', 'ChronoSat Backend'],
    color: '#10B981'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'BACKEND',
    level: 'Runtime Environment',
    description: 'Event-driven JavaScript runtime powering server services and Electron desktop processes.',
    relatedProjects: ['HostelHub Server', 'NudgeKavach Electron'],
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

  // DATA
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'DATA',
    level: 'Relational Database',
    description: 'Robust ACID relational data storage with foreign key constraints, schemas, and indexing.',
    relatedProjects: ['HostelHub', 'Veridexa'],
    color: '#60A5FA'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'DATA',
    level: 'BaaS & Storage',
    description: 'PostgreSQL with Row-Level Security, authenticated endpoints, and asset buckets.',
    relatedProjects: ['HostelHub'],
    color: '#34D399'
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'DATA',
    level: 'Data Analysis',
    description: 'DataFrame manipulation, time-series data aggregation, and anomaly filtering.',
    relatedProjects: ['Data-Vista-ds-29-', 'Thermal anomaly processing'],
    color: '#F59E0B'
  },

  // AI
  {
    id: 'llm-workflows',
    name: 'LLM Workflows',
    category: 'AI',
    level: 'Structured Pipelines',
    description: 'Grounded prompt engineering, schema-constrained outputs, and multi-step extraction logic.',
    relatedProjects: ['Veridexa', 'PathPilot-AI'],
    color: '#A855F7'
  },
  {
    id: 'ollama',
    name: 'Ollama',
    category: 'AI',
    level: 'Local Inference',
    description: 'Self-hosted open-weights execution for privacy-first extraction and offline testing.',
    relatedProjects: ['Veridexa Experiments', 'Local AI Workflows'],
    color: '#F43F5E'
  },
  {
    id: 'doc-intelligence',
    name: 'Document Intelligence',
    category: 'AI',
    level: 'Information Extraction',
    description: 'Multi-stage PDF extraction, unit standardization, and deterministic validation.',
    relatedProjects: ['Veridexa'],
    color: '#38BDF8'
  },

  // GEOSPATIAL
  {
    id: 'leaflet',
    name: 'Leaflet',
    category: 'GEOSPATIAL',
    level: 'Interactive Maps',
    description: 'Interactive map canvas, custom tile layers, anomaly marker clustering, and coordinate telemetry.',
    relatedProjects: ['PYRAVEX Command Console'],
    color: '#10B981'
  },
  {
    id: 'osm',
    name: 'OpenStreetMap',
    category: 'GEOSPATIAL',
    level: 'Cartographic Layer',
    description: 'Open spatial map data integration and topographic boundary overlays.',
    relatedProjects: ['PYRAVEX'],
    color: '#34D399'
  },
  {
    id: 'nasa-firms',
    name: 'NASA FIRMS',
    category: 'GEOSPATIAL',
    level: 'Satellite Telemetry',
    description: 'Active fire anomaly data ingestion from MODIS and VIIRS satellite instruments.',
    relatedProjects: ['PYRAVEX Thermal Platform'],
    color: '#EF4444'
  },
  {
    id: 'open-meteo',
    name: 'Open-Meteo',
    category: 'GEOSPATIAL',
    level: 'Atmospheric API',
    description: 'Wind vectors, relative humidity, and surface temperature correlation feeds.',
    relatedProjects: ['PYRAVEX Weather Ingestion'],
    color: '#06B6D4'
  },

  // TOOLS
  {
    id: 'git',
    name: 'Git',
    category: 'TOOLS',
    level: 'Version Control',
    description: 'Atomic commits, branch workflows, and reproducible history across all repositories.',
    relatedProjects: ['All Repositories'],
    color: '#F97316'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'TOOLS',
    level: 'Collaboration & CI',
    description: 'Repository hosting, automated build actions, and open-source project management.',
    relatedProjects: ['kartikvermagit-ds'],
    color: '#CBD5E1'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'TOOLS',
    level: 'Containerization',
    description: 'Isolated Python runtime environments, reproducible microservice setups, and container builds.',
    relatedProjects: ['Backend Deployments'],
    color: '#38BDF8'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'TOOLS',
    level: 'Frontend Edge Deployment',
    description: 'Continuous deployment of React applications with edge CDN caching and preview branches.',
    relatedProjects: ['PYRAVEX Web App', 'Portfolio'],
    color: '#F8FAFC'
  },
  {
    id: 'render',
    name: 'Render',
    category: 'TOOLS',
    level: 'Cloud Web Service',
    description: 'Containerized deployment of asynchronous FastAPI web applications with HTTPS routing.',
    relatedProjects: ['PYRAVEX API Backend'],
    color: '#818CF8'
  }
];
