export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  positioning: string;
  problem: string;
  whatIBuilt: string;
  keySystems: string[];
  technologies: string[];
  technicalFacts: { label: string; value: string }[];
  githubUrl: string;
  liveUrl?: string;
  backendUrl?: string;
  visualType: 'satellite' | 'pipeline' | 'auditor' | 'interpolation' | 'campus';
}

export interface TechNode {
  id: string;
  name: string;
  category: 'LANGUAGES' | 'FRONTEND' | 'BACKEND' | 'DATA' | 'AI' | 'GEOSPATIAL' | 'TOOLS';
  level: string;
  description: string;
  relatedProjects: string[];
  color: string;
}

export interface ProcessStage {
  step: string;
  name: string;
  summary: string;
  detail: string;
}

export interface HackathonEvent {
  year: string;
  event: string;
  project: string;
  tag: string;
  description: string;
  highlight: string;
}

export interface CodingPlatform {
  name: string;
  handle: string;
  url: string;
  iconName: string;
  description: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  homepage: string | null;
  updated_at: string;
}
