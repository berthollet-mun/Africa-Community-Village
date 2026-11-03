import { ClientApplication } from '@/components/application/ClientApplication';
import { buildRouteMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

interface PublicPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PublicPageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildRouteMetadata(`/${slug.join('/')}`);
}

export default async function PublicPage({ params }: PublicPageProps) {
  const { slug } = await params;
  return <ClientApplication initialRoute={`/${slug.join('/')}`} />;
}
