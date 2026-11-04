import { period } from "@/lib/cv";
import { SiteControls } from "@/components/SiteControls";
import { PlainTextParagraphs } from "@/components/PlainTextParagraphs";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import type { Experience } from "@/lib/types";

export function ExperienceArticle({
  job,
  locale,
  labels,
}: {
  job: Experience;
  locale: Locale;
  labels: Dictionary;
}) {
  const points = job.details.length > 0 ? job.details : job.highlights;

  return (
    <article className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-3 px-4 py-10 sm:px-8 sm:py-12 md:gap-4">
      <header className="flex flex-col gap-4 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <a
          className="no-print inline-flex items-center gap-1.5 text-sm text-muted hover:text-paper"
          href={localePath(locale, "/cv#experience")}
        >
          <span aria-hidden="true">←</span>
          {labels.back}
        </a>
        <SiteControls labels={labels} locale={locale} />
      </header>

      <section className="cv-panel mt-10 sm:mt-14">
        <p className="text-xs tracking-[0.22em] text-accent uppercase">{labels.experience}</p>
        <h1 className="name-gradient mt-4 font-serif text-[clamp(2.2rem,8vw,3.75rem)] leading-tight font-bold">
          {job.role}
        </h1>
        {job.priorRoles.map((role) => (
          <p className="mt-3 text-xl text-muted" key={role._key}>
            {role.role}
            <span className="text-cyan">
              {" · "}
              {period(role.start, role.end, role.current, labels.now)}
            </span>
          </p>
        ))}
        <p className="mt-6 text-xl text-paper">
          {job.workUrl ? (
            <a
              className="underline decoration-cyan/40 underline-offset-4 hover:text-accent hover:decoration-cyan"
              href={job.workUrl}
              rel="noreferrer"
              target="_blank"
            >
              {job.company}
            </a>
          ) : (
            job.company
          )}
        </p>
        <p className="mt-2 text-sm font-medium text-cyan">{period(job.start, job.end, job.current, labels.now)}</p>
        {job.summary ? (
          <PlainTextParagraphs
            className="mt-6"
            paragraphClassName="text-xl leading-relaxed text-muted"
            text={job.summary}
          />
        ) : null}
        {job.skills.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <li className="rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-xs" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {points.map((point) => (
        <p className="cv-panel text-lg leading-relaxed" key={point}>
          {point}
        </p>
      ))}
    </article>
  );
}
