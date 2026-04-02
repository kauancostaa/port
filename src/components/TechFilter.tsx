// src/components/TechFilter.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { ALL_TECHS } from '../data/projects';

export default function TechFilter() {
  const { activeFilters, toggleFilter, clearFilters } = usePortfolioStore();

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar projetos por tecnologia">
      {/* Clear button */}
      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={clearFilters}
            className="px-3 py-1.5 rounded-lg font-mono text-xs text-red-400 border border-red-400/30 bg-red-400/5
                       hover:bg-red-400/10 transition-all"
            aria-label="Limpar filtros"
          >
            ✕ Limpar
          </motion.button>
        )}
      </AnimatePresence>

      {ALL_TECHS.map((tech) => {
        const active = activeFilters.includes(tech);
        return (
          <button
            key={tech}
            onClick={() => toggleFilter(tech)}
            aria-pressed={active}
            aria-label={`Filtrar por ${tech}`}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200 border
              ${active
                ? 'bg-emerald-400/15 border-emerald-400/40 text-emerald-400'
                : 'bg-white/3 border-white/8 text-zinc-400 hover:border-white/15 hover:text-zinc-200'
              }`}
          >
            {tech}
          </button>
        );
      })}
    </div>
  );
}
