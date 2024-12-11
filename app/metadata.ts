import { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://andrewdryfoos.dev'),
 
  // Basic Metadata
  title: {
    template: '%s | Andrew Dryfoos',
    default: 'Andrew Dryfoos | Software Engineer & Developer',
  },
  description: 'Portfolio and personal website of Andrew Dryfoos - Software Engineer, Developer, and Tech Enthusiast',
  keywords: ['software engineer', 'developer', 'web development', 'portfolio', 'Andrew Dryfoos'],
 
  // Open Graph
  openGraph: {
    type: 'website',
    siteName: 'Andrew Dryfoos',
    title: 'Andrew Dryfoos | Software Engineer & Developer',
    description: 'Portfolio and personal website of Andrew Dryfoos',
    url: 'https://andrewdryfoos.dev',
    locale: 'en_US',
    images: [{
      url: '/api/og',
      width: 1200,
      height: 630,
      alt: 'Andrew Dryfoos Portfolio',
    }],
  },
 
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Andrew Dryfoos | Software Engineer & Developer',
    description: 'Portfolio and personal website of Andrew Dryfoos',
    images: ['/api/og'],
  },
 
  // SEO
  alternates: {
    canonical: 'https://andrewdryfoos.dev',
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
 
  // PWA & Icons
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      {
        url: '/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/ms-icon-70x70.png',
        sizes: '70x70',
        type: 'image/png',
      },
      {
        url: '/ms-icon-150x150.png',
        sizes: '150x150',
        type: 'image/png',
      },
      {
        url: '/ms-icon-310x310.png',
        sizes: '310x310',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
      {
        rel: 'msapplication-config',
        url: '/browserconfig.xml'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        url: '/apple-icon-152x152.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        url: '/apple-icon-144x144.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        url: '/apple-icon-120x120.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        url: '/apple-icon-114x114.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        url: '/favicon-96x96.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B0B0B',
  colorScheme: 'dark',
}