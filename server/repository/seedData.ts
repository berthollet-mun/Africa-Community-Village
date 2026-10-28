import {
  AdminUser,
  PageItem,
  BannerSlide,
  ProgramPillar,
  TeamMember,
  Founder,
  FieldAgent,
  GovernanceMember,
  Article,
  MediaItem,
  Partner,
  Donor,
  Testimonial,
  ImpactStat,
  SiteSettings,
  AuditLog,
  ContactSubmission
} from './types';

export const seedUsers: AdminUser[] = [
  {
    id: 'user_super_admin',
    name: 'Berthollet Munihire',
    email: 'bertholletmunihire@gmail.com',
    role: 'super-admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    lastLogin: '2026-10-21T08:15:00Z',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'user_founder_admin',
    name: 'Elie Bwira',
    email: 'elie.bwira@acv-drc.org',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    lastLogin: '2026-10-20T14:30:00Z',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'user_editor',
    name: 'Goma Field Comms',
    email: 'info@acv-drc.org',
    role: 'editor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    lastLogin: '2026-10-19T09:00:00Z',
    createdAt: '2026-02-15T00:00:00Z'
  },
  {
    id: 'user_staff_fr',
    name: 'Informaticien ACV',
    email: 'info@acv.fr',
    role: 'super-admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    lastLogin: '2026-10-21T09:00:00Z',
    createdAt: '2026-01-01T00:00:00Z'
  }
];

export const seedSiteSettings: SiteSettings = {
  id: 'settings_main',
  organizationName: 'Africa Community Village (ACV)',
  address: '184 Avenue de la Paix, Quartier Himbi, Commune de Goma, Nord-Kivu, RDC',
  email: 'info@acv-drc.org',
  secondaryEmail: 'partnership@acv-drc.org',
  phone: '+243 975 131 159',
  secondaryPhone: '+243 977 531 777',
  whatsapp: '+243977531777',
  officeHoursEn: 'Monday – Friday: 08:00 – 17:00 (CAT)',
  officeHoursFr: 'Lundi – Vendredi : 08h00 – 17h00 (Heure d\'Afrique Centrale)',
  registrationNumber: 'Enregistrement Officiel MinAffaires Sociales RDC n° 4492/NK / ASBL',
  instagramUrl: 'https://www.instagram.com/africa.community.village',
  facebookUrl: 'https://www.facebook.com/people/Africa-Community-Village/61566422018591/',
  linkedinUrl: 'https://www.linkedin.com/company/smart-climate-inititives-drc/',
  twitterUrl: 'https://x.com/africomvillage',
  legalNoticeEn: 'Africa Community Village is a legally registered youth-led non-profit organisation in the Democratic Republic of Congo.',
  legalNoticeFr: 'Africa Community Village est une organisation sans but lucratif (ASBL) dirigée par des jeunes, officiellement reconnue en République Démocratique du Congo.',
  privacyPolicyEn: 'We adhere to strict data privacy principles in compliance with international safeguarding standards.',
  privacyPolicyFr: 'Nous appliquons une politique de confidentialité stricte conforme aux chartes éthiques et humanitaires.',
  defaultOgImage: '/assets/brand/acv-logo.jpeg',
  bannerSpeedMs: 6500,
  createdAt: '2026-01-01T00:00:00Z'
};

export const seedPages: PageItem[] = [
  {
    id: 'page_home',
    route: '/',
    slug: 'home',
    titleEn: 'When young people lead, communities transform.',
    titleFr: 'Quand les jeunes prennent les rênes, les communautés se métamorphosent.',
    subtitleEn: 'Youth-anchored civic regeneration across Goma and surrounding Virunga landscapes.',
    subtitleFr: 'Régénération civique et écologique portée par la jeunesse à Goma et aux abords des Virunga.',
    contentEn: 'Africa Community Village is an autonomous grassroots movement operating in Eastern DR Congo.',
    contentFr: 'Africa Community Village est une organisation citoyenne autonome ancrée dans l’Est de la RDC.',
    coverImage: '/assets/aistudio/4_289670c0.PNG',
    status: 'published',
    order: 1
  },
  {
    id: 'page_about',
    route: '/about',
    slug: 'about',
    titleEn: 'Communities closest to the problem are closest to the solution.',
    titleFr: 'Les communautés les plus proches du problème sont les plus proches de la solution.',
    subtitleEn: 'Founded in Goma by young professionals committed to lasting Congolese sovereignty.',
    subtitleFr: 'Fondée à Goma par de jeunes professionnels dévoués à une souveraineté congolaise pérenne.',
    contentEn: 'Our mission is to empower youth and vulnerable communities through interconnected programs.',
    contentFr: 'Notre mission est de renforcer le pouvoir d’action des jeunes et des populations vulnérables.',
    coverImage: '/assets/aistudio/15_f71655f6.jpeg',
    status: 'published',
    order: 2
  },
  {
    id: 'page_approach',
    route: '/approach',
    slug: 'approach',
    titleEn: 'A Community-Driven, Climate-Resilient Paradigm',
    titleFr: 'Une Approche Régénérative Guidée par la Jeunesse',
    subtitleEn: 'Moving beyond short-term emergency aid into durable agroecological autonomy.',
    subtitleFr: 'Dépasser l’assistanat d’urgence pour construire une souveraineté agroécologique pérenne.',
    contentEn: 'We implement community listening, regenerative agroforestry, and intergenerational consensus.',
    contentFr: 'Nous combinons écoute villageoise, agroforesterie régénérative et consensus intergénérationnel.',
    coverImage: '/assets/aistudio/7_ee54323c.PNG',
    status: 'published',
    order: 3
  },
  {
    id: 'page_programs',
    route: '/programs',
    slug: 'programs',
    titleEn: 'Five Pillars, One Interconnected Community Model',
    titleFr: 'Cinq Piliers, Un Modèle Communautaire Intégré',
    subtitleEn: 'Education, environment, agriculture, health and livelihoods reinforcing each other.',
    subtitleFr: 'Éducation, environnement, agriculture, santé et économie se renforçant mutuellement.',
    coverImage: '/assets/aistudio/8_5185b9b0.PNG',
    status: 'published',
    order: 4
  },
  {
    id: 'page_blog',
    route: '/blog',
    slug: 'blog',
    titleEn: 'Field Dispatches & Critical Perspectives',
    titleFr: 'Actualités & Récits du Terrain',
    subtitleEn: 'Direct reports and essays from our team members across North Kivu.',
    subtitleFr: 'Reportages directs et analyses de nos équipes sur le terrain au Nord-Kivu.',
    coverImage: '/assets/aistudio/8_5185b9b0.PNG',
    status: 'published',
    order: 5
  },
  {
    id: 'page_contact',
    route: '/contact',
    slug: 'contact',
    titleEn: 'Connect with our Secretariat in Goma',
    titleFr: 'Contacter notre Secrétariat Général à Goma',
    subtitleEn: 'Questions, volunteer applications (#support), and institutional partnerships (#partner).',
    subtitleFr: 'Correspondance, candidatures bénévoles (#support) et partenariats institutionnels (#partner).',
    coverImage: '/assets/aistudio/14_a89ea47f.jpeg',
    status: 'published',
    order: 6
  },
  {
    id: 'page_donate',
    route: '/donate',
    slug: 'donate',
    titleEn: 'Direct Solidarity: Fueling Youth-Led Action',
    titleFr: 'Solidarité Directe : Financer l’Action des Jeunes',
    subtitleEn: '100% of contributions flow directly into native seedlings, classrooms, and health kits.',
    subtitleFr: '100% des fonds sont injectés dans les pépinières, les écoles et les kits médicaux.',
    coverImage: '/assets/aistudio/7_ee54323c.PNG',
    status: 'published',
    order: 7
  }
];

