'use client'
import { Suspense, lazy } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import dynamic from 'next/dynamic'
import Hero from '@/components/sections/hero'
import { projects } from '@/data/projects'

// Lazy load components
const Projects = lazy(() => import('@/components/sections/projects'))
const About = lazy(() => import('@/components/sections/about'))
const Contact = lazy(() => import('@/components/sections/contact').then(mod => ({ default: mod.Contact })))
const ExperienceHistory = lazy(() => import('@/components/sections/experienceHistory'))
const Skills = lazy(() => import('@/components/sections/skills'))

// Create a client-only motion wrapper
const ClientMotionDiv = dynamic(
  () => Promise.resolve(m.div),
  { ssr: false }
)

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <ClientMotionDiv
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#0B0B0B] relative overflow-hidden"
      >
        <ClientMotionDiv
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <section id="home" className="scroll-mt-20">
            <Hero />
          </section>
       
          <Suspense fallback={<div className="min-h-screen" />}>
            <section id="about" className="scroll-mt-20">
              <About />
            </section>
          </Suspense>
       
          <Suspense fallback={<div className="min-h-screen" />}>
            <section id="projects" className="scroll-mt-20">
              <Projects projects={projects} />
            </section>
          </Suspense>
       
          <Suspense fallback={<div className="min-h-screen" />}>
            <section id="experience" className="scroll-mt-20">
              <ExperienceHistory />
            </section>
          </Suspense>
       
          <Suspense fallback={<div className="min-h-screen" />}>
            <section id="skills" className="scroll-mt-20">
              <Skills />
            </section>
          </Suspense>
       
          <Suspense fallback={<div className="min-h-screen" />}>
            <section id="contact" className="scroll-mt-20">
              <Contact />
            </section>
          </Suspense>
        </ClientMotionDiv>
      </ClientMotionDiv>
    </LazyMotion>
  );
}