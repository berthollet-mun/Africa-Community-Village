import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StartupLoaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export const StartupLoader: React.FC<StartupLoaderProps> = ({
  onComplete,
  minDurationMs = 1500
}) => {
  const [progress, setProgress] = useState(12);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const phases = [
    { text: 'Connexion au réseau communautaire ACV...', pct: 28 },
    { text: 'Chargement des 5 piliers d’action & programmes...', pct: 64 },
    { text: 'Synchronisation des actualités du terrain...', pct: 88 },
    { text: 'Espace prêt. Bienvenue à Africa Community Village.', pct: 100 }
  ];

  useEffect(() => {
    // Stepped progression across minDurationMs
    const stepTime = minDurationMs / 4;

    const t1 = setTimeout(() => {
      setProgress(phases[0].pct);
      setCurrentPhase(0);
    }, stepTime * 0.4);

    const t2 = setTimeout(() => {
      setProgress(phases[1].pct);
      setCurrentPhase(1);
    }, stepTime * 1.3);

    const t3 = setTimeout(() => {
      setProgress(phases[2].pct);
      setCurrentPhase(2);
    }, stepTime * 2.3);

    const t4 = setTimeout(() => {
      setProgress(100);
      setCurrentPhase(3);
    }, stepTime * 3.4);

    const tFinish = setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, minDurationMs + 350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(tFinish);
    };
  }, [minDurationMs, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="startup-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#232826] text-white px-4 select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full bg-[#690C07]/25 blur-[120px] pointer-events-none" />
          <div className="absolute w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full bg-[#EFA62B]/15 blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm sm:max-w-md w-full text-center">
            {/* Logo in High-Contrast Glowing Badge */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative mb-6"
            >
              {/* Outer Pulsing Rings */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-[#690C07]/30 animate-pulse blur-xs" />
              <div className="absolute -inset-1 rounded-full bg-[#EFA62B]/30 animate-ping opacity-30" />

              {/* Crisp White Logo Base */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white ring-4 ring-[#690C07]/40 shadow-2xl p-1.5 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_23.24.00_f60ee00b.jpeg"
                  alt="Africa Community Village (ACV)"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-1.5 mb-6"
            >
              <h1 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Africa Community Village
              </h1>
              <div className="flex items-center justify-center gap-2">
                <span className="font-label text-xs sm:text-xs text-[#EFA62B] font-extrabold uppercase tracking-widest">
                  ACV · Goma, RDC
                </span>
                <span className="text-stone-500">·</span>
                <span className="text-[11px] sm:text-xs text-stone-300 font-medium">
                  Ubuntu
                </span>
              </div>
            </motion.div>

            {/* Sleek Progress Bar Container */}
            <div className="w-full space-y-3 px-2 sm:px-4">
              <div className="w-full h-2 bg-stone-800/90 rounded-full overflow-hidden border border-white/10 p-0.5 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#690C07] via-[#EFA62B] to-[#0E7490] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Status and Percentage */}
              <div className="flex items-center justify-between text-xs text-stone-400 font-label">
                <span className="truncate pr-2 font-medium text-stone-300 animate-pulse">
                  {phases[currentPhase]?.text}
                </span>
                <span className="font-mono font-bold text-[#EFA62B] shrink-0">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Bottom Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.4 }}
              className="text-[11px] text-stone-400 mt-8 tracking-wide font-label uppercase"
            >
              Relèvement Communautaire par la Jeunesse
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
