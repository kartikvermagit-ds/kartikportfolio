import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { GithubIcon } from './Icons';
import { SOCIAL_LINKS } from '../../data/profiles';

interface NavbarProps {
  scrollY: number;
}

const NAV_LINKS = [
  { name: 'ABOUT', href: '#about' },
  { name: 'CAPABILITIES', href: '#capabilities' },
  { name: 'WORK', href: '#work' },
  { name: 'STACK', href: '#stack' },
  { name: 'JOURNEY', href: '#journey' },
  { name: 'CONTACT', href: '#contact' },
];

export function Navbar({ scrollY }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const isScrolled = scrollY > 40;

  useEffect(() => {
    const handleScrollSpy = () => {
      const sectionIds = ['contact', 'journey', 'stack', 'work', 'capabilities', 'about'];
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between transition-all duration-300 rounded-full px-5 py-2.5 pointer-events-auto ${
            isScrolled
              ? 'bg-[#080D16]/90 backdrop-blur-md border border-slate-700/40 shadow-xl shadow-black/50'
              : 'bg-[#080D16]/40 backdrop-blur-sm border border-slate-800/40'
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo / Monogram */}
          <a
            href="#"
            className="flex items-center gap-3 group no-underline text-inherit"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 via-amber-500 to-blue-600 p-[1px] flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#05070B] rounded-[7px] flex items-center justify-center font-mono font-bold text-xs text-orange-400">
                KV
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm tracking-tight text-white group-hover:text-orange-400 transition-colors">
                KARTIK VERMA
              </span>
              <span className="text-[10px] font-mono text-slate-400 -mt-1 hidden sm:block">
                AI • DATA • SYSTEMS
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-[#05070B]/60 px-2 py-1 rounded-full border border-slate-800/70">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1 text-xs font-mono font-medium rounded-full transition-all ${
                    isActive
                      ? 'text-orange-200 bg-orange-500/20 border border-orange-500/40 shadow-sm shadow-orange-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Desktop Quick Trigger for Kartik OS */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-kartik-os'))}
              aria-label="Open Kartik OS Command Center (Ctrl+K)"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 rounded-full transition-all group"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300" />
              <span className="text-[11px] text-slate-300">OS</span>
              <kbd className="px-1.5 py-0.2 rounded bg-black/60 text-[9px] text-blue-300 border border-slate-700 font-semibold">
                ⌘K
              </kbd>
            </button>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="github"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-full transition-all hover:border-orange-500/60 hover:text-orange-200"
            >
              <GithubIcon className="w-3.5 h-3.5 text-orange-400" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900/70 border border-slate-800"
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
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="md:hidden max-w-[1240px] mx-auto px-4 mt-2 pointer-events-auto"
          >
            <div className="p-5 bg-[#080D16]/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl flex flex-col gap-2">
              {/* Mobile Quick Kartik OS button */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  window.dispatchEvent(new CustomEvent('open-kartik-os'));
                }}
                className="px-3.5 py-2.5 mb-1 text-xs font-mono text-blue-300 bg-blue-950/40 hover:bg-blue-900/40 border border-blue-500/40 rounded-xl transition-colors flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold">KARTIK OS // COMMANDS</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-900/60 border border-blue-500/40 text-[10px] text-blue-300 font-bold">
                  OPEN
                </span>
              </button>

              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm font-mono text-slate-300 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-slate-600">→</span>
                </a>
              ))}
              <div className="pt-3 mt-1 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repositories</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
export default Navbar;
