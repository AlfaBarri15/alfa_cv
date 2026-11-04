import { Banner } from "./Banner";
import { SectionJumps } from "./SectionJumps";
import { SiteControls } from "./SiteControls";
import { SummaryWords } from "./SummaryWords";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import type { CvContent } from "@/lib/types";

export function SummaryView({
  content,
  locale,
  labels,
}: {
  content: CvContent;
  locale: Locale;
  labels: Dictionary;
}) {
  const { profile, experience, skillGroups, source } = content;
  const parts = profile.name.trim().split(/\s+/);
  const first = parts[0] ?? "";
  const last = parts.slice(1).join(" ");
  const summary = profile.landingSummary || profile.summary;
  const categories = skillGroups.filter((group) => group.skills.length > 0);
  const sectionIds = [
    "sum-name",
    "sum-summary",
    ...(experience.length > 0 ? ["sum-experience"] : []),
    "sum-skills",
    "sum-finale",
  ];

  return (
    <div className="summary-root">
      <a className="skip-link" href="#summary-story">
        {labels.skip}
      </a>
      {source === "fallback" ? <Banner labels={labels} /> : null}
      <header className="summary-bar no-print">
        <SiteControls labels={labels} locale={locale} />
      </header>

      <main id="summary-story">
        <a className="cv-travel no-print" href={localePath(locale, "/cv")}>
          <span className="cv-nudge" aria-hidden="true">
            <span className="cv-wiggle">↘</span>
            <span className="cv-clickme">{labels.clickMe}</span>
            <span className="cv-wiggle cv-wiggle-late">↙</span>
          </span>
          {labels.readCv}
        </a>
        <section className="sum-pin sum-pin-name" id="sum-name">
          <div className="sum-stage">
            <div className="sum-orb sum-orb-a" />
            <div className="sum-orb sum-orb-b" />
            <p className="text-xs tracking-[0.28em] text-accent uppercase">{profile.location}</p>
            <h1 className="sum-name font-serif font-bold tracking-tight">
              <span className="sum-name-a name-gradient">{first}</span>
              {last ? <span className="sum-name-b">{last}</span> : null}
            </h1>
            <p className="sum-headline text-lg text-paper sm:text-2xl">{profile.headline}</p>
          </div>
        </section>

        <SummaryWords label={labels.summary} text={summary} />

        <section className="sum-roles" aria-label={labels.experience} id="sum-experience">
          {experience.map((job) => (
            <article className="sum-role" key={job._id}>
              <p className="text-sm font-medium tracking-[0.18em] text-cyan uppercase">
                {job.workUrl ? (
                  <a
                    className="underline decoration-cyan/40 underline-offset-4 hover:decoration-cyan"
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
              <h2 className="font-serif text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.95] font-bold">{job.role}</h2>
              {job.priorRoles.map((role) => (
                <p className="mt-2 text-lg text-muted sm:text-xl" key={role._key}>
                  {role.role}
                </p>
              ))}
            </article>
          ))}
        </section>

        <section className="sum-skills" aria-label={labels.skills} id="sum-skills">
          <h2 className="font-serif text-3xl font-bold sm:text-5xl">{labels.skills}</h2>
          <div className="sum-skill-groups">
            {categories.map((group) => (
              <div key={group._id}>
                <h3>{group.title}</h3>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <SectionJumps ids={sectionIds} labels={labels} />
        <section className="sum-finale">
          <div className="sum-finale-mark" id="sum-finale" />
          <a className="sum-finale-link" href={localePath(locale, "/cv")}>
            {labels.readCv}
          </a>
        </section>
      </main>
    </div>
  );
}
