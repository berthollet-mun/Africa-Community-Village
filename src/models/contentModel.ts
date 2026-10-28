import { randomUUID } from 'node:crypto';
import { Prisma } from '@prisma/client';
import type { ContentEntity } from '@/lib/validation';
import { prisma } from '@/models/prisma/client';

export interface ContentQuery {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface ContentQueryResult<T> {
  data: T[];
  total: number;
}

type DomainRecord = Record<string, unknown> & { id: string; createdAt?: string; updatedAt?: string };
type DbRecord = Record<string, unknown> & { externalId: string; createdAt: Date; updatedAt?: Date; data?: unknown };

interface CrudDelegate {
  findMany(args?: unknown): Promise<DbRecord[]>;
  create(args: { data: Record<string, unknown> }): Promise<DbRecord>;
  update(args: { where: { externalId: string }; data: Record<string, unknown> }): Promise<DbRecord>;
  updateMany(args: { where: Record<string, unknown>; data: Record<string, unknown> }): Promise<{ count: number }>;
  deleteMany(args: { where: Record<string, unknown> }): Promise<{ count: number }>;
}

const teamCategories = {
  founders: 'Founder',
  fieldStaff: 'FieldStaff',
  governance: 'Governance'
} as const;

const delegates = {
  pages: prisma.page,
  banners: prisma.banner,
  programs: prisma.program,
  team: prisma.teamMember,
  founders: prisma.teamMember,
  fieldStaff: prisma.teamMember,
  governance: prisma.teamMember,
  articles: prisma.article,
  media: prisma.media,
  partners: prisma.partner,
  donors: prisma.donation,
  testimonials: prisma.testimonial,
  stats: prisma.impactStat,
  auditLogs: prisma.auditLog,
  contactSubmissions: prisma.contactSubmission,
  policies: prisma.policyDocument,
  fieldNotes: prisma.fieldNote
} as const;

function delegateFor(entity: Exclude<ContentEntity, 'siteSettings'>): CrudDelegate {
  return delegates[entity] as unknown as CrudDelegate;
}

function jsonObject(value: Record<string, unknown>): Prisma.InputJsonObject {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonObject;
}

function jsonValue(value: unknown): Prisma.InputJsonValue | undefined {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function withoutMetadata(data: Record<string, unknown>) {
  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...payload } = data;
  return payload;
}

function str(data: Record<string, unknown>, keys: string[], fallback = ''): string {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return fallback;
}

function nullable(data: Record<string, unknown>, keys: string[]): string | null {
  return str(data, keys) || null;
}

function num(data: Record<string, unknown>, keys: string[], fallback = 0): number {
  for (const key of keys) {
    if (data[key] === '' || data[key] === null || data[key] === undefined) continue;
    const value = Number(data[key]);
    if (Number.isFinite(value)) return value;
  }
  return fallback;
}

function bool(data: Record<string, unknown>, keys: string[], fallback = false): boolean {
  for (const key of keys) if (typeof data[key] === 'boolean') return data[key];
  return fallback;
}

function date(data: Record<string, unknown>, keys: string[], fallback?: Date): Date | null {
  for (const key of keys) {
    const value = data[key];
    if (typeof value !== 'string' && !(value instanceof Date)) continue;
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return fallback ?? null;
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 180) || randomUUID();
}

function teamCategory(entity: ContentEntity, data?: Record<string, unknown>): string {
  if (entity === 'founders' || entity === 'fieldStaff' || entity === 'governance') return teamCategories[entity];
  return data ? str(data, ['category'], 'Staff') : 'Staff';
}

function serialized(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'bigint') return Number(value);
  if (value && typeof value === 'object' && 'toNumber' in value && typeof value.toNumber === 'function') {
    return value.toNumber();
  }
  return value;
}

