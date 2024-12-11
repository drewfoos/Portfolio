'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { axiforma } from '@/app/fonts';
import { FileText } from 'lucide-react';

export const About = () => {
  const educationRef = useRef(null);
  const isInView = useInView(educationRef, { once: true, amount: 0.3 });
  
  return (
    <section className={`${axiforma.variable} bg-[#0B0B0B] relative py-12 md:py-16 lg:py-20 px-4 lg:px-0`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-8 md:space-y-10"
        >
          <div>
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I&apos;m Andrew Dryfoos
            </motion.h2>
           
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I&apos;m a developer passionate about crafting meaningful user experiences. With a focus on human-computer interaction, I combine my love for gaming with designing better experiences for users.
            </motion.p>
          </div>

          <motion.div
            ref={educationRef}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              Education
            </h3>
            <div className="space-y-3">
              <div className="border-l-2 border-white/20 pl-4">
                <h4 className="text-xl font-medium">Master&apos;s in Interactive Media</h4>
                <p className="text-gray-400">Elon University, 2024</p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-[1px] bg-white/10 mt-2"
                />
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <h4 className="text-xl font-medium">Bachelor&apos;s in Computer Science</h4>
                <p className="text-gray-400">Elon University, 2023</p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                  className="h-[1px] bg-white/10 mt-2"
                />
              </div>
            </div>
          </motion.div>

          {/* Resume Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <a
              href="https://drive.google.com/file/d/1H40PsuykQw-xm_7eJ5-fkkuIsHMF6pop/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white font-medium bg-white/10 px-8 py-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all group"
            >
              <FileText className="w-6 h-6 transition-transform group-hover:scale-110" />
              <span className="text-lg">View Resume</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;