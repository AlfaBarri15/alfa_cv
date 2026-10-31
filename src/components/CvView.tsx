import { educationPeriod, period } from "@/lib/cv";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import type { CvContent } from "@/lib/types";
import { Banner } from "./Banner";
import { SiteControls } from "./SiteControls";

export function CvView({
  content,
  locale,
  labels,
}: {
  content: CvContent;
  locale: Locale;
  labels: Dictionary;
}) {
  const { profile, experience, projects, education, skillGroups, source } = content;
  const selected = projects.filter((project) => project.featured !== false);
  const sections = [
    ["summary", labels.summary],
    ["experience", labels.experience],
    ["projects", labels.projects],
    ["education", labels.education],
    ["skills", labels.skills],
    ["contact", labels.contact],
  ] as const;

  return (
    <>
      <a className="skip-link" href="#summary">
        {labels.skip}
      </a>
      {source === "fallback" ? <Banner labels={labels} /> : null}
      <div className="cv-shell w-full md:grid md:grid-cols-[minmax(15rem,min(24rem,26vw))_minmax(0,1fr)]">
        <aside className="cv-aside relative flex flex-col gap-8 border-b border-line py-8 md:sticky md:top-0 md:h-screen md:justify-between md:gap-10 md:overflow-y-auto md:border-r md:border-b-0 md:py-12">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute top-24 -right-16 h-40 w-40 rounded-full bg-cyan/20 blur-3xl" />
          </div>
          <div className="cv-aside-scrim pointer-events-none absolute inset-0 z-[1]" />
          <div className="relative z-10">
            <a
              className="no-print inline-flex items-center gap-1.5 text-sm text-muted hover:text-paper"
              href={localePath(locale)}
            >
              <span aria-hidden="true">←</span>
              {labels.mainPage}
            </a>
            <p className="mt-6 text-xs tracking-[0.28em] text-accent uppercase">{labels.kicker}</p>
            <h1 className="name-gradient rise mt-4 font-serif text-[clamp(2.4rem,9vw,3.75rem)] leading-[0.95] font-bold tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-4 text-lg text-paper">{profile.headline}</p>
            <p className="mt-1 text-muted">{profile.location}</p>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {profile.links.map((link) => (
                <li key={link.label}>
                  <a
                    className="font-medium text-cyan underline decoration-cyan/40 underline-offset-4 hover:decoration-cyan"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative z-10 flex flex-col gap-8">
            <nav aria-label={labels.sectionsLabel} className="no-print max-w-full">
              <ol className="flex max-w-full gap-4 overflow-x-auto md:flex-col md:gap-2">
                {sections.map(([id, label], index) => (
                  <li className="shrink-0" key={id}>
                    <a
                      className="flex items-baseline gap-3 text-sm whitespace-nowrap text-muted hover:text-paper"
                      href={`#${id}`}
                    >
                      <span className="font-serif text-xs font-semibold text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <SiteControls compact labels={labels} locale={locale} />
          </div>
        </aside>

        <main className="flex min-w-0 flex-col gap-6 py-10 md:gap-8 md:py-12 lg:py-16">
          <section className="cv-panel scroll-mt-24" id="summary">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">{labels.summary}</h2>
            <p className="cv-copy mt-6 text-lg leading-relaxed">{profile.summary}</p>
          </section>

          <section className="cv-panel scroll-mt-24" id="experience">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">{labels.experience}</h2>
            <ol className="mt-8">
              {experience.map((job) => (
                <li className="border-l-2 border-accent/70 py-6 pl-6" key={job._id}>
                  <p className="text-sm font-medium text-cyan">
                    {period(job.start, job.end, job.current, labels.now)}
                  </p>
                  <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="min-w-0 font-serif text-2xl font-semibold">
                      <a className="rounded-sm transition-colors hover:text-accent" href={localePath(locale, `/experiences/${job.slug}`)}>
                        {job.role}
                      </a>
                    </h3>
                    <a className="shrink-0 text-sm text-muted hover:text-paper" href={localePath(locale, `/experiences/${job.slug}`)}>
                      {labels.view}
                    </a>
                  </div>
                  {job.priorRoles.map((role) => (
                    <p className="mt-1 text-muted" key={role._key}>
                      {role.role}
                      <span className="text-cyan">
                        {" · "}
                        {period(role.start, role.end, role.current, labels.now)}
                      </span>
                    </p>
                  ))}
                  <p className="text-muted">
                    {job.workUrl ? (
                      <a
                        className="underline decoration-cyan/40 underline-offset-4 hover:text-paper hover:decoration-cyan"
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
                  <p className="cv-copy mt-3 leading-relaxed">{job.summary}</p>
                  {job.highlights.length > 0 ? (
                    <ul className="cv-copy mt-4 space-y-2">
                      {job.highlights.map((highlight) => (
                        <li
                          className="pl-4 leading-relaxed before:mr-2 before:text-accent before:content-['–']"
                          key={highlight}
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {job.skills.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <li
                          className="rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-xs text-paper"
                          key={skill}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <section className="cv-panel scroll-mt-24" id="projects">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">{labels.projects}</h2>
            <div className="mt-4">
              {selected.map((project) => (
                <article className="group border-b border-line py-8 last:border-b-0 last:pb-0" key={project._id}>
                  <a className="block rounded-sm" href={localePath(locale, `/projects/${project.slug}`)}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <h3 className="min-w-0 font-serif text-[clamp(1.5rem,4vw,1.875rem)] font-bold transition-colors group-hover:text-accent">
                        {project.title}
                      </h3>
                      <span className="shrink-0 text-sm text-muted group-hover:text-paper">{labels.view}</span>
                    </div>
                    <p className="cv-copy mt-3 text-muted">{project.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <li
                          className="rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-xs text-paper"
                          key={item}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="cv-panel scroll-mt-24" id="education">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">{labels.education}</h2>
            <ul className="mt-8 space-y-10">
              {education.map((item) => {
                const dates = educationPeriod(item.start, item.end);
                return (
                  <li key={item._id}>
                    {dates ? <p className="text-sm font-medium text-cyan">{dates}</p> : null}
                    <h3 className={`${dates ? "mt-2" : ""} font-serif text-2xl font-semibold`}>{item.school}</h3>
                    <p className="text-muted">{item.credential}</p>
                    {item.coursework.length > 0 ? (
                      <div className="mt-4">
                        <h4 className="text-xs tracking-[0.2em] text-accent uppercase">{labels.coursework}</h4>
                        <ul className="cv-copy mt-3 space-y-2">
                          {item.coursework.map((course) => (
                            <li
                              className="pl-4 leading-relaxed before:mr-2 before:text-accent before:content-['–']"
                              key={course}
                            >
                              {course}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="cv-panel scroll-mt-24" id="skills">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">{labels.skills}</h2>
            <div className="mt-8 grid gap-8">
              {skillGroups
                .filter((group) => group.skills.length > 0)
                .map((group) => (
                  <div key={group._id}>
                    <h3 className="text-xs tracking-[0.2em] text-accent uppercase">{group.title}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <li
                          className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm"
                          key={skill}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </section>

          <section className="cv-panel scroll-mt-24" id="contact">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">{labels.contact}</h2>
            <p className="mt-6 text-lg">
              <a className="font-medium break-all text-accent underline decoration-accent/40 underline-offset-4" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </p>
            <p className="mt-2 text-muted">{profile.location}</p>
          </section>
        </main>
      </div>
    </>
  );
}
