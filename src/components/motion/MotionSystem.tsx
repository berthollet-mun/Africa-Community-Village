'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'motion/react';

export const MotionSystem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 0.8,
      easing: (value) => 1 - Math.pow(1 - value, 4),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1
    });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
};
