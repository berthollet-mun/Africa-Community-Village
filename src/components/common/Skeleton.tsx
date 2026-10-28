import React from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';

// Base shimmering block
export const SkeletonBlock: React.FC<{
  className?: string;
  rounded?: string;
}> = ({ className = 'h-4 w-full', rounded = 'rounded-md' }) => {
  return (
    <div
      className={`relative overflow-hidden bg-stone-200/80 animate-pulse ${rounded} ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
};

// Text skeleton
export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock
          key={i}
          className={`h-3.5 ${
            i === lines - 1 && lines > 1 ? 'w-3/5' : i === 0 ? 'w-full' : 'w-5/6'
          }`}
        />
      ))}
    </div>
  );
};

// Card Skeleton for Programs, Team, Blog, Stats
export const SkeletonCard: React.FC<{
  variant?: 'program' | 'team' | 'article' | 'stat';
  className?: string;
}> = ({ variant = 'program', className = '' }) => {
  if (variant === 'stat') {
    return (
      <div className={`p-6 rounded-2xl bg-white border border-stone-200/80 space-y-3 ${className}`}>
        <SkeletonBlock className="h-8 w-24" />
        <SkeletonBlock className="h-4 w-32" />
        <SkeletonBlock className="h-3 w-4/5" />
      </div>
    );
  }

  if (variant === 'team') {
    return (
      <div className={`rounded-2xl bg-white border border-stone-200/80 overflow-hidden shadow-xs ${className}`}>
        <SkeletonBlock className="h-64 sm:h-72 w-full rounded-none" />
        <div className="p-5 space-y-3">
          <SkeletonBlock className="h-5 w-2/3" />
          <SkeletonBlock className="h-3.5 w-1/2" />
          <SkeletonText lines={2} />
        </div>
      </div>
    );
  }

  if (variant === 'article') {
    return (
      <div className={`rounded-2xl bg-white border border-stone-200/80 overflow-hidden shadow-xs flex flex-col ${className}`}>
        <SkeletonBlock className="h-48 sm:h-52 w-full rounded-none" />
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <SkeletonBlock className="h-3.5 w-20" />
              <SkeletonBlock className="h-3.5 w-16" />
            </div>
            <SkeletonBlock className="h-5 w-4/5" />
            <SkeletonText lines={2} />
          </div>
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-3 w-16" />
          </div>
        </div>
      </div>
    );
  }

  // Default: program card
  return (
    <div className={`rounded-2xl bg-white border border-stone-200/80 overflow-hidden shadow-xs flex flex-col ${className}`}>
      <SkeletonBlock className="h-52 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <SkeletonBlock className="w-10 h-10 rounded-full" />
          <SkeletonBlock className="h-5 w-1/2" />
        </div>
        <SkeletonText lines={3} />
        <div className="pt-2 flex justify-between items-center">
          <SkeletonBlock className="h-3.5 w-24" />
          <SkeletonBlock className="h-4 w-4 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// Skeleton Banner for hero transitions
export const SkeletonBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-[60vh] min-h-[480px] bg-stone-900 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-stone-800/80 animate-pulse" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-16 space-y-4">
        <SkeletonBlock className="h-6 w-48 bg-stone-700/60" rounded="rounded-full" />
        <SkeletonBlock className="h-12 sm:h-16 w-3/4 bg-stone-700/80" />
        <SkeletonBlock className="h-4 sm:h-5 w-1/2 bg-stone-700/60" />
        <div className="flex gap-3 pt-4">
          <SkeletonBlock className="h-12 w-44 bg-stone-700/80" rounded="rounded-full" />
          <SkeletonBlock className="h-12 w-36 bg-stone-700/60" rounded="rounded-full" />
        </div>
      </div>
    </div>
  );
};

// Skeleton Table for Admin
export const SkeletonTable: React.FC<{
  rows?: number;
  columns?: number;
}> = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="w-full bg-white rounded-xl border border-stone-200 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-stone-50 border-b border-stone-200">
        {Array.from({ length: columns }).map((_, c) => (
          <SkeletonBlock key={c} className="h-4 w-3/4" />
        ))}
      </div>
      {/* Table Rows */}
      <div className="divide-y divide-stone-100">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="grid grid-cols-4 gap-4 p-4 items-center">
            {Array.from({ length: columns }).map((_, c) => (
              <SkeletonBlock
                key={c}
                className={`h-3.5 ${c === 0 ? 'w-5/6' : c === columns - 1 ? 'w-16' : 'w-2/3'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Global Page Loader with animated ACV Logo at center
export const GlobalPageLoader: React.FC<{ message?: string }> = ({
  message = 'Chargement d’Africa Community Village...'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F3EDE1]/95 backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        {/* Breathing halo around official logo */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-[#EFA62B]/25 animate-ping opacity-75" />
          <div className="absolute -inset-2 rounded-full bg-[#690C07]/20 animate-pulse" />
          <BrandLogo
            alt="ACV Logo Loader"
            priority
            size={128}
            sizes="(max-width: 640px) 80px, 96px"
            className="relative w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full shadow-xl border-2 border-white animate-[bounce_2s_infinite]"
          />
        </div>

        {/* Text and subtle loading bar */}
        <div className="mt-6 text-center space-y-2">
          <h3 className="font-display font-extrabold text-lg text-[#232826] tracking-tight">
            Africa Community Village
          </h3>
          <p className="text-xs font-label uppercase tracking-widest text-[#690C07] font-semibold">
            {message}
          </p>
          <div className="w-48 h-1 bg-[#E2D7C3] rounded-full overflow-hidden mx-auto mt-3">
            <div className="w-full h-full bg-gradient-to-r from-[#690C07] via-[#EFA62B] to-[#0E7490] animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
};
