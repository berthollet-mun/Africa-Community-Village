import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { apiError, getRequestIp } from '@/lib/http';
import { saveMediaFiles } from '@/models/mediaModel';
import { logAuditAction } from '@/models/auditModel';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const actor = await requireAdmin(request);
    const formData = await request.formData();
    const files = formData.getAll('files').filter((entry): entry is File => entry instanceof File);
    if (!files.length) {
      return NextResponse.json({ success: false, error: 'Aucun fichier reçu.' }, { status: 400 });
    }
    if (files.length > 10) {
      return NextResponse.json({ success: false, error: 'Maximum 10 fichiers par envoi.' }, { status: 400 });
    }

    const media = await saveMediaFiles(files);
    await logAuditAction(
      { userName: String(actor.email), userEmail: String(actor.email) },
      'upload',
      'media',
      `${media.length} fichier(s) téléversé(s).`,
      media[0]?.id,
      getRequestIp(request)
    );

    return NextResponse.json({ success: true, data: media.length === 1 ? media[0] : media }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
