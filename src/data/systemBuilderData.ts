// Centralized configuration and components for Task 9: System Builder
import type {
  SystemCategory,
  SystemComponent,
  SystemPreset
} from '../types/systemBuilder';

export const CATEGORY_DEFINITIONS: {
  id: SystemCategory;
  number: string;
  label: string;
  description: string;
}[] = [
  { id: 'data-source', number: '01', label: 'DATA SOURCE', description: 'Origin of raw events, telemetry or documents' },
  { id: 'processing', number: '02', label: 'PROCESSING', description: 'Transformation, ETL and data sanitization' },
  { id: 'intelligence', number: '03', label: 'INTELLIGENCE', description: 'Heuristics, machine learning or AI models' },
  { id: 'storage', number: '04', label: 'STORAGE', description: 'Persistent state, relational tables or caches' },
  { id: 'api', number: '05', label: 'BACKEND / API', description: 'Service layer exposing queries and endpoints' },
  { id: 'frontend', number: '06', label: 'FRONTEND UI', description: 'Interactive visualization and client experience' }
];

export const SYSTEM_COMPONENTS: SystemComponent[] = [
  // 1. DATA SOURCES
  {
    id: 'src-satellite',
    name: 'Satellite Telemetry',
    category: 'data-source',
    tagline: 'Orbital Thermal & Multi-Spectral Passes',
    description: 'Continuous orbital sensor streams such as NASA FIRMS MODIS/VIIRS thermal observations or Sentinel multi-spectral swaths.',
    why: 'Provides real-time, global observation feeds without ground infrastructure constraints.',
    input: 'Orbital Sensor Scans',
    output: 'JSON GeoJSON Telemetry & Radiative Watts',
    color: '#38BDF8',
    badge: 'NASA / EO',
    usedInProjects: ['PYRAVEX', 'CHRONOSAT']
  },
  {
    id: 'src-docs',
    name: 'Unstructured Documents',
    category: 'data-source',
    tagline: 'Technical Datasheets & Engineering PDFs',
    description: 'Messy, complex multi-page industrial spec sheets, laboratory reports, and hardware documentation.',
    why: 'Real-world equipment specifications originate in human-formatted PDF catalogs rather than structured databases.',
    input: 'PDF Datasheet Files',
    output: 'Raw Text Streams & Coordinate Bounding Boxes',
    color: '#818CF8',
    badge: 'PyMuPDF / OCR',
    usedInProjects: ['VERIDEXA']
  },
  {
    id: 'src-user',
    name: 'User Inputs & CT Notes',
    category: 'data-source',
    tagline: 'Student Notes, Uploads & Query Submissions',
    description: 'Direct student interactions, handwritten note scans, Class Test question sets, and academic search queries.',
    why: 'Academic community collaboration requires fast client-side submission and file ingestion.',
    input: 'HTTP Multipart Uploads & JSON Queries',
    output: 'Raw User Payload',
    color: '#F472B6',
    badge: 'Client Stream',
    usedInProjects: ['HOSTELHUB']
  },
  {
    id: 'src-api',
    name: 'External REST Stream',
    category: 'data-source',
    tagline: 'Third-Party Meteorological & Public Feeds',
    description: 'External third-party APIs such as Open-Meteo wind vector services or laboratory verification registries.',
    why: 'Correlates primary incidents with live external environmental vectors like wind heading and humidity.',
    input: 'HTTPS REST Polling',
    output: 'Atmospheric Vector JSON',
    color: '#34D399',
    badge: 'External Feed',
    usedInProjects: ['PYRAVEX']
  },
  {
    id: 'src-csv',
    name: 'CSV / Dataset Archive',
    category: 'data-source',
    tagline: 'Tabular Historical Training & Verification Logs',
    description: 'Archived sensor logs, historical wildfire records, or bench test audit spreadsheets.',
    why: 'Benchmarking and machine learning validation require historical ground-truth training records.',
    input: 'Tabular Delimited Records',
    output: 'Dataframe Row Tuples',
    color: '#FBBF24',
    badge: 'Tabular ETL',
    usedInProjects: ['PYRAVEX', 'CHRONOSAT']
  },

  // 2. PROCESSING
  {
    id: 'proc-python',
    name: 'Python Pipeline',
    category: 'processing',
    tagline: 'Vector Math, Spectral Normalization & ETL',
    description: 'NumPy and Pandas pipelines computing coordinate math, spatial re-projections, and sensor noise suppression.',
    why: 'Python offers unmatched scientific libraries for multi-band image parsing, geospatial clipping, and numerical arrays.',
    input: 'Raw Telemetry & File Streams',
    output: 'Sanitized Tensor Arrays & Clean Entities',
    color: '#60A5FA',
    badge: 'NumPy / Pandas',
    usedInProjects: ['PYRAVEX', 'CHRONOSAT', 'VERIDEXA']
  },
  {
    id: 'proc-fastapi',
    name: 'FastAPI Worker',
    category: 'processing',
    tagline: 'Asynchronous Python Microservice Workers',
    description: 'Async task queues executing non-blocking coordinate distance clustering and normalization.',
    why: 'Enables high-throughput concurrency while running heavy analytical Python code in background threads.',
    input: 'Async Event Stream',
    output: 'Validated Pydantic Models',
    color: '#34D399',
    badge: 'Async ASGI',
    usedInProjects: ['PYRAVEX', 'VERIDEXA']
  },
  {
    id: 'proc-node',
    name: 'Node.js Runtime',
    category: 'processing',
    tagline: 'Lightweight Event-Driven I/O Pipeline',
    description: 'Non-blocking JavaScript runtime parsing user authentication headers and streaming file chunk uploads.',
    why: 'Exceptional throughput for low-latency JSON payload normalization and socket multiplexing.',
    input: 'Incoming Network Request Stream',
    output: 'Parsed Data Objects',
    color: '#4ADE80',
    badge: 'Event Loop',
    usedInProjects: ['HOSTELHUB']
  },
  {
    id: 'proc-pipeline',
    name: 'Spectral Normalizer',
    category: 'processing',
    tagline: 'Multi-Band Optical Contrast & Alignment',
    description: 'Warping, cloud-masking, and band-ratio normalization across satellite sensor spectrums.',
    why: 'Compensates for sensor differences between consecutive orbital passes to allow accurate mathematical comparison.',
    input: 'Multi-Spectral Rasters',
    output: 'Normalized Reflectance Grids',
    color: '#C084FC',
    badge: 'Computer Vision',
    usedInProjects: ['CHRONOSAT']
  },

  // 3. INTELLIGENCE
  {
    id: 'intel-ml',
    name: 'Machine Learning Core',
    category: 'intelligence',
    tagline: 'DBSCAN Spatial Clustering & Optical Flow',
    description: 'Unsupervised geospatial clustering to identify wildfire perimeters, or dense Farneback optical flow to calculate cloud trajectories.',
    why: 'Discovers non-linear motion trajectories and spatial clusters without requiring pre-labeled training data.',
    input: 'Spatial Coordinate Point Arrays',
    output: 'Cluster Polygons & Velocity Vector Fields',
    color: '#F472B6',
    badge: 'DBSCAN / Flow',
    usedInProjects: ['PYRAVEX', 'CHRONOSAT']
  },
  {
    id: 'intel-llm',
    name: 'AI / LLM Reasoning',
    category: 'intelligence',
    tagline: 'Contextual Synthesis & Conflict Resolution',
    description: 'Large Language Models analyzing conflicting specification values, citing coordinate evidence, and drafting executive summaries.',
    why: 'Bridges unstructured human natural language nuances with explainable provenance citations.',
    input: 'Extracted Specification Tuples',
    output: 'Explainable Validation Audit Dossier',
    color: '#A78BFA',
    badge: 'LangChain / LLM',
    usedInProjects: ['VERIDEXA']
  },
  {
    id: 'intel-rules',
    name: 'Deterministic Rules Engine',
    category: 'intelligence',
    tagline: 'Strict Constraint & Unit Conversion Checks',
    description: 'Predefined physical validation heuristics (e.g. power limits, temperature thresholds, and dimensional bounds).',
    why: 'Provides 100% deterministic, zero-hallucination verification for safety-critical specification values.',
    input: 'Numeric Values & Units',
    output: 'Pass / Fail / Discrepancy Flags',
    color: '#FBBF24',
    badge: 'Heuristics',
    usedInProjects: ['VERIDEXA', 'NUDGEKAVACH']
  },
  {
    id: 'intel-analytics',
    name: 'Incident Analytics Engine',
    category: 'intelligence',
    tagline: 'Fire Radiative Power (FRP) & Wind Risk Vector',
    description: 'Mathematical correlation of thermal output with wind direction to estimate fire spread vectors.',
    why: 'Turns raw thermal Kelvin numbers into actionable operational intelligence for disaster responders.',
    input: 'Cluster Coordinates & Wind Direction',
    output: 'Spread Vector & Incident Severity Score',
    color: '#FB923C',
    badge: 'Risk Telemetry',
    usedInProjects: ['PYRAVEX']
  },

  // 4. STORAGE
  {
    id: 'store-postgres',
    name: 'PostgreSQL + PostGIS',
    category: 'storage',
    tagline: 'Relational ACID Database with Spatial Indexing',
    description: 'Battle-tested relational database storing spatial polygons, incidents, user records, and relational foreign keys.',
    why: 'PostGIS spatial indexes (R-Tree / GIST) query coordinate proximities in milliseconds.',
    input: 'SQL Relational Transactions & Polygons',
    output: 'Persistent Tables & Spatial Query Results',
    color: '#38BDF8',
    badge: 'SQL / PostGIS',
    usedInProjects: ['PYRAVEX']
  },
  {
    id: 'store-supabase',
    name: 'Supabase Database',
    category: 'storage',
    tagline: 'Hosted Postgres with Realtime & Auth',
    description: 'Managed database platform handling student account authentication, row-level security, and note record storage.',
    why: 'Combines the power of Postgres with zero-maintenance auth and instant RESTful subscriptions.',
    input: 'Authenticated Row Transactions',
    output: 'Realtime Document Streams',
    color: '#34D399',
    badge: 'Hosted Postgres',
    usedInProjects: ['HOSTELHUB']
  },
  {
    id: 'store-files',
    name: 'Object & File Storage',
    category: 'storage',
    tagline: 'Cloud Bucket Storage for PDFs & Rasters',
    description: 'Distributed storage for multi-megabyte PDF datasheets, high-res satellite TIFFs, and PDF exam sets.',
    why: 'Relational databases should store metadata; large binaries must live in optimized blob storage.',
    input: 'Binary Stream Uploads',
    output: 'Signed CDN Download URLs',
    color: '#94A3B8',
    badge: 'S3 / Blobs',
    usedInProjects: ['VERIDEXA', 'CHRONOSAT', 'HOSTELHUB']
  },
  {
    id: 'store-none',
    name: 'In-Memory Cache (Redis)',
    category: 'storage',
    tagline: 'Ephemeral Low-Latency Key-Value Buffer',
    description: 'Ultra-fast in-memory cache for live websocket state and transient thermal readings.',
    why: 'Sub-millisecond read/write speeds for ephemeral data streams that do not require disk persistence.',
    input: 'Key-Value Hashes',
    output: 'Sub-millisecond Cached Values',
    color: '#F87171',
    badge: 'In-Memory',
    usedInProjects: ['PYRAVEX Backend']
  },

  // 5. BACKEND / API
  {
    id: 'api-fastapi',
    name: 'FastAPI REST Gateway',
    category: 'api',
    tagline: 'High-Speed Asynchronous OpenAPI Backend',
    description: 'Python REST backend exposing interactive OpenAPI Swagger documentation, typed Pydantic validation, and CORS security.',
    why: 'Native async concurrency in Python with automatic validation and documentation generation.',
    input: 'Client HTTP JSON Requests',
    output: 'Strictly Typed JSON Responses',
    color: '#10B981',
    badge: 'FastAPI / ASGI',
    usedInProjects: ['PYRAVEX', 'VERIDEXA', 'CHRONOSAT']
  },
  {
    id: 'api-node',
    name: 'Express / Node API',
    category: 'api',
    tagline: 'Modular Middleware REST Service',
    description: 'Node.js REST server managing JWT session tokens, multipart file upload parsers, and campus note search queries.',
    why: 'Lightweight, huge package ecosystem, and seamless full-stack TypeScript/JavaScript integration.',
    input: 'REST Endpoint Invocations',
    output: 'JSON Responses & Auth Tokens',
    color: '#4ADE80',
    badge: 'Express.js',
    usedInProjects: ['HOSTELHUB']
  },
  {
    id: 'api-rest',
    name: 'RESTful API Gateway',
    category: 'api',
    tagline: 'Standardized Resource-Oriented Endpoints',
    description: 'Clean CRUD endpoints with HTTP status codes, rate limiting, and structured pagination.',
    why: 'Universal interoperability across mobile browsers, desktop clients, and external integrations.',
    input: 'GET / POST / PUT Requests',
    output: 'Standardized Payload Contracts',
    color: '#60A5FA',
    badge: 'REST Contract',
    usedInProjects: ['PYRAVEX', 'Task-CRUD-API']
  },

  // 6. FRONTEND UI
  {
    id: 'front-map',
    name: 'Interactive Map (Leaflet)',
    category: 'frontend',
    tagline: 'Geospatial Canvas with Coordinate Clustering',
    description: 'High-performance interactive map viewport rendering satellite thermal hotspot polygons, wind vectors, and cluster markers.',
    why: 'Critical for situational awareness; geospatial coordinates are best understood on an interactive map.',
    input: 'GeoJSON Polygon Payloads',
    output: 'Interactive GPU Map Canvas',
    color: '#38BDF8',
    badge: 'Leaflet / GIS',
    usedInProjects: ['PYRAVEX']
  },
  {
    id: 'front-dashboard',
    name: 'Auditing Dashboard',
    category: 'frontend',
    tagline: 'Split-Screen Inspection Workbench',
    description: 'Multi-column technical interface with interactive document OCR bounding boxes, specification tables, and evidence dossiers.',
    why: 'Allows human-in-the-loop reviewers to inspect extracted fields and verify evidence side-by-side.',
    input: 'Structured Entity Streams',
    output: 'Auditing Console UI',
    color: '#818CF8',
    badge: 'React / Tailwind',
    usedInProjects: ['VERIDEXA']
  },
  {
    id: 'front-react',
    name: 'React + Vite UI',
    category: 'frontend',
    tagline: 'Modular Component Architecture & State',
    description: 'Fast modern SPA powered by React hooks, Tailwind CSS, Framer Motion animations, and dark-mode technical styling.',
    why: 'Responsive component state management with lightning-fast Vite Hot Module Replacement (HMR).',
    input: 'API State Updates',
    output: 'Fluid User Experience',
    color: '#3B82F6',
    badge: 'React 19 / Vite',
    usedInProjects: ['Portfolio', 'PYRAVEX', 'VERIDEXA', 'HOSTELHUB', 'CHRONOSAT']
  },
  {
    id: 'front-slider',
    name: 'Temporal Scrubber View',
    category: 'frontend',
    tagline: 'Multi-Band Frame Timeline & Split Curtain',
    description: 'Interactive timeline scrubber and before/after comparison slider demonstrating temporal image synthesis.',
    why: 'Enables visitors to visualize satellite pass differences across 48-hour revisit blindspots.',
    input: 'Interpolated Temporal Frames',
    output: 'Draggable Scrubber Viewport',
    color: '#EC4899',
    badge: 'SVG / Canvas',
    usedInProjects: ['CHRONOSAT']
  }
];

