import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import { BannerSlide } from '../../types';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Heart,
  Compass,
  Pause,
  Play
} from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { AnimatedText } from '../motion/AnimatedText';

export interface HeroBannerProps {
  page?: 'home' | 'about' | 'programs' | 'approach' | 'blog' | 'contact' | 'donate' | string;
  pageRoute?: string;
  fullBleed?: boolean;
}

const optimizedHeroImage = (url: string) =>
  url.startsWith('/assets/images/acv_hero_') ? url.replace(/\.jpg$/i, '.webp') : url;

export const HeroBanner: React.FC<HeroBannerProps> = ({
  page = 'home',
  pageRoute,
  fullBleed = true
}) => {
  const { banners, language, navigateTo, currentUser, siteSettings } = useApp();
  const t = useTranslation(language);
  const isFr = language === 'fr';
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 72]);

  // Normalize target route
  const targetRoute =
    pageRoute ||
    (page === 'home' || page === '/'
      ? '/'
      : page.startsWith('/')
      ? page
      : `/${page}`);

  const activeBanners = banners
    .filter((b) => {
      const isActive = b.isActive !== false && b.active !== false;
      return isActive;
    })
    .sort((a, b) => a.order - b.order);

  // Homepage first shows its dedicated slides, then reuses existing ACV visuals
  // to reach a professional ten-slide editorial sequence without duplicating content.
  const homeBanners = activeBanners.filter((banner) => {
    const legacyRoute = (banner as BannerSlide & { page_assignment?: string }).page_assignment;
    const route = (banner.pageRoute || legacyRoute || '').toLowerCase();
    return route === '/' || route === 'home' || route === 'all';
  });
  const supportingBanners = activeBanners.filter((banner) => !homeBanners.includes(banner));
  const slides: BannerSlide[] = [...homeBanners, ...supportingBanners].slice(0, 10);

  const total = slides.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Reset index if slides change or out of bounds
  useEffect(() => {
    if (currentIndex >= total && total > 0) {
      setCurrentIndex(0);
    }
  }, [total, currentIndex]);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  const autoplayPaused = Boolean(reducedMotion) || interactionPaused || userPaused || !pageVisible;

  // A slower autoplay keeps the hero calm; motion-sensitive visitors start paused.
  useEffect(() => {
    if (total <= 1 || autoplayPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 8500);

    return () => clearInterval(timer);
  }, [total, autoplayPaused]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Touch Swipe Handlers (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setInteractionPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setInteractionPaused(false);
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45; // px threshold

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev
      handlePrev();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
    if (e.key === 'Home') {
      e.preventDefault();
      setCurrentIndex(0);
    }
    if (e.key === 'End') {
      e.preventDefault();
      setCurrentIndex(total - 1);
    }
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      setUserPaused((paused) => !paused);
    }
  };

  if (total === 0) return null;

  const currentSlide = slides[currentIndex] || slides[0];
  const title = isFr ? currentSlide.titleFr : currentSlide.titleEn;
  const subtitle = isFr ? currentSlide.subtitleFr : currentSlide.subtitleEn;
  const ctaText = isFr ? currentSlide.ctaTextFr : currentSlide.ctaTextEn;
  const ctaLink = currentSlide.ctaLink || '/programs';
  // Badge label by page
  const getBadgeText = () => {
    if (targetRoute === '/' || page === 'home') {
      return isFr ? 'Régénération Communautaire · Goma, Nord-Kivu' : 'Youth-Led Regeneration · Eastern DR Congo';
    }
    if (targetRoute.startsWith('/about')) {
      return isFr ? 'À Propos d’ACV · Éthique de l’Ubuntu' : 'About ACV · The Ubuntu Ethos';
    }
    if (targetRoute.startsWith('/programs')) {
      return isFr ? '5 Piliers d’Action Holistiques' : 'Five Interconnected Action Pillars';
    }
    if (targetRoute.startsWith('/approach')) {
      return isFr ? 'Notre Méthodologie · Enracinement & Dignité' : 'Our Approach · Grassroots & Resilient';
    }
    if (targetRoute.startsWith('/blog')) {
      return isFr ? 'Notes & Récits du Front Écologique' : 'Dispatches from the Climate Frontline';
    }
    if (targetRoute.startsWith('/contact')) {
      return isFr ? 'Antenne d’Himbi, Goma · Coopération Ouverte' : 'Himbi Headquarters · Open Coordination';
    }
    if (targetRoute.startsWith('/donate')) {
      return isFr ? 'Solidarité Directe · Transparence Intégrale' : 'Direct Solidarity · 100% Grassroots Impact';
    }
    return 'Africa Community Village';
  };

  return (
    <section
      ref={heroRef}
      className={`relative w-full ${
        fullBleed ? 'px-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
      }`}
      aria-label={isFr ? 'Temps forts d’Africa Community Village' : 'Africa Community Village highlights'}
    >
      <div
        className={`relative w-full overflow-hidden bg-[#18181B] select-none ${
          fullBleed
            ? 'h-[68vh] min-h-[460px] max-h-[760px] sm:h-[72vh] lg:h-[80vh]'
            : 'h-[60vh] min-h-[440px] max-h-[680px] rounded-2xl sm:rounded-3xl shadow-2xl'
        }`}
        onMouseEnter={() => setInteractionPaused(true)}
        onMouseLeave={() => setInteractionPaused(false)}
        onFocusCapture={() => setInteractionPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteractionPaused(false);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
      >
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {isFr ? `Diapositive ${currentIndex + 1} sur ${total} : ${title}` : `Slide ${currentIndex + 1} of ${total}: ${title}`}
        </p>
        {/* Background Images with Cross-fade transition */}
        {slides.map((slide, idx) => {
          const imgUrl = optimizedHeroImage(
            slide.imageUrl ||
            slide.image ||
            '/assets/images/acv_hero_youth_community_1792692599382.webp'
          );
          const isCurrent = idx === currentIndex;

          return (
            <motion.div
              key={slide.id || idx}
              style={{ y: imageParallax }}
              className={`absolute -inset-y-12 inset-x-0 transition-opacity duration-700 ease-in-out ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={imgUrl}
                alt={isFr ? slide.titleFr : slide.titleEn}
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                decoding="async"
                className={`w-full h-full object-cover transition-transform duration-7000 ease-out ${
                  isCurrent ? 'scale-105' : 'scale-100'
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    '/assets/images/acv_hero_youth_community_1792692599382.webp';
                }}
              />
            </motion.div>
          );
        })}

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[19] origin-right bg-[#F3EDE1]"
          initial={reducedMotion ? { opacity: 0 } : { scaleX: 1 }}
          animate={reducedMotion ? { opacity: 0 } : { scaleX: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.7, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Multi-layered Warm Cinematic Scrim (Seamless fade with no cut-off line) */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/90 via-black/60 via-45% to-transparent to-90% pointer-events-none"></div>
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/40 via-40% to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 z-20 bg-[#690C07]/10 mix-blend-overlay pointer-events-none"></div>

        {/* Content Container */}
        <div className="relative z-30 w-full h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-3xl space-y-3 sm:space-y-5">
            {/* Category / Pillar Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
              <span className="font-label text-[11px] sm:text-[13px] uppercase font-bold tracking-widest text-amber-200">
                {getBadgeText()}
              </span>
            </div>

            {/* Main Editorial Headline */}
            <AnimatedText
              as="h1"
              text={title}
              delay={0.12}
              className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.14] sm:leading-[1.08] text-balance drop-shadow-md"
            />

            {/* Subtitle */}
            <p className="text-xs sm:text-base lg:text-lg text-stone-200/95 leading-relaxed max-w-2xl font-light drop-shadow-sm line-clamp-3 sm:line-clamp-none">
              {subtitle}
            </p>

            {/* Pill Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {ctaText && (
                <button
                  onClick={() => navigateTo(ctaLink)}
                  className="px-6 sm:px-8 py-3.5 rounded-full bg-[#690C07] hover:bg-[#520905] text-white font-bold text-xs sm:text-sm font-label tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer group"
                >
                  <span>{ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              )}

              {/* Secondary Contextual Pill */}
              {targetRoute !== '/donate' && (
                <button
              onClick={() => navigateTo('/donate#donation-form')}
                  className="px-5 sm:px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm font-label tracking-wider uppercase transition-all backdrop-blur-md border border-white/25 hover:border-white/50 flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
                >
                  <Heart className="w-3.5 h-3.5 text-[#EFA62B] fill-[#EFA62B]/30" />
                  <span>{isFr ? 'Faire un don' : 'Donate'}</span>
                </button>
              )}

              {targetRoute === '/donate' && (
                <button
                  onClick={() => navigateTo('/programs')}
                  className="px-5 sm:px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm font-label tracking-wider uppercase transition-all backdrop-blur-md border border-white/25 flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-[#14798B]" />
                  <span>{isFr ? 'Découvrir nos 5 axes' : 'Discover 5 Pillars'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Explicit, keyboard-accessible carousel controls */}
        {total > 1 && (
          <div className="absolute bottom-4 left-1/2 z-40 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-black/60 p-1.5 shadow-xl backdrop-blur-md sm:bottom-6 sm:gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white hover:bg-white/15"
              aria-label={isFr ? 'Diapositive précédente' : 'Previous slide'}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="hidden items-center gap-1.5 sm:flex" aria-label={isFr ? 'Choisir une diapositive' : 'Choose a slide'}>
              {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`cursor-pointer transition-all duration-300 ${
                  idx === currentIndex
                    ? 'h-2.5 w-7 rounded-full bg-[#EFA62B] shadow-sm'
                    : 'h-2.5 w-2.5 rounded-full bg-white/50 hover:bg-white/90'
                }`}
                aria-label={isFr ? `Aller à la diapositive ${idx + 1}` : `Go to slide ${idx + 1}`}
                aria-current={idx === currentIndex ? 'true' : undefined}
              />
              ))}
            </div>
            <span className="min-w-10 text-center font-label text-[11px] font-bold text-white sm:hidden" aria-hidden="true">
              {currentIndex + 1}/{total}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white hover:bg-white/15"
              aria-label={isFr ? 'Diapositive suivante' : 'Next slide'}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="h-5 w-px bg-white/25" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setUserPaused((paused) => !paused)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white hover:bg-white/15"
              aria-label={userPaused
                ? (isFr ? 'Reprendre le défilement automatique' : 'Resume autoplay')
                : (isFr ? 'Mettre le défilement automatique en pause' : 'Pause autoplay')}
              aria-pressed={userPaused}
            >
              {userPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        )}

        {/* Admin Quick Edit Shortcut */}
        {currentUser && (
          <button
            onClick={() => navigateTo('/admin/dashboard')}
            className="absolute top-5 right-5 z-40 flex items-center gap-1.5 bg-black/70 hover:bg-black/90 text-white text-xs font-label px-3.5 py-2 rounded-full backdrop-blur-md transition-all border border-[#EFA62B]/40 shadow-lg cursor-pointer hover:scale-105"
            title="Edit this banner in Admin Dashboard"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#EFA62B]" />
            <span className="font-semibold text-[#EFA62B]">
              {isFr ? 'Gérer les Bannières' : 'Manage Banners'}
            </span>
          </button>
        )}


      </div>
    </section>
  );
};

// Reusable export as requested in prompt: <HeroCarousel page="home" />
export const HeroCarousel: React.FC<HeroBannerProps> = (props) => {
  return <HeroBanner {...props} />;
};
