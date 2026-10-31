import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentLang } from "@/components/DocumentLang";
import { LivingBackground } from "@/components/LivingBackground";
import { isLocale, locales } from "@/i18n";
import { getCv } from "@/lib/cv";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const cv = await getCv(locale);
  return {
    title: {
      default: `${cv.profile.name} — CV`,
      template: `%s — ${cv.profile.name}`,
    },
    description: cv.profile.summary,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  return (
    <>
      <DocumentLang locale={locale} />
      <LivingBackground />
      {children}
    </>
  );
}