export const seedBanners: BannerSlide[] = [
  {
    id: 'banner_home_1',
    pageRoute: '/',
    titleEn: 'When young people lead, communities transform.',
    titleFr: 'Quand les jeunes prennent les rênes, les communautés se métamorphosent.',
    subtitleEn: 'Grassroots civic regeneration, agro-ecology, and living village ecosystems across Goma and Virunga landscapes.',
    subtitleFr: 'Régénération civique, agro-écologie et écosystèmes villageois vivants portés par la jeunesse à Goma et aux Virunga.',
    image: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    ctaTextEn: 'Explore Our Programs',
    ctaTextFr: 'Découvrir nos programmes',
    ctaLink: '/programs',
    order: 1,
    active: true
  },
  {
    id: 'banner_home_2',
    pageRoute: '/',
    titleEn: 'Goma Restoration: 10,000+ Native Trees Planted',
    titleFr: 'Projet Goma Restoration : Plus de 10 000 arbres indigènes plantés',
    subtitleEn: 'Restoring volcanic soils and creating resilient agroforestry belts around Lake Kivu and displaced families.',
    subtitleFr: 'Régénération des sols volcaniques et ceintures maraîchères solidaires au bord du lac Kivu et auprès des familles déplacées.',
    image: '/assets/images/acv_hero_tree_planting_1792692600143.jpg',
    ctaTextEn: 'Read Field Notes',
    ctaTextFr: 'Lire les notes de terrain',
    ctaLink: '/about/field-notes',
    order: 2,
    active: true
  },
  {
    id: 'banner_home_3',
    pageRoute: '/',
    titleEn: 'Rooted in Ubuntu: Dignity & Collective Power',
    titleFr: 'Enracinés dans l’Ubuntu : Dignité & Force Collective',
    subtitleEn: 'Autonomous grassroots solutions designed, governed, and delivered by Congolese youth for generational resilience.',
    subtitleFr: 'Des solutions locales autonomes conçues, gouvernées et portées par la jeunesse congolaise pour une résilience durable.',
    image: '/assets/images/acv_hero_food_security_1792692600374.jpg',
    ctaTextEn: 'Support Our Mission',
    ctaTextFr: 'Soutenir notre mission',
    ctaLink: '/donate',
    order: 3,
    active: true
  },
  {
    id: 'banner_about_1',
    pageRoute: '/about',
    titleEn: 'Autonomous, Youth-Led, Built for the Decades Ahead',
    titleFr: 'Autonome, Portée par la Jeunesse, Bâtie pour Durer',
    subtitleEn: 'Our governance and operations are run by young Congolese change-makers committed to systemic integrity.',
    subtitleFr: 'Une gouvernance collégiale et un engagement civique exemplaire dirigés par de jeunes acteurs de changement congolais.',
    image: '/assets/images/acv_hero_education_skills_1792692599936.jpg',
    ctaTextEn: 'Meet Our Team',
    ctaTextFr: 'Découvrir l’équipe',
    ctaLink: '/about/our-team',
    order: 1,
    active: true
  },
  {
    id: 'banner_about_2',
    pageRoute: '/about',
    titleEn: 'The Journey of Africa Community Village',
    titleFr: 'L’Histoire et la Mémoire d’Africa Community Village',
    subtitleEn: 'From local emergency response during crisis in Goma to a permanent youth-led village model of resilience.',
    subtitleFr: 'De la réponse citoyenne d’urgence à Goma vers un modèle durable de village vivant et régénérateur.',
    image: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    ctaTextEn: 'Read Our Story',
    ctaTextFr: 'Lire notre histoire',
    ctaLink: '/about/our-story',
    order: 2,
    active: true
  },
  {
    id: 'banner_programs_1',
    pageRoute: '/programs',
    titleEn: 'Five Pillars, One Holistic Living Village Model',
    titleFr: 'Cinq Piliers, Un Modèle de Village Vivant et Intégré',
    subtitleEn: 'No challenge exists in isolation: climate, education, food sovereignty, health, and economic dignity converge.',
    subtitleFr: 'Aucun défi n’est isolé : climat, éducation, alimentation, santé et dignité économique convergent ensemble.',
    image: '/assets/images/acv_hero_food_security_1792692600374.jpg',
    ctaTextEn: 'Education & Youth',
    ctaTextFr: 'Éducation & Jeunesse',
    ctaLink: '/programs/education-youth',
    order: 1,
    active: true
  },
  {
    id: 'banner_programs_2',
    pageRoute: '/programs',
    titleEn: 'Nature Protection & Biodiversity in the Virunga Basin',
    titleFr: 'Protection de la Nature & Biodiversité dans le Bassin des Virunga',
    subtitleEn: 'Community nurseries, endemic reforestation, and watershed protection guarded by youth stewards.',
    subtitleFr: 'Pépinières communautaires, reboisement d’espèces indigènes et protection des bassins versants par la jeunesse.',
    image: '/assets/images/acv_hero_tree_planting_1792692600143.jpg',
    ctaTextEn: 'Nature & Biodiversity',
    ctaTextFr: 'Nature & Biodiversité',
    ctaLink: '/programs/nature-biodiversity',
    order: 2,
    active: true
  },
  {
    id: 'banner_programs_3',
    pageRoute: '/programs',
    titleEn: 'Agro-Ecology & Sustainable Food Sovereignty',
    titleFr: 'Agro-Écologie & Souveraineté Alimentaire Durable',
    subtitleEn: 'Bio-fertilizers, permaculture school-farms, and community seed banks producing nutritious food locally.',
    subtitleFr: 'Bio-fertilisants, fermes-écoles en permaculture et semences paysannes pour une nutrition saine et locale.',
    image: '/assets/images/acv_hero_food_security_1792692600374.jpg',
    ctaTextEn: 'Sustainable Agriculture',
    ctaTextFr: 'Agriculture Durable',
    ctaLink: '/programs/sustainable-agriculture',
    order: 3,
    active: true
  },
  {
    id: 'banner_approach_1',
    pageRoute: '/approach',
    titleEn: 'Ubuntu Ethics: « I am because we are »',
    titleFr: 'Éthique de l’Ubuntu : « Je suis parce que nous sommes »',
    subtitleEn: 'Rooted in ancestral kinship wisdom and validated through participatory village assemblies in Eastern DRC.',
    subtitleFr: 'Enracinée dans les sagesses ancestrales et validée par les assemblées communautaires participatives au Nord-Kivu.',
    image: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    ctaTextEn: 'Our Methodology',
    ctaTextFr: 'Notre Méthodologie',
    ctaLink: '/approach',
    order: 1,
    active: true
  },
  {
    id: 'banner_approach_2',
    pageRoute: '/approach',
    titleEn: 'Climate Resilience Born on the Volcanic Frontline',
    titleFr: 'Résilience Climatique Née sur la Ligne de Front Volcanique',
    subtitleEn: 'Youth innovation turning environmental vulnerability into community sovereignty, clean energy, and dignity.',
    subtitleFr: 'L’innovation de la jeunesse transformant la vulnérabilité environnementale en souveraineté et dignité.',
    image: '/assets/images/acv_hero_tree_planting_1792692600143.jpg',
    ctaTextEn: 'Explore Principles',
    ctaTextFr: 'Découvrir nos principes',
    ctaLink: '/approach',
    order: 2,
    active: true
  },
  {
    id: 'banner_blog_1',
    pageRoute: '/blog',
    titleEn: 'Frontline Insights from Eastern DR Congo',
    titleFr: 'Éclairages du Front Écologique et Social au Nord-Kivu',
    subtitleEn: 'Deep reporting and reflective field notes from our educators, agronomists, and community organizers.',
    subtitleFr: 'Analyses approfondies et récits de terrain de nos agronomes, éducateurs et animateurs communautaires.',
    image: '/assets/images/acv_hero_education_skills_1792692599936.jpg',
    ctaTextEn: 'Read Latest Articles',
    ctaTextFr: 'Lire les derniers articles',
    ctaLink: '/blog',
    order: 1,
    active: true
  },
  {
    id: 'banner_blog_2',
    pageRoute: '/blog',
    titleEn: 'Community Voices: Stories of Hope & Transformation',
    titleFr: 'Voix Communautaires : Récits d’Espoir et de Transformation',
    subtitleEn: 'Direct witness accounts from Goma, Sake, and the Virunga green belts written by participants.',
    subtitleFr: 'Témoignages authentiques depuis Goma, Sake et la ceinture verte des Virunga écrits par les acteurs de terrain.',
    image: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    ctaTextEn: 'Read Field Stories',
    ctaTextFr: 'Découvrir les récits',
    ctaLink: '/blog',
    order: 2,
    active: true
  },
  {
    id: 'banner_contact_1',
    pageRoute: '/contact',
    titleEn: 'Reach ACV Headquarters in Himbi, Goma',
    titleFr: 'Contactez le Siège d’ACV à Himbi, Goma',
    subtitleEn: 'Our coordination welcomes institutional partners, researchers, donors, and grassroots volunteers.',
    subtitleFr: 'Notre coordination accueille partenaires institutionnels, chercheurs, bailleurs de fonds et volontaires engagés.',
    image: '/assets/images/acv_hero_education_skills_1792692599936.jpg',
    ctaTextEn: 'Send a Message',
    ctaTextFr: 'Envoyer un message',
    ctaLink: '/contact#support',
    order: 1,
    active: true
  },
  {
    id: 'banner_contact_2',
    pageRoute: '/contact',
    titleEn: 'Form a Strategic Alliance with Youth Leaders',
    titleFr: 'Bâtir une Alliance Stratégique avec la Jeunesse',
    subtitleEn: 'Co-create regenerative community projects with lasting multi-generational impact in Eastern DRC.',
    subtitleFr: 'Co-construire des projets à fort impact communautaire et écologique durable dans l’Est de la RDC.',
    image: '/assets/images/acv_hero_food_security_1792692600374.jpg',
    ctaTextEn: 'Become a Partner',
    ctaTextFr: 'Devenir partenaire',
    ctaLink: '/contact#partner',
    order: 2,
    active: true
  },
  {
    id: 'banner_donate_1',
    pageRoute: '/donate',
    titleEn: 'Every Gift Fuels Tangible Grassroots Independence',
    titleFr: 'Chaque Don Consolide l’Autonomie de nos Communautés',
    subtitleEn: '100% of contributions directly fund trees, learning pods, clean water and youth workshops with transparent reporting.',
    subtitleFr: '100% des contributions financent directement des arbres, l’école, l’eau potable et les ateliers avec reddition des comptes.',
    image: '/assets/images/acv_hero_tree_planting_1792692600143.jpg',
    ctaTextEn: 'Donate Now',
    ctaTextFr: 'Faire un don maintenant',
    ctaLink: '/donate',
    order: 1,
    active: true
  },
  {
    id: 'banner_donate_2',
    pageRoute: '/donate',
    titleEn: 'Uncompromising Financial Integrity & Community Audit',
    titleFr: 'Intégrité Financière Inébranlable & Audit Communautaire',
    subtitleEn: 'Quarterly ledger reports published openly for full democratic accountability and civic trust.',
    subtitleFr: 'Des rapports financiers trimestriels en libre accès pour une transparence démocratique totale et durable.',
    image: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    ctaTextEn: 'Choose an Impact Tier',
    ctaTextFr: 'Choisir un palier d’impact',
    ctaLink: '/donate',
    order: 2,
    active: true
  }
];

