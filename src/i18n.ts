export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "fr";
}

export type Dictionary = {
  skip: string;
  sample: string;
  kicker: string;
  sectionsLabel: string;
  summary: string;
  experience: string;
  projects: string;
  education: string;
  coursework: string;
  skills: string;
  contact: string;
  view: string;
  now: string;
  project: string;
  visit: string;
  github: string;
  theme: string;
  light: string;
  dark: string;
  language: string;
  readCv: string;
  mainPage: string;
  back: string;
  clickMe: string;
  previousSection: string;
  nextSection: string;
  goToSummary: string;
  goToCv: string;
  notFoundKicker: string;
  notFoundTitle: string;
  work: string;
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    skip: "Skip to content",
    sample: "Sample content. This is not a real résumé. Publish your documents in Sanity to replace it.",
    kicker: "Curriculum vitae",
    sectionsLabel: "Sections",
    summary: "Summary",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    coursework: "Relevant coursework",
    skills: "Skills",
    contact: "Contact",
    view: "View",
    now: "Now",
    project: "Project",
    visit: "Visit",
    github: "GitHub",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    language: "Language",
    readCv: "Read my CV",
    mainPage: "Summary",
    back: "Back",
    clickMe: "click me",
    previousSection: "Previous section",
    nextSection: "Next section",
    goToSummary: "Go to Summary",
    goToCv: "Go to CV",
    notFoundKicker: "Missing",
    notFoundTitle: "That page is not on this CV.",
    work: "Work",
  },
  fr: {
    skip: "Aller au contenu",
    sample: "Contenu d'exemple. Ceci n'est pas un vrai CV. Publiez vos documents dans Sanity pour le remplacer.",
    kicker: "Curriculum vitae",
    sectionsLabel: "Sections",
    summary: "Profil",
    experience: "Expérience",
    projects: "Projets",
    education: "Formation",
    coursework: "Cours pertinents",
    skills: "Compétences",
    contact: "Contact",
    view: "Voir",
    now: "Aujourd'hui",
    project: "Projet",
    visit: "Visiter",
    github: "GitHub",
    theme: "Thème",
    light: "Clair",
    dark: "Sombre",
    language: "Langue",
    readCv: "Lire mon CV",
    mainPage: "Résumé",
    back: "Retour",
    clickMe: "clique-moi",
    previousSection: "Section précédente",
    nextSection: "Section suivante",
    goToSummary: "Aller au résumé",
    goToCv: "Aller au CV",
    notFoundKicker: "Introuvable",
    notFoundTitle: "Cette page n'est pas sur ce CV.",
    work: "Travail",
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * Folder names inside app/[locale]. French public URLs use the `fr` spelling.
 * `cv` and `experiences` are the same word in both languages once the accent is dropped.
 */
const pathSegments = {
  cv: { en: "cv", fr: "cv" },
  experiences: { en: "experiences", fr: "experiences" },
  projects: { en: "projects", fr: "projets" },
} as const;

type SegmentKey = keyof typeof pathSegments;

const segmentByPublicName = new Map<string, SegmentKey>();
for (const key of Object.keys(pathSegments) as SegmentKey[]) {
  segmentByPublicName.set(pathSegments[key].en, key);
  segmentByPublicName.set(pathSegments[key].fr, key);
}

function splitHash(path: string) {
  const hashIndex = path.indexOf("#");
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
  const bare = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const pathname = bare.startsWith("/") ? bare : `/${bare}`;
  return { pathname: pathname || "/", hash };
}

/** English app path with no locale prefix, for example `/projects/demo`. */
export function internalPath(path: string) {
  const { pathname, hash } = splitHash(path);
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "en" || parts[0] === "fr") parts.shift();
  const key = parts[0] ? segmentByPublicName.get(parts[0]) : undefined;
  if (key && parts[0]) parts[0] = pathSegments[key].en;
  const next = parts.length > 0 ? `/${parts.join("/")}` : "/";
  return `${next}${hash}`;
}

/** Public URL. English has no prefix. French is `/fr` plus the French segment names. */
export function localePath(locale: Locale, path = "/") {
  const { pathname, hash } = splitHash(internalPath(path));
  const parts = pathname.split("/").filter(Boolean);
  const key = parts[0] ? segmentByPublicName.get(parts[0]) : undefined;
  if (key && parts[0]) parts[0] = pathSegments[key][locale];
  const tail = parts.join("/");
  if (locale === "fr") return tail ? `/fr/${tail}${hash}` : `/fr${hash}`;
  return tail ? `/${tail}${hash}` : `/${hash}`;
}

/** Current address bar path, rewritten to the other language. */
export function pathForLocale(pathname: string, locale: Locale) {
  return localePath(locale, pathname);
}
