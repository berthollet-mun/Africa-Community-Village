import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CircleProgressIndicator } from './CircleProgressIndicator';
import { motion, AnimatePresence } from 'motion/react';

export const PageProgressBar: React.FC = () => {
  const { currentRoute, isLoading, language, actionLoading } = useApp();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<'loading' | 'success'>('loading');

  const isFr = language === 'fr';

  useEffect(() => {
    // When route changes or loading starts, show progress bar & circular indicator
    setVisible(true);
    setStatus('loading');
    setProgress(25);

    const timer1 = setTimeout(() => {
      setProgress(65);
    }, 180);

    const timer2 = setTimeout(() => {
      setProgress(90);
    }, 380);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatus('success');
      const hideTimer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
        setStatus('loading');
      }, 500);
      return () => clearTimeout(hideTimer);
    }, 620);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [currentRoute, isLoading]);

  // If a specific action loading is active via AppContext, prioritize it
  const isActionActive = actionLoading?.isOpen || false;
  const isDisplaying = visible || isActionActive;
  const displayStatus = isActionActive ? actionLoading.status : status;
  const displayMessage = isActionActive
    ? actionLoading.message || (isFr ? 'Action en cours...' : 'Processing...')
    : (displayStatus === 'success'
        ? (isFr ? 'Opération validée !' : 'Action confirmed!')
        : (isFr ? 'Action en cours...' : 'Processing action...'));
  const displaySubmessage = isActionActive
    ? actionLoading.submessage || (isFr ? 'En attente d’une suite favorable...' : 'Awaiting confirmation...')
    : (displayStatus === 'success'
        ? (isFr ? 'Suite favorable confirmée' : 'Completed successfully')
        : (isFr ? 'En attente d’une suite favorable...' : 'Awaiting confirmation...'));

  return (
    <>
      {/* Top subtle micro line */}
      {isDisplaying && (
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-[9999] h-1 pointer-events-none overflow-hidden"
        >
          <div
            className="h-full bg-gradient-to-r from-[#690C07] via-[#EFA62B] to-[#0E7490] transition-all duration-300 ease-out shadow-xs"
            style={{
              width: isActionActive ? '100%' : `${progress}%`,
              opacity: isDisplaying ? 1 : 0
            }}
          />
        </div>
      )}

      {/* Floating Circular Progress Indicator Badge (Circle Progress Indicator) */}
      <AnimatePresence>
        {isDisplaying && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-[9999] pointer-events-auto"
          >
            <div className="flex items-center gap-3.5 bg-[#232826]/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-white/15 ring-1 ring-black/25">
              <CircleProgressIndicator
                size="sm"
                progress={isActionActive ? undefined : (displayStatus === 'loading' ? progress : 100)}
                status={displayStatus}
                message=""
                submessage=""
              />
              <div className="flex flex-col text-left pr-1.5 min-w-[170px] max-w-[240px]">
                <span className="font-display font-bold text-xs sm:text-sm text-white tracking-tight truncate">
                  {displayMessage}
                </span>
                <span className="font-label text-[10px] sm:text-[11px] text-[#EFA62B] font-semibold tracking-wide truncate mt-0.5">
                  {displaySubmessage}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