export const seedPrograms: ProgramPillar[] = [
  {
    id: 'pillar_education',
    slug: 'education-youth',
    titleEn: 'Education & Youth Capacity Building',
    titleFr: 'Éducation & Renforcement des Capacités des Jeunes',
    tagEn: 'EDUCATION & YOUTH',
    tagFr: 'ÉDUCATION & JEUNESSE',
    shortDescEn: 'Equipping young people with knowledge, digital skills, and civic leadership platforms.',
    shortDescFr: 'Doter les jeunes de compétences civiques, numériques et écologiques pour agir localement.',
    fullDescEn: 'Displacement and disrupted school systems in Eastern DRC leave brilliant youth without platforms. ACV creates practical leadership bootcamps, school green clubs, and digital labs to activate latent youth potential.',
    fullDescFr: 'Les crises successives au Nord-Kivu privent de nombreux jeunes d’opportunités. ACV déploie des académies de leadership civique, des clubs écologiques en milieu scolaire et des tiers-lieux numériques solaires.',
    image: '/assets/aistudio/8_5185b9b0.PNG',
    icon: 'school',
    order: 1,
    status: 'published',
    metrics: [
      { value: '120+', labelEn: 'young leaders graduated', labelFr: 'jeunes leaders certifiés' },
      { value: '4', labelEn: 'partner schools engaged', labelFr: 'écoles partenaires actives' },
      { value: '15', labelEn: 'youth projects launched', labelFr: 'micro-projets citoyens lancés' }
    ],
    objectivesEn: [
      'Accelerate civic and project management literacy for youth aged 15-28',
      'Integrate native seed nurseries inside community primary and secondary schools',
      'Provide continuous peer mentorship to alumni launching local initiatives'
    ],
    objectivesFr: [
      'Accélérer la formation en gestion de projets et leadership citoyen des 15-28 ans',
      'Implanter des pépinières pédagogiques indigènes dans les écoles partenaires',
      'Offrir un mentorat continu aux diplômés déployant leurs micro-projets'
    ],
    gallery: [
      '/assets/aistudio/8_5185b9b0.PNG',
      '/assets/aistudio/5_f8a812a7.PNG',
      '/assets/aistudio/11_7fb309d3.PNG'
    ]
  },
  {
    id: 'pillar_nature',
    slug: 'nature-biodiversity',
    titleEn: 'Nature Protection & Biodiversity Conservation',
    titleFr: 'Protection de la Nature & Sauvegarde de la Biodiversité',
    tagEn: 'NATURE & BIODIVERSITY',
    tagFr: 'NATURE & BIODIVERSITÉ',
    shortDescEn: 'Restoring Virunga buffer zones through native tree nurseries and community stewardship.',
    shortDescFr: 'Régénérer les zones tampons des Virunga par des pépinières citoyennes et la veille écologique.',
    fullDescEn: 'The Goma Restoration project is our spearhead against deforestation and volcanic soil degradation. We engage border communities to plant native indigenous trees, combat charcoal depletion, and protect biodiversity.',
    fullDescFr: 'Le projet phare Goma Restoration combat la déforestation accélérée et l’érosion des terres volcaniques. Nous mobilisons les villages pour planter des essences indigènes et promouvoir des alternatives durables au charbon de bois.',
    image: '/assets/aistudio/7_ee54323c.PNG',
    icon: 'forest',
    order: 2,
    status: 'published',
    metrics: [
      { value: '10,000+', labelEn: 'native trees planted', labelFr: 'arbres indigènes plantés' },
      { value: '85%', labelEn: 'sapling survival rate', labelFr: 'taux de survie vérifié' },
      { value: '4', labelEn: 'community monitoring routes', labelFr: 'rondes de surveillance citoyenne' }
    ],
    objectivesEn: [
      'Produce and plant 25,000 climate-resilient trees annually around Goma and Virunga',
      'Train local households in clean-energy briquettes to halt deforestation pressure',
      'Establish community biodiversity monitoring committees with GPS mapping'
    ],
    objectivesFr: [
      'Produire et mettre en terre 25 000 arbres indigènes par an autour de Goma et des Virunga',
      'Former les ménages aux briquettes écologiques pour réduire la pression sur les forêts',
      'Structurer des comités villageois de veille écologique équipés d’outils GPS'
    ],
    gallery: [
      '/assets/aistudio/7_ee54323c.PNG',
      '/assets/aistudio/12_b8c87cf0.PNG',
      '/assets/aistudio/13_68afc347.PNG'
    ]
  },
  {
    id: 'pillar_agriculture',
    slug: 'agriculture-food-security',
    titleEn: 'Sustainable Agriculture & Food Security',
    titleFr: 'Agriculture Durable & Sécurité Alimentaire',
    tagEn: 'AGRICULTURE & FOOD',
    tagFr: 'AGRICULTURE & ALIMENTATION',
    shortDescEn: 'Agroecology, permaculture beds, and indigenous seed banks for volcanic soils.',
    shortDescFr: 'Agroécologie régénérative, potagers bio et banque de semences indigènes.',
    fullDescEn: 'Conflict and land degradation severely impact food sovereignty in North Kivu. ACV trains youth and women farmers in permaculture, natural pest management, bio-compost, and seed multiplication.',
    fullDescFr: 'Les perturbations climatiques et foncières menacent la souveraineté alimentaire au Nord-Kivu. ACV forme les agricultrices et jeunes maraîchers aux biopesticides naturels, au compost organique et à la multiplication semencière.',
    image: '/assets/aistudio/4_289670c0.PNG',
    icon: 'sprout',
    order: 3,
    status: 'published',
    metrics: [
      { value: '80+', labelEn: 'farmers trained in bio-inputs', labelFr: 'producteurs formés au bio-compost' },
      { value: '6', labelEn: 'community seed nurseries', labelFr: 'pépinières semencières créées' },
      { value: '35%', labelEn: 'crop yield increase observed', labelFr: 'hausse moyenne des rendements' }
    ],
    objectivesEn: [
      'Restore soil microbiome on 50 hectares of smallholder volcanic plots',
      'Safeguard endangered indigenous beans, amaranth, and drought-hardy tubers',
      'Create cooperative market linkages ensuring fair compensation for youth growers'
    ],
    objectivesFr: [
      'Régénérer le microbiome des sols sur 50 hectares d’exploitations familiales',
      'Sauvegarder les semences paysannes locales de haricots, amarantes et tubercules résistants',
      'Connecter les coopératives maraîchères aux marchés urbains équitables de Goma'
    ],
    gallery: [
      '/assets/aistudio/4_289670c0.PNG',
      '/assets/aistudio/14_a89ea47f.jpeg',
      '/assets/aistudio/15_f71655f6.jpeg'
    ]
  },
  {
    id: 'pillar_health',
    slug: 'health-wellbeing',
    titleEn: 'Community Health & Well-Being',
    titleFr: 'Santé Communautaire & Bien-Être',
    tagEn: 'COMMUNITY HEALTH',
    tagFr: 'SANTÉ COMMUNAUTAIRE',
    shortDescEn: 'Safe water access, community hygiene circuits, and holistic psychosocial resilience.',
    shortDescFr: 'Accès à l’eau saine, prévention de l’hygiène et soutien psychosocial holistique.',
    fullDescEn: 'Health and resilience are indivisible. ACV works with frontline health promoters to install bio-sand water filtration units, conduct menstrual hygiene bootcamps, and run trauma-informed listening circles.',
    fullDescFr: 'La santé est le socle de toute souveraineté. ACV déploie des unités de filtration d’eau par sable biologique, organise des ateliers de santé reproductive et anime des cercles d’écoute psychosociale.',
    image: '/assets/aistudio/15_f71655f6.jpeg',
    icon: 'heart',
    order: 4,
    status: 'published',
    metrics: [
      { value: '3', labelEn: 'solar water filtration kiosks', labelFr: 'kiosques solaires d’eau potable' },
      { value: '450+', labelEn: 'young women hygiene kits distributed', labelFr: 'kits d’hygiène distribués aux adolescentes' },
      { value: '18', labelEn: 'listening circles conducted', labelFr: 'cercles d’écoute communautaires' }
    ],
    objectivesEn: [
      'Eliminate waterborne cholera risks through decentralized bio-filtration kiosks',
      'Provide dignity and reproductive education for displaced and vulnerable adolescent girls',
      'De-stigmatize mental wellness through intergenerational community circles'
    ],
    objectivesFr: [
      'Éradiquer les risques hydriques de choléra grâce aux kiosques de bio-filtration',
      'Garantir la dignité et l’éducation à la santé reproductive des jeunes filles déplacées',
      'Déstigmatiser la santé mentale à travers des cercles de parole intergénérationnels'
    ],
    gallery: [
      '/assets/aistudio/15_f71655f6.jpeg',
      '/assets/aistudio/10_702700e4.PNG',
      '/assets/aistudio/1_6a0a7e99.PNG'
    ]
  },
  {
    id: 'pillar_empowerment',
    slug: 'socio-economic-empowerment',
    titleEn: 'Socio-Economic Empowerment',
    titleFr: 'Autonomie Socio-Économique & Moyens de Subsistance',
    tagEn: 'LIVELIHOODS & SAVINGS',
    tagFr: 'AUTONOMIE ÉCONOMIQUE',
    shortDescEn: 'Village savings groups (VSLAs), green micro-enterprises, and craft cooperatives.',
    shortDescFr: 'Associations villageoises d’épargne (AVEC), micro-entreprises vertes et artisanat.',
    fullDescEn: 'We break the cycle of chronic vulnerability through community-owned micro-finance (AVEC/VSLA). Women and youth pool collective savings to fund eco-businesses, solar repairs, and value-added crop processing.',
    fullDescFr: 'Nous brisons la dépendance par l’épargne solidaire autogérée (AVEC). Les femmes et jeunes mettent en commun leurs ressources pour financer des ateliers de transformation agroalimentaire et des micro-entreprises vertes.',
    image: '/assets/aistudio/10_702700e4.PNG',
    icon: 'briefcase',
    order: 5,
    status: 'published',
    metrics: [
      { value: '12', labelEn: 'active village savings groups (AVEC)', labelFr: 'groupes d’épargne AVEC actifs' },
      { value: '98%', labelEn: 'loan repayment discipline', labelFr: 'taux de remboursement solidaire' },
      { value: '$18k', labelEn: 'circulated locally in micro-loans', labelFr: 'micro-crédits circulés localement' }
    ],
    objectivesEn: [
      'Mobilize 25 new youth and women savings circles across peri-urban Goma',
      'Provide seed capital grants for solar and agro-processing micro-enterprises',
      'Teach financial literacy, transparent bookkeeping, and cooperative governance'
    ],
    objectivesFr: [
      'Mobiliser 25 nouveaux cercles d’épargne pour les femmes et jeunes périurbains',
      'Octroyer des micro-bourses d’amorçage pour la transformation solaire des récoltes',
      'Enseigner la gestion financière transparente et la gouvernance coopérative'
    ],
    gallery: [
      '/assets/aistudio/10_702700e4.PNG',
      '/assets/aistudio/4_289670c0.PNG',
      '/assets/aistudio/7_ee54323c.PNG'
    ]
  }
];

