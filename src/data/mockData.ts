import {
  ProgramPillar,
  TeamMember,
  GovernanceTier,
  PolicyDocument,
  BlogPost,
  FieldNote,
  BannerSlide,
  SiteSettings,
  AdminUser
} from '../types';

export const initialSiteSettings: SiteSettings = {
  id: 'settings_main',
  address: '184 Avenue de la Paix, Himbi, Goma, North Kivu, DR Congo',
  email: 'info@acv-drc.org',
  phone: '+243 975 131 159',
  officeHoursEn: 'Monday – Friday, 8:00 – 17:00 (Central Africa Time)',
  officeHoursFr: 'Lundi – Vendredi, 8h00 – 17h00 (Heure d\'Afrique Centrale)',
  registrationNumber: 'DRC MinAffaires Sociales Reg. No. 4492/NK',
  instagram: 'https://www.instagram.com/africa.community.village',
  facebook: 'https://www.facebook.com/people/Africa-Community-Village/61566422018591/',
  linkedin: 'https://www.linkedin.com/company/smart-climate-inititives-drc/',
  twitter: 'https://x.com/africomvillage'
};

export const initialAdminUsers: AdminUser[] = [
  {
    id: 'user-1',
    name: 'Berthollet Munihire',
    email: 'bertholletmunihire@gmail.com',
    role: 'informaticien',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-2',
    name: 'Elie Bwira',
    email: 'elie.bwira@acv-drc.org',
    role: 'founder',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-3',
    name: 'Informaticien ACV',
    email: 'info@acv.fr',
    role: 'informaticien',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  }
];

export const defaultBanners: BannerSlide[] = [
  {
    id: 'banner_home_1',
    pageRoute: '/',
    titleEn: 'When young people lead, communities transform.',
    titleFr: 'Quand les jeunes prennent les rênes, les communautés se métamorphosent.',
    subtitleEn: 'Grassroots civic regeneration, agro-ecology, and living village ecosystems across Goma and Virunga landscapes.',
    subtitleFr: 'Régénération civique, agro-écologie et écosystèmes villageois vivants portés par la jeunesse à Goma et aux Virunga.',
    imageUrl: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    image: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    ctaTextEn: 'Explore Our Programs',
    ctaTextFr: 'Découvrir nos programmes',
    ctaLink: '/programs',
    order: 1,
    isActive: true,
    active: true
  },
  {
    id: 'banner_home_2',
    pageRoute: '/',
    titleEn: 'Goma Restoration: 10,000+ Native Trees Planted',
    titleFr: 'Projet Goma Restoration : Plus de 10 000 arbres indigènes plantés',
    subtitleEn: 'Restoring volcanic soils and creating resilient agroforestry belts around Lake Kivu and displaced families.',
    subtitleFr: 'Régénération des sols volcaniques et ceintures maraîchères solidaires au bord du lac Kivu et auprès des familles déplacées.',
    imageUrl: '/assets/images/acv_hero_tree_planting_1792692600143.jpg',
    image: '/assets/images/acv_hero_tree_planting_1792692600143.jpg',
    ctaTextEn: 'Read Field Notes',
    ctaTextFr: 'Lire les notes de terrain',
    ctaLink: '/about/field-notes',
    order: 2,
    isActive: true,
    active: true
  },
  {
    id: 'banner_home_3',
    pageRoute: '/',
    titleEn: 'Rooted in Ubuntu: Dignity & Collective Power',
    titleFr: 'Enracinés dans l’Ubuntu : Dignité & Force Collective',
    subtitleEn: 'Autonomous grassroots solutions designed, governed, and delivered by Congolese youth for generational resilience.',
    subtitleFr: 'Des solutions locales autonomes conçues, gouvernées et portées par la jeunesse congolaise pour une résilience durable.',
    imageUrl: '/assets/images/acv_hero_food_security_1792692600374.jpg',
    image: '/assets/images/acv_hero_food_security_1792692600374.jpg',
    ctaTextEn: 'Support Our Mission',
    ctaTextFr: 'Soutenir notre mission',
    ctaLink: '/donate',
    order: 3,
    isActive: true,
    active: true
  },
  {
    id: 'banner_about_1',
    pageRoute: '/about',
    titleEn: 'Autonomous, Youth-Led, Built for the Decades Ahead',
    titleFr: 'Autonome, Portée par la Jeunesse, Bâtie pour Durer',
    subtitleEn: 'Our governance and operations are run by young Congolese change-makers committed to systemic integrity.',
    subtitleFr: 'Une gouvernance collégiale et un engagement civique exemplaire dirigés par de jeunes acteurs de changement congolais.',
    imageUrl: '/assets/images/acv_hero_education_skills_1792692599936.jpg',
    image: '/assets/images/acv_hero_education_skills_1792692599936.jpg',
    ctaTextEn: 'Meet Our Team',
    ctaTextFr: 'Découvrir l’équipe',
    ctaLink: '/about/our-team',
    order: 1,
    isActive: true,
    active: true
  },
  {
    id: 'banner_about_2',
    pageRoute: '/about',
    titleEn: 'The Journey of Africa Community Village',
    titleFr: 'L’Histoire et la Mémoire d’Africa Community Village',
    subtitleEn: 'From local emergency response during crisis in Goma to a permanent youth-led village model of resilience.',
    subtitleFr: 'De la réponse citoyenne d’urgence à Goma vers un modèle durable de village vivant et régénérateur.',
    imageUrl: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    image: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    ctaTextEn: 'Read Our Story',
    ctaTextFr: 'Lire notre histoire',
    ctaLink: '/about/our-story',
    order: 2,
    isActive: true,
    active: true
  },
  {
    id: 'banner_programs_1',
    pageRoute: '/programs',
    titleEn: 'Five Pillars, One Holistic Living Village Model',
    titleFr: 'Cinq Piliers, Un Modèle de Village Vivant et Intégré',
    subtitleEn: 'No challenge exists in isolation: climate, education, food sovereignty, health, and economic dignity converge.',
    subtitleFr: 'Aucun défi n’est isolé : climat, éducation, alimentation, santé et dignité économique convergent ensemble.',
    imageUrl: '/assets/images/acv_hero_food_security_1792692600374.jpg',
    image: '/assets/images/acv_hero_food_security_1792692600374.jpg',
    ctaTextEn: 'Education & Youth',
    ctaTextFr: 'Éducation & Jeunesse',
    ctaLink: '/programs/education-youth',
    order: 1,
    isActive: true,
    active: true
  },
  {
    id: 'banner_programs_2',
    pageRoute: '/programs',
    titleEn: 'Nature Protection & Biodiversity in the Virunga Basin',
    titleFr: 'Protection de la Nature & Biodiversité dans le Bassin des Virunga',
    subtitleEn: 'Community nurseries, endemic reforestation, and watershed protection guarded by youth stewards.',
    subtitleFr: 'Pépinières communautaires, reboisement d’espèces indigènes et protection des bassins versants par la jeunesse.',
    imageUrl: '/assets/images/acv_hero_tree_planting_1792692600143.jpg',
    image: '/assets/images/acv_hero_tree_planting_1792692600143.jpg',
    ctaTextEn: 'Nature & Biodiversity',
    ctaTextFr: 'Nature & Biodiversité',
    ctaLink: '/programs/nature-biodiversity',
    order: 2,
    isActive: true,
    active: true
  },
  {
    id: 'banner_programs_3',
    pageRoute: '/programs',
    titleEn: 'Agro-Ecology & Sustainable Food Sovereignty',
    titleFr: 'Agro-Écologie & Souveraineté Alimentaire Durable',
    subtitleEn: 'Bio-fertilizers, permaculture school-farms, and community seed banks producing nutritious food locally.',
    subtitleFr: 'Bio-fertilisants, fermes-écoles en permaculture et semences paysannes pour une nutrition saine et locale.',
    imageUrl: '/assets/images/acv_hero_food_security_1792692600374.jpg',
    image: '/assets/images/acv_hero_food_security_1792692600374.jpg',
    ctaTextEn: 'Sustainable Agriculture',
    ctaTextFr: 'Agriculture Durable',
    ctaLink: '/programs/sustainable-agriculture',
    order: 3,
    isActive: true,
    active: true
  },
  {
    id: 'banner_approach_1',
    pageRoute: '/approach',
    titleEn: 'Ubuntu Ethics: « I am because we are »',
    titleFr: 'Éthique de l’Ubuntu : « Je suis parce que nous sommes »',
    subtitleEn: 'Rooted in ancestral kinship wisdom and validated through participatory village assemblies in Eastern DRC.',
    subtitleFr: 'Enracinée dans les sagesses ancestrales et validée par les assemblées communautaires participatives au Nord-Kivu.',
    imageUrl: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    image: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    ctaTextEn: 'Our Methodology',
    ctaTextFr: 'Notre Méthodologie',
    ctaLink: '/approach',
    order: 1,
    isActive: true,
    active: true
  },
  {
    id: 'banner_approach_2',
    pageRoute: '/approach',
    titleEn: 'Climate Resilience Born on the Volcanic Frontline',
    titleFr: 'Résilience Climatique Née sur la Ligne de Front Volcanique',
    subtitleEn: 'Youth innovation turning environmental vulnerability into community sovereignty, clean energy, and dignity.',
    subtitleFr: 'L’innovation de la jeunesse transformant la vulnérabilité environnementale en souveraineté et dignité.',
    imageUrl: '/assets/images/acv_hero_tree_planting_1792692600143.jpg',
    image: '/assets/images/acv_hero_tree_planting_1792692600143.jpg',
    ctaTextEn: 'Explore Principles',
    ctaTextFr: 'Découvrir nos principes',
    ctaLink: '/approach',
    order: 2,
    isActive: true,
    active: true
  },
  {
    id: 'banner_blog_1',
    pageRoute: '/blog',
    titleEn: 'Frontline Insights from Eastern DR Congo',
    titleFr: 'Éclairages du Front Écologique et Social au Nord-Kivu',
    subtitleEn: 'Deep reporting and reflective field notes from our educators, agronomists, and community organizers.',
    subtitleFr: 'Analyses approfondies et récits de terrain de nos agronomes, éducateurs et animateurs communautaires.',
    imageUrl: '/assets/images/acv_hero_education_skills_1792692599936.jpg',
    image: '/assets/images/acv_hero_education_skills_1792692599936.jpg',
    ctaTextEn: 'Read Latest Articles',
    ctaTextFr: 'Lire les derniers articles',
    ctaLink: '/blog',
    order: 1,
    isActive: true,
    active: true
  },
  {
    id: 'banner_blog_2',
    pageRoute: '/blog',
    titleEn: 'Community Voices: Stories of Hope & Transformation',
    titleFr: 'Voix Communautaires : Récits d’Espoir et de Transformation',
    subtitleEn: 'Direct witness accounts from Goma, Sake, and the Virunga green belts written by participants.',
    subtitleFr: 'Témoignages authentiques depuis Goma, Sake et la ceinture verte des Virunga écrits par les acteurs de terrain.',
    imageUrl: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    image: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    ctaTextEn: 'Read Field Stories',
    ctaTextFr: 'Découvrir les récits',
    ctaLink: '/blog',
    order: 2,
    isActive: true,
    active: true
  },
  {
    id: 'banner_contact_1',
    pageRoute: '/contact',
    titleEn: 'Reach ACV Headquarters in Himbi, Goma',
    titleFr: 'Contactez le Siège d’ACV à Himbi, Goma',
    subtitleEn: 'Our coordination welcomes institutional partners, researchers, donors, and grassroots volunteers.',
    subtitleFr: 'Notre coordination accueille partenaires institutionnels, chercheurs, bailleurs de fonds et volontaires engagés.',
    imageUrl: '/assets/images/acv_hero_education_skills_1792692599936.jpg',
    image: '/assets/images/acv_hero_education_skills_1792692599936.jpg',
    ctaTextEn: 'Send a Message',
    ctaTextFr: 'Envoyer un message',
    ctaLink: '/contact#support',
    order: 1,
    isActive: true,
    active: true
  },
  {
    id: 'banner_contact_2',
    pageRoute: '/contact',
    titleEn: 'Form a Strategic Alliance with Youth Leaders',
    titleFr: 'Bâtir une Alliance Stratégique avec la Jeunesse',
    subtitleEn: 'Co-create regenerative community projects with lasting multi-generational impact in Eastern DRC.',
    subtitleFr: 'Co-construire des projets à fort impact communautaire et écologique durable dans l’Est de la RDC.',
    imageUrl: '/assets/images/acv_hero_food_security_1792692600374.jpg',
    image: '/assets/images/acv_hero_food_security_1792692600374.jpg',
    ctaTextEn: 'Become a Partner',
    ctaTextFr: 'Devenir partenaire',
    ctaLink: '/contact#partner',
    order: 2,
    isActive: true,
    active: true
  },
  {
    id: 'banner_donate_1',
    pageRoute: '/donate',
    titleEn: 'Every Gift Fuels Tangible Grassroots Independence',
    titleFr: 'Chaque Don Consolide l’Autonomie de nos Communautés',
    subtitleEn: '100% of contributions directly fund trees, learning pods, clean water and youth workshops with transparent reporting.',
    subtitleFr: '100% des contributions financent directement des arbres, l’école, l’eau potable et les ateliers avec reddition des comptes.',
    imageUrl: '/assets/images/acv_hero_tree_planting_1792692600143.jpg',
    image: '/assets/images/acv_hero_tree_planting_1792692600143.jpg',
    ctaTextEn: 'Donate Now',
    ctaTextFr: 'Faire un don maintenant',
    ctaLink: '/donate',
    order: 1,
    isActive: true,
    active: true
  },
  {
    id: 'banner_donate_2',
    pageRoute: '/donate',
    titleEn: 'Uncompromising Financial Integrity & Community Audit',
    titleFr: 'Intégrité Financière Inébranlable & Audit Communautaire',
    subtitleEn: 'Quarterly ledger reports published openly for full democratic accountability and civic trust.',
    subtitleFr: 'Des rapports financiers trimestriels en libre accès pour une transparence démocratique totale et durable.',
    imageUrl: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    image: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
    ctaTextEn: 'Choose an Impact Tier',
    ctaTextFr: 'Choisir un palier d’impact',
    ctaLink: '/donate',
    order: 2,
    isActive: true,
    active: true
  }
];

