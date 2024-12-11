// app/layout.client.tsx
'use client'
import './globals.css'
import { Suspense, lazy, useEffect } from 'react'
import { axiforma } from '@/app/fonts'
import { usePathname } from 'next/navigation'
import { printConsoleArt } from '@/utils/consoleArt'

// Loading component for layout elements
const LayoutLoading = () => (
    <div className="h-1 bg-brand-purple/20">
      <div className="h-full bg-brand-purple animate-progress" />
    </div>
  )

// Lazy load components that aren't needed immediately
const Toaster = lazy(() => import('react-hot-toast').then(mod => ({ default: mod.Toaster })))
const Analytics = lazy(() => import('@vercel/analytics/react').then(mod => ({ default: mod.Analytics })))
const SpeedInsights = lazy(() => import('@vercel/speed-insights/next').then(mod => ({ default: mod.SpeedInsights })))
const Navbar = lazy(() => import('@/components/layout/navbar'))
const Footer = lazy(() => import('@/components/layout/footer'))
const SocialSidebar = lazy(() => import('@/components/layout/socialSidebar'))

export default function ClientLayout({ children }: { children: React.ReactNode }) {
 const pathname = usePathname();
 const isHome = pathname === '/';

 useEffect(() => {
   printConsoleArt();
 }, []);

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
       {/* Preload critical assets */}
       <link 
         rel="preload" 
         href="./fonts/Axiforma-Bold.otf" 
         as="font" 
         type="font/otf" 
         crossOrigin="anonymous" 
       />
     </head>
     <body className="min-h-screen flex flex-col bg-[#0B0B0B]">
       {/* Analytics with minimal loading impact */}
       <Suspense fallback={null}>
         <Analytics />
         <SpeedInsights />
       </Suspense>
      
       {/* Toast notifications */}
       <Suspense fallback={null}>
         <Toaster 
           position="top-center" 
           toastOptions={{ 
             duration: 4000,
             className: "bg-[#0B0B0B] text-white border border-purple-600"
           }} 
         />
       </Suspense>

       {/* Navigation elements only on home page */}
       {isHome && (
         <Suspense fallback={<LayoutLoading />}>
           <nav className="fixed z-50">
             <SocialSidebar />
             <Navbar />
           </nav>
         </Suspense>
       )}
      
       {/* Main content */}
       <main className="relative flex-grow">
         {children}
       </main>
      
       {/* Footer only on home page */}
       {isHome && (
         <Suspense fallback={<LayoutLoading />}>
           <Footer />
         </Suspense>
       )}
     </body>
   </html>
 );
}