import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  console.log('Middleware nonce:', nonce);

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' https://*.vercel.com https://*.vercel-insights.com https://*.vercel-analytics.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.vercel.com https://api.emailjs.com;
    frame-src 'self' https://drive.google.com https://*.figma.com https://mail.google.com;
    form-action 'self' https://api.emailjs.com;
    object-src 'none';
    base-uri 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  // Skip applying CSP for specific routes
  if (request.nextUrl.pathname === '/api/og') {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set('Content-Security-Policy', cspHeader);
  return response;
}

export const config = {
  matcher: '/((?!api/og|_next/static|_next/image|favicon.ico).*)',
};
