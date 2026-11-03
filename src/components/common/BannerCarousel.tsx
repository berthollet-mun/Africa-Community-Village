import React from 'react';
import { HeroBanner } from './HeroBanner';

export interface BannerCarouselProps {
  pageRoute?: string;
  page?: string;
  fullBleed?: boolean;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({
  pageRoute,
  page,
  fullBleed = true
}) => {
  const isHomeCarousel = pageRoute === '/' || page === 'home';

  // The large visual carousel is intentionally exclusive to the homepage.
  if (!isHomeCarousel) return null;

  return (
    <HeroBanner
      pageRoute="/"
      page="home"
      fullBleed={fullBleed}
    />
  );
};

export default BannerCarousel;
