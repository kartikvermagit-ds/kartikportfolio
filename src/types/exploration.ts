// Type definitions for Task 12: Visitor Exploration System (KARTIK.EXPLORE)

export type ExplorationCategory = 'WORK' | 'PLAY' | 'STACK' | 'PERSON';

export interface ExplorationItem {
  id: string;
  targetId: string; // DOM element ID to scroll to
  label: string;
  sublabel: string;
  category: ExplorationCategory;
  isInteractive?: boolean;
}

export interface ExplorationMilestone {
  id: string;
  title: string;
  description: string;
  category: ExplorationCategory;
  associatedItemId?: string;
}

export interface ExplorationProgressState {
  version: number;
  discovered: Record<string, boolean>; // itemId -> boolean
  milestones: Record<string, boolean>; // milestoneId -> boolean
  firstVisitDismissed: boolean;
  uiDismissed: boolean;
  lastVisitedId: string | null;
  lastVisitedTimestamp: number;
}

export interface ExplorationCategorySummary {
  category: ExplorationCategory;
  categoryLabel: string;
  color: string;
  discoveredCount: number;
  totalCount: number;
  items: (ExplorationItem & { isDiscovered: boolean })[];
}
