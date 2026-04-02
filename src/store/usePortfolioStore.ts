// src/store/usePortfolioStore.ts
// Zustand store centraliza: filtro de tecnologias e tema (claro/escuro).
// Tema persiste no localStorage automaticamente.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PortfolioState {
  // Filtro de tecnologias
  activeFilters: string[];
  toggleFilter: (tech: string) => void;
  clearFilters: () => void;

  // Tema
  theme: 'dark' | 'light';
  toggleTheme: () => void;
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

      theme: 'dark',

      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'dark' ? 'light' : 'dark';
          // Aplica a classe no <html> para o Tailwind darkMode: 'class' funcionar
          document.documentElement.classList.toggle('dark', next === 'dark');
          return { theme: next };
        }),
    }),
    {
      name: 'portfolio-store',
      // Só persiste o tema (não faz sentido persistir filtros)
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
