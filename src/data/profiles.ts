import type { CodingPlatform } from '../types';

export const SOCIAL_LINKS = {
  name: 'Kartik Verma',
  title: 'AI • Data Science • Full-Stack Developer',
  college: 'PSIT Kanpur',
  degree: 'B.Tech Computer Science & Engineering — Data Science',
  location: 'Kanpur, Uttar Pradesh, India',
  email: 'mailto:kv5612872@gmail.com',
  github: 'https://github.com/kartikvermagit-ds',
  linkedin: 'https://www.linkedin.com/in/kartik-verma-ds/',
  leetcode: 'https://leetcode.com/u/kartik-verma_29/',
  codeforces: 'https://codeforces.com/profile/kv5612872',
  hackerrank: 'https://www.hackerrank.com/profile/kv5612872'
};

export const CODING_PLATFORMS: CodingPlatform[] = [
  {
    name: 'GitHub',
    handle: 'kartikvermagit-ds',
    url: 'https://github.com/kartikvermagit-ds',
    iconName: 'Github',
    description: 'Public source code, project repositories, full-stack systems, and hackathon build codebases.'
  },
  {
    name: 'LeetCode',
    handle: 'kartik-verma_29',
    url: 'https://leetcode.com/u/kartik-verma_29/',
    iconName: 'Code',
    description: 'Algorithmic practice and data structures implementation across arrays, trees, graphs, and dynamic programming.'
  },
  {
    name: 'Codeforces',
    handle: 'kv5612872',
    url: 'https://codeforces.com/profile/kv5612872',
    iconName: 'Terminal',
    description: 'Competitive programming rounds and fast mathematical problem resolution under time constraints.'
  },
  {
    name: 'HackerRank',
    handle: 'kv5612872',
    url: 'https://www.hackerrank.com/profile/kv5612872',
    iconName: 'Award',
    description: 'Problem solving challenges, language evaluation exercises, and 24-hour hackathon build sprints.'
  }
];

export const CURRENTLY_BUILDING = [
  {
    topic: 'AI-POWERED APPLICATIONS',
    status: 'ACTIVE',
    detail: 'Grounded intelligence pipelines, LLM verification agents, and structured document parsing.'
  },
  {
    topic: 'DATA SCIENCE & GEOSPATIAL',
    status: 'ACTIVE',
    detail: 'Satellite thermal anomaly clustering, atmospheric correlation, and geospatial coordinate mapping.'
  },
  {
    topic: 'FULL-STACK SYSTEMS',
    status: 'DEVELOPING',
    detail: 'FastAPI asynchronous backends paired with modular React interfaces and Supabase PostgreSQL.'
  },
  {
    topic: 'DSA & COMPETITIVE PROGRAMMING',
    status: 'CONTINUOUS',
    detail: 'Algorithmic pattern refinement across graphs, dynamic programming tables, and binary trees.'
  },
  {
    topic: 'EXPERIMENTAL BUILDS',
    status: 'EXPLORING',
    detail: 'Offline Windows productivity tools, desktop Electron auditing systems, and rapid prototype validation.'
  }
];