function toDomain<T>(record: DbRecord): T {
  const stored = record.data && typeof record.data === 'object' && !Array.isArray(record.data)
    ? record.data as Record<string, unknown>
    : {};
  const explicit: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (['id', 'externalId', 'data', 'deletedAt', 'passwordHash', 'authorId', 'uploadedBy', 'userId', 'pageId'].includes(key)) continue;
    explicit[key] = serialized(value);
  }

  const aliases: Record<string, string> = {
    orderIndex: 'order',
    imageUrl: 'image',
    fileName: 'filename',
    fileUrl: 'url',
    fileType: 'type',
    fileSize: 'sizeBytes',
    donorName: 'name',
    donorEmail: 'email',
    donorType: 'type',
    isAnonymous: 'anonymous',
    isRead: 'read',
    noteDate: 'date',
    tableName: 'entity',
    recordId: 'entityId',
    authorName: 'author',
    isFeatured: 'featured',
    publishedAt: 'publishDate'
  };
  for (const [source, target] of Object.entries(aliases)) {
    if (source in explicit) explicit[target] = explicit[source];
  }
  if ('imageUrl' in explicit) explicit.coverImage ??= explicit.imageUrl;
  if ('isActive' in explicit) explicit.active = explicit.isActive;
  if ('donatedAt' in explicit && typeof explicit.donatedAt === 'string') {
    explicit.donationDate = explicit.donatedAt.slice(0, 10);
    explicit.date = explicit.donatedAt.slice(0, 10);
  }
  if ('publishedAt' in explicit && typeof explicit.publishedAt === 'string') {
    explicit.publishedDate = explicit.publishedAt.slice(0, 10);
    explicit.publishDate = explicit.publishedAt.slice(0, 10);
  }
  if ('noteDate' in explicit && typeof explicit.noteDate === 'string') explicit.date = explicit.noteDate.slice(0, 10);
  if ('createdAt' in explicit && !('timestamp' in explicit) && 'action' in explicit) explicit.timestamp = explicit.createdAt;

  return { ...stored, ...explicit, id: record.externalId } as T;
}

