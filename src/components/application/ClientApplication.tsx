'use client';

import App from '@/App';

interface ClientApplicationProps {
  initialRoute: string;
}

export function ClientApplication({ initialRoute }: ClientApplicationProps) {
  return <App initialRoute={initialRoute} />;
}
