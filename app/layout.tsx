// app/layout.tsx
import { metadata, viewport } from './metadata';
import ClientLayout from './layout.client';
import { headers } from 'next/headers';

export { metadata, viewport };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverHeaders = await headers();
  const nonce = serverHeaders.get('x-nonce') || '';

  return <ClientLayout nonce={nonce}>{children}</ClientLayout>;
}
