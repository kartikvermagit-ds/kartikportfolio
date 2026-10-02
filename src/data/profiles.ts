import { CodingPlatform } from '../types';

export const SOCIAL_LINKS = {
  name: 'Kartik Verma',
  title: 'AI • Data Science • Full-Stack Developer',
  college: 'PSIT Kanpur',
  degree: 'B.Tech Computer Science & Engineering — Data Science',
  location: 'Kanpur, Uttar Pradesh, India',
  email: 'mailto:kartikverma.ds@gmail.com',
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
    badge: '37+ Repositories',
    description: 'Primary public source code host, open-source work, full-stack apps, and hackathon project codebases.'
  },
  {
    name: 'LeetCode',
    handle: 'kartik-verma_29',
    url: 'https://leetcode.com/u/kartik-verma_29/',
    iconName: 'Code',
    badge: 'Active Problem Solver',
    description: 'Algorithmic practice focusing on data structures, dynamic programming, trees, graphs, and two-pointer techniques.'
  },
  {
    name: 'Codeforces',
    handle: 'kv5612872',
    url: 'https://codeforces.com/profile/kv5612872',
    iconName: 'Terminal',
    badge: 'Contest Participant',
    description: 'Competitive programming rounds, fast-paced mathematical thinking, and time-constrained problem resolution.'
  },
  {
    name: 'HackerRank',
    handle: 'kv5612872',
    url: 'https://www.hackerrank.com/profile/kv5612872',
    iconName: 'Award',
    badge: 'Certified & Challenges',
    description: 'Language proficiency assessments, 24-hr build challenges (Orchestrate), and core algorithm evaluations.'
  }
];

export const CURRENTLY_BUILDING = [
  {
    topic: 'AI-Powered Applications',
    status: 'ACTIVE',
    detail: 'Grounded intelligence pipelines, LLM verification agents, and agentic tools.'
  },
  {
    topic: 'Data Science & Geospatial',
    status: 'ACTIVE',
    detail: 'Thermal anomaly detection, atmospheric correlation, and earth observation models.'
  },
  {
    topic: 'Full-Stack Distributed Systems',
    status: 'DEVELOPING',
    detail: 'FastAPI backends with reactive frontends, asynchronous queues, and PostgreSQL.'
  },
  {
    topic: 'DSA & Competitive Programming',
    status: 'CONTINUOUS',
    detail: 'Algorithmic pattern refinement across graphs, dynamic programming, and binary trees.'
  },
  {
    topic: 'Hackathon Prototypes',
    status: 'EXPLORING',
    detail: 'Rapid prototype iteration, zero-to-one problem validation under competition constraints.'
  }
];
