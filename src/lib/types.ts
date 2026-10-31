export type Link = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  headline: string;
  location: string;
  landingSummary: string;
  summary: string;
  email: string;
  links: Link[];
};

export type ExperienceRole = {
  _key: string;
  role: string;
  start: string;
  end?: string | null;
  current?: boolean | null;
  summary: string;
  highlights: string[];
  details: string[];
};

export type Experience = {
  _id: string;
  slug: string;
  role: string;
  company: string;
  start: string;
  end?: string | null;
  current?: boolean | null;
  summary: string;
  workUrl?: string | null;
  highlights: string[];
  details: string[];
  skills: string[];
  /** Earlier titles at the same workplace, newest first. Empty for a single-title job. */
  priorRoles: ExperienceRole[];
  sortOrder: number;
};

export type RichTextBlock = {
  _type: "block";
  _key: string;
  style: "normal";
  markDefs: [];
  children: { _type: "span"; _key: string; text: string; marks: string[] }[];
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  body: RichTextBlock[] | null;
  stack: string[];
  url?: string | null;
  repo?: string | null;
  featured?: boolean | null;
  sortOrder: number;
};

export type Education = {
  _id: string;
  school: string;
  credential: string;
  start?: string | null;
  end?: string | null;
  coursework: string[];
  sortOrder: number;
};

export type SkillGroup = {
  _id: string;
  title: string;
  skills: string[];
  sortOrder: number;
};

export type CvContent = {
  source: "sanity" | "fallback";
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skillGroups: SkillGroup[];
};
