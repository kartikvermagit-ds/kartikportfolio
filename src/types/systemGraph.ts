// Type definitions for Task 11: Live System Map (Kartik System Graph)

export type NodeType = 'project' | 'technology' | 'concept' | 'tool';

export type NodeCategory =
  | 'FLAGSHIP'
  | 'LANGUAGES'
  | 'FRONTEND'
  | 'BACKEND'
  | 'DATA'
  | 'AI'
  | 'GEOSPATIAL'
  | 'SYSTEMS'
  | 'PIPELINE'
  | 'SECURITY';

export interface GraphNode {
  id: string;
  type: NodeType;
  label: string;
  sublabel?: string;
  category: NodeCategory;
  description: string;
  color: string;
  iconName?: string;
  projectId?: string; // Links to flagship project case study
  systemBuilderPresetId?: string; // Links to Task 9 System Builder preset
  techDetectiveId?: string; // Links to Task 10 Tech Stack Detective
  codeReactorTopic?: string; // Links to Task 8 Code Reactor
  metadata?: Record<string, string>;
  // Deterministic 2D canvas coordinates (normalized to 1000 x 700 viewBox)
  x: number;
  y: number;
  radius: number;
}

export type RelationshipType =
  | 'BUILT_WITH'
  | 'BACKEND_API'
  | 'FRONTEND_UI'
  | 'DATA_SOURCE'
  | 'STORAGE_ENGINE'
  | 'ALGORITHMIC_CORE'
  | 'OBSERVATION_LAYER'
  | 'VALIDATION_ENGINE'
  | 'DEPLOYED_ON'
  | 'SYSTEMS'
  | 'IMPLEMENTS_CONCEPT';

export interface GraphEdge {
  id: string;
  source: string; // node id
  target: string; // node id
  relationship: RelationshipType;
  relationshipLabel: string;
  description: string;
  isDirect: boolean;
}

export interface ProjectArchitecturePath {
  projectId: string;
  projectName: string;
  summary: string;
  pathNodeIds: string[];
}

export interface SystemGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  paths: Record<string, ProjectArchitecturePath>;
}

export type GraphFilterType = 'ALL' | 'PROJECTS' | 'TECH' | 'CONCEPTS' | 'TOOLS';
