import { Metadata, Viewport } from 'next'

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
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Andrew Dryfoos Portfolio',
      }
    ],
  },
 
  twitter: {
    card: 'summary_large_image',
    title: 'Andrew Dryfoos | Software Engineer & Developer',
    description: 'Portfolio and personal website of Andrew Dryfoos',
    images: ['/api/og'],
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
  
  alternates: {
    canonical: 'https://andrewdryfoos.dev',
  },
 
  icons: {
    icon: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest'
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