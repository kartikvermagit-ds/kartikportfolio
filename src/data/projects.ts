import { Project } from '../types';

export const FLAGSHIP_PROJECTS: Project[] = [
  {
    id: 'pyravex',
    number: '01',
    title: 'PYRAVEX',
    subtitle: 'AI-Powered Satellite Thermal Intelligence',
    tagline: 'Geospatial Incident Monitoring & Automated Threat Assessment',
    description:
      'An AI-powered satellite thermal intelligence and incident monitoring platform combining satellite fire data, geospatial analysis, historical thermal behavior, and automated threat assessment.',
    technologies: [
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'Leaflet',
      'NASA FIRMS',
      'Open-Meteo',
      'AI',
      'Geospatial Data'
    ],
    githubUrl: 'https://github.com/kartikvermagit-ds/PYRAVEX-2',
    liveUrl: 'https://pyravex-2.vercel.app/',
    backendUrl: 'https://pyravex-backend.onrender.com/',
    visualType: 'satellite',
    highlights: [
      'Real-time ingestion of NASA FIRMS thermal anomaly feeds',
      'Automated hotspot clustering & regional danger scoring',
      'Integrated Open-Meteo atmospheric wind & moisture telemetry',
      'Interactive geospatial command console with historical replay'
    ],
    metrics: [
      { label: 'Latency', value: '<250ms' },
      { label: 'Data Feeds', value: 'NASA FIRMS' },
      { label: 'Coverage', value: 'National' }
    ]
  },
  {
    id: 'veridexa',
    number: '02',
    title: 'VERIDEXA',
    subtitle: 'AI-Powered Product Intelligence',
    tagline: 'Unstructured Industrial Specification Verification & Grounding',
    description:
      'Transforms unstructured industrial product information into validated, grounded, and explainable product intelligence. Eliminates hallucinations via strict multi-step evidence extraction.',
    technologies: [
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'SQLAlchemy',
      'AI / LLM'
    ],
    githubUrl: 'https://github.com/kartikvermagit-ds/Veridexa',
    visualType: 'pipeline',
    highlights: [
      'High-precision PDF parsing & schema-mapped token extraction',
      'Deterministic conflict detection across engineering specifications',
      'Explainable confidence scoring for verified attributes',
      'Human-in-the-loop audit review workbench'
    ],
    metrics: [
      { label: 'Audit Trail', value: '100% Grounded' },
      { label: 'Pipeline Stages', value: '6 Phases' },
      { label: 'Verification', value: 'Deterministic' }
    ]
  },
  {
    id: 'nudgekavach',
    number: '03',
    title: 'NUDGEKAVACH',
    subtitle: 'Evidence-First Interface Manipulation Auditing',
    tagline: 'Capturing Observable UI Manipulation Signals & Preserving Audit Trails',
    description:
      'A browser and desktop auditing system designed to capture observable interface manipulation signals and preserve the evidence trail. Empowers users to inspect deceptive UI patterns in real time.',
    technologies: [
      'JavaScript',
      'Browser Extension',
      'Electron',
      'Node.js'
    ],
    githubUrl: 'https://github.com/kartikvermagit-ds/NudgeKavach',
    visualType: 'auditor',
    highlights: [
      'Real-time DOM mutation monitoring for hidden timers & artificial urgency',
      'Visual DOM diff capture preserving exact viewport screenshots',
      'Tamper-evident localized evidence logging',
      'Cross-platform desktop dashboard powered by Electron'
    ],
    metrics: [
      { label: 'Capture Mode', value: 'Real-Time' },
      { label: 'Footprint', value: 'Zero Cloud Leak' },
      { label: 'Scope', value: 'DOM & UI' }
    ]
  },
  {
    id: 'chronosat',
    number: '04',
    title: 'CHRONOSAT',
    subtitle: 'Satellite Image Temporal Resolution Enhancement',
    tagline: 'Frame Interpolation Developed for Bharatiya Antariksh Hackathon 2026',
    description:
      'AI/ML-based satellite image frame interpolation project developed for Bharatiya Antariksh Hackathon 2026. Synthesizes high-fidelity intermediate frames across sparse temporal satellite passes.',
    technologies: [
      'Python',
      'FastAPI',
      'React',
      'Vite',
      'Optical Flow',
      'Deep Learning'
    ],
    githubUrl: 'https://github.com/kartikvermagit-ds/ChronoSat-BAH2026',
    visualType: 'interpolation',
    highlights: [
      'Temporal frame interpolation synthesizing missing earth observation passes',
      'Optical flow motion vector calculation across spectral channels',
      'Deep learning texture refinement to preserve coastline & cloud fidelity',
      'Interactive timeline comparison slider with split-screen visualizer'
    ],
    metrics: [
      { label: 'Hackathon', value: 'BAH 2026' },
      { label: 'Model Core', value: 'Optical Flow + DL' },
      { label: 'Domain', value: 'Earth Observation' }
    ]
  },
  {
    id: 'hostelhub',
    number: '05',
    title: 'HOSTELHUB',
    subtitle: 'Academic Resource Sharing Platform',
    tagline: 'Collaborative Notes & CT Knowledge Distribution for Campus Students',
    description:
      'A full-stack platform for hostel students to discover, upload, bookmark, and organize academic resources, course material, class test archives, and exam preparation notes.',
    technologies: [
      'React',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Supabase',
      'PostgreSQL'
    ],
    githubUrl: 'https://github.com/kartikvermagit-ds/HostelHub',
    visualType: 'campus',
    highlights: [
      'Dedicated Class Test (CT) Zone with structured subject repositories',
      'Instant bookmarking, search filters, and fast PDF preview',
      'Community discussion threads and peer study announcements',
      'Row-level secured Supabase storage and PostgreSQL schema'
    ],
    metrics: [
      { label: 'Stack', value: 'React + Supabase' },
      { label: 'Data Model', value: 'Relational SQL' },
      { label: 'Focus', value: 'Campus Utility' }
    ]
  }
];
