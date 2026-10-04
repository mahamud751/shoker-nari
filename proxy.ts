import { NextResponse, type NextRequest } from "next/server";

// Basic-auth gate for the admin panel. Set ADMIN_USER / ADMIN_PASSWORD in .env.local.
export function proxy(request: NextRequest) {
  const user = process.env.ADMIN_USER ?? "admin";
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) return new NextResponse("ADMIN_PASSWORD is not configured", { status: 503 });

  const header = request.headers.get("authorization") ?? "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded && atob(encoded) === `${user}:${pass}`) {
    return NextResponse.next();
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Korbojoy Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
