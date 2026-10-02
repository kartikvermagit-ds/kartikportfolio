// Centralized, verified dataset for Task 11: Live System Map (Kartik System Graph)
// Every node and relationship is 100% verified from existing repository data.

import type { SystemGraphData } from '../types/systemGraph';

export const SYSTEM_GRAPH_DATA: SystemGraphData = {
  nodes: [
    // ==========================================
    // 1. FLAGSHIP PROJECTS (Major Hubs)
    // ==========================================
    {
      id: 'node-pyravex',
      type: 'project',
      label: 'PYRAVEX',
      sublabel: 'Satellite Thermal Intelligence',
      category: 'FLAGSHIP',
      description: 'Automated satellite thermal anomaly ingestion, geospatial proximity clustering, and incident monitoring over South Asia.',
      color: '#3B82F6',
      iconName: 'Globe',
      projectId: 'pyravex',
      systemBuilderPresetId: 'preset-pyravex',
      techDetectiveId: 'case-01-fastapi',
      metadata: {
        Domain: 'Geospatial Telemetry & Satellites',
        Status: 'Production Deployed',
        Frontend: 'React 19 / Leaflet',
        Backend: 'FastAPI / Python 3.11'
      },
      x: 250,
      y: 200,
      radius: 36
    },
    {
      id: 'node-veridexa',
      type: 'project',
      label: 'VERIDEXA',
      sublabel: 'Industrial Specification Grounding',
      category: 'FLAGSHIP',
      description: 'Multi-stage document intelligence pipeline transforming unstructured engineering PDF datasheets into schema-grounded specifications with coordinate citations.',
      color: '#8B5CF6',
      iconName: 'FileCheck',
      projectId: 'veridexa',
      systemBuilderPresetId: 'preset-veridexa',
      techDetectiveId: 'case-04-veridexa',
      metadata: {
        Domain: 'Document Intelligence & Invariant Rules',
        Engine: 'Rule-Based Validation & LLM Schemas',
        Backend: 'FastAPI / SQLAlchemy',
        Parser: 'PyMuPDF Layout Extractor'
      },
      x: 750,
      y: 200,
      radius: 36
    },
    {
      id: 'node-chronosat',
      type: 'project',
      label: 'CHRONOSAT',
      sublabel: 'Temporal Resolution Enhancement',
      category: 'FLAGSHIP',
      description: 'Satellite image frame interpolation system developed for Bharatiya Antariksh Hackathon 2026, modeling orbital movement vectors across revisit blindspots.',
      color: '#EC4899',
      iconName: 'Clock',
      projectId: 'chronosat',
      systemBuilderPresetId: 'preset-chronosat',
      techDetectiveId: 'case-05-chronosat',
      metadata: {
        Event: 'Bharatiya Antariksh Hackathon 2026',
        Algorithm: 'Dense Optical Flow Vector Fields',
        Interface: 'Interactive Split Temporal Slider',
        Stack: 'Python / FastAPI / Vite / React'
      },
      x: 180,
      y: 450,
      radius: 34
    },
    {
      id: 'node-hostelhub',
      type: 'project',
      label: 'HOSTELHUB',
      sublabel: 'Academic Resource Distribution',
      category: 'FLAGSHIP',
      description: 'Collaborative notes, Class Test (CT) question paper archives, and academic resource platform with Row-Level Security and bucket streaming.',
      color: '#10B981',
      iconName: 'GraduationCap',
      projectId: 'hostelhub',
      systemBuilderPresetId: 'preset-hostelhub',
      techDetectiveId: 'case-06-hostelhub',
      metadata: {
        Database: 'Supabase Managed PostgreSQL',
        Security: 'Row-Level Security (RLS) Policies',
        Storage: 'Cloud Bucket PDF Streaming',
        FullStack: 'React / Node.js / Express'
      },
      x: 820,
      y: 450,
      radius: 34
    },
    {
      id: 'node-nudgekavach',
      type: 'project',
      label: 'NUDGEKAVACH',
      sublabel: 'Interface Manipulation Auditing',
      category: 'FLAGSHIP',
      description: 'Evidence-first browser extension and Electron desktop auditing suite capturing observable deceptive UI mutations with local SHA-256 evidence logs.',
      color: '#F59E0B',
      iconName: 'ShieldAlert',
      projectId: 'nudgekavach',
      techDetectiveId: 'case-03-nudgekavach',
      metadata: {
        Observer: 'Browser DOM MutationObserver API',
        Evidence: 'Deterministic Local SHA-256 Checksums',
        Desktop: 'Cross-Platform Electron Suite',
        Privacy: '100% Local Device Storage'
      },
      x: 500,
      y: 570,
      radius: 34
    },

    // ==========================================
    // 2. CORE TECHNOLOGIES
    // ==========================================
    {
      id: 'node-python',
      type: 'technology',
      label: 'Python 3.11',
      sublabel: 'Core Scientific Language',
      category: 'LANGUAGES',
      description: 'Primary computational language for AI pipelines, spatial DBSCAN clustering, and asynchronous FastAPI microservices.',
      color: '#38BDF8',
      iconName: 'Terminal',
      techDetectiveId: 'case-01-fastapi',
      metadata: { Role: 'Core Language', Ecosystem: 'FastAPI, PyMuPDF, OpenCV, NumPy' },
      x: 500,
      y: 110,
      radius: 26
    },
    {
      id: 'node-fastapi',
      type: 'technology',
      label: 'FastAPI',
      sublabel: 'Asynchronous Web Framework',
      category: 'BACKEND',
      description: 'Asynchronous Python REST API framework with native Pydantic schema validation and OpenAPI auto-generation.',
      color: '#10B981',
      iconName: 'Zap',
      systemBuilderPresetId: 'preset-pyravex',
      techDetectiveId: 'case-01-fastapi',
      metadata: { Concurrency: 'Starlette / Uvicorn Coroutines', Validation: 'Pydantic Strict Typings' },
      x: 500,
      y: 250,
      radius: 28
    },
    {
      id: 'node-react',
      type: 'technology',
      label: 'React 19',
      sublabel: 'Component Architecture',
      category: 'FRONTEND',
      description: 'Reactive single-page application architecture with modular state hooks, custom canvas bindings, and responsive HUD telemetry.',
      color: '#38BDF8',
      iconName: 'Code2',
      metadata: { Version: 'React 19.2', Features: 'Custom Hooks, Suspense, Concurrent Mode' },
      x: 500,
      y: 390,
      radius: 28
    },
    {
      id: 'node-typescript',
      type: 'technology',
      label: 'TypeScript',
      sublabel: 'Strict Typings & Schemas',
      category: 'LANGUAGES',
      description: 'End-to-end interface contracts, spatial GeoJSON typing, and shared document extraction schemas.',
      color: '#60A5FA',
      iconName: 'FileCode',
      metadata: { Version: 'TypeScript 6.0', Benefits: 'Deterministic schema verification' },
      x: 630,
      y: 290,
      radius: 24
    },
    {
      id: 'node-leaflet',
      type: 'technology',
      label: 'Leaflet GIS',
      sublabel: 'Interactive Cartographic Maps',
      category: 'GEOSPATIAL',
      description: 'Lightweight GPU-accelerated mapping library rendering OpenStreetMap tiles and dynamic hotspot coordinate markers.',
      color: '#34D399',
      iconName: 'Map',
      techDetectiveId: 'case-02-leaflet',
      metadata: { Features: 'Tile Layer Ingestion, Hotspot Clusters, Lat/Lng Projections' },
      x: 130,
      y: 130,
      radius: 24
    },
    {
      id: 'node-supabase',
      type: 'technology',
      label: 'Supabase',
      sublabel: 'Managed PostgreSQL BaaS',
      category: 'DATA',
      description: 'Managed PostgreSQL backend with Row-Level Security (RLS), authentication policies, and cloud storage buckets.',
      color: '#10B981',
      iconName: 'Database',
      systemBuilderPresetId: 'preset-hostelhub',
      techDetectiveId: 'case-06-hostelhub',
      metadata: { Storage: 'PDF File Buckets', Security: 'Row-Level Security Policies' },
      x: 900,
      y: 530,
      radius: 24
    },
    {
      id: 'node-postgres',
      type: 'technology',
      label: 'PostgreSQL',
      sublabel: 'Relational Database',
      category: 'DATA',
      description: 'ACID relational persistence with foreign keys, schema normalization, and index optimizations.',
      color: '#60A5FA',
      iconName: 'Database',
      metadata: { Engine: 'PostgreSQL Relational Storage', Integrity: 'Referential Foreign Keys' },
      x: 770,
      y: 340,
      radius: 24
    },
    {
      id: 'node-vite',
      type: 'technology',
      label: 'Vite',
      sublabel: 'ESM Bundler & HMR',
      category: 'FRONTEND',
      description: 'High-speed ESM bundling with lightning-fast Hot Module Replacement and production chunk optimization.',
      color: '#A855F7',
      iconName: 'Layers',
      metadata: { Speed: 'Sub-second HMR', Target: 'Modern ES2022' },
      x: 320,
      y: 430,
      radius: 22
    },
    {
      id: 'node-tailwind',
      type: 'technology',
      label: 'Tailwind CSS',
      sublabel: 'Design System Tokens',
      category: 'FRONTEND',
      description: 'Utility-first CSS styling powering dark high-contrast developer interfaces and responsive layouts.',
      color: '#06B6D4',
      iconName: 'Palette',
      metadata: { Version: 'Tailwind CSS v4', Theme: 'Near-black engineering palette' },
      x: 700,
      y: 490,
      radius: 22
    },
    {
      id: 'node-nodejs',
      type: 'technology',
      label: 'Node.js',
      sublabel: 'JavaScript Server & Desktop',
      category: 'BACKEND',
      description: 'Event-driven runtime environment powering Express REST APIs and Electron desktop background processes.',
      color: '#22C55E',
      iconName: 'Server',
      metadata: { Engine: 'V8 JavaScript Engine', Use: 'Server APIs & Electron main process' },
      x: 640,
      y: 590,
      radius: 24
    },
    {
      id: 'node-electron',
      type: 'technology',
      label: 'Electron',
      sublabel: 'Cross-Platform Desktop Suite',
      category: 'SYSTEMS',
      description: 'Chromium and Node.js desktop framework executing local tamper-evident audit management workflows.',
      color: '#38BDF8',
      iconName: 'Monitor',
      techDetectiveId: 'case-03-nudgekavach',
      metadata: { Platform: 'Cross-Platform OS Process', Storage: 'Local Disk Evidence Store' },
      x: 350,
      y: 610,
      radius: 24
    },
    {
      id: 'node-mutation-observer',
      type: 'technology',
      label: 'MutationObserver API',
      sublabel: 'DOM Signal Detection',
      category: 'SYSTEMS',
      description: 'Browser API monitoring real-time DOM tree additions, removals, and script-driven timing attribute mutations.',
      color: '#F59E0B',
      iconName: 'Eye',
      techDetectiveId: 'case-03-nudgekavach',
      metadata: { Scope: 'Passive DOM Alteration Listener', Output: 'Event Node Mutex' },
      x: 480,
      y: 670,
      radius: 22
    },
    {
      id: 'node-optical-flow',
      type: 'technology',
      label: 'Optical Flow',
      sublabel: 'Motion Vector Modeling',
      category: 'AI',
      description: 'Computer vision algorithm calculating dense motion vectors between successive satellite spectral passes.',
      color: '#EC4899',
      iconName: 'Activity',
      codeReactorTopic: 'cr-04-graph',
      techDetectiveId: 'case-05-chronosat',
      metadata: { Type: 'Dense Farnebäck Velocity Field', Domain: 'Satellite Temporal Gap Interpolation' },
      x: 80,
      y: 530,
      radius: 22
    },
    {
      id: 'node-sqlalchemy',
      type: 'technology',
      label: 'SQLAlchemy',
      sublabel: 'Python SQL Toolkit & ORM',
      category: 'DATA',
      description: 'Python database persistence layer handling relational object mapping, session pooling, and transaction commits.',
      color: '#FB923C',
      iconName: 'Database',
      metadata: { Mode: 'Declarative Base Schema Model', Connection: 'Relational DB Driver' },
      x: 890,
      y: 240,
      radius: 22
    },

    // ==========================================
    // 3. ARCHITECTURAL CONCEPTS
    // ==========================================
    {
      id: 'node-concept-geospatial',
      type: 'concept',
      label: 'Geospatial DBSCAN Clustering',
      sublabel: 'Spatial Incident Aggregation',
      category: 'PIPELINE',
      description: 'Proximity-based clustering algorithm aggregating individual satellite anomaly pixels into consolidated incident polygons.',
      color: '#38BDF8',
      iconName: 'Network',
      metadata: { Algorithm: 'DBSCAN Coordinate Proximity', Threshold: 'Epsilon distance / MinPts' },
      x: 350,
      y: 290,
      radius: 18
    },
    {
      id: 'node-concept-grounding',
      type: 'concept',
      label: 'Unit Invariant Grounding',
      sublabel: 'Deterministic Validation',
      category: 'PIPELINE',
      description: 'Prevents generative AI hallucinations through mathematical unit conversion tables and physical cross-field invariance checks.',
      color: '#8B5CF6',
      iconName: 'CheckCircle2',
      codeReactorTopic: 'cr-02-stack',
      techDetectiveId: 'case-04-veridexa',
      metadata: { Protection: 'Cross-Field Invariance Rules', Citations: 'Page Bounding-Box Coordinates' },
      x: 660,
      y: 190,
      radius: 18
    },
    {
      id: 'node-concept-temporal',
      type: 'concept',
      label: 'Temporal Revisit Synthesis',
      sublabel: 'Orbital Gap Interpolation',
      category: 'AI',
      description: 'Synthesizes intermediate Earth observation frames between 24-72 hour revisit cycles using motion displacement vectors.',
      color: '#EC4899',
      iconName: 'Clock',
      metadata: { Target: 'Temporal Blindspot Expansion', Resolution: 'Synthesized intermediate timesteps' },
      x: 230,
      y: 350,
      radius: 18
    },
    {
      id: 'node-concept-sha256',
      type: 'concept',
      label: 'Local SHA-256 Audit Trail',
      sublabel: 'Tamper-Evident Evidence Vault',
      category: 'SECURITY',
      description: 'Generates deterministic cryptographic checksums of observed DOM dark patterns locally to preserve consumer evidence.',
      color: '#F59E0B',
      iconName: 'ShieldCheck',
      codeReactorTopic: 'cr-01-array',
      techDetectiveId: 'case-03-nudgekavach',
      metadata: { Cryptography: 'SHA-256 Digest Checksum', Privacy: '100% On-Device Zero Cloud Leak' },
      x: 580,
      y: 650,
      radius: 18
    },
    {
      id: 'node-concept-rls',
      type: 'concept',
      label: 'Row-Level Security (RLS)',
      sublabel: 'Database Authorization',
      category: 'SECURITY',
      description: 'Granular PostgreSQL security policies ensuring students and faculty only query and mutate authorized academic resources.',
      color: '#10B981',
      iconName: 'Lock',
      metadata: { Enforcement: 'PostgreSQL Database Engine', Policy: 'JWT UID Auth Claims' },
      x: 870,
      y: 380,
      radius: 18
    },

    // ==========================================
    // 4. VERIFIED TOOLS & INFRASTRUCTURE
    // ==========================================
    {
      id: 'node-nasa-firms',
      type: 'tool',
      label: 'NASA FIRMS API',
      sublabel: 'Orbital Telemetry Stream',
      category: 'GEOSPATIAL',
      description: 'Active thermal anomaly data feeds from MODIS and VIIRS satellite instruments aboard NASA Terra/Aqua and Suomi-NPP.',
      color: '#EF4444',
      iconName: 'Radio',
      metadata: { Instruments: 'MODIS / VIIRS Sensors', Frequency: 'Scheduled daily passes' },
      x: 100,
      y: 240,
      radius: 18
    },
    {
      id: 'node-open-meteo',
      type: 'tool',
      label: 'Open-Meteo REST API',
      sublabel: 'Atmospheric Vectors',
      category: 'GEOSPATIAL',
      description: 'High-resolution atmospheric API providing localized wind speed, wind direction heading, and relative humidity telemetry.',
      color: '#06B6D4',
      iconName: 'Wind',
      metadata: { Telemetry: 'Wind Velocity Vector Grid', Integration: 'Python REST Polling' },
      x: 230,
      y: 80,
      radius: 18
    },
    {
      id: 'node-pymupdf',
      type: 'tool',
      label: 'PyMuPDF Layout Extractor',
      sublabel: 'PDF Parsing Engine',
      category: 'AI',
      description: 'Fast PDF parsing library detecting table boundaries, header hierarchies, and exact bounding-box coordinates.',
      color: '#818CF8',
      iconName: 'FileText',
      metadata: { Extraction: 'Text Blocks, Tables & Coordinates', Output: 'Normalized Document AST' },
      x: 870,
      y: 120,
      radius: 18
    },
    {
      id: 'node-tool-vercel',
      type: 'tool',
      label: 'Vercel Edge Platform',
      sublabel: 'Client CDN Deployment',
      category: 'SYSTEMS',
      description: 'Frontend edge distribution with instant global CDN caching and preview deployment workflows.',
      color: '#F8FAFC',
      iconName: 'Cloud',
      metadata: { Deployed: 'PYRAVEX Web App & Portfolio', Protocol: 'HTTP/3 Edge Network' },
      x: 370,
      y: 90,
      radius: 16
    },
    {
      id: 'node-tool-render',
      type: 'tool',
      label: 'Render Cloud Platform',
      sublabel: 'Asynchronous API Worker Host',
      category: 'SYSTEMS',
      description: 'Containerized deployment host for asynchronous FastAPI web workers and HTTPS routing.',
      color: '#818CF8',
      iconName: 'CloudRain',
      metadata: { Deployed: 'PYRAVEX Backend Worker', Type: 'Python Web Service' },
      x: 630,
      y: 80,
      radius: 16
    },
    {
      id: 'node-tool-git',
      type: 'tool',
      label: 'Git & GitHub',
      sublabel: 'Version Control & Releases',
      category: 'SYSTEMS',
      description: 'Atomic revision control, continuous integration actions, and open-source portfolio repositories.',
      color: '#CBD5E1',
      iconName: 'GitBranch',
      metadata: { User: 'kartikvermagit-ds', Repositories: 'Public Engineering Projects' },
      x: 500,
      y: 25,
      radius: 16
    }
  ],

  // ==========================================
  // RELATIONSHIPS & EDGES
  // ==========================================
  edges: [
    // PYRAVEX Connections
    {
      id: 'e-pyr-fastapi',
      source: 'node-pyravex',
      target: 'node-fastapi',
      relationship: 'BACKEND_API',
      relationshipLabel: 'BACKEND API',
      description: 'PYRAVEX runs an asynchronous FastAPI service to ingest telemetry and serve GeoJSON endpoints.',
      isDirect: true
    },
    {
      id: 'e-pyr-python',
      source: 'node-pyravex',
      target: 'node-python',
      relationship: 'BUILT_WITH',
      relationshipLabel: 'COMPUTATIONAL CORE',
      description: 'Python powers the backend mathematical correlation, filtering, and API endpoints.',
      isDirect: true
    },
    {
      id: 'e-pyr-react',
      source: 'node-pyravex',
      target: 'node-react',
      relationship: 'FRONTEND_UI',
      relationshipLabel: 'CLIENT DASHBOARD',
      description: 'Interactive React application rendering real-time command maps and telemetry scrubbers.',
      isDirect: true
    },
    {
      id: 'e-pyr-leaflet',
      source: 'node-pyravex',
      target: 'node-leaflet',
      relationship: 'FRONTEND_UI',
      relationshipLabel: 'MAP VIEWPORT',
      description: 'Leaflet renders the OpenStreetMap cartographic canvas and anomaly hotspot clusters.',
      isDirect: true
    },
    {
      id: 'e-pyr-nasa',
      source: 'node-pyravex',
      target: 'node-nasa-firms',
      relationship: 'DATA_SOURCE',
      relationshipLabel: 'SATELLITE TELEMETRY',
      description: 'NASA FIRMS active fire sensor observations (MODIS/VIIRS) polled by automated backend workers.',
      isDirect: true
    },
    {
      id: 'e-pyr-meteo',
      source: 'node-pyravex',
      target: 'node-open-meteo',
      relationship: 'DATA_SOURCE',
      relationshipLabel: 'WEATHER VECTORS',
      description: 'Open-Meteo REST service provides live wind heading and humidity to estimate wildfire spread.',
      isDirect: true
    },
    {
      id: 'e-pyr-geospatial',
      source: 'node-pyravex',
      target: 'node-concept-geospatial',
      relationship: 'IMPLEMENTS_CONCEPT',
      relationshipLabel: 'SPATIAL CLUSTERING',
      description: 'Implements proximity-based DBSCAN spatial clustering to consolidate scattered thermal pixels.',
      isDirect: true
    },
    {
      id: 'e-pyr-vercel',
      source: 'node-pyravex',
      target: 'node-tool-vercel',
      relationship: 'DEPLOYED_ON',
      relationshipLabel: 'FRONTEND HOST',
      description: 'PYRAVEX frontend interface deployed on Vercel edge global CDN.',
      isDirect: true
    },
    {
      id: 'e-pyr-render',
      source: 'node-pyravex',
      target: 'node-tool-render',
      relationship: 'DEPLOYED_ON',
      relationshipLabel: 'API WORKER HOST',
      description: 'FastAPI async ingestion backend deployed on Render cloud services.',
      isDirect: true
    },

    // VERIDEXA Connections
    {
      id: 'e-ver-fastapi',
      source: 'node-veridexa',
      target: 'node-fastapi',
      relationship: 'BACKEND_API',
      relationshipLabel: 'SERVICE LAYER',
      description: 'FastAPI exposes endpoints for document ingestion, schema verification, and audit trails.',
      isDirect: true
    },
    {
      id: 'e-ver-python',
      source: 'node-veridexa',
      target: 'node-python',
      relationship: 'BUILT_WITH',
      relationshipLabel: 'PARSING & LOGIC',
      description: 'Python powers document layout extraction, invariance rules, and LLM prompt schemas.',
      isDirect: true
    },
    {
      id: 'e-ver-react',
      source: 'node-veridexa',
      target: 'node-react',
      relationship: 'FRONTEND_UI',
      relationshipLabel: 'AUDIT WORKBENCH',
      description: 'React powers the split-screen auditing workbench with interactive PDF bounding boxes.',
      isDirect: true
    },
    {
      id: 'e-ver-typescript',
      source: 'node-veridexa',
      target: 'node-typescript',
      relationship: 'BUILT_WITH',
      relationshipLabel: 'SCHEMA CONTRACTS',
      description: 'TypeScript enforces strict document coordinate and unit schemas across the interface.',
      isDirect: true
    },
    {
      id: 'e-ver-sqlalchemy',
      source: 'node-veridexa',
      target: 'node-sqlalchemy',
      relationship: 'STORAGE_ENGINE',
      relationshipLabel: 'ORM PERSISTENCE',
      description: 'SQLAlchemy handles relational persistence of grounded equipment specifications and citations.',
      isDirect: true
    },
    {
      id: 'e-ver-pymupdf',
      source: 'node-veridexa',
      target: 'node-pymupdf',
      relationship: 'DATA_SOURCE',
      relationshipLabel: 'PDF PARSER',
      description: 'PyMuPDF parses complex industrial PDF datasheets into layout blocks and bounding boxes.',
      isDirect: true
    },
    {
      id: 'e-ver-grounding',
      source: 'node-veridexa',
      target: 'node-concept-grounding',
      relationship: 'IMPLEMENTS_CONCEPT',
      relationshipLabel: 'INVARIANCE RULES',
      description: 'Enforces deterministic unit tables and physical cross-field checks to prevent LLM hallucinations.',
      isDirect: true
    },

    // CHRONOSAT Connections
    {
      id: 'e-chr-python',
      source: 'node-chronosat',
      target: 'node-python',
      relationship: 'BUILT_WITH',
      relationshipLabel: 'COMPUTATIONAL CORE',
      description: 'Python coordinates multi-band satellite image arrays, optical flow, and frame synthesis.',
      isDirect: true
    },
    {
      id: 'e-chr-fastapi',
      source: 'node-chronosat',
      target: 'node-fastapi',
      relationship: 'BACKEND_API',
      relationshipLabel: 'INFERENCE API',
      description: 'FastAPI serves frame generation requests and temporal timeline scrubber endpoints.',
      isDirect: true
    },
    {
      id: 'e-chr-react',
      source: 'node-chronosat',
      target: 'node-react',
      relationship: 'FRONTEND_UI',
      relationshipLabel: 'SPLIT COMPARISON UI',
      description: 'React provides the interactive split-curtain comparison viewport and frame scrubber.',
      isDirect: true
    },
    {
      id: 'e-chr-vite',
      source: 'node-chronosat',
      target: 'node-vite',
      relationship: 'FRONTEND_UI',
      relationshipLabel: 'BUILD BUNDLER',
      description: 'Vite ESM build pipeline provides instantaneous HMR and optimized assets.',
      isDirect: true
    },
    {
      id: 'e-chr-optical',
      source: 'node-chronosat',
      target: 'node-optical-flow',
      relationship: 'ALGORITHMIC_CORE',
      relationshipLabel: 'MOTION VECTORS',
      description: 'Calculates dense velocity fields between orbital revisits to synthesize intermediate frames.',
      isDirect: true
    },
    {
      id: 'e-chr-temporal',
      source: 'node-chronosat',
      target: 'node-concept-temporal',
      relationship: 'IMPLEMENTS_CONCEPT',
      relationshipLabel: 'REVISIT SYNTHESIS',
      description: 'Addresses the 24-72h satellite observation revisit blindspot for disaster monitoring.',
      isDirect: true
    },

    // HOSTELHUB Connections
    {
      id: 'e-hos-react',
      source: 'node-hostelhub',
      target: 'node-react',
      relationship: 'FRONTEND_UI',
      relationshipLabel: 'CLIENT PORTAL',
      description: 'React client UI for searching subject repositories and previewing student Class Test papers.',
      isDirect: true
    },
    {
      id: 'e-hos-tailwind',
      source: 'node-hostelhub',
      target: 'node-tailwind',
      relationship: 'FRONTEND_UI',
      relationshipLabel: 'RESPONSIVE STYLING',
      description: 'Tailwind CSS utility tokens powering the mobile-first campus catalog interface.',
      isDirect: true
    },
    {
      id: 'e-hos-supabase',
      source: 'node-hostelhub',
      target: 'node-supabase',
      relationship: 'STORAGE_ENGINE',
      relationshipLabel: 'AUTH & BUCKETS',
      description: 'Supabase provides managed authentication, session tokens, and PDF file bucket streaming.',
      isDirect: true
    },
    {
      id: 'e-hos-postgres',
      source: 'node-hostelhub',
      target: 'node-postgres',
      relationship: 'STORAGE_ENGINE',
      relationshipLabel: 'RELATIONAL TABLES',
      description: 'PostgreSQL maintains structured schemas for subjects, exam papers, and peer annotations.',
      isDirect: true
    },
    {
      id: 'e-hos-node',
      source: 'node-hostelhub',
      target: 'node-nodejs',
      relationship: 'BACKEND_API',
      relationshipLabel: 'SERVER PROCESS',
      description: 'Node.js Express runtime handling API request routing and multipart file ingestion.',
      isDirect: true
    },
    {
      id: 'e-hos-rls',
      source: 'node-hostelhub',
      target: 'node-concept-rls',
      relationship: 'IMPLEMENTS_CONCEPT',
      relationshipLabel: 'ACCESS POLICIES',
      description: 'Enforces Row-Level Security rules to guarantee authenticated student write privileges.',
      isDirect: true
    },

    // NUDGEKAVACH Connections
    {
      id: 'e-nud-electron',
      source: 'node-nudgekavach',
      target: 'node-electron',
      relationship: 'BUILT_WITH',
      relationshipLabel: 'DESKTOP APP',
      description: 'Electron provides a cross-platform desktop shell for reviewing saved audit dossiers.',
      isDirect: true
    },
    {
      id: 'e-nud-node',
      source: 'node-nudgekavach',
      target: 'node-nodejs',
      relationship: 'BUILT_WITH',
      relationshipLabel: 'DESKTOP BACKEND',
      description: 'Node.js powers the background desktop processes and file system evidence writing.',
      isDirect: true
    },
    {
      id: 'e-nud-mutation',
      source: 'node-nudgekavach',
      target: 'node-mutation-observer',
      relationship: 'OBSERVATION_LAYER',
      relationshipLabel: 'SIGNAL OBSERVER',
      description: 'MutationObserver monitors DOM mutations in real time to intercept dark pattern scripts.',
      isDirect: true
    },
    {
      id: 'e-nud-sha256',
      source: 'node-nudgekavach',
      target: 'node-concept-sha256',
      relationship: 'IMPLEMENTS_CONCEPT',
      relationshipLabel: 'TAMPER EVIDENCE',
      description: 'Hashes captured DOM mutation evidence locally with SHA-256 to guarantee legal tamper-evidence.',
      isDirect: true
    },

    // Cross-Technology Bridges
    {
      id: 'e-py-fastapi',
      source: 'node-python',
      target: 'node-fastapi',
      relationship: 'BUILT_WITH',
      relationshipLabel: 'RUNS ON',
      description: 'FastAPI runs natively on Python with async coroutines and Pydantic types.',
      isDirect: true
    },
    {
      id: 'e-py-git',
      source: 'node-python',
      target: 'node-tool-git',
      relationship: 'BUILT_WITH',
      relationshipLabel: 'VERSION CONTROL',
      description: 'All Python services and microservices version-controlled in Git repositories.',
      isDirect: true
    },
    {
      id: 'e-sup-pg',
      source: 'node-supabase',
      target: 'node-postgres',
      relationship: 'STORAGE_ENGINE',
      relationshipLabel: 'MANAGED ENGINE',
      description: 'Supabase is built directly on top of the open-source PostgreSQL relational database.',
      isDirect: true
    },
    {
      id: 'e-pg-ver',
      source: 'node-postgres',
      target: 'node-sqlalchemy',
      relationship: 'STORAGE_ENGINE',
      relationshipLabel: 'CONNECTED VIA ORM',
      description: 'SQLAlchemy communicates with PostgreSQL/SQLite instances using declarative models.',
      isDirect: true
    },
    {
      id: 'e-rea-vite',
      source: 'node-react',
      target: 'node-vite',
      relationship: 'FRONTEND_UI',
      relationshipLabel: 'BUNDLED BY',
      description: 'React applications across PYRAVEX, ChronoSat, and portfolio bundled via Vite.',
      isDirect: true
    },
    {
      id: 'e-rea-ts',
      source: 'node-react',
      target: 'node-typescript',
      relationship: 'FRONTEND_UI',
      relationshipLabel: 'TYPED COMPONENTS',
      description: 'Component props, state hooks, and API responses strictly typed with TypeScript.',
      isDirect: true
    },
    {
      id: 'e-nod-elec',
      source: 'node-nodejs',
      target: 'node-electron',
      relationship: 'SYSTEMS',
      relationshipLabel: 'MAIN PROCESS',
      description: 'Electron main process runs in a Node.js runtime environment.',
      isDirect: true
    }
  ],

  // ==========================================
  // ARCHITECTURAL DATA FLOW PATHS (Section 22)
  // ==========================================
  paths: {
    pyravex: {
      projectId: 'pyravex',
      projectName: 'PYRAVEX SATELLITE PIPELINE',
      summary: 'Orbital Telemetry Stream → DBSCAN Hotspot Clustering → Atmospheric Vector Ingestion → Leaflet Command Map',
      pathNodeIds: [
        'node-nasa-firms',
        'node-open-meteo',
        'node-concept-geospatial',
        'node-python',
        'node-fastapi',
        'node-react',
        'node-leaflet',
        'node-pyravex'
      ]
    },
    veridexa: {
      projectId: 'veridexa',
      projectName: 'VERIDEXA DOCUMENT GROUNDING',
      summary: 'PDF Table Extraction → Unit Invariant Rules → Schema-Constrained LLM → Coordinate Citations',
      pathNodeIds: [
        'node-pymupdf',
        'node-concept-grounding',
        'node-python',
        'node-fastapi',
        'node-sqlalchemy',
        'node-postgres',
        'node-typescript',
        'node-react',
        'node-veridexa'
      ]
    },
    chronosat: {
      projectId: 'chronosat',
      projectName: 'CHRONOSAT TEMPORAL SYNTHESIS',
      summary: 'Orbital Spectral Passes → Optical Flow Velocity Fields → Revisit Gap Interpolation → Split Scrubber',
      pathNodeIds: [
        'node-optical-flow',
        'node-concept-temporal',
        'node-python',
        'node-fastapi',
        'node-vite',
        'node-react',
        'node-chronosat'
      ]
    },
    nudgekavach: {
      projectId: 'nudgekavach',
      projectName: 'NUDGEKAVACH EVIDENCE TRAIL',
      summary: 'Runtime DOM MutationObserver → Pattern Classification → Local SHA-256 Hashing → Electron Audit Console',
      pathNodeIds: [
        'node-mutation-observer',
        'node-concept-sha256',
        'node-nodejs',
        'node-electron',
        'node-nudgekavach'
      ]
    },
    hostelhub: {
      projectId: 'hostelhub',
      projectName: 'HOSTELHUB ACADEMIC PLATFORM',
      summary: 'Student File Ingestion → Row-Level Security Rules → PostgreSQL Relational Tables → React Resource Catalog',
      pathNodeIds: [
        'node-supabase',
        'node-concept-rls',
        'node-postgres',
        'node-nodejs',
        'node-tailwind',
        'node-react',
        'node-hostelhub'
      ]
    }
  }
};
