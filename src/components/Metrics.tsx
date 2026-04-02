// src/components/Metrics.tsx
// Counters animados com useInView para trigger no scroll.

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface MetricItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
}

const METRICS: MetricItem[] = [
  {
    value: 3,
    suffix: '+',
    label: 'Anos de experiência',
    description: 'Desenvolvendo sistemas em produção desde 2021',
    color: '#00ff88',
  },
  {
    value: 40,
    suffix: '%',
    label: 'Redução de esforço manual',
    description: 'Em pipelines e automações na Samsung SDS',
    color: '#00d4ff',
  },
  {
    value: 60,
    suffix: '%',
    label: 'Carga manual eliminada',
    description: 'Com o chatbot LLM de service desk que construí',
    color: '#9b5de5',
  },
  {
    value: 4,
    suffix: '',
    label: 'Certificações técnicas',
    description: 'AWS, Spring, Scrum Master, CKAD',
    color: '#f7b731',
  },
  {
    value: 4,
    suffix: '+',
    label: 'Projetos no portfólio',
    description: 'Sistemas reais com IA, pagamentos e automação',
    color: '#00ff88',
  },
  {
    value: 3,
    suffix: '',
    label: 'Idiomas',
    description: 'Português nativo · Inglês fluente · Espanhol conversacional',
    color: '#00d4ff',
  },
];

// Hook para animar número de 0 até valor-alvo quando entra na tela
function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration, active]);

  return count;
}

function MetricCard({ metric, index, active }: { metric: MetricItem; index: number; active: boolean }) {
  const count = useCountUp(metric.value, 1600 + index * 100, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
      aria-label={`${metric.label}: ${metric.value}${metric.suffix}`}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-[0.07] transition-opacity group-hover:opacity-[0.12]"
        style={{ background: metric.color }}
        aria-hidden="true"
      />

      {/* Value */}
      <div
        className="font-['Syne',sans-serif] font-extrabold text-4xl md:text-5xl mb-1 tabular-nums"
        style={{ color: metric.color }}
        aria-hidden="true"
      >
        {count}{metric.suffix}
      </div>

      {/* Label */}
      <div className="font-['Syne',sans-serif] font-semibold text-sm text-white mb-2">
        {metric.label}
      </div>

      {/* Description */}
      <p className="font-mono text-[11px] text-zinc-500 leading-relaxed">
        {metric.description}
      </p>

      {/* Bottom border accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-30"
        style={{ background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)` }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default function Metrics() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="metrics"
      ref={ref}
      className="relative py-28 px-6"
      aria-labelledby="metrics-heading"
    >
      {/* Ambient line */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, #00ff88 30%, #00d4ff 70%, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14"
        >
          <p className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-3">03 / Números</p>
          <h2
            id="metrics-heading"
            className="font-['Syne',sans-serif] font-extrabold text-4xl md:text-5xl text-white"
          >
            Impacto em dados
          </h2>
        </motion.div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Métricas profissionais"
        >
          {METRICS.map((metric, i) => (
            <div key={metric.label} role="listitem">
              <MetricCard metric={metric} index={i} active={inView} />
            </div>
          ))}
        </div>

        {/* Samsung SDS callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <div>
            <p className="font-['Syne',sans-serif] font-bold text-white mb-1">
              Produção real, não apenas projetos pessoais
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
              Os números acima vêm de sistemas em produção que construí na Samsung SDS Latin America —
              chatbots LLM atendendo toda a operação LATAM, pipelines de dados monitorando dezenas de
              aplicações, e robôs de integração sincronizando SAP, Jira, GSPN e outros sistemas enterprise.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
