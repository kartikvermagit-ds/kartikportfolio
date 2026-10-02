import type { Project } from './index';

export interface ArchitectureNode {
  id: string;
  label: string;
  category: 'CLIENT' | 'API' | 'PIPELINE' | 'DATA' | 'STORAGE' | 'SECURITY';
  tech: string;
  description: string;
  connectedTo?: string[];
}

export interface InteractiveStage {
  id: string;
  step: string;
  label: string;
  description: string;
  telemetryKey?: string;
  telemetryValue?: string;
  statusLabel?: string;
}

export interface TechEcosystemItem {
  name: string;
  category: 'CORE' | 'BACKEND' | 'DATA/AI' | 'UI/MAPS' | 'INFRA' | 'STORAGE' | 'CLIENT' | 'SECURITY';
  role: string;
  highlight?: string;
}

export interface ProjectCaseStudy extends Project {
  heroTagline: string;
  domainTheme: {
    accentColor: string;
    secondaryColor: string;
    systemLabel: string;
  };
  worldConcept: {
    title: string;
    description: string;
    flow: string[];
    interactiveStages: InteractiveStage[];
  };
  architectureNodes: ArchitectureNode[];
  techEcosystem: TechEcosystemItem[];
  nextProjectId: string;
}