export const initialProgramPillars: ProgramPillar[] = [
  {
    id: 'pillar-1',
    slug: 'education-youth',
    titleEn: 'Education & Youth Capacity Building',
    titleFr: 'Éducation & Renforcement des Capacités des Jeunes',
    tagEn: 'EDUCATION & YOUTH',
    tagFr: 'ÉDUCATION & JEUNESSE',
    shortDescEn: 'Equipping young people with the knowledge, skills and leadership platforms to drive change in their own communities.',
    shortDescFr: 'Doter les jeunes de connaissances pratiques, d\'aptitudes civiques et d\'espaces de leadership pour transformer leurs milieux.',
    fullDescEn: 'Equipping young people with the knowledge, skills and leadership platforms to drive change in their own communities — because the people closest to a problem are usually closest to its solution.',
    fullDescFr: 'Former la jeunesse congolaise aux compétences civiques, numériques et environnementales nécessaires pour devenir des actrices et acteurs majeurs du changement.',
    challengeTitleEn: 'Talent without a platform is talent wasted',
    challengeTitleFr: 'Un talent sans tremplin est un potentiel sacrifié',
    challengeDescEn: 'Displacement, under-resourced schools and limited civic space mean many capable young people in Eastern DRC never get a real platform to lead. ACV\'s education work exists to close that gap — not by replacing schools, but by giving young people structured leadership experience, environmental literacy and peer networks they can build on for life.',
    challengeDescFr: 'Les déplacements récurrents et le manque de structures condamnent de nombreux talents à l\'inaction. ACV crée des ponts formateurs durables.',
    quoteEn: '“A young leader who has actually run a small project is worth more to a community than ten who have only studied leadership in theory.”',
    quoteFr: '« Un jeune leader qui a concrètement piloté un micro-projet apporte plus à son village que dix qui n\'ont étudié le leadership qu\'en théorie. »',
    quoteAuthorEn: 'ACV EDUCATION & YOUTH PROGRAMME',
    quoteAuthorFr: 'PROGRAMME ÉDUCATION & JEUNESSE ACV',
    icon: 'school',
    color: '#D97706',
    badgeBg: '#FEE2E2',
    badgeText: '#991B1B',
    metrics: [
      { value: '120+', labelEn: 'young leaders trained through the Leadership Academy', labelFr: 'jeunes leaders formés à l\'Académie de Leadership' },
      { value: '4', labelEn: 'partner schools running the Miti Alliance curriculum', labelFr: 'écoles partenaires déployant le cursus Miti Alliance' },
      { value: '3', labelEn: 'youth-led civic leadership cohorts completed to date', labelFr: 'cohortes de leadership civique diplômées à ce jour' },
      { value: '1', labelEn: 'mentor for every graduating cohort, drawn from alumni', labelFr: 'mentor attitré par diplômé issu de la communauté des anciens' }
    ],
    activities: [
      {
        id: 'act-1-1',
        titleEn: 'Youth Leadership Academy',
        titleFr: 'Académie de Leadership pour la Jeunesse',
        descEn: 'A cohort-based programme in civic leadership, project design, public speaking and community organising. Graduates leave with a small project they have already planned, pitched and started to implement locally.',
        descFr: 'Formation intensive par cohortes en gestion de projets, prise de parole en public et mobilisation citoyenne.'
      },
      {
        id: 'act-1-2',
        titleEn: 'Miti Alliance School Programme',
        titleFr: 'Programme Scolaire Miti Alliance',
        descEn: 'Environmental literacy and hands-on tree-nursery management integrated directly into school playgrounds, fostering practical conservation instincts from childhood.',
        descFr: 'Sensibilisation écologique et gestion de pépinières pédagogiques au sein des cours d\'école.'
      },
      {
        id: 'act-1-3',
        titleEn: 'Digital & Vocational Skills Bridges',
        titleFr: 'Passerelles Numériques et Métiers Pratiques',
        descEn: 'Solar-powered digital labs providing offline coding, administrative tools, GIS mapping, and technical craft foundations to displaced adolescents.',
        descFr: 'Ateliers informatiques solaires et apprentissage de métiers techniques pour adolescents déplacés.'
      },
      {
        id: 'act-1-4',
        titleEn: 'Peer Mentorship Network',
        titleFr: 'Réseau de Mentorat entre Pairs',
        descEn: 'Connecting each academy graduate with active community professionals to guide their grassroots initiatives during their first critical year.',
        descFr: 'Accompagnement individuel des jeunes diplômés par des aînés engagés pour pérenniser leurs projets.'
      }
    ]
  },
  {
    id: 'pillar-2',
    slug: 'nature-biodiversity',
    titleEn: 'Nature Protection & Biodiversity Conservation',
    titleFr: 'Protection de la Nature & Sauvegarde de la Biodiversité',
    tagEn: 'NATURE & BIODIVERSITY',
    tagFr: 'NATURE & BIODIVERSITÉ',
    shortDescEn: 'Protecting and restoring the Congo Basin\'s ecosystems around Virunga through community-led conservation.',
    shortDescFr: 'Régénérer et protéger les écosystèmes du Bassin du Congo autour des Virunga par une gouvernance citoyenne.',
    fullDescEn: 'Protecting and restoring the ecosystems of the Congo Basin around Virunga National Park through community-led conservation — because the people living alongside this landscape are its most consistent guardians.',
    fullDescFr: 'Préserver et reboiser les massifs forestiers et les bassins versants volcaniques du Nord-Kivu en alliant reboisement et alternatives énergétiques durables.',
    challengeTitleEn: 'Conservation only holds if the neighbouring community can afford it',
    challengeTitleFr: 'La conservation ne tient que si la population riveraine a de quoi vivre',
    challengeDescEn: 'Displacement and poverty push households toward charcoal production and forest-edge clearing simply to cook a meal or earn an income. Top-down enforcement alone rarely changes that calculation. ACV\'s conservation work pairs protection with real alternatives, so that keeping the forest standing is also the more practical choice.',
    challengeDescFr: 'La précarité pousse parfois à la déforestation par nécessité de survie. ACV offre des alternatives économiques concrètes à la coupe du bois.',
    quoteEn: '“A protected hectare that no household can afford to respect will not stay protected for long.”',
    quoteFr: '« Un hectare protégé qu\'aucun foyer ne peut se permettre de respecter ne restera pas préservé bien longtemps. »',
    quoteAuthorEn: 'ACV NATURE & BIODIVERSITY PROGRAMME',
    quoteAuthorFr: 'PROGRAMME NATURE & BIODIVERSITÉ ACV',
    icon: 'forest',
    color: '#0E7490',
    badgeBg: '#E0F2FE',
    badgeText: '#0E7490',
    metrics: [
      { value: '4', labelEn: 'communities running active forest-monitoring routes', labelFr: 'communautés assurant des rondes de veille forestière citoyenne' },
      { value: '1', labelEn: 'school tree-nursery network feeding the Miti Alliance programme', labelFr: 'réseau de pépinières scolaires alimentant le projet Miti Alliance' },
      { value: '3', labelEn: 'alternative-energy pilot sites for cookstoves & briquettes', labelFr: 'sites pilotes de fabrication de foyers améliorés et briquettes' },
      { value: '100+', labelEn: 'households engaged in firewood-reduction practices', labelFr: 'ménages adoptant des pratiques d\'économie de bois de chauffe' }
    ],
    activities: [
      {
        id: 'act-2-1',
        titleEn: 'Miti Alliance Reforestation',
        titleFr: 'Reboisement Participatif Miti Alliance',
        descEn: 'Tree nurseries and school-ground planting that restore degraded land in stages, prioritising native species and areas most exposed to erosion and encroachment.',
        descFr: 'Pépinières villageoises et reboisement de coteaux dégradés avec des essences endémiques.'
      },
      {
        id: 'act-2-2',
        titleEn: 'Community Forest Monitoring',
        titleFr: 'Surveillance Communautaire des Forêts',
        descEn: 'Youth patrol teams mapping forest edges and reporting illegal cutting with low-bandwidth mobile reporting tools.',
        descFr: 'Brigades de jeunes équipées d\'outils de cartographie citoyenne pour surveiller les lisières forestières.'
      },
      {
        id: 'act-2-3',
        titleEn: 'Environmental Literacy in Schools',
        titleFr: 'Éducation Environnementale en Milieu Scolaire',
        descEn: 'Interactive climate curriculums teaching pupils biodiversity interdependence, water cycles, and soil science.',
        descFr: 'Modules pédagogiques sur les cycles de l\'eau, la biodiversité des Virunga et la fertilité des sols.'
      },
      {
        id: 'act-2-4',
        titleEn: 'Alternative Energy & Cookstoves',
        titleFr: 'Énergies Alternatives & Foyers Améliorés',
        descEn: 'Training youth ateliers to produce recycled biomass briquettes and thermo-efficient stoves, curbing makala dependency.',
        descFr: 'Fabrication de briquettes écologiques à base de déchets organiques et de foyers à faible consommation.'
      }
    ]
  },
  {
    id: 'pillar-3',
    slug: 'agriculture-food-security',
    titleEn: 'Sustainable Agriculture & Food Security',
    titleFr: 'Agriculture Durable & Sécurité Alimentaire',
    tagEn: 'FOOD SECURITY & LIVELIHOODS',
    tagFr: 'SÉCURITÉ ALIMENTAIRE & TERROIRS',
    shortDescEn: 'Building climate-resilient, food-secure communities through regenerative farming and agro-ecology.',
    shortDescFr: 'Bâtir des communautés souveraines et résilientes par l\'agro-écologie et la multiplication de semences.',
    fullDescEn: 'Building climate-resilient, food-secure communities through regenerative farming, seed systems and farmer-to-farmer extension — designed for households who cannot afford a season of trial and error.',
    fullDescFr: 'Structurer des systèmes agricoles agro-écologiques adaptés aux sols volcaniques et aux aléas climatiques pour garantir la souveraineté alimentaire.',
    challengeTitleEn: 'Smallholders are carrying climate risk they did not create',
    challengeTitleFr: 'Les petits exploitants subissent un choc climatique qu\'ils n\'ont pas causé',
    challengeDescEn: 'Erratic rainfall, depleted soils and fragile supply chains mean a single bad season can push a household from food-secure to food-insecure. ACV\'s agriculture work focuses on practices that are low-cost, locally repeatable and resilient to a bad year — not high-input methods that only work when everything goes right.',
    challengeDescFr: 'Des pluies imprévisibles et des sols appauvris fragilisent les ménages. Nos techniques agro-écologiques privilégient la résilience pérenne.',
    quoteEn: '“The goal is not the best possible harvest in a good year — it is a survivable harvest in a bad one.”',
    quoteFr: '« L\'objectif n\'est pas la récolte miraculeuse lors d\'une année idéale, mais une récolte protectrice lors des saisons difficiles. »',
    quoteAuthorEn: 'ACV AGRICULTURE & FOOD SECURITY PROGRAMME',
    quoteAuthorFr: 'PROGRAMME AGRICULTURE DURABLE ACV',
    icon: 'potted_plant',
    color: '#0E7490',
    badgeBg: '#FEF3C7',
    badgeText: '#B45309',
    metrics: [
      { value: '3', labelEn: 'communities running active demonstration plots', labelFr: 'communautés gérant des parcelles de démonstration actives' },
      { value: '1', labelEn: 'farmer-to-farmer extension network feeding new adopters', labelFr: 'réseau paysan formateur intégrant de nouveaux agriculteurs' },
      { value: '2', labelEn: 'women\'s cooperative gardens currently active', labelFr: 'jardins potagers maraîchers coopératifs de femmes' },
      { value: '1', labelEn: 'community seed-multiplication cycle completed', labelFr: 'cycle complet de multiplication et stockage de semences indigènes' }
    ],
    activities: [
      {
        id: 'act-3-1',
        titleEn: 'Demonstration & Agro-Ecology Plots',
        titleFr: 'Parcelles Témoins Agro-Écologiques',
        descEn: 'Shared plots where farmer households trial composting, intercropping and water-conserving techniques together before adopting them on their own land.',
        descFr: 'Champs d\'expérimentation partagés où les familles testent le compostage et les associations culturales avant adoption.'
      },
      {
        id: 'act-3-2',
        titleEn: 'Farmer-to-Farmer Extension',
        titleFr: 'Vulgarisation Paysanne de Pair à Pair',
        descEn: 'Trained local lead farmers who mentor neighboring growers in regenerative techniques without dependency on external agronomy visits.',
        descFr: 'Paysans-relais formant leurs pairs aux techniques de gestion de l\'eau et de fertilisation organique.'
      },
      {
        id: 'act-3-3',
        titleEn: 'Seed Multiplication & Storage',
        titleFr: 'Multiplication et Banques de Semences Locales',
        descEn: 'Reviving resilient native bean, maize and vegetable varieties that withstand drought and pests without synthetic agrochemicals.',
        descFr: 'Sauvegarde et diffusion de variétés indigènes rustiques résistantes aux sécheresses.'
      },
      {
        id: 'act-3-4',
        titleEn: 'Household Nutrition & Kitchen Gardens',
        titleFr: 'Jardins Nutritifs Ménagers',
        descEn: 'Compact micro-gardens right by family compounds providing micronutrient-dense leafy greens for infants and nursing mothers.',
        descFr: 'Potagers verticaux et micro-jardins urbains fournissant des légumes frais et nutritifs aux enfants.'
      }
    ]
  },
  {
    id: 'pillar-4',
    slug: 'health-wellbeing',
    titleEn: 'Community Health & Well-Being',
    titleFr: 'Santé Communautaire & Bien-Être',
    tagEn: 'HEALTH & WATER',
    tagFr: 'SANTÉ & EAU POTABLE',
    shortDescEn: 'Promoting holistic health for vulnerable communities, with particular attention to women and children.',
    shortDescFr: 'Promouvoir une santé intégrale, l\'accès à l\'eau potable et le soutien psychosocial pour les familles.',
    fullDescEn: 'Promoting holistic health for vulnerable communities, with particular attention to women and children — because illness in one household affects the economic stability of the entire neighbourhood.',
    fullDescFr: 'Soins de proximité, prévention des maladies hydriques, hygiène et cercles d\'écoute psychologique post-traumatique.',
    challengeTitleEn: 'Health begins at the doorstep, not at the hospital bed',
    challengeTitleFr: 'La santé commence au seuil de la case, bien avant l\'hôpital',
    challengeDescEn: 'In rural North Kivu and peripheral Goma camps, the greatest risks are preventable waterborne diseases, malnutrition, and unaddressed trauma. ACV deploys community health volunteers who meet families at home to monitor indicators and link them with clinical care before emergencies arise.',
    challengeDescFr: 'Prévenir le choléra, la malnutrition infantile et l\'isolement traumatique grâce à un maillage de volontaires de santé formés.',
    quoteEn: '“When clean water flows in the village square and mothers have trusted advice next door, clinic admissions drop by half.”',
    quoteFr: '« Quand l\'eau potable coule au centre du village et qu\'un conseil de santé est accessible au pas de la porte, les hospitalisations diminuent de moitié. »',
    quoteAuthorEn: 'ACV HEALTH & WELL-BEING INITIATIVE',
    quoteAuthorFr: 'INITIATIVE SANTÉ COMMUNAUTAIRE ACV',
    icon: 'medical_services',
    color: '#991B1B',
    badgeBg: '#CFFAFE',
    badgeText: '#0E7490',
    metrics: [
      { value: '45,000L', labelEn: 'of clean drinking water distributed daily through tapstands', labelFr: 'd\'eau potable distribuée quotidiennement via nos bornes fontaines' },
      { value: '18', labelEn: 'community health volunteer relays active in Goma & Beni', labelFr: 'relais communautaires de santé formés et actifs' },
      { value: '1,250+', labelEn: 'mothers and infants reached by home nutrition checkups', labelFr: 'mères et nourrissons suivis lors des visites nutritionnelles' },
      { value: '0', labelEn: 'waterborne disease outbreaks in villages with active ACV wells', labelFr: 'épidémie hydrique déclarée dans les zones desservies par nos forages' }
    ],
    activities: [
      {
        id: 'act-4-1',
        titleEn: 'Gravity-Fed Clean Water Tapstands',
        titleFr: 'Bornes-Fontaines Gravitaires d\'Eau Saine',
        descEn: 'Protected mountain spring catchments delivering free, potable water to peripheral settlements without costly diesel pumps.',
        descFr: 'Captages de sources naturelles acheminant une eau pure par gravité jusqu\'aux quartiers vulnérables.'
      },
      {
        id: 'act-4-2',
        titleEn: 'Community Health Relay Networks',
        titleFr: 'Réseau de Volontaires Communautaires',
        descEn: 'Trained neighborhood volunteers conducting maternal hygiene visits, screening for malnutrition, and distributing oral rehydration salts.',
        descFr: 'Visites à domicile pour le dépistage précoce de la malnutrition et la sensibilisation à l\'hygiène.'
      },
      {
        id: 'act-4-3',
        titleEn: 'Trauma-Informed Listening Circles',
        titleFr: 'Cercles d\'Écoute et de Résilience Psychosociale',
        descEn: 'Confidential peer-support sessions facilitated by trained counselors for youth and mothers impacted by displacement and conflict.',
        descFr: 'Groupes de parole bienveillants et accompagnement psychosocial pour surmonter les chocs de la guerre.'
      },
      {
        id: 'act-4-4',
        titleEn: 'Menstrual Health & Dignity Kits',
        titleFr: 'Kits de Dignité et Santé Menstruelle',
        descEn: 'Reusable pad production workshops run by youth seamstresses, ensuring girls do not miss school days during periods.',
        descFr: 'Confection locale de protections lavables permettant aux jeunes filles de poursuivre leur scolarité sans interruption.'
      }
    ]
  },
  {
    id: 'pillar-5',
    slug: 'socio-economic-empowerment',
    titleEn: 'Socio-Economic Empowerment & Livelihoods',
    titleFr: 'Autonomisation Socio-Économique & Moyens de Subsistance',
    tagEn: 'LIVELIHOODS & ENTERPRISE',
    tagFr: 'ENTREPRENEURIAT & SOLIDARITÉ',
    shortDescEn: 'Opening pathways out of poverty through skills training, enterprise support and economic inclusion.',
    shortDescFr: 'Ouvrir des voies d\'émancipation économique par la formation, le crédit rotatif et l\'artisanat local.',
    fullDescEn: 'Opening pathways out of poverty through skills training, enterprise support and economic inclusion — replacing predatory high-interest informal loans with solidarity-driven wealth building.',
    fullDescFr: 'Soutenir l\'entrepreneuriat des jeunes et des femmes par des associations villageoises d\'épargne et de crédit (AVEC) et des ateliers coopératifs.',
    challengeTitleEn: 'Dignity is built on an income you control yourself',
    challengeTitleFr: 'La vraie dignité repose sur un revenu que l\'on génère soi-même',
    challengeDescEn: 'Too often, humanitarian aid provides hand-to-mouth handouts that evaporate in a week, leaving youth unemployed and vulnerable to recruitment. ACV invests seed capital directly into productive micro-enterprises: solar repair workshops, tailoring collectives, and carpentry guilds.',
    challengeDescFr: 'Rompre le cercle vicieux de l\'assistance humanitaire par des micro-entreprises pérennes détenues et pilotées localement.',
    quoteEn: '“When a young person acquires a tool and earns their first independent wage, peace stops being an abstract slogan.”',
    quoteFr: '« Dès qu\'un jeune manie un outil et gagne sa vie honnêtement, la paix cesse d\'être un slogan pour devenir une réalité quotidienne. »',
    quoteAuthorEn: 'ACV LIVELIHOODS & ENTERPRISE TRACK',
    quoteAuthorFr: 'VOLET ÉCONOMIE SOLIDAIRE ACV',
    icon: 'handshake',
    color: '#D97706',
    badgeBg: '#F3E8FF',
    badgeText: '#6B21A8',
    metrics: [
      { value: '42', labelEn: 'active village savings & loan associations (VSLAs)', labelFr: 'associations villageoises d\'épargne et de crédit (AVEC) actives' },
      { value: '$182,000', labelEn: 'circulated in autonomous local savings and small loans', labelFr: 'de capitaux autonomes mobilisés et réinvestis localement' },
      { value: '99.1%', labelEn: 'repayment rate on peer-approved community micro-grants', labelFr: 'taux de remboursement constaté sur les prêts rotatifs' },
      { value: '86', labelEn: 'youth-owned micro-businesses launched and operating', labelFr: 'micro-entreprises de jeunes créées et en pleine activité' }
    ],
    activities: [
      {
        id: 'act-5-1',
        titleEn: 'Village Savings and Loan Associations (VSLA)',
        titleFr: 'Associations Villageoises d\'Épargne et de Crédit (AVEC)',
        descEn: 'Self-managed groups of 25–30 women and youth pooling weekly savings into locked metal cashboxes to fund member businesses and emergencies.',
        descFr: 'Groupes d\'épargne solidaire autogérés finançant les activités commerciales et les imprévus familiaux.'
      },
      {
        id: 'act-5-2',
        titleEn: 'Youth Cooperative Workshops',
        titleFr: 'Ateliers Coopératifs de Jeunes',
        descEn: 'Equipped communal ateliers where carpenters, welders, tailors, and electricians share machinery and tools to lower startup overhead.',
        descFr: 'Espaces d\'artisanat mutualisés réduisant les coûts d\'installation pour les jeunes diplômés.'
      },
      {
        id: 'act-5-3',
        titleEn: 'Solar & Renewable Tech Apprenticeships',
        titleFr: 'Apprentissage en Énergies Solaires',
        descEn: 'Training displaced youth to install and repair solar domestic kits, generating recurring maintenance income.',
        descFr: 'Formation technique à l\'installation et maintenance de kits solaires résidentiels et communautaires.'
      },
      {
        id: 'act-5-4',
        titleEn: 'Market Linkages & Producer Guilds',
        titleFr: 'Accès aux Marchés & Guilde des Producteurs',
        descEn: 'Helping agro-ecology cooperatives package and transport organic vegetables directly to Goma markets without predatory middlemen.',
        descFr: 'Regroupement de l\'offre maraîchère pour vendre en direct sur les marchés urbains de Goma.'
      }
    ]
  }
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Elie Bwira',
    roleEn: 'FOUNDER & EXECUTIVE DIRECTOR',
    roleFr: 'FONDATEUR & DIRECTEUR EXÉCUTIF',
    category: 'leadership',
    bioEn: 'A young environmental and conservation leader with over eight years of experience in sustainability and youth leadership, Elie founded ACV to put community voice at the centre of recovery in Eastern DRC.',
    bioFr: 'Leader environnemental et fervent défenseur de la jeunesse avec plus de huit années d\'engagement, Elie a fondé ACV pour placer les communautés locales au cœur de leur propre destin.',
    initials: 'EB',
    bgGradient: 'from-amber-600 to-amber-700'
  },
  {
    id: 'team-2',
    name: 'Vincent Manimani',
    roleEn: 'CO-FOUNDER & PROGRAMS COORDINATOR',
    roleFr: 'CO-FONDATEUR & COORDONNATEUR DES PROGRAMMES',
    category: 'leadership',
    bioEn: 'A dedicated youth-development professional with a background in monitoring & evaluation, coordination and community engagement, committed to delivering programs that translate into lasting social change.',
    bioFr: 'Professionnel dévoué au développement de la jeunesse, expert en suivi-évaluation et mobilisation communautaire, engagé pour des programmes à fort impact social.',
    initials: 'VM',
    bgGradient: 'from-teal-600 to-teal-800'
  },
  {
    id: 'team-3',
    name: 'Grace David',
    roleEn: 'ADMINISTRATION & FINANCE MANAGER',
    roleFr: 'RESPONSABLE ADMINISTRATIVE & FINANCIÈRE',
    category: 'operations',
    bioEn: 'An organised, results-driven professional in administration and financial management, keeping ACV\'s operations efficient, accountable and well resourced.',
    bioFr: 'Gestionnaire rigoureuse assurant la transparence des comptes, la conformité réglementaire et la bonne gouvernance financière d\'ACV.',
    initials: 'GD',
    bgGradient: 'from-red-600 to-red-800'
  },
  {
    id: 'team-4',
    name: 'Richard Balagizi',
    roleEn: 'PARTNERSHIPS MANAGER',
    roleFr: 'RESPONSABLE DES PARTENARIATS',
    category: 'operations',
    bioEn: 'A strategic relationship-builder experienced in stakeholder engagement and resource mobilisation, dedicated to forging collaborations that grow ACV\'s impact.',
    bioFr: 'Spécialiste des relations institutionnelles et de la mobilisation de ressources, fédérant partenaires locaux et internationaux.',
    initials: 'RB',
    bgGradient: 'from-blue-600 to-blue-800'
  },
  {
    id: 'team-5',
    name: 'Christelle Soki',
    roleEn: 'COMMUNICATIONS ASSISTANT',
    roleFr: 'CHARGÉE DE COMMUNICATION',
    category: 'operations',
    bioEn: 'A creative communicator with a passion for storytelling and digital engagement, helping ACV\'s work reach the partners and communities who need to see it.',
    bioFr: 'Communicante passionnée valorisant la parole des acteurs de terrain et amplifiant le rayonnement des actions d\'ACV.',
    initials: 'CS',
    bgGradient: 'from-amber-500 to-amber-600'
  },
  {
    id: 'team-6',
    name: 'Esther Zaina',
    roleEn: 'ADMINISTRATION ASSISTANT',
    roleFr: 'ASSISTANTE ADMINISTRATIVE',
    category: 'operations',
    bioEn: 'A detail-oriented administrative professional supporting office coordination and records management so program teams can stay focused on the field.',
    bioFr: 'Appui administratif précieux garantissant la fluidité opérationnelle entre le siège de Goma et les antennes de terrain.',
    initials: 'EZ',
    bgGradient: 'from-[#0E7490] to-[#232826]'
  },
  {
    id: 'team-7',
    name: 'Justin Batumike',
    roleEn: 'AGRICULTURAL FIELD OFFICER',
    roleFr: 'RESPONSABLE AGRONOMIQUE TERRAIN',
    category: 'field',
    bioEn: 'A crop-production specialist working directly with farmer groups on field operations and sustainable practices that raise yields and resilience.',
    bioFr: 'Agronome passionné accompagnant les coopératives paysannes dans l\'adoption de pratiques agro-écologiques résilientes.',
    initials: 'JB',
    bgGradient: 'from-cyan-600 to-cyan-800'
  },
  {
    id: 'team-8',
    name: 'Rodrigue Shukuru',
    roleEn: 'YOUTH PROJECT LEAD',
    roleFr: 'CHARGÉ DES PROJETS JEUNESSE',
    category: 'field',
    bioEn: 'A dynamic youth leader driving project implementation and community mobilisation, turning program plans into action on the ground.',
    bioFr: 'Animateur chevronné transformant les ambitions stratégiques en réalisations tangibles auprès des collectifs de jeunes.',
    initials: 'RS',
    bgGradient: 'from-orange-600 to-orange-800'
  },
  {
    id: 'team-9',
    name: 'Boaz Lubundu',
    roleEn: 'IT & COMMUNICATIONS OFFICER',
    roleFr: 'RESPONSABLE IT & SYSTÈMES D\'INFORMATION',
    category: 'operations',
    bioEn: 'A technology and communications professional supporting ACV\'s digital systems, information management and field-to-office reporting.',
    bioFr: 'Ingénieur numérique pilotant les infrastructures logicielles, la transmission des données de terrain et la sécurité informatique.',
    initials: 'BL',
    bgGradient: 'from-indigo-600 to-indigo-800'
  }
];

