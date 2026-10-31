import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { internalPath, localePath, type Locale } from "./i18n";
import { studioBasePath } from "../sanity/lib/studio";

function localeFromBrowser(header: string | null): Locale {
  if (!header) return "en";
  const ranked = header.split(",").map((part) => {
    const [rawTag, ...params] = part.trim().split(";");
    const qPart = params.find((param) => param.trim().toLowerCase().startsWith("q="));
    const q = qPart ? Number(qPart.split("=")[1]) : 1;
    return { tag: rawTag.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 };
  });
  ranked.sort((left, right) => right.q - left.q);
  for (const { tag, q } of ranked) {
    if (q <= 0) continue;
    const base = tag.split("-")[0];
    if (base === "fr" || base === "en") return base;
  }
  return "en";
}

function preferredLocale(request: NextRequest): Locale {
  const chosen = request.cookies.get("locale-choice")?.value;
  if (chosen === "fr" || chosen === "en") return chosen;
  return localeFromBrowser(request.headers.get("accept-language"));
}

function requestHeaders(request: NextRequest, locale: Locale) {
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);
  headers.set("x-pathname-rewritten", "1");
  return headers;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === studioBasePath || pathname.startsWith(`${studioBasePath}/`)) {
    return NextResponse.next();
  }

  // The rewrite below calls this file again with the internal /en or /fr path.
  // Stop there, or /en would redirect back to / and loop.
  if (request.headers.get("x-pathname-rewritten") === "1") {
    return NextResponse.next();
  }

  const first = pathname.split("/")[1];
  const explicit: Locale | null = first === "fr" ? "fr" : first === "en" ? "en" : null;
  const locale = explicit ?? preferredLocale(request);
  const canonical = localePath(locale, pathname).split("#")[0];

  if (pathname !== canonical) {
    const url = request.nextUrl.clone();
    url.pathname = canonical;
    const sameLanguage = explicit === locale;
    return NextResponse.redirect(url, sameLanguage ? 308 : 307);
  }

  const appPath = internalPath(pathname).split("#")[0];
  const internal = appPath === "/" ? `/${locale}` : `/${locale}${appPath}`;
  const headers = requestHeaders(request, locale);

  if (internal === pathname) {
    const response = NextResponse.next({ request: { headers } });
    response.cookies.set("locale", "", { path: "/", maxAge: 0 });
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = internal;
  const response = NextResponse.rewrite(url, { request: { headers } });
  response.cookies.set("locale", "", { path: "/", maxAge: 0 });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
