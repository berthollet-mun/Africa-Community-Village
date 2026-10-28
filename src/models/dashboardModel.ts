import { contentModel } from '@/models/contentModel';

type Item = Record<string, unknown> & { id: string };

export async function getDashboardStats() {
  const [pages, programs, articles, team, founders, fieldStaff, banners, partners, donors, media, inquiries, auditLogs] =
    await Promise.all([
      contentModel.list<Item>('pages'),
      contentModel.list<Item>('programs'),
      contentModel.list<Item>('articles'),
      contentModel.list<Item>('team'),
      contentModel.list<Item>('founders'),
      contentModel.list<Item>('fieldStaff'),
      contentModel.list<Item>('banners'),
      contentModel.list<Item>('partners'),
      contentModel.list<Item>('donors'),
      contentModel.list<Item>('media'),
      contentModel.list<Item>('contactSubmissions'),
      contentModel.list<Item>('auditLogs')
    ]);

  const sum = (items: Item[], key: string) => items.reduce((total, item) => total + Number(item[key] ?? 0), 0);
  const missing = (items: Item[], keys: string[]) => items.filter((item) => keys.some((key) => !item[key])).length;

  const articlesWithoutFr = missing(articles, ['titleFr', 'contentFr']);
  const programsWithoutFr = missing(programs, ['titleFr', 'shortDescFr']);
  const bannersWithoutFr = missing(banners, ['titleFr']);

  return {
    counts: {
      pages: pages.length,
      programs: programs.length,
      articles: articles.length,
      publishedArticles: articles.filter((item) => item.status === 'published').length,
      team: team.length,
      founders: founders.length,
      fieldStaff: fieldStaff.length,
      banners: banners.length,
      activeBanners: banners.filter((item) => item.active !== false).length,
      partners: partners.length,
      donors: donors.length,
      totalDonationsUsd: sum(donors, 'amount'),
      media: media.length,
      unreadInquiries: inquiries.filter((item) => !item.read).length
    },
    translationGaps: {
      articlesWithoutFr,
      programsWithoutFr,
      bannersWithoutFr,
      totalMissing: articlesWithoutFr + programsWithoutFr + bannersWithoutFr
    },
    recentAuditLogs: auditLogs.slice(0, 10),
    recentDonations: donors.slice(0, 5),
    recentInquiries: inquiries.slice(0, 5)
  };
}
