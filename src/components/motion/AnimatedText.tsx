import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0
}) => {
  const reducedMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);

  if (reducedMotion) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.055, delayChildren: delay } }
        }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="mr-[0.24em] inline-flex overflow-hidden align-bottom" aria-hidden="true">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '105%', opacity: 0 },
                visible: { y: '0%', opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};
