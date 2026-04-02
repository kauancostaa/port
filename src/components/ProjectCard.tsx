// src/components/ProjectCard.tsx
import { motion } from 'framer-motion';
import ProjectImage from './ProjectImage';
import { Project, STATUS_COLORS } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const statusClass = STATUS_COLORS[project.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
      layout
      className="glass rounded-2xl overflow-hidden group cursor-pointer
                 hover:border-white/12 hover:-translate-y-1 transition-all duration-300"
      aria-label={`Projeto: ${project.title}`}
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden bg-[#0d1520]">
        <ProjectImage
          src={project.image}
          alt={`Screenshot do projeto ${project.title}`}
          accentColor={project.accentColor}
          title={project.title}
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay gradient on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(135deg, ${project.accentColor}18, transparent)` }}
          aria-hidden="true"
        />

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className={`font-mono text-[10px] px-2.5 py-1 rounded-full border ${statusClass}`}>
            {project.statusLabel}
          </span>
        </div>

        {/* Year badge */}
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-black/40 text-zinc-400 border border-white/5">
            {project.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-['Syne',sans-serif] font-bold text-lg text-white group-hover:text-grad-acid transition-all">
            {project.title}
          </h3>
          {/* GitHub link */}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0 w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center
                       text-zinc-500 hover:text-white hover:border-white/20 transition-all"
            aria-label={`Ver código de ${project.title} no GitHub (abre em nova aba)`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
            </svg>
          </a>
        </div>

        {/* Short description */}
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{project.shortDesc}</p>

        {/* Highlights */}
        <ul className="space-y-1 mb-5" aria-label="Destaques do projeto">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-zinc-500">
              <span style={{ color: project.accentColor }} aria-hidden="true" className="mt-0.5 flex-shrink-0">›</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-5" role="list" aria-label="Tecnologias do projeto">
          {project.stack.map((tech) => (
            <span
              key={tech}
              role="listitem"
              className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/4 border border-white/7 text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 w-full justify-center py-2.5 rounded-xl border transition-all duration-200 font-mono text-xs"
          style={{
            borderColor: `${project.accentColor}40`,
            color: project.accentColor,
            background: `${project.accentColor}08`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = `${project.accentColor}18`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = `${project.accentColor}08`;
          }}
          aria-label={`Ver repositório de ${project.title} no GitHub (abre em nova aba)`}
        >
          Ver repositório
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </a>
      </div>
    </motion.article>
  );
}
