// app/layout.client.tsx
'use client'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import SocialSidebar from '@/components/layout/socialSidebar'
import { Suspense } from 'react'
import { axiforma } from '@/app/fonts'
import Script from 'next/script'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { usePathname } from 'next/navigation'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const is404 = pathname !== '/'; // Add other valid routes as needed
  
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
          <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            strategy="beforeInteractive"
          />
        </head>
        <body className="min-h-screen flex flex-col bg-[#0B0B0B]">
          <Suspense fallback={null}>
            <Analytics />
            <SpeedInsights />
          </Suspense>
         
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
            }}
          />
         
          {!is404 && (
            <>
              <SocialSidebar />
              <Navbar />
            </>
          )}
          <main className="relative flex-grow">
            {children}
          </main>
          {!is404 && <Footer />}
        </body>
      </html>
    );
  }
  