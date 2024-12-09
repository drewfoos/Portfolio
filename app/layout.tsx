// app/layout.tsx
import { metadata, viewport } from './metadata'
import ClientLayout from './layout.client'

export { metadata, viewport }

// This is just a pass-through now
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}