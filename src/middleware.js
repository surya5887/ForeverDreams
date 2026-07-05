import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Only protect /admin routes, but allow /admin/login
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const isLoggedIn = request.cookies.get('admin_session')?.value === 'true';
    
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // If user is already logged in, don't let them see the login page again
  if (path.startsWith('/admin/login')) {
    const isLoggedIn = request.cookies.get('admin_session')?.value === 'true';
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
