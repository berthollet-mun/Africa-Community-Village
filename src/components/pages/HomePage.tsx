import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Coins,
  GraduationCap,
  Handshake,
  HeartPulse,
  Leaf,
  Lock,
  Receipt,
  RotateCcw,
  Sprout
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import { getProgramHashRoute } from '../../lib/navigation';
import { BannerCarousel } from '../common/BannerCarousel';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { ErrorState } from '../common/DataState';
import { SectionHeader } from '../common/SectionHeader';
import { SkeletonCard } from '../common/Skeleton';
import { StoryCard } from '../common/StoryCard';
import { StaggerContainer, StaggerItem } from '../common/PageTransition';
import { AnimatedCard } from '../motion/AnimatedCard';
import { AnimatedText } from '../motion/AnimatedText';
import { CountUpText } from '../motion/CountUpText';

const pillarStyles = [
  'bg-[#FFF7E8] border-[#EFA62B]/25',
  'bg-[#EAF4F1] border-[#14798B]/20',
  'bg-[#F7EBDD] border-[#EFA62B]/25',
  'bg-[#F9E9E7] border-[#690C07]/15',
  'bg-[#F4EEE4] border-[#232826]/10'
];

export const HomePage: React.FC = () => {
  const { language, navigateTo, programs, blogPosts, isLoading, dataState, retryData } = useApp();
  const t = useTranslation(language);
  const [selectedDonation, setSelectedDonation] = useState(50);

  const donationImpacts: Record<number, { en: string; fr: string }> = {
    25: {
      en: '$25 supplies 30 indigenous tree saplings and watershed protection tools to our youth agroforestry teams.',
      fr: "Un don de $25 fournit 30 jeunes plants d'arbres indigènes et des outils de restauration des berges aux équipes de jeunes."
    },
    50: {
      en: '$50 provides learning materials, textbooks and weekly nutrition for 4 displaced students in our Goma learning pod.',
      fr: 'Un don de $50 garantit les fournitures scolaires, les manuels et un repas nutritif hebdomadaire pour 4 élèves déplacés à Goma.'
    },
    100: {
      en: "$100 finances a micro-grant seed for a youth-led solar fabrication atelier or women's agricultural garden.",
      fr: "Un don de $100 finance l'amorçage d'un atelier artisanal solaire de jeunes ou un jardin maraîcher coopératif de femmes."
    },
    250: {
      en: '$250 covers a full mobile trauma care session and clean water distribution point serving 80 youth in Beni.',
      fr: "Un don de $250 finance une tournée complète de soins psychosociaux et la maintenance d'un point d'eau potable pour 80 jeunes à Beni."
    }
  };

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'school': return <GraduationCap className="h-7 w-7" />;
      case 'forest': return <Leaf className="h-7 w-7" />;
      case 'potted_plant': return <Sprout className="h-7 w-7" />;
      case 'medical_services': return <HeartPulse className="h-7 w-7" />;
      default: return <Coins className="h-7 w-7" />;
    }
  };

  const impactItems = [
    [t.home.kpi1Value, t.home.kpi1Label],
    [t.home.kpi2Value, t.home.kpi2Label],
    [t.home.kpi3Value, t.home.kpi3Label],
    [t.home.kpi4Value, t.home.kpi4Label]
  ];

  return (
    <div className="w-full pb-16 sm:pb-20">
      <Container as="section" className="pt-4 sm:pt-6 lg:pt-8">
        <BannerCarousel pageRoute="/" fullBleed={false} />
      </Container>

      {dataState.error && (
        <Container className="mt-6">
          <ErrorState compact title={language === 'fr' ? 'Actualisation partielle' : 'Partial refresh'} description={dataState.error} retryLabel={language === 'fr' ? 'Réessayer' : 'Retry'} onRetry={() => void retryData()} />
        </Container>
      )}

      <Container as="section" className="py-14 sm:py-18 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-5 lg:col-span-6">
            <div className="inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.18em] text-[#690C07]">
              <span className="h-1.5 w-8 rounded-full bg-[#EFA62B]" />
              {t.home.whoWeAreKicker}
            </div>
            <AnimatedText as="h2" text={t.home.whoWeAreTitle} className="max-w-xl font-display text-3xl font-extrabold leading-tight tracking-tight text-[#232826] sm:text-4xl lg:text-5xl" />
            <p className="max-w-2xl text-sm leading-7 text-[#4B5550] sm:text-base">{t.home.whoWeAreP1}</p>
            <p className="max-w-2xl text-sm leading-7 text-[#4B5550] sm:text-base">{t.home.whoWeAreP2}</p>
            <Button variant="primary" size="md" onClick={() => navigateTo('/about/our-story')} icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
              {language === 'fr' ? 'Découvrir nos origines' : 'Read our full story'}
            </Button>
          </div>

          <div className="relative lg:col-span-6">
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-tl-[2rem] border-l-4 border-t-4 border-[#EFA62B] sm:-left-6 sm:-top-6" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border-4 border-white bg-[#232826] shadow-[0_26px_70px_-32px_rgba(35,40,38,0.55)]">
              <img src="/assets/images/acv_hero_food_security_1792692600374.webp" alt={language === 'fr' ? 'Communauté ACV engagée dans la sécurité alimentaire' : 'ACV community working together on food security'} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#690C07]/45 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 right-4 max-w-[15rem] rounded-2xl border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur sm:right-8">
              <p className="font-display text-sm font-bold leading-snug text-[#690C07]">{t.home.missionStatement}</p>
            </div>
          </div>
        </div>
      </Container>

      <section className="border-y border-[#690C07]/10 bg-white/65 py-14 sm:py-16">
        <Container>
          <SectionHeader className="mb-9 text-center" eyebrow={t.home.pillarsKicker} title={t.home.pillarsTitle} description={t.home.pillarsSubtitle} />
          {isLoading && programs.length === 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} variant="program" />)}</div>
          ) : (
            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {programs.slice(0, 5).map((pillar, index) => {
                const title = language === 'fr' ? pillar.titleFr : pillar.titleEn;
                const description = language === 'fr' ? pillar.shortDescFr : pillar.shortDescEn;
                return (
                  <StaggerItem key={pillar.id}>
                    <AnimatedCard className={`group flex h-full flex-col rounded-2xl border p-5 text-center ${pillarStyles[index % pillarStyles.length]}`}>
                      <div className="mx-auto mb-4 grid h-13 w-13 place-items-center rounded-full bg-white text-[#690C07] shadow-sm transition-transform group-hover:-translate-y-1">{getPillarIcon(pillar.icon || pillar.slug || '')}</div>
                      <h3 className="font-display text-base font-extrabold text-[#232826]">{title}</h3>
                      <p className="mt-2 flex-1 text-xs leading-5 text-[#4B5550]">{description}</p>
                      <button type="button" onClick={() => navigateTo(getProgramHashRoute(pillar.slug || pillar.id))} className="mt-4 inline-flex items-center justify-center gap-1.5 border-t border-[#232826]/10 pt-3 font-label text-xs font-bold text-[#690C07]">
                        {t.common.exploreProgram}<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </AnimatedCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </Container>
      </section>

      <Container as="section" className="py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-[#690C07] px-6 py-9 text-white shadow-[0_26px_70px_-38px_rgba(105,12,7,0.8)] sm:px-10 lg:px-12">
          <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_20%_120%,#EFA62B_0,transparent_38%),radial-gradient(circle_at_90%_-20%,#14798B_0,transparent_36%)]" />
          <div className="relative mb-7 border-b border-white/20 pb-5">
            <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-[#EFA62B]">{t.home.missionStatement}</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">{t.home.missionQuote}</h2>
          </div>
          <StaggerContainer className="relative grid grid-cols-2 gap-6 lg:grid-cols-4">
            {impactItems.map(([value, label], index) => (
              <StaggerItem key={label}>
                <div className={`border-white/20 ${index > 0 ? 'lg:border-l lg:pl-7' : ''}`}>
                  <div className="font-display text-3xl font-black text-white sm:text-4xl"><CountUpText value={value} /></div>
                  <p className="mt-1 text-xs leading-5 text-[#F3EDE1]/85 sm:text-sm">{label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>

      <Container as="section" className="pb-14 sm:pb-18">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader eyebrow={t.home.recentStoriesKicker} title={t.home.recentStoriesTitle} description={t.home.recentStoriesSubtitle} />
          <Button variant="outline" size="sm" onClick={() => navigateTo('/blog')} icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">{t.common.visitFieldJournal}</Button>
        </div>
        <StaggerContainer className="grid gap-5 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => {
            const title = language === 'fr' ? post.titleFr : post.titleEn;
            const excerpt = language === 'fr' ? post.excerptFr : post.excerptEn;
            return <StaggerItem key={post.id}><StoryCard image={post.imageUrl || post.image || '/assets/images/acv_hero_education_skills_1792692599936.webp'} alt={title} eyebrow={post.category} title={title} excerpt={excerpt} meta={[post.publishedDate, post.readTime].filter(Boolean).join(' · ')} actionLabel={t.common.readMore} onAction={() => navigateTo('/blog')} /></StaggerItem>;
          })}
        </StaggerContainer>
      </Container>

      <section className="relative overflow-hidden border-y border-[#EFA62B]/25 bg-[#EFA62B]/14 py-14 sm:py-16">
        <div className="absolute inset-y-0 right-0 w-2/5 bg-[url('/assets/images/acv_hero_tree_planting_1792692600143.webp')] bg-cover bg-center opacity-12" />
        <Container className="relative">
          <div className="mb-8 max-w-2xl">
            <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-[#690C07]">{t.home.standWithUsKicker}</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-[#232826] sm:text-4xl">{t.home.standWithUsTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-[#4B5550] sm:text-base">{t.home.standWithUsSubtitle}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [GraduationCap, t.common.volunteerSkills, t.home.volunteerDesc, t.common.getInvolved, '/contact'],
              [Handshake, t.common.partnerWithUs, t.home.partnerDesc, t.common.startConversation, '/contact'],
              [Coins, t.common.supportTheWork, t.home.supportDesc, t.common.waysToGive, '/donate#donation-form']
            ].map(([Icon, title, description, action, route]) => {
              const CardIcon = Icon as typeof GraduationCap;
              return (
                <button key={String(title)} type="button" onClick={() => navigateTo(String(route))} className="group rounded-2xl border border-white/80 bg-white/90 p-5 text-left shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
                  <CardIcon className="h-6 w-6 text-[#690C07]" />
                  <h3 className="mt-4 font-display text-lg font-extrabold text-[#232826]">{String(title)}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#4B5550]">{String(description)}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-label text-xs font-bold text-[#690C07]">{String(action)} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      <Container as="section" className="pt-14 sm:pt-18">
        <div className="grid overflow-hidden rounded-[1.75rem] border border-[#690C07]/10 bg-white shadow-[0_24px_70px_-42px_rgba(35,40,38,0.5)] lg:grid-cols-5">
          <div className="relative overflow-hidden bg-[#232826] p-7 text-white sm:p-10 lg:col-span-2">
            <div className="absolute inset-0 bg-[url('/assets/images/acv_hero_youth_community_1792692599382.webp')] bg-cover bg-center opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#690C07]/95 to-[#232826]/90" />
            <div className="relative">
              <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-[#EFA62B]">Direct Community Impact</p>
              <AnimatedText as="h2" text={language === 'fr' ? 'Faites grandir la souveraineté locale à Goma et au Kivu.' : 'Stand alongside Congolese youth rebuilding their future.'} className="mt-3 font-display text-3xl font-extrabold leading-tight text-white" />
              <p className="mt-5 text-sm leading-7 text-[#F3EDE1]/85">{language === 'fr' ? 'Chaque contribution finance directement des pépinières, des banques de semences et des formations pratiques.' : 'Every contribution equips local youth organizers with seeds, tools, and platforms to safeguard their communities.'}</p>
            </div>
          </div>
          <div className="space-y-5 p-7 sm:p-10 lg:col-span-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-[#4B5550]">{language === 'fr' ? 'Choisir le montant du don' : 'Choose your donation amount'}</span>
              <span className="rounded-full bg-[#EFA62B]/18 px-3 py-1 font-label text-[11px] font-bold text-[#690C07]">94.2% Direct Field Yield</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[25, 50, 100, 250].map((amount) => <button key={amount} type="button" onClick={() => setSelectedDonation(amount)} className={`rounded-xl border py-3 font-label text-sm font-bold transition ${selectedDonation === amount ? 'border-[#690C07] bg-[#690C07] text-white shadow-md' : 'border-[#E2D7C3] bg-[#F3EDE1]/55 text-[#232826] hover:border-[#690C07]/40'}`}>${amount}</button>)}
            </div>
            <div className="rounded-xl border border-[#E2D7C3] bg-[#F3EDE1]/55 p-4 text-sm leading-6 text-[#4B5550]"><strong className="font-label text-[#690C07]">${selectedDonation}:</strong>{' '}{language === 'fr' ? donationImpacts[selectedDonation].fr : donationImpacts[selectedDonation].en}</div>
            <Button variant="primary" size="lg" fullWidth onClick={() => navigateTo(`/donate?amount=${selectedDonation}#donation-form`)} icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">{language === 'fr' ? 'Confirmer mon soutien' : 'Complete Donation'}</Button>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-label text-[11px] text-[#6F7A6E]">
              <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5 text-[#690C07]" /> Secure Encrypted</span>
              <span className="flex items-center gap-1"><Receipt className="h-3.5 w-3.5 text-[#690C07]" /> Tax Deductible</span>
              <span className="flex items-center gap-1"><RotateCcw className="h-3.5 w-3.5 text-[#690C07]" /> Stripe Secure Checkout</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#14798B]" /> Community directed</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
