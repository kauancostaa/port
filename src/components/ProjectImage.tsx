// src/components/ProjectImage.tsx
// Q18: useId() do React para IDs únicos nos SVGs (evita duplicatas)

import { useState, useId } from 'react';

interface ProjectImageProps {
  src:         string;
  alt:         string;
  accentColor: string;
  title:       string;
  className?:  string;
}

export default function ProjectImage({ src, alt, accentColor, title, className }: ProjectImageProps) {
  const [errored, setErrored] = useState(false);
  // Q18: IDs únicos por instância
  const uid         = useId();
  const gradientId  = `pg-${uid}`;
  const patternId   = `pp-${uid}`;

  if (errored || !src) {
    return (
      <div className={`${className ?? ''} flex items-center justify-center relative overflow-hidden`}>
        {/* SVG placeholder com IDs únicos */}
        <svg
          width="100%" height="100%"
          viewBox="0 0 400 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor={accentColor} stopOpacity="0.08" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.02" />
            </linearGradient>
            <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill={accentColor} opacity="0.12" />
            </pattern>
          </defs>
          <rect width="400" height="200" fill={`url(#${gradientId})`} />
          <rect width="400" height="200" fill={`url(#${patternId})`} />
          <text
            x="200" y="100"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={accentColor}
            opacity="0.25"
            fontSize="13"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="2"
          >
            {title}
          </text>
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
      loading="lazy"
      decoding="async"
    />
  );
}
