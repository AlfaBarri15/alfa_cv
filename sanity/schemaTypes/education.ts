import { defineArrayMember, defineField, defineType } from "sanity";
import { localizedField } from "./localized";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    localizedField("school", { title: "School" }),
    localizedField("credential", { title: "Credential" }),
    defineField({
      name: "start",
      title: "Start",
      type: "string",
      description: "Optional. Shown as typed. Example: 2018.",
    }),
    defineField({
      name: "end",
      title: "End",
      type: "string",
      description: "Shown as typed. Example: 2022. You can set an end year without a start year.",
    }),
    defineField({
      name: "coursework",
      title: "Relevant coursework",
      type: "array",
      description: "Course names for this credential. English is shown on the English site. French is shown on /fr.",
      of: [
        defineArrayMember({
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
        }),
      ],
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "school.en", subtitle: "credential.en" },
  },
});
