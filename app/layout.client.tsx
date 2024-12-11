'use client';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import SocialSidebar from '@/components/layout/socialSidebar';
import { useEffect } from 'react';
import { axiforma } from '@/app/fonts';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { printConsoleArt } from '@/utils/consoleArt';

interface ClientLayoutProps {
  children: React.ReactNode;
  nonce: string;
}

export default function ClientLayout({ children, nonce }: ClientLayoutProps) {
  const pathname = usePathname();
  const is404 = pathname === '/404';

  // Use useEffect to ensure it only runs on the client
  useEffect(() => {
    printConsoleArt();
  }, []); // Runs only once after the component mounts

  return (
    <html lang="en" className={`scroll-smooth ${axiforma.variable}`} >
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: 'https://andrewdryfoos.dev',
              name: 'Andrew Dryfoos',
              description: 'Portfolio and personal website of Andrew Dryfoos - Software Engineer, Developer, and Tech Enthusiast',
              publisher: {
                '@type': 'Person',
                name: 'Andrew Dryfoos',
              },
            }),
          }}
        />
      </head>
      <body>
        {!is404 && (
          <>
            <SocialSidebar />
            <Navbar />
          </>
        )}
        <main>{children}</main>
        {!is404 && <Footer />}
      </body>
    </html>
  );
}
