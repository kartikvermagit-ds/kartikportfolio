import type { Project } from '../types';

export const FLAGSHIP_PROJECTS: Project[] = [
  {
    id: 'pyravex',
    number: '01',
    title: 'PYRAVEX',
    subtitle: 'Satellite Thermal Intelligence',
    positioning: 'Satellite thermal anomaly ingestion, geospatial clustering, and incident monitoring.',
    problem:
      'Wildfires and industrial thermal anomalies occur unpredictably across broad geographic expanses, while raw satellite telemetry is noisy, delayed, and difficult to correlate with atmospheric variables.',
    whatIBuilt:
      'Engineered an automated ingestion pipeline that polls NASA FIRMS thermal anomaly feeds, clusters localized hot spots using geospatial coordinates, correlates them with atmospheric wind/humidity from Open-Meteo, and plots incident telemetry across an interactive Leaflet map interface.',
    keySystems: [
      'NASA FIRMS Thermal Telemetry Ingestion',
      'Geospatial Proximity Hotspot Clustering',
      'Open-Meteo Atmospheric Vector Correlation',
      'Interactive Command Map with Historical Replay'
    ],
    technologies: [
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'Leaflet',
      'NASA FIRMS API',
      'Open-Meteo'
    ],
    technicalFacts: [
      { label: 'Data Sources', value: 'NASA FIRMS (MODIS / VIIRS)' },
      { label: 'Geospatial', value: 'Leaflet / OpenStreetMap' },
      { label: 'Weather Telemetry', value: 'Open-Meteo REST API' },
      { label: 'API & Processing', value: 'Python / FastAPI Async' }
    ],
    githubUrl: 'https://github.com/kartikvermagit-ds/PYRAVEX-2',
    liveUrl: 'https://pyravex-2.vercel.app/',
    backendUrl: 'https://pyravex-backend.onrender.com/',
    visualType: 'satellite'
  },
  {
    id: 'veridexa',
    number: '02',
    title: 'VERIDEXA',
    subtitle: 'Industrial Specification Grounding',
    positioning: 'Transforms unstructured industrial product spec sheets into grounded, verifiable intelligence.',
    problem:
      'Complex technical datasheets and enterprise component catalogues contain conflicting specifications, unnormalized units, and unstructured tables where standard LLM extraction frequently hallucinates values.',
    whatIBuilt:
      'Designed a multi-stage document intelligence pipeline that parses raw technical PDFs, extracts candidate schema fields, applies deterministic range and unit validation, performs cross-field conflict checks, and produces explainable evidence citations linking values back to source document coordinates.',
    keySystems: [
      'Multi-Format Document Parsing & Layout Analysis',
      'Deterministic Unit Normalization & Conflict Checks',
      'Schema-Constrained LLM Extraction',
      'Audit Verification Workbench with Coordinate Citations'
    ],
    technologies: [
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'SQLAlchemy',
      'LLM Workflows'
    ],
    technicalFacts: [
      { label: 'Document Ingest', value: 'PDF Table & Text Extraction' },
      { label: 'Validation Engine', value: 'Rule-Based Conflict Detection' },
      { label: 'Reasoning Mode', value: 'Schema-Constrained LLM Prompts' },
      { label: 'Audit Trail', value: 'Source Page & Coordinate Citations' }
    ],
    githubUrl: 'https://github.com/kartikvermagit-ds/Veridexa',
    visualType: 'pipeline'
  },
  {
    id: 'nudgekavach',
    number: '03',
    title: 'NUDGEKAVACH',
    subtitle: 'Interface Manipulation Auditing',
    positioning: 'Evidence-first browser and desktop auditing system capturing observable interface manipulation signals.',
    problem:
      'Dark patterns and deceptive UI tricks (false countdown timers, sneak-into-basket tactics, masked recurring consent) are ephemeral and vanish upon page reload, leaving consumers without verifiable evidence.',
    whatIBuilt:
      'Constructed a client-side auditing tool via a Chrome Extension and an Electron desktop app that observes DOM mutations in real time, flags anomalous UI timing scripts (such as timer resets), captures viewport diff snapshots, and creates a local, tamper-evident SHA-256 evidence trail without cloud leakage.',
    keySystems: [
      'Passive MutationObserver DOM Signal Detection',
      'Observable Behavioral Pattern Classification',
      'Deterministic Local SHA-256 Hash Generation',
      'Cross-Platform Electron Audit Management Suite'
    ],
    technologies: [
      'JavaScript',
      'Browser Extension API',
      'Electron',
      'Node.js'
    ],
    technicalFacts: [
      { label: 'Observation Layer', value: 'Browser DOM Mutation Observer' },
      { label: 'Evidence Engine', value: 'Local SHA-256 Checksums' },
      { label: 'Target Scope', value: 'Observable UI Script Mutations' },
      { label: 'Privacy Model', value: '100% Local Device Storage' }
    ],
    githubUrl: 'https://github.com/kartikvermagit-ds/NudgeKavach',
    visualType: 'auditor'
  },
  {
    id: 'chronosat',
    number: '04',
    title: 'CHRONOSAT',
    subtitle: 'Temporal Resolution Enhancement',
    positioning: 'Satellite image frame interpolation developed for Bharatiya Antariksh Hackathon 2026.',
    problem:
      'Earth observation satellites have fixed revisit schedules (often 24 to 72 hours), leaving critical temporal observation blindspots during rapid disaster progressions or weather events.',
    whatIBuilt:
      'Engineered an optical flow and deep learning frame interpolation pipeline for Bharatiya Antariksh Hackathon 2026 that models motion trajectories across consecutive spectral passes and synthesizes intermediate satellite frames to fill temporal observation gaps.',
    keySystems: [
      'Multi-Band Optical Flow Vector Calculation',
      'Deep Neural Intermediate Frame Generation',
      'Spectral Band Alignment & Edge Preservation',
      'Split-Screen Temporal Frame Scrubber UI'
    ],
    technologies: [
      'Python',
      'FastAPI',
      'React',
      'Vite',
      'Optical Flow',
      'Deep Learning'
    ],
    technicalFacts: [
      { label: 'Challenge Track', value: 'Bharatiya Antariksh Hackathon 2026' },
      { label: 'Algorithmic Core', value: 'Optical Flow Motion Vectors' },
      { label: 'Target Domain', value: 'Temporal Satellite Revisit Expansion' },
      { label: 'Interface', value: 'Interactive Frame Comparison Slider' }
    ],
    githubUrl: 'https://github.com/kartikvermagit-ds/ChronoSat-BAH2026',
    visualType: 'interpolation'
  },
  {
    id: 'hostelhub',
    number: '05',
    title: 'HOSTELHUB',
    subtitle: 'Academic Resource Distribution',
    positioning: 'Full-stack collaborative notes, Class Test (CT) archives, and academic resource platform for students.',
    problem:
      'Crucial study material, past semester Class Test (CT) question sets, and handwritten faculty notes are scattered across ephemeral chat groups and lost during exams.',
    whatIBuilt:
      'Developed a centralized full-stack resource management platform with dedicated subject repositories, structured CT exam archives, authenticated file uploads via Supabase storage, and peer study discussions.',
    keySystems: [
      'Subject-Organized Class Test (CT) Repository',
      'Relational Supabase PostgreSQL Storage Schema',
      'Role-Protected File Ingestion & PDF Previewer',
      'Real-Time Campus Announcement Channels'
    ],
    technologies: [
      'React',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Supabase',
      'PostgreSQL'
    ],
    technicalFacts: [
      { label: 'Backend Database', value: 'Supabase Managed PostgreSQL' },
      { label: 'Access Control', value: 'Row-Level Security (RLS)' },
      { label: 'File Handling', value: 'Cloud Bucket Storage & Stream Preview' },
      { label: 'Architecture', value: 'Modular React + RESTful Endpoints' }
    ],
    githubUrl: 'https://github.com/kartikvermagit-ds/HostelHub',
    visualType: 'campus'
  }
];
