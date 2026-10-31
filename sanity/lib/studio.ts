function studioPath(value: string | undefined, fallback: string) {
  const raw = (value || fallback).trim();
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  if (withSlash === "/") return fallback;
  return withSlash.replace(/\/$/, "");
}

export const studioName = process.env.NEXT_PUBLIC_SANITY_STUDIO_NAME || "personal-cv";
export const studioTitle = process.env.NEXT_PUBLIC_SANITY_STUDIO_TITLE || "Personal CV";

// Next serves this from the folder src/app/sanity-studio. The env value has to match that folder.
export const studioBasePath = studioPath(
  process.env.NEXT_PUBLIC_SANITY_STUDIO_BASE_PATH,
  "/sanity-studio",
);
