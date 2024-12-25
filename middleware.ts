import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const roleName = process.env.NEXT_PUBLIC_ROLE_NAME || "client-role";

  const role = request.cookies.get(roleName)?.value;

  const adminRoutes = ["/admin", "/admin/orders", "/admin/products"];

  if (adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/404", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
