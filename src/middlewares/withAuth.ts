import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const OnlyAdmin = ["admin"];
const OnlyMember = ["member"];
const authPages = ["auth"];

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
  return async (req: NextRequest, ev: NextFetchEvent) => {
    try {
      const pathname = req.nextUrl.pathname.split("/")[1];

      if (requireAuth.includes(pathname)) {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECREET });

        if ((!token && OnlyAdmin.includes(pathname)) || (!token && OnlyMember.includes(pathname))) {
          const redirectUrl = new URL("/auth/login", req.url);
          redirectUrl.searchParams.set("callbackUrl", encodeURI(req.url));
          return NextResponse.redirect(redirectUrl);
        }

        if (token) {
          if (authPages.includes(pathname)) {
            return NextResponse.redirect(new URL("/", req.url));
          }
          if (token.role !== "admin" && OnlyAdmin.includes(pathname)) {
            return NextResponse.redirect(new URL("/", req.url));
          }
        }
      }
    } catch (error) {
      throw error;
    }

    return middleware(req, ev);
  };
}
