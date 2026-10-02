export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  backendUrl?: string;
  visualType: 'satellite' | 'pipeline' | 'auditor' | 'interpolation' | 'campus';
  highlights: string[];
  metrics?: { label: string; value: string }[];
}

export interface TechNode {
  id: string;
  name: string;
  category: 'LANGUAGES' | 'FRONTEND' | 'BACKEND' | 'DATA / CLOUD' | 'AI' | 'TOOLS';
  level: string;
  description: string;
  relatedProjects: string[];
  color: string;
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
  badge: string;
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