export const seedTeam: TeamMember[] = [
  {
    id: 'team_1',
    firstName: 'Berthollet',
    lastName: 'Munihire',
    roleEn: 'Executive Director & Legal Representative',
    roleFr: 'Directeur Exécutif & Représentant Légal',
    bioEn: 'Visionary community organizer with expertise in grassroots climate action, youth leadership development, and strategic partnerships in Eastern DRC.',
    bioFr: 'Coordonnateur communautaire engagé dans l’action climatique citoyenne, l’autonomisation des jeunes et la coopération stratégique au Nord-Kivu.',
    email: 'bertholletmunihire@gmail.com',
    linkedin: 'https://linkedin.com/in/berthollet-munihire',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85',
    category: 'Direction',
    order: 1,
    status: 'visible'
  },
  {
    id: 'team_2',
    firstName: 'Elie',
    lastName: 'Bwira',
    roleEn: 'Deputy Executive Director & Head of Programs',
    roleFr: 'Directeur Exécutif Adjoint & Responsable des Programmes',
    bioEn: 'Specialist in agroecology and sustainable project monitoring across Lake Kivu agricultural corridors.',
    bioFr: 'Agronome de formation, spécialiste du suivi-évaluation et de l’agroforesterie dans les couloirs du lac Kivu.',
    email: 'elie.bwira@acv-drc.org',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85',
    category: 'Direction',
    order: 2,
    status: 'visible'
  },
  {
    id: 'team_3',
    firstName: 'Clarisse',
    lastName: 'Kavira',
    roleEn: 'Head of Gender & Community Health',
    roleFr: 'Responsable Genre & Santé Communautaire',
    bioEn: 'Public health practitioner leading youth reproductive education and psychosocial listening circles in Goma.',
    bioFr: 'Praticienne en santé communautaire animant les programmes de santé reproductive et de soutien psychosocial.',
    email: 'clarisse.kavira@acv-drc.org',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    category: 'Coordinateur',
    order: 3,
    status: 'visible'
  },
  {
    id: 'team_4',
    firstName: 'Pascal',
    lastName: 'Murhula',
    roleEn: 'Lead Agronomist — Goma Restoration',
    roleFr: 'Agronome Principal — Projet Goma Restoration',
    bioEn: 'Field coordinator overseeing native seedling nurseries and volcanic bio-compost distribution hubs.',
    bioFr: 'Coordinateur terrain supervisant les pépinières d’arbres indigènes et les bio-composteurs collectifs.',
    email: 'pascal.murhula@acv-drc.org',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    category: 'Staff',
    order: 4,
    status: 'visible'
  },
  {
    id: 'team_5',
    firstName: 'Aline',
    lastName: 'Neema',
    roleEn: 'Finance & Transparent Governance Lead',
    roleFr: 'Responsable Administrative & Financière',
    bioEn: 'Accountant dedicated to open ledgers, donor auditing compliance, and grassroots savings group training.',
    bioFr: 'Comptable dédiée à la transparence financière, à la conformité des audits et à la formation des caisses AVEC.',
    email: 'finance@acv-drc.org',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    category: 'Staff',
    order: 5,
    status: 'visible'
  },
  {
    id: 'team_6',
    firstName: 'Justin',
    lastName: 'Paluku',
    roleEn: 'Youth Education & Digital Labs Facilitator',
    roleFr: 'Facilitateur Éducation & Espaces Numériques',
    bioEn: 'Educator running civic bootcamps, school green clubs, and solar digital workshops for displaced teens.',
    bioFr: 'Éducateur animant les bootcamps de leadership civique et les ateliers numériques pour adolescents.',
    email: 'education@acv-drc.org',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    category: 'Staff',
    order: 6,
    status: 'visible'
  }
];

