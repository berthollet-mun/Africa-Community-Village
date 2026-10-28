import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { UnauthorizedError } from '@/lib/auth';

export function apiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { success: false, error: 'Données invalides.', details: error.flatten() },
      { status: 400 }
    );
  }
  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ success: false, error: error.message }, { status: 401 });
  }
  if (error instanceof Error && 'code' in error && error.code === 'P2002') {
    return NextResponse.json({ success: false, error: 'Cette valeur existe déjà.' }, { status: 409 });
  }

  console.error('[ACV API]', error);
  return NextResponse.json({ success: false, error: 'Une erreur interne est survenue.' }, { status: 500 });
}

export function getRequestIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip') ?? undefined;
}
