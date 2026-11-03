import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, CreditCard, Heart, Loader2, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import { api } from '../../services/api';
import { PageHeader } from '../common/PageHeader';
import { Button } from '../common/Button';
import { toast } from '../common/Toast';

const PRESET_AMOUNTS = [25, 50, 100, 250];

export const DonatePage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = useTranslation(language);
  const searchParams = useSearchParams();
  const isFr = language === 'fr';
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [allocation, setAllocation] = useState('all');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const requestedAmount = Number(searchParams.get('amount'));
    if (!Number.isFinite(requestedAmount) || requestedAmount < 5 || requestedAmount > 10_000) return;
    if (PRESET_AMOUNTS.includes(requestedAmount)) {
      setSelectedAmount(requestedAmount);
      setCustomAmount('');
    } else {
      setCustomAmount(String(requestedAmount));
    }
  }, [searchParams]);

  const amount = customAmount ? Number(customAmount) : selectedAmount;

  const getImpactDescription = (value: number) => {
    if (value < 35) return isFr
      ? 'Fournit des plants indigènes et du compost pour une parcelle agroforestière portée par des jeunes.'
      : 'Provides indigenous seedlings and compost for a youth-led agroforestry plot.';
    if (value < 75) return isFr
      ? 'Finance du matériel scolaire, des kits éco-citoyens et le tutorat de deux enfants.'
      : 'Funds school materials, eco-citizen kits and mentoring for two children.';
    if (value < 175) return isFr
      ? 'Équipe un jardin agroécologique qui nourrit durablement plusieurs familles.'
      : 'Equips a regenerative garden that sustainably nourishes several families.';
    return isFr
      ? 'Renforce directement une action communautaire structurante dans l’Est de la RDC.'
      : 'Directly strengthens a high-impact community initiative in Eastern DRC.';
  };

  const handleDonateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!Number.isFinite(amount) || amount < 5 || amount > 10_000) {
      setFormError(isFr ? 'Choisissez un montant compris entre 5 et 10 000 USD.' : 'Choose an amount between 5 and 10,000 USD.');
      toast.warning(
        isFr ? 'Choisissez un montant entre 5 et 10 000 USD.' : 'Choose an amount between 5 and 10,000 USD.',
        isFr ? 'Montant invalide' : 'Invalid amount'
      );
      return;
    }
    setFormError(null);
    setIsProcessing(true);
    try {
      const session = await api.checkout.createSession({ amount, donorName, donorEmail, allocation, anonymous, language });
      window.location.href = session.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : (isFr ? 'Une erreur est survenue.' : 'Something went wrong.');
      setFormError(message);
      toast.error(message, isFr ? 'Paiement indisponible' : 'Payment unavailable');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3EDE1]">
      {isProcessing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#232826]/65 px-4 backdrop-blur-sm" role="status" aria-live="polite">
          <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#690C07]" />
            <h2 className="mt-5 text-xl font-extrabold text-stone-900">{isFr ? 'Ouverture du paiement sécurisé…' : 'Opening secure checkout…'}</h2>
            <p className="mt-2 text-sm text-stone-600">{isFr ? 'Vous allez être redirigé vers Stripe.' : 'You will be redirected to Stripe.'}</p>
          </div>
        </div>
      )}

      <PageHeader
        align="center"
        eyebrow={isFr ? 'Solidarité & impact direct' : 'Direct grassroots solidarity'}
        title={t.donate.title}
        description={t.donate.subtitle}
        homeLabel={t.nav.home}
        currentLabel={t.nav.donate}
        onHome={() => navigateTo('/')}
        icon={<Heart className="h-4 w-4 fill-[#EFA62B]/30" />}
      />

      <section id="donation-form" className="py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="rounded-3xl border border-[#E2D7C3] bg-white p-7 shadow-sm sm:p-10 lg:col-span-7">
            <form onSubmit={handleDonateSubmit} className="space-y-8">
              {formError && (
                <div className="rounded-xl border border-[#690C07]/20 bg-[#F9EBEA] p-3 text-sm text-[#690C07]" role="alert" id="donation-form-error">
                  {formError}
                </div>
              )}
              <div>
                <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-stone-700">{isFr ? '1. Montant du don (USD)' : '1. Donation amount (USD)'}</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {PRESET_AMOUNTS.map((preset) => {
                    const active = selectedAmount === preset && !customAmount;
                    return (
                      <button type="button" key={preset} aria-pressed={active} onClick={() => { setSelectedAmount(preset); setCustomAmount(''); }}
                        className={`rounded-xl border px-3 py-3 font-label text-base font-bold transition-all ${active ? 'border-[#690C07] bg-[#690C07] text-white shadow-md ring-2 ring-[#EFA62B]/45' : 'border-stone-200 bg-stone-50 text-stone-800 hover:border-[#690C07]/40 hover:bg-stone-100'}`}>
                        ${preset}
                      </button>
                    );
                  })}
                </div>
                <div className="relative mt-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-500">$</span>
                  <input type="number" min="5" max="10000" step="1" inputMode="decimal" placeholder={isFr ? 'Autre montant' : 'Other amount'} value={customAmount} onChange={(event) => { setCustomAmount(event.target.value); setFormError(null); }} aria-invalid={Boolean(formError && (!Number.isFinite(amount) || amount < 5 || amount > 10000))} aria-describedby={formError ? 'donation-form-error' : undefined}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-9 pr-16 text-sm font-bold text-stone-900 outline-none focus:border-[#690C07] focus:ring-2 focus:ring-[#690C07]/15" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">USD</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-700">{isFr ? '2. Affectation' : '2. Direct your gift'}</label>
                <select value={allocation} onChange={(event) => setAllocation(event.target.value)} className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-[#690C07] focus:ring-2 focus:ring-[#690C07]/15">
                  <option value="all">{isFr ? 'Là où le besoin est le plus urgent' : 'Where needed most'}</option>
                  <option value="education">{isFr ? 'Éducation & jeunesse' : 'Education & youth'}</option>
                  <option value="biodiversity">{isFr ? 'Nature & biodiversité' : 'Nature & biodiversity'}</option>
                  <option value="agriculture">{isFr ? 'Agriculture & sécurité alimentaire' : 'Agriculture & food security'}</option>
                  <option value="health">{isFr ? 'Santé & bien-être' : 'Health & wellbeing'}</option>
                  <option value="livelihoods">{isFr ? 'Autonomisation socio-économique' : 'Socio-economic empowerment'}</option>
                </select>
              </div>

              <div className="space-y-4 border-t border-stone-100 pt-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">{isFr ? '3. Vos informations' : '3. Your information'}</label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input type="text" required autoComplete="name" placeholder={isFr ? 'Nom complet *' : 'Full name *'} value={donorName} onChange={(event) => setDonorName(event.target.value)} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#690C07] focus:ring-2 focus:ring-[#690C07]/15" />
                  <input type="email" required autoComplete="email" placeholder={isFr ? 'Adresse e-mail *' : 'Email address *'} value={donorEmail} onChange={(event) => setDonorEmail(event.target.value)} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#690C07] focus:ring-2 focus:ring-[#690C07]/15" />
                </div>
                <label className="flex items-start gap-2 text-xs text-stone-600">
                  <input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} className="mt-0.5 rounded border-stone-300 text-[#690C07] focus:ring-[#690C07]" />
                  <span>{isFr ? 'Garder mon nom anonyme dans les publications publiques.' : 'Keep my name anonymous in public recognition.'}</span>
                </label>
              </div>

              <div className="rounded-2xl border border-[#E2D7C3] bg-[#FAF6EF] p-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-[#690C07]" />
                  <div>
                    <p className="text-sm font-bold text-stone-900">{isFr ? 'Paiement par carte via Stripe' : 'Card payment via Stripe'}</p>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600">{isFr ? 'Les données bancaires sont saisies et traitées sur la page sécurisée de Stripe.' : 'Card details are entered and processed on Stripe’s secure checkout page.'}</p>
                  </div>
                </div>
              </div>

              <Button type="submit" variant="secondary" size="lg" fullWidth disabled={isProcessing} isLoading={isProcessing} loadingText={isFr ? 'Redirection sécurisée…' : 'Secure redirect…'} icon={<CreditCard className="h-5 w-5" />}>
                {isFr ? `Faire un don de $${Number.isFinite(amount) ? amount : 0} USD` : `Donate $${Number.isFinite(amount) ? amount : 0} USD`}
              </Button>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500">
                <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5 text-[#EFA62B]" /> SSL sécurisé</span>
                <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-[#EFA62B]" /> Stripe Checkout</span>
                <span className="flex items-center gap-1"><CreditCard className="h-3.5 w-3.5 text-[#EFA62B]" /> Carte bancaire</span>
              </div>
            </form>
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#690C07] to-[#232826] p-8 text-white shadow-lg">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#EFA62B]/20 blur-3xl" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#EFA62B]"><Sparkles className="h-4 w-4" /> {isFr ? 'Votre impact' : 'Your impact'}</span>
                  <span className="text-2xl font-extrabold">${Number.isFinite(amount) ? amount : 0}</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm"><p className="text-sm font-medium leading-relaxed text-stone-100">{getImpactDescription(Number.isFinite(amount) ? amount : 0)}</p></div>
                <div className="space-y-3 text-xs text-stone-300">
                  <p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#EFA62B]" /> {isFr ? 'Un paiement unique, sans abonnement caché.' : 'A one-time payment with no hidden subscription.'}</p>
                  <p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#EFA62B]" /> {isFr ? 'Une redirection Stripe rapide et chiffrée.' : 'Fast, encrypted Stripe Checkout.'}</p>
                  <p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#EFA62B]" /> {isFr ? 'Un reçu envoyé après confirmation.' : 'A receipt sent after confirmation.'}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
