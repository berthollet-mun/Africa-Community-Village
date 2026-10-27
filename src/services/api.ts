/**
 * Centralized API service for Africa Community Village (ACV)
 * Connects the React client with the Node.js / Express backend endpoints
 */

const BASE_URL = '/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('acv_auth_token');
}

export function setAuthToken(token: string | null): void {
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
}

export const api = {
  // Authentication
  auth: {
    async login(email: string, password: string) {
      const res = await request<{ success: boolean; token: string; user: any }>('/admin/login', {
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
      return request<{ success: boolean; data: any }>('/admin/dashboard/stats');
    }
  },

  // File Upload from device (Multer)
  upload: {
    async uploadFiles(files: File[] | FileList): Promise<{ success: boolean; data: any }> {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });

      return request<{ success: boolean; data: any }>('/admin/upload', {
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

    async create<T>(entity: string, data: any) {
      return request<{ success: boolean; data: T }>(`/admin/${entity}`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    async update<T>(entity: string, id: string, data: any) {
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
      return request<{ success: boolean; data: any }>('/public/settings');
    },

    async getBanners(pageRoute?: string) {
      const qs = pageRoute ? `?pageRoute=${encodeURIComponent(pageRoute)}` : '';
      return request<{ success: boolean; data: any[] }>(`/public/banners${qs}`);
    },

    async getPrograms() {
      return request<{ success: boolean; data: any[] }>('/public/programs');
    },

    async getArticles(category?: string) {
      const qs = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
      return request<{ success: boolean; data: any[] }>(`/public/articles${qs}`);
    },

    async getTeam() {
      return request<{ success: boolean; data: any[] }>('/public/team');
    },

    async getFounders() {
      return request<{ success: boolean; data: any[] }>('/public/founders');
    },

    async getFieldStaff() {
      return request<{ success: boolean; data: any[] }>('/public/field-staff');
    },

    async getGovernance() {
      return request<{ success: boolean; data: any[] }>('/public/governance');
    },

    async getPartners() {
      return request<{ success: boolean; data: any[] }>('/public/partners');
    },

    async getTestimonials() {
      return request<{ success: boolean; data: any[] }>('/public/testimonials');
    },

    async getStats() {
      return request<{ success: boolean; data: any[] }>('/public/stats');
    },

    async submitContact(data: any) {
      return request<{ success: boolean; data: any }>('/public/contact', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    async submitDonation(data: any) {
      return request<{ success: boolean; data: any }>('/public/donate', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    }
  }
};
