export type PathId = 'work' | 'play' | 'stack' | 'person';

export interface RouteStep {
  label: string;
  targetId: string;
  description?: string;
  isExternal?: boolean;
}

export interface PathItem {
  id: PathId;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  routeConcept: string;
  steps: RouteStep[];
  primaryTargetId: string;
  color: string;
  secondaryColor: string;
  iconName: 'Briefcase' | 'Gamepad2' | 'Cpu' | 'User';
}
