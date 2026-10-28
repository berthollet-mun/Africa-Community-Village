import React from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import { BannerCarousel } from '../common/BannerCarousel';
import {
  Users,
  Compass,
  Sparkles,
  ShieldCheck,
  Scale,
  RefreshCw,
  Heart,
  ArrowRight,
  Sprout,
  GraduationCap,
  Leaf,
  CheckCircle2,
  Globe2
} from 'lucide-react';

export const ApproachPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = useTranslation(language);
  const isFr = language === 'fr';

  const principles = [
    {
      icon: <Users className="w-6 h-6 text-[#EFA62B]" />,
      titleEn: 'Community-Driven & Participatory',
      titleFr: 'Pilotage Communautaire & Participatif',
      descEn:
        'We never impose external blueprints. Every project originates from direct village assemblies, listening circles, and intergenerational dialogues where women and youth shape the priorities.',
      descFr:
        'Nous n’imposons aucun modèle importé. Chaque projet naît d’assemblées villageoises directes, de cercles d’écoute et de dialogues intergénérationnels où femmes et jeunes définissent les priorités.'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-amber-600" />,
      titleEn: 'Climate-Resilient & Agroecological',
      titleFr: 'Résilience Climatique & Agroécologie',
      descEn:
        'Faced with shifting rainfall patterns around Lake Kivu and volcanic soil erosion, we implement nature-based agroforestry, permaculture, and indigenous seed conservation.',
      descFr:
        'Face aux perturbations climatiques autour du lac Kivu et à l’érosion des sols volcaniques, nous déployons l’agroforesterie régénérative, la permaculture et la préservation des semences indigènes.'
    },
    {
      icon: <Scale className="w-6 h-6 text-cyan-600" />,
      titleEn: 'Radical Inclusion & Gender Equity',
      titleFr: 'Inclusion Radicale & Égalité de Genre',
      descEn:
        'Young women and girls are at the helm of our agricultural cooperatives and youth leadership circles. Equal representation is non-negotiable in all village governance committees.',
      descFr:
        'Les jeunes femmes et filles dirigent nos coopératives agricoles et nos cercles de leadership. La parité stricte est une règle intangible dans tous nos comités villageois.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-600" />,
      titleEn: 'Youth-Led Sovereignty',
      titleFr: 'Souveraineté Portée par la Jeunesse',
      descEn:
        'In Eastern Congo, youth are the majority. We transition young people from passive recipients of emergency aid into civic architects, agri-entrepreneurs, and environmental stewards.',
      descFr:
        'À l’Est de la RDC, la jeunesse représente la majorité. Nous faisons passer les jeunes du statut de bénéficiaires passifs de l’aide d’urgence à celui d’architectes civiques et éco-entrepreneurs.'
    }
  ];

  const theoryOfChangeSteps = [
    {
      step: '01',
      titleEn: 'Listen & Diagnose',
      titleFr: 'Écoute & Diagnostic',
      descEn: 'Community mapping of natural assets, vulnerabilities, and youth aspirations.',
      descFr: 'Cartographie communautaire des atouts naturels, vulnérabilités et aspirations des jeunes.'
    },
    {
      step: '02',
      titleEn: 'Skill & Equip',
      titleFr: 'Former & Équiper',
      descEn: 'Practical training in agroecology, solar technology, cooperative management, and health.',
      descFr: 'Formations pratiques en agroécologie, technologies solaires, gestion coopérative et santé.'
    },
    {
      step: '03',
      titleEn: 'Regenerate Land & Water',
      titleFr: 'Régénérer Terre & Eau',
      descEn: 'Mass reforestation (Goma Restoration), organic compost hubs, and safe water catchment.',
      descFr: 'Reforestation massive (Goma Restoration), composteurs communautaires et captage d’eau saine.'
    },
    {
      step: '04',
      titleEn: 'Foster Local Economy',
      titleFr: 'Pérenniser l’Économie',
      descEn: 'Village savings groups (VSLAs), local crop processing, and fair-market youth micro-enterprises.',
      descFr: 'Associations villageoises d’épargne (AVEC), transformation locale et micro-entreprises équitables.'
    }
  ];

  return (
    <div className="bg-[#fbf8fc] min-h-screen">
      {/* Banner Carousel */}
      <BannerCarousel pageRoute="/approach" />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-label uppercase tracking-widest font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-6">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>{isFr ? 'Méthodologie & Philosophie' : 'Our Grounded Methodology'}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-stone-900 tracking-tight leading-tight">
            {isFr
              ? 'Une approche régénérative, guidée par les communautés de l’Est de la RDC'
              : 'A Community-Driven, Climate-Resilient Paradigm in Eastern DR Congo'}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
            {isFr
              ? 'Nous rejetons l’assistanat humanitaire à court terme. Chez Africa Community Village, nous croyons que les communautés congolaises possèdent déjà la sagesse, le courage et la terre pour s’épanouir durablement.'
              : 'Moving beyond short-term humanitarian relief, Africa Community Village activates endogenous strength. Communities in North Kivu hold the ancestral insight, resilience, and fertile land required to cultivate enduring peace and prosperity.'}
          </p>
        </div>
      </section>

      {/* 4 Core Principles Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-label uppercase tracking-widest text-acv-green font-bold">
              {isFr ? 'Piliers Méthodologiques' : 'Foundational Principles'}
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-stone-900 mt-2">
              {isFr
                ? 'Comment nous opérons chaque jour à Goma'
                : 'How We Create Enduring Impact on the Ground'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="bg-white p-8 md:p-10 rounded-2xl border border-stone-200/80 shadow-xs hover:border-acv-green/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="p-3.5 bg-stone-50 rounded-xl inline-block border border-stone-200/60 mb-6">
                    {p.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-display text-stone-900 mb-3">
                    {isFr ? p.titleFr : p.titleEn}
                  </h3>
                  <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                    {isFr ? p.descFr : p.descEn}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-2 text-xs font-label uppercase tracking-wider text-[#690C07] font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#0E7490]" />
                  <span>{isFr ? 'Vérifié par nos comités locaux' : 'Verified by village councils'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Initiative: Goma Restoration */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900 rounded-3xl p-8 md:p-14 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#EFA62B]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-label uppercase tracking-widest bg-amber-400 text-stone-950 font-bold">
                  {isFr ? 'Initiative Phare' : 'Flagship Initiative'}
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-extrabold leading-tight">
                  Goma Restoration Project
                </h2>
                <p className="text-stone-300 text-base md:text-lg leading-relaxed">
                  {isFr
                    ? 'Le projet « Goma Restoration » est notre réponse directe à la déforestation accélérée, à la crise des réfugiés climatiques et aux sols volcaniques dégradés dans la région de Goma et du parc des Virunga. Nous combinons pépinières communautaires, reboisement indigène et micro-ceintures maraîchères.'
                    : 'The Goma Restoration project represents our grassroots countermeasure against severe deforestation, climate displaced settlements, and volcanic soil erosion across Goma and the Virunga periphery. We merge native tree nurseries, youth agroforestry, and vegetable green belts.'}
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-800">
                  <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700">
                    <div className="text-2xl font-bold font-label text-amber-400">10,000+</div>
                    <div className="text-xs text-stone-400 mt-1">
                      {isFr ? 'Arbres plantés' : 'Trees Planted'}
                    </div>
                  </div>
                  <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700">
                    <div className="text-2xl font-bold font-label text-[#0E7490]">85%</div>
                    <div className="text-xs text-stone-400 mt-1">
                      {isFr ? 'Taux de survie' : 'Survival Rate'}
                    </div>
                  </div>
                  <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700">
                    <div className="text-2xl font-bold font-label text-cyan-400">25+</div>
                    <div className="text-xs text-stone-400 mt-1">
                      {isFr ? 'Pépinières actives' : 'Seedling Hubs'}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => navigateTo('/programs/nature-biodiversity')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#690C07] hover:bg-[#520905] text-white rounded-lg font-bold text-xs font-label uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                  >
                    <span>{isFr ? 'En savoir plus sur ce projet' : 'Explore Goma Restoration'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-stone-700 shadow-xl aspect-4/3">
                  <img
                    src="/assets/aistudio/7_ee54323c.PNG"
                    alt="Goma Restoration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theory of Change / Cycle vertueux */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-label uppercase tracking-widest text-amber-700 font-bold">
              {isFr ? 'Théorie du Changement' : 'Theory of Change'}
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-stone-900 mt-2">
              {isFr
                ? 'Un cycle vertueux pour une souveraineté durable'
                : 'From Vulnerability to Community Autonomy'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {theoryOfChangeSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-extrabold font-label text-[#690C07]/30 mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    {isFr ? step.titleFr : step.titleEn}
                  </h3>
                  <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                    {isFr ? step.descFr : step.descEn}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-stone-100 flex items-center text-xs font-label text-[#690C07] font-bold">
                  <span>Phase {idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ubuntu Section */}
      <section className="py-16 bg-stone-100 border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-label uppercase tracking-widest text-stone-500 font-bold">
            Ubuntu Ethics
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-stone-900">
            « I am because we are »
          </h2>
          <p className="text-stone-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {isFr
              ? 'L’éthique de l’Ubuntu n’est pas un simple slogan : c’est notre boussole de gestion, de gouvernance et de prise de décision. Chaque ressource allouée à ACV profite à l’ensemble du tissu social, renforçant les liens de solidarité qui résistent aux crises.'
              : 'The philosophy of Ubuntu is our operational compass. It guarantees that interventions do not create isolated winners, but rather elevate collective resilience, trust, and shared dignity across North Kivu.'}
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-bold text-xs font-label uppercase tracking-wider transition-colors"
            >
              {isFr ? 'Collaborer avec nous' : 'Collaborate With ACV'}
            </button>
            <button
              onClick={() => navigateTo('/donate')}
              className="px-6 py-3 bg-acv-amber hover:bg-amber-600 text-stone-900 rounded-lg font-bold text-xs font-label uppercase tracking-wider transition-colors"
            >
              {t.nav.donate}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
