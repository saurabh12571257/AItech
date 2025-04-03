import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    "/profile(.*)", 
    "/services(.*)", 
    "/resume(.*)", 
    "/onboarding(.*)",
    "/dashboard(.*)", 
    "/interview(.*)", 
    "/ai-cover-letter(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    const {userId} = await auth()

    if (!userId && isProtectedRoute(req)) {
        const {redirectToSignIn} = await auth()
        return redirectToSignIn({returnBackUrl: req.url})
    }
    return NextResponse.next()
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};