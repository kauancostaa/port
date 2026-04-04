// src/config/profile.ts
// Q42: Configurável — basta mudar isOpenToWork para false quando necessário

export const PROFILE = {
  name: 'Kauan Costa',
  fullName: 'Kauan Vieira da Costa',
  role: 'Software Engineer · Systems Analyst · AI Builder',
  isOpenToWork: true, // Q42: toggle para ativar/desativar badge
  cvUrl: '/kauan-costa-cv.pdf', // Q52: download CV
  location: 'São Paulo, SP',
  locationFull: 'São Paulo, SP — Brasil',
} as const;
