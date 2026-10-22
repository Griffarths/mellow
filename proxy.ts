import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import {
  APP_STORE_INSTAGRAM_URL,
  APP_STORE_URL,
  PLAY_STORE_INSTAGRAM_URL,
  PLAY_STORE_URL,
} from "./lib/stores";

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

// Short links that send each device straight to its store: Google Play on
// Android, the App Store on iPhone, iPad and Mac (an iPad's Safari presents
// itself as a Mac), and anything else to the home page in the visitor's
// language. Not cached: the answer depends on the device.
// /qr: the site's QR code (public/qr-download.svg), "site" campaign.
// /instagram: the link in Mellow's Instagram bio, "instagram-bio" campaign.
type StoreLinks = { play: string; appStore: string };
const STORE_LINKS: Record<string, StoreLinks> = {
  "/qr": { play: PLAY_STORE_URL, appStore: APP_STORE_URL },
  "/instagram": { play: PLAY_STORE_INSTAGRAM_URL, appStore: APP_STORE_INSTAGRAM_URL },
};

function storeFor(request: NextRequest, links: StoreLinks) {
  const userAgent = request.headers.get("user-agent") ?? "";
  if (/android/i.test(userAgent)) return links.play;
  if (/iphone|ipad|ipod|macintosh/i.test(userAgent)) return links.appStore;
  return new URL("/", request.url).toString();
}

export default function proxy(request: NextRequest) {
  if (ANDROID_PAGE.test(request.nextUrl.pathname)) {
    return new NextResponse(null, { status: 308, headers: { Location: PLAY_STORE_URL } });
  }
  const links = STORE_LINKS[request.nextUrl.pathname.replace(/\/$/, "")];
  if (links) {
    return new NextResponse(null, {
      status: 307,
      headers: { Location: storeFor(request, links), "Cache-Control": "no-store" },
    });
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
