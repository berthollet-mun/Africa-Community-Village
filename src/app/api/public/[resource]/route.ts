import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { apiError, getRequestIp } from '@/lib/http';
import { contactSchema, donationSchema } from '@/lib/validation';
import { publicContentModel, type PublicResource } from '@/models/publicContentModel';

export const runtime = 'nodejs';

const getResourceSchema = z.enum([
  'settings',
  'banners',
  'programs',
  'articles',
  'team',
  'founders',
  'field-staff',
  'governance',
  'partners',
  'testimonials',
  'stats'
]);
const postResourceSchema = z.enum(['contact', 'donate']);

interface RouteContext {
  params: Promise<{ resource: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { resource: rawResource } = await context.params;
    const resource = getResourceSchema.parse(rawResource);

    if (resource === 'settings') {
      return NextResponse.json({ success: true, data: await publicContentModel.getSettings() });
    }
    if (resource === 'banners') {
      const pageRoute =
        request.nextUrl.searchParams.get('pageRoute') ??
        request.nextUrl.searchParams.get('page') ??
        request.nextUrl.searchParams.get('page_assignment') ??
        undefined;
      return NextResponse.json({ success: true, data: await publicContentModel.getBanners(pageRoute) });
    }

    const category = request.nextUrl.searchParams.get('category') ?? undefined;
    const data = await publicContentModel.list(resource as PublicResource, category);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { resource: rawResource } = await context.params;
    const resource = postResourceSchema.parse(rawResource);
    const body: unknown = await request.json();
    const ipAddress = getRequestIp(request);

    const data =
      resource === 'contact'
        ? await publicContentModel.submitContact(contactSchema.parse(body), ipAddress)
        : await publicContentModel.submitDonation(donationSchema.parse(body), ipAddress);

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
