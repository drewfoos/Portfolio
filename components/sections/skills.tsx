'use client';
import { axiforma } from '@/app/fonts';
import { IconType } from 'react-icons';
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
  SiAmazon
} from 'react-icons/si';

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
    Icon: SiAmazon,
    name: "AWS",
    description: "Cloud services",
    color: "#FF9900"
  }
];

export const Skills = () => {
    return (
      <section className={`${axiforma.variable} relative w-full bg-[#0B0B0B] py-12 md:py-16 lg:py-20 px-4 lg:px-0`}>
        <div className="relative mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[42px] font-light leading-normal lg:leading-[52px] font-poppins tracking-[-0.05em] text-[#FAFAFA] mb-8 md:mb-12">
            Technical skills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="group relative flex flex-col items-center"
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center bg-[#101010] rounded-lg sm:rounded-xl transition-all duration-300 group-hover:scale-95">
                  <skill.Icon
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-all duration-300"
                    style={{ color: skill.color }}
                  />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 w-max z-10">
                  <div className="bg-[#1A1A1A] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-xl">
                    <p className="text-white font-medium text-xs sm:text-sm whitespace-nowrap">{skill.name}</p>
                    <p className="text-white/60 text-[10px] sm:text-xs whitespace-nowrap">{skill.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default Skills;