// Verified case file dataset for Task 10: Tech Stack Detective (Stack Trace)
// All technologies, roles, and project architectures are 100% verified from the repository.

import type { StackCase, ConstellationNode } from '../types/techStackDetective';

export const DETECTIVE_STORAGE_KEY = 'kartik-tech-stack-detective';

export const STACK_CASES: StackCase[] = [
  {
    id: 'case-01-fastapi',
    number: '01 / 06',
    caseId: 'CASE 01',
    level: 'LEVEL 01 — FOUNDATION',
    projectId: 'pyravex',
    projectName: 'PYRAVEX',
    projectSubtitle: 'Satellite Thermal Intelligence & Incident Monitoring',
    title: 'ORBITAL INGESTION LAYER',
    question: 'Which asynchronous Python framework powers the real-time API layer and satellite telemetry ingestion endpoints?',
    type: 'IDENTIFY_TECH',
    typeLabel: 'TYPE A — IDENTIFY TECHNOLOGY',
    evidence: [
      {
        id: 'ev-01-1',
        badge: 'RUNTIME',
        label: 'Language & Async Coroutines',
        value: 'Python 3.11 Async / Await',
        detail: 'Handles high-concurrency non-blocking polling loops with Pydantic validation.'
      },
      {
        id: 'ev-01-2',
        badge: 'STREAM',
        label: 'Telemetry Source Ingestion',
        value: 'NASA FIRMS Stream Parser',
        detail: 'Polls active MODIS/VIIRS thermal anomaly feeds across South Asian bounding coordinates.'
      },
      {
        id: 'ev-01-3',
        badge: 'DISPATCH',
        label: 'Client Protocol & Output',
        value: 'GeoJSON REST Endpoints',
        detail: 'Returns pre-clustered incident polygons and fire radiative power (FRP) metrics to the frontend.'
      }
    ],
    options: [
      {
        id: 'opt-fastapi',
        text: 'FastAPI',
        subtext: 'High-performance async Python web framework with auto OpenAPI documentation',
        codeTag: 'from fastapi import FastAPI'
      },
      {
        id: 'opt-laravel',
        text: 'Laravel',
        subtext: 'PHP Model-View-Controller framework with Artisan tooling',
        codeTag: 'use Illuminate\\Support\\Facades\\Route'
      },
      {
        id: 'opt-springboot',
        text: 'Spring Boot',
        subtext: 'Java enterprise framework with inversion-of-control containers',
        codeTag: '@RestController public class Api'
      },
      {
        id: 'opt-rails',
        text: 'Ruby on Rails',
        subtext: 'Convention-over-configuration Ruby full-stack engine',
        codeTag: 'class ApiController < ApplicationController'
      }
    ],
    correctAnswerId: 'opt-fastapi',
    hints: [
      'Think of the modern asynchronous Python framework renowned for native typing, Pydantic validation, and lightning-fast JSON throughput.',
      'It leverages Starlette and Uvicorn under the hood to run async/await request handlers concurrently.'
    ],
    technology: 'FastAPI',
    role: 'Asynchronous API Gateway & Ingestion Service',
    whyItFits: 'FastAPI provides asynchronous concurrency and Pydantic validation essential for polling NASA FIRMS satellite telemetry, running spatial clustering algorithms, and returning GeoJSON endpoints to the React client with minimal latency.',
    systemBuilderPresetId: 'preset-pyravex',
    category: 'BACKEND'
  },
  {
    id: 'case-02-leaflet',
    number: '02 / 06',
    caseId: 'CASE 02',
    level: 'LEVEL 01 — FOUNDATION',
    projectId: 'pyravex',
    projectName: 'PYRAVEX',
    projectSubtitle: 'Satellite Thermal Intelligence & Incident Monitoring',
    title: 'CARTOGRAPHIC CANVAS CLIENT',
    question: 'Why was Leaflet selected as the primary map layer library in the frontend architecture?',
    type: 'IDENTIFY_ROLE',
    typeLabel: 'TYPE B — IDENTIFY ROLE',
    evidence: [
      {
        id: 'ev-02-1',
        badge: 'CANVAS',
        label: 'Cartographic Viewport',
        value: 'OpenStreetMap Tile Layer',
        detail: 'Lightweight GPU-accelerated map surface displaying regional terrain and satellite overlays.'
      },
      {
        id: 'ev-02-2',
        badge: 'TELEMETRY',
        label: 'Incident Marker Clustering',
        value: 'Spatial Hotspot Clusters',
        detail: 'Renders dynamic circular markers scaled by brightness temperature and fire radiative power.'
      },
      {
        id: 'ev-02-3',
        badge: 'TEMPORAL',
        label: 'Time-Series Scrubber',
        value: 'Historical Replay Coordinates',
        detail: 'Updates spatial feature layers dynamically as the visitor scrubs through observation dates.'
      }
    ],
    options: [
      {
        id: 'opt-map',
        text: 'Geospatial map visualization & anomaly marker clustering',
        subtext: 'Renders map tiles, geographic coordinates, and clustered hotspot polygons',
        codeTag: 'L.tileLayer(url).addTo(map)'
      },
      {
        id: 'opt-auth',
        text: 'User authentication & JWT session token rotation',
        subtext: 'Handles cryptographic token refresh and route guards',
        codeTag: 'jwt.verify(token, secret)'
      },
      {
        id: 'opt-db',
        text: 'Relational database schema migrations & B-tree indexing',
        subtext: 'Executes DDL schema changes on persistent database storage',
        codeTag: 'ALTER TABLE incidents ADD INDEX'
      },
      {
        id: 'opt-audio',
        text: 'Audio frequency synthesis & acoustic waveform modulation',
        subtext: 'Synthesizes synthetic audio tones via Web Audio API oscillators',
        codeTag: 'ctx.createOscillator()'
      }
    ],
    correctAnswerId: 'opt-map',
    hints: [
      'Notice the OpenStreetMap tile layers, marker clustering, and geographic coordinate projections.',
      'Leaflet is the premier lightweight open-source JavaScript library built specifically for mobile-friendly interactive maps.'
    ],
    technology: 'Leaflet',
    role: 'Interactive Geospatial Map Canvas & Anomaly Visualization',
    whyItFits: 'Leaflet offers a lightweight, dependency-free mapping surface that handles hundreds of dynamic anomaly coordinate markers, custom popup cards, and OpenStreetMap tiles without bogging down the browser DOM.',
    systemBuilderPresetId: 'preset-pyravex',
    category: 'GEOSPATIAL'
  },
  {
    id: 'case-03-nudgekavach',
    number: '03 / 06',
    caseId: 'CASE 03',
    level: 'LEVEL 02 — STACK DETECTION',
    projectId: 'nudgekavach',
    projectName: 'NUDGEKAVACH',
    projectSubtitle: 'Interface Manipulation Auditing & Tamper-Evident Evidence Trail',
    title: 'BROWSER SIGNAL HARVESTER',
    question: 'Which project pairs a Chrome Extension using MutationObserver with an Electron desktop app to create local SHA-256 evidence logs?',
    type: 'MATCH_PROJECT',
    typeLabel: 'TYPE C — MATCH PROJECT',
    evidence: [
      {
        id: 'ev-03-1',
        badge: 'OBSERVE',
        label: 'Runtime DOM Observer',
        value: 'MutationObserver API',
        detail: 'Monitors DOM mutations to flag ephemeral dark patterns (countdown resets, sneak-into-basket).'
      },
      {
        id: 'ev-03-2',
        badge: 'PRIVACY',
        label: 'Zero-Cloud Architecture',
        value: '100% Local Device Storage',
        detail: 'Guarantees user privacy by hashing all audit observations locally without network transmission.'
      },
      {
        id: 'ev-03-3',
        badge: 'DESKTOP',
        label: 'Cross-Platform Management',
        value: 'Electron + Node.js Shell',
        detail: 'Houses an audit management console for reviewing captured SHA-256 evidence snapshots.'
      }
    ],
    options: [
      {
        id: 'opt-nudgekavach',
        text: 'NUDGEKAVACH',
        subtext: 'Evidence-first browser & desktop interface manipulation auditing system',
        codeTag: 'new MutationObserver(callback)'
      },
      {
        id: 'opt-pyravex',
        text: 'PYRAVEX',
        subtext: 'Autonomous satellite thermal anomaly ingestion and incident monitoring',
        codeTag: 'NASA FIRMS / MODIS'
      },
      {
        id: 'opt-chronosat',
        text: 'CHRONOSAT',
        subtext: 'Satellite image frame interpolation for Bharatiya Antariksh Hackathon 2026',
        codeTag: 'Optical Flow / BAH 2026'
      },
      {
        id: 'opt-hostelhub',
        text: 'HOSTELHUB',
        subtext: 'Academic resource distribution and Class Test exam question repository',
        codeTag: 'Supabase / PostgreSQL'
      }
    ],
    correctAnswerId: 'opt-nudgekavach',
    hints: [
      'This system was engineered to expose deceptive e-commerce countdown timers and non-consensual UI manipulation.',
      'The name translates into protective shielding against behavioural "nudges".'
    ],
    technology: 'Electron & Browser Extension API',
    role: 'Client-Side Auditing & Local Tamper-Evident SHA-256 Logging',
    whyItFits: 'Because predatory UI patterns disappear the instant a page is reloaded, NudgeKavach combines the in-browser MutationObserver API with an Electron desktop audit vault, generating deterministic SHA-256 checksums of the offending scripts locally.',
    category: 'SYSTEMS'
  },
  {
    id: 'case-04-veridexa',
    number: '04 / 06',
    caseId: 'CASE 04',
    level: 'LEVEL 03 — ARCHITECTURE CLUES',
    projectId: 'veridexa',
    projectName: 'VERIDEXA',
    projectSubtitle: 'Industrial Specification Grounding & Evidence Citations',
    title: 'GROUNDING & VERIFICATION TIER',
    question: 'In Veridexa\'s document pipeline, which layer prevents hallucinated engineering values before data is stored?',
    architectureFlow: [
      'Raw PDF Datasheets',
      'PyMuPDF Layout Analysis',
      'Deterministic Unit Rules & Invariance Checks',
      'Schema-Constrained LLM Prompts',
      'Audit Coordinate Citations'
    ],
    type: 'ARCHITECTURE_CLUE',
    typeLabel: 'TYPE D — ARCHITECTURE CLUE',
    evidence: [
      {
        id: 'ev-04-1',
        badge: 'INGEST',
        label: 'Unstructured Data Source',
        value: 'Engineering PDF Datasheets',
        detail: 'Complex equipment catalogues containing conflicting tables and mixed imperial/metric units.'
      },
      {
        id: 'ev-04-2',
        badge: 'THREAT',
        label: 'LLM Generative Failure',
        value: 'Probabilistic Hallucinations',
        detail: 'Standard generative models invent tolerances and misalign technical specification columns.'
      },
      {
        id: 'ev-04-3',
        badge: 'GUARD',
        label: 'Deterministic Invariant Rules',
        value: 'Cross-Field Invariance Test',
        detail: 'Enforces physical invariants (e.g. max pressure >= min operating pressure) before DB commit.'
      }
    ],
    options: [
      {
        id: 'opt-rules',
        text: 'Deterministic Unit Normalization & Conflict Checks',
        subtext: 'Rule-based validation guarding against hallucinations using mathematical conversion tables',
        codeTag: 'validate_physical_invariance(specs)'
      },
      {
        id: 'opt-shader',
        text: 'Client WebGL Particle Shader',
        subtext: 'Hardware vertex shader animating decorative visual backdrop meshes',
        codeTag: 'gl_Position = projectionMatrix * mvPosition'
      },
      {
        id: 'opt-cdn',
        text: 'Public Edge CDN Invalidation Cache',
        subtext: 'Globally distributed edge proxy caching static compiled JavaScript assets',
        codeTag: 'Cache-Control: s-maxage=31536000'
      },
      {
        id: 'opt-dns',
        text: 'Recursive DNS Name Server',
        subtext: 'Resolves canonical domain names into IP addresses via DNS root servers',
        codeTag: 'A 192.0.2.1 IN 3600'
      }
    ],
    correctAnswerId: 'opt-rules',
    hints: [
      'Focus on the algorithmic checkpoint situated between raw layout extraction and LLM schema output.',
      'Industrial engineering requires mathematical certainty through conversion tables and invariance rules rather than probabilistic guessing.'
    ],
    technology: 'Rule-Based Validation & SQLAlchemy',
    role: 'Deterministic Verification & Unit Grounding Engine',
    whyItFits: 'Veridexa pairs schema-constrained LLMs with deterministic Python validation rules to catch hallucinations, unit discrepancies (bar vs. psi), and physical contradictions, grounding all fields with source bounding-box citations.',
    systemBuilderPresetId: 'preset-veridexa',
    category: 'AI'
  },
  {
    id: 'case-05-chronosat',
    number: '05 / 06',
    caseId: 'CASE 05',
    level: 'LEVEL 02 — STACK DETECTION',
    projectId: 'chronosat',
    projectName: 'CHRONOSAT',
    projectSubtitle: 'Temporal Resolution Enhancement & Frame Synthesis',
    title: 'ORBITAL TEMPORAL REVISIT STACK',
    question: 'Inspect the stack: Python + FastAPI + React + Vite + Optical Flow Motion Vectors. Which project does this system correspond to?',
    type: 'STACK_DETECTION',
    typeLabel: 'TYPE E — STACK DETECTION',
    evidence: [
      {
        id: 'ev-05-1',
        badge: 'CHALLENGE',
        label: 'Competition Track',
        value: 'Bharatiya Antariksh Hackathon 2026',
        detail: 'Engineered to expand temporal satellite revisit frequency across critical observation blindspots.'
      },
      {
        id: 'ev-05-2',
        badge: 'ALGORITHM',
        label: 'Algorithmic Core',
        value: 'Optical Flow Motion Vectors',
        detail: 'Calculates dense displacement fields between consecutive orbital spectral passes.'
      },
      {
        id: 'ev-05-3',
        badge: 'UI CLIENT',
        label: 'Interactive Comparison',
        value: 'Temporal Split Scrubber',
        detail: 'Permits operators to compare anchor satellite frames and synthesized intermediate frames.'
      }
    ],
    options: [
      {
        id: 'opt-chronosat',
        text: 'CHRONOSAT',
        subtext: 'Temporal resolution enhancement and frame interpolation for satellite revisits',
        codeTag: 'cv2.calcOpticalFlowFarneback()'
      },
      {
        id: 'opt-hostelhub',
        text: 'HOSTELHUB',
        subtext: 'Academic resource distribution and Class Test exam question repository',
        codeTag: 'Supabase / PostgreSQL'
      },
      {
        id: 'opt-veridexa',
        text: 'VERIDEXA',
        subtext: 'Industrial specification extraction and document audit suite',
        codeTag: 'PyMuPDF / Schema LLM'
      },
      {
        id: 'opt-nudgekavach',
        text: 'NUDGEKAVACH',
        subtext: 'Tamper-evident dark pattern detection and evidence trail',
        codeTag: 'MutationObserver / Electron'
      }
    ],
    correctAnswerId: 'opt-chronosat',
    hints: [
      'Look closely at the reference to Bharatiya Antariksh Hackathon 2026 and Earth observation satellites.',
      'The system interpolates missing timeframes between 24-72 hour satellite orbital passes.'
    ],
    technology: 'Optical Flow & Deep Learning',
    role: 'Temporal Satellite Revisit Expansion',
    whyItFits: 'ChronoSat combines OpenCV/Python optical flow calculations with deep intermediate frame synthesis to compute motion fields between consecutive satellite passes, delivered through a fast React + Vite split-screen interface.',
    systemBuilderPresetId: 'preset-chronosat',
    category: 'AI'
  },
  {
    id: 'case-06-hostelhub',
    number: '06 / 06',
    caseId: 'CASE 06',
    level: 'LEVEL 01 — FOUNDATION',
    projectId: 'hostelhub',
    projectName: 'HOSTELHUB',
    projectSubtitle: 'Academic Resource Distribution & Class Test Archive',
    title: 'RELATIONAL ACADEMIC VAULT',
    question: 'Which database and authentication infrastructure secures student Class Test (CT) question sets with Row-Level Security?',
    type: 'IDENTIFY_TECH',
    typeLabel: 'TYPE A — IDENTIFY TECHNOLOGY',
    evidence: [
      {
        id: 'ev-06-1',
        badge: 'DATABASE',
        label: 'Relational Schema',
        value: 'PostgreSQL Relational Tables',
        detail: 'Maintains structured tables for subjects, semester syllabi, and CT question papers.'
      },
      {
        id: 'ev-06-2',
        badge: 'SECURITY',
        label: 'Fine-Grained Access Control',
        value: 'Row-Level Security (RLS)',
        detail: 'Enforces table-level access rules ensuring students only mutate authorized resources.'
      },
      {
        id: 'ev-06-3',
        badge: 'STORAGE',
        label: 'Asset Storage Bucket',
        value: 'Cloud File Storage Stream',
        detail: 'Stores and streams multi-megabyte PDF notes with instant in-browser previewers.'
      }
    ],
    options: [
      {
        id: 'opt-supabase',
        text: 'Supabase (PostgreSQL with Row-Level Security)',
        subtext: 'Managed PostgreSQL with RLS, auth policies, and cloud bucket storage',
        codeTag: 'create policy "allow_auth_users" on notes'
      },
      {
        id: 'opt-firebase',
        text: 'Firebase Realtime Database (Unstructured NoSQL JSON Tree)',
        subtext: 'Document-less JSON tree storage with client-side synchronization',
        codeTag: 'firebase.database().ref("/notes")'
      },
      {
        id: 'opt-redis',
        text: 'Redis (In-Memory Key-Value Caching Store)',
        subtext: 'In-memory data structure store used for ephemeral session caches',
        codeTag: 'redisClient.set("session", token)'
      },
      {
        id: 'opt-neo4j',
        text: 'Neo4j (Cypher Graph Database Engine)',
        subtext: 'Native property graph engine for exploring node relationship links',
        codeTag: 'MATCH (s:Subject)-[:HAS_NOTE]->(n)'
      }
    ],
    correctAnswerId: 'opt-supabase',
    hints: [
      'Think of the open-source Firebase alternative built natively on top of PostgreSQL with Row-Level Security.',
      'It provides instant REST and realtime endpoints while retaining full SQL schema integrity.'
    ],
    technology: 'Supabase & PostgreSQL',
    role: 'Managed Relational Database & Row-Level Security',
    whyItFits: 'Supabase provides HostelHub with a managed PostgreSQL engine equipped with Row-Level Security (RLS) policies, built-in authentication, and scalable storage buckets for handwritten PDF documents without maintaining complex backend clusters.',
    systemBuilderPresetId: 'preset-hostelhub',
    category: 'DATA'
  }
];

