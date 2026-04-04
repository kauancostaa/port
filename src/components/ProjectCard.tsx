import { motion } from 'framer-motion';
import ProjectImage from './ProjectImage';
import { Project, STATUS_COLORS } from '../data/projects';
import { useGitHubStats } from '../hooks/useGitHubStats';

interface Props { project: Project; index: number; }

export default function ProjectCard({ project, index }: Props) {
  const gh = useGitHubStats(project.repoUrl);

  return (
    <motion.article
      initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:.97 }}
      transition={{ duration:.5, delay:index*.07, ease:[0.19,1,0.22,1] }}
      whileHover={{ y:-4 }}
      layout
      className="border border-[var(--rim)] bg-[var(--panel)] rounded-sm overflow-hidden group cursor-pointer hover:border-[var(--faint)] transition-all duration-300"
      onClick={() => window.open(project.repoUrl, '_blank', 'noopener,noreferrer')}
      onKeyDown={e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();window.open(project.repoUrl,'_blank','noopener,noreferrer');}}}
      tabIndex={0} role="link"
      aria-label={`Projeto: ${project.title} — abre no GitHub`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-[var(--ink)]">
        <ProjectImage src={project.image} alt={`Screenshot ${project.title}`}
          accentColor={project.accentColor} title={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{background:`linear-gradient(180deg,transparent 40%,${project.accentColor}22)`}} aria-hidden="true"/>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`font-mono text-[9px] px-2 py-0.5 rounded-sm border ${STATUS_COLORS[project.status]}`}>
            {project.statusLabel}
          </span>
          <span className="font-mono text-[9px] px-2 py-0.5 rounded-sm bg-black/50 text-[var(--muted)] border border-white/8">
            {project.year}
          </span>
        </div>

        {/* GitHub btn */}
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
          onClick={e=>e.stopPropagation()}
          className="absolute top-3 right-3 w-7 h-7 rounded-sm bg-black/50 border border-white/10 flex items-center justify-center text-[var(--muted)] hover:text-[var(--white)] transition-colors"
          aria-label={`GitHub — ${project.title}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
        </a>

        {/* Stars */}
        {!gh.loading && !gh.error && gh.stars > 0 && (
          <div className="absolute bottom-2 right-2">
            <span className="font-mono text-[9px] px-1.5 py-0.5 bg-black/60 text-[var(--amber)] border border-[var(--amber)]/20 rounded-sm">★ {gh.stars}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-base text-[var(--white)] group-hover:text-[var(--amber)] transition-colors">{project.title}</h3>
          {!gh.loading && !gh.error && gh.language && (
            <span className="font-mono text-[9px] text-[var(--faint)] flex-shrink-0 mt-0.5">{gh.language}</span>
          )}
        </div>

        <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{project.shortDesc}</p>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-4">
          {project.highlights.map(h=>(
            <li key={h} className="flex items-start gap-2 text-xs text-[var(--muted)]">
              <span style={{color:project.accentColor}} className="mt-0.5 flex-shrink-0" aria-hidden="true">›</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map(t=><span key={t} className="tag">{t}</span>)}
        </div>

        {/* Footer */}
        <div className="flex gap-2 pt-4 border-t border-[var(--rim)]">
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 font-mono text-[11px] tracking-wider uppercase border border-[var(--rim)] text-[var(--muted)] hover:border-[var(--faint)] hover:text-[var(--white)] transition-all rounded-sm">
            Repositório
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </a>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
              className="px-4 py-2 font-mono text-[11px] tracking-wider uppercase border border-[var(--amber)]/30 text-[var(--amber)] hover:bg-[var(--amber)]/8 transition-all rounded-sm flex items-center gap-1.5">
              ▶ Demo
            </a>
          )}
        </div>
      </div>

      {/* Status tooltip */}
      <div className="px-5 pb-3 -mt-1">
        <p className="font-mono text-[9px] text-[var(--faint)]" aria-label={`Status: ${project.statusTip}`}>
          // {project.statusTip}
        </p>
      </div>
    </motion.article>
  );
}
