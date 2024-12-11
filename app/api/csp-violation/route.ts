// app/api/csp-violation/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Log CSP violations in development
  if (process.env.NODE_ENV === 'development') {
    const violation = await request.json();
    console.log('CSP Violation:', violation);
  }
  
  return new NextResponse(null, { status: 204 });
}

// Handle other methods
export async function GET() {
  return new NextResponse(null, { status: 405 });
}

export async function PUT() {
  return new NextResponse(null, { status: 405 });
}

export async function DELETE() {
  return new NextResponse(null, { status: 405 });
}

export async function PATCH() {
  return new NextResponse(null, { status: 405 });
}