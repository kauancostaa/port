import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT } from '../config/contact';

const NAV = [
  { label: 'Sobre',    href: '#about'    },
  { label: 'Projetos', href: '#projects' },
  { label: 'Métricas', href: '#metrics'  },
  { label: 'Contato',  href: '#contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const menuRef   = useRef<HTMLDivElement>(null);
  const hamburger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) { setOpen(false); hamburger.current?.focus(); } };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const m = menuRef.current; if (!m) return;
    const els = m.querySelectorAll<HTMLElement>('a,button');
    els[0]?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const first = els[0]!, last = els[els.length - 1]!;
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) { e.preventDefault(); (e.shiftKey ? last : first).focus(); }
    };
    m.addEventListener('keydown', trap);
    return () => m.removeEventListener('keydown', trap);
  }, [open]);

  const go = (href: string) => { setOpen(false); setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 50); };

  return (
    <motion.header
      role="banner"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#07080a]/90 backdrop-blur-md border-b border-white/5' : ''}`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between" aria-label="Navegação principal">

        {/* Logo */}
        <LogoBtn />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <button key={n.href} onClick={() => go(n.href)}
              className="px-4 py-2 font-mono text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--white)] transition-colors duration-200 bg-transparent border-none cursor-pointer relative group">
              {n.label}
              <span className="absolute bottom-1 left-4 right-4 h-px bg-[var(--amber)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-1.5 border border-[var(--rim)] rounded-sm font-mono text-xs text-[var(--muted)] hover:text-[var(--white)] hover:border-[var(--faint)] transition-all duration-200">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
            GitHub
          </a>
          <button ref={hamburger} onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-menu">
            {[0,1,2].map(i => (
              <motion.span key={i} className="block w-5 h-px bg-[var(--muted)] origin-center"
                animate={i===0?(open?{rotate:45,y:6}:{rotate:0,y:0}):i===1?(open?{opacity:0}:{opacity:1}):(open?{rotate:-45,y:-6}:{rotate:0,y:0})} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" ref={menuRef}
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--ink)] border-t border-[var(--rim)]" role="dialog" aria-label="Menu">
            <div className="px-6 py-5 flex flex-col gap-1">
              {NAV.map(n => (
                <button key={n.href} onClick={() => go(n.href)}
                  className="py-3 font-mono text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--white)] text-left bg-transparent border-none cursor-pointer border-b border-[var(--rim)] last:border-0 transition-colors">
                  {n.label}
                </button>
              ))}
              <a href={CONTACT.github} target="_blank" rel="noopener noreferrer"
                className="pt-4 font-mono text-xs text-[var(--amber)]">GitHub ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function LogoBtn() {
  const [n, setN] = useState(0);
  const [msg, setMsg] = useState(false);
  const click = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const next = n + 1; setN(next);
    if (next >= 5) { setMsg(true); setN(0); setTimeout(() => setMsg(false), 2800); }
  };
  return (
    <div className="relative">
      <button onClick={click} className="flex items-center gap-2 bg-transparent border-none cursor-pointer group" aria-label="Topo">
        <span className="font-mono text-[var(--amber)] text-sm font-bold tracking-tight group-hover:opacity-70 transition-opacity">[</span>
        <span className="font-display font-semibold text-sm text-[var(--white)] tracking-tight">KC</span>
        <span className="font-mono text-[var(--amber)] text-sm font-bold tracking-tight group-hover:opacity-70 transition-opacity">]</span>
      </button>
      <AnimatePresence>
        {msg && (
          <motion.div initial={{ opacity:0, y:6, scale:0.92 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-6 }}
            className="absolute top-10 left-0 w-52 glass rounded-sm p-3 border border-[var(--amber)]/20 z-50">
            <p className="font-mono text-xs text-[var(--amber)]">// encontrou o easter egg</p>
            <p className="font-mono text-[10px] text-[var(--muted)] mt-1">curiosidade é um superpoder 🔍</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
