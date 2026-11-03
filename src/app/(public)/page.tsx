import { ClientApplication } from '@/components/application/ClientApplication';
import { buildRouteMetadata } from '@/lib/seo';

export const metadata = buildRouteMetadata('/');

export default function Home() {
  return <ClientApplication initialRoute="/" />;
}
