// Types for experience data
export interface Experience {
    title: string;
    year: string;
    institution: string;
    location?: string;
    description?: string;
    skills?: string[];
    link?: string;
  }
  
  // Experience data
  export const experiences: Experience[] = [
    {
      title: "Master's in Interactive Media",
      year: "2024",
      institution: "Elon University",
      location: "North Carolina, USA",
      description: "Master of Arts in Interactive Media, specializing in digital communication, interactive design, and web development.",
      skills: ["UI/UX Design", "Digital Media", "Interactive Design", "Web Development", "React", "Next.js"],
      link: "https://www.elon.edu/u/academics/communications/interactive-media/"
    },
    {
      title: "Website Development",
      year: "2024",
      institution: "Lifelong Skills Inc.",
      location: "Barbados",
      description: "Developed and launched the official website for Lifelong Skills Inc., a Barbadian educational institution.",
      skills: ["Web Development", "React", "Next.js", "UI/UX Design", "Content Management"],
      link: "https://llskillstraining.org/"
    },
    {
      title: "BS CS",
      year: "2023",
      institution: "Elon University",
      location: "North Carolina, USA",
      description: "Bachelor of Science in Computer Science with focus on software development and algorithms.",
      skills: ["Software Development", "Algorithms", "Data Structures", "System Design"],
      link: "https://www.elon.edu/u/academics/arts-and-sciences/computing-sciences/"
    },
    {
      title: "Internee",
      year: "2022",
      institution: "The New York Times",
      location: "New York, USA",
      description: "Software Engineering internship focusing on web development and digital publishing systems.",
      skills: ["Web Development", "React", "TypeScript", "Digital Publishing"],
      link: "https://www.nytimes.com/"
    }
  ];
  
  // Optional: Helper functions for experience data
  export const getLatestExperience = (): Experience => experiences[0];
  
  export const getExperienceByYear = (year: string): Experience | undefined => 
    experiences.find(exp => exp.year === year);
  
  export const getExperiencesByInstitution = (institution: string): Experience[] =>
    experiences.filter(exp => exp.institution === institution);
  
  export const getExperiencesByLocation = (location: string): Experience[] =>
    experiences.filter(exp => exp.location === location);