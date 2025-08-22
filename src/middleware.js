import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Bypass middleware for Server Actions
  if (request.headers.has("x-nextjs-data")) {
    return NextResponse.next();
  }

  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  console.log(request);
  // Define public paths that don't require authentication
  const isAuthPublicPath =
    path === "/login" ||
    path === "/register" ||
    path === "/reset-password" ||
    path === "/";
  const isPublicPath = isAuthPublicPath || path === "/menu";

  // Get the token from the cookies
  const token = request.cookies.get("authToken")?.value || "";

  // If the path is public and the user is logged in, redirect to the menu page
  if (isAuthPublicPath && token) {
    return NextResponse.redirect(new URL("/menu", request.url));
  }

  // If the path is not public and the user is not logged in, redirect to the login page
  if (!isPublicPath && !token) {
    // Store the original URL to redirect back after login
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Match all paths except for:
    // - API routes (/api/...)
    // - Static files routes (/_next/...)
    // - Public files (files with extensions like .png, .jpg, .ico, etc.)
    "/((?!api|_next/static|_next/image|.*\\..*).*)",
  ],
};
