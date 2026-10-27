import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export interface CircleProgressIndicatorProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  progress?: number; // 0 to 100 (if undefined, indeterminate spinner)
  message?: string;
  submessage?: string;
  status?: 'loading' | 'success';
  className?: string;
  showLogo?: boolean;
}

export const CircleProgressIndicator: React.FC<CircleProgressIndicatorProps> = ({
  size = 'md',
  progress,
  message = 'Traitement en cours...',
  submessage = 'Veuillez patienter pour la confirmation',
  status = 'loading',
  className = '',
  showLogo = false
}) => {
  const sizeMap = {
    sm: { diameter: 36, stroke: 3.5, text: 'text-xs', iconSize: 18 },
    md: { diameter: 56, stroke: 4.5, text: 'text-sm', iconSize: 26 },
    lg: { diameter: 80, stroke: 5.5, text: 'text-base', iconSize: 36 },
    xl: { diameter: 104, stroke: 6.5, text: 'text-lg', iconSize: 48 }
  };

  const config = sizeMap[size];
  const radius = (config.diameter - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const isDeterminate = typeof progress === 'number' && progress >= 0 && progress <= 100;
  const strokeDashoffset = isDeterminate
    ? circumference - (progress / 100) * circumference
    : circumference * 0.25;

  return (
    <div
      role="progressbar"
      aria-busy={status === 'loading'}
      aria-label={message}
      className={`flex flex-col items-center justify-center gap-3 select-none ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Ambient halo glow */}
        <div
          className="absolute rounded-full bg-[#EFA62B]/20 blur-md pointer-events-none animate-pulse"
          style={{
            width: config.diameter * 1.3,
            height: config.diameter * 1.3
          }}
        />

        <svg
          width={config.diameter}
          height={config.diameter}
          viewBox={`0 0 ${config.diameter} ${config.diameter}`}
          className={`relative z-10 ${!isDeterminate && status === 'loading' ? 'animate-spin' : ''}`}
          style={{ animationDuration: '1.2s' }}
        >
          <defs>
            <linearGradient id="acv-circle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#690C07" />
              <stop offset="50%" stopColor="#EFA62B" />
              <stop offset="100%" stopColor="#0E7490" />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            cx={config.diameter / 2}
            cy={config.diameter / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            className="text-[#E2D7C3]"
          />

          {/* Active Animated Progress Arc */}
          <circle
            cx={config.diameter / 2}
            cy={config.diameter / 2}
            r={radius}
            fill="none"
            stroke="url(#acv-circle-gradient)"
            strokeWidth={config.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
            transform={`rotate(-90 ${config.diameter / 2} ${config.diameter / 2})`}
          />
        </svg>

        {/* Center content: Success Checkmark or Logo or Percentage */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          {status === 'success' ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            >
              <CheckCircle2
                className="text-[#0E7490]"
                style={{ width: config.iconSize, height: config.iconSize }}
              />
            </motion.div>
          ) : showLogo ? (
            <div
              className="rounded-full bg-white p-0.5 shadow-xs overflow-hidden flex items-center justify-center"
              style={{
                width: config.diameter * 0.58,
                height: config.diameter * 0.58
              }}
            >
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_23.24.00_f60ee00b.jpeg"
                alt="ACV"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          ) : isDeterminate ? (
            <span className="font-mono font-bold text-xs text-[#232826]">
              {Math.round(progress)}%
            </span>
          ) : (
            <div className="w-2.5 h-2.5 rounded-full bg-[#690C07] animate-ping opacity-75" />
          )}
        </div>
      </div>

      {/* Message & Feedback */}
      {(message || submessage) && (
        <div className="text-center max-w-xs space-y-0.5">
          {message && (
            <p className={`font-display font-bold text-stone-900 ${config.text} leading-tight`}>
              {message}
            </p>
          )}
          {submessage && (
            <p className="text-[11px] sm:text-xs text-stone-500 font-label">
              {submessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Global Floating / Modal Action Progress Overlay
export const ActionProgressOverlay: React.FC<{
  isOpen: boolean;
  message?: string;
  submessage?: string;
  status?: 'loading' | 'success';
}> = ({
  isOpen,
  message = 'Traitement de votre action...',
  submessage = 'Veuillez patienter pour une suite favorable',
  status = 'loading'
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="action-progress-overlay"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-[99999] pointer-events-auto"
        >
          <div className="flex items-center gap-4 bg-[#F3EDE1]/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-2xl border border-[#E2D7C3] ring-1 ring-black/5 min-w-[280px] max-w-sm">
            <CircleProgressIndicator
              size="sm"
              status={status}
              showLogo={false}
              message=""
              submessage=""
            />
            <div className="flex-1 min-w-0">
              <p className="font-display font-extrabold text-xs sm:text-sm text-[#232826] truncate">
                {message}
              </p>
              <p className="font-label text-[11px] text-[#690C07] font-semibold truncate mt-0.5">
                {status === 'success'
                  ? 'Opération validée avec succès !'
                  : submessage}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
