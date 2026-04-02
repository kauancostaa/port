// src/components/Contact.tsx
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim() || form.name.trim().length < 2) errors.name = 'Nome precisa ter ao menos 2 caracteres.';
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Email inválido.';
  if (!form.message.trim() || form.message.trim().length < 10) errors.message = 'Mensagem precisa ter ao menos 10 caracteres.';
  return errors;
}

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'kaucosta.vieira@gmail.com',
    href: 'mailto:kaucosta.vieira@gmail.com',
    color: '#00ff88',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/kauanvcosta',
    href: 'https://linkedin.com/in/kauanvcosta',
    color: '#00d4ff',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/kauancostaa',
    href: 'https://github.com/kauancostaa',
    color: '#9b5de5',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: '+55 11 99667-0381',
    href: 'https://wa.me/5511996670381',
    color: '#f7b731',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    // Build mailto URL with form data
    const subject = encodeURIComponent(`[Portfólio] Mensagem de ${form.name}`);
    const body = encodeURIComponent(`Nome: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:kaucosta.vieira@gmail.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-white/3 border rounded-xl px-4 py-3 font-mono text-sm text-white placeholder-zinc-600
     focus:outline-none focus:ring-1 transition-all duration-200
     ${errors[field]
       ? 'border-red-500/50 focus:border-red-400 focus:ring-red-400/20'
       : 'border-white/8 focus:border-emerald-400/50 focus:ring-emerald-400/20'
     }`;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 px-6"
      aria-labelledby="contact-heading"
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, #9b5de5 40%, #00d4ff 60%, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14"
        >
          <p className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-3">04 / Contato</p>
          <h2
            id="contact-heading"
            className="font-['Syne',sans-serif] font-extrabold text-4xl md:text-5xl text-white mb-4"
          >
            Vamos conversar
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
            Aberto a oportunidades de trabalho, projetos freelance ou apenas uma boa troca de ideia sobre tecnologia.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <div className="space-y-4 mb-8">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="flex items-center gap-4 glass rounded-xl p-4 group hover:border-white/12 transition-all"
                  aria-label={`${link.label}: ${link.value} (abre ${link.href.startsWith('mailto') ? 'app de email' : 'em nova aba'})`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105"
                    style={{ background: `${link.color}15`, color: link.color, border: `1px solid ${link.color}30` }}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-0.5">{link.label}</div>
                    <div className="font-mono text-sm text-zinc-200 group-hover:text-white transition-colors">
                      {link.value}
                    </div>
                  </div>
                  <div className="ml-auto text-zinc-600 group-hover:text-zinc-400 transition-colors" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="glass rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center text-xl" aria-hidden="true">
                📍
              </div>
              <div>
                <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-0.5">Localização</div>
                <div className="font-mono text-sm text-zinc-200">São Paulo, SP — Brasil</div>
                <div className="font-mono text-[10px] text-zinc-500 mt-0.5">Remote-friendly · Disponível para relocation</div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center gap-4"
                role="status"
                aria-live="polite"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-2xl" aria-hidden="true">
                  ✓
                </div>
                <h3 className="font-['Syne',sans-serif] font-bold text-xl text-white">Mensagem enviada!</h3>
                <p className="text-zinc-400 text-sm">Seu app de email deve ter aberto. Responderei em breve.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                  className="font-mono text-sm text-emerald-400 hover:underline cursor-pointer bg-transparent border-none"
                >
                  Enviar outra mensagem
                </button>
              </motion.div>
            ) : (
              <div className="glass rounded-2xl p-6 md:p-8" role="form" aria-label="Formulário de contato">
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block font-mono text-xs text-zinc-400 mb-2 tracking-wider uppercase">
                      Nome *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      className={inputClass('name')}
                      autoComplete="name"
                      aria-required="true"
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 font-mono text-xs text-red-400" role="alert">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block font-mono text-xs text-zinc-400 mb-2 tracking-wider uppercase">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className={inputClass('email')}
                      autoComplete="email"
                      aria-required="true"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 font-mono text-xs text-red-400" role="alert">{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block font-mono text-xs text-zinc-400 mb-2 tracking-wider uppercase">
                      Mensagem *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Olá, Kauan! Tenho uma oportunidade..."
                      rows={5}
                      className={`${inputClass('message')} resize-none`}
                      aria-required="true"
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 font-mono text-xs text-red-400" role="alert">{errors.message}</p>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-3.5 rounded-xl bg-emerald-400 text-black font-['Syne',sans-serif] font-bold text-sm
                               hover:bg-emerald-300 transition-all duration-200 neon-green active:scale-[0.99]"
                    aria-label="Enviar mensagem por email"
                  >
                    Enviar mensagem →
                  </button>
                  <p className="text-center font-mono text-[10px] text-zinc-600">
                    Abrirá seu app de email com a mensagem preenchida.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
