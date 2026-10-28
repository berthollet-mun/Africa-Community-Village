import { contentModel } from '@/models/contentModel';
import { logAuditAction } from '@/models/auditModel';
import type { ContentEntity } from '@/lib/validation';

type Item = Record<string, unknown> & { id: string };

const publicResources = {
  programs: { entity: 'programs', status: ['status', 'published'], order: 'order' },
  articles: { entity: 'articles', status: ['status', 'published'], order: 'publishDate', descending: true },
  team: { entity: 'team', status: ['status', 'visible'], order: 'order' },
  founders: { entity: 'founders', status: ['status', 'visible'], order: 'order' },
  'field-staff': { entity: 'fieldStaff', status: ['status', 'active'] },
  governance: { entity: 'governance', status: ['status', 'active'], order: 'order' },
  partners: { entity: 'partners', status: ['status', 'active'], order: 'order' },
  testimonials: { entity: 'testimonials', status: ['status', 'visible'], order: 'order' },
  stats: { entity: 'stats', status: ['status', 'active'], order: 'order' }
} as const;

export type PublicResource = keyof typeof publicResources;

function compareValues(left: unknown, right: unknown) {
  if (typeof left === 'number' && typeof right === 'number') return left - right;
  return String(left ?? '').localeCompare(String(right ?? ''));
}

export const publicContentModel = {
  async getSettings() {
    const settings = await contentModel.list<Item>('siteSettings');
    return settings[0] ?? null;
  },

  async getBanners(pageRoute?: string) {
    let banners = (await contentModel.list<Item>('banners')).filter(
      (banner) => banner.active !== false && banner.isActive !== false
    );

    const rawPage = pageRoute?.trim().toLowerCase() ?? '';
    const normalizedPage =
      rawPage === 'home' || rawPage === '/' ? '/' : rawPage && !rawPage.startsWith('/') ? `/${rawPage}` : rawPage;

    if (normalizedPage) {
      banners = banners.filter((banner) => {
        const route = String(banner.pageRoute ?? banner.page_assignment ?? '').toLowerCase();
        return (
          route === normalizedPage ||
          route === rawPage ||
          route === 'all' ||
          (normalizedPage === '/' && (route === '/' || route === 'home')) ||
          (normalizedPage === '/about' && route.startsWith('/about')) ||
          (normalizedPage === '/programs' && route.startsWith('/programs'))
        );
      });
    }

    return banners.sort((a, b) => compareValues(a.order, b.order));
  },

  async list(resource: PublicResource, category?: string) {
    const config = publicResources[resource];
    let items = await contentModel.list<Item>(config.entity as ContentEntity);
    const [statusKey, statusValue] = config.status;
    items = items.filter((item) => item[statusKey] === statusValue);

    if (resource === 'articles' && category && category !== 'all') {
      items = items.filter((item) => String(item.category ?? '').toLowerCase().includes(category.toLowerCase()));
    }
    if ('order' in config) {
      items.sort((a, b) => {
        const result = compareValues(a[config.order], b[config.order]);
        return 'descending' in config && config.descending ? -result : result;
      });
    }
    return items;
  },

  async submitContact(data: Record<string, unknown>, ipAddress?: string) {
    const submission = await contentModel.create<Item>('contactSubmissions', {
      ...data,
      category: data.category ?? 'General Inquiry',
      subject: data.subject ?? `Message de ${data.name}`,
      status: 'new',
      read: false,
      date: new Date().toISOString().slice(0, 10)
    });
    await logAuditAction(
      { userName: String(data.name), userEmail: String(data.email) },
      'create',
      'contactSubmissions',
      'Nouveau message reçu via le site public.',
      submission.id,
      ipAddress
    );
    return submission;
  },

  async submitDonation(data: Record<string, unknown>, ipAddress?: string) {
    const anonymous = Boolean(data.anonymous);
    const donation = await contentModel.create<Item>('donors', {
      ...data,
      name: anonymous ? 'Donateur Anonyme' : data.name,
      donationDate: new Date().toISOString().slice(0, 10),
      pillarAllocation: data.pillar ?? 'All Programs',
      type: 'Individuel'
    });
    await logAuditAction(
      {
        userName: String(data.name ?? 'Anonymous Donor'),
        userEmail: String(data.email ?? 'anonymous@acv.local')
      },
      'create',
      'donors',
      `Nouveau don enregistré : ${donation.amount} ${donation.currency}.`,
      donation.id,
      ipAddress
    );
    return donation;
  }
};
