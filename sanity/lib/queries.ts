const pick = `coalesce(@[$locale], @.en)`;

export const cvQuery = `{
  "profile": *[_type == "profile"][0]{
    name,
    "headline": coalesce(headline[$locale], headline.en),
    "location": coalesce(location[$locale], location.en),
    "landingSummary": coalesce(landingSummary[$locale], landingSummary.en, summary[$locale], summary.en),
    "summary": coalesce(summary[$locale], summary.en),
    email,
    "links": coalesce(links[]{ label, "href": url }, [])
  },
  "experience": *[_type == "experience"] | order(sortOrder asc) {
    _id,
    "role": coalesce(role[$locale], role.en),
    company,
    "workUrl": coalesce(workUrl[$locale], workUrl.en, workUrl.fr),
    start,
    end,
    current,
    "slug": slug.current,
    "summary": coalesce(summary[$locale], summary.en),
    "highlights": coalesce(highlights[]{ "text": ${pick} }.text, []),
    "details": coalesce(details[]{ "text": ${pick} }.text, []),
    "skills": coalesce(skills, []),
    "priorRoles": coalesce(priorRoles[]{
      _key,
      "role": coalesce(role[$locale], role.en),
      start,
      end,
      current,
      "summary": coalesce(summary[$locale], summary.en),
      "highlights": coalesce(highlights[]{ "text": ${pick} }.text, []),
      "details": coalesce(details[]{ "text": ${pick} }.text, []),
    }, []),
    "roles": coalesce(roles[]{
      _key,
      "role": coalesce(role[$locale], role.en),
      start,
      end,
      current,
      "summary": coalesce(summary[$locale], summary.en),
      "highlights": coalesce(highlights[]{ "text": ${pick} }.text, []),
      "details": coalesce(details[]{ "text": ${pick} }.text, []),
    }, []),
    sortOrder
  },
  "projects": *[_type == "project"] | order(sortOrder asc) {
    _id,
    "title": coalesce(title[$locale], title.en),
    "slug": slug.current,
    "summary": coalesce(summary[$locale], summary.en),
    "body": coalesce(body[$locale], body.en),
    "stack": coalesce(stack, []),
    url,
    repo,
    featured,
    sortOrder
  },
  "education": *[_type == "education"] | order(sortOrder asc) {
    _id,
    "school": coalesce(school[$locale], school.en),
    "credential": coalesce(credential[$locale], credential.en),
    start,
    end,
    "coursework": coalesce(coursework[]{ "text": ${pick} }.text, []),
    sortOrder
  },
  "skillGroups": *[_type == "skillGroup"] | order(sortOrder asc) {
    _id,
    "title": coalesce(title[$locale], title.en),
    "skills": coalesce(skills, []),
    sortOrder
  }
}`;

export const projectQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  "title": coalesce(title[$locale], title.en),
  "slug": slug.current,
  "summary": coalesce(summary[$locale], summary.en),
  "body": coalesce(body[$locale], body.en),
  "stack": coalesce(stack, []),
  url,
  repo,
  featured,
  sortOrder
}`;
