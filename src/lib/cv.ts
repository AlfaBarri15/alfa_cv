import { cache } from "react";
import type { Locale } from "@/i18n";
import { client, isSanityConfigured } from "../../sanity/lib/client";
import { cvQuery, projectQuery } from "../../sanity/lib/queries";
import { fallbackCv } from "./fallback";
import type { CvContent, Education, Experience, ExperienceRole, Profile, Project } from "./types";

const fetchOptions = { next: { revalidate: 60 } };

type RawExperienceRole = Partial<ExperienceRole> & { _key?: string | null };

type RawExperience = Partial<Omit<Experience, "priorRoles" | "slug" | "workUrl" | "highlights" | "details">> & {
  _id: string;
  company: string;
  slug?: string | null;
  workUrl?: string | null;
  highlights?: string[] | null;
  details?: string[] | null;
  priorRoles?: RawExperienceRole[] | null;
  /** Older multi-role field; still read if present. */
  roles?: RawExperienceRole[] | null;
  sortOrder: number;
};

function hasProfile(profile: Profile | null | undefined): profile is Profile {
  return Boolean(profile?.name);
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function experienceSlug(job: Pick<Experience, "_id"> & { slug?: string | null }) {
  const explicit = job.slug?.trim();
  if (explicit) {
    return explicit;
  }
  const fromId = job._id.replace(/^experience-/, "").trim();
  return slugify(fromId || job._id);
}

function cleanLines(lines: string[] | null | undefined) {
  return (lines ?? []).map((line) => line.trim()).filter(Boolean);
}

function cleanRole(role: RawExperienceRole, index: number): ExperienceRole | null {
  const title = role.role?.trim();
  const start = role.start?.trim();
  if (!title || !start) {
    return null;
  }
  return {
    _key: role._key?.trim() || `role-${index}`,
    role: title,
    start,
    end: role.end?.trim() || null,
    current: Boolean(role.current),
    summary: role.summary?.trim() || "",
    highlights: cleanLines(role.highlights),
    details: cleanLines(role.details),
  };
}

function cleanRoleList(roles: RawExperienceRole[] | null | undefined) {
  return (roles ?? [])
    .map((role, index) => cleanRole(role, index))
    .filter((role): role is ExperienceRole => Boolean(role));
}

function cleanExperience(items: RawExperience[] | null | undefined): Experience[] {
  const cleaned: Experience[] = [];
  for (const job of items ?? []) {
    const priorRoles = cleanRoleList(job.priorRoles);
    const legacyRoles = cleanRoleList(job.roles);
    const role = job.role?.trim() || legacyRoles[0]?.role || "";
    const start = job.start?.trim() || legacyRoles[0]?.start || "";
    if (!role || !start) {
      continue;
    }
    cleaned.push({
      _id: job._id,
      slug: experienceSlug(job),
      role,
      company: job.company,
      start,
      end: job.end?.trim() || legacyRoles[0]?.end || null,
      current: job.current ?? legacyRoles[0]?.current ?? false,
      summary: job.summary?.trim() || legacyRoles[0]?.summary || "",
      workUrl: job.workUrl?.trim() || null,
      highlights: cleanLines(job.highlights?.length ? job.highlights : legacyRoles[0]?.highlights),
      details: cleanLines(job.details?.length ? job.details : legacyRoles[0]?.details),
      skills: cleanLines(job.skills),
      priorRoles:
        priorRoles.length > 0 ? priorRoles : legacyRoles.length > 1 ? legacyRoles.slice(1) : [],
      sortOrder: job.sortOrder,
    });
  }
  return cleaned;
}

function cleanEducation(items: Education[] | null | undefined): Education[] {
  return (items ?? []).map((item) => ({
    ...item,
    start: item.start?.trim() || null,
    end: item.end?.trim() || null,
    coursework: (item.coursework ?? []).map((course) => course.trim()).filter(Boolean),
  }));
}

export const getCv = cache(async (locale: Locale): Promise<CvContent> => {
  if (!client) {
    return fallbackCv(locale);
  }

  try {
    const result = await client.fetch<Omit<CvContent, "source"> | null>(
      cvQuery,
      { locale },
      fetchOptions,
    );

    if (!result || !hasProfile(result.profile)) {
      return fallbackCv(locale);
    }

    return {
      source: "sanity",
      profile: {
        ...result.profile,
        headline: result.profile.headline ?? "",
        location: result.profile.location ?? "",
        landingSummary: result.profile.landingSummary || result.profile.summary || "",
        summary: result.profile.summary ?? "",
        email: result.profile.email ?? "",
        links: result.profile.links ?? [],
      },
      experience: cleanExperience(result.experience),
      projects: (result.projects ?? []).filter((project) => project.slug),
      education: cleanEducation(result.education),
      skillGroups: result.skillGroups ?? [],
    };
  } catch {
    return fallbackCv(locale);
  }
});

export const getExperience = cache(async (locale: Locale, slug: string): Promise<Experience | null> => {
  const cv = await getCv(locale);
  return cv.experience.find((job) => job.slug === slug) ?? null;
});

export const getProject = cache(async (locale: Locale, slug: string): Promise<Project | null> => {
  if (!client) {
    return fallbackCv(locale).projects.find((project) => project.slug === slug) ?? null;
  }

  try {
    const project = await client.fetch<Project | null>(
      projectQuery,
      { locale, slug },
      fetchOptions,
    );
    if (!project?.slug) {
      return null;
    }
    return project;
  } catch {
    return fallbackCv(locale).projects.find((project) => project.slug === slug) ?? null;
  }
});

export function educationPeriod(
  start: string | null | undefined,
  end: string | null | undefined,
) {
  const from = start?.trim();
  const to = end?.trim();
  if (from && to) {
    return `${from} — ${to}`;
  }
  return from || to || null;
}

export function period(
  start: string,
  end: string | null | undefined,
  current: boolean | null | undefined,
  nowLabel: string,
) {
  if (current) {
    return `${start} — ${nowLabel}`;
  }
  if (end) {
    return `${start} — ${end}`;
  }
  return start;
}

export { isSanityConfigured };
