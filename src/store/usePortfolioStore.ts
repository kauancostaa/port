// src/store/usePortfolioStore.ts
// Q13: Removido light mode — só dark mode agora
// Q26: Hook sempre usado (nunca getState() direto no JSX)
// Q27: classList manipulado só no useEffect do App, não na store

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PortfolioState {
  activeFilters: string[];
  toggleFilter: (tech: string) => void;
  clearFilters: () => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      activeFilters: [],

      toggleFilter: (tech) =>
        set((state) => ({
          activeFilters: state.activeFilters.includes(tech)
            ? state.activeFilters.filter((f) => f !== tech)
            : [...state.activeFilters, tech],
        })),

      clearFilters: () => set({ activeFilters: [] }),
    }),
    {
      name: 'portfolio-store',
    }
  )
);
