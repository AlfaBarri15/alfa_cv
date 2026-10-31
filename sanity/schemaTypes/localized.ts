import { defineField } from "sanity";

type LocalizedOptions = {
  title: string;
  rows?: number;
  required?: boolean;
  description?: string;
};

export function localizedField(name: string, options: LocalizedOptions) {
  const kind = options.rows ? "text" : "string";
  const required = options.required !== false;

  return defineField({
    name,
    title: options.title,
    type: "object",
    description: options.description
      ? `${options.description} English is shown on the English site. French is shown on /fr.`
      : "English is shown on the English site. French is shown on /fr.",
    fields: [
      defineField({
        name: "en",
        title: "English",
        type: kind,
        rows: options.rows,
        validation: (rule) => (required ? rule.required() : rule),
      }),
      defineField({
        name: "fr",
        title: "French",
        type: kind,
        rows: options.rows,
        validation: (rule) => (required ? rule.required() : rule),
      }),
    ],
  });
}
