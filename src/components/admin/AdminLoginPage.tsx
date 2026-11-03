import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminLoginPage: React.FC = () => {
  const { language, loginAdmin, navigateTo } = useApp();
  const isFr = language === 'fr';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const success = await loginAdmin(email.trim(), password);
      if (success) {
        navigateTo('/admin/dashboard');
        return;
      }

      setError(
        isFr
          ? 'Identifiants invalides. Vérifiez votre adresse courriel et votre mot de passe.'
          : 'Invalid credentials. Check your email address and password.'
      );
    } catch {
      setError(
        isFr
          ? 'La connexion au serveur a échoué. Veuillez réessayer.'
          : 'The server connection failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F3EDE1] px-4 py-10 text-[#232826] sm:px-6 sm:py-14">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full items-center justify-center sm:min-h-[calc(100vh-7rem)]">
        <div className="w-full max-w-[620px]">
          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2.5 font-label text-xs font-extrabold uppercase tracking-wider text-stone-700 shadow-sm hover:border-[#690C07]/40 hover:bg-[#FAF6EF] hover:text-[#690C07]"
          >
            <ArrowLeft className="h-4 w-4" />
            {isFr ? 'Retour au site public' : 'Back to public site'}
          </button>

          <div className="w-full overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-2xl shadow-stone-900/10">
            <div className="border-b border-stone-100 bg-[#FAF6EF] px-6 py-6 sm:px-10 sm:py-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#690C07] text-white shadow-lg shadow-[#690C07]/20">
                  <LockKeyhole className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-label text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#690C07]">
                    {isFr ? 'Back-office sécurisé' : 'Secure back office'}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-extrabold text-stone-950 sm:text-3xl">
                    {isFr ? 'Connexion administrateur' : 'Administrator login'}
                  </h2>
                </div>
              </div>
            </div>

            <form method="post" onSubmit={handleLogin} className="space-y-6 px-6 py-7 sm:px-10 sm:py-10">
              <p className="text-sm leading-6 text-stone-600 sm:text-base">
                {isFr
                  ? 'Saisissez les identifiants fournis par l’administrateur principal ACV.'
                  : 'Enter the credentials supplied by the ACV lead administrator.'}
              </p>

              {error && (
                <div
                  id="admin-page-login-error"
                  role="alert"
                  className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-800"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="admin-email" className="mb-2 block font-label text-xs font-extrabold uppercase tracking-wider text-stone-700">
                  {isFr ? 'Adresse courriel' : 'Email address'}
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                  <input
                    id="admin-email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    required
                    autoFocus
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'admin-page-login-error' : undefined}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="bwiraelie95@gmail.com"
                    className="h-14 w-full rounded-2xl border border-stone-300 bg-stone-50 pl-12 pr-4 text-base text-stone-950 outline-hidden transition focus:border-[#690C07] focus:bg-white focus:ring-4 focus:ring-[#690C07]/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admin-password" className="mb-2 block font-label text-xs font-extrabold uppercase tracking-wider text-stone-700">
                  {isFr ? 'Mot de passe' : 'Password'}
                </label>
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                  <input
                    id="admin-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'admin-page-login-error' : undefined}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••••••"
                    className="h-14 w-full rounded-2xl border border-stone-300 bg-stone-50 pl-12 pr-14 text-base text-stone-950 outline-hidden transition focus:border-[#690C07] focus:bg-white focus:ring-4 focus:ring-[#690C07]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-stone-500 hover:bg-stone-200 hover:text-stone-800"
                    aria-label={showPassword ? (isFr ? 'Masquer le mot de passe' : 'Hide password') : (isFr ? 'Afficher le mot de passe' : 'Show password')}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#690C07] px-6 py-4 font-label text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-[#690C07]/20 hover:bg-[#520905] disabled:cursor-wait disabled:opacity-65"
              >
                <span>{loading ? (isFr ? 'Authentification…' : 'Authenticating…') : (isFr ? 'Accéder à l’administration' : 'Open administration')}</span>
                {!loading && <ArrowRight className="h-5 w-5" />}
              </button>

              <div className="flex items-center justify-center gap-2 border-t border-stone-100 pt-5 text-center text-xs leading-5 text-stone-500">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#14798B]" />
                <span>{isFr ? 'Connexion chiffrée • Session protégée pendant 8 heures' : 'Encrypted login • Session protected for 8 hours'}</span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
