// components/sections/About.tsx
'use client';
import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { axiforma } from '@/app/fonts';

interface WordReveal {
  original: string;
  reveal: string;
}

const revealWords: WordReveal[] = [
  { original: 'create', reveal: 'design' },
  { original: 'build', reveal: 'craft' },
  { original: 'games', reveal: 'League' },
  { original: 'users', reveal: 'people' }
];

export const About = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const educationRef = useRef(null);
  const isInView = useInView(educationRef, { once: true, amount: 0.3 });

  return (
    <section className={`${axiforma.variable} bg-[#0B0B0B] relative pt-20 px-4 overflow-hidden`}>
      {/* Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-12"
        >
          <div className="cursor-expand">
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm Andrew Dryfoos
            </motion.h2>
            
            <motion.p 
              className="text-2xl md:text-3xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I'm a developer who loves to{' '}
              <span
                className="relative inline-block whitespace-nowrap cursor-expand"
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className={`transition-opacity duration-300 ${hoveredIndex === 0 ? 'opacity-0' : 'opacity-100'}`}>
                  {revealWords[0].original}
                </span>
                <span className={`absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-[#1919A7] to-[#D017B8] transition-opacity duration-300 ${hoveredIndex === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  {revealWords[0].reveal}
                </span>
              </span>{' '}
              and{' '}
              <span
                className="relative inline-block whitespace-nowrap cursor-expand"
                onMouseEnter={() => setHoveredIndex(1)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className={`transition-opacity duration-300 ${hoveredIndex === 1 ? 'opacity-0' : 'opacity-100'}`}>
                  {revealWords[1].original}
                </span>
                <span className={`absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-[#1919A7] to-[#D017B8] transition-opacity duration-300 ${hoveredIndex === 1 ? 'opacity-100' : 'opacity-0'}`}>
                  {revealWords[1].reveal}
                </span>
              </span>{' '}
              meaningful user experiences. I focus on human computer interaction and love to play{' '}
              <span
                className="relative inline-block whitespace-nowrap cursor-expand"
                onMouseEnter={() => setHoveredIndex(2)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className={`transition-opacity duration-300 ${hoveredIndex === 2 ? 'opacity-0' : 'opacity-100'}`}>
                  {revealWords[2].original}
                </span>
                <span className={`absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-[#1919A7] to-[#D017B8] transition-opacity duration-300 ${hoveredIndex === 2 ? 'opacity-100' : 'opacity-0'}`}>
                  {revealWords[2].reveal}
                </span>
              </span>. 
              I create better experiences for{' '}
              <span
                className="relative inline-block whitespace-nowrap cursor-expand"
                onMouseEnter={() => setHoveredIndex(3)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className={`transition-opacity duration-300 ${hoveredIndex === 3 ? 'opacity-0' : 'opacity-100'}`}>
                  {revealWords[3].original}
                </span>
                <span className={`absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-[#1919A7] to-[#D017B8] transition-opacity duration-300 ${hoveredIndex === 3 ? 'opacity-100' : 'opacity-0'}`}>
                  {revealWords[3].reveal}
                </span>
              </span>.
            </motion.p>
          </div>

          <motion.div 
            ref={educationRef}
            className="space-y-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              Education
            </h3>
            <div className="space-y-3">
              <div className="border-l-2 border-white/20 pl-4">
                <h4 className="text-xl font-medium">Master's in Interactive Media</h4>
                <p className="text-gray-400">Elon University, 2024</p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-[1px] bg-white/10 mt-2"
                />
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <h4 className="text-xl font-medium">Bachelor's in Computer Science</h4>
                <p className="text-gray-400">Elon University, 2013</p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                  className="h-[1px] bg-white/10 mt-2"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;