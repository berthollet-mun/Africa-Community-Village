import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  X,
  AlertCircle,
  KeyRound,
  Mail,
  UserCheck,
  ShieldAlert,
  Sparkles,
  ArrowRight
} from 'lucide-react';

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

  const [email, setEmail] = useState('bertholletmunihire@gmail.com');
  const [password, setPassword] = useState('1 penguin');
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

  const handleQuickFill = (role: 'super' | 'founder' | 'editor' | 'staff') => {
    setError(null);
    if (role === 'staff') {
      setEmail('info@acv.fr');
      setPassword('acvstaff');
    } else if (role === 'super') {
      setEmail('bertholletmunihire@gmail.com');
      setPassword('1 penguin');
    } else if (role === 'founder') {
      setEmail('elie.bwira@acv-drc.org');
      setPassword('admin2026!');
    } else {
      setEmail('info@acv-drc.org');
      setPassword('admin2026!');
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
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Lock className="w-5 h-5" />
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

              {/* Quick Fill presets for evaluation */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
                <span className="text-[10px] font-label uppercase tracking-widest text-stone-500 font-bold block">
                  {isFr ? 'Rôles pré-configurés pour la démo :' : 'Preset Demo Credentials:'}
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('staff')}
                    className="py-1.5 px-1.5 bg-white hover:bg-[#F3EDE1] text-[#690C07] rounded border border-[#E2D7C3] text-[10px] font-label font-bold uppercase truncate cursor-pointer text-center"
                    title="info@acv.fr / acvstaff"
                  >
                    Staff/Info
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('super')}
                    className="py-1.5 px-1.5 bg-[#690C07] text-white hover:bg-[#520905] rounded border border-[#690C07] text-[10px] font-label font-bold uppercase truncate cursor-pointer text-center"
                    title="bertholletmunihire@gmail.com / 1 penguin"
                  >
                    Super-Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('founder')}
                    className="py-1.5 px-1.5 bg-white hover:bg-[#FDF3E3] text-[#EFA62B] rounded border border-[#EFA62B]/50 text-[10px] font-label font-bold uppercase truncate cursor-pointer text-center"
                    title="elie.bwira@acv-drc.org / admin2026!"
                  >
                    Fondateur
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('editor')}
                    className="py-1.5 px-1.5 bg-white hover:bg-[#E0F2FE] text-[#0E7490] rounded border border-[#0E7490]/40 text-[10px] font-label font-bold uppercase truncate cursor-pointer text-center"
                    title="info@acv-drc.org / admin2026!"
                  >
                    Éditeur
                  </button>
                </div>
                <div className="text-[10px] text-stone-500 space-y-0.5">
                  <div><strong>Staff / Informaticien :</strong> <code className="bg-stone-200 px-1 py-0.5 rounded">info@acv.fr</code> / <code className="bg-stone-200 px-1 py-0.5 rounded">acvstaff</code></div>
                  <div><strong>Super-Admin :</strong> <code className="bg-stone-200 px-1 py-0.5 rounded">bertholletmunihire@gmail.com</code> / <code className="bg-stone-200 px-1 py-0.5 rounded">1 penguin</code></div>
                </div>
              </div>

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
