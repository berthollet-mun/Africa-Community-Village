import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { apiError } from '@/lib/http';
import { getDashboardStats } from '@/models/dashboardModel';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    return NextResponse.json({ success: true, data: await getDashboardStats() });
  } catch (error) {
    return apiError(error);
  }
}
