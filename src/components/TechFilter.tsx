import { motion } from 'framer-motion';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { ALL_TECHS } from '../data/projects';

export default function TechFilter() {
  const active  = usePortfolioStore(s=>s.activeFilters);
  const toggle  = usePortfolioStore(s=>s.toggleFilter);
  const clear   = usePortfolioStore(s=>s.clearFilters);
  return (
    <div className="flex flex-wrap gap-2 items-center" role="group" aria-label="Filtrar por tecnologia">
      {active.length > 0 && (
        <motion.button initial={{ opacity:0, scale:.8 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:.8 }}
          onClick={clear}
          className="font-mono text-[11px] px-3 py-1.5 rounded-sm border border-[var(--red)]/30 text-[var(--red)] hover:bg-[var(--red)]/8 transition-colors cursor-pointer bg-transparent">
          ✕ limpar
        </motion.button>
      )}
      {ALL_TECHS.map(t => {
        const on = active.includes(t);
        return (
          <motion.button key={t} onClick={() => toggle(t)}
            whileHover={{ y:-1 }} whileTap={{ scale:.95 }}
            className={`font-mono text-[11px] px-3 py-1.5 rounded-sm border transition-all duration-200 cursor-pointer max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap
              ${on ? 'border-[var(--amber)]/50 bg-[var(--amber)]/10 text-[var(--amber)]'
                   : 'border-[var(--rim)] bg-transparent text-[var(--muted)] hover:border-[var(--faint)] hover:text-[var(--white)]'}`}
            aria-pressed={on} title={t}>
            {t}
          </motion.button>
        );
      })}
    </div>
  );
}
