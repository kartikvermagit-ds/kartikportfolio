import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { SOCIAL_LINKS } from '../../data/profiles';

interface NavbarProps {
  scrollY: number;
}

const NAV_LINKS = [
  { name: 'ABOUT', href: '#about' },
  { name: 'WORK', href: '#work' },
  { name: 'STACK', href: '#stack' },
  { name: 'JOURNEY', href: '#journey' },
  { name: 'CONTACT', href: '#contact' },
];

export function Navbar({ scrollY }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollY > 60;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between transition-all duration-300 rounded-full px-5 py-2.5 ${
            isScrolled
              ? 'bg-[#0B1220]/80 backdrop-blur-md border border-slate-700/40 shadow-xl shadow-black/40'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Logo / Monogram */}
          <a
            href="#"
            className="flex items-center gap-2.5 group no-underline text-inherit"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-[1px] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#05070B] rounded-[7px] flex items-center justify-center font-mono font-bold text-xs text-blue-400">
                KV
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">
                KARTIK VERMA
              </span>
              <span className="text-[10px] font-mono text-slate-400 -mt-1 hidden sm:block">
                AI • DATA • SYSTEMS
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-[#111827]/40 px-3 py-1 rounded-full border border-slate-800/80">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1 text-xs font-mono font-medium text-slate-300 hover:text-white rounded-full transition-colors hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="github"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/50 rounded-full transition-all hover:border-blue-500/50"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 p-5 bg-[#0B1220]/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl z-50 flex flex-col gap-3"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-mono text-slate-200 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-slate-500">→</span>
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repositories (37+)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
export default Navbar;
