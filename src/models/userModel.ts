import { randomUUID } from 'node:crypto';
import { compare, hash } from 'bcryptjs';
import { prisma } from '@/models/prisma/client';

export interface SafeAdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

function toSafeUser(user: {
  externalId: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  status: string;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
}): SafeAdminUser {
  return {
    id: user.externalId,
    name: user.name,
    email: user.email,
    role: user.role,
    ...(user.avatar ? { avatar: user.avatar } : {}),
    status: user.status,
    ...(user.lastLogin ? { lastLogin: user.lastLogin.toISOString() } : {}),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString()
  };
}

export const userModel = {
  async list(): Promise<SafeAdminUser[]> {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    return users.map(toSafeUser);
  },

  async findById(id: string): Promise<SafeAdminUser | null> {
    const user = await prisma.user.findUnique({ where: { externalId: id } });
    return user ? toSafeUser(user) : null;
  },

  async authenticate(email: string, password: string): Promise<SafeAdminUser | null> {
    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (!user || user.status !== 'active' || !(await compare(password, user.passwordHash))) return null;

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });
    return toSafeUser(updated);
  },

  async create(data: Record<string, unknown>): Promise<SafeAdminUser> {
    const password = String(data.password ?? randomUUID());
    const user = await prisma.user.create({
      data: {
        externalId: typeof data.id === 'string' ? data.id : randomUUID(),
        name: String(data.name),
        email: String(data.email).trim().toLowerCase(),
        passwordHash: await hash(password, 12),
        role: typeof data.role === 'string' ? data.role : 'editor',
        avatar: typeof data.avatar === 'string' ? data.avatar : null,
        status: typeof data.status === 'string' ? data.status : 'active'
      }
    });
    return toSafeUser(user);
  },

  async update(id: string, data: Record<string, unknown>): Promise<SafeAdminUser | null> {
    const current = await prisma.user.findUnique({ where: { externalId: id } });
    if (!current) return null;

    const user = await prisma.user.update({
      where: { externalId: id },
      data: {
        ...(typeof data.name === 'string' ? { name: data.name } : {}),
        ...(typeof data.email === 'string' ? { email: data.email.trim().toLowerCase() } : {}),
        ...(typeof data.password === 'string' ? { passwordHash: await hash(data.password, 12) } : {}),
        ...(typeof data.role === 'string' ? { role: data.role } : {}),
        ...(typeof data.avatar === 'string' ? { avatar: data.avatar } : {}),
        ...(typeof data.status === 'string' ? { status: data.status } : {})
      }
    });
    return toSafeUser(user);
  },

  async delete(id: string): Promise<boolean> {
    const result = await prisma.user.deleteMany({ where: { externalId: id } });
    return result.count > 0;
  }
};
