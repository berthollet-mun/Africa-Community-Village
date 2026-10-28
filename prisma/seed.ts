import { hash } from 'bcryptjs';
import type { ContentEntity } from '../src/lib/validation';
import { contentModel } from '../src/models/contentModel';
import { prisma } from '../src/models/prisma/client';
import { initialFieldNotes, initialPolicyDocuments } from '../src/data/mockData';
import {
  seedArticles,
  seedAuditLogs,
  seedBanners,
  seedContactSubmissions,
  seedDonors,
  seedFieldStaff,
  seedFounders,
  seedGovernance,
  seedImpactStats,
  seedMedia,
  seedPages,
  seedPartners,
  seedPrograms,
  seedSiteSettings,
  seedTeam,
  seedTestimonials,
  seedUsers
} from '../server/repository/seedData';

const collections: Partial<Record<ContentEntity, Array<Record<string, unknown>>>> = {
  pages: seedPages as unknown as Array<Record<string, unknown>>,
  banners: seedBanners as unknown as Array<Record<string, unknown>>,
  programs: seedPrograms as unknown as Array<Record<string, unknown>>,
  team: seedTeam as unknown as Array<Record<string, unknown>>,
  founders: seedFounders as unknown as Array<Record<string, unknown>>,
  fieldStaff: seedFieldStaff as unknown as Array<Record<string, unknown>>,
  governance: seedGovernance as unknown as Array<Record<string, unknown>>,
  articles: seedArticles as unknown as Array<Record<string, unknown>>,
  media: seedMedia as unknown as Array<Record<string, unknown>>,
  partners: seedPartners as unknown as Array<Record<string, unknown>>,
  donors: seedDonors as unknown as Array<Record<string, unknown>>,
  testimonials: seedTestimonials as unknown as Array<Record<string, unknown>>,
  stats: seedImpactStats as unknown as Array<Record<string, unknown>>,
  siteSettings: [seedSiteSettings as unknown as Record<string, unknown>],
  auditLogs: seedAuditLogs as unknown as Array<Record<string, unknown>>,
  contactSubmissions: seedContactSubmissions as unknown as Array<Record<string, unknown>>,
  policies: initialPolicyDocuments as unknown as Array<Record<string, unknown>>,
  fieldNotes: initialFieldNotes as unknown as Array<Record<string, unknown>>
};

async function main() {
  const seedPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!seedPassword || seedPassword.length < 12) {
    throw new Error('SEED_ADMIN_PASSWORD must contain at least 12 characters before seeding.');
  }
  const passwordHash = await hash(seedPassword, 12);

  for (const user of seedUsers) {
    await prisma.user.upsert({
      where: { email: user.email.toLowerCase() },
      update: {
        externalId: user.id,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        status: user.status,
        passwordHash
      },
      create: {
        externalId: user.id,
        name: user.name,
        email: user.email.toLowerCase(),
        passwordHash,
        role: user.role,
        avatar: user.avatar,
        status: user.status,
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : null,
        createdAt: user.createdAt ? new Date(user.createdAt) : undefined
      }
    });
  }

  for (const [rawEntity, items] of Object.entries(collections)) {
    const entity = rawEntity as ContentEntity;
    for (const item of items) {
      const id = typeof item.id === 'string' ? item.id : undefined;
      const existing = id ? await contentModel.findById(entity, id) : null;
      if (existing && id) await contentModel.update(entity, id, item);
      else await contentModel.create(entity, item);
    }
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