export const initialGovernanceTiers: GovernanceTier[] = [
  {
    id: 'tier-1',
    step: '01',
    titleEn: 'General Assembly',
    titleFr: 'Assemblée Générale',
    descEn: 'The organisation\'s highest authority — founding and senior members who set long-term direction and approve major decisions.',
    descFr: 'L\'instance décisionnelle suprême d\'ACV réunissant membres fondateurs et délégués communautaires pour valider les orientations stratégiques.'
  },
  {
    id: 'tier-2',
    step: '02',
    titleEn: 'Board of Directors',
    titleFr: 'Conseil d\'Administration',
    descEn: 'Provides strategic oversight, approves annual plans and budgets, and holds the Executive Direction accountable between Assemblies.',
    descFr: 'Assure le contrôle stratégique, valide les budgets prévisionnels et veille à la bonne gouvernance entre deux Assemblées.'
  },
  {
    id: 'tier-3',
    step: '03',
    titleEn: 'Executive Direction',
    titleFr: 'Direction Exécutive',
    descEn: 'Translates strategy into operations: the Executive Director and program coordinators run day-to-day delivery and report upward.',
    descFr: 'Garantit la mise en œuvre opérationnelle des programmes au quotidien et rend compte régulièrement au Conseil.'
  },
  {
    id: 'tier-4',
    step: '04',
    titleEn: 'Program & Field Teams',
    titleFr: 'Équipes de Terrain & Volontaires',
    descEn: 'Field officers, project leads and community volunteers deliver the work and feed lessons back up through monitoring & evaluation.',
    descFr: 'Les animateurs et relais de terrain qui exécutent les actions et remontent les apprentissages par le suivi-évaluation continu.'
  }
];

