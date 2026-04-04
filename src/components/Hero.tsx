import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { PROFILE } from '../config/profile';
import { CONTACT } from '../config/contact';

// ── Typewriter ──────────────────────────────────────────────────────────────
const LINES = [
  '> construindo sistemas que pensam',
  '> automatizando o que humans odeiam fazer',
  '> dados → produto → impacto',
];

function useTypewriter(lines: string[], speed = 36) {
  const [out, setOut]     = useState('');
  const [li,  setLi]      = useState(0);
  const [ci,  setCi]      = useState(0);
  const [done,setDone]    = useState(false);
  const alive = useRef(true);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  useEffect(() => {
    if (done) return;
    const line = lines[li];
    if (!line) { if (alive.current) setDone(true); return; }
    if (ci < line.length) {
      const t = setTimeout(() => { if (!alive.current) return; setOut(p => p + line[ci]); setCi(c => c+1); }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { if (!alive.current) return; setOut(p => p+'\n'); setLi(l => l+1); setCi(0); }, 650);
      return () => clearTimeout(t);
    }
  }, [ci, li, lines, speed, done]);
  return { out, done };
}

// ── Particles — minimal, warm amber ────────────────────────────────────────
function Particles() {
  const ref     = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random()-.5)*.18*(0.7+Math.random()*.6),
      vy: (Math.random()-.5)*.18*(0.7+Math.random()*.6),
      r: Math.random()*.9+.3,
      a: Math.random()*.3+.04,
      col: Math.random()>.6 ? '232,160,32' : '45,126,247',
    }));
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    let raf: number;
    const draw = () => {
      const w = c.width, h = c.height;
      ctx.clearRect(0,0,w,h);
      for (let i=0;i<pts.length;i++) {
        const pi = pts[i]!;
        for (let j=i+1;j<pts.length;j++) {
          const pj = pts[j]!;
          const dx = pi.x*w - pj.x*w, dy = pi.y*h - pj.y*h;
          const d  = Math.sqrt(dx*dx+dy*dy);
          if (d < 90) { ctx.beginPath(); ctx.strokeStyle=`rgba(232,160,32,${.025*(1-d/90)})`; ctx.lineWidth=.4; ctx.moveTo(pi.x*w,pi.y*h); ctx.lineTo(pj.x*w,pj.y*h); ctx.stroke(); }
        }
      }
      for (const p of pts) {
        ctx.beginPath(); ctx.arc(p.x*w,p.y*h,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${p.col},${p.a})`; ctx.fill();
        p.x+=p.vx/w; p.y+=p.vy/h;
        if(p.x<0)p.x=1; if(p.x>1)p.x=0; if(p.y<0)p.y=1; if(p.y>1)p.y=0;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [reduced]);
  if (reduced) return null;
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" aria-hidden="true" />;
}

const STACK = ['Python','TypeScript','Node.js','AWS','LangChain','React','Docker','OpenAI API'];

// ── Ticker de tecnologias ───────────────────────────────────────────────────
function TechTicker() {
  const items = [...STACK, ...STACK];
  return (
    <div className="overflow-hidden border-t border-b border-[var(--rim)] py-2.5" aria-hidden="true">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="font-mono text-[10px] tracking-widest uppercase text-[var(--faint)] mx-6">
            {t} <span className="text-[var(--amber)] mx-2">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { out, done } = useTypewriter(LINES, 36);
  const lines = out.split('\n');

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-14" aria-labelledby="hero-heading">
      <Particles />

      {/* Diagonal rule — breaks the grid intentionally */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" className="absolute inset-0">
          <line x1="62%" y1="0" x2="100%" y2="45%" stroke="rgba(232,160,32,0.04)" strokeWidth="1"/>
          <line x1="58%" y1="0" x2="100%" y2="55%" stroke="rgba(45,126,247,0.03)" strokeWidth="1"/>
        </svg>
        {/* Right column accent */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--amber)]/20 to-transparent" />
      </div>

      {/* Main grid — asymmetric: wide left, narrow right */}
      <div className="max-w-6xl mx-auto px-6 w-full flex-1 flex items-center">
        <div className="grid lg:grid-cols-[1fr_380px] gap-20 w-full items-center">

          {/* ── Left ─────────────────────────────────────────────── */}
          <div>
            {/* Status */}
            {PROFILE.isOpenToWork && (
              <motion.div initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:.15, ease:[0.19,1,0.22,1] }}
                className="inline-flex items-center gap-2.5 mb-8" role="status">
                <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse-dot" aria-hidden="true" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-[var(--green)]">Disponível · Remote / São Paulo</span>
              </motion.div>
            )}

            {/* Name — broken into lines for impact */}
            <h1 id="hero-heading" className="mb-6 leading-[0.88]">
              <motion.span initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:.2, duration:.7, ease:[0.19,1,0.22,1] }}
                className="block font-display font-bold text-[clamp(3.5rem,8vw,7rem)] text-[var(--white)] tracking-tight">
                Kauan
              </motion.span>
              <motion.span initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:.32, duration:.7, ease:[0.19,1,0.22,1] }}
                className="block font-display font-bold text-[clamp(3.5rem,8vw,7rem)] tracking-tight"
                style={{ WebkitTextStroke: '1.5px var(--amber)', color: 'transparent' }}>
                Costa
              </motion.span>
            </h1>

            {/* Role overline */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.5 }}
              className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[var(--amber)]" aria-hidden="true" />
              <p className="font-mono text-xs tracking-widest uppercase text-[var(--muted)]">Software Engineer · AI Builder · São Paulo</p>
            </motion.div>

            {/* Terminal */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.6, ease:[0.19,1,0.22,1] }}
              className="mb-10 relative">
              {/* Terminal header */}
              <div className="flex items-center gap-0 mb-0">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-[var(--panel)] border border-b-0 border-[var(--rim)] rounded-t-sm">
                  <div className="w-2 h-2 rounded-full bg-[#e84040]/70" aria-hidden="true"/>
                  <div className="w-2 h-2 rounded-full bg-[#e8a020]/70" aria-hidden="true"/>
                  <div className="w-2 h-2 rounded-full bg-[#26bf6e]/70" aria-hidden="true"/>
                  <span className="font-mono text-[10px] text-[var(--faint)] ml-2">kauan@portfolio:~</span>
                </div>
              </div>
              <div className="bg-[var(--panel)] border border-[var(--rim)] rounded-b-sm rounded-tr-sm p-5 font-mono text-sm min-h-[100px]"
                aria-label="Terminal animado">
                <div className="text-[var(--muted)] leading-6 whitespace-pre-wrap">
                  {lines.map((l, i) => <div key={i} className={l.startsWith('>') ? 'text-[var(--amber)]' : 'text-[var(--muted)]'}>{l}</div>)}
                  {!done && <span className="inline-block w-2 h-[1.1em] bg-[var(--amber)] align-middle cursor-blink ml-0.5" aria-hidden="true"/>}
                </div>
              </div>
              {/* Corner accent */}
              <div className="absolute -top-px -right-px w-12 h-12 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-0 h-0"
                  style={{ borderLeft:'12px solid transparent', borderTop:'12px solid var(--amber)', opacity:.4 }}/>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.75 }}
              className="flex flex-wrap gap-3">
              <motion.a href="#projects" onClick={e=>{e.preventDefault();document.querySelector('#projects')?.scrollIntoView({behavior:'smooth'})}}
                whileHover={{ y:-2 }} whileTap={{ scale:.97 }}
                className="px-6 py-3 bg-[var(--amber)] text-[var(--void)] font-display font-semibold text-sm rounded-sm glow-amber hover:bg-[#f0ac22] transition-colors">
                Ver projetos →
              </motion.a>
              <motion.a href={PROFILE.cvUrl} download
                whileHover={{ y:-2 }} whileTap={{ scale:.97 }}
                className="px-6 py-3 border border-[var(--rim)] text-[var(--muted)] font-mono text-xs tracking-wider uppercase rounded-sm hover:border-[var(--faint)] hover:text-[var(--white)] transition-all flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Download CV
              </motion.a>
              <motion.a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer"
                whileHover={{ y:-2 }} whileTap={{ scale:.97 }}
                className="px-6 py-3 border border-[var(--rim)] text-[var(--muted)] font-mono text-xs tracking-wider uppercase rounded-sm hover:border-[var(--blue)]/50 hover:text-[var(--blue)] transition-all">
                LinkedIn ↗
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right — Stats card ─────────────────────────────── */}
          <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ delay:.5, duration:.8, ease:[0.19,1,0.22,1] }}
            className="hidden lg:block">
            <div className="border border-[var(--rim)] bg-[var(--panel)] rounded-sm overflow-hidden animate-float">
              {/* Card header */}
              <div className="px-5 py-3 border-b border-[var(--rim)] flex items-center justify-between">
                <span className="label">Stack & Impacto</span>
                <div className="flex gap-1" aria-hidden="true">
                  {[0,1,2].map(i=><div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--faint)]"/>)}
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 divide-x divide-y divide-[var(--rim)]">
                {[
                  {v:'3+',  l:'Anos exp.',    c:'var(--amber)'},
                  {v:'60%', l:'Carga eliminada',c:'var(--blue)'},
                  {v:'40%', l:'Eficiência',   c:'var(--green)'},
                  {v:'4+',  l:'Certs.',       c:'var(--amber)'},
                ].map(s=>(
                  <div key={s.l} className="p-5">
                    <div className="font-display font-bold text-3xl mb-1" style={{color:s.c}}>{s.v}</div>
                    <div className="label">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Stack tags */}
              <div className="p-5 border-t border-[var(--rim)]">
                <p className="label mb-3">Stack principal</p>
                <div className="flex flex-wrap gap-1.5">
                  {STACK.map(t=>(
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* Last role */}
              <div className="px-5 py-3 border-t border-[var(--rim)] bg-[var(--ink)] flex items-center justify-between">
                <div>
                  <div className="label mb-0.5">Last role</div>
                  <div className="font-display font-semibold text-sm text-[var(--white)]">Samsung SDS</div>
                </div>
                <span className="font-mono text-[10px] text-[var(--blue)] border border-[var(--blue)]/30 px-2 py-1 rounded-sm">Systems Analyst</span>
              </div>
            </div>
          </motion.div>

          {/* Mobile badges — scrollable horizontal */}
          <div className="lg:hidden -mx-6 px-6 overflow-x-auto pb-2">
            <div className="flex gap-2 w-max">
              {STACK.map(t=><span key={t} className="tag flex-shrink-0">{t}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* Tech ticker — separates hero from next section */}
      <div className="mt-12">
        <TechTicker />
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="label" style={{fontSize:'9px'}}>scroll</span>
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.6, repeat:Infinity }}
          className="w-px h-7 bg-gradient-to-b from-[var(--amber)]/50 to-transparent"/>
      </motion.div>
    </section>
  );
}
