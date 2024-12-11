import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Generate a unique nonce for Content-Security-Policy
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  console.log('Middleware nonce:', nonce);

  const isDevelopment = process.env.NODE_ENV === 'development';

  // Define the Content-Security-Policy header
  const cspHeader = `
    default-src 'self';
    script-src 'nonce-${nonce}' 'strict-dynamic' 
      https://vercel.live 
      https://*.vercel-insights.com 
      https://*.vercel-analytics.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' 
      https://*.vercel.com 
      https://api.emailjs.com;
    frame-src 'self' 
      https://drive.google.com 
      https://*.figma.com 
      https://mail.google.com;
    form-action 'self' https://api.emailjs.com;
    object-src 'none';
    base-uri 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  // Skip applying CSP for specific routes (e.g., /api/og)
  if (request.nextUrl.pathname === '/api/og') {
    return NextResponse.next();
  }

  // Set the request headers with nonce and CSP
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  // Create the response with the updated headers
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set('Content-Security-Policy', cspHeader);
  return response;
}

// Define matcher for applying middleware only to specific routes
export const config = {
  matcher: '/((?!api/og|_next/static|_next/image|favicon.ico).*)',
};
