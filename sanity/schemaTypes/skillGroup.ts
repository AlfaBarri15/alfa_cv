import { defineArrayMember, defineField, defineType } from "sanity";
import { localizedField } from "./localized";

export const skillGroup = defineType({
  name: "skillGroup",
  title: "Skill category",
  type: "document",
  description: "One category, such as Languages or Data. Each document is a heading plus the skills under it.",
  fields: [
    localizedField("title", { title: "Title" }),
    defineField({
      name: "skills",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1),
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
    select: { title: "title.en" },
  },
});
