// src/hooks/useGitHubStats.ts
// Q67: Busca stats reais do GitHub (stars, linguagem, último commit)
import { useState, useEffect } from 'react';

interface GitHubStats {
  stars: number;
  language: string | null;
  lastCommit: string | null;
  loading: boolean;
  error: boolean;
}

const cache = new Map<string, GitHubStats>();

export function useGitHubStats(repoUrl: string): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>({
    stars: 0,
    language: null,
    lastCommit: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    // Extract owner/repo from URL
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      setStats((s) => ({ ...s, loading: false, error: true }));
      return;
    }
    const [, owner, repo] = match;
    const key = `${owner}/${repo}`;

    if (cache.has(key)) {
      const cached = cache.get(key)!;
      setStats(cached);
      return;
    }

    let cancelled = false;

    async function fetchStats() {
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!res.ok) throw new Error('not found');
        const data = await res.json();

        // Get last commit
        const commitsRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`
        );
        let lastCommit: string | null = null;
        if (commitsRes.ok) {
          const commits = await commitsRes.json();
          if (commits[0]?.commit?.author?.date) {
            lastCommit = commits[0].commit.author.date;
          }
        }

        const result: GitHubStats = {
          stars: data.stargazers_count ?? 0,
          language: data.language ?? null,
          lastCommit,
          loading: false,
          error: false,
        };
        cache.set(key, result);
        if (!cancelled) setStats(result);
      } catch {
        const errResult: GitHubStats = {
          stars: 0,
          language: null,
          lastCommit: null,
          loading: false,
          error: true,
        };
        if (!cancelled) setStats(errResult);
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, [repoUrl]);

  return stats;
}
