// src/components/ProjectImage.tsx
// Tenta carregar imagem local; se falhar, renderiza SVG estilizado com gradiente do projeto.

import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  accentColor: string;
  title: string;
  className?: string;
}

// SVG placeholder with project-specific gradient and icon
function FallbackImage({ accentColor, title }: { accentColor: string; title: string }) {
  // Gera segundo tom de cor para gradiente a partir da cor principal
  const secondary = accentColor === '#00ff88' ? '#00d4ff'
    : accentColor === '#00d4ff' ? '#9b5de5'
    : accentColor === '#f7b731' ? '#ff6b35'
    : '#00d4ff';

  const initials = title
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <svg
      viewBox="0 0 400 240"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
      aria-label={`Placeholder de imagem para ${title}`}
    >
      <defs>
        <linearGradient id={`grad-${title}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.15" />
          <stop offset="100%" stopColor={secondary} stopOpacity="0.08" />
        </linearGradient>
        <pattern id={`grid-${title}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
        </pattern>
      </defs>

      {/* Background */}
      <rect width="400" height="240" fill="#0d1520" />
      {/* Grid */}
      <rect width="400" height="240" fill={`url(#grid-${title})`} />
      {/* Gradient overlay */}
      <rect width="400" height="240" fill={`url(#grad-${title})`} />

      {/* Corner accent */}
      <circle cx="380" cy="20" r="60" fill={accentColor} opacity="0.06" />
      <circle cx="20" cy="220" r="40" fill={secondary} opacity="0.06" />

      {/* Center icon */}
      <circle cx="200" cy="110" r="40" fill={accentColor} opacity="0.1" />
      <circle cx="200" cy="110" r="30" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.3" />
      <text
        x="200"
        y="117"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fontFamily="JetBrains Mono, monospace"
        fill={accentColor}
        opacity="0.8"
      >
        {initials}
      </text>

      {/* Label */}
      <text
        x="200"
        y="175"
        textAnchor="middle"
        fontSize="12"
        fontFamily="JetBrains Mono, monospace"
        fill="rgba(255,255,255,0.3)"
      >
        {title}
      </text>

      {/* Decorative lines */}
      <line x1="0" y1="0" x2="400" y2="0" stroke={accentColor} strokeWidth="1" opacity="0.2" />
      <line x1="0" y1="239" x2="400" y2="239" stroke={accentColor} strokeWidth="0.5" opacity="0.1" />
    </svg>
  );
}

export default function ProjectImage({ src, alt, accentColor, title, className = '' }: ProjectImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <FallbackImage accentColor={accentColor} title={title} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover w-full h-full ${className}`}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