export const seedFounders: Founder[] = [
  {
    id: 'founder_1',
    fullName: 'Berthollet Munihire',
    roleEn: 'Founder & Legal Representative',
    roleFr: 'Fondateur & Représentant Légal',
    bioEn: 'Born and raised in Goma, Berthollet established Africa Community Village to prove that Congolese youth are the primary architects of regional peace and environmental regeneration.',
    bioFr: 'Né et grandi à Goma, Berthollet a fondé ACV avec la certitude que la jeunesse congolaise est le moteur souverain de la résilience communautaire et de la régénération écologique.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85',
    yearsActive: '2023 – Présent',
    quoteEn: '“When young people lead, communities transform. When communities thrive, Africa rises.”',
    quoteFr: '« Quand les jeunes prennent l’initiative, les communautés se métamorphosent. Quand les communautés prospèrent, l’Afrique s’élève. »',
    order: 1,
    status: 'visible'
  },
  {
    id: 'founder_2',
    fullName: 'Elie Bwira',
    roleEn: 'Co-Founder & Head of Operations',
    roleFr: 'Co-Fondateur & Responsable des Opérations',
    bioEn: 'Passionate about agroecology and youth empowerment, Elie has co-architected ACV’s 5 core pillars and field-level monitoring methodologies.',
    bioFr: 'Passionné d’agroécologie et de développement participatif, Elie a co-conçu les 5 piliers stratégiques d’ACV et les méthodologies de terrain.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85',
    yearsActive: '2023 – Présent',
    quoteEn: '“Dignity is built from the soil up, with our own hands.”',
    quoteFr: '« La dignité s’édifie à partir de notre terre, avec nos propres mains. »',
    order: 2,
    status: 'visible'
  }
];

