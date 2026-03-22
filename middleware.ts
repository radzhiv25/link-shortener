import { auth } from '@/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLinks = req.nextUrl.pathname.startsWith('/links');
  const isLogin = req.nextUrl.pathname.startsWith('/login');
  const isRegister = req.nextUrl.pathname.startsWith('/register');

  if (isLinks && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl.origin));
  }
  if ((isLogin || isRegister) && isLoggedIn) {
    return Response.redirect(new URL('/links', req.nextUrl.origin));
  }
  return undefined;
});

export const config = {
  matcher: ['/links/:path*', '/login', '/register'],
};
