// app/page.tsx
'use client'
import { motion } from 'framer-motion'
import Hero from '@/components/sections/hero'
import Projects from '@/components/sections/projects'
import About from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { projects } from '@/data/projects'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0B0B0B] relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Hero />
        <About />
        <Projects projects={projects} />
        <Contact />
      </motion.div>
    </motion.main>
  );
}