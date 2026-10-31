/**
 * For McGill only: keeps the main job fields as Full Stack Lead, and adds the
 * earlier Full Stack Developer title and dates under priorRoles. Descriptions
 * and highlights stay on the main experience.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=... npm run migrate:experience-roles
 *
 * Create a token with Editor access at https://www.sanity.io/manage
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv() {
  const path = resolve(process.cwd(), ".env");
  const env = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i < 0) continue;
    env[line.slice(0, i)] = line.slice(i + 1).replace(/^"|"$/g, "");
  }
  return env;
}

const env = loadEnv();
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_API_WRITE_TOKEN to a Sanity token with Editor access.");
  process.exit(1);
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || env.SANITY_STUDIO_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

const doc = await client.fetch(`*[_id == "experience-mcgill"][0]{
  _id, role, start, end, current, summary, highlights, details, priorRoles, roles
}`);

if (!doc) {
  console.error("experience-mcgill not found.");
  process.exit(1);
}

if (Array.isArray(doc.priorRoles) && doc.priorRoles.length > 0) {
  console.log("McGill already has priorRoles. Nothing to do.");
  process.exit(0);
}

await client
  .patch(doc._id)
  .set({
    role: {
      en: "Full Stack Lead",
      fr: "Responsable full stack",
    },
    start: "May 2022",
    end: "May 2024",
    current: false,
    summary: {
      en: "Part-time full-stack lead at the Music Perception and Cognition Lab.",
      fr: "Responsable full stack à temps partiel au laboratoire de perception et cognition musicales.",
    },
    priorRoles: [
      {
        _type: "roleEntry",
        _key: "mcgill-developer",
        role: {
          en: "Full Stack Developer",
          fr: "Développeur full stack",
        },
        start: "May 2020",
        end: "May 2022",
        current: false,
      },
    ],
  })
  .unset(["roles"])
  .commit();

console.log("Updated experience-mcgill with Lead + prior Developer role.");
