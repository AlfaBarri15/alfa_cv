import { defineArrayMember, defineField, defineType } from "sanity";
import { localizedField } from "./localized";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    localizedField("title", { title: "Title" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (rule) => rule.required(),
    }),
    localizedField("summary", { title: "Summary", rows: 3 }),
    defineField({
      name: "body",
      title: "Case study",
      type: "object",
      description: "English is shown on the English site. French is shown on /fr.",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "array",
          of: [defineArrayMember({ type: "block" })],
        }),
        defineField({
          name: "fr",
          title: "French",
          type: "array",
          of: [defineArrayMember({ type: "block" })],
        }),
      ],
    }),
    defineField({
      name: "stack",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "url",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "repo",
      title: "GitHub URL",
      type: "url",
      description: "Shown as the GitHub link on the project page.",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: true,
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
  preview: {
    select: { title: "title.en", subtitle: "summary.en" },
  },
});
