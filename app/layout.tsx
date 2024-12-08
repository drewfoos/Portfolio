import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import SocialSidebar from '@/components/layout/socialSidebar'
import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import { axiforma } from '@/app/fonts'
import Script from 'next/script'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  metadataBase: new URL('https://andrewdryfoos.dev'),
  title: {
    template: '%s | Andrew Dryfoos',
    default: 'Andrew Dryfoos | Software Engineer & Developer',
  },
  description: 'Portfolio and personal website of Andrew Dryfoos - Software Engineer, Developer, and Tech Enthusiast',
 
  openGraph: {
    type: 'website',
    siteName: 'Andrew Dryfoos',
    title: 'Andrew Dryfoos | Software Engineer & Developer',
    description: 'Portfolio and personal website of Andrew Dryfoos',
    url: 'https://andrewdryfoos.dev',
    locale: 'en_US',
  },
 
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE || '',
  },
  alternates: {
    canonical: 'https://andrewdryfoos.dev',
  },
 
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest'
      },
      {
        rel: 'icon',
        url: '/favicon.svg',
        type: 'image/svg+xml'
      }
    ]
  },
  
  keywords: ['software engineer', 'developer', 'web development', 'portfolio', 'Andrew Dryfoos'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B0B0B',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://andrewdryfoos.dev",
    "name": "Andrew Dryfoos",
    "description": "Portfolio and personal website of Andrew Dryfoos - Software Engineer, Developer, and Tech Enthusiast",
    "publisher": {
      "@type": "Person",
      "name": "Andrew Dryfoos"
    }
  }

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
            className: 'bg-[#1919A7] text-white px-4 py-2 rounded-lg shadow-md',
            style: {
              marginTop: '50px',
            },
            duration: 4000,
          }}
        />
        
        <SocialSidebar />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  )
}