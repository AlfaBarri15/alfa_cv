import { defineArrayMember, defineField, defineType } from "sanity";
import { localizedField } from "./localized";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    localizedField("headline", {
      title: "Headline",
    }),
    localizedField("location", {
      title: "Location",
    }),
    localizedField("landingSummary", {
      title: "Main page summary",
      rows: 4,
      required: false,
      description: "Shown on the landing page, one word at a time as you scroll. Leave it empty to reuse the CV summary.",
    }),
    localizedField("summary", {
      title: "CV summary",
      rows: 5,
      description: "Shown in the Summary section of the CV.",
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "headline.en" },
  },
});
