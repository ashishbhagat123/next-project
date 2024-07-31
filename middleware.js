import { NextResponse } from "next/server";

export async function middleware(request) {
  if (
    !request.cookies.get("token")?.value &&
    request.nextUrl.pathname !== "/login"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.cookies.get("token")?.value) {
    return NextResponse.redirect(new URL("/quotes", request.url));
  }
}

export const config = {
  matcher: ["/", "/login"],
};
