import { clerkMiddleware } from "@clerk/nextjs/server";

// Next.js 16 uses proxy.ts for middleware (not middleware.ts).
// clerkMiddleware() makes auth available everywhere.
// By default all routes are public — protect specific routes at the page level.

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for Clerk-specific frontend API routes
    "/__clerk/(.*)",
  ],
};