export const seedFieldStaff: FieldAgent[] = [
  {
    id: 'agent_1',
    name: 'Samuel Mbusa',
    positionEn: 'Virunga Buffer Zone Agroforestry Agent',
    positionFr: 'Agent Agroforestier Zone Tampon Virunga',
    zone: 'Nyiragongo / Kibumba',
    programId: 'nature-biodiversity',
    contact: '+243 971 223 104',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    entryDate: '2024-03-01',
    status: 'active'
  },
  {
    id: 'agent_2',
    name: 'Espérance Bahati',
    positionEn: 'VSLA & Women Savings Field Monitor',
    positionFr: 'Animatrice Terrain Caisses d’Épargne AVEC',
    zone: 'Goma (Quartier Mugunga & Himbi)',
    programId: 'socio-economic-empowerment',
    contact: '+243 812 556 789',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    entryDate: '2024-05-15',
    status: 'active'
  },
  {
    id: 'agent_3',
    name: 'Aimé Kambale',
    positionEn: 'Bio-Compost & Soil Microbiome Specialist',
    positionFr: 'Spécialiste Bio-Compost & Sols Volcaniques',
    zone: 'Masisi / Sake',
    programId: 'agriculture-food-security',
    contact: '+243 998 441 202',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    entryDate: '2024-08-01',
    status: 'active'
  }
];

export const seedGovernance: GovernanceMember[] = [
  {
    id: 'gov_1',
    name: 'Conseil Communautaire de Surveillance',
    roleEn: 'Community Oversight Council (Elders & Youth)',
    roleFr: 'Conseil de Surveillance Communautaire (Aînés & Jeunes)',
    mandateYears: '2024 – 2027',
    bioEn: 'Composed of 7 elected representatives (including 4 women and 3 youth delegates) ensuring strict alignment with village priorities.',
    bioFr: 'Composé de 7 délégués élus (dont 4 femmes et 3 jeunes) garantissant le respect strict des intérêts villageois.',
    photoUrl: '/assets/aistudio/10_702700e4.PNG',
    documentPdfUrl: '/uploads/acv_safeguarding_charter.pdf',
    documentTitleEn: 'Community Safeguarding Charter',
    documentTitleFr: 'Charte Communautaire de Protection & Transparence',
    order: 1,
    status: 'active'
  },
  {
    id: 'gov_2',
    name: 'Comité Éthique & Anti-Corruption',
    roleEn: 'Ethics & Open Ledger Audit Board',
    roleFr: 'Comité d’Audit & Transparence Financière',
    mandateYears: '2025 – 2028',
    bioEn: 'Independent review body publishing open financial reports and reviewing every disbursement above $1,000.',
    bioFr: 'Organe de contrôle indépendant publiant les bilans financiers et vérifiant toute dépense supérieure à 1 000 USD.',
    photoUrl: '/assets/aistudio/4_289670c0.PNG',
    documentPdfUrl: '/uploads/acv_financial_policy.pdf',
    documentTitleEn: 'Financial Transparency Policy',
    documentTitleFr: 'Politique de Gestion Comptable et Anti-Fraude',
    order: 2,
    status: 'active'
  }
];

