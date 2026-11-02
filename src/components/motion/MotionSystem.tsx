'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

const CURSOR_SPRING = { stiffness: 850, damping: 42, mass: 0.18 };

export const MotionSystem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reducedMotion = useReducedMotion();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, CURSOR_SPRING);
  const smoothY = useSpring(cursorY, CURSOR_SPRING);
  const cursorScale = useMotionValue(0);
  const smoothScale = useSpring(cursorScale, { stiffness: 520, damping: 32 });

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

  useEffect(() => {
    if (reducedMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX - 6);
      cursorY.set(event.clientY - 6);
      cursorScale.set(1);
    };
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      cursorScale.set(target?.closest('a, button, input, select, textarea, [data-cursor]') ? 2.6 : 1);
    };
    const onPointerLeave = () => cursorScale.set(0);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onPointerLeave);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [cursorScale, cursorX, cursorY, reducedMotion]);

  return (
    <>
      {children}
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="acv-premium-cursor"
          style={{ x: smoothX, y: smoothY, scale: smoothScale }}
        />
      )}
    </>
  );
};
