import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-02-01" });

const skillsByExperience = {
  "experience-bell": [
    "Next.js",
    "React",
    "TypeScript",
    "Go",
    "REST APIs",
    "GitLab CI/CD",
    "AWS",
    "New Relic",
    "End-to-end testing",
    "k6",
    "Grafana",
    "SQL",
  ],
  "experience-mcgill": [
    "React",
    "Django REST Framework",
    "PostgreSQL",
    "Elasticsearch",
    "Docker",
    "Nginx",
    "XML",
    "Linux",
    "GitHub Actions",
    "jQuery",
    "Technical leadership",
  ],
  "experience-mda": [
    "Python",
    "Automation",
    "Robotics",
    "Jenkins",
    "CI/CD",
    "Jira",
    "Microcontrollers",
  ],
  "experience-uzinakod": [
    "Angular",
    "TypeScript",
    "ASP.NET",
    "C#",
    "Entity Framework Core",
    "SQL Server",
    "Relational data modeling",
    "Data migration",
  ],
};

const ids = Object.keys(skillsByExperience);
const existingIds = await client.fetch(`*[_id in $ids]._id`, { ids });
const missingIds = ids.filter((id) => !existingIds.includes(id));

if (missingIds.length > 0) {
  throw new Error(`Missing experience documents: ${missingIds.join(", ")}`);
}

let transaction = client.transaction();
for (const [id, skills] of Object.entries(skillsByExperience)) {
  transaction = transaction.patch(id, { set: { skills } });
}

await transaction.commit();

for (const [id, skills] of Object.entries(skillsByExperience)) {
  console.log(`${id}: ${skills.join(", ")}`);
}
