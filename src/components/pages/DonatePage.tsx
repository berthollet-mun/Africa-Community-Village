import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import { BannerCarousel } from '../common/BannerCarousel';
import {
  Heart,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle2,
  Sparkles,
  Download,
  Share2,
  Lock,
  ArrowRight,
  Gift,
  RefreshCw,
  Coins
} from 'lucide-react';
import { DonationRecord } from '../../types';
import { Button } from '../common/Button';
import { toast } from '../common/Toast';

export const DonatePage: React.FC = () => {
  const { language, addDonation } = useApp();
  const t = useTranslation(language);
  const isFr = language === 'fr';

  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [allocation, setAllocation] = useState<string>('all');
  const [paymentMethod, setPaymentMethod] = useState<'mobile' | 'card' | 'wire'>('card');
  const [mobileProvider, setMobileProvider] = useState<'airtel' | 'mpesa' | 'orange'>('airtel');

  // Donor form
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  // Success state
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedDonation, setCompletedDonation] = useState<DonationRecord | null>(null);

  const presets = [25, 50, 100, 250, 500];

  const getEffectiveAmount = () => {
    if (customAmount && Number(customAmount) > 0) {
      return Number(customAmount);
    }
    return selectedAmount;
  };

  const getImpactDescription = (amt: number) => {
    if (amt < 35) {
      return isFr
        ? 'Fournit 15 jeunes plants d’arbres indigènes et du compost pour une parcelle agroforestière.'
        : 'Provides 15 indigenous tree seedlings and organic compost kit for a youth agroforestry plot.';
    }
    if (amt < 75) {
      return isFr
        ? 'Finance le matériel scolaire, les kits éco-citoyens et le tutorat de 2 enfants pour une année complète.'
        : 'Funds climate-smart educational materials and mentoring for 2 children for a full academic year.';
    }
    if (amt < 175) {
      return isFr
        ? 'Équipe un lit maraîcher agroécologique alimentant 4 familles en légumes frais et sains.'
        : 'Equips a regenerative bio-vegetable bed nourishing 4 families continuously with fresh produce.';
    }
    if (amt < 400) {
      return isFr
        ? 'Parraine 6 mois de formation professionnelle qualifiante et kit d’insertion pour une jeune femme.'
        : 'Sponsors a young woman through 6 months of certified vocational incubation and launch grant.';
    }
    return isFr
      ? 'Finance l’installation d’un point de captage et filtration d’eau saine pour un quartier villageois.'
      : 'Funds clean water catchment and bio-sand filtration infrastructure for a vulnerable village sector.';
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail) {
      toast.warning(
        isFr ? 'Veuillez saisir votre nom et courriel pour le reçu.' : 'Please enter your name and email for the receipt.',
        isFr ? 'Coordonnées Requises' : 'Information Required'
      );
      return;
    }

    setIsProcessing(true);
    const amount = getEffectiveAmount();

    setTimeout(() => {
      const record: DonationRecord = {
        id: `DON-${Date.now().toString().slice(-6)}`,
        name: anonymous ? (isFr ? 'Donateur Anonyme' : 'Anonymous Donor') : donorName,
        donorName: anonymous ? (isFr ? 'Donateur Anonyme' : 'Anonymous Donor') : donorName,
        donorEmail,
        amount,
        currency: 'USD',
        frequency,
        pillar: allocation,
        paymentMethod:
          paymentMethod === 'mobile'
            ? `Mobile Money (${mobileProvider.toUpperCase()})`
            : paymentMethod === 'card'
            ? 'Credit Card'
            : 'Bank Wire Transfer',
        status: 'completed',
        date: new Date().toISOString().split('T')[0],
        anonymous
      };

      addDonation(record);
      setCompletedDonation(record);
      setIsProcessing(false);

      toast.success(
        isFr
          ? `Merci infiniment pour votre don de $${amount} USD en faveur d'ACV !`
          : `Heartfelt thanks for your generous donation of $${amount} USD!`,
        isFr ? 'Solidarité Enregistrée' : 'Donation Processed'
      );
    }, 1000);
  };

  return (
    <div className="bg-[#fbf8fc] min-h-screen">
      {/* Banner Carousel */}
      <BannerCarousel pageRoute="/donate" />

      {/* Hero Header */}
      <section className="py-12 md:py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-label uppercase tracking-widest font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-4">
            <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            <span>{isFr ? 'Solidarité & Impact Direct' : 'Direct Grassroots Solidarity'}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-stone-900 tracking-tight">
            {t.donate.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-stone-600 leading-relaxed">
            {t.donate.subtitle}
          </p>
        </div>
      </section>

      {/* Main Donation Container */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {completedDonation ? (
            /* Thank you & Donor Certificate Box */
            <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-8 md:p-14 text-center max-w-3xl mx-auto space-y-8 animate-fade-in">
              <div className="w-20 h-20 bg-[#FAF6EF] text-[#690C07] rounded-full flex items-center justify-center mx-auto shadow-inner border border-[#E2D7C3]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-label uppercase tracking-widest text-[#690C07] font-bold">
                  {isFr ? 'Paiement Confirmé • Réf : ' + completedDonation.id : 'Donation Confirmed • Ref : ' + completedDonation.id}
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-extrabold text-stone-900 mt-2">
                  {isFr ? 'Merci du fond du cœur, ' : 'Thank You Warmly, '}
                  {completedDonation.donorName} !
                </h2>
                <p className="text-stone-600 mt-3 text-base">
                  {isFr
                    ? 'Votre générosité active directement le travail des jeunes de Goma sur le terrain. Un reçu fiscal et notre bulletin d’impact vous seront envoyés à ' + completedDonation.donorEmail
                    : 'Your contribution directly empowers local youth in Eastern Congo. A formal tax receipt and quarterly field updates are en route to ' + completedDonation.donorEmail}
                </p>
              </div>

              {/* Certificate Card */}
              <div className="p-8 rounded-2xl bg-stone-50 border-2 border-dashed border-amber-300 text-left relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_23.23.59_792cea6b.jpeg"
                      alt="ACV Logo"
                      className="h-10 w-auto object-contain"
                    />
                    <div>
                      <div className="text-xs font-label uppercase font-bold text-stone-500">
                        Africa Community Village
                      </div>
                      <div className="text-sm font-bold text-stone-900">
                        {isFr ? 'Certificat de Solidarité' : 'Certificate of Solidarity'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold font-label text-acv-green">
                      ${completedDonation.amount} USD
                    </div>
                    <div className="text-xs text-stone-500 font-label">
                      {completedDonation.frequency === 'monthly' ? (isFr ? 'Par mois' : 'Monthly') : (isFr ? 'Don Unique' : 'One-time')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-label text-stone-600">
                  <div>
                    <span className="text-stone-400 block">{isFr ? 'Attribué à :' : 'Granted to:'}</span>
                    <span className="font-bold text-stone-800 text-sm">{completedDonation.donorName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">{isFr ? 'Date :' : 'Issued Date:'}</span>
                    <span className="font-bold text-stone-800 text-sm">{completedDonation.date}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">{isFr ? 'Affectation :' : 'Designation:'}</span>
                    <span className="font-bold text-stone-800 text-sm">{completedDonation.pillar}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">{isFr ? 'Mode de règlement :' : 'Payment Route:'}</span>
                    <span className="font-bold text-stone-800 text-sm">{completedDonation.paymentMethod}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-200 text-center text-xs text-stone-500 italic">
                  « Umuntu ngumuntu ngabantu — Je suis parce que nous sommes »
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-lg text-xs font-label uppercase tracking-wider font-bold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isFr ? 'Télécharger le Reçu' : 'Print / Save Receipt'}</span>
                </button>
                <button
                  onClick={() => setCompletedDonation(null)}
                  className="px-6 py-3 bg-stone-100 text-stone-700 rounded-lg text-xs font-label uppercase tracking-wider font-bold hover:bg-stone-200 transition-colors"
                >
                  {isFr ? 'Faire un autre don' : 'Make Another Gift'}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Donation Form */}
              <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-stone-200 shadow-sm">
                <form onSubmit={handleDonateSubmit} className="space-y-8">
                  {/* Frequency Toggle */}
                  <div>
                    <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-2">
                      {isFr ? '1. Fréquence de votre don' : '1. Choose Gift Frequency'}
                    </label>
                    <div className="grid grid-cols-2 gap-3 p-1 bg-stone-100 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setFrequency('once')}
                        className={`py-2.5 text-xs font-label uppercase tracking-wider font-bold rounded-lg transition-all ${
                          frequency === 'once'
                            ? 'bg-white text-stone-900 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {isFr ? 'Don Unique' : 'One-Time Gift'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFrequency('monthly')}
                        className={`py-2.5 text-xs font-label uppercase tracking-wider font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                          frequency === 'monthly'
                            ? 'bg-acv-green text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>{isFr ? 'Mensuel (Impact continu)' : 'Monthly Supporter'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Preset Amount Grid */}
                  <div>
                    <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-2">
                      {isFr ? '2. Montant du don (USD)' : '2. Select Amount (USD)'}
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {presets.map((amt) => {
                        const isSelected = selectedAmount === amt && !customAmount;
                        return (
                          <button
                            type="button"
                            key={amt}
                            onClick={() => {
                              setSelectedAmount(amt);
                              setCustomAmount('');
                            }}
                            className={`py-3 px-2 rounded-xl text-center font-label font-bold text-base transition-all border ${
                              isSelected
                                ? 'bg-amber-500 text-stone-950 border-amber-600 ring-2 ring-amber-400/40 shadow-xs'
                                : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                            }`}
                          >
                            ${amt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Amount input */}
                    <div className="mt-3 relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-label font-bold text-stone-400">
                        $ USD
                      </span>
                      <input
                        type="number"
                        min="5"
                        placeholder={isFr ? 'Autre montant personnalisé...' : 'Other custom amount...'}
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-18 pr-4 py-2.5 bg-stone-50 rounded-xl border border-stone-200 text-sm font-label font-bold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-acv-green/20 focus:border-acv-green"
                      />
                    </div>
                  </div>

                  {/* Allocation Selector */}
                  <div>
                    <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-2">
                      {isFr ? '3. Affectation de votre don' : '3. Direct Your Gift'}
                    </label>
                    <select
                      value={allocation}
                      onChange={(e) => setAllocation(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-stone-50 font-medium text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-acv-green/20 focus:border-acv-green"
                    >
                      <option value="all">
                        {isFr ? 'Là où le besoin est le plus urgent (Recommandé)' : 'Where Needed Most (Recommended)'}
                      </option>
                      <option value="nature-biodiversity">
                        {isFr ? 'Projet Goma Restoration & Reforestation' : 'Goma Restoration & Biodiversity'}
                      </option>
                      <option value="education-youth">
                        {isFr ? 'Éducation & Autonomie des Jeunes' : 'Education & Youth Leadership'}
                      </option>
                      <option value="agriculture-food-security">
                        {isFr ? 'Agriculture Durable & Sécurité Alimentaire' : 'Sustainable Agriculture & Food Security'}
                      </option>
                      <option value="health-wellbeing">
                        {isFr ? 'Santé Communautaire & Bien-Être' : 'Community Health & Hygiene'}
                      </option>
                      <option value="socio-economic-empowerment">
                        {isFr ? 'Autonomisation Économique & AVEC' : 'Socio-Economic Micro-Empowerment'}
                      </option>
                    </select>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-2">
                      {isFr ? '4. Moyen de paiement' : '4. Payment Method'}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                          paymentMethod === 'card'
                            ? 'bg-acv-green/10 border-acv-green text-acv-green ring-1 ring-acv-green'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                        }`}
                      >
                        <CreditCard className="w-5 h-5" />
                        <span className="text-xs font-label uppercase font-bold">
                          {isFr ? 'Carte Bancaire' : 'Credit Card'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('mobile')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                          paymentMethod === 'mobile'
                            ? 'bg-acv-green/10 border-acv-green text-acv-green ring-1 ring-acv-green'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                        }`}
                      >
                        <Smartphone className="w-5 h-5" />
                        <span className="text-xs font-label uppercase font-bold">
                          Mobile Money
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('wire')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                          paymentMethod === 'wire'
                            ? 'bg-acv-green/10 border-acv-green text-acv-green ring-1 ring-acv-green'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                        }`}
                      >
                        <Building className="w-5 h-5" />
                        <span className="text-xs font-label uppercase font-bold">
                          {isFr ? 'Virement Bancaire' : 'Bank Wire'}
                        </span>
                      </button>
                    </div>

                    {/* Mobile provider options */}
                    {paymentMethod === 'mobile' && (
                      <div className="mt-4 p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                        <div className="text-xs font-label font-bold text-stone-700 uppercase">
                          {isFr ? 'Opérateur Mobile Money (RDC)' : 'DRC Mobile Operator'}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'airtel', label: 'Airtel Money (+243 977 531 777)' },
                            { id: 'mpesa', label: 'Vodacom M-Pesa (+243 81...)' },
                            { id: 'orange', label: 'Orange Money (+243 89...)' }
                          ].map((op) => (
                            <button
                              type="button"
                              key={op.id}
                              onClick={() => setMobileProvider(op.id as any)}
                              className={`py-2 px-2 rounded-lg text-[11px] font-label font-bold uppercase border text-center transition-all ${
                                mobileProvider === op.id
                                  ? 'bg-[#690C07] text-white border-[#690C07]'
                                  : 'bg-white text-stone-700 border-stone-200'
                              }`}
                            >
                              {op.id.toUpperCase()}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-stone-500 italic">
                          {isFr
                            ? 'Le numéro officiel ACV Airtel Money est le +243 977 531 777 (Titulaire : Africa Community Village ASBL).'
                            : 'Official ACV Airtel Money receiving number: +243 977 531 777 (Account name: Africa Community Village).'}
                        </p>
                      </div>
                    )}

                    {/* Bank Wire instructions */}
                    {paymentMethod === 'wire' && (
                      <div className="mt-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5 font-label">
                        <div className="font-bold text-stone-800">
                          Rawbank RDC • Agence de Goma
                        </div>
                        <div className="text-stone-600">Compte USD : 01000-0250-9843-ACV-01</div>
                        <div className="text-stone-600">SWIFT / BIC : RAWBKICD</div>
                        <div className="text-stone-600">Bénéficiaire : Africa Community Village ASBL</div>
                      </div>
                    )}
                  </div>

                  {/* Donor Info Inputs */}
                  <div className="space-y-4 pt-2 border-t border-stone-100">
                    <label className="block text-xs font-label uppercase font-bold text-stone-700">
                      {isFr ? '5. Informations du Donateur' : '5. Donor Information'}
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder={isFr ? 'Nom complet *' : 'Full Name *'}
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-acv-green/20 focus:border-acv-green bg-stone-50/50"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder={isFr ? 'Courriel *' : 'Email Address *'}
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-acv-green/20 focus:border-acv-green bg-stone-50/50"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="anonCheck"
                        checked={anonymous}
                        onChange={(e) => setAnonymous(e.target.checked)}
                        className="rounded border-stone-300 text-acv-green focus:ring-acv-green"
                      />
                      <label htmlFor="anonCheck" className="text-xs text-stone-600">
                        {isFr
                          ? 'Garder mon don anonyme sur nos publications publiques'
                          : 'Keep my donation anonymous in public donor recognitions'}
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    fullWidth
                    isLoading={isProcessing}
                    loadingText={isFr ? 'Traitement sécurisé en cours...' : 'Processing Solidarity Gift...'}
                    icon={<Heart className="w-5 h-5 fill-white" />}
                  >
                    {`${isFr ? 'Finaliser le don de' : 'Complete Gift of'} $${getEffectiveAmount()} USD`}
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-stone-400 text-xs">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-[#0E7490]" />
                      256-Bit SSL Encrypted
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0E7490]" />
                      100% Direct Grassroots Impact
                    </span>
                  </div>
                </form>
              </div>

              {/* Right Column: Dynamic Impact Showcase */}
              <div className="lg:col-span-5 space-y-6">
                {/* Tangible Impact Box */}
                <div className="bg-linear-to-br from-[#690C07] to-[#232826] p-8 rounded-3xl text-white shadow-lg space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#EFA62B]/15 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-label uppercase font-bold tracking-widest text-[#EFA62B]">
                      {isFr ? 'Votre Impact Concret' : 'Your Concrete Impact'}
                    </span>
                    <span className="text-2xl font-extrabold font-label text-white">
                      ${getEffectiveAmount()}
                    </span>
                  </div>

                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/10 space-y-2">
                    <div className="text-xs font-label text-[#EFA62B] uppercase font-bold">
                      {frequency === 'monthly'
                        ? (isFr ? 'Chaque mois, vous permettez :' : 'Every month, you unlock:')
                        : (isFr ? 'Grâce à ce don :' : 'With this gift:')}
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-stone-100">
                      {getImpactDescription(getEffectiveAmount())}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 text-xs text-stone-300">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#EFA62B] shrink-0 mt-0.5" />
                      <span>
                        {isFr
                          ? 'Transparence totale : rapports financiers trimestriels audités.'
                          : 'Quarterly open-ledger reports sent directly to your inbox.'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#EFA62B] shrink-0 mt-0.5" />
                      <span>
                        {isFr
                          ? 'Ancrage 100% local à Goma et au Nord-Kivu sans intermédiaires coûteux.'
                          : 'Zero bureaucratic intermediary loss: funds execute straight to field teams.'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#EFA62B] shrink-0 mt-0.5" />
                      <span>
                        {isFr
                          ? 'Certificat de Donateur Solidaire téléchargeable instantanément.'
                          : 'Instant verifiable certificate of solidarity generated upon receipt.'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Quotes */}
                <div className="bg-white p-6 rounded-3xl border border-stone-200 text-stone-700 space-y-4">
                  <p className="text-xs italic leading-relaxed text-stone-600">
                    « {isFr
                      ? 'Donner à ACV, c’est investir dans des solutions durables menées par ceux qui connaissent le mieux les réalités de l’Est du Congo.'
                      : 'Investing in ACV means funding solutions designed and deployed by the very youth who understand the nuanced terrain of North Kivu.'} »
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold font-label">
                      BM
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-stone-900">Berthollet Munihire</div>
                      <div className="text-stone-500">Founder & Legal Representative, ACV</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
