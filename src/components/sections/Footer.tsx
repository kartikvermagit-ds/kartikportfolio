import { SOCIAL_LINKS } from '../../data/profiles';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-[#030508] text-xs font-mono text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Identity */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="text-white font-heading font-bold text-sm tracking-wide">
            KARTIK VERMA
          </div>
          <div className="text-slate-400">
            AI • Data Science • Full-Stack Developer
          </div>
        </div>

        {/* Center: Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            GitHub
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={SOCIAL_LINKS.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            LeetCode
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={SOCIAL_LINKS.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            Codeforces
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={SOCIAL_LINKS.hackerrank}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            HackerRank
          </a>
        </div>

        {/* Right: Credits & Scroll to Top */}
        <div className="flex items-center gap-4">
          <span className="text-slate-500">
            Built with React, Three.js &amp; curiosity.
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
