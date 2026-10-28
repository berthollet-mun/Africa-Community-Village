import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { contentModel } from '@/models/contentModel';

const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.pdf', '.mp4', '.gif']);
const maxFileSize = 25 * 1024 * 1024;

function safeBaseName(name: string) {
  return path.basename(name, path.extname(name)).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 100) || 'media';
}

export async function saveMediaFiles(files: File[]) {
  const uploadDirectory = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadDirectory, { recursive: true });

  return Promise.all(
    files.map(async (file) => {
      const extension = path.extname(file.name).toLowerCase();
      if (!allowedExtensions.has(extension)) throw new Error(`Format non autorisé : ${extension || 'inconnu'}.`);
      if (file.size > maxFileSize) throw new Error(`Le fichier ${file.name} dépasse la limite de 25 Mo.`);

      const filename = `${safeBaseName(file.name)}_${randomUUID()}${extension}`;
      await writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()));

      const type = file.type.includes('pdf') ? 'pdf' : file.type.includes('video') ? 'video' : 'image';
      return contentModel.create('media', {
        title: file.name,
        filename,
        url: `/uploads/${filename}`,
        type,
        mimeType: file.type,
        sizeBytes: file.size,
        altTextEn: file.name,
        altTextFr: file.name
      });
    })
  );
}
