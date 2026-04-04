import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';

const About        = lazy(() => import('./components/About'));
const ProjectsGrid = lazy(() => import('./components/ProjectsGrid'));
const Metrics      = lazy(() => import('./components/Metrics'));
const Contact      = lazy(() => import('./components/Contact'));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24" aria-hidden="true">
      <div className="flex gap-1.5">
        {[0,1,2].map(i=>(
          <div key={i} className="w-1 h-1 rounded-full bg-[var(--amber)]/40"
            style={{animation:`blink 1.1s step-end ${i*0.2}s infinite`}}/>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  // Konami code easter egg
  const [konami, setKonami] = useState(false);
  useEffect(() => {
    const K = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let i = 0;
    const h = (e: KeyboardEvent) => {
      if (e.key === K[i]) { i++; if (i===K.length) { setKonami(true); i=0; setTimeout(()=>setKonami(false),3000); } }
      else i=0;
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--void)]">
      <CustomCursor />

      {/* Konami overlay */}
      {konami && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <div className="text-center font-mono" style={{animation:'fadeSlideUp .3s ease-out'}}>
            <div className="text-5xl mb-3">⚡</div>
            <div className="text-sm text-[var(--amber)] tracking-widest uppercase">// modo hacker ativado</div>
            <div className="text-xs text-[var(--muted)] mt-2">easter egg encontrado</div>
          </div>
        </div>
      )}

      {/* Skip to content */}
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--amber)] focus:text-[var(--void)] focus:rounded-sm focus:font-mono focus:text-xs">
        Pular para o conteúdo
      </a>

      {/* Grid global */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-60" aria-hidden="true"/>

      {/* Ambient glow — warm, not purple */}
      <div className="fixed top-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{background:'radial-gradient(ellipse at 0% 0%, rgba(232,160,32,0.04) 0%, transparent 60%)'}} aria-hidden="true"/>
      <div className="fixed bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{background:'radial-gradient(ellipse at 100% 100%, rgba(45,126,247,0.05) 0%, transparent 60%)'}} aria-hidden="true"/>

      <Navbar />

      <main id="main-content">
        <Hero />
        <Suspense fallback={<SectionLoader />}><About /></Suspense>
        <Suspense fallback={<SectionLoader />}><ProjectsGrid /></Suspense>
        <Suspense fallback={<SectionLoader />}><Metrics /></Suspense>
        <Suspense fallback={<SectionLoader />}><Contact /></Suspense>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
