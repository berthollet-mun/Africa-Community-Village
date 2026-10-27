export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUser extends BaseEntity {
  name: string;
  email: string;
  password?: string;
  role: 'super-admin' | 'admin' | 'editor' | 'viewer';
  avatar?: string;
  status: 'active' | 'suspended';
  lastLogin?: string;
}

export interface PageItem extends BaseEntity {
  route: string;
  slug: string;
  titleEn: string;
  titleFr: string;
  subtitleEn?: string;
  subtitleFr?: string;
  contentEn?: string;
  contentFr?: string;
  coverImage?: string;
  metaTitleEn?: string;
  metaTitleFr?: string;
  metaDescEn?: string;
  metaDescFr?: string;
  status: 'published' | 'draft';
  order: number;
}

export interface BannerSlide extends BaseEntity {
  pageRoute: string;
  titleEn: string;
  titleFr: string;
  subtitleEn?: string;
  subtitleFr?: string;
  image: string;
  ctaTextEn?: string;
  ctaTextFr?: string;
  ctaLink?: string;
  altTextEn?: string;
  altTextFr?: string;
  order: number;
  active: boolean;
  startDate?: string;
  endDate?: string;
}

export interface ProgramPillar extends BaseEntity {
  slug: string;
  titleEn: string;
  titleFr: string;
  tagEn?: string;
  tagFr?: string;
  shortDescEn: string;
  shortDescFr: string;
  fullDescEn: string;
  fullDescFr: string;
  image: string;
  icon: string;
  order: number;
  status: 'published' | 'draft';
  metrics: {
    value: string;
    labelEn: string;
    labelFr: string;
  }[];
  objectivesEn: string[];
  objectivesFr: string[];
  gallery?: string[];
}

export interface TeamMember extends BaseEntity {
  firstName: string;
  lastName: string;
  roleEn: string;
  roleFr: string;
  bioEn: string;
  bioFr: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  photoUrl: string;
  category: 'Direction' | 'Coordinateur' | 'Staff' | 'Board' | 'Bénévole' | 'Expert';
  order: number;
  status: 'visible' | 'hidden';
}

export interface Founder extends BaseEntity {
  fullName: string;
  roleEn: string;
  roleFr: string;
  bioEn: string;
  bioFr: string;
  photoUrl: string;
  yearsActive: string;
  quoteEn?: string;
  quoteFr?: string;
  linkedin?: string;
  twitter?: string;
  order: number;
  status: 'visible' | 'hidden';
}

export interface FieldAgent extends BaseEntity {
  name: string;
  positionEn: string;
  positionFr: string;
  zone: string; // e.g. Goma, Nyiragongo, Rutshuru, Masisi, Bukavu
  programId: string;
  contact?: string;
  bioEn?: string;
  bioFr?: string;
  photoUrl: string;
  entryDate: string;
  status: 'active' | 'leave';
}

export interface GovernanceMember extends BaseEntity {
  name: string;
  roleEn: string;
  roleFr: string;
  mandateYears: string;
  bioEn: string;
  bioFr: string;
  photoUrl: string;
  documentPdfUrl?: string;
  documentTitleEn?: string;
  documentTitleFr?: string;
  order: number;
  status: 'active' | 'honorary';
}

export interface Article extends BaseEntity {
  slug: string;
  titleEn: string;
  titleFr: string;
  excerptEn: string;
  excerptFr: string;
  contentEn: string;
  contentFr: string;
  coverImage: string;
  gallery?: string[];
  author: string;
  authorId?: string;
  category: string;
  tags: string[];
  readTime: string;
  publishDate: string;
  status: 'published' | 'draft' | 'archived';
  views?: number;
  featured?: boolean;
}

export interface MediaItem extends BaseEntity {
  title: string;
  filename: string;
  url: string;
  type: 'image' | 'pdf' | 'video';
  mimeType: string;
  sizeBytes: number;
  altTextEn?: string;
  altTextFr?: string;
  tags?: string[];
  dimensions?: string;
}

export interface Partner extends BaseEntity {
  name: string;
  logoUrl: string;
  type: 'Financier' | 'Technique' | 'Institutionnel' | 'Recherche';
  websiteUrl?: string;
  descriptionEn?: string;
  descriptionFr?: string;
  order: number;
  status: 'active' | 'past';
}

export interface Donor extends BaseEntity {
  name: string;
  email?: string;
  type: 'Individuel' | 'Institution' | 'Fondation' | 'Diaspora';
  amount: number;
  currency: string;
  donationDate: string;
  anonymous: boolean;
  frequency: 'one-time' | 'monthly';
  pillarAllocation?: string;
  notes?: string;
  receiptPdfUrl?: string;
  paymentMethod?: string;
}

export interface Testimonial extends BaseEntity {
  quoteEn: string;
  quoteFr: string;
  author: string;
  roleEn: string;
  roleFr: string;
  location?: string;
  photoUrl?: string;
  programSlug?: string;
  status: 'visible' | 'hidden';
  order: number;
}

export interface ImpactStat extends BaseEntity {
  labelEn: string;
  labelFr: string;
  value: string;
  unit?: string;
  iconName: string;
  displayPage: string; // e.g. "home", "about", "programs"
  order: number;
  status: 'active' | 'hidden';
}

export interface SiteSettings extends BaseEntity {
  organizationName: string;
  address: string;
  email: string;
  secondaryEmail?: string;
  phone: string;
  secondaryPhone?: string;
  whatsapp: string;
  officeHoursEn: string;
  officeHoursFr: string;
  registrationNumber: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  youtubeUrl?: string;
  legalNoticeEn?: string;
  legalNoticeFr?: string;
  privacyPolicyEn?: string;
  privacyPolicyFr?: string;
  defaultOgImage?: string;
  bannerSpeedMs?: number;
}

export interface AuditLog extends BaseEntity {
  userName: string;
  userEmail: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'upload' | 'status_change';
  entity: string;
  entityId?: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface ContactSubmission extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  category: string;
  subject: string;
  message: string;
  status: 'new' | 'reviewed' | 'replied';
  read: boolean;
  date: string;
}
