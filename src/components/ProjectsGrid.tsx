// src/components/ProjectsGrid.tsx
import { useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { PROJECTS } from '../data/projects';
import ProjectCard from './ProjectCard';
import TechFilter from './TechFilter';

export default function ProjectsGrid() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const activeFilters = usePortfolioStore((s) => s.activeFilters);

  // Filter projects by selected technologies
  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return PROJECTS;
    return PROJECTS.filter((p) =>
      activeFilters.every((f) => p.stack.includes(f))
    );
  }, [activeFilters]);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-28 px-6"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <p className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-3">02 / Projetos</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              id="projects-heading"
              className="font-['Syne',sans-serif] font-extrabold text-4xl md:text-5xl text-white"
            >
              O que eu construo
            </h2>
            <a
              href="https://github.com/kauancostaa"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              aria-label="Ver todos os projetos no GitHub (abre em nova aba)"
            >
              Ver todos no GitHub
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <TechFilter />
        </motion.div>

        {/* Empty state */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <p className="font-mono text-zinc-500 text-sm mb-2">Nenhum projeto encontrado com esses filtros.</p>
              <button
                onClick={() => usePortfolioStore.getState().clearFilters()}
                className="font-mono text-xs text-emerald-400 hover:underline cursor-pointer bg-transparent border-none"
              >
                Limpar filtros
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid sm:grid-cols-2 xl:grid-cols-2 gap-6"
              layout
            >
              <AnimatePresence>
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter status */}
        {activeFilters.length > 0 && filtered.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 font-mono text-xs text-zinc-500 text-center"
            aria-live="polite"
          >
            {filtered.length} projeto{filtered.length !== 1 ? 's' : ''} com{' '}
            {activeFilters.join(' + ')}
          </motion.p>
        )}
      </div>
    </section>
  );
}
