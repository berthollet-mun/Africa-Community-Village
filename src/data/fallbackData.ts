import type { BannerSlide, SiteSettings } from '@/types';

export const fallbackSiteSettings: SiteSettings = {
  id: 'settings_main',
  address: '184 Avenue de la Paix, Himbi, Goma, Nord-Kivu, RDC',
  email: 'info@acv-drc.org',
  phone: '+243 975 131 159',
  officeHoursEn: 'Monday – Friday, 8:00 – 17:00 (Central Africa Time)',
  officeHoursFr: 'Lundi – Vendredi, 8h00 – 17h00 (heure d’Afrique centrale)',
  instagram: 'https://www.instagram.com/africa.community.village',
  facebook: 'https://www.facebook.com/people/Africa-Community-Village/61566422018591/',
  linkedin: 'https://www.linkedin.com/company/smart-climate-inititives-drc/',
  twitter: 'https://x.com/africomvillage'
};

export const fallbackBanners: BannerSlide[] = [{
  id: 'banner_home_fallback',
  pageRoute: '/',
  titleEn: 'When young people lead, communities transform.',
  titleFr: 'Quand les jeunes agissent, les communautés se transforment.',
  subtitleEn: 'Youth-led community regeneration across Goma and the landscapes of Eastern DR Congo.',
  subtitleFr: 'Une régénération communautaire portée par la jeunesse à Goma et dans l’Est de la RDC.',
  imageUrl: '/assets/images/acv_hero_youth_community_1792692599382.webp',
  ctaTextEn: 'Explore our programs',
  ctaTextFr: 'Découvrir nos programmes',
  ctaLink: '/programs',
  order: 1,
  isActive: true,
  active: true
}];
