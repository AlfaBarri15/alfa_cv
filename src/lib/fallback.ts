import type { Locale } from "@/i18n";
import type { CvContent, RichTextBlock } from "./types";

type Copy = { en: string; fr: string };

function text(copy: Copy, locale: Locale) {
  return copy[locale];
}

function paragraphs(id: string, lines: Copy[], locale: Locale): RichTextBlock[] {
  return lines.map((line, index) => ({
    _type: "block",
    _key: `${id}-${locale}-${index}`,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `${id}-span-${index}`,
        text: line[locale],
        marks: [],
      },
    ],
  }));
}

export function fallbackCv(locale: Locale): CvContent {
  return {
    source: "fallback",
    profile: {
      name: "Alex Rivera",
      headline: text(
        { en: "Junior software engineer", fr: "Ingénieur logiciel junior" },
        locale,
      ),
      location: "Toronto, Canada",
      landingSummary: text(
        {
          en: "I build careful software and I am learning how data becomes a report someone trusts.",
          fr: "Je construis des logiciels soignés et j'apprends comment une donnée devient un rapport fiable.",
        },
        locale,
      ),
      summary: text(
        {
          en: "Sample summary for a fictional person. Replace it in Sanity once the project is connected. Alex builds small, careful web apps and is learning how data moves from an event to a report someone can trust.",
          fr: "Résumé d'exemple pour une personne fictive. Remplacez-le dans Sanity une fois le projet connecté. Alex construit de petites applications web soignées et apprend comment une donnée passe d'un événement à un rapport fiable.",
        },
        locale,
      ),
      email: "alex.rivera@example.com",
      links: [
        { label: "GitHub", href: "https://example.com" },
        { label: "LinkedIn", href: "https://example.com" },
      ],
    },
    experience: [
      {
        _id: "exp-northwind",
        slug: "northwind",
        role: text({ en: "Software engineer", fr: "Ingénieur logiciel" }, locale),
        company: "Northwind Analytics",
        start: "2024",
        current: true,
        summary: text(
          {
            en: "Sample role. Ships internal tools that turn warehouse events into numbers the operations team checks every morning.",
            fr: "Rôle d'exemple. Livre des outils internes qui transforment les événements d'entrepôt en chiffres que l'équipe des opérations vérifie chaque matin.",
          },
          locale,
        ),
        highlights: [
          text(
            {
              en: "Built a Next.js review screen for late shipments, with the filters the team actually uses.",
              fr: "A construit un écran Next.js pour les livraisons en retard, avec les filtres que l'équipe utilise vraiment.",
            },
            locale,
          ),
          text(
            {
              en: "Moved a nightly spreadsheet export into a tested SQL model so two reports stopped disagreeing.",
              fr: "A remplacé un export nocturne vers un tableur par un modèle SQL testé, pour que deux rapports cessent de se contredire.",
            },
            locale,
          ),
        ],
        details: [
          text(
            {
              en: "Built a Next.js review screen for late shipments, with the filters the team actually uses. The page reads one tested SQL model instead of the three spreadsheets that used to disagree.",
              fr: "A construit un écran Next.js pour les livraisons en retard, avec les filtres que l'équipe utilise vraiment. La page lit un seul modèle SQL testé, plutôt que les trois tableurs qui se contredisaient.",
            },
            locale,
          ),
        ],
        skills: ["Next.js", "TypeScript", "SQL"],
        priorRoles: [],
        sortOrder: 0,
      },
      {
        _id: "exp-harbour",
        slug: "harbour",
        role: text({ en: "Developer", fr: "Développeur" }, locale),
        company: "Harbour & Co.",
        start: "2023",
        end: "2024",
        current: false,
        summary: text(
          {
            en: "Sample promotion. Owned the marketing site and CMS after moving up from the junior role.",
            fr: "Promotion d'exemple. A pris en charge le site marketing et le CMS après le poste junior.",
          },
          locale,
        ),
        highlights: [
          text(
            {
              en: "Cut the homepage's largest image payload by serving sized assets instead of the original uploads.",
              fr: "A réduit le poids de la plus grande image de la page d'accueil en servant des fichiers à la bonne taille.",
            },
            locale,
          ),
        ],
        details: [],
        skills: ["React", "Sanity", "Web performance"],
        priorRoles: [
          {
            _key: "harbour-junior",
            role: text({ en: "Junior developer", fr: "Développeur junior" }, locale),
            start: "2022",
            end: "2023",
            current: false,
            summary: text(
              {
                en: "Sample role. Worked on a marketing site and the small CMS behind it, pairing with design on layout and publishing.",
                fr: "Rôle d'exemple. A travaillé sur un site marketing et le petit CMS derrière, avec le design, sur la mise en page et la publication.",
              },
              locale,
            ),
            highlights: [
              text(
                {
                  en: "Turned campaign pages into schemas so editors could publish without a developer.",
                  fr: "A transformé les pages de campagne en schémas, pour que les éditeurs publient sans développeur.",
                },
                locale,
              ),
            ],
            details: [],
          },
        ],
        sortOrder: 1,
      },
      {
        _id: "exp-lakeside",
        slug: "lakeside",
        role: text(
          { en: "Support engineer intern", fr: "Stagiaire en soutien technique" },
          locale,
        ),
        company: "Lakeside",
        start: "2021",
        end: "2022",
        current: false,
        summary: text(
          {
            en: "Sample internship. Triaged customer bugs and wrote the reproduction notes engineers used to fix them.",
            fr: "Stage d'exemple. A trié les bogues signalés par les clients et a écrit les notes de reproduction utilisées pour les corriger.",
          },
          locale,
        ),
        highlights: [
          text(
            {
              en: "Kept a public status note honest when a billing job failed overnight.",
              fr: "A gardé une note de statut publique honnête quand une tâche de facturation a échoué pendant la nuit.",
            },
            locale,
          ),
        ],
        details: [],
        skills: ["Technical support", "Bug triage", "Incident communication"],
        priorRoles: [],
        sortOrder: 2,
      },
    ],
    projects: [
      {
        _id: "project-warehouse",
        title: text({ en: "Warehouse metrics", fr: "Métriques d'entrepôt" }, locale),
        slug: "warehouse-metrics",
        summary: text(
          {
            en: "A sample case study. A small pipeline that explains yesterday's shipments without a hand-built spreadsheet.",
            fr: "Une étude de cas d'exemple. Un petit pipeline qui explique les expéditions de la veille sans tableur assemblé à la main.",
          },
          locale,
        ),
        body: paragraphs(
          "warehouse",
          [
            {
              en: "This is placeholder copy about a fictional project. The operations lead was comparing three spreadsheets that each defined 'on time' differently.",
              fr: "Ceci est un texte d'attente pour un projet fictif. La responsable des opérations comparait trois tableurs qui ne définissaient pas « à l'heure » de la même façon.",
            },
            {
              en: "The sample fix is a single SQL model with one definition of on-time, refreshed every morning, and a short page that shows the exceptions rather than every row.",
              fr: "Le correctif d'exemple est un seul modèle SQL, avec une définition de « à l'heure », rafraîchi chaque matin, et une page courte qui montre les exceptions plutôt que chaque ligne.",
            },
            {
              en: "Replace this story with a project you actually shipped. Write what was true before, what you changed, and how you knew it worked.",
              fr: "Remplacez cette histoire par un projet que vous avez vraiment livré. Écrivez ce qui était vrai avant, ce que vous avez changé, et comment vous avez su que cela fonctionnait.",
            },
          ],
          locale,
        ),
        stack: ["Python", "SQL", "DuckDB"],
        url: "https://example.com",
        repo: "https://example.com",
        featured: true,
        sortOrder: 0,
      },
      {
        _id: "project-cv",
        title: text({ en: "Editorial CV", fr: "CV éditorial" }, locale),
        slug: "editorial-cv",
        summary: text(
          {
            en: "A sample case study. A content-driven résumé: the page is Next.js, the words live in a CMS, and the site ships as one container.",
            fr: "Une étude de cas d'exemple. Un CV piloté par le contenu : la page est en Next.js, les mots vivent dans un CMS, et le site part dans un seul conteneur.",
          },
          locale,
        ),
        body: paragraphs(
          "cv",
          [
            {
              en: "This is placeholder copy. The public page is a server-rendered CV. Editors change the words in Sanity, and the site reads them back with a GROQ query.",
              fr: "Ceci est un texte d'attente. La page publique est un CV rendu par le serveur. On change les mots dans Sanity, et le site les relit avec une requête GROQ.",
            },
            {
              en: "The container you deploy does not include the database. Sanity hosts the documents. The image only needs the project id, and that id is baked in when the image is built.",
              fr: "Le conteneur que vous déployez ne contient pas la base de données. Sanity héberge les documents. L'image a seulement besoin de l'identifiant du projet, copié au moment de la construction.",
            },
            {
              en: "Swap this for your own notes once the site is yours: what you chose, what you left out, and how you would deploy it.",
              fr: "Remplacez ceci par vos propres notes quand le site sera le vôtre : ce que vous avez choisi, ce que vous avez laissé de côté, et comment vous le déploieriez.",
            },
          ],
          locale,
        ),
        stack: ["Next.js", "TypeScript", "Tailwind", "Sanity"],
        url: "https://example.com",
        featured: true,
        sortOrder: 1,
      },
      {
        _id: "project-orders",
        title: text({ en: "Order exceptions", fr: "Exceptions de commandes" }, locale),
        slug: "order-exceptions",
        summary: text(
          {
            en: "A sample case study. A quiet dashboard for the orders that need a person, instead of a wall of charts.",
            fr: "Une étude de cas d'exemple. Un tableau calme pour les commandes qui demandent une personne, plutôt qu'un mur de graphiques.",
          },
          locale,
        ),
        body: paragraphs(
          "orders",
          [
            {
              en: "This is placeholder copy. The fictional team did not need another chart of total orders. They needed the twelve orders stuck in a bad state.",
              fr: "Ceci est un texte d'attente. L'équipe fictive n'avait pas besoin d'un autre graphique du total des commandes. Elle avait besoin des douze commandes coincées dans un mauvais état.",
            },
            {
              en: "The sample page lists those exceptions, the reason each one is there, and a link back to the source record.",
              fr: "La page d'exemple liste ces exceptions, la raison de chacune, et un lien vers l'enregistrement source.",
            },
          ],
          locale,
        ),
        stack: ["TypeScript", "React", "SQL"],
        featured: true,
        sortOrder: 2,
      },
    ],
    education: [
      {
        _id: "edu-sample",
        school: text({ en: "Sample University", fr: "Université d'exemple" }, locale),
        credential: text(
          { en: "BSc Computer Science", fr: "B. Sc. en informatique" },
          locale,
        ),
        start: "2018",
        end: "2022",
        coursework: [
          text({ en: "Databases", fr: "Bases de données" }, locale),
          text({ en: "Algorithms", fr: "Algorithmes" }, locale),
        ],
        sortOrder: 0,
      },
    ],
    skillGroups: [
      {
        _id: "skills-languages",
        title: text({ en: "Languages", fr: "Langages" }, locale),
        skills: ["TypeScript", "Python", "SQL"],
        sortOrder: 0,
      },
      {
        _id: "skills-web",
        title: "Web",
        skills: ["Next.js", "React", "Tailwind", "Sanity"],
        sortOrder: 1,
      },
      {
        _id: "skills-data",
        title: text({ en: "Data", fr: "Données" }, locale),
        skills: ["DuckDB", "dbt", "Pandas"],
        sortOrder: 2,
      },
    ],
  };
}
