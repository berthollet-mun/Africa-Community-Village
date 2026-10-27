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
  return (
    <HeroBanner
      pageRoute={pageRoute}
      page={page || (pageRoute === '/' ? 'home' : pageRoute?.replace('/', ''))}
      fullBleed={fullBleed}
    />
  );
};

export default BannerCarousel;
