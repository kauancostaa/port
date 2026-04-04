import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const METRICS = [
  {v:3,  s:'+',  l:'Anos de experiência',    d:'Desde 2021 em produção',                   t:'Primeiro estágio técnico em 2021 até hoje',                           col:'var(--amber)'},
  {v:60, s:'%',  l:'Carga manual eliminada', d:'Com chatbot LLM — service desk LATAM',      t:'Taxa de resolução automática sem intervenção humana',                  col:'var(--blue)'},
  {v:40, s:'%',  l:'Redução em pipelines',   d:'AWS Lambda + SQL otimizado — Samsung SDS',  t:'Horas-homem/semana antes vs. depois da automação',                     col:'var(--green)'},
  {v:4,  s:'',   l:'Certificações técnicas', d:'AWS · Spring · CSM · CKAD',                 t:'AWS Developer Associate, Spring Professional, CSM, CKAD',              col:'var(--amber)'},
  {v:4,  s:'+',  l:'Projetos no portfólio',  d:'Sistemas reais: IA, pagamentos, automação',  t:'Projetos públicos no GitHub + sistemas internos em empresas',          col:'var(--blue)'},
  {v:3,  s:'',   l:'Idiomas',               d:'PT nativo · EN fluente · ES conversacional',  t:'Português (nativo), Inglês (C1), Espanhol (B1)',                       col:'var(--green)'},
];

function useCountUp(target: number, dur: number, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now-t0)/dur, 1);
      setN(Math.round((1-Math.pow(1-p,3))*target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, dur, active]);
  return n;
}

function Card({ m, i, active }: { m: typeof METRICS[0]; i: number; active: boolean }) {
  const n = useCountUp(m.v, 1600+i*80, active);
  const [tip, setTip] = useState(false);
  return (
    <motion.div initial={{ opacity:0, y:24 }} animate={active?{ opacity:1, y:0 }:{}}
      transition={{ duration:.5, delay:i*.07, ease:[0.19,1,0.22,1] }}
      className="border border-[var(--rim)] bg-[var(--panel)] rounded-sm p-6 relative group hover:border-[var(--faint)] transition-all duration-300 overflow-hidden"
      aria-label={`${m.l}: ${m.v}${m.s}`}>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-0 h-0" style={{borderLeft:'16px solid transparent', borderTop:`16px solid ${m.col}`, opacity:.15}}/>
      </div>

      {/* Tooltip btn */}
      <button onClick={()=>setTip(!tip)} onBlur={()=>setTip(false)}
        className="absolute top-3 right-3 w-5 h-5 rounded-sm border border-[var(--rim)] flex items-center justify-center font-mono text-[9px] text-[var(--faint)] hover:text-[var(--muted)] transition-colors bg-transparent cursor-pointer"
        aria-label={`Contexto: ${m.t}`}>?</button>
      {tip && (
        <div className="absolute top-9 right-3 w-52 bg-[var(--ink)] border border-[var(--rim)] rounded-sm p-2.5 font-mono text-[10px] text-[var(--muted)] z-10 shadow-xl">
          {m.t}
        </div>
      )}

      <div className="font-display font-bold text-[2.8rem] leading-none mb-2 tabular-nums" style={{color:m.col}} aria-hidden="true">
        {n}{m.s}
      </div>
      <div className="font-display font-semibold text-sm text-[var(--white)] mb-1.5">{m.l}</div>
      <p className="font-mono text-[11px] text-[var(--muted)] leading-relaxed">{m.d}</p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-25" style={{background:`linear-gradient(90deg,transparent,${m.col},transparent)`}} aria-hidden="true"/>
    </motion.div>
  );
}

export default function Metrics() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-40px' });
  return (
    <section id="metrics" ref={ref} className="relative py-28 px-6" aria-labelledby="metrics-h">
      <div className="absolute inset-x-0 top-0 hr-fade" aria-hidden="true"/>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{ opacity:1, y:0 }:{}} className="mb-14">
          <div className="flex items-center gap-4 mb-2">
            <span className="label text-[var(--amber)]">03</span>
            <div className="w-8 h-px bg-[var(--amber)]" aria-hidden="true"/>
            <h2 id="metrics-h" className="font-display font-bold text-3xl md:text-4xl text-[var(--white)]">Impacto em dados</h2>
          </div>
          <p className="text-[var(--muted)] text-sm ml-[calc(8px+2rem+1rem)]">Produção real — não projetos pessoais de fim de semana</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10" role="list" aria-label="Métricas profissionais">
          {METRICS.map((m,i)=><div key={m.l} role="listitem"><Card m={m} i={i} active={inView}/></div>)}
        </div>

        {/* Callout */}
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ delay:.5 }}
          className="border border-[var(--blue)]/20 bg-[var(--blue)]/5 rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-shrink-0 w-10 h-10 border border-[var(--blue)]/30 rounded-sm flex items-center justify-center" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <div>
            <p className="font-display font-semibold text-[var(--white)] mb-1">Produção real, não apenas projetos pessoais</p>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-2xl">
              Esses números vêm de sistemas em produção construídos na Samsung SDS Latin America —
              chatbots LLM atendendo toda a operação LATAM, pipelines monitorando dezenas de aplicações,
              integrações SAP/Jira/GSPN sincronizando dados enterprise em tempo real.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
