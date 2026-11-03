import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import { getProgramHashRoute } from '../../lib/navigation';
import { BannerCarousel } from '../common/BannerCarousel';
import { Button } from '../common/Button';
import { StaggerContainer, StaggerItem } from '../common/PageTransition';
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
import { AnimatedText } from '../motion/AnimatedText';
import { AnimatedCard } from '../motion/AnimatedCard';
import { CountUpText } from '../motion/CountUpText';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { ImpactMetric } from '../common/ImpactMetric';
import { StoryCard } from '../common/StoryCard';
import { ErrorState } from '../common/DataState';

export const HomePage: React.FC = () => {
  const { language, navigateTo, programs, blogPosts, isLoading, dataState, retryData } = useApp();
  const t = useTranslation(language);

  const [selectedDonation, setSelectedDonation] = useState<number>(50);

  const donationImpacts: Record<number, { en: string; fr: string }> = {
    25: {
      en: '$25 supplies 30 indigenous tree saplings and watershed protection tools to our youth agroforestry teams.',
      fr: 'Un don de $25 fournit 30 jeunes plants d\'arbres indigènes et des outils de restauration des berges aux équipes de jeunes.'
    },
    50: {
      en: '$50 provides learning materials, textbooks and weekly nutrition for 4 displaced students in our Goma learning pod.',
      fr: 'Un don de $50 garantit les fournitures scolaires, les manuels et un repas nutritif hebdomadaire pour 4 élèves déplacés à Goma.'
    },
    100: {
      en: '$100 finances a micro-grant seed for a youth-led solar fabrication atelier or women\'s agricultural garden.',
      fr: 'Un don de $100 finance l\'amorçage d\'un atelier artisanal solaire de jeunes ou un jardin maraîcher coopératif de femmes.'
    },
    250: {
      en: '$250 covers a full mobile trauma care session and clean water distribution point serving 80 youth in Beni.',
      fr: 'Un don de $250 finance une tournée complète de soins psychosociaux et la maintenance d\'un point d\'eau potable pour 80 jeunes à Beni.'
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
    navigateTo(`/donate?amount=${selectedDonation}#donation-form`);
  };

  return (
    <div className="w-full flex flex-col space-y-16 lg:space-y-24 pb-20">
      {/* 1. IMMERSIVE HERO CAROUSEL */}
      <section className="w-full">
        <BannerCarousel pageRoute="/" fullBleed={true} />
      </section>

      {dataState.error && (
        <Container className="-mb-8 lg:-mb-14">
          <ErrorState
            compact
            title={language === 'fr' ? 'Actualisation partielle' : 'Partial refresh'}
            description={dataState.error}
            retryLabel={language === 'fr' ? 'Réessayer' : 'Retry'}
            onRetry={() => void retryData()}
          />
        </Container>
      )}

      {/* 2. 4 TRUST INDICATORS RIBBON with Stagger */}
      <Container as="section" className="relative z-30 -mt-6 lg:-mt-10">
        <StaggerContainer className="grid grid-cols-2 gap-6 rounded-[1.5rem] border border-stone-200/80 bg-white p-6 shadow-xl sm:p-8 lg:grid-cols-4">
          {[
            [t.home.kpi1Value, t.home.kpi1Label],
            [t.home.kpi2Value, t.home.kpi2Label],
            [t.home.kpi3Value, t.home.kpi3Label],
            [t.home.kpi4Value, t.home.kpi4Label]
          ].map(([value, label], index) => (
            <StaggerItem key={label}>
              <ImpactMetric index={index} value={<CountUpText value={value} />} label={label} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>

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

            <AnimatedText as="h2" text={t.home.whoWeAreTitle} className="font-display font-extrabold text-3xl sm:text-4xl text-[#18181B] tracking-tight text-balance" />

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

          {/* ACV Brand Mark */}
          <div className="lg:col-span-5">
            <div className="relative isolate overflow-hidden rounded-[2rem] border border-[#D9CBAF] bg-white/80 px-6 py-8 sm:px-10 sm:py-10 shadow-[0_24px_60px_-32px_rgba(35,40,38,0.35)]">
              <div className="absolute -right-16 -top-16 -z-10 h-44 w-44 rounded-full bg-[#EFA62B]/12 blur-2xl" />
              <div className="absolute -bottom-20 -left-16 -z-10 h-48 w-48 rounded-full bg-[#0E7490]/10 blur-2xl" />
              <BrandLogo
                alt="Logo officiel Africa Community Village (ACV)"
                size={640}
                sizes="(max-width: 1024px) 90vw, 440px"
                className="mx-auto h-auto w-full max-w-[440px] object-contain drop-shadow-[0_12px_22px_rgba(35,40,38,0.12)]"
              />
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
        <SectionHeader
          className="mb-10"
          eyebrow={t.home.pillarsKicker}
          title={t.home.pillarsTitle}
          description={t.home.pillarsSubtitle}
        />

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
                  <AnimatedCard className="bg-white rounded-2xl p-5 border border-stone-200/80 flex flex-col justify-between h-full group">
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
                      onClick={() => navigateTo(getProgramHashRoute(pillar.slug || pillar.id))}
                      className="inline-flex items-center gap-1.5 text-xs font-label font-bold text-[#D97706] hover:text-[#B45309] group/btn pt-3 border-t border-stone-100 transition-colors w-full justify-between"
                    >
                      <span>{t.common.exploreProgram}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </AnimatedCard>
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

            <AnimatedText as="h2" text={t.home.standWithUsTitle} className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight" />

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
                  onClick={() => navigateTo('/donate#donation-form')}
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
        <SectionHeader
          className="mb-10"
          eyebrow={t.home.recentStoriesKicker}
          title={t.home.recentStoriesTitle}
          description={t.home.recentStoriesSubtitle}
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => {
            const title = language === 'fr' ? post.titleFr : post.titleEn;
            const excerpt = language === 'fr' ? post.excerptFr : post.excerptEn;

            return (
              <StaggerItem key={post.id}>
                <StoryCard
                  image={post.imageUrl || post.image || '/assets/aistudio/8_5185b9b0.PNG'}
                  alt={title}
                  eyebrow={post.category}
                  title={title}
                  excerpt={excerpt}
                  meta={[post.publishedDate, post.readTime].filter(Boolean).join(' · ')}
                  actionLabel={t.common.readMore}
                  onAction={() => navigateTo('/blog')}
                />
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

          <AnimatedText
            as="h2"
            text={language === 'fr' ? 'Faites grandir la souveraineté locale à Goma et au Kivu.' : 'Stand alongside Congolese youth rebuilding their future.'}
            className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight text-balance"
          />

          <p className="text-sm sm:text-base text-[#F3EDE1]/90 max-w-xl mx-auto leading-relaxed">
            {language === 'fr'
              ? 'Chaque contribution finance directement des pépinières, des banques de semences et des formations pratiques.'
              : 'Every contribution equips local youth organizers with seeds, tools, and platforms to safeguard their communities.'}
          </p>

          <div className="bg-white text-[#18181B] rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-2xl text-left space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs uppercase tracking-wider text-[#6F7A6E] font-bold">
                {language === 'fr' ? 'Choisir le montant du don' : 'Choose your donation amount'}
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
                ${selectedDonation}:
              </span>{' '}
              {language === 'fr' ? donationImpacts[selectedDonation].fr : donationImpacts[selectedDonation].en}
            </div>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
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
                <RotateCcw className="w-3.5 h-3.5 text-[#EFA62B]" /> Stripe Secure Checkout
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