export const seedArticles: Article[] = [
  {
    id: 'art_1',
    slug: 'goma-restoration-first-10000-trees',
    titleEn: 'Goma Restoration Project: How 10,000 Native Trees Are Rewriting North Kivu’s Climate Story',
    titleFr: 'Projet Goma Restoration : Comment 10 000 arbres indigènes réécrivent le futur climatique du Nord-Kivu',
    excerptEn: 'From volcanic ash to fertile micro-forests: young Congolese agronomists transform suburban soil around Lake Kivu.',
    excerptFr: 'Des cendres volcaniques aux micro-forêts fertiles : de jeunes agronomes congolais régénèrent la terre autour du lac Kivu.',
    contentEn: 'In Eastern Democratic Republic of the Congo, climate action cannot be separated from daily survival. Over the past twelve months, the youth brigades of Africa Community Village have set up four community nurseries in the hills of Goma. By combining indigenous seed conservation with bio-compost derived from domestic kitchen peelings, survival rates of saplings reached a groundbreaking 85%.',
    contentFr: 'À l’Est de la République Démocratique du Congo, l’action pour le climat est inséparable de la dignité quotidienne. Durant les douze derniers mois, les brigades de jeunes d’Africa Community Village ont installé quatre pépinières communautaires sur les hauteurs de Goma. En associant semences indigènes et compost organique, le taux de reprise des jeunes pousses a atteint 85%.',
    coverImage: '/assets/aistudio/7_ee54323c.PNG',
    author: 'Pascal Murhula & Berthollet Munihire',
    category: 'Environment & Climate',
    tags: ['Goma Restoration', 'Reforestation', 'Virunga', 'Agroecology'],
    readTime: '4 min read',
    publishDate: '2026-03-15',
    status: 'published',
    views: 428,
    featured: true
  },
  {
    id: 'art_2',
    slug: 'women-led-vsla-economic-resilience',
    titleEn: 'Breaking Dependence: Inside Goma’s Women-Led Village Savings Hubs',
    titleFr: 'Briser la dépendance : Au cœur des cercles d’épargne féminins de Goma',
    excerptEn: 'How twelve micro-savings cooperatives empower displaced families to launch sustainable micro-enterprises.',
    excerptFr: 'Comment douze coopératives d’épargne permettent aux familles déplacées de créer des activités durables.',
    contentEn: 'Rather than relying on sporadic humanitarian handouts, over 300 mothers and youth in Mugunga have gathered weekly to pool their savings through ACV’s AVEC initiative. The capital raised funds local manioc processing, solar battery recharge stations, and school supplies.',
    contentFr: 'Plutôt que d’attendre une aide humanitaire aléatoire, plus de 300 mères et jeunes de Mugunga se réunissent chaque semaine pour mettre en commun leurs économies à travers le programme AVEC d’ACV.',
    coverImage: '/assets/aistudio/10_702700e4.PNG',
    author: 'Clarisse Kavira',
    category: 'Socio-Economic',
    tags: ['AVEC', 'Women Empowerment', 'Microfinance', 'Goma'],
    readTime: '5 min read',
    publishDate: '2026-03-29',
    status: 'published',
    views: 312,
    featured: false
  },
  {
    id: 'art_3',
    slug: 'youth-leadership-climate-bootcamp',
    titleEn: 'When Young People Lead: Graduating Cohort 03 of the ACV Leadership Academy',
    titleFr: 'Quand la jeunesse s’engage : Diplôme de la Cohorte 03 de l’Académie de Leadership ACV',
    excerptEn: '40 new graduates ready to deploy climate education and civic monitoring in their villages.',
    excerptFr: '40 nouveaux lauréats prêts à animer l’éducation climatique et la veille civique dans leurs milieux.',
    contentEn: 'Graduates spent 8 weeks mastering participatory mapping, tree nursery engineering, and non-violent civic mobilization. Each graduate left with a peer-reviewed micro-project ready for local execution.',
    contentFr: 'Les participants ont suivi 8 semaines intensives de cartographie participative, d’ingénierie agroforestière et de mobilisation citoyenne.',
    coverImage: '/assets/aistudio/8_5185b9b0.PNG',
    author: 'Justin Paluku',
    category: 'Youth Leadership',
    tags: ['Leadership', 'Education', 'Civic Action'],
    readTime: '3 min read',
    publishDate: '2026-04-05',
    status: 'published',
    views: 245,
    featured: false
  }
];

export const seedMedia: MediaItem[] = [
  {
    id: 'med_1',
    title: 'ACV Official Horizontal Banner Emblem',
    filename: 'WhatsApp_Image_2026-10-19_at_23.23.59_792cea6b.jpeg',
    url: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_23.23.59_792cea6b.jpeg',
    type: 'image',
    mimeType: 'image/jpeg',
    sizeBytes: 142000,
    altTextEn: 'Official Logo of Africa Community Village',
    altTextFr: 'Logo officiel Africa Community Village',
    dimensions: '1200x400'
  },
  {
    id: 'med_2',
    title: 'Goma Restoration Nursery Field Work',
    filename: '7_ee54323c.PNG',
    url: '/assets/aistudio/7_ee54323c.PNG',
    type: 'image',
    mimeType: 'image/png',
    sizeBytes: 854000,
    altTextEn: 'Young people tending indigenous tree seedlings in North Kivu',
    altTextFr: 'Jeunes entretenant les pépinières d’arbres indigènes au Nord-Kivu',
    dimensions: '1920x1080'
  },
  {
    id: 'med_3',
    title: 'Youth Leadership Academy Workshop',
    filename: '8_5185b9b0.PNG',
    url: '/assets/aistudio/8_5185b9b0.PNG',
    type: 'image',
    mimeType: 'image/png',
    sizeBytes: 742000,
    altTextEn: 'ACV Civic Leadership session in Goma',
    altTextFr: 'Session de formation citoyenne à Goma',
    dimensions: '1920x1080'
  },
  {
    id: 'med_4',
    title: 'Sustainable Bio-Farming Bed Demonstration',
    filename: '4_289670c0.PNG',
    url: '/assets/aistudio/4_289670c0.PNG',
    type: 'image',
    mimeType: 'image/png',
    sizeBytes: 680000,
    altTextEn: 'Permaculture and regenerative vegetable bed in Himbi',
    altTextFr: 'Parcelle agroécologique maraîchère à Himbi',
    dimensions: '1920x1080'
  }
];

