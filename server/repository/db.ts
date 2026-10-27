import { JsonFileRepository } from './Repository';
import {
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
  ContactSubmission
} from './types';
import {
  seedUsers,
  seedSiteSettings,
  seedPages,
  seedBanners,
  seedPrograms,
  seedTeam,
  seedFounders,
  seedFieldStaff,
  seedGovernance,
  seedArticles,
  seedMedia,
  seedPartners,
  seedDonors,
  seedTestimonials,
  seedImpactStats,
  seedAuditLogs,
  seedContactSubmissions
} from './seedData';

export const db = {
  users: new JsonFileRepository<AdminUser>('users', seedUsers),
  pages: new JsonFileRepository<PageItem>('pages', seedPages),
  banners: new JsonFileRepository<BannerSlide>('banners', seedBanners),
  programs: new JsonFileRepository<ProgramPillar>('programs', seedPrograms),
  team: new JsonFileRepository<TeamMember>('team', seedTeam),
  founders: new JsonFileRepository<Founder>('founders', seedFounders),
  fieldStaff: new JsonFileRepository<FieldAgent>('fieldStaff', seedFieldStaff),
  governance: new JsonFileRepository<GovernanceMember>('governance', seedGovernance),
  articles: new JsonFileRepository<Article>('articles', seedArticles),
  media: new JsonFileRepository<MediaItem>('media', seedMedia),
  partners: new JsonFileRepository<Partner>('partners', seedPartners),
  donors: new JsonFileRepository<Donor>('donors', seedDonors),
  testimonials: new JsonFileRepository<Testimonial>('testimonials', seedTestimonials),
  stats: new JsonFileRepository<ImpactStat>('stats', seedImpactStats),
  siteSettings: new JsonFileRepository<SiteSettings>('siteSettings', [seedSiteSettings]),
  auditLogs: new JsonFileRepository<AuditLog>('auditLogs', seedAuditLogs),
  contactSubmissions: new JsonFileRepository<ContactSubmission>('contactSubmissions', seedContactSubmissions)
};

export type EntityName = keyof typeof db;

export async function logAuditAction(
  userName: string,
  userEmail: string,
  action: 'create' | 'update' | 'delete' | 'login' | 'upload' | 'status_change',
  entity: string,
  details: string,
  entityId?: string,
  ipAddress?: string
) {
  try {
    await db.auditLogs.create({
      userName,
      userEmail,
      action,
      entity,
      entityId,
      details,
      timestamp: new Date().toISOString(),
      ipAddress
    });
  } catch (err) {
    console.error('Failed to log audit action:', err);
  }
}
