// src/components/About.tsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EXPERIENCE = [
  {
    company: 'Samsung SDS Latin America',
    role: 'Systems Analyst',
    period: 'Jul 2023 – Nov 2025',
    location: 'São Paulo, SP',
    color: '#00d4ff',
    highlights: [
      'Projetei e implantei chatbot de service desk com LLM (OpenAI API + LangChain), automatizando resolução de tickets de TI com redução de 60% na carga manual da equipe.',
      'Automatizei pipelines de dados e relatórios com AWS Lambda e queries SQL otimizadas, reduzindo esforço manual em 40%+.',
      'Desenvolvi pipelines de dados em tempo real com Python (pandas, PySpark) e Databricks para monitorar saúde de sistemas LATAM.',
      'Integração entre SAP e plataformas internas via REST APIs e jobs agendados para sincronização confiável de dados.',
    ],
  },
  {
    company: 'EPLAN Software & Service',
    role: 'Software Developer',
    period: 'Jul 2022 – Jul 2023',
    location: 'São Paulo, SP',
    color: '#9b5de5',
    highlights: [
      'Desenvolvi e mantive APIs RESTful e serviços backend em Node.js e Spring Boot.',
      'Trabalhei com SQL Server: queries otimizadas, stored procedures e soluções de BI.',
      'Automatizei geração de documentos e relatórios com Power BI, Excel e VBA — 30% de redução no tempo de processamento.',
    ],
  },
  {
    company: 'Usifine',
    role: 'Technical Apprentice – Precision Mechanics',
    period: 'Fev 2021 – Jun 2022',
    location: 'São Paulo, SP',
    color: '#f7b731',
    highlights: [
      'Scripts Python e VBA para automação de processos operacionais e redução de tarefas manuais.',
    ],
  },
];

const CERTS = [
  { label: 'AWS Certified Developer – Associate', icon: '' },
  { label: 'Spring Professional', icon: '' },
  { label: 'Scrum Master', icon: '' },
  { label: 'CKAD (Kubernetes for Developers)', icon: '' },
];

const SKILLS_GROUPS = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    category: 'Backend & APIs',
    items: ['Node.js', 'Express', 'Spring Boot', 'REST APIs', 'LangChain'],
  },
  {
    category: 'AI & Data',
    items: ['OpenAI API', 'Anthropic API', 'LLMs', 'pandas', 'PySpark', 'Databricks'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS (EC2, S3, Lambda, RDS, CloudWatch)', 'Docker', 'CI/CD'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'SQL Server', 'MongoDB', 'SQLite'],
  },
  {
    category: 'Frontend & BI',
    items: ['React', 'Power BI', 'Streamlit'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' } }),
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 px-6"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp} custom={0}
          className="mb-16"
        >
          <p className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-3">01 / Sobre mim</p>
          <h2 id="about-heading" className="font-['Syne',sans-serif] font-extrabold text-4xl md:text-5xl text-white">
            Quem sou eu
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 mb-20">
          {/* Bio */}
          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={1}
            className="lg:col-span-2"
          >
            <div className="space-y-4 text-zinc-400 leading-relaxed text-[15px]">
              <p>
                Sou um engenheiro de software com sede em São Paulo, especializado em sistemas de IA,
                automação de processos e integrações enterprise. Atualmente trabalho como Systems Analyst
                na <span className="text-cyan-400 font-medium">Samsung SDS Latin America</span>, onde construo
                soluções inteligentes que reduzem fricção operacional em escala.
              </p>
              <p>
                Minha stack combina backend sólido (Python, Node.js, Java/Spring) com cloud-native (AWS),
                dados (PySpark, Databricks) e IA generativa (LLMs, LangChain, OpenAI, Anthropic). Gosto
                de projetos que vivem na intersecção entre automação, dados e produto.
              </p>
              <p>
                Fora do trabalho, sou fã de futebol, jiujitsu, astronomia, e estudo física teórica nas horas vagas.
              </p>
            </div>

            {/* Education */}
            <div className="mt-8 glass rounded-xl p-5">
              <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-4">Educação</p>
              <div className="space-y-3">
                <div>
                  <div className="font-['Syne',sans-serif] font-semibold text-white text-sm">B.S. Software Engineering</div>
                  <div className="font-mono text-xs text-zinc-500">Universidade Cesumar · jul 2027</div>
                </div>
                <div>
                  <div className="font-['Syne',sans-serif] font-semibold text-white text-sm">A.A.S. Mechatronics Engineering</div>
                  <div className="font-mono text-xs text-zinc-500">FAPEN · jul 2022</div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-5">
              <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-3">Certificações</p>
              <div className="space-y-2">
                {CERTS.map((c) => (
                  <div key={c.label} className="flex items-center gap-2 text-sm text-zinc-300">
                    <span aria-hidden="true">{c.icon}</span>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={2}
            className="lg:col-span-3"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {SKILLS_GROUPS.map((group, i) => (
                <motion.div
                  key={group.category}
                  initial="hidden" animate={inView ? 'visible' : 'hidden'}
                  variants={fadeUp} custom={2 + i * 0.5}
                  className="glass rounded-xl p-5"
                >
                  <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-3">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5" role="list" aria-label={`Skills de ${group.category}`}>
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        role="listitem"
                        className="px-2.5 py-1 rounded-md bg-white/4 border border-white/8 text-zinc-300 font-mono text-xs
                                   hover:border-emerald-400/30 hover:text-emerald-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Experience timeline */}
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp} custom={3}
        >
          <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-8">Experiência</p>
          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial="hidden" animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp} custom={4 + i}
                className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-white/10 transition-all"
              >
                {/* Left accent border */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                  style={{ backgroundColor: exp.color }}
                  aria-hidden="true"
                />

                <div className="ml-4">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-['Syne',sans-serif] font-bold text-lg text-white">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-sm font-medium" style={{ color: exp.color }}>
                          {exp.company}
                        </span>
                        <span className="text-zinc-600">·</span>
                        <span className="font-mono text-xs text-zinc-500">{exp.location}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-zinc-500 bg-white/4 px-3 py-1.5 rounded-full border border-white/5">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2" aria-label={`Conquistas em ${exp.company}`}>
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-zinc-400 text-sm leading-relaxed">
                        <span className="text-emerald-400 mt-0.5 flex-shrink-0" aria-hidden="true">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
