import { defineArrayMember, defineField, defineType } from "sanity";
import { localizedField } from "./localized";

const localizedLine = defineArrayMember({
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fr",
      title: "French",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "en" },
  },
});

const localizedDetail = defineArrayMember({
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fr",
      title: "French",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "en" },
  },
});

const roleEntryFields = [
  localizedField("role", { title: "Title" }),
  defineField({
    name: "start",
    title: "Start",
    type: "string",
    description: "Shown as typed. Example: May 2020.",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "end",
    title: "End",
    type: "string",
    description: "Leave empty when Current is on.",
  }),
  defineField({
    name: "current",
    title: "Current role",
    type: "boolean",
    initialValue: false,
  }),
];

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    localizedField("role", { title: "Title" }),
    defineField({
      name: "company",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "workUrl",
      title: "Work link",
      type: "object",
      description:
        "Address of the workplace. English opens on the English site. French opens on /fr. Leave a language empty and that page uses the other language if it has a link.",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "url",
        }),
        defineField({
          name: "fr",
          title: "French",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "start",
      title: "Start",
      type: "string",
      description: "Shown as typed. Example: 2024.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "end",
      title: "End",
      type: "string",
      description: "Leave empty when Current is on.",
    }),
    defineField({
      name: "current",
      title: "Current role",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "slug",
      type: "slug",
      description: "Address of this role's page, for example bell-canada. Leave empty to build it from the document id.",
      options: { source: "company" },
    }),
    localizedField("summary", { title: "Summary", rows: 3 }),
    defineField({
      name: "highlights",
      title: "CV highlights",
      description: "Short lines on the CV. One sentence each.",
      type: "array",
      of: [localizedLine],
    }),
    defineField({
      name: "details",
      title: "Page details",
      description: "Longer lines on the experience page. Leave empty to reuse the CV highlights until you write these.",
      type: "array",
      of: [localizedDetail],
    }),
    defineField({
      name: "skills",
      title: "Skills",
      description: "Technologies and practices used in this job.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "priorRoles",
      title: "Earlier titles at this workplace",
      description:
        "Optional. Add only the title and dates for earlier roles at this company, newest first. The fields above describe the main experience, including its summary, CV highlights, and page details.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "roleEntry",
          fields: roleEntryFields,
          preview: {
            select: { title: "role.en", start: "start", end: "end", current: "current" },
            prepare({ title, start, end, current }) {
              const when = current ? `${start} — now` : end ? `${start} — ${end}` : start;
              return { title: title || "Role", subtitle: when };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "role.en", subtitle: "company" },
  },
});
