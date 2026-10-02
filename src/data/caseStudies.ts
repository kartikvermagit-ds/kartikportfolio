import type { ProjectCaseStudy } from '../types/caseStudy';
import { FLAGSHIP_PROJECTS } from './projects';

export const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    ...FLAGSHIP_PROJECTS[0],
    heroTagline: 'AI-Powered Satellite Thermal Intelligence & Incident Monitoring',
    domainTheme: {
      accentColor: '#3B82F6',
      secondaryColor: '#60A5FA',
      systemLabel: 'GEOSPATIAL TELEMETRY'
    },
    worldConcept: {
      title: 'SATELLITE INTELLIGENCE NETWORK',
      description:
        'Continuous orbital telemetry stream ingesting thermal radiation observations from MODIS & VIIRS instruments, correlating anomalies with atmospheric vectors across the Indian subcontinent.',
      flow: [
        'SATELLITE DATA',
        'THERMAL SIGNAL',
        'GEOSPATIAL ANALYSIS',
        'HISTORICAL BEHAVIOR',
        'INTELLIGENCE'
      ],
      interactiveStages: [
        {
          id: 'pyr-stage-1',
          step: '01',
          label: 'SATELLITE DATA',
          description:
            'Polls NASA FIRMS active fire telemetry feeds (MODIS and VIIRS Terra/Aqua sensors) across geographic bounding boxes.',
          telemetryKey: 'SENSOR INGESTION',
          telemetryValue: 'MODIS / VIIRS Terra-Aqua',
          statusLabel: 'ORBITAL STREAM'
        },
        {
          id: 'pyr-stage-2',
          step: '02',
          label: 'THERMAL SIGNAL',
          description:
            'Parses brightness temperature, radiative power (FRP), and scan angles to filter sensor noise from active thermal signatures.',
          telemetryKey: 'SIGNAL FILTER',
          telemetryValue: 'Kelvin > 310K Threshold',
          statusLabel: 'ANOMALY DETECTED'
        },
        {
          id: 'pyr-stage-3',
          step: '03',
          label: 'GEOSPATIAL ANALYSIS',
          description:
            'Proximity-based hotspot clustering combines adjacent high-temperature coordinate points into coherent incident polygons.',
          telemetryKey: 'CLUSTERING ALGO',
          telemetryValue: 'DBSCAN Spatial Proximity',
          statusLabel: 'HOTSPOT CLUSTERED'
        },
        {
          id: 'pyr-stage-4',
          step: '04',
          label: 'ATMOSPHERIC VECTORS',
          description:
            'Correlates thermal incident polygons with live Open-Meteo wind speed, heading, and humidity to estimate spread direction.',
          telemetryKey: 'METEOROLOGICAL INGEST',
          telemetryValue: 'Open-Meteo Vector Grid',
          statusLabel: 'VECTORS CORRELATED'
        },
        {
          id: 'pyr-stage-5',
          step: '05',
          label: 'COMMAND INTELLIGENCE',
          description:
            'Plots interactive Leaflet map layers with historical time-scrubbing to visualize incident progression and regional impact.',
          telemetryKey: 'MAP PROJECTION',
          telemetryValue: 'Leaflet Layer Dispatch',
          statusLabel: 'INCIDENT LOGGED'
        }
      ]
    },
    architectureNodes: [
      {
        id: 'pyr-arch-1',
        label: 'Client Viewport',
        category: 'CLIENT',
        tech: 'React 19 / TypeScript / Leaflet',
        description: 'Interactive map interface with incident clustering, time-series scrubbers, and hotspot filter controls.',
        connectedTo: ['pyr-arch-2']
      },
      {
        id: 'pyr-arch-2',
        label: 'Asynchronous API Gateway',
        category: 'API',
        tech: 'FastAPI / Python 3.11',
        description: 'Asynchronous endpoints serving geospatial JSON, historical query caches, and coordinate clustering endpoints.',
        connectedTo: ['pyr-arch-3', 'pyr-arch-4']
      },
      {
        id: 'pyr-arch-3',
        label: 'NASA FIRMS Connector',
        category: 'DATA',
        tech: 'REST / CSV Stream Parser',
        description: 'Automated polling worker fetching real-time thermal anomalies from NASA FIRMS satellites across South Asia.',
        connectedTo: ['pyr-arch-5']
      },
      {
        id: 'pyr-arch-4',
        label: 'Atmospheric Vector Engine',
        category: 'PIPELINE',
        tech: 'Open-Meteo Weather API',
        description: 'Fetches localized wind vectors, surface relative humidity, and temperature data to enrich thermal hotspots.',
        connectedTo: ['pyr-arch-5']
      },
      {
        id: 'pyr-arch-5',
        label: 'Spatial Index & Cache',
        category: 'STORAGE',
        tech: 'In-Memory Spatial Index',
        description: 'Clusters localized anomalies by geographic proximity and returns pre-computed GeoJSON features to the frontend.'
      }
    ],
    techEcosystem: [
      { name: 'FastAPI', category: 'BACKEND', role: 'Async REST endpoints & coordinate ingestion' },
      { name: 'Python', category: 'CORE', role: 'Telemetry clustering & mathematical correlation' },
      { name: 'React 19', category: 'CORE', role: 'High-performance reactive frontend' },
      { name: 'TypeScript', category: 'CORE', role: 'Type-safe contracts across spatial schemas' },
      { name: 'Leaflet', category: 'UI/MAPS', role: 'Interactive geospatial map & custom tile rendering' },
      { name: 'NASA FIRMS API', category: 'DATA/AI', role: 'MODIS/VIIRS thermal anomaly observations' },
      { name: 'Open-Meteo', category: 'DATA/AI', role: 'Atmospheric wind vector & humidity parameters' },
      { name: 'Vercel + Render', category: 'INFRA', role: 'Production hosting & async worker deployment' }
    ],
    nextProjectId: 'veridexa'
  },
  {
    ...FLAGSHIP_PROJECTS[1],
    heroTagline: 'Industrial Specification Grounding & Evidence-Based Document Intelligence',
    domainTheme: {
      accentColor: '#8B5CF6',
      secondaryColor: '#A78BFA',
      systemLabel: 'DOCUMENT GROUNDING'
    },
    worldConcept: {
      title: 'DOCUMENT INTELLIGENCE PIPELINE',
      description:
        'Multi-stage verification pipeline transforming complex technical PDF datasheets into schema-validated, coordinate-cited product intelligence without LLM hallucination.',
      flow: [
        'PDF',
        'EXTRACTION',
        'VALIDATION',
        'CONFLICT DETECTION',
        'EVIDENCE',
        'AI ENRICHMENT',
        'PRODUCT INTELLIGENCE'
      ],
      interactiveStages: [
        {
          id: 'ver-stage-1',
          step: '01',
          label: 'PDF INGESTION',
          description:
            'Accepts industrial equipment datasheets and multi-page engineering component catalogues.',
          telemetryKey: 'DOCUMENT FORMAT',
          telemetryValue: 'Raw PDF Datasheet',
          statusLabel: 'INGESTED'
        },
        {
          id: 'ver-stage-2',
          step: '02',
          label: 'LAYOUT EXTRACTION',
          description:
            'Detects table boundaries, header blocks, and text paragraphs while recording exact page bounding-box coordinates.',
          telemetryKey: 'BOUNDING BOXES',
          telemetryValue: 'PyMuPDF Layout Coordinates',
          statusLabel: 'TABLES DETECTED'
        },
        {
          id: 'ver-stage-3',
          step: '03',
          label: 'UNIT NORMALIZATION',
          description:
            'Converts disparate engineering units (psi to bar, Celsius to Kelvin, Watts to HP) into unified standard schemas.',
          telemetryKey: 'UNIT STANDARD',
          telemetryValue: 'Deterministic Conversion Table',
          statusLabel: 'NORMALIZED'
        },
        {
          id: 'ver-stage-4',
          step: '04',
          label: 'CONFLICT DETECTION',
          description:
            'Executes cross-field validation rules to identify physical contradictions (e.g. max operating temperature < min ambient).',
          telemetryKey: 'RULE CHECK',
          telemetryValue: 'Cross-Field Invariance Test',
          statusLabel: 'VERIFIED'
        },
        {
          id: 'ver-stage-5',
          step: '05',
          label: 'EVIDENCE CITATIONS',
          description:
            'Attaches coordinate-based citations to every extracted field, allowing auditors to inspect the exact source page highlighted.',
          telemetryKey: 'CITATION GROUNDING',
          telemetryValue: 'Page & [x, y, w, h] Coordinates',
          statusLabel: 'CITED'
        },
        {
          id: 'ver-stage-6',
          step: '06',
          label: 'SCHEMA-CONSTRAINED SUMMARY',
          description:
            'Produces validated JSON specifications ready for procurement, ERP integration, or comparative engineering evaluation.',
          telemetryKey: 'OUTPUT FORMAT',
          telemetryValue: 'Strict JSON Schema',
          statusLabel: 'EXPORT READY'
        }
      ]
    },
    architectureNodes: [
      {
        id: 'ver-arch-1',
        label: 'Audit Workbench UI',
        category: 'CLIENT',
        tech: 'React / TypeScript / PDF Viewer',
        description: 'Split-screen interface displaying source PDF alongside extracted attributes with interactive bounding-box highlights.',
        connectedTo: ['ver-arch-2']
      },
      {
        id: 'ver-arch-2',
        label: 'Pipeline Orchestrator',
        category: 'API',
        tech: 'FastAPI / Python Async',
        description: 'Coordinates asynchronous document ingestion, worker status queues, and validation state machines.',
        connectedTo: ['ver-arch-3', 'ver-arch-4']
      },
      {
        id: 'ver-arch-3',
        label: 'Layout & Text Parser',
        category: 'PIPELINE',
        tech: 'PyMuPDF / Table Extractors',
        description: 'Extracts tabular grids, key-value specification pairs, and spatial coordinates from vector and text layers.',
        connectedTo: ['ver-arch-5']
      },
      {
        id: 'ver-arch-4',
        label: 'Deterministic Validator',
        category: 'PIPELINE',
        tech: 'Python Rule Engine',
        description: 'Validates candidate attributes against physical operating boundaries, unit conversions, and cross-field logic.',
        connectedTo: ['ver-arch-5']
      },
      {
        id: 'ver-arch-5',
        label: 'Grounded Evidence Store',
        category: 'STORAGE',
        tech: 'PostgreSQL / SQLAlchemy',
        description: 'Stores verified product dossiers, rule audit trails, and document coordinate references.'
      }
    ],
    techEcosystem: [
      { name: 'FastAPI', category: 'BACKEND', role: 'Asynchronous document processing endpoints' },
      { name: 'Python', category: 'CORE', role: 'PDF parsing, unit normalization & validation logic' },
      { name: 'React', category: 'CORE', role: 'Interactive document split-view workbench' },
      { name: 'TypeScript', category: 'CORE', role: 'Schema typing for extracted technical attributes' },
      { name: 'SQLAlchemy', category: 'STORAGE', role: 'Relational specification storage & query models' },
      { name: 'PyMuPDF', category: 'DATA/AI', role: 'Document layout parsing & coordinate mapping' },
      { name: 'Tailwind CSS', category: 'UI/MAPS', role: 'Responsive inspection workbench styling' }
    ],
    nextProjectId: 'nudgekavach'
  },
  {
    ...FLAGSHIP_PROJECTS[2],
    heroTagline: 'Evidence-First Interface Manipulation Auditing & Cryptographic Tamper Trails',
    domainTheme: {
      accentColor: '#10B981',
      secondaryColor: '#34D399',
      systemLabel: 'INTERFACE AUDITING'
    },
    worldConcept: {
      title: 'OBSERVABLE INTERFACE AUDITING',
      description:
        'Passive client-side telemetry detecting observable manipulative UI scripts, timing anomalies, and DOM shifts, sealed with local cryptographic SHA-256 proof without cloud surveillance.',
      flow: [
        'BROWSER',
        'UI SIGNALS',
        'OBSERVATION',
        'EVIDENCE',
        'AUDIT RECORD'
      ],
      interactiveStages: [
        {
          id: 'nud-stage-1',
          step: '01',
          label: 'PASSIVE DOM SENSOR',
          description:
            'Continuous MutationObserver attaches to the webpage DOM without intercepting user input or injecting destructive modifications.',
          telemetryKey: 'OBSERVER HOOK',
          telemetryValue: 'window.MutationObserver',
          statusLabel: 'MONITORING'
        },
        {
          id: 'nud-stage-2',
          step: '02',
          label: 'TIMING SCRIPT ANOMALIES',
          description:
            'Detects fake urgency countdown scripts that reset on reload or manipulate remaining quantities without backend state changes.',
          telemetryKey: 'SCRIPT PATTERN',
          telemetryValue: 'Looping Timer / Reset Mutation',
          statusLabel: 'SIGNAL FLAGGED'
        },
        {
          id: 'nud-stage-3',
          step: '03',
          label: 'DIFF SNAPSHOT',
          description:
            'Captures element outerHTML snapshots and spatial bounding rects at the exact millisecond of anomalous mutation.',
          telemetryKey: 'SNAPSHOT PAYLOAD',
          telemetryValue: 'DOM Fragment + Bounding Box',
          statusLabel: 'CAPTURED'
        },
        {
          id: 'nud-stage-4',
          step: '04',
          label: 'TAMPER-PROOF CHECKSUM',
          description:
            'Generates deterministic SHA-256 cryptographic hashes from the timestamp, URL, and captured mutation payload.',
          telemetryKey: 'CRYPTO HASH',
          telemetryValue: 'SHA-256 Checksum Verification',
          statusLabel: 'SEALED'
        },
        {
          id: 'nud-stage-5',
          step: '05',
          label: 'LOCAL EVIDENCE VAULT',
          description:
            'Stores audit records exclusively on the user device via local Electron storage, ensuring total privacy with zero cloud leakage.',
          telemetryKey: 'STORAGE MODEL',
          telemetryValue: '100% Local Device Storage',
          statusLabel: 'LOGGED'
        }
      ]
    },
    architectureNodes: [
      {
        id: 'nud-arch-1',
        label: 'Chrome Extension Content Script',
        category: 'CLIENT',
        tech: 'Vanilla JS / Browser Extension API',
        description: 'Lightweight script running in isolated context observing DOM mutations, timer intervals, and element visibility changes.',
        connectedTo: ['nud-arch-2']
      },
      {
        id: 'nud-arch-2',
        label: 'Extension Background Worker',
        category: 'API',
        tech: 'Service Worker / IPC Messaging',
        description: 'Aggregates observable manipulation signals, filters duplicates, and sends evidence bundles to the desktop client.',
        connectedTo: ['nud-arch-3']
      },
      {
        id: 'nud-arch-3',
        label: 'Electron Desktop Controller',
        category: 'CLIENT',
        tech: 'Electron / Node.js',
        description: 'Desktop management console providing real-time audit logs, session replays, and regulatory report exports.',
        connectedTo: ['nud-arch-4']
      },
      {
        id: 'nud-arch-4',
        label: 'Cryptographic Hashing Core',
        category: 'SECURITY',
        tech: 'Node.js Crypto / Web Crypto API',
        description: 'Computes SHA-256 checksums over mutation records to guarantee evidence integrity for consumer audit trails.',
        connectedTo: ['nud-arch-5']
      },
      {
        id: 'nud-arch-5',
        label: 'Local Evidence Vault',
        category: 'STORAGE',
        tech: 'Local SQLite / JSON Storage',
        description: 'Offline audit store preserving verified incident logs directly on the user machine with zero external network transmission.'
      }
    ],
    techEcosystem: [
      { name: 'JavaScript', category: 'CORE', role: 'Low-overhead DOM observation & event tracking' },
      { name: 'Browser Extension API', category: 'CLIENT', role: 'Manifest V3 content scripts & background workers' },
      { name: 'Electron', category: 'CORE', role: 'Cross-platform desktop application environment' },
      { name: 'Node.js', category: 'BACKEND', role: 'File system storage & desktop process runtime' },
      { name: 'Web Crypto API', category: 'DATA/AI', role: 'SHA-256 cryptographic evidence hashing' },
      { name: 'Tailwind CSS', category: 'UI/MAPS', role: 'Dark-mode desktop auditing dashboard' }
    ],
    nextProjectId: 'chronosat'
  },
  {
    ...FLAGSHIP_PROJECTS[3],
    heroTagline: 'Temporal Satellite Image Frame Interpolation & Optical Flow Reconstruction',
    domainTheme: {
      accentColor: '#EC4899',
      secondaryColor: '#F472B6',
      systemLabel: 'TEMPORAL RECONSTRUCTION'
    },
    worldConcept: {
      title: 'TEMPORAL FRAME INTERPOLATION',
      description:
        'Optical flow motion field modeling synthesizing intermediate Earth observation frames between consecutive satellite revisit orbits for Bharatiya Antariksh Hackathon 2026.',
      flow: [
        'FRAME 01',
        'AI INTERPOLATION',
        'INTERMEDIATE FRAME',
        'FRAME 02'
      ],
      interactiveStages: [
        {
          id: 'chr-stage-1',
          step: '01',
          label: 'FRAME 01 (T0)',
          description:
            'Baseline multi-spectral satellite imagery pass captured at initial timestamp over disaster observation zone.',
          telemetryKey: 'INITIAL PASS',
          telemetryValue: 'Time T0 Spectral Band Array',
          statusLabel: 'INPUT PASS T0'
        },
        {
          id: 'chr-stage-2',
          step: '02',
          label: 'OPTICAL FLOW VECTORS',
          description:
            'Calculates dense pixel motion vectors between consecutive spectral images to track cloud velocity and surface change.',
          telemetryKey: 'VECTOR COMPUTATION',
          telemetryValue: 'Gunnar Farneback / Dense Flow',
          statusLabel: 'VECTORS COMPUTED'
        },
        {
          id: 'chr-stage-3',
          step: '03',
          label: 'SYNTHESIZED FRAME (T+Δ)',
          description:
            'Neural synthesis generates intermediate observation frames by warping spectral bands along estimated motion trajectories.',
          telemetryKey: 'INTERPOLATION STATE',
          telemetryValue: 'Synthesized T+Δ Frame (Simulation)',
          statusLabel: 'SYNTHESIS COMPLETE'
        },
        {
          id: 'chr-stage-4',
          step: '04',
          label: 'FRAME 02 (T1)',
          description:
            'Subsequent orbital pass captured after standard revisit delay (often 24–72 hours later) to verify ground-truth consistency.',
          telemetryKey: 'VERIFICATION PASS',
          telemetryValue: 'Time T1 Ground Truth Frame',
          statusLabel: 'TARGET PASS T1'
        }
      ]
    },
    architectureNodes: [
      {
        id: 'chr-arch-1',
        label: 'Temporal Scrubber UI',
        category: 'CLIENT',
        tech: 'React 19 / Vite / Canvas',
        description: 'Interactive split-screen temporal comparison slider allowing frame-by-frame scrub between real and synthesized passes.',
        connectedTo: ['chr-arch-2']
      },
      {
        id: 'chr-arch-2',
        label: 'Inference Microservice',
        category: 'API',
        tech: 'FastAPI / Python 3.11',
        description: 'Asynchronous API accepting spectral image pairs and dispatching motion calculation jobs.',
        connectedTo: ['chr-arch-3']
      },
      {
        id: 'chr-arch-3',
        label: 'Optical Flow Vector Core',
        category: 'PIPELINE',
        tech: 'OpenCV / PyTorch Motion Fields',
        description: 'Calculates forward and backward optical flow vectors across consecutive temporal passes.',
        connectedTo: ['chr-arch-4']
      },
      {
        id: 'chr-arch-4',
        label: 'Synthesis & Warping Engine',
        category: 'PIPELINE',
        tech: 'Deep Learning Frame Generator',
        description: 'Performs bidirectional pixel warping and edge refinement to suppress temporal ghosting artifacts.',
        connectedTo: ['chr-arch-5']
      },
      {
        id: 'chr-arch-5',
        label: 'Temporal Frame Registry',
        category: 'STORAGE',
        tech: 'GeoTIFF / PNG Spectral Store',
        description: 'Stores synthesized intermediate frame sequences and evaluation metrics for hackathon validation.'
      }
    ],
    techEcosystem: [
      { name: 'Python', category: 'CORE', role: 'Tensor manipulation, optical flow & model pipelines' },
      { name: 'FastAPI', category: 'BACKEND', role: 'Lightweight asynchronous inference server' },
      { name: 'React', category: 'CORE', role: 'Interactive frame comparison & scrubber UI' },
      { name: 'Vite', category: 'CORE', role: 'Fast developer server and optimized client bundle' },
      { name: 'Optical Flow', category: 'DATA/AI', role: 'Dense motion field velocity modeling' },
      { name: 'Deep Learning', category: 'DATA/AI', role: 'Intermediate spectral frame synthesis' },
      { name: 'Tailwind CSS', category: 'UI/MAPS', role: 'Responsive frame analysis interface' }
    ],
    nextProjectId: 'hostelhub'
  },
  {
    ...FLAGSHIP_PROJECTS[4],
    heroTagline: 'Collaborative Academic Resource Distribution & Class Test Repository Platform',
    domainTheme: {
      accentColor: '#F59E0B',
      secondaryColor: '#FBBF24',
      systemLabel: 'CAMPUS PLATFORM'
    },
    worldConcept: {
      title: 'DIGITAL CAMPUS KNOWLEDGE NETWORK',
      description:
        'Centralized full-stack resource management platform linking university students to subject repositories, past Class Test archives, and peer discussions with Supabase Row-Level Security.',
      flow: [
        'STUDENTS',
        'RESOURCES',
        'NOTES',
        'DISCUSSIONS',
        'ANNOUNCEMENTS',
        'BOOKMARKS'
      ],
      interactiveStages: [
        {
          id: 'hos-stage-1',
          step: '01',
          label: 'STUDENT PROFILES',
          description:
            'Authenticated student accounts mapped to branch, semester, and course subject tracks.',
          telemetryKey: 'CAMPUS IDENT',
          telemetryValue: 'Student Session / JWT',
          statusLabel: 'AUTHENTICATED'
        },
        {
          id: 'hos-stage-2',
          step: '02',
          label: 'SUBJECT ARCHIVES',
          description:
            'Categorized hierarchies for Class Tests (CTs), semester past-year papers, and lecture notes.',
          telemetryKey: 'TAXONOMY',
          telemetryValue: 'Semester / Subject Relational Schema',
          statusLabel: 'STRUCTURED'
        },
        {
          id: 'hos-stage-3',
          step: '03',
          label: 'SECURE BUCKET STORAGE',
          description:
            'Role-protected cloud bucket uploads via Supabase storage with Row-Level Security (RLS) policies.',
          telemetryKey: 'BUCKET STORAGE',
          telemetryValue: 'Supabase Storage + RLS',
          statusLabel: 'PROTECTED'
        },
        {
          id: 'hos-stage-4',
          step: '04',
          label: 'IN-BROWSER PREVIEW',
          description:
            'Inline PDF rendering and document previewing directly inside the study workspace.',
          telemetryKey: 'PREVIEW ENGINE',
          telemetryValue: 'Secure PDF Stream Ingestion',
          statusLabel: 'VIEWABLE'
        },
        {
          id: 'hos-stage-5',
          step: '05',
          label: 'PEER DISCUSSIONS',
          description:
            'Real-time student threads, announcement broadcasts, and academic bookmarking systems.',
          telemetryKey: 'COLLABORATION',
          telemetryValue: 'PostgreSQL Realtime Channels',
          statusLabel: 'SYNCHRONIZED'
        }
      ]
    },
    architectureNodes: [
      {
        id: 'hos-arch-1',
        label: 'Student Portal UI',
        category: 'CLIENT',
        tech: 'React 19 / Tailwind CSS',
        description: 'Responsive campus portal with subject navigation, CT exam filters, and bookmarking drawers.',
        connectedTo: ['hos-arch-2', 'hos-arch-3']
      },
      {
        id: 'hos-arch-2',
        label: 'Node / Express API',
        category: 'API',
        tech: 'Express / REST Endpoints',
        description: 'Backend application service handling resource indexing, metadata validation, and discussion feeds.',
        connectedTo: ['hos-arch-4']
      },
      {
        id: 'hos-arch-3',
        label: 'Supabase Auth & RLS',
        category: 'SECURITY',
        tech: 'Supabase Auth / JWT',
        description: 'Campus identity verification ensuring only authenticated students can upload or comment on resources.',
        connectedTo: ['hos-arch-5']
      },
      {
        id: 'hos-arch-4',
        label: 'Relational Database',
        category: 'STORAGE',
        tech: 'Supabase PostgreSQL',
        description: 'Relational data model structuring subjects, exams, semesters, and verified file pointers.',
        connectedTo: ['hos-arch-5']
      },
      {
        id: 'hos-arch-5',
        label: 'Cloud Document Buckets',
        category: 'STORAGE',
        tech: 'Supabase Storage Buckets',
        description: 'Object storage hosting verified lecture notes, scanned handwritten guides, and exam question archives.'
      }
    ],
    techEcosystem: [
      { name: 'React', category: 'CORE', role: 'Component-driven student application interface' },
      { name: 'Tailwind CSS', category: 'UI/MAPS', role: 'Mobile-responsive university portal design' },
      { name: 'Node.js', category: 'BACKEND', role: 'Server-side execution environment & API utilities' },
      { name: 'Express', category: 'BACKEND', role: 'RESTful API routing & resource querying' },
      { name: 'Supabase', category: 'STORAGE', role: 'Managed backend with authentication & RLS' },
      { name: 'PostgreSQL', category: 'STORAGE', role: 'Relational database schema for courses & papers' },
      { name: 'PDF.js', category: 'CLIENT', role: 'In-browser document previewing' }
    ],
    nextProjectId: 'pyravex'
  }
];
