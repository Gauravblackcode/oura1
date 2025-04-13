import { NextRequest, NextResponse } from 'next/server';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { ACCESS_TOKEN_COOKIE, USER_ACL } from './common/constants';
import environments from './common/environments';
import { cookiesOptions } from './common/helpers';

/**
 * Redirects to the login page
 */
const redirectToLogin = (req: NextRequest) => {
  return NextResponse.redirect(
    new URL(`${environments.BASE_PATH ? `${environments.BASE_PATH}/login` : '/login'}`, req.url),
  );
};

/**
 * Redirects to the unauthorized page
 */
const redirectToUnauthorized = (req: NextRequest) => {
  return NextResponse.redirect(
    new URL(`${environments.BASE_PATH ? `${environments.BASE_PATH}/401` : '/401'}`, req.url),
  );
};

/**
 * Main middleware function for handling authentication and authorization
 */
export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const requestUrl = environments.BASE_PATH ? new URL(req.url.replace(environments.BASE_PATH, '')) : new URL(req.url);

  // Allow access to error pages without authentication
  if (
    ['/401', '/403', '/404'].includes(requestUrl.pathname) &&
    !req.cookies.get(ACCESS_TOKEN_COOKIE)?.value
  ) {
    return redirectToLogin(req);
  }

  // Handle authentication
  // const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE);
  // if (!accessToken?.value) {
  //   return redirectToLogin(req);
  // }

  // Handle authorization
  const aclCookies = req.cookies.get(USER_ACL);
  const userAcl = aclCookies ? JSON.parse(aclCookies.value) : [];
  if (Array.isArray(userAcl) && userAcl.some(route => requestUrl.pathname.startsWith(route))) {
    return redirectToUnauthorized(req);
  }

  return res;
}

/**
 * Configure which routes should be handled by the middleware
 * Add your protected routes here
 */
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/profile',
    '/settings',
    '/401',
    '/403',
    '/404',
    // Add more protected routes as needed
    '/:path*', // Protect all routes by default
  ],
};
