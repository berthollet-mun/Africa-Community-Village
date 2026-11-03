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
      aria-hidden="true"
      className={`relative overflow-hidden bg-[#EAE3D5] animate-pulse ${rounded} ${className}`}
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

const SkeletonSectionHeading = () => (
  <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
    <SkeletonBlock className="mx-auto h-3 w-28" rounded="rounded-full" />
    <SkeletonBlock className="mx-auto h-9 w-3/4 max-w-xl" />
    <SkeletonBlock className="mx-auto h-4 w-2/3 max-w-lg" />
  </div>
);

const CompactPageHeaderSkeleton = () => (
  <section className="border-b border-[#D9CBAF] bg-[#F3EDE1] py-9 sm:py-11">
    <div className="mx-auto w-full max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
      <SkeletonBlock className="h-3 w-32" rounded="rounded-full" />
      <SkeletonBlock className="h-10 w-4/5 max-w-2xl" />
      <SkeletonBlock className="h-4 w-2/3 max-w-xl" />
    </div>
  </section>
);

const HomeRouteSkeleton = () => (
  <div className="w-full space-y-16 pb-20">
    <SkeletonBanner />
    <section className="relative z-10 mx-auto -mt-24 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-6 rounded-2xl border border-[#E2D7C3] bg-white p-6 shadow-xl lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <SkeletonBlock className="h-9 w-20" />
            <SkeletonBlock className="h-3.5 w-28" />
          </div>
        ))}
      </div>
    </section>
    <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
      <div className="space-y-4 lg:col-span-7">
        <SkeletonBlock className="h-3 w-36" rounded="rounded-full" />
        <SkeletonBlock className="h-10 w-4/5" />
        <SkeletonText lines={4} />
      </div>
      <SkeletonBlock className="h-72 w-full lg:col-span-5" rounded="rounded-[2rem]" />
    </section>
  </div>
);

const ProgramsRouteSkeleton = () => (
  <div className="w-full pb-20">
    <CompactPageHeaderSkeleton />
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SkeletonSectionHeading />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCard key={index} variant="program" />
        ))}
      </div>
    </section>
  </div>
);

const BlogRouteSkeleton = () => (
  <div className="w-full pb-20">
    <section className="border-b border-[#E2D7C3] bg-[#FAF6EF] py-14">
      <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
        <SkeletonBlock className="h-3 w-32" rounded="rounded-full" />
        <SkeletonBlock className="h-10 w-2/3 max-w-2xl" />
        <SkeletonBlock className="h-4 w-1/2 max-w-xl" />
      </div>
    </section>
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} variant="article" />
        ))}
      </div>
    </section>
  </div>
);

const DefaultRouteSkeleton = () => (
  <div className="w-full pb-20">
    <CompactPageHeaderSkeleton />
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SkeletonSectionHeading />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-[#E2D7C3] bg-white p-6">
            <SkeletonBlock className="mb-5 h-12 w-12" rounded="rounded-xl" />
            <SkeletonBlock className="mb-4 h-6 w-2/3" />
            <SkeletonText lines={3} />
          </div>
        ))}
      </div>
    </section>
  </div>
);

const AdminRouteSkeleton = () => (
  <div className="min-h-screen w-full bg-[#F3EDE1] p-5 sm:p-8">
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <SkeletonBlock className="h-8 w-56" />
          <SkeletonBlock className="h-4 w-36" />
        </div>
        <SkeletonBlock className="h-11 w-32" rounded="rounded-xl" />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} variant="stat" />
        ))}
      </div>
      <SkeletonTable />
    </div>
  </div>
);

export const RouteContentSkeleton: React.FC<{ route?: string }> = ({ route = '/' }) => {
  if (route.startsWith('/admin')) return <AdminRouteSkeleton />;
  if (route.startsWith('/programs')) return <ProgramsRouteSkeleton />;
  if (route.startsWith('/blog')) return <BlogRouteSkeleton />;
  if (route === '/') return <HomeRouteSkeleton />;
  return <DefaultRouteSkeleton />;
};

const LoadingHeaderSkeleton = () => (
  <header className="sticky top-0 z-50 w-full border-b border-[#E2D7C3] bg-[#F3EDE1] shadow-xs">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <BrandLogo
          alt="Africa Community Village"
          priority
          size={64}
          sizes="56px"
          className="h-14 w-14 rounded-full bg-white object-contain"
        />
        <div className="hidden space-y-2 sm:block">
          <SkeletonBlock className="h-5 w-52" />
          <SkeletonBlock className="h-2.5 w-24" />
        </div>
      </div>
      <div className="hidden items-center gap-7 lg:flex">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-3 w-16" />
        ))}
      </div>
      <SkeletonBlock className="h-10 w-28" rounded="rounded-full" />
    </div>
  </header>
);

export const SiteLoadingShell: React.FC<{ route?: string }> = ({ route = '/' }) => (
  <div
    className="min-h-screen bg-[#F3EDE1] text-[#232826]"
    aria-busy="true"
    aria-label="Chargement du contenu"
  >
    <span className="sr-only">Chargement du contenu…</span>
    <div className="fixed inset-x-0 top-0 z-[100000] h-[3px] overflow-hidden">
      <div className="acv-route-progress h-full w-full bg-gradient-to-r from-[#690C07] via-[#8B1510] to-[#EFA62B] shadow-[0_0_10px_rgba(239,166,43,0.75)]" />
    </div>
    {!route.startsWith('/admin') && <LoadingHeaderSkeleton />}
    <RouteContentSkeleton route={route} />
  </div>
);

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
            <div className="w-full h-full bg-gradient-to-r from-[#690C07] via-[#EFA62B] to-[#14798B] animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
};
