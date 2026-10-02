import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Star, GitFork, Code, ArrowUpRight, ArrowUpDown } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { SectionHeading } from '../common/SectionHeading';
import type { GitHubRepo } from '../../types';

interface ProjectExplorerProps {
  repos: GitHubRepo[];
}

export function ProjectExplorerSection({ repos }: ProjectExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'updated' | 'stars'>('updated');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Filter out boilerplate practice items and rank meaningful repos first
  const meaningfulRepos = useMemo(() => {
    return repos.filter((r) => {
      const lower = r.name.toLowerCase();
      // Keep meaningful utilities and exclude trivial basic tutorials
      const isBoilerplate = lower.startsWith('l1_') || lower.startsWith('l2_') || lower === 'republic-dayyyyyyyyyyyy';
      return !isBoilerplate;
    });
  }, [repos]);

  // Extract unique languages
  const languages = useMemo(() => {
    const set = new Set<string>();
    meaningfulRepos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return ['ALL', ...Array.from(set)];
  }, [meaningfulRepos]);

  // Filter and sort repos
  const filteredRepos = useMemo(() => {
    let result = meaningfulRepos.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLang =
        selectedLanguage === 'ALL' || r.language === selectedLanguage;
      return matchesSearch && matchesLang;
    });

    if (sortBy === 'stars') {
      result = [...result].sort((a, b) => (b.stars || 0) - (a.stars || 0));
    } else {
      result = [...result].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }

    return result;
  }, [meaningfulRepos, searchTerm, selectedLanguage, sortBy]);

  const displayedRepos = filteredRepos.slice(0, visibleCount);

  return (
    <section id="registry" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto relative scroll-mt-24">
      {/* Standardized Section Heading */}
      <SectionHeading
        number="05 — PROJECT REGISTRY"
        tag="PUBLIC WORKSPACE ARCHIVE"
        title="Project & Tool Registry."
        subtitle="Curated public repositories including offline Windows utilities, developer tools, and domain prototypes from kartikvermagit-ds."
      />

      {/* Filter, Search, and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-8">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tools & repos (e.g. flipclock, traymio, maskmitra)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-mono bg-[#080D16] border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Sort and Language Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sort Selector */}
          <div className="flex items-center gap-1 bg-[#080D16] border border-slate-800 rounded-full px-2.5 py-1 text-xs font-mono text-slate-400">
            <ArrowUpDown className="w-3 h-3 text-blue-400" />
            <button
              type="button"
              onClick={() => setSortBy(sortBy === 'updated' ? 'stars' : 'updated')}
              className="text-slate-300 hover:text-white"
            >
              Sort: {sortBy === 'updated' ? 'Recent Push' : 'Stars'}
            </button>
          </div>

          {/* Language Pills */}
          {languages.slice(0, 5).map((lang: string) => (
            <button
              key={lang}
              type="button"
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                selectedLanguage === lang
                  ? 'bg-blue-600 text-white border border-blue-400/40'
                  : 'bg-[#080D16] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Compact Grid of Repository Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedRepos.map((repo: GitHubRepo, idx: number) => (
          <motion.div
            key={repo.name + idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 6) * 0.04 }}
            className="p-5 rounded-2xl bg-[#080D16]/90 border border-slate-800/80 hover:border-blue-500/40 hover:bg-[#0B1220] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="flex items-center gap-1.5 text-xs font-mono text-blue-400 font-bold group-hover:text-blue-300">
                  <Code className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[190px]">{repo.name}</span>
                </span>

                <div className="flex items-center gap-2">
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400/30" />
                      {repo.stars}
                    </span>
                  )}
                  {repo.forks > 0 && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <GitFork className="w-3 h-3" />
                      {repo.forks}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 font-sans line-clamp-2 leading-relaxed mb-4">
                {repo.description || 'Public engineering repository and implementation source code.'}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded bg-[#05070B] text-slate-300 border border-slate-800">
                {repo.language || 'Codebase'}
              </span>

              <div className="flex items-center gap-2">
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white p-1"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 p-1 flex items-center gap-1"
                  title="GitHub Repository"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Code</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progressive Load More / Collapse */}
      <div className="mt-8 flex justify-center gap-3">
        {visibleCount < filteredRepos.length ? (
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filteredRepos.length))}
            className="px-6 py-2.5 rounded-full bg-[#080D16] border border-slate-700 hover:border-blue-500 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-lg shadow-black/40"
          >
            Load More Repositories ({filteredRepos.length - visibleCount} remaining) ↓
          </button>
        ) : filteredRepos.length > 6 ? (
          <button
            type="button"
            onClick={() => setVisibleCount(6)}
            className="px-6 py-2.5 rounded-full bg-[#080D16] border border-slate-800 text-xs font-mono text-slate-400 hover:text-white transition-all"
          >
            Collapse Registry ↑
          </button>
        ) : null}
      </div>
    </section>
  );
}
export default ProjectExplorerSection;