export const SYSTEM_PRESETS: SystemPreset[] = [
  {
    id: 'preset-pyravex',
    title: 'GEOSPATIAL THERMAL MONITORING',
    subtitle: 'Autonomous Wildfire & Thermal Anomaly Detection',
    description: 'Ingests NASA FIRMS orbital satellite telemetry, clusters thermal hotspot anomalies via DBSCAN, correlates with wind vectors, and serves a live interactive map.',
    projectTag: 'PYRAVEX',
    projectUrl: '#pyravex',
    components: {
      'data-source': 'src-satellite',
      'processing': 'proc-python',
      'intelligence': 'intel-ml',
      'storage': 'store-postgres',
      'api': 'api-fastapi',
      'frontend': 'front-map'
    }
  },
  {
    id: 'preset-veridexa',
    title: 'DOCUMENT INTELLIGENCE SYSTEM',
    subtitle: 'Industrial Specification Extraction & Audit',
    description: 'Parses unstructured engineering PDF datasheets, verifies specifications against deterministic rules and third-party laboratory evidence, and exposes a split-screen audit dashboard.',
    projectTag: 'VERIDEXA',
    projectUrl: '#veridexa',
    components: {
      'data-source': 'src-docs',
      'processing': 'proc-fastapi',
      'intelligence': 'intel-rules',
      'storage': 'store-files',
      'api': 'api-fastapi',
      'frontend': 'front-dashboard'
    }
  },
  {
    id: 'preset-chronosat',
    title: 'TEMPORAL RESOLUTION TIME MACHINE',
    subtitle: 'Satellite Image Revisit Gap Interpolation',
    description: 'Normalizes multi-spectral orbital passes, calculates dense optical flow velocity fields, synthesizes missing intermediate frames, and provides an interactive comparison scrubber.',
    projectTag: 'CHRONOSAT',
    projectUrl: '#chronosat',
    components: {
      'data-source': 'src-satellite',
      'processing': 'proc-pipeline',
      'intelligence': 'intel-ml',
      'storage': 'store-files',
      'api': 'api-fastapi',
      'frontend': 'front-slider'
    }
  },
  {
    id: 'preset-hostelhub',
    title: 'CAMPUS ACADEMIC HUB',
    subtitle: 'Collaborative Notes & Exam Resource Platform',
    description: 'Accepts student Class Test question set uploads, stores metadata in Supabase with authentication rules, and presents a responsive search catalog.',
    projectTag: 'HOSTELHUB',
    projectUrl: '#hostelhub',
    components: {
      'data-source': 'src-user',
      'processing': 'proc-node',
      'intelligence': 'intel-rules',
      'storage': 'store-supabase',
      'api': 'api-node',
      'frontend': 'front-react'
    }
  }
];
