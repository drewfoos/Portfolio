// data/projects.ts
import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 1,
    title: "EldenSmash",
    description: "A full-stack swipe-voting app for 450+ Elden Ring characters that went viral on Reddit, reaching 70,000+ interactions in 4 days while staying up on serverless infrastructure. Features a resilient vote API with idempotency keys, per-user/IP rate limiting, request deduplication, anonymous-to-authenticated vote syncing via signed session cookies, real-time leaderboards, and server-rendered shareable profiles with dynamic OG image generation.",
    imageUrl: "/projects/eldensmash.png",
    category: "Web Development",
    tags: ["Next.js", "Serverless", "Full-Stack"],
    liveUrl: "https://eldensmash.com"
  },
  {
    id: 2,
    title: "CoffeeJG Course Platform",
    description: "A full-stack SaaS education platform for a content creator with Stripe-integrated payments (subscriptions + one-time), webhook-driven enrollment, and an admin CMS with a Plate.js rich text editor. Hardened with Turnstile bot protection, server-side session cookies with revocation checks, webhook signature verification, idempotent enrollment, and server-only video URL resolution. Includes a resource hub with 176+ curated assets, full-text search, tag/source filters, and a favorites system with optimistic UI.",
    imageUrl: "/projects/coffeejg.png",
    category: "Web Development",
    tags: ["SaaS", "Stripe", "Next.js"],
    liveUrl: "https://coffeejg-course.vercel.app"
  },
  {
    id: 3,
    title: "Elon Esports SSBU Power Rankings",
    description: "A tournament tracker for Elon University's esports club, replacing spreadsheets with a SQL-backed system managing 1,000+ records across players, tournaments, and head-to-head sets. Features a weighted scoring algorithm that normalizes placements across tournament sizes, atomic merge/unmerge via Postgres RPC functions with advisory locks, and start.gg GraphQL API integration for automated tournament imports with deferred set processing—cutting response times from 15s to 2s.",
    imageUrl: "/projects/elonsmash.png",
    category: "Web Development",
    tags: ["PostgreSQL", "GraphQL", "Analytics"],
    liveUrl: "https://elon-smash-pr.vercel.app"
  },
  {
    id: 4,
    title: "AI Smart Mirror — Graduate Capstone",
    description: "An interactive installation built with a Raspberry Pi, camera, and one-way glass that captures a user's image, generates an AI portrait via the OpenAI API, and displays it as a reflection—designed as social commentary on bias in AI image generation. Featured at Elon University's Interactive Media Capstone Exhibition as a self-contained physical installation integrating hardware and software.",
    imageUrl: "/projects/mirror.png",
    category: "Hardware",
    tags: ["OpenAI API", "Raspberry Pi", "HCI"],
    paperUrl: "https://docs.google.com/document/d/1ja2UUgoGRKy37HRMvP2gG2jyHdiW57yv-9zDBrCXY8I/edit?usp=sharing"
  },
  {
    id: 5,
    title: "Prescription Helper",
    description: "A modern, user-centric design crafted to streamline medication tracking and interaction management, leveraging intuitive analytics and sleek visuals for an enhanced user experience.",
    imageUrl: "/projects/mockuuups-free-iphone-15-pro-hand-mockup-min.png",
    category: "Web Design",
    tags: ["HCI", "Dashboard", "Analytics"],
    figmaUrl: "https://www.figma.com/proto/4RuYK2Yp3pYHHTyqt6gHZE/prescrip?node-id=15-92&node-type=frame&t=pkuOJR6W1YYNO883-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=15%3A92&share=1"
  },
  {
    id: 6,
    title: "League of Legends Interface Testing",
    description: "A comprehensive usability study examining the League of Legends client interface. The research includes user testing sessions, heuristic evaluation, and concrete recommendations for improving player experience.",
    imageUrl: "/projects/league redesign.png",
    category: "User Research",
    tags: ["UX Research", "Gaming", "Usability Study"],
    paperUrl: "https://docs.google.com/document/d/1TTuPEVJqnhIaaSVB-AH0C0qml_GvalzQr-MVQmcB6co/edit?usp=sharing"
  },
  {
    id: 7,
    title: "This Portfolio",
    description: "This portfolio showcases my projects, including the source code and Figma design. It highlights my design and development skills, combining intuitive visuals with functional coding.",
    imageUrl: "/projects/portfolio mockup.jpeg",
    category: "Web Design",
    tags: ["Portfolio", "Web Development", "Figma"],
    figmaUrl: "https://www.figma.com/proto/ADhCcsvFvRKjnFBau1MTbX/Andrew-portfolio?node-id=7-6104&t=4Jo11UcLXNWwM2BZ-1",
    codeUrl: "https://github.com/drewfoos/Portfolio"
  },
  {
    id: 8,
    title: "Lifelong Skills Training Inc",
    description: "A family-centered organization that empowers youth with disabilities and their families through creative, developmental, life, and vocational skills programs. Lifelong fosters inclusion and advocacy for a brighter future.",
    imageUrl: "/projects/llskills.png",
    category: "Non-Profit",
    tags: ["Inclusion", "Advocacy", "Education"],
    liveUrl: "https://llskillstraining.org",
    figmaUrl: "https://www.figma.com/design/gOx6RuAv9mQ7oRgCRuFdfS/Lifelong-Skill-Wireframes-V2?node-id=0-1&t=9qwyV9wEU0jvYez5-1"
  }
]
