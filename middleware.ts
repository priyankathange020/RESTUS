import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // You can add auth checks here if needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
