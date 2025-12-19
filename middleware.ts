import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/videos",
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // 🔑 MUST await in new Clerk versions
  await auth.protect();

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
  ],
};
