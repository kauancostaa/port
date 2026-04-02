// src/data/projects.ts
export type ProjectStatus = 'stable' | 'in-development' | 'mvp' | 'archived';

export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  repoUrl: string;
  demoUrl?: string;
  stack: string[];
  status: ProjectStatus;
  statusLabel: string;
  accentColor: string;
  highlights: string[];
  year: number;
}

export const PROJECTS: Project[] = [
  {
    id: 'fintrack-ai',
    title: 'FinTrackAI',
    shortDesc: 'Motor de detecção de fraudes financeiras com análise em tempo real',
    longDesc:
      'Sistema de análise de transações financeiras que aplica heurísticas e modelos de ML para identificar padrões suspeitos, gerar alertas em tempo real e produzir relatórios de risco detalhados. Construído com TypeScript estrito end-to-end.',
    image: '/projects/fintrack-demo.png',
    repoUrl: 'https://github.com/kauancostaa/FinTrackAI',
    stack: ['TypeScript', 'Node.js', 'Analytics', 'REST API'],
    status: 'in-development',
    statusLabel: 'Em desenvolvimento',
    accentColor: '#00d4ff',
    highlights: [
      'Detecção de anomalias em tempo real',
      'Scoring de risco por transação',
      'Dashboard analítico interativo',
      'TypeScript estrito (strict mode)',
    ],
    year: 2024,
  },
  {
    id: 'crypto-btg',
    title: 'CryptoBTG',
    shortDesc: 'Exchange de criptomoedas com orderbook e carteira integrada',
    longDesc:
      'Plataforma completa de compra e venda de criptomoedas com suporte a múltiplos pares de trading, orderbook em tempo real, histórico de transações e gestão de carteira digital.',
    image: '/projects/crypto-demo.png',
    repoUrl: 'https://github.com/kauancostaa/CryptoBTG',
    stack: ['JavaScript', 'React', 'WebSocket', 'REST API'],
    status: 'mvp',
    statusLabel: 'MVP',
    accentColor: '#f7b731',
    highlights: [
      'Orderbook em tempo real',
      'Múltiplos pares de trading',
      'Gestão de carteira digital',
      'Histórico de transações',
    ],
    year: 2024,
  },
  {
    id: 'order-api',
    title: 'Order API',
    shortDesc: 'API RESTful de gerenciamento de pedidos com autenticação JWT',
    longDesc:
      'API de alta performance para gerenciamento completo do ciclo de vida de pedidos: criação, rastreamento, atualização de status e relatórios. Documentação automática via Swagger/OpenAPI com testes unitários e de integração.',
    image: '/projects/order-api-demo.png',
    repoUrl: 'https://github.com/kauancostaa/order-api',
    stack: ['Node.js', 'Express', 'JavaScript', 'Swagger', 'JWT'],
    status: 'stable',
    statusLabel: 'Estável',
    accentColor: '#00ff88',
    highlights: [
      'CRUD completo com validação',
      'JWT auth + roles',
      'Swagger/OpenAPI docs',
      'Testes unitários e de integração',
    ],
    year: 2024,
  },
  {
    id: 'sistema-cobrancas',
    title: 'Sistema de Cobranças',
    shortDesc: 'Automação de cobranças com IA, WhatsApp e Pix integrados',
    longDesc:
      'Sistema fullstack de automação de contas a receber com IA generativa (Anthropic API) para comunicação personalizada, notificações via WhatsApp (Z-API/Twilio), pagamentos Pix via Asaas e dashboard completo de gestão financeira.',
    image: '/projects/cobrancas-demo.png',
    repoUrl: 'https://github.com/kauancostaa/sistema-cobrancas',
    stack: ['Node.js', 'React', 'Anthropic API', 'WhatsApp', 'Pix'],
    status: 'stable',
    statusLabel: 'Estável',
    accentColor: '#9b5de5',
    highlights: [
      'IA generativa (Anthropic Claude)',
      'Notificações WhatsApp automáticas',
      'Geração de link Pix via Asaas',
      'Dashboard financeiro + CSV export',
    ],
    year: 2024,
  },
];

export const ALL_TECHS: string[] = [
  ...new Set(PROJECTS.flatMap((p) => p.stack)),
].sort();

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  stable: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  'in-development': 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
  mvp: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  archived: 'text-zinc-400 border-zinc-600 bg-zinc-800/50',
};
