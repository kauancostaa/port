import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROFILE } from '../config/profile';

const EXP = [
  {
    co: 'Samsung SDS Latin America', role: 'Systems Analyst',
    period: 'Jul 2023 – Nov 2025', loc: 'São Paulo, SP', col: 'var(--blue)',
    items: [
      'Projetei chatbot de service desk com LLM (OpenAI + LangChain) — 60% de redução na carga manual.',
      'Automatizei pipelines de dados com AWS Lambda e SQL otimizado — 40%+ de redução de esforço.',
      'Desenvolvi pipelines em tempo real com Python (pandas, PySpark) e Databricks para monitorar LATAM.',
      'Integrei SAP e plataformas internas via REST APIs e jobs agendados.',
    ],
    tags: ['Python','LangChain','AWS Lambda','PySpark','Databricks','SAP','SQL'],
  },
  {
    co: 'EPLAN Software & Service', role: 'Software Developer',
    period: 'Jul 2022 – Jul 2023', loc: 'São Paulo, SP', col: 'var(--amber)',
    items: [
      'Desenvolvi e mantive APIs RESTful e serviços backend em Node.js e Spring Boot.',
      'Otimizei queries SQL Server, stored procedures e soluções de BI.',
      'Automatizei geração de relatórios com Power BI, Excel e VBA — 30% de redução.',
    ],
    tags: ['Node.js','Spring Boot','SQL Server','Power BI','REST API'],
  },
  {
    co: 'Usifine', role: 'Technical Apprentice',
    period: 'Fev 2021 – Jun 2022', loc: 'São Paulo, SP', col: 'var(--green)',
    items: ['Automação de processos operacionais com Python e VBA.'],
    tags: ['Python','VBA'],
  },
];

const SKILLS = [
  {cat:'Languages',    items:['Python','Java','TypeScript','JavaScript','SQL'],          col:'var(--amber)'},
  {cat:'Backend',      items:['Node.js','Express','Spring Boot','REST APIs','LangChain'],col:'var(--blue)'},
  {cat:'AI & Data',    items:['OpenAI API','Anthropic API','LLMs','pandas','PySpark','Databricks'], col:'var(--amber)'},
  {cat:'Cloud',        items:['AWS','Docker','CI/CD','Lambda','S3','CloudWatch'],        col:'var(--blue)'},
  {cat:'Databases',    items:['PostgreSQL','SQL Server','MongoDB','SQLite'],             col:'var(--green)'},
  {cat:'Frontend & BI',items:['React','TypeScript','Power BI','Streamlit'],             col:'var(--amber)'},
];

const CERTS = [
  {l:'AWS Certified Developer – Associate', v:true},
  {l:'Spring Professional',                 v:true},
  {l:'Scrum Master',                        v:true},
  {l:'CKAD (Kubernetes for Developers)',    v:null},
];

const up = (i=0) => ({ hidden:{opacity:0,y:24}, visible:{opacity:1,y:0,transition:{delay:i*.09,duration:.6,ease:[0.19,1,0.22,1]}} });

