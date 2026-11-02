import React from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: number;
  id?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className = '', tilt = 5, id }) => {
  const reducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 260, damping: 24 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 260, damping: 24 });

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -tilt * 2);
    rotateY.set(x * tilt * 2);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      id={id}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-35px' }}
      transition={{ duration: reducedMotion ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reducedMotion ? undefined : { y: -6, scale: 1.012 }}
      style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={`acv-animated-card ${className}`}
    >
      {children}
    </motion.div>
  );
};
