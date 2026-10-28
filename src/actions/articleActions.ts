'use server';

import { revalidatePath } from 'next/cache';
import { articleInputSchema, idSchema } from '@/lib/validation';
import { verifyAuthToken } from '@/lib/auth';
import { contentModel } from '@/models/contentModel';
import { logAuditAction } from '@/models/auditModel';

export async function createArticleAction(token: string, input: unknown) {
  const actor = await verifyAuthToken(token);
  const article = await contentModel.create('articles', articleInputSchema.parse(input));
  await logAuditAction(
    { userName: String(actor.email), userEmail: String(actor.email) },
    'create',
    'articles',
    `Création de l’article ${article.id}.`,
    article.id
  );
  revalidatePath('/blog');
  return { success: true, data: article };
}

export async function updateArticleAction(token: string, id: string, input: unknown) {
  const actor = await verifyAuthToken(token);
  const articleId = idSchema.parse(id);
  const article = await contentModel.update('articles', articleId, articleInputSchema.partial().parse(input));
  if (!article) return { success: false, error: 'Article introuvable.' };
  await logAuditAction(
    { userName: String(actor.email), userEmail: String(actor.email) },
    'update',
    'articles',
    `Mise à jour de l’article ${articleId}.`,
    articleId
  );
  revalidatePath('/blog');
  return { success: true, data: article };
}

export async function deleteArticleAction(token: string, id: string) {
  const actor = await verifyAuthToken(token);
  const articleId = idSchema.parse(id);
  const deleted = await contentModel.delete('articles', articleId);
  if (!deleted) return { success: false, error: 'Article introuvable.' };
  await logAuditAction(
    { userName: String(actor.email), userEmail: String(actor.email) },
    'delete',
    'articles',
    `Suppression de l’article ${articleId}.`,
    articleId
  );
  revalidatePath('/blog');
  return { success: true };
}
