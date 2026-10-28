import { ClientApplication } from '@/components/application/ClientApplication';

interface PublicPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function PublicPage({ params }: PublicPageProps) {
  const { slug } = await params;
  return <ClientApplication initialRoute={`/${slug.join('/')}`} />;
}
