import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SummaryView } from "@/components/SummaryView";
import { getDictionary, isLocale } from "@/i18n";
import { getCv } from "@/lib/cv";

export const revalidate = 60;

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
    title: { absolute: cv.profile.name },
    description: cv.profile.landingSummary || cv.profile.summary,
  };
}

export default async function SummaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const content = await getCv(locale);
  return <SummaryView content={content} labels={getDictionary(locale)} locale={locale} />;
}
