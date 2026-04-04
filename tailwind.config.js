/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
        body:    ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        void:   '#07080a',
        ink:    '#0e1117',
        panel:  '#13181f',
        rim:    '#1c2330',
        // New accent palette — warm amber + electric blue, NO generic purple gradients
        lo: {
          amber:  '#e8a020',
          blue:   '#2d7ef7',
          red:    '#e84040',
          green:  '#26bf6e',
          white:  '#f0f2f5',
          muted:  '#8891a4',
          faint:  '#3a4455',
        },
      },
      animation: {
        'float':     'float 7s ease-in-out infinite',
        'blink':     'blink 1.1s step-end infinite',
        'marquee':   'marquee 28s linear infinite',
        'pulse-dot': 'pulseDot 2.4s ease-in-out infinite',
        'draw':      'drawLine 1.2s ease-out forwards',
      },
      keyframes: {
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-18px)' } },
        blink:    { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        marquee:  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseDot: { '0%,100%': { boxShadow: '0 0 0 0 rgba(232,160,32,0.4)' }, '50%': { boxShadow: '0 0 0 6px rgba(232,160,32,0)' } },
        drawLine: { '0%': { strokeDashoffset: '1' }, '100%': { strokeDashoffset: '0' } },
      },
      transitionTimingFunction: {
        'snap':    'cubic-bezier(0.19, 1, 0.22, 1)',
        'bounce':  'cubic-bezier(0.34, 1.4, 0.64, 1)',
        'organic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}