export default function About() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-40px' });

  return (
    <section id="about" ref={ref} className="relative py-28 px-6" aria-labelledby="about-h">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div variants={up(0)} initial="hidden" animate={inView?'visible':'hidden'} className="flex items-center gap-4 mb-14">
          <span className="label text-[var(--amber)]">01</span>
          <div className="w-8 h-px bg-[var(--amber)]" aria-hidden="true"/>
          <h2 id="about-h" className="font-display font-bold text-3xl md:text-4xl text-[var(--white)]">Sobre mim</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16 mb-20">
          {/* Bio */}
          <motion.div variants={up(1)} initial="hidden" animate={inView?'visible':'hidden'} className="lg:col-span-2 space-y-6">
            <div className="space-y-4 text-[var(--muted)] leading-relaxed text-[15px]">
              <p>Engenheiro de software em São Paulo especializado em sistemas de IA, automação e integrações enterprise. Atuei na <span className="text-[var(--blue)] font-medium">Samsung SDS Latin America</span> construindo soluções que reduziram fricção operacional em escala.</p>
              <p>Stack: Python, Node.js, Java/Spring, AWS, PySpark, Databricks e IA generativa (LLMs, LangChain, OpenAI, Anthropic).</p>
              <p>Fora do código: futebol, jiujitsu, astronomia e física teórica.</p>
            </div>

            <motion.a href={PROFILE.cvUrl} download
              whileHover={{ x:4 }} whileTap={{ scale:.97 }}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-[var(--amber)] hover:text-[var(--white)] transition-colors border-b border-[var(--amber)]/30 pb-0.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              Download CV
            </motion.a>

            {/* Educação */}
            <div className="border border-[var(--rim)] rounded-sm overflow-hidden">
              <div className="px-4 py-2.5 bg-[var(--panel)] border-b border-[var(--rim)]">
                <span className="label">Educação</span>
              </div>
              <div className="divide-y divide-[var(--rim)]">
                {[
                  {t:'B.S. Software Engineering',       s:'Cesumar · 2027'},
                  {t:'A.A.S. Mechatronics Engineering', s:'FAPEN · 2022'},
                ].map(e=>(
                  <div key={e.t} className="px-4 py-3">
                    <div className="font-display font-semibold text-sm text-[var(--white)]">{e.t}</div>
                    <div className="font-mono text-[11px] text-[var(--muted)] mt-0.5">{e.s}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certs */}
            <div>
              <p className="label mb-3">Certificações</p>
              <div className="space-y-2">
                {CERTS.map(c=>(
                  <div key={c.l} className="flex items-center gap-2.5">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.v===true?'bg-[var(--green)]':c.v===null?'bg-[var(--amber)]':'bg-[var(--faint)]'}`} aria-hidden="true"/>
                    <span className="text-sm text-[var(--muted)]">{c.l}</span>
                    {c.v===null && <span className="font-mono text-[9px] text-[var(--amber)] border border-[var(--amber)]/40 px-1.5 py-0.5 rounded-sm">verificar</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div variants={up(2)} initial="hidden" animate={inView?'visible':'hidden'} className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 gap-px bg-[var(--rim)] border border-[var(--rim)] rounded-sm overflow-hidden">
              {SKILLS.map((g,i)=>(
                <motion.div key={g.cat} variants={up(2+i*.3)} initial="hidden" animate={inView?'visible':'hidden'}
                  className="bg-[var(--panel)] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-3 rounded-full" style={{background:g.col}} aria-hidden="true"/>
                    <p className="label">{g.cat}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map(s=>(
                      <span key={s} className="tag hover:border-[var(--faint)] hover:text-[var(--white)] cursor-default">{s}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Experience */}
        <motion.div variants={up(3)} initial="hidden" animate={inView?'visible':'hidden'}>
          <div className="flex items-center gap-4 mb-8">
            <span className="label text-[var(--amber)]">experiência</span>
            <div className="flex-1 hr-fade" aria-hidden="true"/>
          </div>
          <div className="space-y-4">
            {EXP.map((e,i)=>(
              <motion.div key={e.co} variants={up(4+i)} initial="hidden" animate={inView?'visible':'hidden'}
                className="relative border border-[var(--rim)] bg-[var(--panel)] rounded-sm overflow-hidden group hover:border-[var(--faint)] transition-all duration-300">
                {/* Left accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{background:e.col}} aria-hidden="true"/>

                <div className="pl-6 pr-5 pt-5 pb-4 md:pl-8">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-display font-semibold text-base text-[var(--white)]">{e.role}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-sm font-bold" style={{color:e.col}}>{e.co}</span>
                        <span className="text-[var(--faint)]">·</span>
                        <span className="font-mono text-xs text-[var(--muted)]">{e.loc}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-[var(--muted)] border border-[var(--rim)] px-2.5 py-1 rounded-sm">{e.period}</span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {e.items.map(it=>(
                      <li key={it} className="flex gap-2.5 text-sm text-[var(--muted)] leading-relaxed">
                        <span style={{color:e.col}} className="mt-0.5 flex-shrink-0" aria-hidden="true">›</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {e.tags.map(t=><span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
