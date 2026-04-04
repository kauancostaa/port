import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function CustomCursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || window.matchMedia('(hover:none)').matches) return;
    const d = dot.current, r = ring.current;
    if (!d || !r) return;
    let mx=0, my=0, rx=0, ry=0, raf: number;

    const move = (e: MouseEvent) => {
      mx=e.clientX; my=e.clientY;
      d.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;
      const el = e.target as HTMLElement;
      const hot = !!el.closest('a,button,[role="button"],input,textarea');
      d.style.width  = hot ? '4px' : '5px';
      d.style.height = hot ? '4px' : '5px';
      d.style.background = hot ? 'var(--blue)' : 'var(--amber)';
      r.style.width  = hot ? '40px' : '28px';
      r.style.height = hot ? '40px' : '28px';
      r.style.borderColor = hot ? 'rgba(45,126,247,0.4)' : 'rgba(232,160,32,0.2)';
    };
    const anim = () => {
      rx+=(mx-rx)*.11; ry+=(my-ry)*.11;
      r.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf=requestAnimationFrame(anim);
    };
    anim();
    window.addEventListener('mousemove', move);
    document.body.style.cursor='none';
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove',move); document.body.style.cursor=''; };
  }, [reduced]);

  if (reduced) return null;
  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full transition-[width,height,background] duration-100"
        style={{width:5,height:5,background:'var(--amber)',willChange:'transform'}} aria-hidden="true"/>
      <div ref={ring} className="fixed top-0 left-0 z-[9996] pointer-events-none rounded-full border transition-[width,height,border-color] duration-200"
        style={{width:28,height:28,borderColor:'rgba(232,160,32,0.2)',willChange:'transform'}} aria-hidden="true"/>
    </>
  );
}
