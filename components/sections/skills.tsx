'use client';
import { axiforma } from '@/app/fonts';
import { IconType } from 'react-icons';
import { type FC } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiFigma,
  SiPrisma
} from 'react-icons/si';

const GradientGlow: FC = () => (
  <div
    className="absolute -left-[150px] top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-80"
    aria-hidden="true"
  >
    <div className="w-full h-full bg-gradient-to-br from-[#1919A7] to-[#D017B8] blur-[150px] mix-blend-screen" />
  </div>
);

interface Skill {
  Icon: IconType;
  name: string;
  description: string;
  color: string;
}

const skills: Skill[] = [
  {
    Icon: SiReact,
    name: "React",
    description: "Building interactive UIs",
    color: "#61DAFB"
  },
  {
    Icon: SiNextdotjs,
    name: "Next.js",
    description: "Full-stack React framework",
    color: "#FFFFFF"
  },
  {
    Icon: SiTypescript,
    name: "TypeScript",
    description: "Type-safe JavaScript",
    color: "#3178C6"
  },
  {
    Icon: SiTailwindcss,
    name: "Tailwind",
    description: "Utility-first CSS",
    color: "#38B2AC"
  },
  {
    Icon: SiFramer,
    name: "Framer Motion",
    description: "Animation library",
    color: "#FF5733"
  },
  {
    Icon: SiNodedotjs,
    name: "Node.js",
    description: "JavaScript runtime",
    color: "#339933"
  },
  {
    Icon: SiPython,
    name: "Python",
    description: "General-purpose programming",
    color: "#3776AB"
  },
  {
    Icon: SiMongodb,
    name: "MongoDB",
    description: "NoSQL Database",
    color: "#47A248"
  },
  {
    Icon: SiPostgresql,
    name: "PostgreSQL",
    description: "Relational database",
    color: "#336791"
  },
  {
    Icon: SiGit,
    name: "Git",
    description: "Version control",
    color: "#F05032"
  },
  {
    Icon: SiFigma,
    name: "Figma",
    description: "Design & prototyping",
    color: "#F24E1E"
  },
  {
    Icon: SiPrisma,
    name: "Prisma",
    description: "Modern database toolkit",
    color: "#0C344B",
  }
];

export const Skills: FC = () => {
  return (
    <section className={`${axiforma.variable} relative w-full bg-[#0B0B0B] py-12 md:py-16 lg:py-20 px-4 lg:px-0 overflow-hidden`}>
      {/* Left Corner Gradient */}
      <GradientGlow />

      <div className="relative mx-auto max-w-4xl z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-light leading-[1.1] lg:leading-[80px] font-axiforma tracking-[-0.04em] bg-gradient-to-b from-[#FAFAFA] to-[rgba(250,250,250,0.71)] bg-clip-text text-transparent mb-12 md:mb-16">
          Technical skills
        </h2>
       
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group relative flex flex-col items-center"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center bg-[#101010] rounded-xl transition-all duration-300 group-hover:scale-95">
                <skill.Icon
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-300"
                  style={{ color: skill.color }}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-white font-medium text-lg">{skill.name}</p>
                <p className="text-white/60 text-sm mt-1">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;