function createData(entity: Exclude<ContentEntity, 'siteSettings'>, id: string, input: Record<string, unknown>) {
  const data = withoutMetadata(input);
  const common = { externalId: id, data: jsonObject(data) };

  switch (entity) {
    case 'pages': {
      const route = str(data, ['route'], `/${id}`);
      return { ...common, route, slug: str(data, ['slug'], slugify(route)),
        titleEn: str(data, ['titleEn'], 'Untitled page'), titleFr: str(data, ['titleFr'], 'Page sans titre'),
        subtitleEn: nullable(data, ['subtitleEn']), subtitleFr: nullable(data, ['subtitleFr']),
        contentEn: nullable(data, ['contentEn']), contentFr: nullable(data, ['contentFr']),
        coverImage: nullable(data, ['coverImage']), seoMeta: jsonValue({ metaTitleEn: data.metaTitleEn,
          metaTitleFr: data.metaTitleFr, metaDescEn: data.metaDescEn, metaDescFr: data.metaDescFr }),
        status: str(data, ['status'], 'draft'), orderIndex: num(data, ['order']) };
    }
    case 'banners':
      return { ...common, pageRoute: str(data, ['pageRoute', 'page_assignment'], '/'),
        imageUrl: str(data, ['imageUrl', 'image']), titleEn: str(data, ['titleEn'], 'Banner'),
        titleFr: str(data, ['titleFr'], 'Bannière'), subtitleEn: nullable(data, ['subtitleEn']),
        subtitleFr: nullable(data, ['subtitleFr']), ctaTextEn: nullable(data, ['ctaTextEn']),
        ctaTextFr: nullable(data, ['ctaTextFr']), ctaLink: nullable(data, ['ctaLink']),
        altTextEn: nullable(data, ['altTextEn']), altTextFr: nullable(data, ['altTextFr']),
        orderIndex: num(data, ['order']), isActive: bool(data, ['isActive', 'active'], true),
        startDate: date(data, ['startDate']), endDate: date(data, ['endDate']) };
    case 'programs': {
      const titleEn = str(data, ['titleEn'], 'Program');
      return { ...common, slug: str(data, ['slug'], slugify(titleEn)), titleEn,
        titleFr: str(data, ['titleFr'], titleEn),
        descriptionEn: nullable(data, ['descriptionEn', 'fullDescEn', 'shortDescEn', 'summaryEn']),
        descriptionFr: nullable(data, ['descriptionFr', 'fullDescFr', 'shortDescFr', 'summaryFr']),
        icon: nullable(data, ['icon']), imageUrl: nullable(data, ['imageUrl', 'image']),
        status: str(data, ['status'], 'draft'), orderIndex: num(data, ['order']),
        metrics: jsonValue(data.metrics), objectivesEn: jsonValue(data.objectivesEn),
        objectivesFr: jsonValue(data.objectivesFr), gallery: jsonValue(data.gallery) };
    }
    case 'team':
    case 'founders':
    case 'fieldStaff':
    case 'governance':
      return { ...common, name: str(data, ['name', 'fullName'], 'Team member'),
        roleEn: str(data, ['roleEn', 'positionEn'], 'Team member'),
        roleFr: str(data, ['roleFr', 'positionFr'], 'Membre de l’équipe'),
        bioEn: nullable(data, ['bioEn']), bioFr: nullable(data, ['bioFr']),
        photoUrl: nullable(data, ['photoUrl', 'image']), category: teamCategory(entity, data),
        socialLinks: jsonValue({ linkedin: data.linkedin, twitter: data.twitter, email: data.email, phone: data.phone }),
        status: str(data, ['status'], entity === 'fieldStaff' || entity === 'governance' ? 'active' : 'visible'),
        orderIndex: num(data, ['order']), deletedAt: null };
    case 'articles': {
      const titleEn = str(data, ['titleEn'], 'Untitled article');
      const status = str(data, ['status'], 'draft');
      return { ...common, titleEn, titleFr: str(data, ['titleFr'], titleEn),
        slug: str(data, ['slug'], slugify(titleEn)), excerptEn: nullable(data, ['excerptEn']),
        excerptFr: nullable(data, ['excerptFr']), contentEn: str(data, ['contentEn']),
        contentFr: str(data, ['contentFr']), coverImage: nullable(data, ['coverImage', 'imageUrl', 'image']),
        authorName: nullable(data, ['author']), category: str(data, ['category'], 'News'), status,
        readTime: nullable(data, ['readTime']), isFeatured: bool(data, ['isFeatured', 'featured']),
        tags: jsonValue(data.tags), views: num(data, ['views']),
        publishedAt: date(data, ['publishedDate', 'publishDate', 'date'], status === 'published' ? new Date() : undefined),
        deletedAt: null };
    }
    case 'media':
      return { ...common, title: str(data, ['title'], 'Media'), fileName: str(data, ['filename', 'fileName'], id),
        fileUrl: str(data, ['url', 'fileUrl']), fileType: str(data, ['type', 'fileType'], 'image'),
        mimeType: nullable(data, ['mimeType']), fileSize: BigInt(Math.max(0, num(data, ['sizeBytes', 'fileSize']))),
        altTextEn: nullable(data, ['altTextEn']), altTextFr: nullable(data, ['altTextFr']) };
    case 'partners':
      return { ...common, name: str(data, ['name'], 'Partner'), logoUrl: nullable(data, ['logoUrl']),
        websiteUrl: nullable(data, ['websiteUrl']), descriptionEn: nullable(data, ['descriptionEn']),
        descriptionFr: nullable(data, ['descriptionFr']), type: nullable(data, ['type']),
        status: str(data, ['status'], 'active'), orderIndex: num(data, ['order']) };
    case 'donors':
      return { ...common, donorName: nullable(data, ['donorName', 'name']), donorEmail: nullable(data, ['donorEmail', 'email']),
        donorType: nullable(data, ['type']), amount: num(data, ['amount']),
        currency: str(data, ['currency'], 'USD').slice(0, 3).toUpperCase(), frequency: str(data, ['frequency'], 'one-time'),
        pillarAllocation: nullable(data, ['pillarAllocation', 'pillar']), paymentMethod: nullable(data, ['paymentMethod']),
        isAnonymous: bool(data, ['anonymous', 'isAnonymous']), status: str(data, ['status'], 'pledged'),
        notes: nullable(data, ['notes']), donatedAt: date(data, ['donationDate', 'date'], new Date()) ?? new Date() };
    case 'testimonials':
      return { ...common, quoteEn: str(data, ['quoteEn']), quoteFr: str(data, ['quoteFr']),
        author: str(data, ['author'], 'Anonymous'), roleEn: nullable(data, ['roleEn']), roleFr: nullable(data, ['roleFr']),
        location: nullable(data, ['location']), photoUrl: nullable(data, ['photoUrl']), programSlug: nullable(data, ['programSlug']),
        status: str(data, ['status'], 'visible'), orderIndex: num(data, ['order']) };
    case 'stats':
      return { ...common, labelEn: str(data, ['labelEn']), labelFr: str(data, ['labelFr']),
        value: str(data, ['value'], '0'), unit: nullable(data, ['unit']), iconName: nullable(data, ['iconName']),
        displayPage: str(data, ['displayPage'], '/'), status: str(data, ['status'], 'active'), orderIndex: num(data, ['order']) };
    case 'auditLogs': {
      const { data: _data, ...auditCommon } = common;
      return { ...auditCommon, userName: nullable(data, ['userName']), userEmail: nullable(data, ['userEmail']),
        action: str(data, ['action'], 'create'), tableName: str(data, ['entity', 'tableName'], 'unknown'),
        recordId: nullable(data, ['entityId', 'recordId']), details: nullable(data, ['details']),
        ipAddress: nullable(data, ['ipAddress']), createdAt: date(data, ['timestamp'], new Date()) ?? new Date() };
    }
    case 'contactSubmissions':
      return { ...common, name: str(data, ['name']), email: str(data, ['email']).toLowerCase(),
        phone: nullable(data, ['phone']), category: nullable(data, ['category', 'reason']), subject: nullable(data, ['subject']),
        message: str(data, ['message']), status: str(data, ['status'], 'new'), isRead: bool(data, ['read', 'isRead']) };
    case 'policies':
      return { ...common, titleEn: str(data, ['titleEn']), titleFr: str(data, ['titleFr']),
        contentEn: str(data, ['contentEn']), contentFr: str(data, ['contentFr']), status: str(data, ['status'], 'published') };
    case 'fieldNotes':
      return { ...common, titleEn: str(data, ['titleEn']), titleFr: str(data, ['titleFr']),
        captionEn: nullable(data, ['captionEn']), captionFr: nullable(data, ['captionFr']),
        location: nullable(data, ['location']), pillar: nullable(data, ['pillar']),
        noteDate: date(data, ['date', 'noteDate'], new Date()) ?? new Date(), status: str(data, ['status'], 'published') };
  }
}

