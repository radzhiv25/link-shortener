import { auth } from '@/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');
  const isLogin = req.nextUrl.pathname.startsWith('/login');
  const isRegister = req.nextUrl.pathname.startsWith('/register');

  if (isDashboard && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl.origin));
  }
  if ((isLogin || isRegister) && isLoggedIn) {
    return Response.redirect(new URL('/dashboard', req.nextUrl.origin));
  }
  return undefined;
});

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
