import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/",
    "/home"
])
const isPublicApiRoute = createRouteMatcher([
    "/api/videos"
])


export default clerkMiddleware(async (auth, req) => {
    try {
        const {userId} = await auth();
        const currentUrl = new URL(req.url);
        const isAccessingDashboard = currentUrl.pathname === "/home";
        const isApiRequest = currentUrl.pathname.startsWith("/api");

        // If user is logged in and accessing a public route but not the dashboard
        if(userId && isPublicRoute(req) && !isAccessingDashboard) {
            return NextResponse.redirect(new URL("/home", req.url));
        }
        
        // Not logged in
        if(!userId){
            // If user is not logged in and trying to access a protected route
            if(!isPublicRoute(req) && !isPublicApiRoute(req)) {
                return NextResponse.redirect(new URL("/sign-in", req.url));
            }

            // If the request is for a protected API and the user is not logged in
            if(isApiRequest && !isPublicApiRoute(req)){
                return NextResponse.redirect(new URL("/sign-in", req.url));
            }
        }
        
        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        // On auth error, allow public routes and redirect protected ones
        if(isPublicRoute(req) || isPublicApiRoute(req)) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};