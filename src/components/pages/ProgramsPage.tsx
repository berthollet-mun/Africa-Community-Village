import React from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import { BannerCarousel } from '../common/BannerCarousel';
import {
  GraduationCap,
  Leaf,
  Sprout,
  HeartPulse,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Target,
  Sparkles,
  Heart,
  ChevronRight,
  Layers
} from 'lucide-react';
import { ProgramPillar } from '../../types';
import { SkeletonCard } from '../common/Skeleton';

export const ProgramsPage: React.FC = () => {
  const { language, currentRoute, navigateTo, programs, isLoading } = useApp();
  const t = useTranslation(language);
  const isFr = language === 'fr';

  // Determine if viewing a specific program or the hub
  const selectedProgramId = currentRoute.startsWith('/programs/')
    ? currentRoute.replace('/programs/', '')
    : null;

  const currentProgram = programs.find(
    (p) => p.slug === selectedProgramId || p.id === selectedProgramId || p.id === `pillar-${selectedProgramId}`
  );

  const getPillarIcon = (slugOrId: string) => {
    if (slugOrId.includes('education')) return <GraduationCap className="w-8 h-8 text-[#EFA62B]" />;
    if (slugOrId.includes('nature') || slugOrId.includes('biodiversity')) return <Leaf className="w-8 h-8 text-[#0E7490]" />;
    if (slugOrId.includes('agri') || slugOrId.includes('food')) return <Sprout className="w-8 h-8 text-[#0E7490]" />;
    if (slugOrId.includes('health') || slugOrId.includes('wellbeing')) return <HeartPulse className="w-8 h-8 text-[#690C07]" />;
    if (slugOrId.includes('empower') || slugOrId.includes('socio') || slugOrId.includes('livelihood')) return <Briefcase className="w-8 h-8 text-[#EFA62B]" />;
    return <Layers className="w-8 h-8 text-[#690C07]" />;
  };

  const getPillarColor = (slugOrId: string) => {
    if (slugOrId.includes('education')) {
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-800',
        accent: 'text-amber-700',
        button: 'bg-amber-600 hover:bg-amber-700'
      };
    }
    if (slugOrId.includes('nature') || slugOrId.includes('biodiversity')) {
      return {
        bg: 'bg-[#FAF6EF]',
        border: 'border-[#E2D7C3]',
        badge: 'bg-[#E0F2FE] text-[#0E7490]',
        accent: 'text-[#0E7490]',
        button: 'bg-[#0E7490] hover:bg-[#095368]'
      };
    }
    if (slugOrId.includes('agri') || slugOrId.includes('food')) {
      return {
        bg: 'bg-lime-50',
        border: 'border-lime-200',
        badge: 'bg-lime-100 text-lime-800',
        accent: 'text-lime-700',
        button: 'bg-lime-600 hover:bg-lime-700'
      };
    }
    if (slugOrId.includes('health') || slugOrId.includes('wellbeing')) {
      return {
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        badge: 'bg-rose-100 text-rose-800',
        accent: 'text-rose-700',
        button: 'bg-rose-600 hover:bg-rose-700'
      };
    }
    return {
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      badge: 'bg-cyan-100 text-cyan-800',
      accent: 'text-cyan-700',
      button: 'bg-cyan-600 hover:bg-cyan-700'
    };
  };

  const getPillarImage = (p: ProgramPillar): string => {
    if (p.image) return p.image;
    const slug = p.slug || p.id;
    if (slug.includes('education')) return '/public/assets/aistudio/8_5185b9b0.PNG';
    if (slug.includes('nature')) return '/public/assets/aistudio/7_ee54323c.PNG';
    if (slug.includes('agri')) return '/public/assets/aistudio/4_289670c0.PNG';
    if (slug.includes('health')) return '/public/assets/aistudio/15_f71655f6.jpeg';
    return '/public/assets/aistudio/10_702700e4.PNG';
  };

  const getPillarRoute = (p: ProgramPillar): string => {
    if (p.route) return p.route;
    if (p.slug) return `/programs/${p.slug}`;
    return `/programs/${p.id}`;
  };

  // If a single program pillar is selected, render detailed program page
  if (currentProgram) {
    const slugOrId = currentProgram.slug || currentProgram.id;
    const colors = getPillarColor(slugOrId);
    const heroImage = getPillarImage(currentProgram);

    const objectives = isFr
      ? currentProgram.objectivesFr ||
        currentProgram.activities?.map((a) => a.titleFr + ' : ' + a.descFr) || [
          'Formation pratique et renforcement de l’autonomie locale',
          'Mobilisation communautaire et participation citoyenne active',
          'Suivi régulier et pérennisation des acquis de terrain'
        ]
      : currentProgram.objectivesEn ||
        currentProgram.activities?.map((a) => a.titleEn + ': ' + a.descEn) || [
          'Direct practical incubation and local capacity strengthening',
          'Active grassroots participation and youth-led stewardship',
          'Quarterly monitoring and measurable community outcomes'
        ];

    const galleryImages = currentProgram.gallery || [
      '/public/assets/aistudio/8_5185b9b0.PNG',
      '/public/assets/aistudio/7_ee54323c.PNG',
      '/public/assets/aistudio/4_289670c0.PNG',
      '/public/assets/aistudio/15_f71655f6.jpeg',
      '/public/assets/aistudio/10_702700e4.PNG',
      '/public/assets/aistudio/5_f8a812a7.PNG'
    ];

    return (
      <div className="bg-[#fbf8fc] min-h-screen">
        {/* Banner Carousel for this specific program route */}
        <BannerCarousel pageRoute={currentRoute} />

        {/* Breadcrumb Navigation */}
        <div className="border-b border-stone-200/80 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <nav className="flex items-center text-xs font-label text-stone-500 uppercase tracking-wider space-x-2">
              <button
                onClick={() => navigateTo('/')}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                {t.nav.home}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <button
                onClick={() => navigateTo('/programs')}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                {t.nav.programs}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-primary font-semibold truncate">
                {isFr ? currentProgram.titleFr : currentProgram.titleEn}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section of Program */}
        <section className="py-12 md:py-16 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-label uppercase tracking-widest font-semibold bg-stone-100 text-stone-700">
                  {getPillarIcon(slugOrId)}
                  <span>Pillar {currentProgram.order ? `#${currentProgram.order}` : ''}</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-display font-extrabold text-stone-900 leading-tight">
                  {isFr ? currentProgram.titleFr : currentProgram.titleEn}
                </h1>

                <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
                  {isFr
                    ? currentProgram.summaryFr || currentProgram.shortDescFr
                    : currentProgram.summaryEn || currentProgram.shortDescEn}
                </p>

                {/* Quick stats ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                  {currentProgram.metrics.map((m, i) => (
                    <div key={i} className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                      <div className="text-2xl font-extrabold font-label text-primary">
                        {m.value}
                      </div>
                      <div className="text-xs text-stone-600 font-medium mt-0.5">
                        {isFr ? m.labelFr : m.labelEn}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => navigateTo('/donate')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-acv-amber hover:bg-amber-600 text-stone-900 font-bold rounded-lg shadow-sm transition-all text-sm uppercase tracking-wider cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-stone-900" />
                    <span>{isFr ? 'Soutenir ce programme' : 'Support this program'}</span>
                  </button>
                  <button
                    onClick={() => navigateTo('/contact')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg transition-colors text-sm cursor-pointer"
                  >
                    <span>{isFr ? 'Partenariat & Contact' : 'Partner with us'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Program Featured Media */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-900 aspect-4/3 group">
                  <img
                    src={heroImage}
                    alt={currentProgram.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs font-label uppercase tracking-widest text-amber-400">
                      Eastern DR Congo • Goma & Virunga
                    </span>
                    <p className="text-sm font-medium mt-1 text-stone-200">
                      {isFr
                        ? 'Activités de terrain et engagement communautaire direct'
                        : 'Field-level operations and community-driven implementation'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Program Content & Objectives */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Content Body */}
              <div className="lg:col-span-8 space-y-12">
                {/* Description */}
                <div className="bg-white p-8 md:p-10 rounded-2xl border border-stone-200/80 shadow-xs space-y-6">
                  <h2 className="text-2xl font-bold font-display text-stone-900 flex items-center gap-3">
                    <Target className="w-6 h-6 text-primary" />
                    <span>{isFr ? 'Contexte & Raison d’Être' : 'Context & Purpose'}</span>
                  </h2>
                  <div className="prose max-w-none text-stone-700 text-base leading-relaxed space-y-4">
                    <p>
                      {isFr
                        ? currentProgram.descriptionFr || currentProgram.fullDescFr
                        : currentProgram.descriptionEn || currentProgram.fullDescEn}
                    </p>
                    <p className="text-stone-600 bg-stone-50 p-4 rounded-xl border-l-4 border-primary italic">
                      « {isFr
                        ? 'Tout ce que nous entreprenons à Goma et dans le Nord-Kivu est pensé avec la communauté pour briser les cycles de vulnérabilité et bâtir une souveraineté locale durable.'
                        : 'Everything we undertake in Goma and North Kivu is conceived alongside the community to disrupt cycles of dependency and build durable local sovereignty.'} »
                    </p>
                  </div>
                </div>

                {/* Key Objectives */}
                <div className="bg-white p-8 md:p-10 rounded-2xl border border-stone-200/80 shadow-xs space-y-6">
                  <h2 className="text-2xl font-bold font-display text-stone-900 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#0E7490]" />
                    <span>{isFr ? 'Objectifs & Actions Clés' : 'Key Objectives & Interventions'}</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {objectives.map((obj: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl bg-stone-50/80 border border-stone-200/60"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#E0F2FE] text-[#0E7490] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-label">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-stone-800 leading-snug">{obj}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Field Gallery */}
                <div className="bg-white p-8 md:p-10 rounded-2xl border border-stone-200/80 shadow-xs space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold font-display text-stone-900">
                      {isFr ? 'Sur le Terrain' : 'Moments from the Ground'}
                    </h2>
                    <span className="text-xs font-label uppercase text-stone-500 tracking-wider">
                      Photo Documentation
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {galleryImages.map((imgUrl: string, i: number) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden aspect-4/3 bg-stone-100 border border-stone-200/60 group relative"
                      >
                        <img
                          src={imgUrl}
                          alt={`${currentProgram.titleEn} gallery ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs text-white font-label bg-black/60 px-2 py-1 rounded">
                            ACV Field Photo #{i + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                {/* Switch to Other Pillars */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs">
                  <h3 className="text-sm font-label uppercase tracking-widest text-stone-500 font-bold mb-4">
                    {isFr ? 'Autres Piliers ACV' : 'Explore All 5 Pillars'}
                  </h3>
                  <div className="space-y-2">
                    {programs.map((prog) => {
                      const isActive =
                        prog.id === currentProgram.id ||
                        (prog.slug && prog.slug === currentProgram.slug);
                      const targetRoute = getPillarRoute(prog);
                      return (
                        <button
                          key={prog.id}
                          onClick={() => navigateTo(targetRoute)}
                          className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between text-sm cursor-pointer ${
                            isActive
                              ? 'bg-primary text-white font-bold shadow-xs'
                              : 'bg-stone-50 hover:bg-stone-100 text-stone-800'
                          }`}
                        >
                          <span className="truncate mr-2">
                            {isFr ? prog.titleFr : prog.titleEn}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 shrink-0 ${
                              isActive ? 'text-white' : 'text-stone-400'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Call to Action Box */}
                <div className="bg-linear-to-br from-[#690C07] to-[#232826] p-8 rounded-2xl text-white space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFA62B]/15 rounded-full blur-2xl" />
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-label uppercase tracking-widest bg-[#EFA62B] text-[#232826] font-bold">
                    {isFr ? 'Action Concrète' : 'Direct Impact'}
                  </span>
                  <h3 className="text-xl font-bold font-display">
                    {isFr
                      ? 'Rejoignez la mobilisation pour ce pilier'
                      : 'Back this mission directly'}
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    {isFr
                      ? 'Chaque donateur et partenaire renforce la capacité des jeunes de Goma à créer des solutions durables.'
                      : 'Every donor and partner amplifies the reach of Congolese youth turning solidarity into transformative change.'}
                  </p>
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={() => navigateTo('/donate')}
                      className="w-full py-3 bg-[#EFA62B] hover:bg-[#D98E16] text-[#232826] font-bold rounded-lg text-sm uppercase tracking-wider transition-all text-center cursor-pointer shadow-md"
                    >
                      {t.nav.donate}
                    </button>
                    <button
                      onClick={() => navigateTo('/contact')}
                      className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg text-sm transition-colors text-center cursor-pointer"
                    >
                      {isFr ? 'Proposer un partenariat' : 'Become an Institutional Partner'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Otherwise, render the main Programs Hub (/programs)
  return (
    <div className="bg-[#F3EDE1] min-h-screen">
      {/* Dynamic Banner Carousel for /programs */}
      <BannerCarousel pageRoute="/programs" />

      {/* Hub Hero */}
      <section className="py-16 md:py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-label uppercase tracking-widest font-bold bg-[#FAF6EF] text-[#690C07] border border-[#E2D7C3] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#EFA62B]" />
            <span>{isFr ? 'Nos 5 Piliers Stratégiques' : 'Our 5 Core Pillars'}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-stone-900 tracking-tight leading-tight">
            {isFr
              ? 'Des programmes holistiques pour la résilience de l’Est de la RDC'
              : 'Holistic Programs for Lasting Community Regeneration in Eastern DRC'}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed">
            {isFr
              ? 'Africa Community Village structure son action autour de cinq axes interdépendants. Dirigés par des jeunes locaux, nos programmes allient savoirs traditionnels et approches novatrices pour un impact pérenne.'
              : 'Africa Community Village operates across five interconnected pillars. Youth-designed and community-rooted, these initiatives combine ancestral wisdom with modern climate and socio-economic solutions.'}
          </p>
        </div>
      </section>

      {/* 5 Pillars Detailed Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && programs.length === 0 ? (
            <div className="space-y-12">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl border border-stone-200/90 p-8 flex flex-col md:flex-row gap-8 items-center animate-pulse">
                  <div className="w-full md:w-5/12 h-64 bg-stone-200 rounded-2xl" />
                  <div className="w-full md:w-7/12 space-y-4">
                    <div className="h-6 w-32 bg-stone-200 rounded-md" />
                    <div className="h-10 w-3/4 bg-stone-200 rounded-md" />
                    <div className="h-4 w-full bg-stone-200 rounded-md" />
                    <div className="h-4 w-5/6 bg-stone-200 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {programs.map((pillar, index) => {
              const isEven = index % 2 === 0;
              const slugOrId = pillar.slug || pillar.id;
              const colors = getPillarColor(slugOrId);
              const cardImage = getPillarImage(pillar);
              const cardRoute = getPillarRoute(pillar);

              return (
                <div
                  key={pillar.id}
                  className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch`}>
                    {/* Media Column */}
                    <div
                      className={`lg:col-span-5 relative min-h-[300px] lg:min-h-[420px] ${
                        isEven ? 'order-1' : 'order-1 lg:order-2'
                      }`}
                    >
                      <img
                        src={cardImage}
                        alt={pillar.titleEn}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                        <span className="text-xs font-label uppercase tracking-widest text-amber-300 font-bold">
                          {isFr
                            ? `Pilier 0${pillar.order || index + 1}`
                            : `Pillar 0${pillar.order || index + 1}`}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold font-display mt-1">
                          {isFr ? pillar.titleFr : pillar.titleEn}
                        </h3>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div
                      className={`lg:col-span-7 p-8 md:p-12 flex flex-col justify-between ${
                        isEven ? 'order-2' : 'order-2 lg:order-1'
                      }`}
                    >
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200">
                            {getPillarIcon(slugOrId)}
                          </div>
                          <span
                            className={`text-xs font-label uppercase font-bold px-3 py-1 rounded-full ${colors.badge}`}
                          >
                            {isFr ? 'Axe Stratégique' : 'Core Focus Area'}
                          </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-display font-bold text-stone-900">
                          {isFr ? pillar.titleFr : pillar.titleEn}
                        </h2>

                        <p className="text-stone-600 leading-relaxed text-base">
                          {isFr
                            ? pillar.descriptionFr || pillar.fullDescFr || pillar.shortDescFr
                            : pillar.descriptionEn || pillar.fullDescEn || pillar.shortDescEn}
                        </p>

                        {/* Metrics chips */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                          {pillar.metrics.map((m, mi) => (
                            <div
                              key={mi}
                              className="p-3 bg-stone-50 rounded-xl border border-stone-200/60"
                            >
                              <div className="text-xl md:text-2xl font-extrabold font-label text-primary">
                                {m.value}
                              </div>
                              <div className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                                {isFr ? m.labelFr : m.labelEn}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-stone-100 mt-6">
                        <button
                          onClick={() => navigateTo(cardRoute)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-label uppercase tracking-wider font-bold transition-colors cursor-pointer"
                        >
                          <span>{isFr ? 'Découvrir en détail' : 'View Full Pillar'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => navigateTo('/donate')}
                          className="inline-flex items-center gap-2 text-xs font-label uppercase tracking-wider font-bold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer"
                        >
                          <Heart className="w-4 h-4" />
                          <span>{isFr ? 'Soutenir ce projet' : 'Donate to this pillar'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </section>

      {/* Ubuntu Philosophy Banner */}
      <section className="py-16 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-amber-400 font-label text-xs uppercase tracking-widest font-bold">
            Ubuntu Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold">
            « Umuntu ngumuntu ngabantu »
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed max-w-3xl mx-auto">
            {isFr
              ? '« Je suis parce que nous sommes ». Tous nos programmes s’alimentent mutuellement : une jeunesse éduquée protège mieux la biodiversité, des sols régénérés garantissent une alimentation saine, et la santé communautaire libère le potentiel économique.'
              : '"I am because we are." Our 5 pillars mutually reinforce one another: educated youth champion biodiversity, regenerated soil nourishes families, and healthy villages unlock thriving micro-economies.'}
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigateTo('/approach')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#690C07] hover:bg-[#520905] text-white font-bold rounded-lg text-xs font-label uppercase tracking-widest transition-colors cursor-pointer shadow-md"
            >
              <span>{isFr ? 'Explorer Notre Approche' : 'Discover Our Methodology'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
