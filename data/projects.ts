// data/projects.ts
import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 1,
    title: "Prescription Helper",
    description: "A modern, user-centric design crafted to streamline medication tracking and interaction management, leveraging intuitive analytics and sleek visuals for an enhanced user experience.",
    imageUrl: "/projects/mockuuups-free-iphone-15-pro-hand-mockup-min.png",
    category: "Web Design",
    tags: ["HCI", "Dashboard", "Analytics"],
    figmaUrl: "https://www.figma.com/proto/4RuYK2Yp3pYHHTyqt6gHZE/prescrip?node-id=15-92&node-type=frame&t=pkuOJR6W1YYNO883-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=15%3A92&share=1"
  },
  {
    id: 2,
    title: "League of Legends Interface Testing",
    description: "A comprehensive usability study examining the League of Legends client interface. The research includes user testing sessions, heuristic evaluation, and concrete recommendations for improving player experience.",
    imageUrl: "/projects/league redesign.png",
    category: "User Research",
    tags: ["UX Research", "Gaming", "Usability Study"],
    paperUrl: "https://docs.google.com/document/d/1TTuPEVJqnhIaaSVB-AH0C0qml_GvalzQr-MVQmcB6co/edit?usp=sharing"
  },
  {
    id: 3,
    title: "Reflections of the Digital Self",
    description: "An interactive smart mirror designed to explore AI's interpretations of human diversity, reflecting on biases in AI-generated perceptions. This project highlights the intersection of human-computer interaction and societal considerations in AI.",
    imageUrl: "/projects/mirror.png",
    category: "Hardware",
    tags: ["AI", "HCI", "Hardware"],
    paperUrl: "https://docs.google.com/document/d/1ja2UUgoGRKy37HRMvP2gG2jyHdiW57yv-9zDBrCXY8I/edit?usp=sharing"
  },
  {
    id: 4,
    title: "GoalQuest",
    description: "A platform for setting and tracking goals that helps users define clear objectives, monitor their progress, and celebrate achievements. GoalQuest makes achieving goals simple and motivating through an intuitive interface.",
    imageUrl: "/projects/goalquest mockup.png",
    category: "Productivity",
    tags: ["Next.js", "Productivity", "Goal Setting"],
    liveUrl: "https://goalquest.vercel.app/",
    codeUrl: "https://github.com/drewfoos/GoalQuest"
  },
  {
    id: 5,
    title: "This Portfolio",
    description: "This portfolio showcases my projects, including the source code and Figma design. It highlights my design and development skills, combining intuitive visuals with functional coding.",
    imageUrl: "/projects/portfolio mockup.jpeg",
    category: "Web Design",
    tags: ["Portfolio", "Web Development", "Figma"],
    figmaUrl: "https://www.figma.com/proto/ADhCcsvFvRKjnFBau1MTbX/Andrew-portfolio?node-id=7-6104&t=4Jo11UcLXNWwM2BZ-1",
    codeUrl: "https://github.com/drewfoos/Portfolio"
  },    
  {
    id: 6,
    title: "RiftRadar Game Analytics",
    description: "A real-time analytics platform providing game statistics and performance insights for League of Legends players. RiftRadar helps players refine strategies, track progression, and understand gameplay dynamics through intuitive visualizations.",
    imageUrl: "/projects/riftradar mockup.jpeg",
    category: "Gaming",
    tags: ["Gaming", "Analytics", "HCI"],
    liveUrl: "https://www.youtube.com/watch?v=9upWENE6zN4"
  },
  {
    id: 7,
    title: "Lifelong Skills Training Inc",
    description: "A family-centered organization that empowers youth with disabilities and their families through creative, developmental, life, and vocational skills programs. Lifelong fosters inclusion and advocacy for a brighter future.",
    imageUrl: "/projects/llskills.png",
    category: "Non-Profit",
    tags: ["Inclusion", "Advocacy", "Education"],
    liveUrl: "https://llskillstraining.org",
    figmaUrl: "https://www.figma.com/design/gOx6RuAv9mQ7oRgCRuFdfS/Lifelong-Skill-Wireframes-V2?node-id=0-1&t=9qwyV9wEU0jvYez5-1"
  }
] 