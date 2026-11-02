import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PageProgressBar: React.FC = () => {
  const { currentRoute, isLoading, actionLoading } = useApp();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [routePending, setRoutePending] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    const handleStart = () => setRequestCount((count) => count + 1);
    const handleEnd = () => setRequestCount((count) => Math.max(0, count - 1));

    window.addEventListener('acv:request-start', handleStart);
    window.addEventListener('acv:request-end', handleEnd);

    return () => {
      window.removeEventListener('acv:request-start', handleStart);
      window.removeEventListener('acv:request-end', handleEnd);
    };
  }, []);

  useEffect(() => {
    setRoutePending(true);
    const timer = window.setTimeout(() => setRoutePending(false), 650);
    return () => window.clearTimeout(timer);
  }, [currentRoute]);

  const actionPending = actionLoading?.isOpen && actionLoading.status === 'loading';
  const isActive = routePending || isLoading || requestCount > 0 || actionPending;

  useEffect(() => {
    if (isActive) {
      hasStarted.current = true;
      setVisible(true);
      setProgress((value) => (value < 12 ? 12 : Math.min(value, 88)));

      const interval = window.setInterval(() => {
        setProgress((value) => {
          if (value >= 92) return value;
          return Math.min(92, value + Math.max(1, (92 - value) * 0.16));
        });
      }, 160);

      return () => window.clearInterval(interval);
    }

    if (!hasStarted.current) return;

    setProgress(100);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      setProgress(0);
      hasStarted.current = false;
    }, 240);

    return () => window.clearTimeout(hideTimer);
  }, [isActive]);

  return (
    <div
      role="progressbar"
      aria-label="Chargement de la page"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      className={`pointer-events-none fixed inset-x-0 top-0 z-[100000] h-[3px] overflow-hidden transition-opacity duration-150 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="relative h-full w-full origin-left bg-gradient-to-r from-[#690C07] via-[#8B1510] to-[#EFA62B] shadow-[0_0_10px_rgba(239,166,43,0.75)] transition-transform duration-200 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      >
        <span className="absolute right-0 top-0 h-full w-16 bg-white/30 blur-[2px]" />
      </div>
    </div>
  );
};
