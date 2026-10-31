import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("CV")
    .items([
      S.listItem()
        .title("Profile")
        .id("profile")
        .child(
          S.document().schemaType("profile").documentId("profile").title("Profile"),
        ),
      S.divider(),
      S.documentTypeListItem("experience").title("Experience"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("education").title("Education"),
      S.documentTypeListItem("skillGroup").title("Skill categories"),
    ]);
