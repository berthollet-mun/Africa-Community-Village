import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import { BannerCarousel } from '../common/BannerCarousel';
import { initialEightValues, initialGovernanceTiers } from '../../data/mockData';
import { PolicyDocument, TeamMember, FieldNote } from '../../types';
import {
  Users,
  Eye,
  Target,
  ShieldCheck,
  FileText,
  ArrowRight,
  Filter,
  CheckCircle,
  X,
  Sparkles,
  MapPin,
  Calendar
} from 'lucide-react';
import { SkeletonCard } from '../common/Skeleton';

export const AboutPage: React.FC = () => {
  const { currentRoute, navigateTo, language, teamMembers, policies, fieldNotes, isLoading } = useApp();
  const t = useTranslation(language);

  // Policy modal state
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyDocument | null>(null);

  // Field notes filter state
  const [fieldFilter, setFieldFilter] = useState<string>('all');

  // Determine active view based on subpath
  const isOurStory = currentRoute === '/about/our-story';
  const isOurTeam = currentRoute === '/about/our-team';
  const isGovernance = currentRoute === '/about/governance';
  const isFieldNotes = currentRoute === '/about/field-notes';

  // Filter field notes
  const filteredFieldNotes = fieldFilter === 'all'
    ? fieldNotes
    : fieldNotes.filter(n => n.pillar.toLowerCase() === fieldFilter.toLowerCase());

  return (
    <div className="w-full flex flex-col space-y-12 lg:space-y-16 pb-20">
      {/* 1. Dynamic Banner Carousel for this route - Full Width Edge-to-Edge */}
      <section className="w-full">
        <BannerCarousel pageRoute={currentRoute} fullBleed={true} />
      </section>

      {/* 2. Sub-navigation tabs for About section */}
      <section className="bg-white border-b border-[#E7E5E4] py-3 -mt-6 sm:-mt-8 relative z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-label">
          <button
            onClick={() => navigateTo('/about')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
              currentRoute === '/about' ? 'bg-[#690C07] text-white font-bold' : 'text-[#3F493F] hover:bg-[#E7E5E4]'
            }`}
          >
            {language === 'fr' ? 'Vue d\'ensemble' : 'Overview'}
          </button>
          <button
            onClick={() => navigateTo('/about/our-story')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
              isOurStory ? 'bg-[#690C07] text-white font-bold' : 'text-[#3F493F] hover:bg-[#E7E5E4]'
            }`}
          >
            {t.nav.ourStory}
          </button>
          <button
            onClick={() => navigateTo('/about/our-team')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
              isOurTeam ? 'bg-[#690C07] text-white font-bold' : 'text-[#3F493F] hover:bg-[#E7E5E4]'
            }`}
          >
            {t.nav.ourTeam}
          </button>
          <button
            onClick={() => navigateTo('/about/governance')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
              isGovernance ? 'bg-[#690C07] text-white font-bold' : 'text-[#3F493F] hover:bg-[#E7E5E4]'
            }`}
          >
            {t.nav.governance}
          </button>
          <button
            onClick={() => navigateTo('/about/field-notes')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
              isFieldNotes ? 'bg-[#690C07] text-white font-bold' : 'text-[#3F493F] hover:bg-[#E7E5E4]'
            }`}
          >
            {t.nav.fieldNotes}
          </button>
        </div>
      </section>

      {/* --- SUBVIEW 1: OUR TEAM --- */}
      {isOurTeam ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#D97706] rotate-45 inline-block"></span>
              <span className="font-label text-xs uppercase tracking-widest text-[#D97706] font-bold">
                {language === 'fr' ? 'NOTRE ÉQUIPE' : 'OUR TEAM'}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[#18181B] tracking-tight">
              {language === 'fr'
                ? 'De jeunes professionnels congolais qui agissent en première ligne'
                : 'Young Congolese professionals, leading from the front'}
            </h1>
            <p className="text-base sm:text-lg text-[#3F493F] leading-relaxed">
              {language === 'fr'
                ? 'Une équipe pluridisciplinaire et engagée pour la régénération communautaire, la protection environnementale et l\'émancipation de la jeunesse — au bureau, sur les collines et partout où le besoin se fait sentir.'
                : 'Passionate young Congolese professionals committed to community-led development, environmental protection and youth empowerment — in the office, in the field, and everywhere in between.'}
            </p>
          </div>

          {/* Leadership Section */}
          <div className="space-y-6">
            <h2 className="font-label text-xs uppercase tracking-widest text-[#B45309] font-bold">
              {language === 'fr' ? 'DIRECTION & STRATÉGIE' : 'LEADERSHIP'}
            </h2>
            {isLoading && teamMembers.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SkeletonCard variant="team" />
                <SkeletonCard variant="team" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teamMembers.filter(m => m.category === 'leadership' || m.category === 'Direction').map((member) => {
                  const displayName = member.name || `${member.firstName || ''} ${member.lastName || ''}`.trim() || 'Leader';
                  const photo = member.photoUrl || member.image;
                  return (
                    <div
                      key={member.id}
                      className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E7E5E4] shadow-xs hover:shadow-earth transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Portrait Card */}
                        <div className="h-56 w-full rounded-xl overflow-hidden bg-stone-100 mb-6 flex items-center justify-center relative">
                          {photo ? (
                            <img src={photo} alt={displayName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-20 h-20 rounded-2xl bg-[#D97706] text-white font-display font-extrabold text-2xl flex items-center justify-center shadow-lg">
                              {displayName.charAt(0)}
                            </div>
                          )}
                        </div>

                        <h3 className="font-display font-bold text-2xl text-[#18181B] mb-1">
                          {displayName}
                        </h3>
                        <p className="font-label text-xs text-[#B45309] uppercase tracking-wider font-bold mb-4">
                          {language === 'fr' ? member.roleFr : member.roleEn}
                        </p>
                        <p className="text-sm text-[#3F493F] leading-relaxed">
                          {language === 'fr' ? member.bioFr : member.bioEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Operations & Field Section */}
          <div className="space-y-6">
            <h2 className="font-label text-xs uppercase tracking-widest text-[#690C07] font-bold">
              {language === 'fr' ? 'ÉQUIPE OPÉRATIONS & DÉPLOIEMENT TERRAIN' : 'PROGRAM & OPERATIONS'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.filter(m => m.category !== 'leadership' && m.category !== 'Direction').map((member) => {
                const displayName = member.name || `${member.firstName || ''} ${member.lastName || ''}`.trim() || 'Staff';
                const photo = member.photoUrl || member.image;
                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl p-5 border border-[#E7E5E4] shadow-xs hover:shadow-earth transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 w-full rounded-lg overflow-hidden bg-stone-100 mb-4 flex items-center justify-center">
                        {photo ? (
                          <img src={photo} alt={displayName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-[#690C07] text-white font-display font-bold text-lg flex items-center justify-center shadow-md">
                            {displayName.charAt(0)}
                          </div>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-lg text-[#18181B] mb-1">
                        {displayName}
                      </h3>
                      <p className="font-label text-[11px] text-[#B45309] uppercase tracking-wider font-bold mb-3">
                        {language === 'fr' ? member.roleFr : member.roleEn}
                      </p>
                      <p className="text-xs text-[#3F493F] leading-relaxed line-clamp-4">
                        {language === 'fr' ? member.bioFr : member.bioEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to join */}
          <div className="bg-[#18181B] text-white rounded-2xl p-8 sm:p-12 text-center space-y-4">
            <span className="font-label text-xs text-[#D97706] uppercase tracking-widest font-bold">
              {language === 'fr' ? 'REJOINDRE LE MOUVEMENT' : 'JOIN US'}
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl">
              {language === 'fr'
                ? 'ACV grandit grâce à celles et ceux qui restent proches du terrain'
                : 'ACV grows through people who choose to stay close to the problem'}
            </h3>
            <p className="text-sm text-neutral-300 max-w-xl mx-auto">
              {language === 'fr'
                ? 'Nous accueillons régulièrement des volontaires, experts techniques et talents de la diaspora souhaitant appuyer nos piliers.'
                : 'We periodically open roles for field officers, technical specialists and volunteers, especially for Congolese professionals and diaspora talent.'}
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <button
                onClick={() => navigateTo('/contact')}
                className="bg-[#D97706] hover:bg-[#B45309] text-white font-bold px-6 py-2.5 rounded-lg text-sm font-label"
              >
                {t.common.getInTouch}
              </button>
              <button
                onClick={() => navigateTo('/about/governance')}
                className="bg-transparent border border-white hover:bg-white/10 text-white font-bold px-6 py-2.5 rounded-lg text-sm font-label"
              >
                {t.common.seeGovernance}
              </button>
            </div>
          </div>
        </section>
      ) : isGovernance ? (
        /* --- SUBVIEW 2: GOVERNANCE --- */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#0E7490] rotate-45 inline-block"></span>
              <span className="font-label text-xs uppercase tracking-widest text-[#0E7490] font-bold">
                {language === 'fr' ? 'GOUVERNANCE & REDEVABILITÉ' : 'GOVERNANCE & ACCOUNTABILITY'}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[#18181B] tracking-tight">
              {language === 'fr'
                ? 'Structuré pour mériter la confiance, au-delà des intentions'
                : 'Structured to earn trust, not just intentions'}
            </h1>
            <p className="text-base sm:text-lg text-[#3F493F] leading-relaxed">
              {language === 'fr'
                ? 'Agir dans des contextes fragiles et marqués par les tensions exige une exemplarité sans compromis. Voici comment ACV est gouverné et encadré.'
                : 'Working in fragile, conflict-affected contexts means accountability cannot be an afterthought. Here is how ACV is governed, safeguarded, and held to its own standards.'}
            </p>
          </div>

          {/* Four tiers, one chain of accountability */}
          <div className="space-y-6">
            <span className="font-label text-xs uppercase tracking-widest text-[#690C07] font-bold block">
              {language === 'fr' ? 'STRUCTURE ORGANISATIONNELLE' : 'STRUCTURE'}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#18181B]">
              {language === 'fr'
                ? 'Quatre niveaux, une chaîne unique de responsabilité'
                : 'Four tiers, one chain of accountability'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {initialGovernanceTiers.map((tier) => (
                <div
                  key={tier.id}
                  className="bg-white rounded-xl p-6 border border-[#E7E5E4] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="w-10 h-10 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center font-label font-bold text-sm text-[#18181B] mb-4">
                      {tier.step}
                    </span>
                    <h3 className="font-display font-bold text-lg text-[#18181B] mb-2">
                      {language === 'fr' ? tier.titleFr : tier.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#3F493F] leading-relaxed">
                      {language === 'fr' ? tier.descFr : tier.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Traceability Cards */}
          <div className="bg-[#FAFAF9] rounded-2xl p-8 border border-[#E7E5E4] space-y-6">
            <span className="font-label text-xs uppercase tracking-widest text-[#D97706] font-bold block">
              {language === 'fr' ? 'TRANSPARENCE FINANCIÈRE' : 'FINANCIAL ACCOUNTABILITY'}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#18181B]">
              {language === 'fr'
                ? 'Chaque franc est traçable jusqu\'à un résultat de terrain'
                : 'Every franc is traceable to a program outcome'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-[#E7E5E4]">
                <span className="font-label text-xs text-[#D97706] font-bold block mb-2">01 / SEPARATION</span>
                <h3 className="font-display font-bold text-base text-[#18181B] mb-2">
                  {language === 'fr' ? 'Ségrégation des fonctions' : 'Segregated duties'}
                </h3>
                <p className="text-xs text-[#3F493F] leading-relaxed">
                  {language === 'fr'
                    ? 'Aucun collaborateur ne peut à la fois valider un engagement et ordonner son déblocage bancaire.'
                    : 'No single staff member both approves and disburses program funds.'}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[#E7E5E4]">
                <span className="font-label text-xs text-[#690C07] font-bold block mb-2">02 / AUDIT</span>
                <h3 className="font-display font-bold text-base text-[#18181B] mb-2">
                  {language === 'fr' ? 'Audit semestriel indépendant' : 'Independent review'}
                </h3>
                <p className="text-xs text-[#3F493F] leading-relaxed">
                  {language === 'fr'
                    ? 'Le comité d\'audit communautaire réexamine les bilans deux fois par an avec nos partenaires.'
                    : 'The Board finance committee reviews accounts at least twice yearly.'}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[#E7E5E4]">
                <span className="font-label text-xs text-[#0E7490] font-bold block mb-2">03 / REPORTING</span>
                <h3 className="font-display font-bold text-base text-[#18181B] mb-2">
                  {language === 'fr' ? 'Rapports alignés aux bailleurs' : 'Donor-aligned reporting'}
                </h3>
                <p className="text-xs text-[#3F493F] leading-relaxed">
                  {language === 'fr'
                    ? 'Comptabilité conforme aux exigences des conventions de subventions et vérifiable sur place.'
                    : 'Financial and narrative reports follow each partner\'s own template and timeline.'}
                </p>
              </div>
            </div>
          </div>

          {/* Policy Library */}
          <div className="space-y-6">
            <span className="font-label text-xs uppercase tracking-widest text-[#0E7490] font-bold block">
              {language === 'fr' ? 'DOCUMENTS CADRES' : 'POLICY LIBRARY'}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#18181B]">
              {language === 'fr'
                ? 'Les textes qui engagent nos standards'
                : 'The documents that hold us to our own standards'}
            </h2>

            <div className="space-y-3">
              {policies.map((policy) => (
                <div
                  key={policy.id}
                  onClick={() => setSelectedPolicy(policy)}
                  className="bg-white rounded-xl p-5 border border-[#E7E5E4] hover:border-[#690C07] shadow-xs hover:shadow-earth transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#FAFAF9] flex items-center justify-center text-[#690C07]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-[#18181B] group-hover:text-[#690C07] transition-colors">
                        {language === 'fr' ? policy.titleFr : policy.titleEn}
                      </h3>
                      <p className="text-xs text-[#3F493F]">
                        {language === 'fr' ? policy.descFr : policy.descEn}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-label text-[#690C07] font-bold flex items-center gap-1 shrink-0 ml-4">
                    <span>{language === 'fr' ? 'Consulter' : 'View'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : isFieldNotes ? (
        /* --- SUBVIEW 3: FIELD NOTES --- */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#690C07] rotate-45 inline-block"></span>
              <span className="font-label text-xs uppercase tracking-widest text-[#690C07] font-bold">
                {language === 'fr' ? 'CHRONIQUES VISUELLES DU TERRAIN' : 'FIELD NOTES'}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[#18181B] tracking-tight">
              {language === 'fr'
                ? 'Récits visuels de Goma et des villages du Nord-Kivu'
                : 'Visual stories from Goma and the communities around Virunga'}
            </h1>
            <p className="text-base sm:text-lg text-[#3F493F] leading-relaxed">
              {language === 'fr'
                ? 'Une chronique vivante des moments qui façonnent nos cinq piliers : sessions d\'alphabétisation, repiquage de jeunes plants et cercles de solidarité.'
                : 'A running record of the moments behind our five program pillars — snapshots of daily grassroots determination.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-label">
            {['all', 'education', 'nature', 'agriculture', 'health', 'livelihoods'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFieldFilter(cat)}
                className={`px-3 py-1.5 rounded-full capitalize transition-colors ${
                  fieldFilter === cat
                    ? 'bg-[#690C07] text-white font-bold'
                    : 'bg-white border border-[#E7E5E4] text-[#3F493F] hover:bg-[#F5F5F4]'
                }`}
              >
                {cat === 'all' ? t.common.filterAll : cat}
              </button>
            ))}
          </div>

          {/* Field Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFieldNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E7E5E4] shadow-xs hover:shadow-earth transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-56 w-full bg-chevron-pattern flex flex-col items-center justify-center p-6 text-center relative">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg"
                      style={{ backgroundColor: note.color }}
                    >
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <span className="font-label text-xs uppercase tracking-wider font-bold text-neutral-300">
                      {note.pillar}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#6F7A6E] font-label">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                        {note.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {note.date}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#18181B]">
                      {language === 'fr' ? note.titleFr : note.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#3F493F] leading-relaxed">
                      {language === 'fr' ? note.captionFr : note.captionEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        /* --- DEFAULT: MAIN ABOUT OVERVIEW / OUR STORY --- */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#D97706] rotate-45 inline-block"></span>
              <span className="font-label text-xs uppercase tracking-widest text-[#B45309] font-bold">
                {t.about.heroKicker}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[#18181B] tracking-tight">
              {t.about.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-[#3F493F] leading-relaxed">
              {t.about.heroSubtitle}
            </p>
          </div>

          {/* Vision & Mission Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 border border-[#E7E5E4] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <span className="font-label text-xs uppercase tracking-widest text-[#D97706] font-bold block">
                {t.about.visionKicker}
              </span>
              <h3 className="font-display font-bold text-2xl text-[#18181B]">
                {t.about.visionTitle}
              </h3>
              <p className="text-sm sm:text-base text-[#3F493F] leading-relaxed">
                {t.about.visionText}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 border border-[#E7E5E4] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF6EF] border border-[#E2D7C3] text-[#690C07] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <span className="font-label text-xs uppercase tracking-widest text-[#690C07] font-bold block">
                {t.about.missionKicker}
              </span>
              <h3 className="font-display font-bold text-2xl text-[#18181B]">
                {language === 'fr'
                  ? 'Agir avec rigueur, solidarité et ancrage territorial'
                  : 'Action with integrity, solidarity and local agency'}
              </h3>
              <p className="text-sm sm:text-base text-[#3F493F] leading-relaxed">
                {t.about.missionText}
              </p>
            </div>
          </div>

          {/* Eight Values Section */}
          <div className="space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="font-label text-xs uppercase tracking-widest text-[#B45309] font-bold block">
                {t.about.valuesKicker}
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#18181B]">
                {t.about.valuesTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#3F493F]">
                {t.about.valuesSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {initialEightValues.map((val) => (
                <div
                  key={val.step}
                  className="bg-white rounded-xl p-6 border border-[#E7E5E4] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="font-label text-xs text-[#D97706] font-bold block mb-3">
                      {val.step}
                    </span>
                    <h3 className="font-display font-bold text-lg text-[#18181B] mb-2">
                      {language === 'fr' ? val.titleFr : val.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#3F493F] leading-relaxed">
                      {language === 'fr' ? val.descFr : val.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subpages navigation banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <button
              onClick={() => navigateTo('/about/our-team')}
              className="p-6 bg-white rounded-xl border border-[#E7E5E4] hover:border-[#690C07] shadow-xs text-left group transition-all"
            >
              <Users className="w-8 h-8 text-[#690C07] mb-3" />
              <h3 className="font-display font-bold text-lg text-[#18181B] group-hover:text-[#690C07] mb-1">
                {t.nav.ourTeam}
              </h3>
              <p className="text-xs text-[#3F493F] mb-3">
                {language === 'fr'
                  ? 'Rencontrez les leaders congolais qui pilotent les actions.'
                  : 'Meet the young Congolese professionals leading the work.'}
              </p>
              <span className="text-xs font-label text-[#690C07] font-bold flex items-center gap-1">
                <span>{language === 'fr' ? 'Voir l\'équipe' : 'View the team'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => navigateTo('/about/governance')}
              className="p-6 bg-white rounded-xl border border-[#E7E5E4] hover:border-[#0E7490] shadow-xs text-left group transition-all"
            >
              <ShieldCheck className="w-8 h-8 text-[#0E7490] mb-3" />
              <h3 className="font-display font-bold text-lg text-[#18181B] group-hover:text-[#0E7490] mb-1">
                {t.nav.governance}
              </h3>
              <p className="text-xs text-[#3F493F] mb-3">
                {language === 'fr'
                  ? 'Transparence, politique de sauvegarde et contrôle citoyen.'
                  : 'Four tiers of accountability and policy library.'}
              </p>
              <span className="text-xs font-label text-[#0E7490] font-bold flex items-center gap-1">
                <span>{language === 'fr' ? 'Voir la gouvernance' : 'See our governance'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => navigateTo('/about/field-notes')}
              className="p-6 bg-white rounded-xl border border-[#E7E5E4] hover:border-[#D97706] shadow-xs text-left group transition-all"
            >
              <Sparkles className="w-8 h-8 text-[#D97706] mb-3" />
              <h3 className="font-display font-bold text-lg text-[#18181B] group-hover:text-[#D97706] mb-1">
                {t.nav.fieldNotes}
              </h3>
              <p className="text-xs text-[#3F493F] mb-3">
                {language === 'fr'
                  ? 'Illustrations et instantanés de terrain à Goma et aux Virunga.'
                  : 'Visual sketches and running field records.'}
              </p>
              <span className="text-xs font-label text-[#D97706] font-bold flex items-center gap-1">
                <span>{language === 'fr' ? 'Consulter les notes' : 'Browse field notes'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </section>
      )}

      {/* Policy Reader Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPolicy(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-800"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#FAF6EF] border border-[#E2D7C3] text-[#690C07] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-label text-[#6F7A6E]">
                  {selectedPolicy.updatedDate}
                </span>
                <h3 className="font-display font-bold text-xl text-[#18181B]">
                  {language === 'fr' ? selectedPolicy.titleFr : selectedPolicy.titleEn}
                </h3>
              </div>
            </div>

            <div className="prose prose-sm text-[#3F493F] space-y-4 pt-2 border-t border-[#E7E5E4]">
              <p className="text-sm font-semibold text-[#18181B]">
                {language === 'fr' ? selectedPolicy.descFr : selectedPolicy.descEn}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed">
                {language === 'fr' ? selectedPolicy.contentFr : selectedPolicy.contentEn}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E7E5E4] flex items-center justify-between text-xs font-label">
              <span className="text-[#6F7A6E]">
                Official ACV Reference Doc
              </span>
              <button
                onClick={() => setSelectedPolicy(null)}
                className="bg-[#690C07] text-white px-4 py-2 rounded-lg font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
