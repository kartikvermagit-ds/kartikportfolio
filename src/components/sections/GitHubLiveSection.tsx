import { useMemo } from 'react';
import { GitCommit, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { SectionHeading } from '../common/SectionHeading';
import type { GitHubRepo } from '../../types';
import { SOCIAL_LINKS } from '../../data/profiles';

interface GitHubLiveSectionProps {
  repos: GitHubRepo[];
  userProfile: {
    public_repos: number;
    followers: number;
    bio: string;
  };
  isLoading: boolean;
}

export function GitHubLiveSection({ repos, userProfile, isLoading }: GitHubLiveSectionProps) {
  // Compute language distribution from real data
  const languageDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    let total = 0;

    repos.forEach((r) => {
      if (r.language) {
        counts[r.language] = (counts[r.language] || 0) + 1;
        total++;
      }
    });

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        percent: Math.round((count / total) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [repos]);

  // Total stars & forks across public repositories
  const totalStars = useMemo(() => repos.reduce((acc, r) => acc + (r.stars || 0), 0), [repos]);
  const totalForks = useMemo(() => repos.reduce((acc, r) => acc + (r.forks || 0), 0), [repos]);

  return (
    <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-24">
      <SectionHeading
        number="06"
        tag="LIVE CODE INTELLIGENCE"
        title="GitHub Ecosystem."
        subtitle="Live synchronization with kartikvermagit-ds verified repository telemetry."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Summary Metrics Cards */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-slate-400">GITHUB IDENTITY</span>
              <GithubIcon className="w-5 h-5 text-slate-300" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border border-blue-500/40 p-0.5 bg-slate-900">
                <img
                  src="https://avatars.githubusercontent.com/u/230720139?v=4"
                  alt="Kartik Verma"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-base font-heading font-bold text-white leading-tight">Kartik Verma</h4>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-blue-400 hover:underline"
                >
                  @kartikvermagit-ds
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-sans mb-6">
              {userProfile.bio}
            </p>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div>
                <div className="text-base font-heading font-bold text-white">{userProfile.public_repos}</div>
                <div className="text-[10px] font-mono text-slate-400">Public Repos</div>
              </div>
              <div>
                <div className="text-base font-heading font-bold text-white">{userProfile.followers}</div>
                <div className="text-[10px] font-mono text-slate-400">Followers</div>
              </div>
              <div>
                <div className="text-base font-heading font-bold text-white">{totalStars}</div>
                <div className="text-[10px] font-mono text-slate-400">Stars</div>
              </div>
            </div>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="github"
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
            >
              <span>Explore GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Language Breakdown */}
          <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800">
            <span className="text-xs font-mono text-slate-400 block mb-4 uppercase">
              Primary Language Distribution
            </span>
            <div className="space-y-3">
              {languageDistribution.map((lang: { name: string; count: number; percent: number }) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-200">{lang.name}</span>
                    <span className="text-slate-400">{lang.count} repos ({lang.percent}%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      style={{ width: `${lang.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Recently Updated Repositories Stream */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#0B1220] border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-300 font-semibold uppercase">
                Recent Codebase Commits &amp; Activity
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">SORTED BY RECENT PUSH</span>
          </div>

          <div className="space-y-3">
            {repos.slice(0, 6).map((repo, idx) => (
              <a
                key={repo.name + idx}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform">
                    <GitCommit className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-heading font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      <span>{repo.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-xs text-slate-400 font-sans line-clamp-1">
                      {repo.description || 'Verified engineering repository.'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B1220] text-slate-300 border border-slate-800">
                    {repo.language || 'Codebase'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : 'Active'}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default GitHubLiveSection;