export const initialPolicyDocuments: PolicyDocument[] = [
  {
    id: 'pol-1',
    titleEn: 'Safeguarding Policy',
    titleFr: 'Politique de Sauvegarde & Protection',
    descEn: 'Sets out how ACV prevents, identifies and responds to any risk of harm to the children, youth and community members it works with.',
    descFr: 'Définit nos protocoles stricts de protection des enfants et des bénéficiaires vulnérables contre tout abus ou préjudice.',
    icon: 'shield_person',
    updatedDate: 'January 2026',
    contentEn: 'Africa Community Village operates a zero-tolerance policy towards harassment, exploitation, and abuse. All personnel and volunteers undergo mandatory background checks and safeguarding training prior to field deployment.',
    contentFr: 'ACV applique une politique de tolérance zéro envers toute forme d\'exploitation ou d\'abus. Tous les membres du personnel sont soumis à une formation obligatoire.'
  },
  {
    id: 'pol-2',
    titleEn: 'Code of Conduct',
    titleFr: 'Code de Conduite Institutionnel',
    descEn: 'Defines the standards of behaviour expected of every staff member, volunteer and partner representing ACV in the field.',
    descFr: 'Fixe les règles éthiques et professionnelles applicables à tout agent, volontaire ou représentant d\'ACV.',
    icon: 'gavel',
    updatedDate: 'December 2025',
    contentEn: 'Sets the foundational expectations of integrity, political neutrality, respect for local customs, and protection of community assets in all interventions.',
    contentFr: 'Définit les impératifs d\'intégrité, de neutralité politique, de respect des autorités locales et de gestion transparente des biens communs.'
  },
  {
    id: 'pol-3',
    titleEn: 'Strategic Plan 2026–2030',
    titleFr: 'Plan Stratégique Quinquennal 2026–2030',
    descEn: 'Lays out ACV\'s five-year direction across the five program pillars, with targets, milestones and resourcing assumptions.',
    descFr: 'Cadre stratégique sur cinq ans fixant nos objectifs quantitatifs, nos jalons de reboisement et nos partenariats clés.',
    icon: 'explore',
    updatedDate: 'February 2026',
    contentEn: 'Roadmap outlining our expansion to 10 additional communities in South Kivu, targeted planting of 500,000 indigenous trees, and scaling of youth-led VSLAs.',
    contentFr: 'Feuille de route détaillant l\'expansion vers 10 nouvelles localités, la plantation de 500 000 arbres indigènes et la pérennisation des AVEC.'
  },
  {
    id: 'pol-4',
    titleEn: 'Monitoring & Evaluation Framework',
    titleFr: 'Cadre de Suivi & Évaluation (S&E)',
    descEn: 'The indicators, data-collection methods and review cycles ACV uses to track whether programs are achieving their intended outcomes.',
    descFr: 'Indicateurs de performance, méthodes de collecte numérique et cycles d\'audits participatifs vérifiant l\'impact réel.',
    icon: 'track_changes',
    updatedDate: 'November 2025',
    contentEn: 'Defines our peer-auditing mechanism where community assemblies independently verify project milestones before subsequent funding is released.',
    contentFr: 'Mécanisme d\'évaluation participative où les assemblées villageoises valident les livrables avant tout déblocage de tranche.'
  },
  {
    id: 'pol-5',
    titleEn: 'Risk Register & Security Protocols',
    titleFr: 'Registre des Risques & Protocoles Sécuritaires',
    descEn: 'A living document tracking operational, security, financial and reputational risks across program areas, with mitigation owners assigned.',
    descFr: 'Outil opérationnel dynamique recensant les risques sécuritaires et climatiques et fixant les mesures d\'atténuation immédiates.',
    icon: 'visibility',
    updatedDate: 'Monthly revision',
    contentEn: 'Detailed contingency plans for rapid displacement events around Sake and Rutshuru, ensuring continuous education and water pod operations.',
    contentFr: 'Plans de contingence permettant la continuité des cours et de l\'eau potable même en situation d\'insécurité soudaine.'
  }
];

