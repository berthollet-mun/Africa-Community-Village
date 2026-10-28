import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import { BannerCarousel } from '../common/BannerCarousel';
import { Button } from '../common/Button';
import { StaggerContainer, StaggerItem } from '../common/PageTransition';
import { toast } from '../common/Toast';
import {
  GraduationCap,
  Leaf,
  Sprout,
  HeartPulse,
  Coins,
  ArrowRight,
  Handshake,
  Users,
  Compass,
  CheckCircle2,
  Lock,
  Receipt,
  RotateCcw
} from 'lucide-react';
import { SkeletonCard } from '../common/Skeleton';
import { BrandLogo } from '../common/BrandLogo';

export const HomePage: React.FC = () => {
  const { language, navigateTo, programs, blogPosts, isLoading } = useApp();
  const t = useTranslation(language);

  const [selectedDonation, setSelectedDonation] = useState<number>(50);
  const [isSimulating, setIsSimulating] = useState(false);

  const donationImpacts: Record<number, { en: string; fr: string }> = {
    25: {
      en: '$25/month supplies 30 indigenous tree saplings and watershed protection tools to our youth agroforestry teams.',
      fr: '$25/mois fournit 30 jeunes plants d\'arbres indigènes et des outils de restauration des berges aux équipes de jeunes.'
    },
    50: {
      en: '$50/month provides learning materials, textbooks and weekly nutrition for 4 displaced students in our Goma learning pod.',
      fr: '$50/mois garantit les fournitures scolaires, les manuels et un repas nutritif hebdomadaire pour 4 élèves déplacés à Goma.'
    },
    100: {
      en: '$100/month finances a micro-grant seed for a youth-led solar fabrication atelier or women\'s agricultural garden.',
      fr: '$100/mois finance l\'amorçage d\'un atelier artisanal solaire de jeunes ou un jardin maraîcher coopératif de femmes.'
    },
    250: {
      en: '$250/month covers a full mobile trauma care session and clean water distribution point serving 80 youth in Beni.',
      fr: '$250/mois finance une tournée complète de soins psychosociaux et la maintenance d\'un point d\'eau potable pour 80 jeunes à Beni.'
    }
  };

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'school':
        return <GraduationCap className="w-6 h-6 text-[#EFA62B]" />;
      case 'forest':
        return <Leaf className="w-6 h-6 text-[#0E7490]" />;
      case 'potted_plant':
        return <Sprout className="w-6 h-6 text-[#0E7490]" />;
      case 'medical_services':
        return <HeartPulse className="w-6 h-6 text-[#690C07]" />;
      case 'handshake':
      default:
        return <Coins className="w-6 h-6 text-[#EFA62B]" />;
    }
  };

  const handleConfirmDonation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      toast.success(
        language === 'fr'
          ? `Option $${selectedDonation}/mois pré-sélectionnée pour votre don !`
          : `Selected $${selectedDonation}/month tier pre-loaded for your donation!`,
        language === 'fr' ? 'Solidarité Communautaire' : 'Community Solidarity'
      );
      navigateTo('/donate');
    }, 400);
  };

  return (
    <div className="w-full flex flex-col space-y-16 lg:space-y-24 pb-20">
      {/* 1. IMMERSIVE HERO CAROUSEL */}
      <section className="w-full">
        <BannerCarousel pageRoute="/" fullBleed={true} />
      </section>

      {/* 2. 4 TRUST INDICATORS RIBBON with Stagger */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-6 lg:-mt-10 relative z-30">
        <StaggerContainer className="bg-white rounded-2xl shadow-xl border border-stone-200/80 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-stone-100">
          <StaggerItem className="space-y-1 sm:px-4">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#18181B] tabular-nums">
              {t.home.kpi1Value}
            </p>
            <p className="text-xs sm:text-sm text-[#3F493F] font-medium">
              {t.home.kpi1Label}
            </p>
          </StaggerItem>
          <StaggerItem className="space-y-1 sm:px-4 pt-4 lg:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#690C07] tabular-nums">
              {t.home.kpi2Value}
            </p>
            <p className="text-xs sm:text-sm text-[#3F493F] font-medium">
              {t.home.kpi2Label}
            </p>
          </StaggerItem>
          <StaggerItem className="space-y-1 sm:px-4 pt-4 lg:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#0E7490] tabular-nums">
              {t.home.kpi3Value}
            </p>
            <p className="text-xs sm:text-sm text-[#3F493F] font-medium">
              {t.home.kpi3Label}
            </p>
          </StaggerItem>
          <StaggerItem className="space-y-1 sm:px-4 pt-4 lg:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#EFA62B] tabular-nums">
              {t.home.kpi4Value}
            </p>
            <p className="text-xs sm:text-sm text-[#3F493F] font-medium">
              {t.home.kpi4Label}
            </p>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* 3. WHO WE ARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#690C07] rotate-45 inline-block"></span>
              <span className="font-label text-xs uppercase tracking-widest text-[#690C07] font-bold">
                {t.home.whoWeAreKicker}
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#18181B] tracking-tight text-balance">
              {t.home.whoWeAreTitle}
            </h2>

            <p className="text-sm sm:text-base text-[#3F493F] leading-relaxed">
              {t.home.whoWeAreP1}
            </p>

            <p className="text-sm sm:text-base text-[#3F493F] leading-relaxed">
              {t.home.whoWeAreP2}
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('/about/our-story')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#690C07] hover:text-[#520905] group py-1 active:scale-95 transition-all cursor-pointer"
              >
                <span>{language === 'fr' ? 'Découvrir nos origines' : 'Read our full story'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Ubuntu Emblem Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden bg-stone-900 p-8 shadow-xl text-white flex flex-col justify-between min-h-[300px] border border-stone-800 transition-all hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-center justify-center py-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-[#D97706]/60 bg-white p-1.5 shadow-xl flex items-center justify-center">
                    <BrandLogo
                      alt="Ubuntu Emblem"
                      size={128}
                      sizes="96px"
                      className="w-full h-full rounded-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                <p className="font-label text-xs sm:text-sm text-neutral-200 font-semibold tracking-wide">
                  {t.home.ubuntuPill}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISSION STATEMENT FULL-WIDTH CALLOUT */}
      <section className="w-full bg-[#18181B] text-white py-16 lg:py-20 border-y border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <blockquote className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-neutral-100 leading-snug tracking-tight text-balance">
            {t.home.missionQuote}
          </blockquote>
          <p className="font-label text-xs sm:text-sm text-[#D97706] font-bold tracking-widest uppercase">
            {t.home.missionStatement}
          </p>
        </div>
      </section>

      {/* 5. FIVE PILLARS, ONE COMMUNITY MODEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-4 max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#0E7490] rotate-45 inline-block"></span>
            <span className="font-label text-xs uppercase tracking-widest text-[#0E7490] font-bold">
              {t.home.pillarsKicker}
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#18181B] tracking-tight">
            {t.home.pillarsTitle}
          </h2>

          <p className="text-sm sm:text-base text-[#3F493F] leading-relaxed">
            {t.home.pillarsSubtitle}
          </p>
        </div>

        {/* 5 Pillars with Skeleton Loading & Stagger Reveal */}
        {isLoading && programs.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} variant="program" />
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {programs.map((pillar) => {
              const title = language === 'fr' ? pillar.titleFr : pillar.titleEn;
              const shortDesc = language === 'fr' ? pillar.shortDescFr : pillar.shortDescEn;

              return (
                <StaggerItem key={pillar.id}>
                  <div
                    className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#FAF6EF] border border-[#E2D7C3] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#F3EDE1] transition-all duration-300">
                        {getPillarIcon(pillar.icon || pillar.slug || '')}
                      </div>

                      <h3 className="font-display font-bold text-base text-[#18181B] mb-2 leading-snug group-hover:text-[#690C07] transition-colors">
                        {title}
                      </h3>

                      <p className="text-xs text-[#3F493F] leading-relaxed mb-4 line-clamp-4">
                        {shortDesc}
                      </p>
                    </div>

                    <button
                      onClick={() => navigateTo(`/programs/${pillar.slug}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-label font-bold text-[#D97706] hover:text-[#B45309] group/btn pt-3 border-t border-stone-100 transition-colors w-full justify-between"
                    >
                      <span>{t.common.exploreProgram}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </section>

      {/* 6. THREE WAYS TO STAND WITH ACV */}
      <section className="w-full bg-[#18181B] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#D97706] rotate-45 inline-block"></span>
              <span className="font-label text-xs uppercase tracking-widest text-[#D97706] font-bold">
                {t.home.standWithUsKicker}
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              {t.home.standWithUsTitle}
            </h2>

            <p className="text-sm sm:text-base text-neutral-300">
              {t.home.standWithUsSubtitle}
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Volunteer */}
            <StaggerItem>
              <div className="bg-white text-[#18181B] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#D97706] mb-5 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#18181B] mb-3 group-hover:text-[#D97706] transition-colors">
                    {t.common.volunteerSkills}
                  </h3>
                  <p className="text-sm text-[#3F493F] leading-relaxed mb-6">
                    {t.home.volunteerDesc}
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('/contact')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#18181B] hover:text-[#D97706] font-label group/btn active:scale-95 transition-all"
                >
                  <span>{t.common.getInvolved}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </StaggerItem>

            {/* Card 2: Partner */}
            <StaggerItem>
              <div className="bg-white text-[#18181B] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#CFFAFE] flex items-center justify-center text-[#0E7490] mb-5 group-hover:scale-110 transition-transform">
                    <Handshake className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#18181B] mb-3 group-hover:text-[#0E7490] transition-colors">
                    {t.common.partnerWithUs}
                  </h3>
                  <p className="text-sm text-[#3F493F] leading-relaxed mb-6">
                    {t.home.partnerDesc}
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('/contact')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#18181B] hover:text-[#0E7490] font-label group/btn active:scale-95 transition-all"
                >
                  <span>{t.common.startConversation}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </StaggerItem>

            {/* Card 3: Donate */}
            <StaggerItem>
              <div className="bg-white text-[#18181B] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] flex items-center justify-center text-[#991B1B] mb-5 group-hover:scale-110 transition-transform">
                    <Coins className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#18181B] mb-3 group-hover:text-[#690C07] transition-colors">
                    {t.common.supportTheWork}
                  </h3>
                  <p className="text-sm text-[#3F493F] leading-relaxed mb-6">
                    {t.home.supportDesc}
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('/donate')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#18181B] hover:text-[#690C07] font-label group/btn active:scale-95 transition-all cursor-pointer"
                >
                  <span>{t.common.waysToGive}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 7. RECENT STORIES FROM THE FIELD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-3 max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#D97706] rotate-45 inline-block"></span>
            <span className="font-label text-xs uppercase tracking-widest text-[#D97706] font-bold">
              {t.home.recentStoriesKicker}
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#18181B] tracking-tight">
            {t.home.recentStoriesTitle}
          </h2>

          <p className="text-sm sm:text-base text-[#3F493F]">
            {t.home.recentStoriesSubtitle}
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => {
            const title = language === 'fr' ? post.titleFr : post.titleEn;
            const excerpt = language === 'fr' ? post.excerptFr : post.excerptEn;

            return (
              <StaggerItem key={post.id}>
                <div
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group"
                >
                  <div>
                    <div className="h-48 w-full overflow-hidden bg-stone-900 relative">
                      <img
                        src={post.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-label font-bold text-[#18181B] shadow-xs">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[#6F7A6E] mb-2 font-label">
                        <span>{post.publishedDate}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="font-display font-bold text-lg text-[#18181B] mb-2 leading-snug group-hover:text-[#690C07] transition-colors">
                        {title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#3F493F] leading-relaxed line-clamp-3">
                        {excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => navigateTo('/blog')}
                      className="inline-flex items-center gap-1.5 text-xs font-label font-bold text-[#690C07] hover:text-[#520905] group/link active:scale-95 transition-all cursor-pointer"
                    >
                      <span>{t.common.readMore}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigateTo('/blog')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            {t.common.visitFieldJournal}
          </Button>
        </div>
      </section>

      {/* 8. INTERACTIVE SOLIDARITY CONTRIBUTION CALCULATOR */}
      <section className="w-full bg-[#690C07] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-label font-bold tracking-wider uppercase">
            <span>Direct Community Impact</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight text-balance">
            {language === 'fr'
              ? 'Faites grandir la souveraineté locale à Goma et au Kivu.'
              : 'Stand alongside Congolese youth rebuilding their future.'}
          </h2>

          <p className="text-sm sm:text-base text-[#F3EDE1]/90 max-w-xl mx-auto leading-relaxed">
            {language === 'fr'
              ? 'Chaque contribution finance directement des pépinières, des banques de semences et des formations pratiques.'
              : 'Every contribution equips local youth organizers with seeds, tools, and platforms to safeguard their communities.'}
          </p>

          <div className="bg-white text-[#18181B] rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-2xl text-left space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs uppercase tracking-wider text-[#6F7A6E] font-bold">
                {language === 'fr' ? 'Choisir la solidarité mensuelle' : 'Choose monthly solidarity'}
              </span>
              <span className="text-xs bg-[#EFA62B] text-[#232826] px-2.5 py-0.5 rounded-full font-label font-bold">
                94.2% Direct Field Yield
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[25, 50, 100, 250].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedDonation(amt)}
                  className={`py-3 rounded-xl font-label font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer active:scale-95 ${
                    selectedDonation === amt
                      ? 'bg-[#690C07] text-white shadow-md scale-102 ring-2 ring-[#EFA62B]/60'
                      : 'bg-stone-100 text-[#18181B] hover:bg-stone-200'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            <div className="p-4 bg-[#FAF6EF] rounded-xl border border-[#E2D7C3] text-xs sm:text-sm text-[#3F493F] leading-relaxed transition-all">
              <span className="font-bold text-[#690C07] font-label">
                ${selectedDonation}/month:
              </span>{' '}
              {language === 'fr' ? donationImpacts[selectedDonation].fr : donationImpacts[selectedDonation].en}
            </div>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              isLoading={isSimulating}
              loadingText={language === 'fr' ? 'Préparation...' : 'Loading...'}
              onClick={handleConfirmDonation}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              {language === 'fr' ? 'Confirmer mon soutien' : 'Complete Donation'}
            </Button>

            <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2 text-[11px] text-[#6F7A6E] font-label flex-wrap">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#EFA62B]" /> Secure Encrypted
              </span>
              <span className="flex items-center gap-1">
                <Receipt className="w-3.5 h-3.5 text-[#EFA62B]" /> Tax Deductible
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-[#EFA62B]" /> Cancel Anytime
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
