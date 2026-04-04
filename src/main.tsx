// src/main.tsx

// ─────────────────────────────────────────────────────────────────────────────
// Q5: SELF-HOST FONTS — descomente após: npm install @fontsource/syne @fontsource/jetbrains-mono @fontsource/dm-sans
// E remova os <link> do Google Fonts no index.html
// ─────────────────────────────────────────────────────────────────────────────
// import '@fontsource/syne/400.css';
// import '@fontsource/syne/600.css';
// import '@fontsource/syne/700.css';
// import '@fontsource/syne/800.css';
// import '@fontsource/jetbrains-mono/400.css';
// import '@fontsource/jetbrains-mono/500.css';
// import '@fontsource/jetbrains-mono/700.css';
// import '@fontsource/dm-sans/300.css';
// import '@fontsource/dm-sans/400.css';
// import '@fontsource/dm-sans/500.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Q13: Sempre dark mode — sem FOUC, sem toggle, sem complexidade
document.documentElement.classList.add('dark');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
