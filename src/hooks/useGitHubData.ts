import { useState, useEffect } from 'react';
import { GitHubRepo } from '../types';
import fallbackData from '../data/githubCache.json';

export function useGitHubData() {
  const [repos, setRepos] = useState<GitHubRepo[]>(fallbackData as GitHubRepo[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{
    public_repos: number;
    followers: number;
    bio: string;
    avatar_url: string;
  }>({
    public_repos: 37,
    followers: 11,
    bio: 'B.Tech CSE student | Data Science learner',
    avatar_url: 'https://avatars.githubusercontent.com/u/230720139?v=4'
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHub() {
      setIsLoading(true);
      try {
        const [userRes, reposRes] = await Promise.allSettled([
          fetch('https://api.github.com/users/kartikvermagit-ds'),
          fetch('https://api.github.com/users/kartikvermagit-ds/repos?per_page=100&sort=updated')
        ]);

        if (userRes.status === 'fulfilled' && userRes.value.ok) {
          const u = await userRes.value.json();
          if (isMounted && u.public_repos !== undefined) {
            setUserProfile({
              public_repos: u.public_repos,
              followers: u.followers,
              bio: u.bio || 'B.Tech CSE student | Data Science learner',
              avatar_url: u.avatar_url
            });
          }
        }

        if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
          const raw = await reposRes.value.json();
          if (Array.isArray(raw) && isMounted) {
            const parsed: GitHubRepo[] = raw.map((r: any) => ({
              name: r.name,
              description: r.description,
              language: r.language,
              stars: r.stargazers_count,
              forks: r.forks_count,
              url: r.html_url,
              homepage: r.homepage,
              updated_at: r.updated_at
            }));
            setRepos(parsed);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Rate limit or network offline - using cached GitHub data');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchGitHub();

    return () => {
      isMounted = false;
    };
  }, []);

  return { repos, userProfile, isLoading, error };
}
