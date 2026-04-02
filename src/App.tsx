// src/App.tsx
import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { usePortfolioStore } from './store/usePortfolioStore';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Lazy loaded sections for performance
const About = lazy(() => import('./components/About'));
const ProjectsGrid = lazy(() => import('./components/ProjectsGrid'));
const Metrics = lazy(() => import('./components/Metrics'));
const Contact = lazy(() => import('./components/Contact'));

function SectionLoader() {
  return (
    <div className="flex justify-center items-center py-24">
      <div className="w-6 h-6 border-2 border-t-transparent border-emerald-400 rounded-full animate-spin" />
    </div>
  );
}

function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ProjectsGrid />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Metrics />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </main>
  );
}

export default function App() {
  const theme = usePortfolioStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="scanlines min-h-screen bg-[#030508] dark:bg-[#030508] transition-colors duration-300"
         style={{ background: theme === 'light' ? '#f0f4f8' : '#030508' }}>
      <BrowserRouter>
        {/* Skip to content for a11y */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
                     focus:px-4 focus:py-2 focus:bg-emerald-400 focus:text-black focus:rounded-lg focus:font-mono focus:text-sm"
        >
          Pular para o conteúdo
        </a>

        {/* Global ambient grid */}
        <div className="fixed inset-0 grid-bg pointer-events-none" aria-hidden="true" />

        {/* Ambient glow top */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 65%)', filter: 'blur(60px)' }}
          aria-hidden="true"
        />
        {/* Ambient glow bottom-right */}
        <div
          className="fixed bottom-0 right-0 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(155,93,229,0.06) 0%, transparent 65%)', filter: 'blur(60px)' }}
          aria-hidden="true"
        />

        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
