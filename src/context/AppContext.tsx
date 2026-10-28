import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Language,
  PageRoute,
  AdminUser,
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
  SiteSettings,
  AuditLog,
  ContactSubmission,
  PolicyDocument,
  FieldNote
} from '../types';
import {
  defaultBanners,
  initialProgramPillars,
  initialTeamMembers,
  initialSiteSettings,
  initialAdminUsers,
  initialPolicyDocuments,
  initialBlogPosts,
  initialFieldNotes
} from '../data/mockData';
import { api, getAuthToken } from '../services/api';

export interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentRoute: PageRoute | string;
  navigateTo: (route: PageRoute | string) => void;

  // Admin Auth & Modal
  isAdminModalOpen: boolean;
  setAdminModalOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  currentUser: AdminUser | null;
  loginAdmin: (email: string, pass: string) => Promise<boolean>;
  logoutAdmin: () => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;

  // File Upload from device
  uploadMedia: (files: File[] | FileList) => Promise<MediaItem[]>;

  // Synchronized Dashboard Analytics
  dashboardStats: any;
  refreshDashboardStats: () => Promise<void>;

  // 17 Administrative Modules
  pages: PageItem[];
  addPage: (item: Partial<PageItem>) => Promise<PageItem>;
  updatePage: (id: string, partial: Partial<PageItem>) => Promise<void>;
  deletePage: (id: string) => Promise<void>;

  banners: BannerSlide[];
  addBanner: (banner: BannerSlide | Omit<BannerSlide, 'id'>) => Promise<void>;
  updateBanner: (banner: BannerSlide | string, partial?: Partial<BannerSlide>) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;

  programs: ProgramPillar[];
  addProgram: (item: Partial<ProgramPillar>) => Promise<ProgramPillar>;
  updateProgram: (program: ProgramPillar | string, partial?: Partial<ProgramPillar>) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;

  teamMembers: TeamMember[];
  addTeamMember: (member: TeamMember | Omit<TeamMember, 'id'>) => Promise<void>;
  updateTeamMember: (member: TeamMember | string, partial?: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  founders: Founder[];
  addFounder: (item: Partial<Founder>) => Promise<Founder>;
  updateFounder: (id: string, partial: Partial<Founder>) => Promise<void>;
  deleteFounder: (id: string) => Promise<void>;

  fieldStaff: FieldAgent[];
  addFieldStaff: (item: Partial<FieldAgent>) => Promise<FieldAgent>;
  updateFieldStaff: (id: string, partial: Partial<FieldAgent>) => Promise<void>;
  deleteFieldStaff: (id: string) => Promise<void>;

  governance: GovernanceMember[];
  addGovernance: (item: Partial<GovernanceMember>) => Promise<GovernanceMember>;
  updateGovernance: (id: string, partial: Partial<GovernanceMember>) => Promise<void>;
  deleteGovernance: (id: string) => Promise<void>;

  policies: PolicyDocument[];
  updatePolicy: (policy: PolicyDocument | string, partial?: Partial<PolicyDocument>) => void;

  blogPosts: Article[];
  articles: Article[];
  addBlogPost: (post: Article | Omit<Article, 'id'>) => Promise<void>;
  updateBlogPost: (post: Article | string, partial?: Partial<Article>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;

  fieldNotes: FieldNote[];
  addFieldNote: (note: FieldNote | Omit<FieldNote, 'id'>) => void;
  deleteFieldNote: (id: string) => void;

  media: MediaItem[];
  deleteMedia: (id: string) => Promise<void>;

  partners: Partner[];
  addPartner: (item: Partial<Partner>) => Promise<Partner>;
  updatePartner: (id: string, partial: Partial<Partner>) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;

  donors: Donor[];
  donations: Donor[];
  addDonation: (donation: Donor | Omit<Donor, 'id'>) => Promise<void>;

  testimonials: Testimonial[];
  addTestimonial: (item: Partial<Testimonial>) => Promise<Testimonial>;
  updateTestimonial: (id: string, partial: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  stats: ImpactStat[];
  addStat: (item: Partial<ImpactStat>) => Promise<ImpactStat>;
  updateStat: (id: string, partial: Partial<ImpactStat>) => Promise<void>;
  deleteStat: (id: string) => Promise<void>;

  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;

  auditLogs: AuditLog[];

  contactSubmissions: ContactSubmission[];
  addContactSubmission: (sub: ContactSubmission | Omit<ContactSubmission, 'id'>) => Promise<void>;
  markContactRead: (id: string) => Promise<void>;
  updateContactStatus: (id: string, status: ContactSubmission['status']) => Promise<void>;

  adminUsers: AdminUser[];
  addAdminUser: (item: Partial<AdminUser>) => Promise<AdminUser>;
  updateAdminUser: (id: string, partial: Partial<AdminUser>) => Promise<void>;
  deleteAdminUser: (id: string) => Promise<void>;

  resetToDefaults: () => Promise<void>;
  isLoading: boolean;

  actionLoading: {
    isOpen: boolean;
    message?: string;
    submessage?: string;
    status: 'loading' | 'success';
  };
  triggerActionLoading: (message?: string, submessage?: string, minDurationMs?: number) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode; initialRoute?: string }> = ({
  children,
  initialRoute = '/'
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = typeof window === 'undefined' ? null : localStorage.getItem('acv_lang');
    return saved === 'fr' || saved === 'en' ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('acv_lang', lang);
  };

  const [currentRoute, setCurrentRoute] = useState<PageRoute | string>(initialRoute);

  const navigateTo = (route: PageRoute | string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleRouteChange = () => {
      const nextRoute = window.location.pathname || '/';
      if (nextRoute !== currentRoute) setCurrentRoute(nextRoute);
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [currentRoute]);

  // Loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // CircleProgressIndicator Action Loading State
  const [actionLoading, setActionLoading] = useState<{
    isOpen: boolean;
    message?: string;
    submessage?: string;
    status: 'loading' | 'success';
  }>({
    isOpen: false,
    message: '',
    submessage: '',
    status: 'loading'
  });

  const triggerActionLoading = useCallback(
    async (message?: string, submessage?: string, minDurationMs: number = 750): Promise<void> => {
      setActionLoading({
        isOpen: true,
        message: message || (language === 'fr' ? 'Traitement de votre action...' : 'Processing your action...'),
        submessage: submessage || (language === 'fr' ? 'En attente d’une suite favorable...' : 'Awaiting confirmation...'),
        status: 'loading'
      });

      await new Promise((resolve) => setTimeout(resolve, minDurationMs));

      setActionLoading((prev) => ({
        ...prev,
        status: 'success',
        submessage: language === 'fr' ? 'Opération validée avec succès !' : 'Action confirmed successfully!'
      }));

      setTimeout(() => {
        setActionLoading((prev) => ({ ...prev, isOpen: false }));
      }, 550);
    },
    [language]
  );

  // Admin Auth state
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = typeof window === 'undefined' ? null : localStorage.getItem('acv_admin_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Entities state with initial fallbacks
  const [pages, setPages] = useState<PageItem[]>([]);
  const [banners, setBanners] = useState<BannerSlide[]>(defaultBanners);
  const [programs, setPrograms] = useState<ProgramPillar[]>(initialProgramPillars);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [founders, setFounders] = useState<Founder[]>([]);
  const [fieldStaff, setFieldStaff] = useState<FieldAgent[]>([]);
  const [governance, setGovernance] = useState<GovernanceMember[]>([]);
  const [policies, setPolicies] = useState<PolicyDocument[]>(initialPolicyDocuments);
  const [articles, setArticles] = useState<Article[]>(initialBlogPosts);
  const [fieldNotes, setFieldNotes] = useState<FieldNote[]>(initialFieldNotes);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<ImpactStat[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(initialAdminUsers);
  const [dashboardStats, setDashboardStats] = useState<any>(null);

  // Hydrate data from backend API
  const hydrateFromApi = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        settingsRes,
        bannersRes,
        programsRes,
        articlesRes,
        teamRes,
        foundersRes,
        fieldStaffRes,
        governanceRes,
        partnersRes,
        testimonialsRes,
        statsRes
      ] = await Promise.allSettled([
        api.public.getSettings(),
        api.public.getBanners(),
        api.public.getPrograms(),
        api.public.getArticles(),
        api.public.getTeam(),
        api.public.getFounders(),
        api.public.getFieldStaff(),
        api.public.getGovernance(),
        api.public.getPartners(),
        api.public.getTestimonials(),
        api.public.getStats()
      ]);

      if (settingsRes.status === 'fulfilled' && settingsRes.value.data) {
        setSiteSettings((prev) => ({ ...prev, ...settingsRes.value.data }));
      }
      if (bannersRes.status === 'fulfilled' && bannersRes.value.data?.length) {
        setBanners(bannersRes.value.data);
      }
      if (programsRes.status === 'fulfilled' && programsRes.value.data?.length) {
        setPrograms(programsRes.value.data);
      }
      if (articlesRes.status === 'fulfilled' && articlesRes.value.data?.length) {
        setArticles(articlesRes.value.data);
      }
      if (teamRes.status === 'fulfilled' && teamRes.value.data?.length) {
        setTeamMembers(teamRes.value.data);
      }
      if (foundersRes.status === 'fulfilled' && foundersRes.value.data?.length) {
        setFounders(foundersRes.value.data);
      }
      if (fieldStaffRes.status === 'fulfilled' && fieldStaffRes.value.data?.length) {
        setFieldStaff(fieldStaffRes.value.data);
      }
      if (governanceRes.status === 'fulfilled' && governanceRes.value.data?.length) {
        setGovernance(governanceRes.value.data);
      }
      if (partnersRes.status === 'fulfilled' && partnersRes.value.data?.length) {
        setPartners(partnersRes.value.data);
      }
      if (testimonialsRes.status === 'fulfilled' && testimonialsRes.value.data?.length) {
        setTestimonials(testimonialsRes.value.data);
      }
      if (statsRes.status === 'fulfilled' && statsRes.value.data?.length) {
        setStats(statsRes.value.data);
      }

      // If logged in as admin, fetch admin entities
      if (adminUser || getAuthToken()) {
        try {
          const [
            mediaRes,
            donorsRes,
            contactsRes,
            auditRes,
            usersRes,
            pagesRes
          ] = await Promise.allSettled([
            api.admin.list<MediaItem>('media'),
            api.admin.list<Donor>('donors'),
            api.admin.list<ContactSubmission>('contactSubmissions'),
            api.admin.list<AuditLog>('auditLogs'),
            api.admin.list<AdminUser>('users'),
            api.admin.list<PageItem>('pages')
          ]);

          if (mediaRes.status === 'fulfilled') setMedia(mediaRes.value.data);
          if (donorsRes.status === 'fulfilled') setDonors(donorsRes.value.data);
          if (contactsRes.status === 'fulfilled') setContactSubmissions(contactsRes.value.data);
          if (auditRes.status === 'fulfilled') setAuditLogs(auditRes.value.data);
          if (usersRes.status === 'fulfilled') setAdminUsers(usersRes.value.data);
          if (pagesRes.status === 'fulfilled') setPages(pagesRes.value.data);

          const dashRes = await api.dashboard.getStats();
          if (dashRes.success) setDashboardStats(dashRes.data);
        } catch (e) {
          console.warn('Admin hydration deferred:', e);
        }
      }
    } catch (err) {
      console.warn('API sync using offline fallback:', err);
    } finally {
      setIsLoading(false);
    }
  }, [adminUser]);

  useEffect(() => {
    hydrateFromApi();
  }, [hydrateFromApi]);

  const refreshDashboardStats = async () => {
    try {
      const res = await api.dashboard.getStats();
      if (res.success) {
        setDashboardStats(res.data);
      }
    } catch (err) {
      console.error('Failed to refresh dashboard stats:', err);
    }
  };

  // Auth methods
  const loginAdmin = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await api.auth.login(email, pass);
      if (res.success && res.user) {
        setAdminUser(res.user);
        localStorage.setItem('acv_admin_session', JSON.stringify(res.user));
        await refreshDashboardStats();
        hydrateFromApi();
        return true;
      }
    } catch (err) {
      console.warn('Admin authentication failed:', err);
    }

    return false;
  };

  const logoutAdmin = () => {
    api.auth.logout();
    setAdminUser(null);
    localStorage.removeItem('acv_admin_session');
  };

  const login = async (email: string, pass: string) => {
    const ok = await loginAdmin(email, pass);
    return { success: ok, error: ok ? undefined : 'Identifiants invalides' };
  };

  // Device file upload
  const uploadMedia = async (files: File[] | FileList): Promise<MediaItem[]> => {
    try {
      const res = await api.upload.uploadFiles(files);
      if (res.success && res.data) {
        const items = Array.isArray(res.data) ? res.data : [res.data];
        setMedia((prev) => [...items, ...prev]);
        return items;
      }
    } catch (err) {
      console.warn('Server upload failed, converting to object URL for demo session:', err);
    }

    // Local fallback for smooth offline demonstration
    const localItems: MediaItem[] = Array.from(files).map((file) => {
      const fakeUrl = URL.createObjectURL(file);
      return {
        id: `med_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        title: file.name,
        filename: file.name,
        url: fakeUrl,
        type: file.type.includes('pdf') ? 'pdf' : file.type.includes('video') ? 'video' : 'image',
        mimeType: file.type || 'image/jpeg',
        sizeBytes: file.size,
        altTextEn: file.name,
        altTextFr: file.name
      };
    });
    setMedia((prev) => [...localItems, ...prev]);
    return localItems;
  };

  // CRUD Implementations with API + Local optimistic update

  // Pages
  const addPage = async (item: Partial<PageItem>): Promise<PageItem> => {
    const newItem = {
      id: `page_${Date.now()}`,
      route: item.route || '/new-page',
      slug: item.slug || 'new-page',
      titleEn: item.titleEn || 'New Page',
      titleFr: item.titleFr || 'Nouvelle Page',
      status: item.status || 'published',
      order: pages.length + 1,
      ...item
    } as PageItem;
    try {
      const res = await api.admin.create<PageItem>('pages', newItem);
      if (res.data) {
        setPages((prev) => [...prev, res.data]);
        return res.data;
      }
    } catch (e) {
      console.warn('API error, saving locally:', e);
    }
    setPages((prev) => [...prev, newItem]);
    return newItem;
  };

  const updatePage = async (id: string, partial: Partial<PageItem>): Promise<void> => {
    setPages((prev) => prev.map((p) => (p.id === id ? { ...p, ...partial } : p)));
    try {
      await api.admin.update('pages', id, partial);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const deletePage = async (id: string): Promise<void> => {
    setPages((prev) => prev.filter((p) => p.id !== id));
    try {
      await api.admin.delete('pages', id);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Banners
  const addBanner = async (b: BannerSlide | Omit<BannerSlide, 'id'>): Promise<void> => {
    const newB: BannerSlide =
      'id' in b
        ? b
        : {
            ...b,
            id: `banner_${Date.now()}`
          };
    setBanners((prev) => [...prev, newB]);
    try {
      await api.admin.create('banners', newB);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const updateBanner = async (arg1: BannerSlide | string, partial?: Partial<BannerSlide>): Promise<void> => {
    const id = typeof arg1 === 'string' ? arg1 : arg1.id;
    const patch = typeof arg1 === 'string' ? partial || {} : arg1;
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
    try {
      await api.admin.update('banners', id, patch);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const deleteBanner = async (id: string): Promise<void> => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    try {
      await api.admin.delete('banners', id);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Programs
  const addProgram = async (item: Partial<ProgramPillar>): Promise<ProgramPillar> => {
    const newP: ProgramPillar = {
      id: `pillar_${Date.now()}`,
      slug: item.slug || 'new-pillar',
      titleEn: item.titleEn || 'New Pillar',
      titleFr: item.titleFr || 'Nouveau Pilier',
      shortDescEn: item.shortDescEn || '',
      shortDescFr: item.shortDescFr || '',
      fullDescEn: item.fullDescEn || '',
      fullDescFr: item.fullDescFr || '',
      image: item.image || '/assets/aistudio/4_289670c0.PNG',
      icon: item.icon || 'leaf',
      order: programs.length + 1,
      status: item.status || 'published',
      metrics: item.metrics || [{ value: '100+', labelEn: 'beneficiaries', labelFr: 'bénéficiaires' }],
      objectivesEn: item.objectivesEn || ['Empower communities'],
      objectivesFr: item.objectivesFr || ['Renforcer les communautés'],
      ...item
    };
    setPrograms((prev) => [...prev, newP]);
    try {
      await api.admin.create('programs', newP);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
    return newP;
  };

  const updateProgram = async (arg1: ProgramPillar | string, partial?: Partial<ProgramPillar>): Promise<void> => {
    const id = typeof arg1 === 'string' ? arg1 : arg1.id;
    const patch = typeof arg1 === 'string' ? partial || {} : arg1;
    setPrograms((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    try {
      await api.admin.update('programs', id, patch);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const deleteProgram = async (id: string): Promise<void> => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    try {
      await api.admin.delete('programs', id);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Team
  const addTeamMember = async (m: TeamMember | Omit<TeamMember, 'id'>): Promise<void> => {
    const newM: TeamMember =
      'id' in m
        ? m
        : {
            ...m,
            id: `tm_${Date.now()}`
          };
    setTeamMembers((prev) => [...prev, newM]);
    try {
      await api.admin.create('team', newM);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const updateTeamMember = async (arg1: TeamMember | string, partial?: Partial<TeamMember>): Promise<void> => {
    const id = typeof arg1 === 'string' ? arg1 : arg1.id;
    const patch = typeof arg1 === 'string' ? partial || {} : arg1;
    setTeamMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
    try {
      await api.admin.update('team', id, patch);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const deleteTeamMember = async (id: string): Promise<void> => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    try {
      await api.admin.delete('team', id);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Founders
  const addFounder = async (item: Partial<Founder>): Promise<Founder> => {
    const newF: Founder = {
      id: `founder_${Date.now()}`,
      fullName: item.fullName || 'Co-Founder',
      roleEn: item.roleEn || 'Co-Founder',
      roleFr: item.roleFr || 'Co-Fondateur',
      bioEn: item.bioEn || '',
      bioFr: item.bioFr || '',
      photoUrl: item.photoUrl || '/assets/brand/acv-logo.jpeg',
      yearsActive: item.yearsActive || '2023 - Présent',
      order: founders.length + 1,
      status: 'visible',
      ...item
    };
    setFounders((prev) => [...prev, newF]);
    try {
      await api.admin.create('founders', newF);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
    return newF;
  };

  const updateFounder = async (id: string, partial: Partial<Founder>): Promise<void> => {
    setFounders((prev) => prev.map((f) => (f.id === id ? { ...f, ...partial } : f)));
    try {
      await api.admin.update('founders', id, partial);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const deleteFounder = async (id: string): Promise<void> => {
    setFounders((prev) => prev.filter((f) => f.id !== id));
    try {
      await api.admin.delete('founders', id);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Field Staff
  const addFieldStaff = async (item: Partial<FieldAgent>): Promise<FieldAgent> => {
    const newA: FieldAgent = {
      id: `agent_${Date.now()}`,
      name: item.name || 'Field Agent',
      positionEn: item.positionEn || 'Field Monitor',
      positionFr: item.positionFr || 'Agent Terrain',
      zone: item.zone || 'Goma',
      programId: item.programId || 'nature-biodiversity',
      photoUrl: item.photoUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      entryDate: item.entryDate || new Date().toISOString().split('T')[0],
      status: 'active',
      ...item
    };
    setFieldStaff((prev) => [...prev, newA]);
    try {
      await api.admin.create('fieldStaff', newA);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
    return newA;
  };

  const updateFieldStaff = async (id: string, partial: Partial<FieldAgent>): Promise<void> => {
    setFieldStaff((prev) => prev.map((s) => (s.id === id ? { ...s, ...partial } : s)));
    try {
      await api.admin.update('fieldStaff', id, partial);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const deleteFieldStaff = async (id: string): Promise<void> => {
    setFieldStaff((prev) => prev.filter((s) => s.id !== id));
    try {
      await api.admin.delete('fieldStaff', id);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Governance
  const addGovernance = async (item: Partial<GovernanceMember>): Promise<GovernanceMember> => {
    const newG: GovernanceMember = {
      id: `gov_${Date.now()}`,
      name: item.name || 'Council Member',
      roleEn: item.roleEn || 'Board Member',
      roleFr: item.roleFr || 'Membre du Conseil',
      mandateYears: item.mandateYears || '2024 - 2027',
      bioEn: item.bioEn || '',
      bioFr: item.bioFr || '',
      photoUrl: item.photoUrl || '/assets/aistudio/10_702700e4.PNG',
      order: governance.length + 1,
      status: 'active',
      ...item
    };
    setGovernance((prev) => [...prev, newG]);
    try {
      await api.admin.create('governance', newG);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
    return newG;
  };

  const updateGovernance = async (id: string, partial: Partial<GovernanceMember>): Promise<void> => {
    setGovernance((prev) => prev.map((g) => (g.id === id ? { ...g, ...partial } : g)));
    try {
      await api.admin.update('governance', id, partial);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const deleteGovernance = async (id: string): Promise<void> => {
    setGovernance((prev) => prev.filter((g) => g.id !== id));
    try {
      await api.admin.delete('governance', id);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Policies
  const updatePolicy = (arg1: PolicyDocument | string, partial?: Partial<PolicyDocument>) => {
    const id = typeof arg1 === 'string' ? arg1 : arg1.id;
    const patch = typeof arg1 === 'string' ? partial || {} : arg1;
    setPolicies((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  // Articles / Blog
  const addBlogPost = async (b: Article | Omit<Article, 'id'>): Promise<void> => {
    const newB: Article =
      'id' in b
        ? b
        : {
            ...b,
            id: `art_${Date.now()}`
          };
    setArticles((prev) => [newB, ...prev]);
    try {
      await api.admin.create('articles', newB);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const updateBlogPost = async (arg1: Article | string, partial?: Partial<Article>): Promise<void> => {
    const id = typeof arg1 === 'string' ? arg1 : arg1.id;
    const patch = typeof arg1 === 'string' ? partial || {} : arg1;
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
    try {
      await api.admin.update('articles', id, patch);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const deleteBlogPost = async (id: string): Promise<void> => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    try {
      await api.admin.delete('articles', id);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Field Notes
  const addFieldNote = (n: FieldNote | Omit<FieldNote, 'id'>) => {
    const newN: FieldNote = 'id' in n ? n : { ...n, id: `fn_${Date.now()}` };
    setFieldNotes((prev) => [newN, ...prev]);
  };

  const deleteFieldNote = (id: string) => {
    setFieldNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // Media
  const deleteMedia = async (id: string): Promise<void> => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
    try {
      await api.admin.delete('media', id);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Partners
  const addPartner = async (item: Partial<Partner>): Promise<Partner> => {
    const newP: Partner = {
      id: `part_${Date.now()}`,
      name: item.name || 'Partner Org',
      logoUrl: item.logoUrl || '/assets/aistudio/8_a0add9a7.PNG',
      type: item.type || 'Technique',
      order: partners.length + 1,
      status: 'active',
      ...item
    };
    setPartners((prev) => [...prev, newP]);
    try {
      await api.admin.create('partners', newP);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
    return newP;
  };

  const updatePartner = async (id: string, partial: Partial<Partner>): Promise<void> => {
    setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, ...partial } : p)));
    try {
      await api.admin.update('partners', id, partial);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const deletePartner = async (id: string): Promise<void> => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
    try {
      await api.admin.delete('partners', id);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Donors
  const addDonation = async (d: Donor | Omit<Donor, 'id'>): Promise<void> => {
    const newD: Donor =
      'id' in d
        ? d
        : {
            ...d,
            id: `DON-${Date.now().toString().slice(-6)}`,
            donationDate: new Date().toISOString().split('T')[0],
            amount: Number(d.amount) || 50,
            currency: d.currency || 'USD'
          };
    setDonors((prev) => [newD, ...prev]);
    try {
      await api.public.submitDonation(newD);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Testimonials
  const addTestimonial = async (item: Partial<Testimonial>): Promise<Testimonial> => {
    const newT: Testimonial = {
      id: `test_${Date.now()}`,
      quoteEn: item.quoteEn || 'Empowerment on the ground.',
      quoteFr: item.quoteFr || 'Action concrète sur le terrain.',
      author: item.author || 'Community Member',
      roleEn: item.roleEn || 'Local resident',
      roleFr: item.roleFr || 'Habitant local',
      status: 'visible',
      order: testimonials.length + 1,
      ...item
    };
    setTestimonials((prev) => [...prev, newT]);
    try {
      await api.admin.create('testimonials', newT);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
    return newT;
  };

  const updateTestimonial = async (id: string, partial: Partial<Testimonial>): Promise<void> => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...partial } : t)));
    try {
      await api.admin.update('testimonials', id, partial);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const deleteTestimonial = async (id: string): Promise<void> => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    try {
      await api.admin.delete('testimonials', id);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Stats / KPIs
  const addStat = async (item: Partial<ImpactStat>): Promise<ImpactStat> => {
    const newS: ImpactStat = {
      id: `stat_${Date.now()}`,
      labelEn: item.labelEn || 'Impact Metric',
      labelFr: item.labelFr || 'Indicateur d’Impact',
      value: item.value || '100+',
      iconName: item.iconName || 'sparkles',
      displayPage: item.displayPage || 'home',
      order: stats.length + 1,
      status: 'active',
      ...item
    };
    setStats((prev) => [...prev, newS]);
    try {
      await api.admin.create('stats', newS);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
    return newS;
  };

  const updateStat = async (id: string, partial: Partial<ImpactStat>): Promise<void> => {
    setStats((prev) => prev.map((s) => (s.id === id ? { ...s, ...partial } : s)));
    try {
      await api.admin.update('stats', id, partial);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const deleteStat = async (id: string): Promise<void> => {
    setStats((prev) => prev.filter((s) => s.id !== id));
    try {
      await api.admin.delete('stats', id);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Site Settings
  const updateSiteSettings = async (partial: Partial<SiteSettings>): Promise<void> => {
    setSiteSettings((prev) => ({ ...prev, ...partial }));
    try {
      await api.admin.update('siteSettings', siteSettings.id || 'settings_main', partial);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Contact Submissions
  const addContactSubmission = async (sub: ContactSubmission | Omit<ContactSubmission, 'id'>): Promise<void> => {
    const newSub: ContactSubmission =
      'id' in sub
        ? sub
        : {
            ...sub,
            id: `sub_${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            read: false,
            status: 'new'
          };
    setContactSubmissions((prev) => [newSub, ...prev]);
    try {
      await api.public.submitContact(newSub);
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const markContactRead = async (id: string): Promise<void> => {
    setContactSubmissions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, read: true, status: 'reviewed' } : c))
    );
    try {
      await api.admin.update('contactSubmissions', id, { read: true, status: 'reviewed' });
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const updateContactStatus = async (id: string, status: ContactSubmission['status']): Promise<void> => {
    setContactSubmissions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status, read: true } : c))
    );
    try {
      await api.admin.update('contactSubmissions', id, { status, read: true });
      refreshDashboardStats();
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  // Admin Users
  const addAdminUser = async (item: Partial<AdminUser>): Promise<AdminUser> => {
    const newU: AdminUser = {
      id: `user_${Date.now()}`,
      name: item.name || 'New Admin',
      email: item.email || 'admin@acv-drc.org',
      role: item.role || 'editor',
      status: 'active',
      ...item
    };
    setAdminUsers((prev) => [...prev, newU]);
    try {
      await api.admin.create('users', newU);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
    return newU;
  };

  const updateAdminUser = async (id: string, partial: Partial<AdminUser>): Promise<void> => {
    setAdminUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...partial } : u)));
    try {
      await api.admin.update('users', id, partial);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const deleteAdminUser = async (id: string): Promise<void> => {
    setAdminUsers((prev) => prev.filter((u) => u.id !== id));
    try {
      await api.admin.delete('users', id);
    } catch (e) {
      console.warn('API sync deferred:', e);
    }
  };

  const resetToDefaults = async () => {
    setBanners(defaultBanners);
    setPrograms(initialProgramPillars);
    setTeamMembers(initialTeamMembers);
    setArticles(initialBlogPosts);
    setFieldNotes(initialFieldNotes);
    setSiteSettings(initialSiteSettings);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currentRoute,
        navigateTo,

        isAdminModalOpen,
        setAdminModalOpen,
        isAdminAuthenticated: !!adminUser,
        adminUser,
        currentUser: adminUser,
        loginAdmin,
        logoutAdmin,
        login,
        logout: logoutAdmin,

        uploadMedia,
        dashboardStats,
        refreshDashboardStats,

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

        policies,
        updatePolicy,

        blogPosts: articles,
        articles,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,

        fieldNotes,
        addFieldNote,
        deleteFieldNote,

        media,
        deleteMedia,

        partners,
        addPartner,
        updatePartner,
        deletePartner,

        donors,
        donations: donors,
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
        addContactSubmission,
        markContactRead,
        updateContactStatus,

        adminUsers,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,

        resetToDefaults,
        isLoading,
        actionLoading,
        triggerActionLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
