/**
 * Centralized API service for Africa Community Village (ACV)
 * Browser-side controller client for the Next.js Route Handlers.
 */

import type {
  AdminUser,
  Article,
  AuditLog,
  BannerSlide,
  ContactSubmission,
  DashboardStats,
  Donor,
  FieldAgent,
  FieldNote,
  Founder,
  GovernanceMember,
  ImpactStat,
  MediaItem,
  Partner,
  PolicyDocument,
  ProgramPillar,
  SiteSettings,
  TeamMember,
  Testimonial
} from '@/types';

const BASE_URL = '/api';
const REQUEST_START_EVENT = 'acv:request-start';
const REQUEST_END_EVENT = 'acv:request-end';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

interface PublicListOptions {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

function publicQuery(options: PublicListOptions = {}) {
  const query = new URLSearchParams();
  if (options.page) query.set('page', String(options.page));
  if (options.limit) query.set('limit', String(options.limit));
  if (options.category && options.category !== 'all') query.set('category', options.category);
  if (options.search) query.set('search', options.search);
  const value = query.toString();
  return value ? `?${value}` : '';
}

function dispatchRequestEvent(name: typeof REQUEST_START_EVENT | typeof REQUEST_END_EVENT): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(name));
  }
}

export function getAuthToken(): string | null {
  return typeof window === 'undefined' ? null : localStorage.getItem('acv_auth_token');
}

export function setAuthToken(token: string | null): void {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem('acv_auth_token', token);
  } else {
    localStorage.removeItem('acv_auth_token');
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  dispatchRequestEvent(REQUEST_START_EVENT);

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!res.ok) {
      let errorMsg = `HTTP Error ${res.status}`;
      try {
        const errJson = await res.json();
        if (errJson.error) errorMsg = errJson.error;
      } catch {
        // ignore
      }
      throw new Error(errorMsg);
    }

    return res.json();
  } finally {
    dispatchRequestEvent(REQUEST_END_EVENT);
  }
}

export const api = {
  checkout: {
    async createSession(data: {
      amount: number;
      donorName: string;
      donorEmail: string;
      allocation: string;
      anonymous: boolean;
      language: 'fr' | 'en';
    }) {
      return request<{ success: boolean; url: string; sessionId: string }>('/checkout-sessions', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    async getSession(sessionId: string) {
      return request<{
        success: boolean;
        data: {
          id: string;
          paymentStatus: string;
          status: string | null;
          amountTotal: number | null;
          currency: string | null;
          donorName: string;
          donorEmail: string;
          allocation: string;
        };
      }>(`/checkout-sessions?session_id=${encodeURIComponent(sessionId)}`);
    }
  },

  // Authentication
  auth: {
    async login(email: string, password: string) {
      const res = await request<{ success: boolean; token: string; user: AdminUser }>('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      if (res.token) {
        setAuthToken(res.token);
      }
      return res;
    },
    logout() {
      setAuthToken(null);
    }
  },

  // Dashboard synchronized analytics
  dashboard: {
    async getStats() {
      return request<ApiResponse<DashboardStats>>('/admin/dashboard/stats');
    }
  },

  // File Upload from device (Multer)
  upload: {
    async uploadFiles(files: File[] | FileList): Promise<ApiResponse<MediaItem | MediaItem[]>> {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });

      return request<ApiResponse<MediaItem | MediaItem[]>>('/admin/upload', {
        method: 'POST',
        body: formData
      });
    }
  },

  // Generic Admin CRUD client
  admin: {
    async list<T>(entity: string, params: Record<string, string | number | undefined> = {}) {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined) query.set(k, String(v));
      });
      const qs = query.toString() ? `?${query.toString()}` : '';
      return request<{ success: boolean; total: number; data: T[] }>(`/admin/${entity}${qs}`);
    },

    async get<T>(entity: string, id: string) {
      return request<{ success: boolean; data: T }>(`/admin/${entity}/${id}`);
    },

    async create<T, TInput extends object = Partial<T>>(entity: string, data: TInput) {
      return request<{ success: boolean; data: T }>(`/admin/${entity}`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    async update<T, TInput extends object = Partial<T>>(entity: string, id: string, data: TInput) {
      return request<{ success: boolean; data: T }>(`/admin/${entity}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    },

    async delete(entity: string, id: string) {
      return request<{ success: boolean }>(`/admin/${entity}/${id}`, {
        method: 'DELETE'
      });
    }
  },

  // Public dynamic queries
  public: {
    async getSettings() {
      return request<ApiResponse<SiteSettings | null>>('/public/settings');
    },

    async getBanners(pageRoute?: string) {
      const qs = pageRoute ? `?pageRoute=${encodeURIComponent(pageRoute)}` : '';
      return request<ApiResponse<BannerSlide[]>>(`/public/banners${qs}`);
    },

    async getPrograms(options: PublicListOptions = {}) {
      return request<PaginatedApiResponse<ProgramPillar>>(`/public/programs${publicQuery(options)}`);
    },

    async getArticles(category?: string, options: Omit<PublicListOptions, 'category'> = {}) {
      return request<PaginatedApiResponse<Article>>(
        `/public/articles${publicQuery({ ...options, category })}`
      );
    },

    async getTeam(options: PublicListOptions = {}) {
      return request<PaginatedApiResponse<TeamMember>>(`/public/team${publicQuery(options)}`);
    },

    async getFounders(options: PublicListOptions = {}) {
      return request<PaginatedApiResponse<Founder>>(`/public/founders${publicQuery(options)}`);
    },

    async getFieldStaff(options: PublicListOptions = {}) {
      return request<PaginatedApiResponse<FieldAgent>>(`/public/field-staff${publicQuery(options)}`);
    },

    async getGovernance(options: PublicListOptions = {}) {
      return request<PaginatedApiResponse<GovernanceMember>>(`/public/governance${publicQuery(options)}`);
    },

    async getPartners(options: PublicListOptions = {}) {
      return request<PaginatedApiResponse<Partner>>(`/public/partners${publicQuery(options)}`);
    },

    async getTestimonials(options: PublicListOptions = {}) {
      return request<PaginatedApiResponse<Testimonial>>(`/public/testimonials${publicQuery(options)}`);
    },

    async getStats(options: PublicListOptions = {}) {
      return request<PaginatedApiResponse<ImpactStat>>(`/public/stats${publicQuery(options)}`);
    },

    async getPolicies(options: PublicListOptions = {}) {
      return request<PaginatedApiResponse<PolicyDocument>>(`/public/policies${publicQuery(options)}`);
    },

    async getFieldNotes(options: PublicListOptions = {}) {
      return request<PaginatedApiResponse<FieldNote>>(`/public/field-notes${publicQuery(options)}`);
    },

    async submitContact<TInput extends object>(data: TInput) {
      return request<ApiResponse<ContactSubmission>>('/public/contact', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    async submitDonation<TInput extends object>(data: TInput) {
      return request<ApiResponse<Donor>>('/public/donate', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    }
  }
};
