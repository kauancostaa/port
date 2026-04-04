import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from './ProjectCard';
import TechFilter from './TechFilter';

export default function ProjectsGrid() {
  const ref           = useRef<HTMLElement>(null);
  const inView        = useInView(ref, { once:true, margin:'-40px' });
  const activeFilters = usePortfolioStore(s=>s.activeFilters);
  const clearFilters  = usePortfolioStore(s=>s.clearFilters);
  const { projects, filtered } = useProjects({ filters: activeFilters });

  return (
    <section id="projects" ref={ref} className="relative py-28 px-6" aria-labelledby="projects-h">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{ opacity:1, y:0 }:{}}
          transition={{ duration:.6, ease:[0.19,1,0.22,1] }} className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="label text-[var(--amber)]">02</span>
            <div className="w-8 h-px bg-[var(--amber)]" aria-hidden="true"/>
            <h2 id="projects-h" className="font-display font-bold text-3xl md:text-4xl text-[var(--white)]">O que eu construo</h2>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[var(--muted)] text-sm">Sistemas reais — não só tutoriais</p>
            <a href="https://github.com/kauancostaa" target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-[var(--muted)] hover:text-[var(--amber)] transition-colors flex items-center gap-1.5 group">
              Ver todos no GitHub
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ delay:.15 }} className="mb-8">
          <TechFilter />
        </motion.div>

        <AnimatePresence mode="wait">
          {filtered === 0 ? (
            <motion.div key="empty" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="text-center py-24">
              <p className="font-mono text-sm text-[var(--muted)] mb-3">// nenhum projeto com esses filtros</p>
              <button onClick={clearFilters} className="font-mono text-xs text-[var(--amber)] hover:underline bg-transparent border-none cursor-pointer">
                limpar filtros
              </button>
            </motion.div>
          ) : (
            <motion.div key="grid" className="grid sm:grid-cols-2 gap-4" layout>
              <AnimatePresence>
                {projects.map((p,i) => <ProjectCard key={p.id} project={p} index={i}/>)}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {activeFilters.length > 0 && filtered > 0 && (
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
            className="mt-5 font-mono text-xs text-[var(--faint)] text-center" aria-live="polite">
            // {filtered} projeto{filtered!==1?'s':''} com {activeFilters.join(' + ')}
          </motion.p>
        )}
      </div>
    </section>
  );
}
