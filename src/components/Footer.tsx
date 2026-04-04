import { CONTACT } from '../config/contact';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--rim)] py-8 px-6" role="contentinfo">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--faint)]">
          <span className="text-[var(--amber)]">[</span>
          <span>KC</span>
          <span className="text-[var(--amber)]">]</span>
          <span className="ml-2">© {new Date().getFullYear()} Kauan Vieira da Costa</span>
        </div>
        <div className="flex items-center gap-6">
          {[
            {l:'GitHub',   h:CONTACT.github},
            {l:'LinkedIn', h:CONTACT.linkedin},
            {l:'Email',    h:`mailto:${CONTACT.email}`},
          ].map(({l,h})=>(
            <a key={l} href={h} target={h.startsWith('mailto')?undefined:'_blank'} rel={h.startsWith('mailto')?undefined:'noopener noreferrer'}
              className="font-mono text-xs text-[var(--faint)] hover:text-[var(--amber)] transition-colors">
              {l}
            </a>
          ))}
        </div>
        <div className="font-mono text-[10px] text-[var(--faint)]">React · Vite · Framer Motion</div>
      </div>
    </footer>
  );
}
