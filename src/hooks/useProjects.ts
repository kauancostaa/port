// src/hooks/useProjects.ts
// Q2: Abstração para dados de projetos — pronto para futuro CMS/GitHub API
import { useMemo } from 'react';
import { PROJECTS, type Project, type ProjectStatus } from '../data/projects';

interface UseProjectsOptions {
  filters?: string[];
}

interface UseProjectsResult {
  projects:    Project[];  // lista filtrada para renderizar
  allProjects: Project[];  // todos os projetos
  total:       number;     // total sem filtro
  filtered:    number;     // contagem após filtro
}

export function useProjects({ filters = [] }: UseProjectsOptions = {}): UseProjectsResult {
  const filteredList = useMemo(() => {
    if (filters.length === 0) return PROJECTS;
    return PROJECTS.filter((p) =>
      filters.every((f) => p.stack.includes(f))
    );
  }, [filters]);

  return {
    projects:    filteredList,
    allProjects: PROJECTS,
    total:       PROJECTS.length,
    filtered:    filteredList.length,
  };
}

export type { Project, ProjectStatus };
