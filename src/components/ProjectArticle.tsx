import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { SiteControls } from "@/components/SiteControls";
import { PlainTextParagraphs } from "@/components/PlainTextParagraphs";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import type { Project } from "@/lib/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="cv-panel text-lg leading-relaxed">{children}</p>,
    h1: ({ children }) => <h2 className="cv-panel font-serif text-3xl font-bold">{children}</h2>,
    h2: ({ children }) => <h2 className="cv-panel font-serif text-2xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="cv-panel font-serif text-xl font-semibold">{children}</h3>,
    h4: ({ children }) => <h4 className="cv-panel font-serif text-lg font-semibold">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="cv-panel border-l-2 border-accent/70 text-lg leading-relaxed text-muted">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="flex flex-col gap-3 md:gap-4">{children}</ul>,
    number: ({ children }) => <ol className="flex flex-col gap-3 md:gap-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="cv-panel text-lg leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="cv-panel text-lg leading-relaxed">{children}</li>,
  },
};

export function ProjectArticle({
  project,
  locale,
  labels,
}: {
  project: Project;
  locale: Locale;
  labels: Dictionary;
}) {
  return (
    <article className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-3 px-4 py-10 sm:px-8 sm:py-12 md:gap-4">
      <header className="flex flex-col gap-4 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <a
          className="no-print inline-flex items-center gap-1.5 text-sm text-muted hover:text-paper"
          href={localePath(locale, "/cv")}
        >
          <span aria-hidden="true">←</span>
          {labels.back}
        </a>
        <SiteControls labels={labels} locale={locale} />
      </header>
      <section className="cv-panel mt-10 sm:mt-14">
        <p className="text-xs tracking-[0.22em] text-accent uppercase">{labels.project}</p>
        <h1 className="name-gradient mt-4 font-serif text-[clamp(2.2rem,8vw,3.75rem)] leading-tight font-bold">
          {project.title}
        </h1>
        <PlainTextParagraphs
          className="mt-6"
          paragraphClassName="text-xl leading-relaxed text-muted"
          text={project.summary}
        />
        {project.repo ? (
          <p className="mt-6">
            <a
              className="font-medium text-cyan underline decoration-cyan/40 underline-offset-4 hover:decoration-cyan"
              href={project.repo}
              rel="noreferrer"
              target="_blank"
            >
              {labels.github}
            </a>
          </p>
        ) : null}
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li className="rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-xs" key={item}>
              {item}
            </li>
          ))}
        </ul>
        {project.url ? (
          <p className="mt-6 text-sm">
            <a className="font-medium text-accent underline underline-offset-4" href={project.url} rel="noreferrer" target="_blank">
              {labels.visit}
            </a>
          </p>
        ) : null}
      </section>
      {project.body && project.body.length > 0 ? <PortableText components={components} value={project.body} /> : null}
    </article>
  );
}
