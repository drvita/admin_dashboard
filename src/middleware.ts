import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const intlMiddleware = createIntlMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es'
});

// Define arrays for protected and guest routes
const protectedPaths = ['/dashboard'];
const guestPaths = ['/login', '/register'];

function isProtectedRoute(pathname: string): boolean {
  return protectedPaths.some(path => 
    pathname === path || 
    pathname.startsWith(`${path}/`) || 
    /^\/[a-z]{2}(\/|$)/.test(pathname) && pathname.replace(/^\/[a-z]{2}/, '').startsWith(path)
  );
}

function isGuestRoute(pathname: string): boolean {
  return guestPaths.some(path => 
    pathname === path || 
    /^\/[a-z]{2}(\/|$)/.test(pathname) && pathname.replace(/^\/[a-z]{2}/, '') === path
  );
}

async function checkSession(request: NextRequest): Promise<boolean> {
  const sessionUrl = new URL('/api/auth/session', request.url);
  const sessionResponse = await fetch(sessionUrl, {
    method: 'GET',
    headers: {
      'Cookie': request.headers.get('cookie') || ''
    }
  });

  if (!sessionResponse.ok) {
    console.error(`Session API responded with status: ${sessionResponse.status}`);
    return false;
  }

  const sessionData = await sessionResponse.json();
  return sessionData.isValid;
}

export async function middleware(request: NextRequest) {
  // First, handle the internationalization
  const response = intlMiddleware(request);
  const pathname = request.nextUrl.pathname;

  try {
    const hasValidSession = await checkSession(request);

    if (isProtectedRoute(pathname) && !hasValidSession) {
      console.log('Access to protected route without valid session, redirecting to login');
      const locale = pathname.startsWith('/es') || pathname.startsWith('/en') 
        ? pathname.slice(1, 3) 
        : response.headers.get('x-middleware-request-nextlocale') || 'es';
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    if (isGuestRoute(pathname) && hasValidSession) {
      console.log('Access to guest route with active session, redirecting to dashboard');
      const locale = pathname.startsWith('/es') || pathname.startsWith('/en')
        ? pathname.slice(1, 3)
        : response.headers.get('x-middleware-request-nextlocale') || 'es';
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
    }
  } catch (error) {
    console.error('Error in session verification:', error);
    // In case of error, we assume no valid session for safety
    if (isProtectedRoute(pathname)) {
      const locale = pathname.startsWith('/es') || pathname.startsWith('/en')
        ? pathname.slice(1, 3)
        : response.headers.get('x-middleware-request-nextlocale') || 'es';
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return response;
}

// Update the matcher to include all potential protected and guest routes, with and without locales
export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)' ,
    '/dashboard/:path*',
    // '/profile/:path*',
    // '/account/:path*',
    '/login',
    '/register',
    '/:locale(es|en)/dashboard/:path*',
    '/:locale(es|en)/profile/:path*',
    '/:locale(es|en)/account/:path*',
    '/:locale(es|en)/login',
    '/:locale(es|en)/register'
  ]
};