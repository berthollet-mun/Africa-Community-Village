import { ClientApplication } from '@/components/application/ClientApplication';

interface AdminPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { slug = [] } = await params;
  const suffix = slug.length ? `/${slug.join('/')}` : '';
  return <ClientApplication initialRoute={`/admin${suffix}`} />;
}
