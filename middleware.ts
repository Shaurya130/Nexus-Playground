import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/",
    "/api/videos"
]);

export default clerkMiddleware((auth, req) => {
    const { pathname } = req.nextUrl;
    
    // Allow public routes to pass through
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }
    
    // For protected routes, Clerk will handle authentication
    return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};