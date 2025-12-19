import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)', 
    '/',
    '/api/videos'
]);

export default clerkMiddleware((auth, req) => {
    // Simply let Clerk handle everything with minimal custom logic
    if (isPublicRoute(req)) {
        return;
    }
    
    // Protect all other routes
    auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};