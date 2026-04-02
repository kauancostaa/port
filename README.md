# Kauan Costa — Portfolio

Portfolio profissional desenvolvido com React 18 + TypeScript + Vite + Framer Motion.

## Stack

| Camada | Tech |
|---|---|
| Framework | React 18 + TypeScript (strict) |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 |
| Animações | Framer Motion 11 |
| Estado global | Zustand 4 (com persist) |
| Roteamento | React Router DOM 6 |

## Setup rápido

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
# → http://localhost:5173

# 3. Build de produção
npm run build
npm run preview
```

## Estrutura

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Fixed nav + theme toggle
│   │   ├── Hero.tsx            # Typewriter + canvas partículas
│   │   ├── About.tsx           # Bio + experiência + skills
│   │   ├── ProjectImage.tsx    # Imagem com SVG fallback
│   │   ├── ProjectCard.tsx     # Card de projeto
│   │   ├── TechFilter.tsx      # Filtros de tecnologia (Zustand)
│   │   ├── ProjectsGrid.tsx    # Grid lazy-loaded + filtros
│   │   ├── Metrics.tsx         # Contadores animados
│   │   ├── Contact.tsx         # Links + formulário validado
│   │   └── Footer.tsx
│   ├── data/
│   │   └── projects.ts         # Dados dos 4 projetos
│   ├── store/
│   │   └── usePortfolioStore.ts # Zustand: filtros + tema
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   ├── favicon.svg
│   └── projects/               # Screenshots dos projetos (opcional)
│       ├── fintrack-demo.png
│       ├── crypto-demo.png
│       ├── order-api-demo.png
│       └── cobrancas-demo.png
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## Imagens dos projetos

As imagens ficam em `public/projects/`. Se não existirem, o componente `ProjectImage` 
renderiza automaticamente um SVG estilizado com o gradiente do projeto.

Para adicionar screenshots reais:
1. Capture um screenshot do projeto
2. Salve em `public/projects/` com os nomes exatos acima
3. Hot-reload atualiza automaticamente

## Features

- **Tema escuro/claro** persistido no localStorage via Zustand
- **Filtro de tecnologias** com estado reativo (Zustand)
- **Lazy loading** nas seções via React Suspense
- **Typewriter** animado no Hero com canvas de partículas
- **Contadores animados** (useCountUp hook) com easing
- **Formulário de contato** com validação e abertura de mailto
- **Acessibilidade**: aria-labels, roles, skip link, focus ring verde, contraste WCAG
- **Mobile-first** responsivo em todos os breakpoints

## Guia para recrutadores

### Navegação
- Use a navbar fixada no topo para pular para cada seção
- O botão de sol/lua alterna entre tema claro e escuro (persiste entre sessões)

### Projetos
- Clique nos filtros de tecnologia para filtrar projetos por stack
- Cada card tem link direto para o repositório GitHub
- O botão **Ver repositório** abre o código no GitHub

### Contato
- Use o formulário — ele abre seu app de email com tudo preenchido
- Ou clique nos cards de LinkedIn/WhatsApp/Email diretamente

---

Desenvolvido por **Kauan Vieira da Costa** · [github.com/kauancostaa](https://github.com/kauancostaa)
