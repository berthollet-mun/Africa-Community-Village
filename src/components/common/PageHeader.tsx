import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Container } from './Container';
import { useApp } from '../../context/AppContext';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  homeLabel: string;
  currentLabel: string;
  onHome: () => void;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  align?: 'left' | 'center';
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  homeLabel,
  currentLabel,
  onHome,
  icon,
  actions,
  align = 'left'
}) => {
  const { banners, currentRoute } = useApp();
  const centered = align === 'center';
  const routeGroup = currentRoute.startsWith('/about')
    ? '/about'
    : currentRoute.startsWith('/programs')
      ? '/programs'
      : currentRoute;
  const activeBanners = banners
    .filter((banner) => banner.active !== false && banner.isActive !== false)
    .sort((a, b) => a.order - b.order);
  const selectedBanner = activeBanners.find((banner) => {
    const route = banner.pageRoute?.toLowerCase();
    return route === currentRoute.toLowerCase() || route === routeGroup.toLowerCase();
  });
  const fallbackImages: Record<string, string> = {
    '/about': '/assets/images/acv_hero_youth_community_1792692599382.webp',
    '/programs': '/assets/images/acv_hero_education_skills_1792692599936.webp',
    '/approach': '/assets/images/acv_hero_tree_planting_1792692600143.webp',
    '/blog': '/assets/images/acv_hero_food_security_1792692600374.webp',
    '/contact': '/assets/images/acv_hero_youth_community_1792692599382.webp',
    '/donate': '/assets/images/acv_hero_tree_planting_1792692600143.webp'
  };
  const bannerImage = selectedBanner?.imageUrl || selectedBanner?.image || fallbackImages[routeGroup] || fallbackImages['/about'];

  return (
    <section className="acv-page-header relative min-h-[18rem] overflow-hidden border-b border-[#690C07]/20 bg-[#232826] text-white sm:min-h-[20rem]">
      <img
        src={bannerImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#232826]/95 via-[#690C07]/78 to-[#232826]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#232826]/60 via-transparent to-black/20" />
      <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#EFA62B]/14 blur-3xl" />
      <Container className="relative flex min-h-[18rem] flex-col justify-center py-10 sm:min-h-[20rem] sm:py-12">
        <nav
          aria-label="Breadcrumb"
          className={`mb-5 flex items-center gap-1.5 font-label text-[11px] font-bold uppercase tracking-[0.14em] text-white/75 ${
            centered ? 'justify-center' : ''
          }`}
        >
          <button type="button" onClick={onHome} className="min-h-11 rounded-md px-1 hover:text-[#EFA62B]">
            {homeLabel}
          </button>
          <ChevronRight className="h-3.5 w-3.5 text-[#EFA62B]" aria-hidden="true" />
          <span className="truncate text-[#EFA62B]" aria-current="page">
            {currentLabel}
          </span>
        </nav>

        <div className={`max-w-4xl ${centered ? 'mx-auto text-center' : ''}`}>
          <div className={`mb-3 flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
            {icon && (
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/25 bg-white/12 text-[#EFA62B] backdrop-blur">
                {icon}
              </span>
            )}
            <span className="font-label text-xs font-bold uppercase tracking-[0.16em] text-[#EFA62B]">
              {eyebrow}
            </span>
          </div>

          <h1 className="text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className={`mt-4 max-w-3xl text-sm leading-7 text-white/82 sm:text-base ${centered ? 'mx-auto' : ''}`}>
              {description}
            </p>
          )}
          {actions && <div className={`mt-6 flex flex-wrap gap-3 ${centered ? 'justify-center' : ''}`}>{actions}</div>}
        </div>
      </Container>
    </section>
  );
};
