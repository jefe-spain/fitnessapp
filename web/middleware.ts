import { clerkMiddleware } from '@clerk/nextjs/server';

// Clerk middleware for authentication
export default clerkMiddleware((auth, req) => {
  // Check if the request is for a public route
  const publicRoutes = ['/'];
  const isPublicRoute = publicRoutes.some((route) => req.nextUrl.pathname === route);

  if (isPublicRoute) {
    return;
  }

  // If not a public route, protect it
  auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|css|js)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};
