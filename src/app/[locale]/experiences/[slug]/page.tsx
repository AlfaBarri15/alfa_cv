import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperienceArticle } from "@/components/ExperienceArticle";
import { getDictionary, isLocale, locales, type Locale } from "@/i18n";
import { getCv, getExperience } from "@/lib/cv";

export const revalidate = 60;

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of locales) {
    const cv = await getCv(locale);
    for (const job of cv.experience) {
      params.push({ locale, slug: job.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    return { title: "Experience" };
  }
  const job = await getExperience(locale, slug);
  if (!job) {
    return { title: "Experience" };
  }
  return {
    title: `${job.role} — ${job.company}`,
    description: job.summary || job.company,
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const job = await getExperience(locale, slug);
  if (!job) {
    notFound();
  }
  return <ExperienceArticle job={job} labels={getDictionary(locale)} locale={locale} />;
}
