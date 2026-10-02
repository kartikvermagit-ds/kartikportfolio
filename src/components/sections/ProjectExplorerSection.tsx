import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Star, GitFork, Code } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { SectionHeading } from '../common/SectionHeading';
import type { GitHubRepo } from '../../types';

interface ProjectExplorerProps {
  repos: GitHubRepo[];
}

export function ProjectExplorerSection({ repos }: ProjectExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ALL');
  const [showAll, setShowAll] = useState(false);

  // Extract unique languages
  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return ['ALL', ...Array.from(set)];
  }, [repos]);

  // Filter repos
  const filteredRepos = useMemo(() => {
    return repos.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLang =
        selectedLanguage === 'ALL' || r.language === selectedLanguage;
      return matchesSearch && matchesLang;
    });
  }, [repos, searchTerm, selectedLanguage]);

  const displayedRepos = showAll ? filteredRepos : filteredRepos.slice(0, 9);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        number="05"
        tag="REPOSITORY REGISTRY"
        title="More Projects & Tools."
        subtitle="Exploring tools, utilities, offline Windows productivity apps, and open-source experiments."
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-8">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search repositories (e.g. flipclock, traymio, maskmitra)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-mono bg-[#0B1220] border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Language Filter Tags */}
        <div className="flex flex-wrap gap-1.5 items-center">
          {languages.slice(0, 7).map((lang: string) => (
            <button
              key={lang}
              type="button"
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                selectedLanguage === lang
                  ? 'bg-blue-600 text-white border border-blue-400/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Repository Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedRepos.map((repo: GitHubRepo, idx: number) => (
          <motion.div
            key={repo.name + idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 6) * 0.05 }}
            className="p-5 rounded-2xl bg-[#0B1220]/70 border border-slate-800 hover:border-blue-500/40 hover:bg-[#0E172A] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-mono text-blue-400 font-semibold group-hover:text-blue-300">
                  <Code className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[180px]">{repo.name}</span>
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

              <p className="text-xs text-slate-400 font-sans line-clamp-3 leading-relaxed mb-4">
                {repo.description || 'Public repository source code, experiments, and engineering assets.'}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
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

      {/* Expand / Collapse Button */}
      {filteredRepos.length > 9 && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2.5 rounded-full bg-slate-900 border border-slate-700 hover:border-blue-500 text-xs font-mono text-slate-300 hover:text-white transition-all"
          >
            {showAll ? 'Show Fewer Repositories' : `Explore All ${filteredRepos.length} Repositories →`}
          </button>
        </div>
      )}
    </section>
  );
}
export default ProjectExplorerSection;
