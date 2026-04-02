// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Apply saved theme before first paint to avoid flash
try {
  const saved = localStorage.getItem('portfolio-store');
  const parsed = saved ? JSON.parse(saved) : null;
  const isDark = parsed?.state?.theme !== 'light';
  document.documentElement.classList.toggle('dark', isDark);
} catch {
  document.documentElement.classList.add('dark');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
