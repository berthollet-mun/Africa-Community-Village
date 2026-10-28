import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../translations/translations';
import {
  LayoutDashboard,
  Layers,
  FileText,
  Users,
  Compass,
  Heart,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  Eye,
  LogOut,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  Shield,
  ArrowLeft,
  X,
  Upload,
  Sparkles,
  RefreshCw,
  FolderOpen,
  Handshake,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Quote,
  Clock,
  Search,
  Copy,
  ExternalLink,
  AlertTriangle,
  Database
} from 'lucide-react';
import { DatabaseScriptTab } from './DatabaseScriptTab';
import {
  PageItem,
  BannerSlide,
  ProgramPillar,
  TeamMember,
  Founder,
  FieldAgent,
  GovernanceMember,
  Article,
  MediaItem,
  Partner,
  Donor,
  Testimonial,
  ImpactStat,
  AdminUser,
  SiteSettings
} from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    adminUser,
    logoutAdmin,
    language,
    navigateTo,
    uploadMedia,

    // Entities
    pages,
    addPage,
    updatePage,
    deletePage,

    banners,
    addBanner,
    updateBanner,
    deleteBanner,

    programs,
    addProgram,
    updateProgram,
    deleteProgram,

    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,

    founders,
    addFounder,
    updateFounder,
    deleteFounder,

    fieldStaff,
    addFieldStaff,
    updateFieldStaff,
    deleteFieldStaff,

    governance,
    addGovernance,
    updateGovernance,
    deleteGovernance,

    articles,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,

    media,
    deleteMedia,

    partners,
    addPartner,
    updatePartner,
    deletePartner,

    donors,
    addDonation,

    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,

    stats,
    addStat,
    updateStat,
    deleteStat,

    siteSettings,
    updateSiteSettings,

    auditLogs,

    contactSubmissions,
    markContactRead,

    adminUsers,
    addAdminUser,
    updateAdminUser,
    deleteAdminUser,

    dashboardStats,
    refreshDashboardStats,
    triggerActionLoading
  } = useApp();

  const isFr = language === 'fr';
  const isSuperAdmin = adminUser?.role === 'super-admin';

  type AdminTab =
    | 'overview'
    | 'pages'
    | 'banners'
    | 'programs'
    | 'team'
    | 'founders'
    | 'fieldStaff'
    | 'governance'
    | 'articles'
    | 'media'
    | 'partners'
    | 'donors'
    | 'testimonials'
    | 'stats'
    | 'inbox'
    | 'users'
    | 'settings'
    | 'audit'
    | 'database';

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal editing states
  const [editingBanner, setEditingBanner] = useState<BannerSlide | null>(null);
  const [bannerPageFilter, setBannerPageFilter] = useState<string>('all');
  const [editingProgram, setEditingProgram] = useState<ProgramPillar | null>(null);
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [editingFounder, setEditingFounder] = useState<Founder | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [editingStat, setEditingStat] = useState<ImpactStat | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [uploading, setUploading] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Device File Upload Handler
  const handleDeviceUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetCallback?: (url: string) => void) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      const uploaded = await uploadMedia(e.target.files);
      if (uploaded.length > 0) {
        showToast(isFr ? `${uploaded.length} fichier(s) téléversé(s) avec succès !` : `${uploaded.length} file(s) uploaded successfully!`);
        if (targetCallback) {
          targetCallback(uploaded[0].url);
        }
      }
    } catch {
      showToast(isFr ? 'Erreur lors du téléversement.' : 'Upload error occurred.');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    showToast(isFr ? 'URL copiée dans le presse-papiers !' : 'URL copied to clipboard!');
  };

  const unreadMessages = contactSubmissions.filter((submission) => submission.read !== true).length;
  const draftArticles = articles.filter((article) => article.status !== 'published').length;
  const inactiveBanners = banners.filter(
    (banner) => banner.active === false || banner.isActive === false
  ).length;
  const pendingActions = unreadMessages + draftArticles + inactiveBanners;

  return (
    <div className="bg-[#F3EDE1] min-h-screen flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#232826] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-label uppercase tracking-wider font-bold animate-fade-in border border-[#EFA62B]/50">
          <CheckCircle2 className="w-4 h-4 text-[#EFA62B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header */}
      <header className="bg-[#232826] text-white border-b border-stone-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
            <div className="flex items-center gap-2 sm:gap-4 overflow-hidden min-w-0">
              <button
                onClick={() => navigateTo('/')}
                className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors text-xs font-label uppercase tracking-wider cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{isFr ? 'Retour au site public' : 'Back to Public Site'}</span>
                <span className="sm:hidden">{isFr ? 'Site' : 'Site'}</span>
              </button>
              <span className="text-stone-700 shrink-0">|</span>
              <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EFA62B] animate-pulse shrink-0" />
                <span className="hidden md:inline text-xs font-bold font-label uppercase tracking-widest text-white truncate">
                  ACV Back-Office CMS • {adminUser?.role.toUpperCase()}
                </span>
                <span className="md:hidden text-[11px] font-bold font-label uppercase tracking-wider text-white truncate">
                  ACV CMS
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              {/* Quick file upload button directly in topbar */}
              <label className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#690C07] hover:bg-[#520905] text-white text-[11px] sm:text-xs font-label uppercase font-bold tracking-wider cursor-pointer transition-colors shrink-0 shadow-sm">
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{uploading ? (isFr ? 'Envoi...' : 'Uploading...') : (isFr ? 'Téléverser Média' : 'Upload File')}</span>
                <span className="sm:hidden">{uploading ? '...' : (isFr ? 'Upload' : 'Upload')}</span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleDeviceUpload(e)}
                />
              </label>

              <div className="text-right hidden md:block">
                <div className="text-xs font-bold text-white">{adminUser?.name}</div>
                <div className="text-[10px] text-stone-400 font-label">{adminUser?.email}</div>
              </div>

              <button
                onClick={() => {
                  logoutAdmin();
                  navigateTo('/');
                }}
                className="p-1.5 sm:p-2 rounded-lg bg-stone-800 hover:bg-rose-900 text-stone-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title={isFr ? 'Déconnexion' : 'Log Out'}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Creative Navigation Sidebar (Matching Kinship & Vitality UI) */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-stone-200/90 p-3.5 shadow-xs space-y-1 sticky top-20">
              {/* Mobile collapse / expand indicator header */}
              <div
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-between p-2.5 mb-2 rounded-2xl bg-stone-50 border border-stone-200/80 cursor-pointer transition-colors hover:bg-stone-100"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EFA62B] animate-pulse" />
                  <span className="text-xs font-bold font-label uppercase tracking-wider text-stone-800">
                    {isFr ? 'Menu de Navigation' : 'Navigation Menu'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-500 text-[11px] font-bold font-label uppercase">
                  <span>{isMobileMenuOpen ? (isFr ? 'Masquer' : 'Collapse') : (isFr ? 'Afficher' : 'Expand')}</span>
                  {isMobileMenuOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              <div className={`space-y-1 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
                {/* 1. ANALYTICS & DASHBOARD */}
                <div className="px-3 pt-2 pb-1 text-[11px] font-label uppercase font-extrabold text-stone-400 tracking-wider">
                  {isFr ? 'Tableau de bord & Analyses' : 'Analytics & Dashboard'}
                </div>

                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-label uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-[#690C07] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-[#FAF6EF] hover:text-[#690C07]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{isFr ? 'Vue d’Ensemble' : 'Overview Dashboard'}</span>
                  </div>
                </button>

                {/* 2. CONTENT & PROGRAMS */}
                <div className="px-3 pt-3.5 pb-1 text-[11px] font-label uppercase font-extrabold text-stone-400 tracking-wider">
                  {isFr ? 'Contenus & Programmes' : 'Content & Programs'}
                </div>

                {[
                  { id: 'banners', labelEn: 'Banners & Hero', labelFr: 'Bannières & Hero', icon: <Layers className="w-4 h-4" />, count: banners.length },
                  { id: 'programs', labelEn: '5 Pillars & KPIs', labelFr: '5 Piliers & Métriques', icon: <Sparkles className="w-4 h-4" />, count: programs.length },
                  { id: 'articles', labelEn: 'Articles & Field Notes', labelFr: 'Articles & Récits', icon: <FileText className="w-4 h-4" />, count: articles.length },
                  { id: 'pages', labelEn: 'Static Pages', labelFr: 'Pages Statiques', icon: <Compass className="w-4 h-4" />, count: pages.length || 7 },
                  { id: 'media', labelEn: 'Media Library', labelFr: 'Médiathèque', icon: <FolderOpen className="w-4 h-4" />, count: media.length }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as AdminTab)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-label uppercase tracking-wider font-bold transition-all cursor-pointer ${
                      activeTab === item.id
                        ? 'bg-[#690C07] text-white shadow-xs'
                        : 'text-stone-700 hover:bg-[#FAF6EF] hover:text-[#690C07]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{isFr ? item.labelFr : item.labelEn}</span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        activeTab === item.id
                          ? 'bg-white/25 text-white'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                ))}

                {/* 3. PEOPLE & GOVERNANCE */}
                <div className="px-3 pt-3.5 pb-1 text-[11px] font-label uppercase font-extrabold text-stone-400 tracking-wider">
                  {isFr ? 'Communauté & Terrains' : 'People & Governance'}
                </div>

                {[
                  { id: 'team', labelEn: 'Our Team', labelFr: 'Équipe ACV', icon: <Users className="w-4 h-4" />, count: teamMembers.length },
                  { id: 'founders', labelEn: 'Founders', labelFr: 'Fondateurs', icon: <ShieldCheck className="w-4 h-4" />, count: founders.length || 2 },
                  { id: 'fieldStaff', labelEn: 'Field Agents', labelFr: 'Staff Terrain', icon: <MapPin className="w-4 h-4" />, count: fieldStaff.length || 3 },
                  { id: 'governance', labelEn: 'Governance & Charters', labelFr: 'Gouvernance & Chartes', icon: <Shield className="w-4 h-4" />, count: governance.length || 2 },
                  { id: 'partners', labelEn: 'Partners', labelFr: 'Partenaires', icon: <Handshake className="w-4 h-4" />, count: partners.length || 3 },
                  { id: 'testimonials', labelEn: 'Field Stories', labelFr: 'Témoignages', icon: <Quote className="w-4 h-4" />, count: testimonials.length || 2 }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as AdminTab)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-label uppercase tracking-wider font-bold transition-all cursor-pointer ${
                      activeTab === item.id
                        ? 'bg-[#690C07] text-white shadow-xs'
                        : 'text-stone-700 hover:bg-[#FAF6EF] hover:text-[#690C07]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{isFr ? item.labelFr : item.labelEn}</span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        activeTab === item.id
                          ? 'bg-white/25 text-white'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                ))}

                {/* 4. OPERATIONS & SYSTEM */}
                <div className="px-3 pt-3.5 pb-1 text-[11px] font-label uppercase font-extrabold text-stone-400 tracking-wider">
                  {isFr ? 'Finance, Base de Données & Système' : 'Operations, Database & System'}
                </div>

                {[
                  { id: 'database', labelEn: 'Database Script & Export', labelFr: 'Script Base de Données (SQL)', icon: <Database className="w-4 h-4 text-[#EFA62B]" />, badge: 'SQL' },
                  { id: 'inbox', labelEn: 'Inquiries', labelFr: 'Boîte de Réception', icon: <MessageSquare className="w-4 h-4" />, count: contactSubmissions.filter((c) => !c.read).length, unread: true },
                  { id: 'donors', labelEn: 'Donations Ledger', labelFr: 'Registre des Dons', icon: <Heart className="w-4 h-4" />, count: donors.length },
                  { id: 'stats', labelEn: 'Impact Counters', labelFr: 'Compteurs d’Impact', icon: <TrendingUp className="w-4 h-4" />, count: stats.length || 4 },
                  { id: 'settings', labelEn: 'Settings', labelFr: 'Paramètres du Site', icon: <Settings className="w-4 h-4" /> },
                  { id: 'audit', labelEn: 'Audit Log', labelFr: 'Journal d’Audit', icon: <Clock className="w-4 h-4" /> }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as AdminTab)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-label uppercase tracking-wider font-bold transition-all cursor-pointer ${
                      activeTab === item.id
                        ? 'bg-[#690C07] text-white shadow-xs'
                        : 'text-stone-700 hover:bg-[#FAF6EF] hover:text-[#690C07]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{isFr ? item.labelFr : item.labelEn}</span>
                    </div>
                    {item.badge ? (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-label ${
                        activeTab === item.id ? 'bg-[#EFA62B] text-[#232826]' : 'bg-[#EFA62B]/20 text-[#690C07]'
                      }`}>
                        {item.badge}
                      </span>
                    ) : item.count !== undefined ? (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          activeTab === item.id
                            ? 'bg-white/25 text-white'
                            : item.unread && item.count > 0
                            ? 'bg-rose-500 text-white font-bold'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </button>
                ))}

                {isSuperAdmin && (
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-label uppercase tracking-wider font-bold transition-all cursor-pointer ${
                      activeTab === 'users'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-amber-800 hover:bg-amber-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isFr ? 'Utilisateurs Admin (Super)' : 'Admin Users (Super)'}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs bg-amber-100 text-amber-900 font-bold">
                      {adminUsers.length}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content Workspace */}
          <main className="lg:col-span-9 space-y-6">
            {/* 1. OVERVIEW DASHBOARD */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('inbox')}
                    className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs text-left transition-all hover:-translate-y-0.5 hover:border-[#690C07]/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#690C07]"
                  >
                    <span className="text-[10px] font-label uppercase font-bold text-stone-400">
                      {isFr ? 'Messages non lus' : 'Unread Messages'}
                    </span>
                    <div className="text-3xl font-extrabold font-label text-[#690C07] mt-1">
                      {unreadMessages}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {contactSubmissions.length} {isFr ? 'messages reçus' : 'messages received'}
                    </div>
                  </button>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs">
                    <span className="text-[10px] font-label uppercase font-bold text-stone-400">
                      {isFr ? 'Articles & Actualités' : 'Dispatches & Notes'}
                    </span>
                    <div className="text-3xl font-extrabold font-label text-stone-900 mt-1">
                      {articles.length}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {articles.filter((a) => a.status === 'published').length} {isFr ? 'publiés' : 'published'}
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs">
                    <span className="text-[10px] font-label uppercase font-bold text-stone-400">
                      {isFr ? 'Fonds Collectés (USD)' : 'Total Gifts Logged'}
                    </span>
                    <div className="text-3xl font-extrabold font-label text-amber-600 mt-1">
                      ${donors.reduce((sum, d) => sum + (Number(d.amount) || 0), 0)}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {donors.length} {isFr ? 'donateurs enregistrés' : 'donations logged'}
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs">
                    <span className="text-[10px] font-label uppercase font-bold text-stone-400">
                      {isFr ? 'Bannières Dynamiques' : 'Active Banners'}
                    </span>
                    <div className="text-3xl font-extrabold font-label text-cyan-700 mt-1">
                      {banners.filter((b) => b.active).length}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {banners.length} {isFr ? 'slides configurées' : 'total configured'}
                    </div>
                  </div>
                </div>

                {/* Operational Priorities */}
                <div
                  className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start gap-4 ${
                    pendingActions > 0
                      ? 'bg-amber-50 border-amber-200 text-amber-950'
                      : 'bg-teal-50 border-teal-200 text-teal-950'
                  }`}
                >
                  {pendingActions > 0 ? (
                    <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6 text-teal-700 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm">
                      {pendingActions > 0
                        ? (isFr ? 'À traiter maintenant' : 'Needs Attention')
                        : (isFr ? 'Tout est à jour' : 'Everything Is Up to Date')}
                    </h4>
                    <p className="text-xs opacity-80 mt-1">
                      {isFr
                        ? 'Accédez directement aux contenus qui nécessitent une action.'
                        : 'Open the content that currently needs an action.'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab('inbox')}
                        className="rounded-xl border border-current/15 bg-white/70 px-3 py-2 text-left hover:bg-white transition-colors"
                      >
                        <span className="block text-lg font-extrabold font-label">{unreadMessages}</span>
                        <span className="block text-[10px] font-label uppercase tracking-wide opacity-75">
                          {isFr ? 'Messages non lus' : 'Unread messages'}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('articles')}
                        className="rounded-xl border border-current/15 bg-white/70 px-3 py-2 text-left hover:bg-white transition-colors"
                      >
                        <span className="block text-lg font-extrabold font-label">{draftArticles}</span>
                        <span className="block text-[10px] font-label uppercase tracking-wide opacity-75">
                          {isFr ? 'Articles en brouillon' : 'Draft articles'}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('banners')}
                        className="rounded-xl border border-current/15 bg-white/70 px-3 py-2 text-left hover:bg-white transition-colors"
                      >
                        <span className="block text-lg font-extrabold font-label">{inactiveBanners}</span>
                        <span className="block text-[10px] font-label uppercase tracking-wide opacity-75">
                          {isFr ? 'Bannières désactivées' : 'Inactive banners'}
                        </span>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => refreshDashboardStats()}
                    className="p-2 rounded-lg bg-white border border-current/20 hover:bg-white/70 transition-colors shrink-0"
                    title={isFr ? 'Actualiser' : 'Refresh'}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Actions Shortcuts */}
                <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
                  <h3 className="text-sm font-label uppercase tracking-widest font-bold text-stone-700">
                    {isFr ? 'Raccourcis de Gestion Rapide' : 'Direct Action Shortcuts'}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                      onClick={() => setActiveTab('banners')}
                      className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left text-xs font-label uppercase font-bold text-stone-800 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>+ {isFr ? 'Bannière' : 'Banner'}</span>
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </button>
                    <button
                      onClick={() => setActiveTab('articles')}
                      className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left text-xs font-label uppercase font-bold text-stone-800 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>+ {isFr ? 'Article' : 'Dispatch'}</span>
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </button>
                    <button
                      onClick={() => setActiveTab('team')}
                      className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left text-xs font-label uppercase font-bold text-stone-800 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>+ {isFr ? 'Membre' : 'Team'}</span>
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </button>
                    <button
                      onClick={() => setActiveTab('media')}
                      className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left text-xs font-label uppercase font-bold text-stone-800 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>{isFr ? 'Médiathèque' : 'Media Library'}</span>
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </button>
                  </div>
                </div>

                {/* Recent Inquiries & Recent Audit */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Messages */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-label uppercase tracking-widest font-bold text-stone-900">
                        {isFr ? 'Derniers Messages' : 'Recent Inquiries'}
                      </h4>
                      <button
                        onClick={() => setActiveTab('inbox')}
                        className="text-xs text-[#690C07] font-bold font-label uppercase hover:underline"
                      >
                        {isFr ? 'Voir tout' : 'View all'}
                      </button>
                    </div>
                    <div className="space-y-3">
                      {contactSubmissions.slice(0, 3).map((sub) => (
                        <div key={sub.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                          <div className="flex items-center justify-between font-bold text-stone-800">
                            <span>{sub.name}</span>
                            <span className="text-[10px] text-stone-400 font-label">{sub.date}</span>
                          </div>
                          <div className="text-stone-500 line-clamp-1 mt-0.5">{sub.subject}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Audit Logs */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-label uppercase tracking-widest font-bold text-stone-900">
                        {isFr ? 'Journal des Activités Récentes' : 'Recent Audit Trail'}
                      </h4>
                      <button
                        onClick={() => setActiveTab('audit')}
                        className="text-xs text-[#690C07] font-bold font-label uppercase hover:underline"
                      >
                        {isFr ? 'Voir tout' : 'View all'}
                      </button>
                    </div>
                    <div className="space-y-3">
                      {auditLogs.slice(0, 3).map((log) => (
                        <div key={log.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                          <div className="flex items-center justify-between font-bold text-stone-800">
                            <span className="capitalize">{log.action} • {log.entity}</span>
                            <span className="text-[10px] text-stone-400 font-label">{log.timestamp?.split('T')[0]}</span>
                          </div>
                          <div className="text-stone-500 line-clamp-1 mt-0.5">{log.details}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. BANNER & HERO MANAGER */}
            {activeTab === 'banners' && (
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] animate-pulse"></span>
                      <span className="text-[11px] font-label font-bold uppercase tracking-wider text-amber-700">
                        {isFr ? 'Design Système « Kinship & Vitality »' : 'Kinship & Vitality Hero System'}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold font-display text-stone-900 mt-1">
                      {isFr ? 'Gestion des Hero Bannières & Carrousels' : 'Carousel & Hero Banner Manager'}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isFr
                        ? 'Chaque page principale dispose d’un carrousel immersif auto-play avec transitions fluides, navigation tactile et textes bilingues.'
                        : 'Every main page features an immersive autoplay carousel inspired by the Mwali & Skinere design with full bilingual control.'}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingBanner({
                        id: `banner_${Date.now()}`,
                        pageRoute: bannerPageFilter !== 'all' ? bannerPageFilter : '/',
                        titleEn: 'When young people lead, communities transform.',
                        titleFr: 'Quand les jeunes prennent les rênes, les communautés se métamorphosent.',
                        subtitleEn: 'Youth-anchored civic regeneration and living village ecosystems across Goma and Virunga landscapes.',
                        subtitleFr: 'Régénération civique, agro-écologie et écosystèmes villageois vivants portés par la jeunesse à Goma et aux Virunga.',
                        image: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
                        imageUrl: '/assets/images/acv_hero_youth_community_1792692599382.jpg',
                        ctaTextEn: 'Explore Our Programs',
                        ctaTextFr: 'Découvrir nos programmes',
                        ctaLink: '/programs',
                        order: banners.length + 1,
                        active: true,
                        isActive: true
                      })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#690C07] hover:bg-[#520905] text-white text-xs font-label uppercase font-bold tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isFr ? 'Créer une Bannière' : 'Add Banner Slide'}</span>
                  </button>
                </div>

                {/* Page Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-100">
                  <span className="text-xs font-label font-bold text-stone-400 uppercase tracking-wider shrink-0 mr-1">
                    {isFr ? 'Filtrer par Page :' : 'Filter by Page:'}
                  </span>
                  {[
                    { id: 'all', labelEn: 'All Pages', labelFr: 'Toutes les pages' },
                    { id: '/', labelEn: 'Home (/)', labelFr: 'Accueil (/)' },
                    { id: '/about', labelEn: 'About (/about)', labelFr: 'À Propos (/about)' },
                    { id: '/programs', labelEn: 'Programs (/programs)', labelFr: 'Programmes (/programs)' },
                    { id: '/approach', labelEn: 'Approach (/approach)', labelFr: 'Approche (/approach)' },
                    { id: '/blog', labelEn: 'Blog (/blog)', labelFr: 'Blog (/blog)' },
                    { id: '/contact', labelEn: 'Contact (/contact)', labelFr: 'Contact (/contact)' },
                    { id: '/donate', labelEn: 'Donate (/donate)', labelFr: 'Don (/donate)' }
                  ].map((filterTab) => {
                    const isSelected = bannerPageFilter === filterTab.id;
                    const count =
                      filterTab.id === 'all'
                        ? banners.length
                        : banners.filter((b) => {
                            const r = (b.pageRoute || (b as any).page_assignment || '').toLowerCase();
                            return r === filterTab.id || (filterTab.id === '/' && r === 'home');
                          }).length;

                    return (
                      <button
                        key={filterTab.id}
                        onClick={() => setBannerPageFilter(filterTab.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-label font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#690C07] text-white shadow-xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        <span>{isFr ? filterTab.labelFr : filterTab.labelEn}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Banner Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {banners
                    .filter((slide) => {
                      if (bannerPageFilter === 'all') return true;
                      const r = (slide.pageRoute || (slide as any).page_assignment || '').toLowerCase();
                      return r === bannerPageFilter || (bannerPageFilter === '/' && r === 'home');
                    })
                    .sort((a, b) => a.order - b.order)
                    .map((slide) => {
                      const isActive = slide.active !== false && slide.isActive !== false;
                      const slideImg = slide.imageUrl || slide.image || '/assets/aistudio/4_289670c0.PNG';

                      return (
                        <div
                          key={slide.id}
                          className={`rounded-2xl border transition-all overflow-hidden bg-stone-50 flex flex-col justify-between ${
                            isActive ? 'border-stone-200 shadow-xs' : 'border-dashed border-stone-300 opacity-70'
                          }`}
                        >
                          {/* Card Image Header with Overlay Badges */}
                          <div className="relative aspect-16/9 bg-stone-900 overflow-hidden group">
                            <img
                              src={slideImg}
                              alt={slide.titleEn}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Scrim */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            <div className="absolute top-3 left-3 flex items-center gap-2">
                              <span className="bg-black/80 backdrop-blur-md text-amber-300 border border-white/10 text-[10px] font-label font-bold uppercase px-2.5 py-1 rounded-full">
                                {slide.pageRoute || (slide as any).page_assignment || '/'}
                              </span>
                              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-label font-bold px-2 py-0.5 rounded-full">
                                #{slide.order}
                              </span>
                            </div>

                            <div className="absolute top-3 right-3 flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  updateBanner(slide.id, {
                                    active: !isActive,
                                    isActive: !isActive
                                  });
                                  showToast(
                                    isActive
                                      ? (isFr ? 'Bannière désactivée (Brouillon).' : 'Banner set to Draft.')
                                      : (isFr ? 'Bannière activée (En ligne).' : 'Banner published.')
                                  );
                                }}
                                className={`text-[10px] font-label uppercase px-2.5 py-1 rounded-full font-bold cursor-pointer transition-colors shadow-xs ${
                                  isActive
                                    ? 'bg-[#0E7490] hover:bg-[#095368] text-white'
                                    : 'bg-stone-600 hover:bg-stone-700 text-stone-200'
                                }`}
                              >
                                {isActive ? (isFr ? 'En Ligne' : 'Active') : (isFr ? 'Brouillon' : 'Draft')}
                              </button>
                            </div>

                            {/* Title overlay teaser */}
                            <div className="absolute bottom-3 left-3 right-3 text-white">
                              <div className="text-sm font-bold font-display line-clamp-1 drop-shadow-sm">
                                {isFr ? slide.titleFr : slide.titleEn}
                              </div>
                            </div>
                          </div>

                          {/* Body info */}
                          <div className="p-4 space-y-2">
                            <div className="text-xs text-stone-600 line-clamp-2">
                              {isFr ? slide.subtitleFr : slide.subtitleEn}
                            </div>

                            {/* CTA preview tag */}
                            {(slide.ctaTextFr || slide.ctaTextEn) && (
                              <div className="flex items-center gap-2 pt-1 text-[11px] font-label text-[#690C07]">
                                <span className="px-2 py-0.5 bg-[#FAF6EF] border border-[#E2D7C3] rounded font-bold truncate">
                                  CTA : {isFr ? slide.ctaTextFr : slide.ctaTextEn} ↗
                                </span>
                                <span className="text-stone-400 font-mono text-[10px] truncate">
                                  {slide.ctaLink || '/programs'}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Action Footer */}
                          <div className="px-4 py-2.5 bg-white border-t border-stone-200 flex items-center justify-between">
                            {/* Reorder Up / Down */}
                            <div className="flex items-center gap-1 text-stone-500">
                              <span className="text-[10px] font-label uppercase font-bold mr-1">
                                {isFr ? 'Ordre :' : 'Order:'}
                              </span>
                              <button
                                onClick={() => {
                                  const newOrder = Math.max(1, slide.order - 1);
                                  updateBanner(slide.id, { order: newOrder });
                                  showToast(isFr ? `Ordre mis à jour : #${newOrder}` : `Order updated: #${newOrder}`);
                                }}
                                className="p-1 hover:bg-stone-100 rounded text-stone-700 cursor-pointer"
                                title="Move Up"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-mono text-xs font-bold text-stone-800 px-1">
                                {slide.order}
                              </span>
                              <button
                                onClick={() => {
                                  const newOrder = slide.order + 1;
                                  updateBanner(slide.id, { order: newOrder });
                                  showToast(isFr ? `Ordre mis à jour : #${newOrder}` : `Order updated: #${newOrder}`);
                                }}
                                className="p-1 hover:bg-stone-100 rounded text-stone-700 cursor-pointer"
                                title="Move Down"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setEditingBanner(slide)}
                                className="inline-flex items-center gap-1.5 text-xs font-label uppercase font-bold text-[#690C07] hover:text-[#520905] cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>{isFr ? 'Modifier' : 'Edit'}</span>
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(isFr ? 'Supprimer définitivement cette bannière ?' : 'Delete this banner slide?')) {
                                    deleteBanner(slide.id);
                                    showToast(isFr ? 'Bannière supprimée.' : 'Banner deleted.');
                                  }
                                }}
                                className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* 3. PROGRAMS & 5 PILLARS */}
            {activeTab === 'programs' && (
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <h2 className="text-xl font-bold font-display text-stone-900">
                      {isFr ? 'Gestion des 5 Piliers Stratégiques' : 'Manage 5 Core Pillars & KPIs'}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isFr
                        ? 'Éditez les descriptions, objectifs concrets et indicateurs vérifiés sur le terrain.'
                        : 'Update field metrics, detailed descriptions, and objectives for all 5 pillars.'}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingProgram({
                        id: `pillar_${Date.now()}`,
                        slug: 'new-pillar',
                        titleEn: 'New Strategic Pillar',
                        titleFr: 'Nouveau Pilier Stratégique',
                        shortDescEn: 'Description of the new intervention area.',
                        shortDescFr: 'Description de ce nouveau domaine d’intervention.',
                        fullDescEn: 'Comprehensive details on objectives and field methodology...',
                        fullDescFr: 'Détails exhaustifs sur la méthodologie et les objectifs...',
                        image: '/assets/aistudio/4_289670c0.PNG',
                        order: programs.length + 1,
                        metrics: [{ value: '500+', labelEn: 'beneficiaries', labelFr: 'bénéficiaires' }]
                      })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#690C07] hover:bg-[#520905] text-white text-xs font-label uppercase font-bold tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isFr ? 'Ajouter un Pilier' : 'Add Pillar'}</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {programs.map((prog) => (
                    <div key={prog.id} className="p-6 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-xs font-label uppercase font-bold text-amber-700">
                            Pillar #{prog.order} • /{prog.slug}
                          </span>
                          <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                            {isFr ? prog.titleFr : prog.titleEn}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProgram(prog)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-label uppercase font-bold text-[#690C07] hover:text-[#520905] cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>{isFr ? 'Modifier' : 'Edit Pillar'}</span>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(isFr ? 'Supprimer ce programme ?' : 'Delete this program?')) {
                                deleteProgram(prog.id);
                                showToast(isFr ? 'Programme supprimé.' : 'Program deleted.');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-400 hover:text-rose-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">
                        {isFr ? prog.shortDescFr || prog.descriptionFr : prog.shortDescEn || prog.descriptionEn}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        {prog.metrics?.map((m, idx) => (
                          <div key={idx} className="p-2.5 bg-white rounded-xl border border-stone-200 text-center">
                            <div className="text-base font-extrabold font-label text-[#690C07]">
                              {m.value}
                            </div>
                            <div className="text-[10px] text-stone-500 truncate mt-0.5">
                              {isFr ? m.labelFr : m.labelEn}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. ARTICLES & FIELD NOTES */}
            {activeTab === 'articles' && (
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <h2 className="text-xl font-bold font-display text-stone-900">
                      {isFr ? 'Articles & Actualités du Terrain' : 'Field Dispatches & Publications'}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isFr
                        ? 'Rédigez, modifiez et publiez des analyses de terrain bilingues avec téléversement d’images.'
                        : 'Draft, publish, and edit field reports with bilingual titles and image upload.'}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingArticle({
                        id: `art_${Date.now()}`,
                        slug: 'new-dispatch',
                        titleEn: 'New Field Dispatch from Goma',
                        titleFr: 'Nouvelle Dépêche du Terrain à Goma',
                        excerptEn: 'Summary of frontline community initiatives...',
                        excerptFr: 'Résumé des initiatives citoyennes du front...',
                        contentEn: 'Full article text regarding ACV youth operations...',
                        contentFr: 'Texte complet sur les opérations des jeunes d’ACV...',
                        coverImage: '/assets/aistudio/7_ee54323c.PNG',
                        author: adminUser?.name || 'ACV Communications',
                        category: 'Youth Leadership',
                        tags: ['Goma', 'Youth', 'Agroecology'],
                        readTime: '4 min read',
                        publishDate: new Date().toISOString().split('T')[0],
                        status: 'published'
                      })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#690C07] hover:bg-[#520905] text-white text-xs font-label uppercase font-bold tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isFr ? 'Rédiger un Article' : 'Write Dispatch'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {articles.map((art) => (
                    <div key={art.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={art.coverImage || art.image || '/assets/aistudio/8_5185b9b0.PNG'}
                          alt={art.titleEn}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-label uppercase font-bold px-2 py-0.5 rounded bg-[#FAF6EF] text-[#690C07] border border-[#E2D7C3]">
                              {art.category}
                            </span>
                            <span className="text-xs text-stone-400 font-label">{art.publishDate || art.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-stone-900 mt-1">
                            {isFr ? art.titleFr : art.titleEn}
                          </h4>
                          <p className="text-xs text-stone-500">{art.author} • {art.readTime}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => setEditingArticle(art)}
                          className="p-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-[#690C07] hover:border-[#690C07] transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(isFr ? 'Supprimer cet article ?' : 'Delete this post?')) {
                              deleteBlogPost(art.id);
                              showToast(isFr ? 'Article supprimé.' : 'Post deleted.');
                            }
                          }}
                          className="p-2 rounded-lg bg-white border border-stone-200 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. OUR TEAM & FOUNDERS */}
            {activeTab === 'team' && (
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <h2 className="text-xl font-bold font-display text-stone-900">
                      {isFr ? 'Équipe de Coordination ACV' : 'ACV Team & Leadership Roster'}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isFr
                        ? 'Ajoutez et mettez à jour les fiches profils avec téléversement de photo depuis votre appareil.'
                        : 'Manage staff profiles, biographies, and photos uploaded directly from device.'}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingTeam({
                        id: `tm_${Date.now()}`,
                        firstName: 'Prénom',
                        lastName: 'Nom',
                        roleEn: 'Coordinator',
                        roleFr: 'Coordinateur',
                        bioEn: 'Dedicated to youth empowerment in North Kivu.',
                        bioFr: 'Engagé dans l’autonomisation des jeunes au Nord-Kivu.',
                        photoUrl: '/assets/brand/acv-logo.jpeg',
                        category: 'Staff',
                        order: teamMembers.length + 1
                      })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#690C07] hover:bg-[#520905] text-white text-xs font-label uppercase font-bold tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isFr ? 'Ajouter un Membre' : 'Add Team Member'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 flex flex-col justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.photoUrl || member.image || '/assets/brand/acv-logo.jpeg'}
                          alt={member.name || `${member.firstName} ${member.lastName}`}
                          className="w-14 h-14 rounded-full object-cover shrink-0 border border-stone-300"
                        />
                        <div className="truncate">
                          <h4 className="text-sm font-bold text-stone-900 truncate">
                            {member.name || `${member.firstName} ${member.lastName}`}
                          </h4>
                          <p className="text-xs text-[#690C07] font-medium truncate">
                            {isFr ? member.roleFr : member.roleEn}
                          </p>
                          <span className="text-[10px] text-stone-400 font-label uppercase">
                            {member.category}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-stone-200 flex items-center justify-between text-xs font-label">
                        <button
                          onClick={() => setEditingTeam(member)}
                          className="text-[#690C07] font-bold uppercase hover:underline cursor-pointer"
                        >
                          {isFr ? 'Modifier' : 'Edit'}
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(isFr ? 'Supprimer ce membre ?' : 'Delete this member?')) {
                              deleteTeamMember(member.id);
                              showToast(isFr ? 'Membre supprimé.' : 'Member deleted.');
                            }
                          }}
                          className="text-stone-400 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. FOUNDERS */}
            {activeTab === 'founders' && (
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <h2 className="text-xl font-bold font-display text-stone-900">
                      {isFr ? 'Fondateurs d’Africa Community Village' : 'Founders Directory'}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isFr
                        ? 'Profils historiques des fondateurs visibles sur /about/our-story et /about/our-team.'
                        : 'Historical founder profiles featured on Our Story and Leadership pages.'}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingFounder({
                        id: `founder_${Date.now()}`,
                        fullName: 'Nouveau Fondateur',
                        roleEn: 'Co-Founder',
                        roleFr: 'Co-Fondateur',
                        bioEn: 'Visionary co-founder of ACV in Goma.',
                        bioFr: 'Co-fondateur engagé d’ACV à Goma.',
                        photoUrl: '/assets/brand/acv-logo.jpeg',
                        yearsActive: '2023 - Présent',
                        order: founders.length + 1,
                        status: 'visible'
                      })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#690C07] hover:bg-[#520905] text-white text-xs font-label uppercase font-bold tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isFr ? 'Ajouter un Fondateur' : 'Add Founder'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {founders.map((f) => (
                    <div key={f.id} className="p-6 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-4">
                      <div className="flex items-center gap-4">
                        <img src={f.photoUrl} alt={f.fullName} className="w-16 h-16 rounded-full object-cover border border-amber-300" />
                        <div>
                          <h4 className="text-base font-bold text-stone-900">{f.fullName}</h4>
                          <p className="text-xs text-amber-700 font-medium">{isFr ? f.roleFr : f.roleEn}</p>
                          <span className="text-[10px] text-stone-400 font-label">{f.yearsActive}</span>
                        </div>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed italic">
                        « {isFr ? f.bioFr : f.bioEn} »
                      </p>
                      <div className="pt-2 border-t border-stone-200 flex justify-end gap-2">
                        <button
                          onClick={() => setEditingFounder(f)}
                          className="px-3 py-1 bg-white border border-stone-200 rounded text-xs font-label uppercase font-bold text-[#690C07] hover:underline cursor-pointer"
                        >
                          {isFr ? 'Modifier' : 'Edit'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. MEDIA LIBRARY (DEVICE UPLOADS & FILE PREVIEW) */}
            {activeTab === 'media' && (
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <h2 className="text-xl font-bold font-display text-stone-900">
                      {isFr ? 'Médiathèque Centrale (Images, Vidéos, PDF)' : 'Central Media Library'}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isFr
                        ? 'Téléversez des fichiers depuis votre appareil (JPG, PNG, WEBP, PDF). Copiez l’URL pour l’insérer partout.'
                        : 'Upload assets directly from device. Copy URL to use in any article, banner, or program.'}
                    </p>
                  </div>

                  {/* Drag & Drop Input button */}
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#690C07] hover:bg-[#520905] text-white text-xs font-label uppercase font-bold tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs">
                    <Upload className="w-4 h-4" />
                    <span>{uploading ? (isFr ? 'Téléversement en cours...' : 'Uploading...') : (isFr ? 'Téléverser depuis l’Appareil' : 'Upload From Device')}</span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleDeviceUpload(e)}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {media.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-stone-200 bg-stone-50 overflow-hidden flex flex-col justify-between group">
                      <div className="aspect-16/10 bg-stone-900 relative overflow-hidden flex items-center justify-center">
                        {item.type === 'pdf' ? (
                          <div className="p-4 text-center text-white">
                            <FileText className="w-8 h-8 mx-auto text-amber-400 mb-1" />
                            <span className="text-[10px] font-label uppercase font-bold">Document PDF</span>
                          </div>
                        ) : (
                          <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        )}
                        <span className="absolute top-2 right-2 bg-black/70 text-white text-[9px] font-label uppercase px-1.5 py-0.5 rounded">
                          {item.type}
                        </span>
                      </div>

                      <div className="p-3">
                        <div className="text-xs font-bold text-stone-800 truncate" title={item.title}>
                          {item.title}
                        </div>
                        <div className="text-[10px] text-stone-400 font-label">
                          {(item.sizeBytes / 1024).toFixed(0)} KB
                        </div>
                      </div>

                      <div className="px-3 py-2 bg-white border-t border-stone-200 flex items-center justify-between">
                        <button
                          onClick={() => copyToClipboard(item.url)}
                          className="text-[11px] font-label uppercase font-bold text-[#690C07] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>URL</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(isFr ? 'Supprimer ce fichier ?' : 'Delete this file?')) {
                              deleteMedia(item.id);
                              showToast(isFr ? 'Fichier supprimé.' : 'File deleted.');
                            }
                          }}
                          className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. INBOX / CONTACT SUBMISSIONS */}
            {activeTab === 'inbox' && (
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="pb-4 border-b border-stone-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-display text-stone-900">
                      {isFr ? 'Boîte de Réception des Messages' : 'Contact Inquiries & Correspondence'}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isFr
                        ? 'Messages envoyés via les formulaires de contact, #support et #partner.'
                        : 'Submissions delivered via contact form, #support, and #partner anchors.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {contactSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        sub.read ? 'bg-stone-50/70 border-stone-200' : 'bg-[#FDF3E3] border-[#EFA62B]/50 shadow-xs'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200/60">
                        <div className="flex items-center gap-2">
                          {!sub.read && <span className="w-2 h-2 rounded-full bg-[#EFA62B]" />}
                          <span className="font-bold text-stone-900 text-sm">{sub.name}</span>
                          <span className="text-xs text-stone-500 font-label">&lt;{sub.email}&gt;</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-label uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                            {sub.category}
                          </span>
                          <span className="text-xs text-stone-400 font-label">{sub.date}</span>
                        </div>
                      </div>

                      <div className="pt-3">
                        <div className="text-xs font-bold text-stone-800 mb-1">{sub.subject}</div>
                        <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-wrap">{sub.message}</p>
                        {sub.phone && <div className="text-[11px] text-stone-500 mt-2 font-label">Tel: {sub.phone}</div>}
                      </div>

                      {!sub.read && (
                        <div className="pt-3 mt-3 border-t border-stone-200/60 flex justify-end">
                          <button
                            onClick={() => {
                              markContactRead(sub.id);
                              showToast(isFr ? 'Marqué comme lu.' : 'Marked as read.');
                            }}
                            className="text-xs font-label uppercase font-bold text-[#690C07] hover:text-[#520905] cursor-pointer"
                          >
                            {isFr ? 'Marquer comme lu' : 'Mark as Read'}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. DONATIONS LEDGER */}
            {activeTab === 'donors' && (
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="pb-4 border-b border-stone-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-display text-stone-900">
                      {isFr ? 'Registre des Dons Solidaires' : 'Solidarity Donations Ledger'}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isFr ? 'Dons enregistrés par Mobile Money, carte ou virement.' : 'Real-time record of all gifts and pledges.'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-label uppercase text-stone-400 block font-bold">
                      {isFr ? 'Total Collecté' : 'Total Raised'}
                    </span>
                    <span className="text-xl font-extrabold font-label text-[#690C07]">
                      ${donors.reduce((sum, d) => sum + (Number(d.amount) || 0), 0)} USD
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-label">
                    <thead className="bg-stone-50 border-b border-stone-200 uppercase text-stone-500">
                      <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Donor</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Allocation</th>
                        <th className="p-3">Route</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {donors.map((d) => (
                        <tr key={d.id} className="hover:bg-stone-50">
                          <td className="p-3 font-bold text-stone-800">{d.id}</td>
                          <td className="p-3 font-bold text-stone-900">{d.name || d.donorName}</td>
                          <td className="p-3 font-bold text-[#690C07] text-sm">${d.amount} {d.currency || 'USD'}</td>
                          <td className="p-3">{d.pillarAllocation || d.pillar}</td>
                          <td className="p-3">{d.paymentMethod}</td>
                          <td className="p-3 text-stone-400">{d.donationDate || d.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 10. PARTNERS */}
            {activeTab === 'partners' && (
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <h2 className="text-xl font-bold font-display text-stone-900">
                    {isFr ? 'Gestion des Partenaires' : 'Institutional Partners'}
                  </h2>
                  <button
                    onClick={() =>
                      setEditingPartner({
                        id: `part_${Date.now()}`,
                        name: 'Nouveau Partenaire',
                        logoUrl: '/assets/aistudio/8_a0add9a7.PNG',
                        type: 'Technique',
                        order: partners.length + 1,
                        status: 'active'
                      })
                    }
                    className="px-4 py-2 bg-[#690C07] hover:bg-[#520905] text-white text-xs font-label uppercase font-bold tracking-wider rounded-lg cursor-pointer"
                  >
                    + {isFr ? 'Ajouter Partenaire' : 'Add Partner'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {partners.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={p.logoUrl} alt={p.name} className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-stone-200" />
                        <div>
                          <div className="font-bold text-stone-900 text-sm">{p.name}</div>
                          <span className="text-[10px] font-label uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                            {p.type}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm(isFr ? 'Supprimer ce partenaire ?' : 'Delete partner?')) {
                            deletePartner(p.id);
                            showToast(isFr ? 'Partenaire supprimé.' : 'Partner deleted.');
                          }
                        }}
                        className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. SITE SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="pb-4 border-b border-stone-100">
                  <h2 className="text-xl font-bold font-display text-stone-900">
                    {isFr ? 'Paramètres Généraux du Site' : 'Site Configuration & Global Settings'}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {isFr ? 'Coordonnées officielles affichées dans l’en-tête, le pied de page et les reçus.' : 'Official coordinates displayed in header, footer, and receipts.'}
                  </p>
                </div>

                <div className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-1.5">
                      {isFr ? 'Adresse physique du siège' : 'Headquarters Address'}
                    </label>
                    <input
                      type="text"
                      value={siteSettings.address}
                      onChange={(e) => updateSiteSettings({ address: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-1.5">
                        {isFr ? 'Courriel officiel' : 'Official Email'}
                      </label>
                      <input
                        type="email"
                        value={siteSettings.email}
                        onChange={(e) => updateSiteSettings({ email: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-label uppercase font-bold text-stone-700 mb-1.5">
                        {isFr ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="text"
                        value={siteSettings.phone}
                        onChange={(e) => updateSiteSettings({ phone: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => showToast(isFr ? 'Paramètres enregistrés !' : 'Settings saved successfully!')}
                      className="px-6 py-2.5 bg-[#690C07] hover:bg-[#520905] text-white rounded-lg text-xs font-label uppercase font-bold tracking-wider cursor-pointer"
                    >
                      {isFr ? 'Enregistrer les Modifications' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 12. AUDIT LOG */}
            {activeTab === 'audit' && (
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="pb-4 border-b border-stone-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-display text-stone-900">
                      {isFr ? 'Journal d’Audit & Traçabilité' : 'Complete Audit Trail'}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isFr ? 'Historique chronologique de chaque modification CRUD.' : 'Chronological record of every write action.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs font-label space-y-1">
                      <div className="flex items-center justify-between font-bold text-stone-800">
                        <span className="text-[#690C07] uppercase tracking-wider">{log.action} • {log.entity}</span>
                        <span className="text-stone-400 font-normal">{log.timestamp}</span>
                      </div>
                      <div className="text-stone-700 font-semibold">{log.details}</div>
                      <div className="text-[10px] text-stone-400">{log.userName} &lt;{log.userEmail}&gt; {log.ipAddress && `• IP: ${log.ipAddress}`}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 13. ADMIN USERS (SUPER-ADMIN ONLY) */}
            {activeTab === 'users' && isSuperAdmin && (
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div>
                    <h2 className="text-xl font-bold font-display text-stone-900">
                      {isFr ? 'Gestion des Utilisateurs Administrateurs' : 'Admin User Access Control'}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isFr ? 'Gestion des comptes et rôles : super-admin, admin, editor, viewer.' : 'Super-admin privilege: manage roles and access tiers.'}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingUser({
                        id: `user_${Date.now()}`,
                        name: 'Nouvel Administrateur',
                        email: 'agent@acv-drc.org',
                        role: 'editor',
                        status: 'active'
                      })
                    }
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-label uppercase font-bold tracking-wider rounded-lg cursor-pointer"
                  >
                    + {isFr ? 'Ajouter Utilisateur' : 'Add User'}
                  </button>
                </div>

                <div className="space-y-3">
                  {adminUsers.map((u) => (
                    <div key={u.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-stone-900 text-sm">{u.name}</div>
                        <div className="text-xs text-stone-500 font-label">{u.email}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-label uppercase font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                          {u.role}
                        </span>
                        {u.role !== 'super-admin' && (
                          <button
                            onClick={() => {
                              if (window.confirm(isFr ? 'Supprimer cet utilisateur ?' : 'Delete user?')) {
                                deleteAdminUser(u.id);
                                showToast(isFr ? 'Utilisateur supprimé.' : 'User deleted.');
                              }
                            }}
                            className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 14. DATABASE & SQL SCRIPT EXPORT */}
            {activeTab === 'database' && (
              <DatabaseScriptTab isFr={isFr} showToast={showToast} />
            )}
          </main>
        </div>
      </div>

      {/* EDIT BANNER MODAL WITH LIVE PREVIEW & DEVICE FILE UPLOAD */}
      {editingBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-label font-bold uppercase tracking-widest text-[#D97706]">
                  {isFr ? 'Éditeur de Hero Banner' : 'Hero Banner Editor'}
                </span>
                <h3 className="text-lg font-bold font-display text-stone-900">
                  {isFr ? 'Configurer la Bannière Immensive' : 'Configure Immersive Banner'}
                </h3>
              </div>
              <button onClick={() => setEditingBanner(null)} className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* LIVE PREVIEW BOX (Mwali & Skinere Style) */}
            <div className="space-y-2">
              <span className="text-[10px] font-label font-bold uppercase tracking-wider text-stone-500 block">
                {isFr ? 'Aperçu en direct (Style Mwali & Skinere) :' : 'Live Visual Preview:'}
              </span>
              <div className="relative aspect-16/8 sm:aspect-16/7 w-full rounded-2xl overflow-hidden bg-stone-900 shadow-md border border-stone-200">
                <img
                  src={editingBanner.image || (editingBanner as any).imageUrl || '/assets/aistudio/4_289670c0.PNG'}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {/* Dual Scrim */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                {/* Content preview */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 w-fit mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                    <span className="text-[9px] font-label uppercase font-bold tracking-wider text-amber-200">
                      {editingBanner.pageRoute || '/'}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base sm:text-xl line-clamp-1 leading-snug">
                    {isFr ? editingBanner.titleFr || editingBanner.titleEn : editingBanner.titleEn || editingBanner.titleFr}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-200/90 line-clamp-1 mt-1 font-light">
                    {isFr ? editingBanner.subtitleFr || editingBanner.subtitleEn : editingBanner.subtitleEn || editingBanner.subtitleFr}
                  </p>
                  {(editingBanner.ctaTextFr || editingBanner.ctaTextEn) && (
                    <div className="mt-2.5">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#690C07] text-[10px] font-label font-bold text-white shadow-xs">
                        <span>{isFr ? editingBanner.ctaTextFr || editingBanner.ctaTextEn : editingBanner.ctaTextEn || editingBanner.ctaTextFr}</span>
                        <span>↗</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const payload = {
                  ...editingBanner,
                  imageUrl: editingBanner.image || (editingBanner as any).imageUrl,
                  image: editingBanner.image || (editingBanner as any).imageUrl,
                  isActive: editingBanner.active !== false,
                  active: editingBanner.active !== false
                };
                triggerActionLoading(
                  isFr ? 'Enregistrement de la bannière...' : 'Saving banner...',
                  isFr ? 'En attente d’une suite favorable...' : 'Awaiting confirmation...'
                );
                updateBanner(payload);
                showToast(isFr ? 'Bannière enregistrée avec succès !' : 'Banner saved successfully!');
                setEditingBanner(null);
              }}
              className="space-y-4 text-xs font-label"
            >
              {/* Page Route Selector */}
              <div>
                <label className="block uppercase font-bold text-stone-700 mb-1">
                  {isFr ? 'Page d’affectation (Page Assignment)' : 'Page Assignment'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={
                      ['/', '/about', '/programs', '/approach', '/blog', '/contact', '/donate'].includes(editingBanner.pageRoute)
                        ? editingBanner.pageRoute
                        : 'custom'
                    }
                    onChange={(e) => {
                      if (e.target.value !== 'custom') {
                        setEditingBanner({ ...editingBanner, pageRoute: e.target.value });
                      }
                    }}
                    className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  >
                    <option value="/">Accueil / (Home)</option>
                    <option value="/about">À Propos /about (About)</option>
                    <option value="/programs">Programmes /programs (Programs)</option>
                    <option value="/approach">Approche /approach (Approach)</option>
                    <option value="/blog">Blog /blog (Dispatches)</option>
                    <option value="/contact">Contact /contact (Contact)</option>
                    <option value="/donate">Faire un Don /donate (Donate)</option>
                    <option value="custom">Route personnalisée...</option>
                  </select>
                  <input
                    type="text"
                    required
                    value={editingBanner.pageRoute}
                    onChange={(e) => setEditingBanner({ ...editingBanner, pageRoute: e.target.value })}
                    className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    placeholder="e.g. /, /about, /programs/education-youth"
                  />
                </div>
              </div>

              {/* Bilingual Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Titre Principal (FR)</label>
                  <input
                    type="text"
                    required
                    value={editingBanner.titleFr || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, titleFr: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    placeholder="Ex: Quand les jeunes mènent..."
                  />
                </div>
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Headline Title (EN)</label>
                  <input
                    type="text"
                    required
                    value={editingBanner.titleEn || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, titleEn: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    placeholder="Ex: When young people lead..."
                  />
                </div>
              </div>

              {/* Bilingual Subtitles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Sous-titre Descriptif (FR)</label>
                  <textarea
                    rows={2}
                    value={editingBanner.subtitleFr || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, subtitleFr: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    placeholder="Texte secondaire descriptif..."
                  />
                </div>
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Descriptive Subtitle (EN)</label>
                  <textarea
                    rows={2}
                    value={editingBanner.subtitleEn || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, subtitleEn: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    placeholder="Secondary descriptive text..."
                  />
                </div>
              </div>

              {/* Bilingual CTA Text & Link */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Texte Bouton CTA (FR)</label>
                  <input
                    type="text"
                    value={editingBanner.ctaTextFr || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, ctaTextFr: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    placeholder="Ex: Découvrir nos programmes"
                  />
                </div>
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">CTA Button Text (EN)</label>
                  <input
                    type="text"
                    value={editingBanner.ctaTextEn || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, ctaTextEn: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    placeholder="Ex: Explore Our Programs"
                  />
                </div>
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Lien Redirection (CTA Link)</label>
                  <input
                    type="text"
                    value={editingBanner.ctaLink || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, ctaLink: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono text-[11px]"
                    placeholder="Ex: /programs ou /donate"
                  />
                </div>
              </div>

              {/* Image URL & Device File Upload */}
              <div>
                <label className="block uppercase font-bold text-stone-700 mb-1">
                  {isFr ? 'Image de fond (URL ou Téléversement de l’appareil)' : 'Background Image (URL or Device Upload)'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={editingBanner.image || (editingBanner as any).imageUrl || ''}
                    onChange={(e) =>
                      setEditingBanner({
                        ...editingBanner,
                        image: e.target.value,
                        imageUrl: e.target.value
                      } as any)
                    }
                    className="flex-1 p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono text-[11px]"
                    placeholder="https://... ou /assets/..."
                  />
                  <label className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0 shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isFr ? 'Choisir Fichier' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleDeviceUpload(e, (url) =>
                          setEditingBanner({
                            ...editingBanner,
                            image: url,
                            imageUrl: url
                          } as any)
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Order & Active Switch */}
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center gap-2">
                  <label className="font-bold text-stone-700 uppercase">
                    {isFr ? 'Ordre d’apparition :' : 'Priority Order:'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingBanner.order}
                    onChange={(e) => setEditingBanner({ ...editingBanner, order: Number(e.target.value) })}
                    className="w-16 p-1.5 bg-white border border-stone-200 rounded text-center font-bold"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-800">
                  <input
                    type="checkbox"
                    checked={editingBanner.active !== false && editingBanner.isActive !== false}
                    onChange={(e) =>
                      setEditingBanner({
                        ...editingBanner,
                        active: e.target.checked,
                        isActive: e.target.checked
                      })
                    }
                    className="w-4 h-4 rounded text-[#690C07] focus:ring-[#690C07]"
                  />
                  <span>{isFr ? 'Activer et afficher sur le site' : 'Active (Visible on public site)'}</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingBanner(null)}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold cursor-pointer"
                >
                  {isFr ? 'Annuler' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#690C07] hover:bg-[#520905] text-white rounded-xl font-bold cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isFr ? 'Enregistrer la Bannière' : 'Save Banner'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT ARTICLE MODAL */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-lg font-bold font-display text-stone-900">
                {isFr ? 'Rédiger / Modifier un Article' : 'Edit Article Dispatch'}
              </h3>
              <button onClick={() => setEditingArticle(null)} className="text-stone-400 hover:text-stone-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBlogPost(editingArticle);
                showToast(isFr ? 'Article sauvegardé !' : 'Article saved!');
                setEditingArticle(null);
              }}
              className="space-y-4 text-xs font-label"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Title (EN)</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.titleEn}
                    onChange={(e) => setEditingArticle({ ...editingArticle, titleEn: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Titre (FR)</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.titleFr}
                    onChange={(e) => setEditingArticle({ ...editingArticle, titleFr: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={editingArticle.author}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-bold text-stone-700 mb-1">Cover Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingArticle.coverImage || editingArticle.image || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, coverImage: e.target.value })}
                    className="flex-1 p-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-[11px]"
                  />
                  <label className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg cursor-pointer flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleDeviceUpload(e, (url) => setEditingArticle({ ...editingArticle, coverImage: url }))}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block uppercase font-bold text-stone-700 mb-1">Content (EN)</label>
                <textarea
                  rows={4}
                  value={editingArticle.contentEn}
                  onChange={(e) => setEditingArticle({ ...editingArticle, contentEn: e.target.value })}
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-stone-700 mb-1">Contenu (FR)</label>
                <textarea
                  rows={4}
                  value={editingArticle.contentFr}
                  onChange={(e) => setEditingArticle({ ...editingArticle, contentFr: e.target.value })}
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#690C07] hover:bg-[#520905] text-white rounded-lg font-bold cursor-pointer"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TEAM MEMBER MODAL */}
      {editingTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-lg font-bold font-display text-stone-900">
                {isFr ? 'Modifier la Fiche Membre' : 'Edit Team Profile'}
              </h3>
              <button onClick={() => setEditingTeam(null)} className="text-stone-400 hover:text-stone-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateTeamMember(editingTeam);
                showToast(isFr ? 'Profil mis à jour !' : 'Profile updated!');
                setEditingTeam(null);
              }}
              className="space-y-4 text-xs font-label"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">First Name / Prénom</label>
                  <input
                    type="text"
                    required
                    value={editingTeam.firstName || editingTeam.name?.split(' ')[0] || ''}
                    onChange={(e) => setEditingTeam({ ...editingTeam, firstName: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Last Name / Nom</label>
                  <input
                    type="text"
                    required
                    value={editingTeam.lastName || editingTeam.name?.split(' ')[1] || ''}
                    onChange={(e) => setEditingTeam({ ...editingTeam, lastName: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Role (EN)</label>
                  <input
                    type="text"
                    required
                    value={editingTeam.roleEn}
                    onChange={(e) => setEditingTeam({ ...editingTeam, roleEn: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block uppercase font-bold text-stone-700 mb-1">Rôle (FR)</label>
                  <input
                    type="text"
                    required
                    value={editingTeam.roleFr}
                    onChange={(e) => setEditingTeam({ ...editingTeam, roleFr: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-bold text-stone-700 mb-1">Photo Upload from Device</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingTeam.photoUrl || editingTeam.image || ''}
                    onChange={(e) => setEditingTeam({ ...editingTeam, photoUrl: e.target.value })}
                    className="flex-1 p-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-[11px]"
                  />
                  <label className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg cursor-pointer flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleDeviceUpload(e, (url) => setEditingTeam({ ...editingTeam, photoUrl: url }))}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingTeam(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#690C07] hover:bg-[#520905] text-white rounded-lg font-bold cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
