import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Heart, Loader2, Mail, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Button } from '../common/Button';

type SessionSummary = Awaited<ReturnType<typeof api.checkout.getSession>>['data'];

export const DonateSuccessPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const isFr = language === 'fr';
  const [session, setSession] = useState<SessionSummary | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setError(isFr ? 'Référence de paiement manquante.' : 'Missing payment reference.');
      return;
    }

    let active = true;
    api.checkout
      .getSession(sessionId)
      .then((response) => {
        if (active) setSession(response.data);
      })
      .catch((requestError: Error) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, [isFr, sessionId]);

  const amount = session?.amountTotal ? (session.amountTotal / 100).toFixed(2) : null;
  const confirmed = session?.paymentStatus === 'paid';

  return (
    <div className="min-h-[70vh] bg-[#F3EDE1] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#E2D7C3] bg-white p-8 text-center shadow-xl sm:p-12">
        {!session && !error && (
          <div className="space-y-5">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#690C07]" />
            <h1 className="text-2xl font-extrabold text-stone-900">
              {isFr ? 'Vérification du paiement…' : 'Verifying your payment…'}
            </h1>
          </div>
        )}

        {error && (
          <div className="space-y-6">
            <ShieldCheck className="mx-auto h-14 w-14 text-[#690C07]" />
            <h1 className="text-3xl font-extrabold text-stone-900">
              {isFr ? 'Confirmation indisponible' : 'Confirmation unavailable'}
            </h1>
            <p className="text-stone-600">{error}</p>
            <Button onClick={() => navigateTo('/donate#donation-form')}>
              {isFr ? 'Retour au formulaire' : 'Back to donation form'}
            </Button>
          </div>
        )}

        {session && (
          <div className="space-y-7">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              {confirmed ? <CheckCircle2 className="h-11 w-11" /> : <ShieldCheck className="h-11 w-11" />}
            </div>
            <div>
              <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-[#690C07]">
                {confirmed ? (isFr ? 'Paiement confirmé' : 'Payment confirmed') : (isFr ? 'Paiement en traitement' : 'Payment processing')}
              </p>
              <h1 className="mt-3 text-3xl font-extrabold text-stone-900 sm:text-4xl">
                {isFr ? 'Merci pour votre solidarité !' : 'Thank you for your solidarity!'}
              </h1>
              {amount && <p className="mt-3 text-2xl font-bold text-[#690C07]">${amount} {session.currency?.toUpperCase()}</p>}
            </div>
            <p className="text-stone-600">
              {isFr
                ? 'Votre soutien renforce directement les initiatives communautaires portées par la jeunesse dans l’Est de la RDC.'
                : 'Your support directly strengthens youth-led community initiatives in Eastern DRC.'}
            </p>
            {session.donorEmail && (
              <p className="flex items-center justify-center gap-2 text-sm text-stone-500">
                <Mail className="h-4 w-4" />
                {isFr ? `Un reçu Stripe a été envoyé à ${session.donorEmail}.` : `A Stripe receipt was sent to ${session.donorEmail}.`}
              </p>
            )}
            <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
              <Button onClick={() => navigateTo('/')} icon={<Heart className="h-4 w-4" />}>
                {isFr ? 'Retour à l’accueil' : 'Back home'}
              </Button>
              <Button variant="secondary" onClick={() => navigateTo('/programs')}>
                {isFr ? 'Découvrir nos programmes' : 'Explore our programs'}
              </Button>
            </div>
            <p className="break-all font-mono text-[10px] text-stone-400">{session.id}</p>
          </div>
        )}
      </div>
    </div>
  );
};
