// src/components/Footer.tsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-10 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-600">
          <span className="text-emerald-400">&lt;</span>
          <span>KC</span>
          <span className="text-emerald-400">/&gt;</span>
          <span className="ml-2">© {year} Kauan Vieira da Costa</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/kauancostaa"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
            aria-label="GitHub (abre em nova aba)"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/kauanvcosta"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
            aria-label="LinkedIn (abre em nova aba)"
          >
            LinkedIn
          </a>
          <a
            href="mailto:kaucosta.vieira@gmail.com"
            className="font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
            aria-label="Email"
          >
            Email
          </a>
        </div>

        <div className="font-mono text-[10px] text-zinc-700">
          Built with React 18 · Vite · Framer Motion
        </div>
      </div>
    </footer>
  );
}
