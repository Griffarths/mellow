import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { PLAY_STORE_URL } from "./lib/stores";

const withDetection = createMiddleware(routing);
// Deep links (articles, tools, /about) often exist in one language only:
// redirecting a French-speaking visitor from /blog/<en-slug> to
// /fr/blog/<en-slug> would land on a 404. Only the home page follows the
// visitor's language.
const withoutDetection = createMiddleware({ ...routing, localeDetection: false });

// The Android testers' page (/android, in every language) became useless once
// Mellow was on Google Play (2026-10-22): links already shared to testers now
// open the Play Store listing. Redirected here and not in next.config.ts,
// whose redirects decode the referrer parameter (%3D, %26) and would split
// the campaign.
const ANDROID_PAGE = /^\/(?:(?:en|fr|de|it|es|es-419|pt|pt-BR)\/)?android\/?$/;

export default function proxy(request: NextRequest) {
  if (ANDROID_PAGE.test(request.nextUrl.pathname)) {
    return new NextResponse(null, { status: 308, headers: { Location: PLAY_STORE_URL } });
  }
  return request.nextUrl.pathname === "/"
    ? withDetection(request)
    : withoutDetection(request);
}

// /cs-media is Carousel Studio's media, rewritten to Vercel Blob in
// next.config.ts: no language prefix there.
export const config = {
  matcher: ["/((?!_next|_vercel|cs-media|.*\\..*).*)"],
};
