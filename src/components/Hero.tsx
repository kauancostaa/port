// src/components/Hero.tsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TYPED_LINES = [
  '> Systems Analyst @ Samsung SDS Latin America.',
  '> Especialista em IA, automação e integrações.',
  '> Transformando dados em soluções de impacto.',
];

function useTypewriter(lines: string[], speed = 38) {
  const [displayed, setDisplayed] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (lineIdx >= lines.length) { setDone(true); return; }
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + line[charIdx]);
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed((p) => p + '\n');
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx, lines, speed, done]);

  return { displayed, done };
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.45 + 0.08,
      // Some particles are green, some cyan
      color: Math.random() > 0.5 ? '0,255,136' : '0,212,255',
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,212,255,${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" aria-hidden="true" />
  );
}

const TECH_BADGES = [
  { label: 'Python', color: '#3776AB' },
  { label: 'Node.js', color: '#00ff88' },
  { label: 'TypeScript', color: '#3178C6' },
  { label: 'AWS', color: '#FF9900' },
  { label: 'LangChain', color: '#9b5de5' },
  { label: 'React', color: '#00d4ff' },
  { label: 'Docker', color: '#2496ED' },
  { label: 'OpenAI API', color: '#10a37f' },
];

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPED_LINES, 38);
  const lines = displayed.split('\n');

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      <ParticleCanvas />

      {/* Diagonal accent line */}
      <div
        className="absolute top-0 right-0 w-px h-full opacity-20 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #00d4ff 40%, transparent 100%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* ── Left: Text ── */}
        <div>
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 mb-6"
            role="status"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-glow" aria-hidden="true" />
            <span className="font-mono text-xs text-emerald-400 tracking-wide">
              Open to opportunities · Remote / São Paulo
            </span>
          </motion.div>

          {/* Name */}
          <h1 id="hero-heading" className="leading-[0.9] mb-5">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block text-5xl md:text-7xl font-['Syne',sans-serif] font-extrabold text-white"
            >
              Kauan
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="block text-5xl md:text-7xl font-['Syne',sans-serif] font-extrabold text-grad-acid"
            >
              Costa
            </motion.span>
          </h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-mono text-sm text-zinc-400 mb-6 tracking-widest uppercase"
          >
            Software Engineer · Systems Analyst · AI Builder
          </motion.p>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-xl p-4 mb-8 font-mono text-sm"
            aria-label="Terminal animado com apresentação"
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" aria-hidden="true" />
              <span className="ml-2 text-zinc-500 text-xs">kauan@portfolio ~ %</span>
            </div>
            <div className="text-emerald-300 leading-6 whitespace-pre-wrap min-h-[4.5rem]">
              {lines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
              {!done && (
                <span className="inline-block w-2 h-4 bg-emerald-400 cursor-blink align-middle" aria-hidden="true" />
              )}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-6 py-3 rounded-xl bg-emerald-400 text-black font-['Syne',sans-serif] font-bold text-sm
                         hover:bg-emerald-300 transition-all duration-200 neon-green"
              aria-label="Ver projetos"
            >
              Ver Projetos →
            </a>
            <a
              href="https://linkedin.com/in/kauanvcosta"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-cyan-400/30 bg-cyan-400/5 text-cyan-400
                         font-mono text-sm hover:bg-cyan-400/10 transition-all duration-200"
              aria-label="LinkedIn (abre em nova aba)"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:kaucosta.vieira@gmail.com"
              className="px-6 py-3 rounded-xl border border-white/10 text-zinc-300 font-mono text-sm
                         hover:border-white/20 hover:text-white transition-all duration-200"
              aria-label="Enviar email"
            >
              Email
            </a>
          </motion.div>
        </div>

        {/* ── Right: Tech grid ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="hidden lg:block"
          aria-label="Tecnologias principais"
        >
          {/* Floating card */}
          <div className="relative">
            {/* Main card */}
            <div className="glass rounded-2xl p-8 relative overflow-hidden float">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10"
                   style={{ background: 'linear-gradient(225deg, #00d4ff, transparent)' }}
                   aria-hidden="true" />

              <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-4">Stack & Tools</p>

              <div className="grid grid-cols-2 gap-3" role="list" aria-label="Tecnologias">
                {TECH_BADGES.map((t, i) => (
                  <motion.div
                    key={t.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.07 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/5 bg-white/3 hover:border-white/10 transition-colors"
                    role="listitem"
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} aria-hidden="true" />
                    <span className="font-mono text-xs text-zinc-300">{t.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Experience badge */}
              <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-3 gap-3 text-center">
                {[
                  { v: '3+', label: 'Anos exp.' },
                  { v: '2', label: 'Empresas' },
                  { v: '4+', label: 'Certs.' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="font-['Syne',sans-serif] font-bold text-xl text-grad-acid">{item.v}</div>
                    <div className="font-mono text-[10px] text-zinc-500 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Samsung SDS badge floating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="absolute -bottom-5 -left-5 glass rounded-xl px-4 py-3 border border-cyan-400/20"
            >
              <div className="font-mono text-[10px] text-zinc-500 mb-0.5">Current role</div>
              <div className="font-['Syne',sans-serif] font-semibold text-sm text-white">Samsung SDS</div>
              <div className="font-mono text-[10px] text-cyan-400">Systems Analyst</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-emerald-400/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