export const seedPartners: Partner[] = [
  {
    id: 'part_1',
    name: 'Miti Alliance Network',
    logoUrl: '/assets/aistudio/8_a0add9a7.PNG',
    type: 'Technique',
    websiteUrl: 'https://acv-drc.org',
    descriptionEn: 'Regional school greening and environmental education consortium.',
    descriptionFr: 'Consortium régional d’éducation environnementale et verdissement scolaire.',
    order: 1,
    status: 'active'
  },
  {
    id: 'part_2',
    name: 'Kivu Youth Agroecological Hub',
    logoUrl: '/assets/aistudio/11_ea7cde85.PNG',
    type: 'Financier',
    websiteUrl: 'https://acv-drc.org',
    descriptionEn: 'Youth cooperative seed funds for indigenous agroforestry in North Kivu.',
    descriptionFr: 'Fonds d’amorçage coopératif pour l’agroforesterie paysanne au Nord-Kivu.',
    order: 2,
    status: 'active'
  },
  {
    id: 'part_3',
    name: 'Goma Civil Society Solidarity Platform',
    logoUrl: '/assets/aistudio/27_9f2dff87.PNG',
    type: 'Institutionnel',
    websiteUrl: 'https://acv-drc.org',
    descriptionEn: 'Coalition of grassroots civic associations advocating for peace and youth rights.',
    descriptionFr: 'Plateforme citoyenne de défense des droits des jeunes et de la paix.',
    order: 3,
    status: 'active'
  }
];

export const seedDonors: Donor[] = [
  {
    id: 'don_1',
    name: 'Cercle Solidaire du Kivu',
    email: 'solidarite@goma.cd',
    type: 'Individuel',
    amount: 250,
    currency: 'USD',
    donationDate: '2026-04-10',
    anonymous: false,
    frequency: 'monthly',
    pillarAllocation: 'Goma Restoration',
    paymentMethod: 'Mobile Money (Airtel)',
    notes: 'Contribution mensuelle récurrente pour la pépinière de Kibumba.'
  },
  {
    id: 'don_2',
    name: 'Elena Rostova & Partners',
    email: 'elena.rostova@climate-alliance.eu',
    type: 'Fondation',
    amount: 500,
    currency: 'USD',
    donationDate: '2026-04-14',
    anonymous: false,
    frequency: 'one-time',
    pillarAllocation: 'Education & Youth',
    paymentMethod: 'Credit Card',
    notes: 'Support for Youth Leadership Academy cohort 04 kits.'
  },
  {
    id: 'don_3',
    name: 'Donateur Anonyme Diaspora',
    type: 'Diaspora',
    amount: 100,
    currency: 'USD',
    donationDate: '2026-04-18',
    anonymous: true,
    frequency: 'monthly',
    pillarAllocation: 'All Programs',
    paymentMethod: 'Bank Wire Transfer'
  }
];

export const seedTestimonials: Testimonial[] = [
  {
    id: 'test_1',
    quoteEn: 'Before ACV’s bio-compost training, volcanic ash was hardening our fields. Now our harvests feed 30 more children every season.',
    quoteFr: 'Avant la formation au compost d’ACV, la cendre volcanique durcissait nos terres. Aujourd’hui, notre potager nourrit 30 enfants de plus chaque saison.',
    author: 'Mama Jeanne Masika',
    roleEn: 'Lead Farmer, Himbi Women’s Cooperative',
    roleFr: 'Agricultrice responsable, Coopérative des femmes d’Himbi',
    location: 'Goma',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    status: 'visible',
    order: 1
  },
  {
    id: 'test_2',
    quoteEn: 'I thought young people only had to wait for international aid. ACV showed me that we have the seeds, the land, and the collective will to rebuild.',
    quoteFr: 'Je pensais que les jeunes devaient attendre l’aide internationale. ACV m’a prouvé que nous avons les semences, la terre et la force collective pour reconstruire.',
    author: 'Fabrice Nzabamwita',
    roleEn: 'Graduate, Cohort 02 Leadership Academy',
    roleFr: 'Diplômé, Cohorte 02 de l’Académie de Leadership',
    location: 'Nyiragongo',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    status: 'visible',
    order: 2
  }
];

export const seedImpactStats: ImpactStat[] = [
  {
    id: 'stat_1',
    labelEn: 'Young leaders trained in civic & climate action',
    labelFr: 'Jeunes leaders formés à l’action civique et climatique',
    value: '120+',
    unit: 'Leaders',
    iconName: 'users',
    displayPage: 'home',
    order: 1,
    status: 'active'
  },
  {
    id: 'stat_2',
    labelEn: 'Native trees planted around Virunga border zones',
    labelFr: 'Arbres indigènes plantés aux abords des Virunga',
    value: '10,000+',
    unit: 'Arbres',
    iconName: 'tree',
    displayPage: 'home',
    order: 2,
    status: 'active'
  },
  {
    id: 'stat_3',
    labelEn: 'Integrated program pillars in mutual reinforcement',
    labelFr: 'Piliers intégrés en renforcement mutuel',
    value: '5',
    unit: 'Piliers',
    iconName: 'layers',
    displayPage: 'home',
    order: 3,
    status: 'active'
  },
  {
    id: 'stat_4',
    labelEn: 'Active institutional & grassroots partnerships',
    labelFr: 'Partenariats actifs locaux et internationaux',
    value: '12',
    unit: 'Partenaires',
    iconName: 'handshake',
    displayPage: 'home',
    order: 4,
    status: 'active'
  }
];

export const seedAuditLogs: AuditLog[] = [
  {
    id: 'log_1',
    userName: 'Berthollet Munihire',
    userEmail: 'bertholletmunihire@gmail.com',
    action: 'login',
    entity: 'auth',
    details: 'Super-admin authenticated successfully from Goma office',
    timestamp: '2026-10-21T07:45:00Z',
    ipAddress: '197.157.240.12'
  },
  {
    id: 'log_2',
    userName: 'Berthollet Munihire',
    userEmail: 'bertholletmunihire@gmail.com',
    action: 'update',
    entity: 'programs',
    entityId: 'pillar_nature',
    details: 'Updated verified tree planting milestone to 10,000+ units',
    timestamp: '2026-10-21T08:00:00Z',
    ipAddress: '197.157.240.12'
  }
];

export const seedContactSubmissions: ContactSubmission[] = [
  {
    id: 'sub_1',
    name: 'Marie-Claire Nabintu',
    email: 'marie.nabintu@action-kivu.org',
    phone: '+243 977 120 340',
    category: 'Institutional Partnership',
    subject: 'Co-conception pépinière Virunga',
    message: 'Bonjour l’équipe ACV. Nous souhaitons explorer une mutualisation de nos semences maraîchères avec vos pépinières dans le Nord-Kivu.',
    status: 'new',
    read: false,
    date: '2026-04-18'
  },
  {
    id: 'sub_2',
    name: 'David Kasereka',
    email: 'dkasereka@univ-goma.cd',
    phone: '+243 812 400 901',
    category: 'Volunteer & Support',
    subject: 'Candidature mentorat agroécologique',
    message: 'Jeune diplômé en agronomie à Goma, je serais ravi de former bénévolement les cercles de jeunes maraîchers aux biopesticides naturels.',
    status: 'reviewed',
    read: true,
    date: '2026-04-15'
  }
];
