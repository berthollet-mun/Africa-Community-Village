import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  AlertCircle,
  KeyRound,
  Mail,
  UserCheck,
  ArrowRight
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export const AdminLoginModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setAdminModalOpen,
    isAdminAuthenticated,
    adminUser,
    loginAdmin,
    logoutAdmin,
    language,
    navigateTo
  } = useApp();
  const isFr = language === 'fr';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAdminModalOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const success = await loginAdmin(email, password);
      if (!success) {
        setError(
          isFr
            ? 'Identifiants invalides. Vérifiez l’adresse courriel et le mot de passe.'
            : 'Invalid credentials. Please verify your email and password.'
        );
      } else {
        setAdminModalOpen(false);
        navigateTo('/admin/dashboard');
      }
    } catch {
      setError(isFr ? 'Erreur de connexion au serveur.' : 'Server connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 relative">
          <button
            onClick={() => setAdminModalOpen(false)}
            className="absolute top-5 right-5 text-stone-400 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-white/20 overflow-hidden shadow-md p-0.5">
              <BrandLogo size={72} sizes="48px" className="w-full h-full object-contain rounded-lg" priority />
            </div>
            <div>
              <span className="text-[10px] font-label uppercase font-bold tracking-widest text-amber-400">
                Africa Community Village
              </span>
              <h2 className="text-xl font-bold font-display text-white">
                {isAdminAuthenticated
                  ? (isFr ? 'Session Administrateur' : 'Administrator Session')
                  : (isFr ? 'Connexion Espace Admin' : 'Admin Portal Login')}
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {isAdminAuthenticated && adminUser ? (
            /* Logged in state */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-[#EFA62B]/20 text-[#690C07] rounded-full flex items-center justify-center mx-auto">
                <UserCheck className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-label uppercase tracking-wider text-[#690C07] font-bold bg-[#690C07]/10 px-3 py-1 rounded-full border border-[#690C07]/20">
                  {adminUser.role.toUpperCase()}
                </span>
                <h3 className="text-xl font-bold font-display text-stone-900 mt-2">
                  {adminUser.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">{adminUser.email}</p>
              </div>

              <div className="p-4 bg-[#FAF6EF] rounded-2xl border border-[#E2D7C3] text-xs text-stone-600 text-left space-y-1 font-label">
                <div>
                  <strong>{isFr ? 'Statut Privilèges :' : 'Access Privilege:'}</strong>{' '}
                  <span className="text-[#0E7490] font-bold">
                    {isFr ? 'Authentifié (CRUD complet)' : 'Authenticated (Full Access)'}
                  </span>
                </div>
                <div>
                  <strong>{isFr ? 'Dernière session :' : 'Active Session:'}</strong>{' '}
                  {new Date().toLocaleDateString()}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setAdminModalOpen(false);
                    navigateTo('/admin/dashboard');
                  }}
                  className="flex-1 py-2.5 bg-[#690C07] hover:bg-[#520905] text-white rounded-lg text-xs font-label uppercase font-bold tracking-wider cursor-pointer shadow-sm"
                >
                  {isFr ? 'Ouvrir le Back-Office' : 'Open CMS Dashboard'}
                </button>
                <button
                  onClick={() => logoutAdmin()}
                  className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-label uppercase font-bold tracking-wider border border-rose-200 cursor-pointer"
                >
                  {isFr ? 'Déconnexion' : 'Log Out'}
                </button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-1.5">
                  {isFr ? 'Adresse Courriel' : 'Admin Email'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-acv-green/20 focus:border-acv-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-1.5">
                  {isFr ? 'Mot de passe' : 'Password'}
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-acv-green/20 focus:border-acv-green"
                  />
                </div>
              </div>

              <p className="text-[11px] text-stone-500 leading-relaxed">
                {isFr
                  ? 'Utilisez les identifiants sécurisés fournis par l’administrateur ACV.'
                  : 'Use the secure credentials supplied by the ACV administrator.'}
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#690C07] hover:bg-[#520905] text-white font-bold rounded-lg text-xs font-label uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>{isFr ? 'Authentification...' : 'Authenticating...'}</span>
                ) : (
                  <>
                    <span>{isFr ? 'Se Connecter à l’Administration' : 'Access Admin Panel'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
