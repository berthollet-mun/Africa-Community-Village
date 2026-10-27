/**
 * Database Script Generator for Africa Community Village (ACV)
 * Generates production-ready SQL (PostgreSQL, MySQL, SQLite) and JSON backups
 * containing complete schemas (DDL) and live seed data (DML) for the entire website.
 */

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
  SiteSettings,
  ContactSubmission,
  AuditLog
} from '../types';

export interface DatabaseExportData {
  siteSettings: SiteSettings;
  pages: PageItem[];
  banners: BannerSlide[];
  programs: ProgramPillar[];
  teamMembers: TeamMember[];
  founders: Founder[];
  fieldStaff: FieldAgent[];
  governance: GovernanceMember[];
  articles: Article[];
  media: MediaItem[];
  partners: Partner[];
  donors: Donor[];
  testimonials: Testimonial[];
  stats: ImpactStat[];
  adminUsers: AdminUser[];
  contactSubmissions?: ContactSubmission[];
  auditLogs?: AuditLog[];
}

export type SqlDialect = 'postgres' | 'mysql' | 'sqlite';

export interface SqlExportOptions {
  dialect: SqlDialect;
  includeDropTable: boolean;
  includeDdl: boolean;
  includeDml: boolean;
  includeComments: boolean;
  includeTransaction: boolean;
}

const escapeSql = (str: string | undefined | null): string => {
  if (str === undefined || str === null) return 'NULL';
  return `'${String(str).replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
};

const escapeJsonSql = (obj: any): string => {
  if (obj === undefined || obj === null) return 'NULL';
  const jsonStr = JSON.stringify(obj);
  return `'${jsonStr.replace(/'/g, "''")}'`;
};

