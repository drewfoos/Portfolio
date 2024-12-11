import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDevelopment = process.env.NODE_ENV === 'development';

  const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 
    https://*.vercel.com
    https://*.vercel-scripts.com
    https://*.vercel-analytics.com
    https://*.vercel-insights.com
    https://cdn.emailjs.com
    ${isDevelopment ? "'unsafe-eval' 'unsafe-inline'" : ''};
  style-src 'self' 'unsafe-inline' data:;
  img-src 'self' blob: data: 
    https://*.vercel.app
    https://*.vercel.sh;
  font-src 'self' data: 
    https://fonts.gstatic.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://api.emailjs.com;
  frame-ancestors 'none';
  connect-src 'self' 
    https://*.vercel.com
    https://*.vercel-scripts.com
    https://*.vercel-analytics.com
    https://*.vercel-insights.com
    https://api.emailjs.com
    ${isDevelopment ? 'ws:' : ''};
  frame-src 'self' 
    https://drive.google.com 
    https://*.figma.com
    https://mail.google.com;
  worker-src 'self';
  manifest-src 'self';
  child-src 'self' https://*.figma.com;
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();


  // Don't apply CSP to the OG image route
  if (request.nextUrl.pathname === '/api/og') {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set(
    'Content-Security-Policy',
    cspHeader
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set(
    'Content-Security-Policy',
    cspHeader
  );

  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!api/og|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};