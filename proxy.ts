import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const withDetection = createMiddleware(routing);
// Deep links (articles, tools, /about) often exist in one language only:
// redirecting a French-speaking visitor from /blog/<en-slug> to
// /fr/blog/<en-slug> would land on a 404. Only the home page follows the
// visitor's language.
const withoutDetection = createMiddleware({ ...routing, localeDetection: false });

export default function proxy(request: NextRequest) {
  return request.nextUrl.pathname === "/"
    ? withDetection(request)
    : withoutDetection(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