function listArgs(entity: Exclude<ContentEntity, 'siteSettings'>) {
  if (entity === 'articles') return { where: { deletedAt: null }, orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }] };
  if (entity === 'team') return { where: { deletedAt: null, category: { notIn: Object.values(teamCategories) } }, orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }] };
  if (entity === 'founders' || entity === 'fieldStaff' || entity === 'governance') {
    return { where: { deletedAt: null, category: teamCategories[entity] }, orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }] };
  }
  if (['pages', 'banners', 'programs', 'partners', 'testimonials', 'stats'].includes(entity)) {
    return { orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }] };
  }
  if (entity === 'donors') return { orderBy: { donatedAt: 'desc' } };
  if (entity === 'fieldNotes') return { orderBy: { noteDate: 'desc' } };
  return { orderBy: { createdAt: 'desc' } };
}

async function listSettings<T>(): Promise<T[]> {
  const settings = await prisma.setting.findMany({ orderBy: { settingKey: 'asc' } });
  if (!settings.length) return [];
  const result = Object.fromEntries(settings.map((item) => [item.settingKey, item.settingValue]));
  const createdAt = settings.reduce((value, item) => item.createdAt < value ? item.createdAt : value, settings[0].createdAt);
  const updatedAt = settings.reduce((value, item) => item.updatedAt > value ? item.updatedAt : value, settings[0].updatedAt);
  return [{ id: 'settings_main', ...result, createdAt: createdAt.toISOString(), updatedAt: updatedAt.toISOString() } as T];
}

