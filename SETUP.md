# Setup — Kauan Portfolio v2.0

## Instalação rápida

```bash
# 1. Instalar dependências base
npm install

# 2. Q5 — Self-host fonts (elimina Google Fonts, +10 Lighthouse)
npm install @fontsource/syne @fontsource/jetbrains-mono @fontsource/dm-sans

# 3. Q55 — Testes (opcional mas recomendado)
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# 4. Q51 — Bundle analyzer (ver onde está o peso)
npm install -D vite-bundle-visualizer

# 5. Rodar em dev
npm run dev
```

## Após instalar @fontsource — editar main.tsx

Adicionar ANTES do `import './index.css'`:

```ts
// Q5: Self-hosted fonts — sem request externo
import '@fontsource/syne/400.css';
import '@fontsource/syne/600.css';
import '@fontsource/syne/700.css';
import '@fontsource/syne/800.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/dm-sans/300.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
```

E **remover** do `index.html` os três `<link>` do Google Fonts:
```html
<!-- REMOVER estas linhas do index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Syne..." rel="stylesheet" />
```

## Configurar Formspree (Q14)

1. Acesse [formspree.io](https://formspree.io) e crie uma conta
2. Crie um novo formulário — copie o ID gerado (ex: `xkndvabq`)
3. Em `src/components/Contact.tsx`, linha 30:
   ```ts
   const FORMSPREE_URL = 'https://formspree.io/f/SEU_ID_AQUI';
   ```

## Screenshots dos projetos (Q17)

Coloque suas screenshots reais em:
```
public/projects/fintrack-demo.png
public/projects/crypto-demo.png
public/projects/order-api-demo.png
public/projects/cobrancas-demo.png
```
Recomendado: 800×400px, formato PNG ou WebP.

## Deploy no Netlify

```bash
npm run build
# Fazer deploy da pasta dist/ no Netlify
# O netlify.toml já está configurado com CSP, redirects e cache
```

## Variáveis de ambiente

```bash
cp .env.example .env
# Editar .env com seus valores reais
```

## Checklist pós-deploy

- [ ] Testar formulário de contato (Formspree)
- [ ] Verificar OG image no [opengraph.xyz](https://opengraph.xyz)
- [ ] Testar Konami code (↑↑↓↓←→←→BA)
- [ ] Testar 5 cliques no logo KC
- [ ] Verificar Lighthouse (meta: 95+ Performance, 100 Accessibility)
- [ ] Testar com prefers-reduced-motion ativado
- [ ] Confirmar validade do CKAD (Q45)
