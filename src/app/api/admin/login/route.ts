import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';
import { apiError, getRequestIp } from '@/lib/http';
import { issueAuthToken } from '@/lib/auth';
import { userModel } from '@/models/userModel';
import { logAuditAction } from '@/models/auditModel';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const credentials = loginSchema.parse(await request.json());
    const user = await userModel.authenticate(credentials.email, credentials.password);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Identifiants invalides.' }, { status: 401 });
    }

    await logAuditAction(
      { userName: user.name, userEmail: user.email },
      'login',
      'auth',
      `Connexion réussie (rôle : ${user.role}).`,
      user.id,
      getRequestIp(request)
    );

    return NextResponse.json({ success: true, token: await issueAuthToken(user), user });
  } catch (error) {
    return apiError(error);
  }
}
