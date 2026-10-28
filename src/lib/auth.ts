import { jwtVerify, SignJWT } from 'jose';
import type { NextRequest } from 'next/server';
import type { SafeAdminUser } from '@/models/userModel';

export class UnauthorizedError extends Error {
  constructor(message = 'Authentification administrateur requise.') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET must be configured in production.');
  }
  return new TextEncoder().encode(value ?? 'acv-development-only-secret-change-me');
}

export async function issueAuthToken(user: SafeAdminUser) {
  return new SignJWT({ role: user.role, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret());
}

export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify(token, secret());
  if (!payload.sub) throw new UnauthorizedError();
  return payload;
}

export async function requireAdmin(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) throw new UnauthorizedError();

  try {
    return await verifyAuthToken(authorization.slice(7));
  } catch (error) {
    if (error instanceof UnauthorizedError) throw error;
    throw new UnauthorizedError('Session expirée ou invalide.');
  }
}
