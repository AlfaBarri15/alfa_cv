import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CvView } from "@/components/CvView";
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
  return { title: "CV", description: cv.profile.summary };
}

export default async function CvPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const content = await getCv(locale);
  return <CvView content={content} labels={getDictionary(locale)} locale={locale} />;
}
