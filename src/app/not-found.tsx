import Link from "next/link";
import { headers } from "next/headers";
import { getDictionary, localePath } from "@/i18n";

export default async function NotFound() {
  const headerList = await headers();
  const locale = headerList.get("x-locale") === "fr" ? "fr" : "en";
  const labels = getDictionary(locale);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-4 sm:px-6">
      <p className="text-xs tracking-[0.22em] text-accent uppercase">{labels.notFoundKicker}</p>
      <h1 className="name-gradient mt-4 font-serif text-[clamp(2rem,8vw,3rem)] font-bold">{labels.notFoundTitle}</h1>
      <nav className="mt-8 flex flex-col items-start gap-3">
        <Link className="text-accent underline underline-offset-4" href={localePath(locale)}>
          {labels.goToSummary}
        </Link>
        <Link className="text-accent underline underline-offset-4" href={localePath(locale, "/cv")}>
          {labels.goToCv}
        </Link>
      </nav>
    </main>
  );
}
