// app/layout.client.tsx
'use client'
import './globals.css'
import { Suspense, lazy, useEffect } from 'react'
import { axiforma } from '@/app/fonts'
import { usePathname } from 'next/navigation'
import { printConsoleArt } from '@/utils/consoleArt'

// Lazy load components that aren't needed immediately
const Toaster = lazy(() => import('react-hot-toast').then(mod => ({ default: mod.Toaster })))
const Analytics = lazy(() => import('@vercel/analytics/react').then(mod => ({ default: mod.Analytics })))
const SpeedInsights = lazy(() => import('@vercel/speed-insights/next').then(mod => ({ default: mod.SpeedInsights })))
const Navbar = lazy(() => import('@/components/layout/navbar'))
const Footer = lazy(() => import('@/components/layout/footer'))
const SocialSidebar = lazy(() => import('@/components/layout/socialSidebar'))

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const is404 = pathname !== '/';

  useEffect(() => {
    printConsoleArt();
  }, []); // Empty dependency array ensures it only runs once

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://andrewdryfoos.dev",
    "name": "Andrew Dryfoos",
    "description": "Portfolio and personal website of Andrew Dryfoos - Software Engineer, Developer, and Tech Enthusiast",
    "publisher": {
      "@type": "Person",
      "name": "Andrew Dryfoos",
    },
  };

  return (
    <html lang="en" className={`scroll-smooth ${axiforma.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0B0B0B]">
        <Suspense fallback={null}>
          <Analytics />
          <SpeedInsights />
        </Suspense>

        <Suspense fallback={null}>
          <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        </Suspense>

        {!is404 && (
          <Suspense fallback={null}>
            <SocialSidebar />
            <Navbar />
          </Suspense>
        )}

        <main className="relative flex-grow">
          {children}
        </main>

        {!is404 && (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
      </body>
    </html>
  );
}