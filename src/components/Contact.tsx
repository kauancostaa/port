import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CONTACT } from '../config/contact';

interface F { name:string; email:string; message:string; }
type E = Partial<Record<keyof F, string>>;

const FORMSPREE = 'https://formspree.io/f/mdappevo';

function validate(f: F): E {
  const e: E = {};
  if (!f.name.trim() || f.name.trim().length<2)   e.name    = 'Mínimo 2 caracteres.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email   = 'Email inválido.';
  if (!f.message.trim() || f.message.trim().length<10) e.message = 'Mínimo 10 caracteres.';
  return e;
}

const LINKS = [
  { l:'Email',     v:CONTACT.email,           h:`mailto:${CONTACT.email}`,    col:'var(--green)' },
  { l:'LinkedIn',  v:CONTACT.linkedinDisplay, h:CONTACT.linkedin,             col:'var(--blue)'  },
  { l:'GitHub',    v:CONTACT.githubDisplay,   h:CONTACT.github,               col:'var(--muted)' },
  { l:'WhatsApp',  v:CONTACT.whatsappDisplay, h:CONTACT.whatsapp,             col:'var(--amber)' },
];

type Status = 'idle'|'loading'|'ok'|'err';

export default function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-40px' });
  const [form, setForm] = useState<F>({ name:'', email:'', message:'' });
  const [errs, setErrs] = useState<E>({});
  const [status, setStatus] = useState<Status>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const {name,value} = e.target;
    setForm(p=>({...p,[name]:value}));
    if (errs[name as keyof E]) setErrs(p=>({...p,[name]:undefined}));
  };

  const submit = async () => {
    const e = validate(form);
    if (Object.keys(e).length) { setErrs(e); return; }
    setStatus('loading');
    try {
      const r = await fetch(FORMSPREE, {
        method:'POST', headers:{'Accept':'application/json','Content-Type':'application/json'},
        body: JSON.stringify(form),
      });
      setStatus(r.ok ? 'ok' : 'err');
      if (r.ok) setForm({ name:'', email:'', message:'' });
    } catch { setStatus('err'); }
  };

  const cls = (f: keyof E) =>
    `w-full bg-[var(--ink)] border rounded-sm px-4 py-3 font-mono text-sm text-[var(--white)] placeholder-[var(--faint)] focus:outline-none transition-all duration-200
     ${errs[f] ? 'border-[var(--red)]/50 focus:border-[var(--red)]' : 'border-[var(--rim)] focus:border-[var(--amber)]/50'}`;

  return (
    <section id="contact" ref={ref} className="relative py-28 px-6" aria-labelledby="contact-h">
      <div className="absolute inset-x-0 top-0 hr-fade" aria-hidden="true"/>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{ opacity:1, y:0 }:{}} className="mb-14">
          <div className="flex items-center gap-4 mb-2">
            <span className="label text-[var(--amber)]">04</span>
            <div className="w-8 h-px bg-[var(--amber)]" aria-hidden="true"/>
            <h2 id="contact-h" className="font-display font-bold text-3xl md:text-4xl text-[var(--white)]">Vamos conversar</h2>
          </div>
          <p className="text-[var(--muted)] text-sm ml-[calc(8px+2rem+1rem)] max-w-md">
            Aberto a oportunidades, freelance ou uma boa troca sobre tecnologia.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Links */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={inView?{ opacity:1, x:0 }:{}} transition={{ delay:.1 }}>
            <div className="border border-[var(--rim)] rounded-sm overflow-hidden mb-6">
              {LINKS.map((lk, i) => (
                <motion.a key={lk.l} href={lk.h}
                  target={lk.h.startsWith('mailto')?undefined:'_blank'}
                  rel={lk.h.startsWith('mailto')?undefined:'noopener noreferrer'}
                  whileHover={{ x:4 }}
                  className={`flex items-center gap-4 px-5 py-4 group hover:bg-[var(--panel)] transition-all ${i<LINKS.length-1?'border-b border-[var(--rim)]':''}`}
                  aria-label={`${lk.l}: ${lk.v}`}>
                  <div className="w-1 h-7 rounded-full flex-shrink-0" style={{background:lk.col}} aria-hidden="true"/>
                  <div className="flex-1 min-w-0">
                    <div className="label mb-0.5">{lk.l}</div>
                    <div className="font-mono text-sm text-[var(--muted)] group-hover:text-[var(--white)] transition-colors truncate">{lk.v}</div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--faint)] group-hover:text-[var(--muted)] flex-shrink-0" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <div className="border border-[var(--rim)] rounded-sm px-5 py-4 flex items-center gap-4">
              <div className="w-1 h-7 rounded-full bg-[var(--faint)] flex-shrink-0" aria-hidden="true"/>
              <div>
                <div className="label mb-0.5">Localização</div>
                <div className="font-mono text-sm text-[var(--muted)]">{CONTACT.location}</div>
                <div className="font-mono text-[11px] text-[var(--faint)] mt-0.5">{CONTACT.locationNote}</div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity:0, x:20 }} animate={inView?{ opacity:1, x:0 }:{}} transition={{ delay:.15 }}>
            {status === 'ok' ? (
              <motion.div initial={{ opacity:0, scale:.97 }} animate={{ opacity:1, scale:1 }}
                className="border border-[var(--green)]/20 bg-[var(--green)]/5 rounded-sm p-10 text-center flex flex-col items-center gap-4 h-full justify-center"
                role="status" aria-live="polite">
                <div className="w-12 h-12 border border-[var(--green)]/30 rounded-sm flex items-center justify-center text-[var(--green)] text-xl" aria-hidden="true">✓</div>
                <h3 className="font-display font-semibold text-lg text-[var(--white)]">Mensagem enviada</h3>
                <p className="text-[var(--muted)] text-sm">Responderei em até 24h.</p>
                <button onClick={()=>setStatus('idle')}
                  className="font-mono text-xs text-[var(--amber)] hover:underline bg-transparent border-none cursor-pointer">
                  enviar outra
                </button>
              </motion.div>
            ) : (
              <div className="border border-[var(--rim)] rounded-sm overflow-hidden">
                <div className="px-5 py-3 bg-[var(--panel)] border-b border-[var(--rim)]">
                  <span className="label">// formulário de contato</span>
                </div>
                <div className="p-6 space-y-4">
                  {(['name','email','message'] as (keyof F)[]).map(field => (
                    <div key={field}>
                      <label htmlFor={`c-${field}`} className="block label mb-2">
                        {field === 'name' ? 'Nome' : field === 'email' ? 'Email' : 'Mensagem'} *
                      </label>
                      {field === 'message' ? (
                        <textarea id={`c-${field}`} name={field} value={form[field]} onChange={onChange}
                          placeholder={field==='message'?'Olá Kauan, tenho uma oportunidade...' : ''}
                          rows={5} className={`${cls(field)} resize-none`}
                          aria-required="true" aria-describedby={errs[field]?`e-${field}`:undefined}
                          disabled={status==='loading'}/>
                      ) : (
                        <input id={`c-${field}`} name={field} type={field==='email'?'email':'text'}
                          value={form[field]} onChange={onChange}
                          placeholder={field==='name'?'Seu nome':'seu@email.com'}
                          className={cls(field)} autoComplete={field}
                          aria-required="true" aria-describedby={errs[field]?`e-${field}`:undefined}
                          disabled={status==='loading'}/>
                      )}
                      {errs[field] && <p id={`e-${field}`} className="mt-1 font-mono text-[11px] text-[var(--red)]" role="alert">{errs[field]}</p>}
                    </div>
                  ))}

                  {status==='err' && <p className="font-mono text-[11px] text-[var(--red)]" role="alert">// Erro ao enviar. Tente pelo email diretamente.</p>}

                  <motion.button onClick={submit} disabled={status==='loading'}
                    whileHover={status!=='loading'?{ y:-1 }:{}} whileTap={{ scale:.97 }}
                    className="w-full py-3 bg-[var(--amber)] text-[var(--void)] font-display font-semibold text-sm rounded-sm hover:bg-[#f0ac22] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {status==='loading' ? (
                      <><span className="w-4 h-4 border-2 border-[var(--void)]/30 border-t-[var(--void)] rounded-full animate-spin" aria-hidden="true"/>Enviando...</>
                    ) : 'Enviar mensagem →'}
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