export const initialEightValues = [
  {
    step: '01',
    titleEn: 'Community Leadership',
    titleFr: 'Leadership Communautaire',
    descEn: 'Communities are the authors of their own development, not the audience for someone else\'s plan.',
    descFr: 'Les populations sont les actrices maîtresses de leur relèvement, non les spectatrices de programmes extérieurs.'
  },
  {
    step: '02',
    titleEn: 'Youth Empowerment',
    titleFr: 'Émancipation de la Jeunesse',
    descEn: 'Young people are treated as capable leaders today, not as beneficiaries to be developed for tomorrow.',
    descFr: 'Les jeunes sont des leaders accomplis dès aujourd\'hui, non de simples bénéficiaires passifs de demain.'
  },
  {
    step: '03',
    titleEn: 'Equity & Inclusion',
    titleFr: 'Équité & Inclusion',
    descEn: 'Programs are designed so that women, youth and marginalised groups have a genuine seat at the table.',
    descFr: 'Garantir aux femmes, aux déplacés et aux groupes vulnérables une voix prépondérante dans chaque décision.'
  },
  {
    step: '04',
    titleEn: 'Sustainability',
    titleFr: 'Durabilité & Autonomie',
    descEn: 'Solutions are built to outlast the funding cycle, rooted in local capacity and local materials.',
    descFr: 'Des solutions conçues pour survivre aux cycles de subventions, appuyées sur les ressources locales.'
  },
  {
    step: '05',
    titleEn: 'Integrity & Accountability',
    titleFr: 'Intégrité & Transparence',
    descEn: 'We report honestly on what works, what doesn\'t, and where resources go.',
    descFr: 'Transparence totale sur les réussites, les échecs constructifs et l\'affectation de chaque dollar.'
  },
  {
    step: '06',
    titleEn: 'Collaboration',
    titleFr: 'Coopération Fructueuse',
    descEn: 'Government, civil society, traditional leaders and international partners all have a role to play.',
    descFr: 'Mobiliser autorités coutumières, institutions, collectifs et société civile vers un but partagé.'
  },
  {
    step: '07',
    titleEn: 'Resilience & Adaptability',
    titleFr: 'Résilience & Agilité',
    descEn: 'Programs are designed to keep functioning when shocks — conflict, climate, displacement — hit.',
    descFr: 'Des mécanismes agiles capables de continuer à opérer face aux secousses sécuritaires ou climatiques.'
  },
  {
    step: '08',
    titleEn: 'Respect for Indigenous Knowledge',
    titleFr: 'Respect des Savoirs Indigènes',
    descEn: 'Generations of local ecological and agricultural knowledge are treated as expertise, not folklore.',
    descFr: 'Reconnaître les savoirs agronomiques et forestiers ancestraux comme une science essentielle.'
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'miti-alliance-pupils-plant-next-generation-of-forest',
    titleEn: 'Miti Alliance: pupils plant the next generation of forest',
    titleFr: 'Miti Alliance : les écoliers plantent la forêt de demain',
    category: 'Nature',
    pillarSlug: 'nature-biodiversity',
    publishedDate: 'February 2026',
    readTime: '4 min',
    author: 'Elie Bwira',
    isFeatured: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx-6_KI8J375do1IkmwjYYG8HrdaQxSktZgM5tSSE4n59zaJy7AlFrSAL2iqYvnK992zQiG7lbgUz-V-dh8ep3z2tiLb3ymKePOrR-DDJaDIQVpH3SugbhGFXpbsp0MSJkKd9MmX7cOqhSP7iz_-huvJ79_m4PVaD7QAcpHfFTCtlmqUeb4HvsUGitdxtu2EZZ2FyyaAJ7z2Dh_XpJ9ATixrBwLLISa_VwqR17XTh_7AnUppmwuKInfQ',
    excerptEn: 'At partner schools around Goma, the Miti Alliance programme turns a corner of the schoolyard into a working tree nursery — and turns pupils into the people who tend it.',
    excerptFr: 'Dans les écoles de Goma, le programme Miti Alliance transforme les cours de récréation en pépinières actives soignées par les élèves eux-mêmes.',
    contentEn: `The model is deliberately simple: pupils raise seedlings from seed, track their growth as part of a basic ecology curriculum, and eventually transplant them to degraded plots nominated by the community itself. Teachers report that the most enthusiastic participants are rarely the strongest students academically — tending a living seedling rewards a different kind of attention.\n\nFor ACV, the programme does double duty: it is an environmental-restoration activity and a youth-leadership one at the same time, which is exactly the kind of overlap our five-pillar model is designed to produce.`,
    contentFr: `Le modèle est d'une grande simplicité : les écoliers font germer les graines, surveillent leur croissance dans le cadre des cours d'éveil scientifique, puis repiquent les jeunes plants sur des parcelles érodées désignées par le quartier. Pour ACV, ce projet incarne la synergie entre éducation civique et régénération écologique.`
  },
  {
    id: 'post-2',
    slug: 'from-demonstration-plot-to-farmer-led-network',
    titleEn: 'From one demonstration plot to a farmer-led network',
    titleFr: 'D\'une parcelle témoin à un vaste réseau paysan solidaire',
    category: 'Agriculture',
    pillarSlug: 'agriculture-food-security',
    publishedDate: 'January 2026',
    readTime: '5 min',
    author: 'Justin Batumike',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2PDYs81R0EmmSOX0HPgAfxZSx031Zp9MkCqA3yPmU2GkqXQjcUfr-uZ1Zzjf6Uf4Hd5guBEDIATKAmUzDGY4CWaGE-T4AK3574r2KFRuAP4Nz3wgnWyuxS9nlxLG-nHwUteoSoMjzxj9WVFM-GIXJHJlshgtA6ZsxE7Chr2mfAUH2kOKO043uYj1xnNHhc6OxrXssfBf4_adwyzaDQvGNTfbB0-4VXRssKVlI3voTePLn9TKkd-fZOw',
    excerptEn: 'How a single agro-ecology pilot grew into a peer-to-peer training network across three communities.',
    excerptFr: 'Comment un simple champ expérimental s\'est mué en un réseau formateur couvrant trois territoires.',
    contentEn: `When farmers learn from agricultural engineers flown in from the capital, techniques often disappear as soon as the project car leaves. But when a fellow farmer down the path demonstrates that composted volcanic soil retains moisture during dry spells, adoption is instantaneous and enduring.`,
    contentFr: `Quand la transmission s'effectue entre voisins de parcelle, les pratiques agro-écologiques s'enracinent durablement dans les habitudes culturales sans dépendance extérieure.`
  },
  {
    id: 'post-3',
    slug: 'community-health-volunteers-close-the-last-mile',
    titleEn: 'Community health volunteers close the last mile',
    titleFr: 'Les volontaires de santé communautaire au plus près des foyers',
    category: 'Health',
    pillarSlug: 'health-wellbeing',
    publishedDate: 'January 2026',
    readTime: '3 min',
    author: 'Vincent Manimani',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKXguE340hEN0kONQ0r5piHcqHbICUpbRLvBUtGQ4tiP7rNIcU2FRUsoumXeGxAANb6XslIggjiIz93a_OcUlpX-lbsnIWO2prQx0Cgg0tVcvyF4Yq2YzuIXX6Gjxqk7creUaDw6SfnFXzhfLZ8tRNLsSD5JEkmARIrSVFK5JRcL1_1n_xz0eqhn4Cc0kaJeqfMA3Ix26UwTaoEK-5U8F6sbOMQWq4-uDkcx_MsIqF8N-DAKrdvKL7Eg',
    excerptEn: 'Trained volunteers are bringing basic maternal and child health information directly to households between clinic visits.',
    excerptFr: 'Des jeunes relais apportent des conseils vitaux en hygiène et nutrition directement au domicile des familles.',
    contentEn: `By walking neighborhood pathways weekly, our volunteer relays spot early symptoms of cholera or dehydration long before a family faces an emergency clinic trip. They bridge the gap between fragile public infrastructure and daily household reality.`,
    contentFr: `En arpentant les ruelles chaque semaine, nos volontaires identifient les signes précoces de maladies et orientent efficacement les mères vers les centres de santé.`
  },
  {
    id: 'post-4',
    slug: 'inside-a-savings-cooperative-meeting-in-himbi',
    titleEn: 'Inside a savings cooperative meeting in Himbi',
    titleFr: 'Immersion au cœur d\'une séance d\'épargne villageoise à Himbi',
    category: 'Livelihoods',
    pillarSlug: 'socio-economic-empowerment',
    publishedDate: 'December 2025',
    readTime: '4 min',
    author: 'Grace David',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDt1dOV90gD9U3l-NF_6cDRcHYYm5H3y3saQKUg7x70tGTx7D3GEjAGjESGX0sNAXIYrIxtcEalLUObEa1xv3euzBp6uP39N0Q6zgDHaupokpHLbUcPDlkvH28vnU1skRMVZBoPxklKBi8BEZFpbGWolkdlzf9VYC90i-K9qocserUCrq6Ni2hMVC7Z4I9qXY3MGYyESXr9Psn_FKYENGHNQh5iVS2s64D5lI-Ir6YTTrxGVSHn9nezKw',
    excerptEn: 'A look at how a rotating savings fund decides, week to week, which household enterprise gets the next round of capital.',
    excerptFr: 'Découvrez comment une caisse de solidarité locale arbitre et finance les projets entrepreneuriaux de ses membres.',
    contentEn: `Three padlocks seal the heavy metal box. Three different women hold the keys. When the box opens on Tuesday afternoon, it holds more than Congolese francs — it holds communal trust, mutual insurance, and the power to refuse exploitative loan sharks.`,
    contentFr: `Trois cadenas protègent la cassette métallique, confiés à trois membres différentes. C'est l'essence même de l'autonomie financière et de la solidarité collective.`
  },
  {
    id: 'post-5',
    slug: 'mapping-the-forest-edge-community-patrols',
    titleEn: 'Mapping the forest edge: a season with our community patrols',
    titleFr: 'Cartographier la lisière : une saison avec nos patrouilles citoyennes',
    category: 'Nature',
    pillarSlug: 'nature-biodiversity',
    publishedDate: 'November 2025',
    readTime: '5 min',
    author: 'Boaz Lubundu',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiKoPAjxm94ObRfwYGLqYFHj7jhPK2qkmEQIALk2hylSykPpW7owPs_sqwQEsNJxf6Odzoi8WMOJWIQh70WO1sCxbIiwwrbm_5ZHvLpk49YgIRLV0OU5yxBrH0pk7Ec_dH44Jyq1CG-tP8PPWNd6AGpowODMB_KEdj_84DLao89eTdFjlD92r3oojMgej9BAE85ihmi86mwWvLtX1Eygpx3lHVJiKcAeC2a7w1J85SEm40f-TJpU1nZw',
    excerptEn: 'Community monitors are tracking encroachment along the Virunga boundary with little more than a notebook, a phone, and local knowledge.',
    excerptFr: 'Des jeunes surveillent les limites du parc national avec pour seules armes un smartphone, un carnet et leur savoir du terroir.',
    contentEn: `Instead of punitive fences, our monitors foster open conversations with charcoal burners, proposing alternative livelihood tracks and mapping zones where native trees can be safely replanted without sparking local tenure conflict.`,
    contentFr: `Plutôt que des barrières répressives, la surveillance citoyenne privilégie le dialogue et propose des filières alternatives comme les briquettes écologiques.`
  },
  {
    id: 'post-6',
    slug: 'what-a-youth-leadership-graduation-actually-looks-like',
    titleEn: 'What a Youth Leadership Academy graduation actually looks like',
    titleFr: 'À quoi ressemble véritablement une remise de diplôme à l\'Académie',
    category: 'Education',
    pillarSlug: 'education-youth',
    publishedDate: 'October 2025',
    readTime: '3 min',
    author: 'Rodrigue Shukuru',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfRen6uBR_R_IHB8IT4k0hd4E0ZVjp0tj0jTgEFAJDQgAS9kxlqjh4VPmIPikyqO4SIEfJdY96HZIcl1ou3G_XqdfCkKOKF04OLc15pkOHvc7I0tby4NW-_Xke1AHvlpCBE9X4Rtdk08PRPkp5BzrWt5UttHqx8bFE4VTVj2ZDdTX-9RueW1wyVMTm6mMTXATOz_DGeBczB02G_vU-BMROYzDMQsxlDy5Ek_MhD0zVlJdthOnftisreQ',
    excerptEn: 'Not a ceremony so much as a hand-off: each graduate leaves with a project already underway, not just a certificate.',
    excerptFr: 'Pas de discours creux : chaque diplômé repart avec un plan d\'action financé et déjà amorcé sur le terrain.',
    contentEn: `Graduates do not simply receive paper credentials. In front of village elders and peers, each presents a 90-day action blueprint — whether setting up a clean water committee or organizing 30 youth into a seed cooperative.`,
    contentFr: `Devant les aînés et les familles, les jeunes s'engagent sur des réalisations concrètes : lancement d'un point d'eau, création d'une pépinière ou encadrement de cadets.`
  }
];