// Verified Technology Constellation Nodes
export const CONSTELLATION_NODES: ConstellationNode[] = [
  {
    id: 'node-react',
    name: 'React 19',
    category: 'FRONTEND',
    color: '#38BDF8',
    description: 'Component architecture, custom hooks, and reactive telemetry viewports.',
    projects: [
      { id: 'pyravex', name: 'PYRAVEX', role: 'Interactive Satellite Command Map' },
      { id: 'veridexa', name: 'VERIDEXA', role: 'Document Audit Workbench UI' },
      { id: 'chronosat', name: 'CHRONOSAT', role: 'Temporal Frame Scrubber' },
      { id: 'hostelhub', name: 'HOSTELHUB', role: 'Academic Resource Catalog' }
    ]
  },
  {
    id: 'node-typescript',
    name: 'TypeScript',
    category: 'LANGUAGES',
    color: '#60A5FA',
    description: 'Strict type safety, shared domain schemas, and end-to-end interface contracts.',
    projects: [
      { id: 'pyravex', name: 'PYRAVEX', role: 'GeoJSON & Incident Schemas' },
      { id: 'veridexa', name: 'VERIDEXA', role: 'Document OCR Coordinate Typing' }
    ]
  },
  {
    id: 'node-python',
    name: 'Python 3.11',
    category: 'LANGUAGES',
    color: '#38BDF8',
    description: 'Primary computational language for AI pipelines, geospatial anomaly detection, and async APIs.',
    projects: [
      { id: 'pyravex', name: 'PYRAVEX', role: 'Satellite Ingestion & DBSCAN' },
      { id: 'veridexa', name: 'VERIDEXA', role: 'Layout Analysis & Invariant Rules' },
      { id: 'chronosat', name: 'CHRONOSAT', role: 'Optical Flow & Vector Modeling' }
    ]
  },
  {
    id: 'node-fastapi',
    name: 'FastAPI',
    category: 'BACKEND',
    color: '#10B981',
    description: 'High-throughput asynchronous Python web framework with auto-generated OpenAPI schemas.',
    projects: [
      { id: 'pyravex', name: 'PYRAVEX', role: 'Async Ingestion & Telemetry API' },
      { id: 'veridexa', name: 'VERIDEXA', role: 'Document Intelligence REST Service' },
      { id: 'chronosat', name: 'CHRONOSAT', role: 'Frame Synthesis Inference API' }
    ]
  },
  {
    id: 'node-leaflet',
    name: 'Leaflet',
    category: 'GEOSPATIAL',
    color: '#34D399',
    description: 'GPU-accelerated cartographic canvas with OpenStreetMap tiles and marker clustering.',
    projects: [
      { id: 'pyravex', name: 'PYRAVEX', role: 'Interactive Satellite Command Map' }
    ]
  },
  {
    id: 'node-supabase',
    name: 'Supabase',
    category: 'DATA',
    color: '#10B981',
    description: 'Managed PostgreSQL BaaS with Row-Level Security, token auth, and cloud bucket storage.',
    projects: [
      { id: 'hostelhub', name: 'HOSTELHUB', role: 'Database, Auth & File Buckets' }
    ]
  },
  {
    id: 'node-postgres',
    name: 'PostgreSQL',
    category: 'DATA',
    color: '#60A5FA',
    description: 'Robust ACID relational database with strict foreign keys, indexing, and JSONB querying.',
    projects: [
      { id: 'hostelhub', name: 'HOSTELHUB', role: 'Academic Schema & CT Archives' },
      { id: 'veridexa', name: 'VERIDEXA', role: 'SQLAlchemy Structured Catalog' }
    ]
  },
  {
    id: 'node-vite',
    name: 'Vite',
    category: 'FRONTEND',
    color: '#A855F7',
    description: 'Lightning-fast ESM build engine with instantaneous HMR and optimized production bundles.',
    projects: [
      { id: 'pyravex', name: 'PYRAVEX', role: 'Client Build Pipeline' },
      { id: 'chronosat', name: 'CHRONOSAT', role: 'Application Bundler' }
    ]
  },
  {
    id: 'node-tailwind',
    name: 'Tailwind CSS',
    category: 'FRONTEND',
    color: '#06B6D4',
    description: 'Utility-first CSS architecture with design tokens, dark mode, and responsive grids.',
    projects: [
      { id: 'hostelhub', name: 'HOSTELHUB', role: 'Modern Responsive Design' },
      { id: 'pyravex', name: 'PYRAVEX', role: 'HUD Telemetry Layout' }
    ]
  },
  {
    id: 'node-node',
    name: 'Node.js',
    category: 'BACKEND',
    color: '#22C55E',
    description: 'Event-driven JavaScript runtime powering server middleware and Electron desktop processes.',
    projects: [
      { id: 'hostelhub', name: 'HOSTELHUB', role: 'Express API Server' },
      { id: 'nudgekavach', name: 'NUDGEKAVACH', role: 'Electron Main Process' }
    ]
  },
  {
    id: 'node-electron',
    name: 'Electron',
    category: 'SYSTEMS',
    color: '#38BDF8',
    description: 'Cross-platform desktop application framework running Chromium and Node.js.',
    projects: [
      { id: 'nudgekavach', name: 'NUDGEKAVACH', role: 'Audit Management Desktop Suite' }
    ]
  },
  {
    id: 'node-mutation-observer',
    name: 'MutationObserver API',
    category: 'SYSTEMS',
    color: '#F59E0B',
    description: 'Browser API for monitoring real-time DOM tree additions, removals, and attribute alterations.',
    projects: [
      { id: 'nudgekavach', name: 'NUDGEKAVACH', role: 'Dark Pattern Detection Engine' }
    ]
  },
  {
    id: 'node-optical-flow',
    name: 'Optical Flow',
    category: 'AI',
    color: '#EC4899',
    description: 'Computer vision motion vector estimation modeling apparent movement across sequential frames.',
    projects: [
      { id: 'chronosat', name: 'CHRONOSAT', role: 'Multi-Band Orbital Motion Fields' }
    ]
  },
  {
    id: 'node-nasa-firms',
    name: 'NASA FIRMS API',
    category: 'GEOSPATIAL',
    color: '#EF4444',
    description: 'Active fire anomaly observations from MODIS and VIIRS satellite instruments.',
    projects: [
      { id: 'pyravex', name: 'PYRAVEX', role: 'Orbital Thermal Telemetry Stream' }
    ]
  },
  {
    id: 'node-open-meteo',
    name: 'Open-Meteo',
    category: 'GEOSPATIAL',
    color: '#06B6D4',
    description: 'Atmospheric weather API delivering localized wind vectors, humidity, and temperature data.',
    projects: [
      { id: 'pyravex', name: 'PYRAVEX', role: 'Atmospheric Vector Correlation' }
    ]
  }
];
