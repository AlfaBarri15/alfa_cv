import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectArticle } from "@/components/ProjectArticle";
import { getDictionary, isLocale, locales, type Locale } from "@/i18n";
import { getCv, getProject } from "@/lib/cv";

export const revalidate = 60;

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of locales) {
    const cv = await getCv(locale);
    for (const project of cv.projects) {
      params.push({ locale, slug: project.slug });
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
    return { title: "Project" };
  }
  const project = await getProject(locale, slug);
  if (!project) {
    return { title: "Project" };
  }
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const project = await getProject(locale, slug);
  if (!project) {
    notFound();
  }
  return <ProjectArticle labels={getDictionary(locale)} locale={locale} project={project} />;
}
