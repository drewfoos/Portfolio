// components/sections/Hero.tsx
'use client'
import { motion } from 'framer-motion';
import { axiforma } from '@/app/fonts';
import { type FC } from 'react';

const GradientGlow: FC = () => (
  <div className="w-[25vw] max-w-[300px] h-[25vw] max-h-[300px] rounded-full opacity-80">
    <div className="w-full h-full bg-gradient-to-br from-[#1919A7] to-[#D017B8] blur-[150px] mix-blend-screen" />
  </div>
);

export const Hero: FC = () => {
  const headlineWords = ['Discover,', 'Design,', 'Develop,', 'Stand out.'];
  
  return (
    <section className={`${axiforma.variable} min-h-screen bg-[#0B0B0B] relative overflow-hidden`}>
      {/* Mountain Background */}
      <div className="absolute inset-x-0 top-[60%] h-[60vh] -translate-y-[10%] pointer-events-none z-0 overflow-hidden">
        <div className="relative w-full left-0 top-0 h-full">
          <img
            src="/Bg.svg"
            alt="Mountain Background"
            className="absolute inset-0 w-full h-full object-cover opacity-100 mix-blend-normal"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="w-full max-w-[1200px] mx-auto relative"
        >
          {/* Gradient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-between items-center gap-x-[5vw] pointer-events-none z-0">
            <GradientGlow />
            <GradientGlow />
          </div>

          {/* Headline Text */}
          <h1 className="text-center font-axiforma font-medium uppercase">
            <div className="text-[clamp(4rem,15vw,12rem)] leading-[0.9] tracking-[-0.08em] relative">
              {headlineWords.map((word, index) => (
                <div key={index}>
                  <span className="text-white">{word}</span>
                </div>
              ))}
            </div>
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;