import { useEffect, useMemo, useRef, useState } from 'react';

interface CountUpParts {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
}

function parseValue(value: string): CountUpParts {
  const match = value.match(/-?[\d,]+(?:\.\d+)?/);
  if (!match) return { prefix: '', target: 0, suffix: value, decimals: 0 };
  const numericText = match[0].replace(/,/g, '');
  const target = Number(numericText);
  const originalIndex = match.index ?? 0;
  const endIndex = originalIndex + match[0].length;
  return {
    prefix: value.slice(0, originalIndex),
    target,
    suffix: value.slice(endIndex),
    decimals: numericText.includes('.') ? numericText.split('.')[1].length : 0
  };
}

export function useCountUp(value: string, duration = 700) {
  const ref = useRef<HTMLElement>(null);
  const parts = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(() => `${parts.prefix}0${parts.suffix}`);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / Math.min(800, duration));
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = parts.target * eased;
        const formatted = new Intl.NumberFormat(undefined, {
          minimumFractionDigits: parts.decimals,
          maximumFractionDigits: parts.decimals
        }).format(current);
        setDisplay(`${parts.prefix}${formatted}${parts.suffix}`);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.45 });
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [duration, parts, value]);

  return { ref, display };
}
