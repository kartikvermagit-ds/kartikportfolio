import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { MagneticButton } from '../common/MagneticButton';
import { SOCIAL_LINKS } from '../../data/profiles';

export function ContactSection() {
  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative text-center">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>COLLABORATION &amp; OPPORTUNITIES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-white tracking-tight mb-4"
        >
          Have an idea worth building?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-3xl font-heading font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 mb-10"
        >
          "Let's build something useful."
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 font-sans max-w-xl mx-auto text-base sm:text-lg mb-12 leading-relaxed"
        >
          Open to engineering collaborations, AI/data challenges, research initiatives, and hackathon project discussions.
        </motion.p>

        {/* Action Connect Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href={SOCIAL_LINKS.email} cursorType="pointer">
            <div className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-semibold tracking-wider transition-all shadow-xl shadow-blue-500/25 border border-blue-400/40 flex items-center gap-2 hover:scale-105">
              <Mail className="w-4 h-4" />
              <span>EMAIL KARTIK</span>
            </div>
          </MagneticButton>

          <MagneticButton href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" cursorType="pointer">
            <div className="px-7 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-blue-500/50 font-mono text-sm font-semibold tracking-wider transition-all flex items-center gap-2 hover:scale-105">
              <LinkedinIcon className="w-4 h-4 text-blue-400" />
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </MagneticButton>

          <MagneticButton href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" cursorType="github">
            <div className="px-7 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 font-mono text-sm font-semibold tracking-wider transition-all flex items-center gap-2 hover:scale-105">
              <GithubIcon className="w-4 h-4 text-purple-400" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
export default ContactSection;