async function upsertSettings(data: Record<string, unknown>): Promise<DomainRecord> {
  const payload = withoutMetadata(data);
  await prisma.$transaction(Object.entries(payload).map(([settingKey, value]) => prisma.setting.upsert({
    where: { settingKey },
    update: { settingValue: jsonValue(value) ?? Prisma.JsonNull },
    create: { settingKey, settingValue: jsonValue(value) ?? Prisma.JsonNull, groupName: 'general', isPublic: true }
  })));
  return (await listSettings<DomainRecord>())[0];
}

async function listRecords<T extends DomainRecord>(entity: ContentEntity): Promise<T[]> {
  if (entity === 'siteSettings') return listSettings<T>();
  const records = await delegateFor(entity).findMany(listArgs(entity));
  return records.map((record) => toDomain<T>(record));
}

async function createRecord<T extends DomainRecord>(entity: ContentEntity, input: Record<string, unknown>): Promise<T> {
  if (entity === 'siteSettings') return upsertSettings(input) as Promise<T>;
  const id = typeof input.id === 'string' && input.id.trim() ? input.id.trim() : randomUUID();
  const record = await delegateFor(entity).create({ data: createData(entity, id, input) });
  return toDomain<T>(record);
}

async function updateRecord<T extends DomainRecord>(entity: ContentEntity, id: string, patch: Record<string, unknown>): Promise<T | null> {
  const current = await contentModel.findById<DomainRecord>(entity, id);
  if (!current) return null;
  const merged = { ...current, ...patch, id };
  if (entity === 'siteSettings') return upsertSettings(merged) as Promise<T>;
  const { externalId: _externalId, ...data } = createData(entity, id, merged);
  const record = await delegateFor(entity).update({ where: { externalId: id }, data });
  return toDomain<T>(record);
}

async function deleteRecord(entity: ContentEntity, id: string): Promise<boolean> {
  if (entity === 'siteSettings') return (await prisma.setting.deleteMany({})).count > 0;
  if (entity === 'articles') {
    return (await prisma.article.updateMany({ where: { externalId: id, deletedAt: null }, data: { deletedAt: new Date() } })).count > 0;
  }
  if (entity === 'team' || entity === 'founders' || entity === 'fieldStaff' || entity === 'governance') {
    return (await prisma.teamMember.updateMany({ where: { externalId: id, deletedAt: null }, data: { deletedAt: new Date() } })).count > 0;
  }
  return (await delegateFor(entity).deleteMany({ where: { externalId: id } })).count > 0;
}

export const contentModel = {
  list: listRecords,

  async query<T extends DomainRecord>(entity: ContentEntity, query: ContentQuery): Promise<ContentQueryResult<T>> {
    let items = await listRecords<T>(entity);
    if (query.search) {
      const needle = query.search.toLocaleLowerCase();
      items = items.filter((item) => JSON.stringify(item).toLocaleLowerCase().includes(needle));
    }
    if (query.category && query.category !== 'all') {
      items = items.filter((item) => item.category === query.category || item.type === query.category);
    }
    if (query.status && query.status !== 'all') items = items.filter((item) => item.status === query.status);
    const total = items.length;
    if (query.limit) {
      const start = ((query.page ?? 1) - 1) * query.limit;
      items = items.slice(start, start + query.limit);
    }
    return { data: items, total };
  },

  async findById<T extends DomainRecord>(entity: ContentEntity, id: string): Promise<T | null> {
    return (await listRecords<T>(entity)).find((item) => item.id === id) ?? null;
  },

  create: createRecord,
  update: updateRecord,
  delete: deleteRecord
};