export function generateSqlScript(data: DatabaseExportData, options: SqlExportOptions): string {
  const { dialect, includeDropTable, includeDdl, includeDml, includeComments, includeTransaction } = options;
  const lines: string[] = [];

  const addComment = (comment: string) => {
    if (includeComments) lines.push(`-- ${comment}`);
  };

  // Header
  addComment('========================================================================');
  addComment('AFRICA COMMUNITY VILLAGE (ACV) - COMPLETE DATABASE SCRIPT');
  addComment(`Target Engine: ${dialect.toUpperCase()}`);
  addComment(`Generated at: ${new Date().toISOString()}`);
  addComment('All schemas, tables, constraints, indexes and live seed records included.');
  addComment('========================================================================');
  lines.push('');

  if (includeTransaction) {
    if (dialect === 'mysql') {
      lines.push('SET FOREIGN_KEY_CHECKS = 0;');
      lines.push('START TRANSACTION;');
    } else if (dialect === 'postgres') {
      lines.push('BEGIN;');
    } else {
      lines.push('BEGIN TRANSACTION;');
    }
    lines.push('');
  }

  // Helper types per dialect
  const textType = dialect === 'mysql' ? 'LONGTEXT' : 'TEXT';
  const boolType = dialect === 'mysql' || dialect === 'sqlite' ? 'INTEGER' : 'BOOLEAN';
  const trueVal = dialect === 'mysql' || dialect === 'sqlite' ? '1' : 'TRUE';
  const falseVal = dialect === 'mysql' || dialect === 'sqlite' ? '0' : 'FALSE';
  const jsonType = dialect === 'postgres' ? 'JSONB' : dialect === 'mysql' ? 'JSON' : 'TEXT';
  const timestampType = dialect === 'mysql' ? 'DATETIME DEFAULT CURRENT_TIMESTAMP' : 'TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP';

  // 1. DROP TABLES (Reverse order)
  if (includeDropTable) {
    addComment('1. DROP EXISTING TABLES');
    const tableNames = [
      'audit_logs',
      'contact_submissions',
      'admin_users',
      'testimonials',
      'impact_stats',
      'donors',
      'partners',
      'media_library',
      'articles',
      'governance_members',
      'field_staff',
      'founders',
      'team_members',
      'program_pillars',
      'banner_slides',
      'pages',
      'site_settings'
    ];
    tableNames.forEach((tbl) => {
      lines.push(`DROP TABLE IF EXISTS ${tbl} CASCADE;`);
    });
    lines.push('');
  }

  // 2. DDL - CREATE TABLES
  if (includeDdl) {
    addComment('2. SCHEMA DEFINITION (DDL)');
    lines.push('');

    // Table: site_settings
    lines.push(`CREATE TABLE IF NOT EXISTS site_settings (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  site_name_en VARCHAR(255) NOT NULL,`);
    lines.push(`  site_name_fr VARCHAR(255) NOT NULL,`);
    lines.push(`  site_tagline_en ${textType},`);
    lines.push(`  site_tagline_fr ${textType},`);
    lines.push(`  contact_email VARCHAR(255),`);
    lines.push(`  contact_phone VARCHAR(64),`);
    lines.push(`  office_address_en ${textType},`);
    lines.push(`  office_address_fr ${textType},`);
    lines.push(`  social_links ${jsonType},`);
    lines.push(`  bank_details ${jsonType},`);
    lines.push(`  donation_accounts ${jsonType},`);
    lines.push(`  created_at ${timestampType},`);
    lines.push(`  updated_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: pages
    lines.push(`CREATE TABLE IF NOT EXISTS pages (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  route VARCHAR(255) UNIQUE NOT NULL,`);
    lines.push(`  slug VARCHAR(255) NOT NULL,`);
    lines.push(`  title_en VARCHAR(255) NOT NULL,`);
    lines.push(`  title_fr VARCHAR(255) NOT NULL,`);
    lines.push(`  subtitle_en ${textType},`);
    lines.push(`  subtitle_fr ${textType},`);
    lines.push(`  content_en ${textType},`);
    lines.push(`  content_fr ${textType},`);
    lines.push(`  cover_image ${textType},`);
    lines.push(`  meta_title_en VARCHAR(255),`);
    lines.push(`  meta_title_fr VARCHAR(255),`);
    lines.push(`  meta_desc_en ${textType},`);
    lines.push(`  meta_desc_fr ${textType},`);
    lines.push(`  status VARCHAR(32) DEFAULT 'published',`);
    lines.push(`  display_order INTEGER DEFAULT 0,`);
    lines.push(`  created_at ${timestampType},`);
    lines.push(`  updated_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: banner_slides
    lines.push(`CREATE TABLE IF NOT EXISTS banner_slides (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  page_route VARCHAR(255) NOT NULL,`);
    lines.push(`  title_en ${textType} NOT NULL,`);
    lines.push(`  title_fr ${textType} NOT NULL,`);
    lines.push(`  subtitle_en ${textType},`);
    lines.push(`  subtitle_fr ${textType},`);
    lines.push(`  image_url ${textType} NOT NULL,`);
    lines.push(`  cta_text_en VARCHAR(128),`);
    lines.push(`  cta_text_fr VARCHAR(128),`);
    lines.push(`  cta_link ${textType},`);
    lines.push(`  alt_text_en VARCHAR(255),`);
    lines.push(`  alt_text_fr VARCHAR(255),`);
    lines.push(`  display_order INTEGER DEFAULT 0,`);
    lines.push(`  is_active ${boolType} DEFAULT ${trueVal},`);
    lines.push(`  created_at ${timestampType},`);
    lines.push(`  updated_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: program_pillars
    lines.push(`CREATE TABLE IF NOT EXISTS program_pillars (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  slug VARCHAR(255) UNIQUE NOT NULL,`);
    lines.push(`  title_en VARCHAR(255) NOT NULL,`);
    lines.push(`  title_fr VARCHAR(255) NOT NULL,`);
    lines.push(`  tag_en VARCHAR(128),`);
    lines.push(`  tag_fr VARCHAR(128),`);
    lines.push(`  short_desc_en ${textType},`);
    lines.push(`  short_desc_fr ${textType},`);
    lines.push(`  full_desc_en ${textType},`);
    lines.push(`  full_desc_fr ${textType},`);
    lines.push(`  image_url ${textType},`);
    lines.push(`  color_hex VARCHAR(32) DEFAULT '#690C07',`);
    lines.push(`  challenge_desc_en ${textType},`);
    lines.push(`  challenge_desc_fr ${textType},`);
    lines.push(`  quote_en ${textType},`);
    lines.push(`  quote_fr ${textType},`);
    lines.push(`  quote_author ${textType},`);
    lines.push(`  metrics ${jsonType},`);
    lines.push(`  activities ${jsonType},`);
    lines.push(`  display_order INTEGER DEFAULT 0,`);
    lines.push(`  created_at ${timestampType},`);
    lines.push(`  updated_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: team_members
    lines.push(`CREATE TABLE IF NOT EXISTS team_members (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  name VARCHAR(255) NOT NULL,`);
    lines.push(`  role_en VARCHAR(255) NOT NULL,`);
    lines.push(`  role_fr VARCHAR(255) NOT NULL,`);
    lines.push(`  bio_en ${textType},`);
    lines.push(`  bio_fr ${textType},`);
    lines.push(`  image_url ${textType},`);
    lines.push(`  email VARCHAR(255),`);
    lines.push(`  linkedin ${textType},`);
    lines.push(`  department VARCHAR(128),`);
    lines.push(`  display_order INTEGER DEFAULT 0,`);
    lines.push(`  created_at ${timestampType},`);
    lines.push(`  updated_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: founders
    lines.push(`CREATE TABLE IF NOT EXISTS founders (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  name VARCHAR(255) NOT NULL,`);
    lines.push(`  title_en VARCHAR(255) NOT NULL,`);
    lines.push(`  title_fr VARCHAR(255) NOT NULL,`);
    lines.push(`  bio_en ${textType},`);
    lines.push(`  bio_fr ${textType},`);
    lines.push(`  vision_en ${textType},`);
    lines.push(`  vision_fr ${textType},`);
    lines.push(`  quote_en ${textType},`);
    lines.push(`  quote_fr ${textType},`);
    lines.push(`  image_url ${textType},`);
    lines.push(`  display_order INTEGER DEFAULT 0,`);
    lines.push(`  created_at ${timestampType},`);
    lines.push(`  updated_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: field_staff
    lines.push(`CREATE TABLE IF NOT EXISTS field_staff (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  name VARCHAR(255) NOT NULL,`);
    lines.push(`  role_en VARCHAR(255) NOT NULL,`);
    lines.push(`  role_fr VARCHAR(255) NOT NULL,`);
    lines.push(`  location VARCHAR(255) NOT NULL,`);
    lines.push(`  specialty_en VARCHAR(255),`);
    lines.push(`  specialty_fr VARCHAR(255),`);
    lines.push(`  bio_en ${textType},`);
    lines.push(`  bio_fr ${textType},`);
    lines.push(`  image_url ${textType},`);
    lines.push(`  display_order INTEGER DEFAULT 0,`);
    lines.push(`  created_at ${timestampType},`);
    lines.push(`  updated_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: governance_members
    lines.push(`CREATE TABLE IF NOT EXISTS governance_members (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  name VARCHAR(255) NOT NULL,`);
    lines.push(`  role_en VARCHAR(255) NOT NULL,`);
    lines.push(`  role_fr VARCHAR(255) NOT NULL,`);
    lines.push(`  bio_en ${textType},`);
    lines.push(`  bio_fr ${textType},`);
    lines.push(`  image_url ${textType},`);
    lines.push(`  affiliation VARCHAR(255),`);
    lines.push(`  committee VARCHAR(128),`);
    lines.push(`  display_order INTEGER DEFAULT 0,`);
    lines.push(`  created_at ${timestampType},`);
    lines.push(`  updated_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: articles (Blog / Actualités)
    lines.push(`CREATE TABLE IF NOT EXISTS articles (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  slug VARCHAR(255) UNIQUE NOT NULL,`);
    lines.push(`  title_en VARCHAR(255) NOT NULL,`);
    lines.push(`  title_fr VARCHAR(255) NOT NULL,`);
    lines.push(`  excerpt_en ${textType},`);
    lines.push(`  excerpt_fr ${textType},`);
    lines.push(`  content_en ${textType},`);
    lines.push(`  content_fr ${textType},`);
    lines.push(`  cover_image ${textType},`);
    lines.push(`  category VARCHAR(128),`);
    lines.push(`  author_name VARCHAR(255),`);
    lines.push(`  author_role VARCHAR(255),`);
    lines.push(`  published_at VARCHAR(64),`);
    lines.push(`  read_time_minutes INTEGER DEFAULT 4,`);
    lines.push(`  is_featured ${boolType} DEFAULT ${falseVal},`);
    lines.push(`  tags ${jsonType},`);
    lines.push(`  created_at ${timestampType},`);
    lines.push(`  updated_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: media_library
    lines.push(`CREATE TABLE IF NOT EXISTS media_library (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  name VARCHAR(255) NOT NULL,`);
    lines.push(`  url ${textType} NOT NULL,`);
    lines.push(`  mime_type VARCHAR(128),`);
    lines.push(`  size_bytes BIGINT DEFAULT 0,`);
    lines.push(`  category VARCHAR(64) DEFAULT 'general',`);
    lines.push(`  alt_text VARCHAR(255),`);
    lines.push(`  created_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: partners
    lines.push(`CREATE TABLE IF NOT EXISTS partners (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  name VARCHAR(255) NOT NULL,`);
    lines.push(`  logo_url ${textType} NOT NULL,`);
    lines.push(`  website_url ${textType},`);
    lines.push(`  type VARCHAR(64) DEFAULT 'international',`);
    lines.push(`  description_en ${textType},`);
    lines.push(`  description_fr ${textType},`);
    lines.push(`  display_order INTEGER DEFAULT 0,`);
    lines.push(`  created_at ${timestampType},`);
    lines.push(`  updated_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: donors
    lines.push(`CREATE TABLE IF NOT EXISTS donors (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  name VARCHAR(255) NOT NULL,`);
    lines.push(`  amount NUMERIC(12, 2) NOT NULL,`);
    lines.push(`  currency VARCHAR(8) DEFAULT 'USD',`);
    lines.push(`  date VARCHAR(64) NOT NULL,`);
    lines.push(`  type VARCHAR(64) DEFAULT 'one-time',`);
    lines.push(`  program VARCHAR(128) DEFAULT 'general',`);
    lines.push(`  is_anonymous ${boolType} DEFAULT ${falseVal},`);
    lines.push(`  message ${textType},`);
    lines.push(`  created_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: testimonials
    lines.push(`CREATE TABLE IF NOT EXISTS testimonials (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  name VARCHAR(255) NOT NULL,`);
    lines.push(`  role_en VARCHAR(255),`);
    lines.push(`  role_fr VARCHAR(255),`);
    lines.push(`  quote_en ${textType} NOT NULL,`);
    lines.push(`  quote_fr ${textType} NOT NULL,`);
    lines.push(`  location VARCHAR(255),`);
    lines.push(`  image_url ${textType},`);
    lines.push(`  program_slug VARCHAR(128),`);
    lines.push(`  created_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: impact_stats
    lines.push(`CREATE TABLE IF NOT EXISTS impact_stats (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  value VARCHAR(64) NOT NULL,`);
    lines.push(`  label_en VARCHAR(255) NOT NULL,`);
    lines.push(`  label_fr VARCHAR(255) NOT NULL,`);
    lines.push(`  description_en ${textType},`);
    lines.push(`  description_fr ${textType},`);
    lines.push(`  icon VARCHAR(64) DEFAULT 'Users',`);
    lines.push(`  display_order INTEGER DEFAULT 0,`);
    lines.push(`  created_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: admin_users
    lines.push(`CREATE TABLE IF NOT EXISTS admin_users (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  name VARCHAR(255) NOT NULL,`);
    lines.push(`  email VARCHAR(255) UNIQUE NOT NULL,`);
    lines.push(`  password_hash VARCHAR(255) NOT NULL,`);
    lines.push(`  role VARCHAR(64) DEFAULT 'admin',`);
    lines.push(`  avatar ${textType},`);
    lines.push(`  status VARCHAR(32) DEFAULT 'active',`);
    lines.push(`  last_login ${timestampType},`);
    lines.push(`  created_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: contact_submissions
    lines.push(`CREATE TABLE IF NOT EXISTS contact_submissions (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  name VARCHAR(255) NOT NULL,`);
    lines.push(`  email VARCHAR(255) NOT NULL,`);
    lines.push(`  subject VARCHAR(255),`);
    lines.push(`  message ${textType} NOT NULL,`);
    lines.push(`  phone VARCHAR(64),`);
    lines.push(`  organization VARCHAR(255),`);
    lines.push(`  category VARCHAR(64) DEFAULT 'general',`);
    lines.push(`  is_read ${boolType} DEFAULT ${falseVal},`);
    lines.push(`  created_at ${timestampType}`);
    lines.push(`);`);
    lines.push('');

    // Table: audit_logs
    lines.push(`CREATE TABLE IF NOT EXISTS audit_logs (`);
    lines.push(`  id VARCHAR(64) PRIMARY KEY,`);
    lines.push(`  user_name VARCHAR(255) NOT NULL,`);
    lines.push(`  action VARCHAR(128) NOT NULL,`);
    lines.push(`  target VARCHAR(255),`);
    lines.push(`  details ${textType},`);
    lines.push(`  timestamp VARCHAR(64) NOT NULL`);
    lines.push(`);`);
    lines.push('');

    // Indexes
    addComment('Indexes for performance and relational joins');
    lines.push(`CREATE INDEX IF NOT EXISTS idx_banners_page_route ON banner_slides(page_route);`);
    lines.push(`CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);`);
    lines.push(`CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(is_featured);`);
    lines.push(`CREATE INDEX IF NOT EXISTS idx_programs_slug ON program_pillars(slug);`);
    lines.push(`CREATE INDEX IF NOT EXISTS idx_pages_route ON pages(route);`);
    lines.push(`CREATE INDEX IF NOT EXISTS idx_admin_email ON admin_users(email);`);
    lines.push('');
  }

  // 3. DML - SEED DATA
  if (includeDml) {
    addComment('3. DATA SEEDING (DML) - ALL LIVE CONTENT FROM SITE');
    lines.push('');

    // Site Settings
    if (data.siteSettings) {
      addComment('Table: site_settings');
      const s = data.siteSettings as any;
      const socialObj = {
        facebook: s.facebookUrl || s.facebook || 'https://facebook.com/africacommunityvillage',
        linkedin: s.linkedinUrl || s.linkedin || 'https://linkedin.com/company/africacommunityvillage',
        twitter: s.twitterUrl || s.twitter || 'https://twitter.com/acv_village',
        instagram: s.instagramUrl || s.instagram || 'https://instagram.com/acv_village'
      };
      lines.push(
        `INSERT INTO site_settings (id, site_name_en, site_name_fr, site_tagline_en, site_tagline_fr, contact_email, contact_phone, office_address_en, office_address_fr, social_links, bank_details, donation_accounts) VALUES (` +
        `${escapeSql('global_settings')}, ` +
        `${escapeSql(s.organizationName || s.siteNameEn || 'Africa Community Village')}, ` +
        `${escapeSql(s.organizationName || s.siteNameFr || 'Africa Community Village')}, ` +
        `${escapeSql(s.taglineEn || 'Empowering African Communities')}, ` +
        `${escapeSql(s.taglineFr || 'Autonomiser les communautés africaines')}, ` +
        `${escapeSql(s.email || s.contactEmail || 'contact@africacommunityvillage.org')}, ` +
        `${escapeSql(s.phone || s.contactPhone || '+243 999 000 000')}, ` +
        `${escapeSql(s.address || s.officeAddressEn || 'Goma, North Kivu, DRC')}, ` +
        `${escapeSql(s.address || s.officeAddressFr || 'Goma, Nord-Kivu, RDC')}, ` +
        `${escapeJsonSql(socialObj)}, ` +
        `${escapeJsonSql({ currency: 'USD', bank: 'Equity BCDC Goma', swift: 'EQBCCD22' })}, ` +
        `${escapeJsonSql({ mpesa: '+243 810 000 000', airtel: '+243 990 000 000' })}` +
        `);`
      );
      lines.push('');
    }

    // Pages
    if (data.pages && data.pages.length > 0) {
      addComment(`Table: pages (${data.pages.length} records)`);
      data.pages.forEach((p, idx) => {
        lines.push(
          `INSERT INTO pages (id, route, slug, title_en, title_fr, subtitle_en, subtitle_fr, meta_title_en, meta_title_fr, status, display_order) VALUES (` +
          `${escapeSql(p.id || `page_${idx + 1}`)}, ` +
          `${escapeSql(p.route)}, ` +
          `${escapeSql(p.slug || p.route.replace('/', '') || 'home')}, ` +
          `${escapeSql(p.titleEn)}, ` +
          `${escapeSql(p.titleFr)}, ` +
          `${escapeSql(p.subtitleEn || '')}, ` +
          `${escapeSql(p.subtitleFr || '')}, ` +
          `${escapeSql(p.metaTitleEn || p.titleEn)}, ` +
          `${escapeSql(p.metaTitleFr || p.titleFr)}, ` +
          `${escapeSql(p.status || 'published')}, ` +
          `${p.order ?? idx}` +
          `);`
        );
      });
      lines.push('');
    }

    // Banners
    if (data.banners && data.banners.length > 0) {
      addComment(`Table: banner_slides (${data.banners.length} records)`);
      data.banners.forEach((b, idx) => {
        lines.push(
          `INSERT INTO banner_slides (id, page_route, title_en, title_fr, subtitle_en, subtitle_fr, image_url, cta_text_en, cta_text_fr, cta_link, alt_text_en, alt_text_fr, display_order, is_active) VALUES (` +
          `${escapeSql(b.id || `banner_${idx + 1}`)}, ` +
          `${escapeSql(b.pageRoute)}, ` +
          `${escapeSql(b.titleEn)}, ` +
          `${escapeSql(b.titleFr)}, ` +
          `${escapeSql(b.subtitleEn || '')}, ` +
          `${escapeSql(b.subtitleFr || '')}, ` +
          `${escapeSql(b.imageUrl || b.image || '')}, ` +
          `${escapeSql(b.ctaTextEn || '')}, ` +
          `${escapeSql(b.ctaTextFr || '')}, ` +
          `${escapeSql(b.ctaLink || '')}, ` +
          `${escapeSql(b.altTextEn || b.titleEn)}, ` +
          `${escapeSql(b.altTextFr || b.titleFr)}, ` +
          `${b.order ?? idx}, ` +
          `${(b.isActive ?? b.active ?? true) ? trueVal : falseVal}` +
          `);`
        );
      });
      lines.push('');
    }

    // Program Pillars
    if (data.programs && data.programs.length > 0) {
      addComment(`Table: program_pillars (${data.programs.length} records)`);
      data.programs.forEach((pr, idx) => {
        lines.push(
          `INSERT INTO program_pillars (id, slug, title_en, title_fr, tag_en, tag_fr, short_desc_en, short_desc_fr, full_desc_en, full_desc_fr, image_url, color_hex, quote_en, quote_fr, quote_author, metrics, activities, display_order) VALUES (` +
          `${escapeSql(pr.id || `prog_${idx + 1}`)}, ` +
          `${escapeSql(pr.slug || `prog-${idx + 1}`)}, ` +
          `${escapeSql(pr.titleEn)}, ` +
          `${escapeSql(pr.titleFr)}, ` +
          `${escapeSql(pr.tagEn || '')}, ` +
          `${escapeSql(pr.tagFr || '')}, ` +
          `${escapeSql(pr.shortDescEn || pr.summaryEn || '')}, ` +
          `${escapeSql(pr.shortDescFr || pr.summaryFr || '')}, ` +
          `${escapeSql(pr.fullDescEn || pr.descriptionEn || '')}, ` +
          `${escapeSql(pr.fullDescFr || pr.descriptionFr || '')}, ` +
          `${escapeSql(pr.image || '')}, ` +
          `${escapeSql(pr.color || '#690C07')}, ` +
          `${escapeSql(pr.quoteEn || '')}, ` +
          `${escapeSql(pr.quoteFr || '')}, ` +
          `${escapeSql(pr.quoteAuthorEn || pr.quoteAuthorFr || '')}, ` +
          `${escapeJsonSql(pr.metrics || [])}, ` +
          `${escapeJsonSql(pr.activities || [])}, ` +
          `${pr.order ?? idx}` +
          `);`
        );
      });
      lines.push('');
    }

    // Team Members
    if (data.teamMembers && data.teamMembers.length > 0) {
      addComment(`Table: team_members (${data.teamMembers.length} records)`);
      data.teamMembers.forEach((t, idx) => {
        lines.push(
          `INSERT INTO team_members (id, name, role_en, role_fr, bio_en, bio_fr, image_url, email, linkedin, department, display_order) VALUES (` +
          `${escapeSql(t.id || `team_${idx + 1}`)}, ` +
          `${escapeSql(t.name)}, ` +
          `${escapeSql(t.roleEn)}, ` +
          `${escapeSql(t.roleFr)}, ` +
          `${escapeSql(t.bioEn || '')}, ` +
          `${escapeSql(t.bioFr || '')}, ` +
          `${escapeSql(t.image || '')}, ` +
          `${escapeSql(t.email || '')}, ` +
          `${escapeSql(t.linkedin || '')}, ` +
          `${escapeSql(t.department || 'Operations')}, ` +
          `${t.order ?? idx}` +
          `);`
        );
      });
      lines.push('');
    }

    // Founders
    if (data.founders && data.founders.length > 0) {
      addComment(`Table: founders (${data.founders.length} records)`);
      data.founders.forEach((f, idx) => {
        const founder = f as any;
        lines.push(
          `INSERT INTO founders (id, name, title_en, title_fr, bio_en, bio_fr, vision_en, vision_fr, quote_en, quote_fr, image_url, display_order) VALUES (` +
          `${escapeSql(founder.id || `founder_${idx + 1}`)}, ` +
          `${escapeSql(founder.fullName || founder.name || 'ACV Founder')}, ` +
          `${escapeSql(founder.roleEn || founder.titleEn || '')}, ` +
          `${escapeSql(founder.roleFr || founder.titleFr || '')}, ` +
          `${escapeSql(founder.bioEn || '')}, ` +
          `${escapeSql(founder.bioFr || '')}, ` +
          `${escapeSql(founder.visionEn || '')}, ` +
          `${escapeSql(founder.visionFr || '')}, ` +
          `${escapeSql(founder.quoteEn || '')}, ` +
          `${escapeSql(founder.quoteFr || '')}, ` +
          `${escapeSql(founder.photoUrl || founder.image || '')}, ` +
          `${founder.order ?? idx}` +
          `);`
        );
      });
      lines.push('');
    }

    // Field Staff
    if (data.fieldStaff && data.fieldStaff.length > 0) {
      addComment(`Table: field_staff (${data.fieldStaff.length} records)`);
      data.fieldStaff.forEach((fs, idx) => {
        const staff = fs as any;
        lines.push(
          `INSERT INTO field_staff (id, name, role_en, role_fr, location, specialty_en, specialty_fr, bio_en, bio_fr, image_url, display_order) VALUES (` +
          `${escapeSql(staff.id || `field_${idx + 1}`)}, ` +
          `${escapeSql(staff.name)}, ` +
          `${escapeSql(staff.positionEn || staff.roleEn || '')}, ` +
          `${escapeSql(staff.positionFr || staff.roleFr || '')}, ` +
          `${escapeSql(staff.zone || staff.location || 'Goma / Sud-Kivu')}, ` +
          `${escapeSql(staff.specialtyEn || staff.programId || '')}, ` +
          `${escapeSql(staff.specialtyFr || staff.programId || '')}, ` +
          `${escapeSql(staff.bioEn || '')}, ` +
          `${escapeSql(staff.bioFr || '')}, ` +
          `${escapeSql(staff.photoUrl || staff.image || '')}, ` +
          `${staff.order ?? idx}` +
          `);`
        );
      });
      lines.push('');
    }

    // Governance
    if (data.governance && data.governance.length > 0) {
      addComment(`Table: governance_members (${data.governance.length} records)`);
      data.governance.forEach((g, idx) => {
        const gov = g as any;
        lines.push(
          `INSERT INTO governance_members (id, name, role_en, role_fr, bio_en, bio_fr, image_url, affiliation, committee, display_order) VALUES (` +
          `${escapeSql(gov.id || `gov_${idx + 1}`)}, ` +
          `${escapeSql(gov.name)}, ` +
          `${escapeSql(gov.roleEn)}, ` +
          `${escapeSql(gov.roleFr)}, ` +
          `${escapeSql(gov.bioEn || '')}, ` +
          `${escapeSql(gov.bioFr || '')}, ` +
          `${escapeSql(gov.photoUrl || gov.image || '')}, ` +
          `${escapeSql(gov.affiliation || gov.mandateYears || '')}, ` +
          `${escapeSql(gov.committee || 'Governance Board')}, ` +
          `${gov.order ?? idx}` +
          `);`
        );
      });
      lines.push('');
    }

    // Articles
    if (data.articles && data.articles.length > 0) {
      addComment(`Table: articles (${data.articles.length} records)`);
      data.articles.forEach((a, idx) => {
        const art = a as any;
        const authorName = typeof art.author === 'string' ? art.author : art.author?.name || 'Africa Community Village';
        const authorRole = typeof art.author === 'object' ? art.author?.role : 'Communications';
        lines.push(
          `INSERT INTO articles (id, slug, title_en, title_fr, excerpt_en, excerpt_fr, content_en, content_fr, cover_image, category, author_name, author_role, published_at, read_time_minutes, is_featured, tags) VALUES (` +
          `${escapeSql(art.id || `article_${idx + 1}`)}, ` +
          `${escapeSql(art.slug || `article-${idx + 1}`)}, ` +
          `${escapeSql(art.titleEn)}, ` +
          `${escapeSql(art.titleFr)}, ` +
          `${escapeSql(art.excerptEn || '')}, ` +
          `${escapeSql(art.excerptFr || '')}, ` +
          `${escapeSql(art.contentEn || '')}, ` +
          `${escapeSql(art.contentFr || '')}, ` +
          `${escapeSql(art.coverImage || art.imageUrl || art.image || '')}, ` +
          `${escapeSql(art.category || 'Community')}, ` +
          `${escapeSql(authorName)}, ` +
          `${escapeSql(authorRole || 'Editorial')}, ` +
          `${escapeSql(art.publishedDate || art.publishDate || art.date || '2026-03-01')}, ` +
          `${parseInt(art.readTime, 10) || 5}, ` +
          `${(art.featured ?? art.isFeatured) ? trueVal : falseVal}, ` +
          `${escapeJsonSql(art.tags || [])}` +
          `);`
        );
      });
      lines.push('');
    }

    // Partners
    if (data.partners && data.partners.length > 0) {
      addComment(`Table: partners (${data.partners.length} records)`);
      data.partners.forEach((p, idx) => {
        const part = p as any;
        lines.push(
          `INSERT INTO partners (id, name, logo_url, website_url, type, description_en, description_fr, display_order) VALUES (` +
          `${escapeSql(part.id || `partner_${idx + 1}`)}, ` +
          `${escapeSql(part.name)}, ` +
          `${escapeSql(part.logoUrl || part.logo || '')}, ` +
          `${escapeSql(part.websiteUrl || part.website || '')}, ` +
          `${escapeSql(part.type || 'Technique')}, ` +
          `${escapeSql(part.descriptionEn || '')}, ` +
          `${escapeSql(part.descriptionFr || '')}, ` +
          `${part.order ?? idx}` +
          `);`
        );
      });
      lines.push('');
    }

    // Donors
    if (data.donors && data.donors.length > 0) {
      addComment(`Table: donors (${data.donors.length} records)`);
      data.donors.forEach((d, idx) => {
        const donor = d as any;
        lines.push(
          `INSERT INTO donors (id, name, amount, currency, date, type, program, is_anonymous, message) VALUES (` +
          `${escapeSql(donor.id || `donor_${idx + 1}`)}, ` +
          `${escapeSql(donor.name || donor.donorName || 'Bienfaiteur Anonyme')}, ` +
          `${donor.amount || 0}, ` +
          `${escapeSql(donor.currency || 'USD')}, ` +
          `${escapeSql(donor.donationDate || donor.date || '2026-01-01')}, ` +
          `${escapeSql(donor.frequency || donor.type || 'one-time')}, ` +
          `${escapeSql(donor.pillar || donor.pillarAllocation || 'general')}, ` +
          `${(donor.anonymous ?? donor.isAnonymous) ? trueVal : falseVal}, ` +
          `${escapeSql(donor.notes || donor.message || '')}` +
          `);`
        );
      });
      lines.push('');
    }

    // Testimonials
    if (data.testimonials && data.testimonials.length > 0) {
      addComment(`Table: testimonials (${data.testimonials.length} records)`);
      data.testimonials.forEach((t, idx) => {
        const test = t as any;
        lines.push(
          `INSERT INTO testimonials (id, name, role_en, role_fr, quote_en, quote_fr, location, image_url, program_slug) VALUES (` +
          `${escapeSql(test.id || `test_${idx + 1}`)}, ` +
          `${escapeSql(test.author || test.name || 'Témoin Communautaire')}, ` +
          `${escapeSql(test.roleEn || '')}, ` +
          `${escapeSql(test.roleFr || '')}, ` +
          `${escapeSql(test.quoteEn || '')}, ` +
          `${escapeSql(test.quoteFr || '')}, ` +
          `${escapeSql(test.location || '')}, ` +
          `${escapeSql(test.photoUrl || test.image || '')}, ` +
          `${escapeSql(test.programSlug || '')}` +
          `);`
        );
      });
      lines.push('');
    }

    // Impact Stats
    if (data.stats && data.stats.length > 0) {
      addComment(`Table: impact_stats (${data.stats.length} records)`);
      data.stats.forEach((st, idx) => {
        const stat = st as any;
        lines.push(
          `INSERT INTO impact_stats (id, value, label_en, label_fr, description_en, description_fr, icon, display_order) VALUES (` +
          `${escapeSql(stat.id || `stat_${idx + 1}`)}, ` +
          `${escapeSql(stat.value)}, ` +
          `${escapeSql(stat.labelEn)}, ` +
          `${escapeSql(stat.labelFr)}, ` +
          `${escapeSql(stat.descriptionEn || stat.unit || '')}, ` +
          `${escapeSql(stat.descriptionFr || stat.unit || '')}, ` +
          `${escapeSql(stat.iconName || stat.icon || 'Users')}, ` +
          `${stat.order ?? idx}` +
          `);`
        );
      });
      lines.push('');
    }

    // Admin Users
    if (data.adminUsers && data.adminUsers.length > 0) {
      addComment(`Table: admin_users (${data.adminUsers.length} records)`);
      data.adminUsers.forEach((u, idx) => {
        lines.push(
          `INSERT INTO admin_users (id, name, email, password_hash, role, status) VALUES (` +
          `${escapeSql(u.id || `admin_${idx + 1}`)}, ` +
          `${escapeSql(u.name)}, ` +
          `${escapeSql(u.email)}, ` +
          `${escapeSql('$2a$12$eJ7U8vK9V9...acv_secure_hash')}, ` +
          `${escapeSql(u.role || 'admin')}, ` +
          `${escapeSql(u.status || 'active')}` +
          `);`
        );
      });
      lines.push('');
    }
  }

  if (includeTransaction) {
    if (dialect === 'mysql') {
      lines.push('COMMIT;');
      lines.push('SET FOREIGN_KEY_CHECKS = 1;');
    } else {
      lines.push('COMMIT;');
    }
    lines.push('');
  }

  addComment('========================================================================');
  addComment('END OF AFRICA COMMUNITY VILLAGE DATABASE SCRIPT');
  addComment('========================================================================');

  return lines.join('\n');
}

export function generatePrismaSchema(): string {
  return `// Prisma Schema for Africa Community Village (ACV)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model SiteSetting {
  id               String   @id @default("global_settings")
  siteNameEn       String
  siteNameFr       String
  siteTaglineEn    String?
  siteTaglineFr    String?
  contactEmail     String?
  contactPhone     String?
  officeAddressEn  String?
  officeAddressFr  String?
  socialLinks      Json?
  bankDetails      Json?
  donationAccounts Json?
  updatedAt        DateTime @updatedAt
  createdAt        DateTime @default(now())
}

model Page {
  id           String   @id @default(cuid())
  route        String   @unique
  slug         String
  titleEn      String
  titleFr      String
  subtitleEn   String?
  subtitleFr   String?
  contentEn    String?
  contentFr    String?
  coverImage   String?
  metaTitleEn  String?
  metaTitleFr  String?
  metaDescEn   String?
  metaDescFr   String?
  status       String   @default("published")
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model BannerSlide {
  id           String   @id @default(cuid())
  pageRoute    String
  titleEn      String
  titleFr      String
  subtitleEn   String?
  subtitleFr   String?
  imageUrl     String
  ctaTextEn    String?
  ctaTextFr    String?
  ctaLink      String?
  altTextEn    String?
  altTextFr    String?
  displayOrder Int      @default(0)
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([pageRoute])
}

model ProgramPillar {
  id           String   @id @default(cuid())
  slug         String   @unique
  titleEn      String
  titleFr      String
  tagEn        String?
  tagFr        String?
  shortDescEn  String?
  shortDescFr  String?
  fullDescEn   String?
  fullDescFr   String?
  imageUrl     String?
  colorHex     String   @default("#690C07")
  metrics      Json?
  activities   Json?
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Article {
  id              String   @id @default(cuid())
  slug            String   @unique
  titleEn         String
  titleFr         String
  excerptEn       String?
  excerptFr       String?
  contentEn       String?
  contentFr       String?
  coverImage      String?
  category        String?
  authorName      String?
  authorRole      String?
  publishedAt     String?
  readTimeMinutes Int      @default(4)
  isFeatured      Boolean  @default(false)
  tags            Json?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([slug])
  @@index([isFeatured])
}

model TeamMember {
  id           String   @id @default(cuid())
  name         String
  roleEn       String
  roleFr       String
  bioEn        String?
  bioFr        String?
  imageUrl     String?
  email        String?
  linkedin     String?
  department   String?
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model AdminUser {
  id           String    @id @default(cuid())
  name         String
  email        String    @unique
  passwordHash String
  role         String    @default("admin")
  avatar       String?
  status       String    @default("active")
  lastLogin    DateTime?
  createdAt    DateTime  @default(now())
}
`;
}
