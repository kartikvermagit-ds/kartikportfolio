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
          <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800 shadow-xl relative overflow-hidden group hover:border-orange-500/40 transition-colors">
            {/* Ambient telemetry glowing curve at top of card (inspired by laptop dashboard) */}
            <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none opacity-40 overflow-hidden">
              <svg viewBox="0 0 300 60" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="amberGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#F97316" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,45 Q40,10 80,30 T160,15 T240,35 T300,20 L300,60 L0,60 Z"
                  fill="url(#amberGlow)"
                />
                <path
                  d="M0,45 Q40,10 80,30 T160,15 T240,35 T300,20"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  filter="drop-shadow(0 0 6px rgba(245, 158, 11, 0.8))"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-xs font-mono text-amber-400/90 font-semibold tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                GITHUB IDENTITY
              </span>
              <GithubIcon className="w-5 h-5 text-orange-400" />
            </div>

            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-12 h-12 rounded-full border-2 border-orange-500/50 p-0.5 bg-slate-900 shadow-[0_0_12px_rgba(249,115,22,0.3)]">
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
                  className="text-xs font-mono text-orange-400 hover:text-amber-300 transition-colors"
                >
                  @kartikvermagit-ds
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-sans mb-6 relative z-10">
              {userProfile.bio}
            </p>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center relative z-10">
              <div>
                <div className="text-lg font-heading font-black text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                  {userProfile.public_repos}
                </div>
                <div className="text-[10px] font-mono text-slate-400">Public Repos</div>
              </div>
              <div>
                <div className="text-lg font-heading font-black text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                  {userProfile.followers}
                </div>
                <div className="text-[10px] font-mono text-slate-400">Followers</div>
              </div>
              <div>
                <div className="text-lg font-heading font-black text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                  {totalStars}
                </div>
                <div className="text-[10px] font-mono text-slate-400">Stars</div>
              </div>
            </div>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="github"
              className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/25 border border-orange-400/40 relative z-10 hover:scale-[1.02]"
            >
              <span>Explore GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Language Breakdown with Glowing Warm Amber Meters */}
          <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800 hover:border-orange-500/40 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-amber-400/90 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Primary Language Distribution
              </span>
              <span className="text-[10px] font-mono text-slate-500">LIVE METRICS</span>
            </div>
            <div className="space-y-3.5">
              {languageDistribution.map((lang: { name: string; count: number; percent: number }) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-200 font-medium">{lang.name}</span>
                    <span className="text-amber-400 font-bold">{lang.count} repos ({lang.percent}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900/90 overflow-hidden border border-slate-800/80 p-[1px]">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-amber-300 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all duration-500"
                      style={{ width: `${lang.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Recently Updated Repositories Stream */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#0B1220] border border-slate-800 shadow-xl hover:border-orange-500/30 transition-colors">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-200 font-semibold uppercase">
                Recent Codebase Commits &amp; Activity
              </span>
            </div>
            <span className="text-[11px] font-mono text-amber-400/80">SORTED BY RECENT PUSH</span>
          </div>

          <div className="space-y-3">
            {repos.length === 0 ? (
              <div className="p-8 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
                <p className="text-sm font-sans text-slate-300 mb-2">
                  Project data is temporarily unavailable. Explore the verified project collection instead.
                </p>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-orange-400 hover:text-amber-300 font-semibold"
                >
                  <span>VIEW VERIFIED PROJECTS</span>
                  <span>→</span>
                </a>
              </div>
            ) : (
              repos.slice(0, 6).map((repo, idx) => (
                <a
                  key={repo.name + idx}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.12)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/25 group-hover:scale-105 transition-transform">
                      <GitCommit className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-heading font-bold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2">
                        <span>{repo.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-slate-400 font-sans line-clamp-1">
                        {repo.description || 'Verified engineering repository.'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080D16] text-amber-300 border border-orange-500/25">
                      {repo.language || 'Codebase'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : 'Active'}
                    </span>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default GitHubLiveSection;