export const initialFieldNotes: FieldNote[] = [
  {
    id: 'fn-1',
    titleEn: 'Youth Leadership Academy',
    titleFr: 'Académie de Leadership Jeunesse',
    location: 'Himbi, Goma',
    date: 'February 2026',
    captionEn: 'A weekend cohort of young facilitators in training, co-designing neighborhood peace circles.',
    captionFr: 'Une cohorte de jeunes facilitateurs en formation, concevant des cercles de paix de quartier.',
    pillar: 'Education',
    icon: 'school',
    color: '#D97706'
  },
  {
    id: 'fn-2',
    titleEn: 'Miti Alliance School Programme',
    titleFr: 'Programme Scolaire Miti Alliance',
    location: 'Katindo, Goma',
    date: 'February 2026',
    captionEn: 'Pupils planting tree seedlings on their own school grounds to create green shade and windbreaks.',
    captionFr: 'Des écoliers repiquant de jeunes arbres dans leur cour pour créer ombre et brise-vent naturels.',
    pillar: 'Nature',
    icon: 'forest',
    color: '#0E7490'
  },
  {
    id: 'fn-3',
    titleEn: 'Regenerative Agriculture Plot',
    titleFr: 'Parcelle Agro-Écologique Témoin',
    location: 'Kavumu, South Kivu',
    date: 'January 2026',
    captionEn: 'Mid-season demonstration plot shared between three farmer households practicing zero synthetic fertilizer.',
    captionFr: 'Parcelle de démonstration partagée entre trois familles pratiquant une fertilisation 100% organique.',
    pillar: 'Agriculture',
    icon: 'potted_plant',
    color: '#0E7490'
  },
  {
    id: 'fn-4',
    titleEn: 'Community Health Household Visits',
    titleFr: 'Visites de Santé à Domicile',
    location: 'Beni, Mulekera',
    date: 'January 2026',
    captionEn: 'Community health volunteers preparing weekly household visit routes and oral rehydration supplies.',
    captionFr: 'Volontaires de santé préparant leurs tournées hebdomadaires et leurs stocks de réhydratation.',
    pillar: 'Health',
    icon: 'medical_services',
    color: '#991B1B'
  },
  {
    id: 'fn-5',
    titleEn: 'Savings & Livelihoods Cooperative',
    titleFr: 'Coopérative d\'Épargne & Métiers',
    location: 'Himbi, Goma',
    date: 'December 2025',
    captionEn: 'A savings & livelihoods cooperative weekly assembly reviewing loan requests for tailoring machines.',
    captionFr: 'Assemblée hebdomadaire d\'une AVEC validant l\'octroi d\'un micro-prêt pour machine à coudre.',
    pillar: 'Livelihoods',
    icon: 'handshake',
    color: '#2563EB'
  },
  {
    id: 'fn-6',
    titleEn: 'Forest-Edge Citizen Patrol',
    titleFr: 'Patrouille Citoyenne Lisière Virunga',
    location: 'Rutshuru Territory',
    date: 'November 2025',
    captionEn: 'A community patrol mapping forest-edge encroachment and native acacia growth near Virunga National Park.',
    captionFr: 'Jeunes patrouilleurs cartographiant les repousses d\'acacias indigènes en lisière des Virunga.',
    pillar: 'Nature',
    icon: 'park',
    color: '#16A34A'
  },
  {
    id: 'fn-7',
    titleEn: 'Youth Civic-Leadership Circle',
    titleFr: 'Cercle de Dialogue Citoyen',
    location: 'Goma Centre',
    date: 'October 2025',
    captionEn: 'A youth civic-leadership circle mapping local decision-makers and entry points for community action.',
    captionFr: 'Cartographie citoyenne des acteurs d\'influence locaux pour débloquer des initiatives communautaires.',
    pillar: 'Education',
    icon: 'groups',
    color: '#F59E0B'
  },
  {
    id: 'fn-8',
    titleEn: 'Water Quality Testing',
    titleFr: 'Contrôle Sanitaire de l\'Eau',
    location: 'Beni Rural',
    date: 'October 2025',
    captionEn: 'Testing water quality at a rural spring collection point ahead of the seasonal rainy period.',
    captionFr: 'Test bactériologique rapide de la source avant l\'arrivée de la saison des grandes pluies.',
    pillar: 'Health',
    icon: 'water_drop',
    color: '#0891B2'
  },
  {
    id: 'fn-9',
    titleEn: 'Safeguarding Refresher Session',
    titleFr: 'Session de Rappel en Sauvegarde',
    location: 'Goma Headquarters',
    date: 'September 2025',
    captionEn: 'A safeguarding refresher session for field staff, youth facilitators and community volunteers.',
    captionFr: 'Atelier de rappel des protocoles de protection et de respect de l\'intégrité des bénéficiaires.',
    pillar: 'Governance',
    icon: 'verified_user',
    color: '#EA580C'
  }
];
