"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { pathForLocale, type Dictionary, type Locale } from "@/i18n";

type Theme = "light" | "dark";

function SunIcon({ compact }: { compact?: boolean }) {
  return (
    <svg aria-hidden="true" className={compact ? "size-3" : "size-4"} fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 3.5v2.25M12 18.25V20.5M3.5 12h2.25M18.25 12H20.5M6.1 6.1l1.6 1.6M16.3 16.3l1.6 1.6M17.9 6.1l-1.6 1.6M7.7 16.3l-1.6 1.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function MoonIcon({ compact }: { compact?: boolean }) {
  return (
    <svg aria-hidden="true" className={compact ? "size-3" : "size-4"} fill="none" viewBox="0 0 24 24">
      <path
        d="M19.5 14.2A7.25 7.25 0 0 1 9.8 4.5 6.1 6.1 0 1 0 19.5 14.2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function SiteControls({
  locale,
  labels,
  compact = false,
}: {
  locale: Locale;
  labels: Dictionary;
  compact?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<Theme | null>(null);
  const [shownLocale, setShownLocale] = useState(locale);
  const [motionReady, setMotionReady] = useState(false);
  const localeTimer = useRef<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const explicit = stored === "light" || stored === "dark";
    const apply = (next: Theme) => {
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    apply(explicit ? stored : media.matches ? "dark" : "light");
    const onChange = () => apply(media.matches ? "dark" : "light");
    if (!explicit) media.addEventListener("change", onChange);
    const frame = requestAnimationFrame(() => setMotionReady(true));
    return () => {
      media.removeEventListener("change", onChange);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setShownLocale(locale);
  }, [locale]);

  useEffect(() => {
    return () => {
      if (localeTimer.current !== null) window.clearTimeout(localeTimer.current);
    };
  }, []);

  function chooseTheme(next: Theme) {
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  function chooseLocale(event: MouseEvent<HTMLAnchorElement>, code: Locale) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (code === shownLocale) return;
    event.preventDefault();
    document.cookie = `locale-choice=${code}; path=/; max-age=31536000; samesite=lax`;
    setShownLocale(code);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const href = pathForLocale(pathname, code);
    if (reduce) {
      router.push(href);
      return;
    }
    if (localeTimer.current !== null) window.clearTimeout(localeTimer.current);
    localeTimer.current = window.setTimeout(() => router.push(href), 320);
  }

  const pad = compact ? "p-0.5" : "p-1";
  const pill = compact
    ? "relative z-10 inline-flex h-6 items-center justify-center rounded-full px-2 text-[0.65rem] leading-none tracking-wide hover:bg-paper/15"
    : "relative z-10 inline-flex h-8 items-center justify-center rounded-full px-3 text-xs leading-none tracking-wide hover:bg-paper/15";
  const iconButton = compact
    ? "relative z-10 grid size-6 cursor-pointer place-items-center rounded-full hover:bg-paper/15"
    : "relative z-10 grid size-8 cursor-pointer place-items-center rounded-full hover:bg-paper/15";
  const thumb = `col-start-1 row-start-1 rounded-full bg-accent ${motionReady ? "transition-transform duration-300 ease-out motion-reduce:transition-none" : ""}`;
  const label = "transition-colors duration-300 ease-out motion-reduce:transition-none";
  const selected = "text-on-accent";
  const idle = "text-muted hover:text-paper";

  return (
    <div className={`no-print flex flex-wrap items-center ${compact ? "gap-1.5" : "gap-2"}`}>
      <div className={`relative grid grid-cols-2 rounded-full border border-line bg-ink/60 ${pad}`} role="group" aria-label={labels.language}>
        <span aria-hidden="true" className={`${thumb} ${shownLocale === "fr" ? "translate-x-full" : ""}`} />
        {(["en", "fr"] as const).map((code) => (
          <Link
            aria-current={locale === code ? "page" : undefined}
            className={`${pill} ${label} ${code === "fr" ? "col-start-2" : "col-start-1"} row-start-1 ${shownLocale === code ? selected : idle}`}
            href={pathForLocale(pathname, code)}
            hrefLang={code}
            key={code}
            onClick={(event) => chooseLocale(event, code)}
          >
            {code.toUpperCase()}
          </Link>
        ))}
      </div>
      <div className={`relative grid grid-cols-2 rounded-full border border-line bg-ink/60 ${pad}`} role="group" aria-label={labels.theme}>
        <span aria-hidden="true" className={`${thumb} theme-thumb`} />
        <button
          aria-label={labels.light}
          aria-pressed={theme === "light"}
          className={`${iconButton} ${label} theme-option col-start-1 row-start-1 ${theme === "light" ? selected : idle}`}
          data-theme-option="light"
          onClick={() => chooseTheme("light")}
          title={labels.light}
          type="button"
        >
          <SunIcon compact={compact} />
        </button>
        <button
          aria-label={labels.dark}
          aria-pressed={theme === "dark"}
          className={`${iconButton} ${label} theme-option col-start-2 row-start-1 ${theme === "dark" ? selected : idle}`}
          data-theme-option="dark"
          onClick={() => chooseTheme("dark")}
          title={labels.dark}
          type="button"
        >
          <MoonIcon compact={compact} />
        </button>
      </div>
    </div>
  );
}
