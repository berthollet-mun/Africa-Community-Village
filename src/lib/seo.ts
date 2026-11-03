import type { Metadata } from 'next';

type RouteSeo = {
  title: string;
  description: string;
};

const routeSeo: Record<string, RouteSeo> = {
  '/': {
    title: 'Africa Community Village',
    description: 'Une initiative portée par la jeunesse qui renforce la dignité, la résilience et la régénération communautaire dans l’Est de la RDC.'
  },
  '/about': {
    title: 'À propos',
    description: 'Découvrez l’histoire, l’équipe et la gouvernance d’Africa Community Village à Goma, en République démocratique du Congo.'
  },
  '/about/our-story': {
    title: 'Notre histoire',
    description: 'L’histoire d’une initiative communautaire née à Goma et guidée par l’Ubuntu, la jeunesse et l’action locale.'
  },
  '/about/our-team': {
    title: 'Notre équipe',
    description: 'Rencontrez les personnes qui portent les programmes et les actions d’Africa Community Village sur le terrain.'
  },
  '/about/governance': {
    title: 'Gouvernance',
    description: 'La gouvernance, les engagements de transparence et les responsabilités d’Africa Community Village.'
  },
  '/about/field-notes': {
    title: 'Notes de terrain',
    description: 'Des observations, apprentissages et récits issus des actions communautaires menées à Goma et au Nord-Kivu.'
  },
  '/programs': {
    title: 'Programmes',
    description: 'Explorez les cinq piliers d’action d’ACV : éducation, biodiversité, agriculture, santé et autonomisation socio-économique.'
  },
  '/approach': {
    title: 'Notre approche',
    description: 'Une méthodologie locale, participative et fondée sur la dignité pour construire des réponses durables avec les communautés.'
  },
  '/blog': {
    title: 'Blog & actualités',
    description: 'Actualités, récits de terrain et analyses des projets d’Africa Community Village dans l’Est de la RDC.'
  },
  '/contact': {
    title: 'Contact',
    description: 'Contactez Africa Community Village pour collaborer, soutenir une initiative ou en savoir plus sur nos actions.'
  },
  '/donate': {
    title: 'Faire un don',
    description: 'Soutenez directement les actions communautaires d’Africa Community Village en faveur des jeunes et des familles de Goma.'
  },
  '/donate/success': {
    title: 'Merci pour votre soutien',
    description: 'Confirmation de votre contribution à Africa Community Village.'
  }
};

const programTitles: Record<string, string> = {
  '/programs/education-youth': 'Éducation & jeunesse',
  '/programs/nature-biodiversity': 'Nature & biodiversité',
  '/programs/agriculture-food-security': 'Agriculture & sécurité alimentaire',
  '/programs/health-wellbeing': 'Santé & bien-être',
  '/programs/socio-economic-empowerment': 'Autonomisation socio-économique'
};

export const getRouteSeo = (route: string): RouteSeo => {
  if (routeSeo[route]) return routeSeo[route];
  if (programTitles[route]) {
    return {
      title: programTitles[route],
      description: `Découvrez le programme ${programTitles[route].toLowerCase()} d’Africa Community Village et son impact auprès des communautés de l’Est de la RDC.`
    };
  }
  if (route.startsWith('/about')) return routeSeo['/about'];
  if (route.startsWith('/programs')) return routeSeo['/programs'];
  return routeSeo['/'];
};

export const buildRouteMetadata = (route: string): Metadata => {
  const seo = getRouteSeo(route);
  const isHome = route === '/';

  return {
    title: isHome ? { absolute: seo.title } : seo.title,
    description: seo.description,
    alternates: { canonical: route },
    openGraph: {
      type: 'website',
      locale: 'fr_CD',
      siteName: 'Africa Community Village',
      title: isHome ? seo.title : `${seo.title} | Africa Community Village`,
      description: seo.description,
      url: route,
      images: [{
        url: '/assets/brand/acv-logo.jpeg',
        width: 1254,
        height: 1254,
        alt: 'Africa Community Village'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: isHome ? seo.title : `${seo.title} | Africa Community Village`,
      description: seo.description,
      images: ['/assets/brand/acv-logo.jpeg']
    }
  };
};
