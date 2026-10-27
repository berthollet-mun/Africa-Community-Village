export type Language = 'en' | 'fr';

export type PageRoute =
  | '/'
  | '/about'
  | '/about/our-story'
  | '/about/our-team'
  | '/about/governance'
  | '/about/field-notes'
  | '/programs'
  | '/programs/education-youth'
  | '/programs/nature-biodiversity'
  | '/programs/agriculture-food-security'
  | '/programs/health-wellbeing'
  | '/programs/socio-economic-empowerment'
  | '/approach'
  | '/blog'
  | '/contact'
  | '/donate'
  | '/admin'
  | '/admin/login'
  | '/admin/dashboard';

export interface BaseEntity {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUser extends BaseEntity {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'super-admin' | 'admin' | 'editor' | 'viewer' | string;
  avatar?: string;
  status?: 'active' | 'suspended';
  lastLogin?: string;
}

export interface PageItem extends BaseEntity {
  id: string;
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
  id: string;
  pageRoute: PageRoute | string;
  titleEn: string;
  titleFr: string;
  subtitleEn?: string;
  subtitleFr?: string;
  imageUrl?: string;
  image?: string;
  ctaTextEn?: string;
  ctaTextFr?: string;
  ctaLink?: string;
  altTextEn?: string;
  altTextFr?: string;
  order: number;
  isActive?: boolean;
  active?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface ProgramPillar extends BaseEntity {
  id: string;
  slug?: string;
  titleEn: string;
  titleFr: string;
  tagEn?: string;
  tagFr?: string;
  shortDescEn?: string;
  shortDescFr?: string;
  fullDescEn?: string;
  fullDescFr?: string;
  summaryEn?: string;
  summaryFr?: string;
  descriptionEn?: string;
  descriptionFr?: string;
  order?: number;
  route?: string;
  image?: string;
  icon?: string;
  color?: string;
  badgeBg?: string;
  badgeText?: string;
  challengeTitleEn?: string;
  challengeTitleFr?: string;
  challengeDescEn?: string;
  challengeDescFr?: string;
  quoteEn?: string;
  quoteFr?: string;
  quoteAuthorEn?: string;
  quoteAuthorFr?: string;
  gallery?: string[];
  objectivesEn?: string[];
  objectivesFr?: string[];
  status?: 'published' | 'draft';
  metrics: {
    value: string;
    labelEn: string;
    labelFr: string;
  }[];
  activities?: {
    id: string;
    titleEn: string;
    titleFr: string;
    descEn: string;
    descFr: string;
  }[];
}

export interface TeamMember extends BaseEntity {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  roleEn: string;
  roleFr: string;
  category?: 'leadership' | 'operations' | 'Direction' | 'Coordinateur' | 'Staff' | 'Board' | 'Bénévole' | 'Expert' | string;
  department?: string;
  bioEn: string;
  bioFr: string;
  photoUrl?: string;
  image?: string;
  initials?: string;
  bgGradient?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  order?: number;
  status?: 'visible' | 'hidden';
}

export interface Founder extends BaseEntity {
  id: string;
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
  id: string;
  name: string;
  positionEn: string;
  positionFr: string;
  zone: string;
  programId: string;
  contact?: string;
  bioEn?: string;
  bioFr?: string;
  photoUrl: string;
  entryDate: string;
  status: 'active' | 'leave';
}

export interface GovernanceMember extends BaseEntity {
  id: string;
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

export interface GovernanceTier {
  id: string;
  step: string;
  titleEn: string;
  titleFr: string;
  descEn: string;
  descFr: string;
}

export interface PolicyDocument {
  id: string;
  titleEn: string;
  titleFr: string;
  descEn: string;
  descFr: string;
  icon?: string;
  updatedDate?: string;
  contentEn: string;
  contentFr: string;
}

export interface BlogPost extends BaseEntity {
  id: string;
  slug?: string;
  titleEn: string;
  titleFr: string;
  category: string;
  pillarSlug?: string;
  publishedDate?: string;
  publishDate?: string;
  date?: string;
  readTime: string;
  author: string;
  excerptEn: string;
  excerptFr: string;
  contentEn: string;
  contentFr: string;
  imageUrl?: string;
  image?: string;
  coverImage?: string;
  featured?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  status?: 'published' | 'draft' | 'archived';
  views?: number;
}

export type Article = BlogPost;

export interface FieldNote {
  id: string;
  titleEn: string;
  titleFr: string;
  location: string;
  date: string;
  captionEn: string;
  captionFr: string;
  pillar: string;
  icon: string;
  color: string;
}

export interface MediaItem extends BaseEntity {
  id: string;
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
  id: string;
  name: string;
  logoUrl: string;
  type: 'Financier' | 'Technique' | 'Institutionnel' | 'Recherche' | string;
  websiteUrl?: string;
  descriptionEn?: string;
  descriptionFr?: string;
  order: number;
  status: 'active' | 'past';
}

export interface Donor extends BaseEntity {
  id: string;
  name?: string;
  email?: string;
  type?: 'Individuel' | 'Institution' | 'Fondation' | 'Diaspora' | string;
  amount: number;
  currency: string;
  donationDate?: string;
  date?: string;
  anonymous?: boolean;
  frequency: 'one-time' | 'once' | 'monthly';
  pillarAllocation?: string;
  pillar?: string;
  notes?: string;
  receiptPdfUrl?: string;
  paymentMethod?: string;
  donorName?: string;
  donorEmail?: string;
  status?: 'completed' | 'pledged';
}

export type DonationRecord = Donor;

export interface Testimonial extends BaseEntity {
  id: string;
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
  id: string;
  labelEn: string;
  labelFr: string;
  value: string;
  unit?: string;
  iconName: string;
  displayPage: string;
  order: number;
  status: 'active' | 'hidden';
}

export interface ContactSubmission extends BaseEntity {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category?: string;
  subject?: string;
  reason?: string;
  message: string;
  createdAt?: string;
  date?: string;
  status?: 'new' | 'reviewed' | 'replied';
  read?: boolean;
}

export interface SiteSettings extends BaseEntity {
  id?: string;
  organizationName?: string;
  address: string;
  email: string;
  secondaryEmail?: string;
  phone: string;
  secondaryPhone?: string;
  whatsapp?: string;
  officeHoursEn?: string;
  officeHoursFr?: string;
  registrationNumber?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  legalNoticeEn?: string;
  legalNoticeFr?: string;
  privacyPolicyEn?: string;
  privacyPolicyFr?: string;
  defaultOgImage?: string;
  bannerSpeedMs?: number;
}

export interface AuditLog extends BaseEntity {
  id: string;
  userName: string;
  userEmail: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'upload' | 'status_change';
  entity: string;
  entityId?: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}
