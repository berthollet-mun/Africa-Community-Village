import { z } from 'zod';

export const contentEntitySchema = z.enum([
  'pages',
  'banners',
  'programs',
  'team',
  'founders',
  'fieldStaff',
  'governance',
  'articles',
  'media',
  'partners',
  'donors',
  'testimonials',
  'stats',
  'siteSettings',
  'auditLogs',
  'contactSubmissions',
  'policies',
  'fieldNotes'
]);

export type ContentEntity = z.infer<typeof contentEntitySchema>;

export const adminEntitySchema = z.union([contentEntitySchema, z.literal('users')]);
export type AdminEntity = z.infer<typeof adminEntitySchema>;

export const entityPayloadSchema = z.record(z.string(), z.unknown());

export const idSchema = z.string().trim().min(1).max(191);

export const adminQuerySchema = z.object({
  search: z.string().trim().max(200).optional(),
  category: z.string().trim().max(100).optional(),
  status: z.string().trim().max(50).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(200).optional()
});

export const loginSchema = z.object({
  email: z.email().max(191),
  password: z.string().min(8).max(200)
});

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(150),
  email: z.email().max(191),
  phone: z.string().trim().max(50).optional(),
  category: z.string().trim().max(100).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10).max(10_000)
});

export const donationSchema = z.object({
  name: z.string().trim().max(150).optional(),
  email: z.email().max(191).optional(),
  amount: z.coerce.number().positive().max(1_000_000).default(50),
  currency: z.enum(['USD', 'EUR', 'CDF']).default('USD'),
  frequency: z.enum(['one-time', 'monthly', 'quarterly', 'yearly']).default('one-time'),
  pillar: z.string().trim().max(150).optional(),
  paymentMethod: z.string().trim().max(100).optional(),
  anonymous: z.boolean().default(false),
  notes: z.string().trim().max(2_000).optional()
});

export const articleInputSchema = z
  .object({
    id: idSchema.optional(),
    titleEn: z.string().trim().min(3).max(250),
    titleFr: z.string().trim().min(3).max(250),
    contentEn: z.string().trim().min(10),
    contentFr: z.string().trim().min(10),
    category: z.string().trim().min(2).max(100),
    status: z.enum(['published', 'draft'])
  })
  .catchall(z.unknown());
