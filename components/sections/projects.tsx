// components/Projects.tsx
'use client';

import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  FigmaIcon,
  ArrowLeft,
  ArrowRight,
  Globe,
  FileText,
  Github,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/project';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [maxCardHeight, setMaxCardHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (!scrollElement) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollElement;
      const maxScroll = scrollWidth - clientWidth;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < maxScroll);
    };

    checkScroll();
    scrollElement.addEventListener('scroll', checkScroll);

    return () => {
      scrollElement.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const calculateMaxHeight = () => {
    if (!scrollContainerRef.current) return;
    const cardElements = scrollContainerRef.current.querySelectorAll('.project-card');
    const heights = Array.from(cardElements).map((card) =>
      (card as HTMLElement).getBoundingClientRect().height
    );

    if (heights.length > 0) {
      const tallest = Math.max(...heights);
      setMaxCardHeight(tallest);
    }
  };

  useLayoutEffect(() => {
    // Initial calculation once projects are loaded
    calculateMaxHeight();
  }, [projects]);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    // Create a ResizeObserver to watch for layout changes inside the container
    const observer = new ResizeObserver(() => {
      // Step 1: Remove the fixed height to let elements resize naturally
      setMaxCardHeight(null);

      // Step 2: Wait one animation frame so the browser applies layout changes
      requestAnimationFrame(() => {
        calculateMaxHeight();
      });
    });

    observer.observe(scrollContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 500;
    const newScrollPosition =
      scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

    scrollContainerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };

  const ProjectLink = ({
    href,
    icon: Icon,
    text,
  }: {
    href: string;
    icon: typeof Github;
    text: string;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-white font-medium bg-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all"
    >
      <Icon className="w-4 h-4 md:w-5 md:h-5" />
      {text}
    </a>
  );

  return (
    <section className="relative overflow-hidden">
      {/* Mobile-only title */}
      <div className="px-4 mb-6 md:hidden">
        <h2 className="text-2xl font-bold text-white text-center">
          Featured Projects
        </h2>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col gap-6 px-4 md:hidden">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="project-card bg-black/20 backdrop-blur-sm border-white/5 shadow-lg flex flex-col overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4 flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-gray-400 text-base">
                    {project.description}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-r from-[#1919A7] to-[#D017B8] bg-opacity-10 text-white text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.liveUrl && <ProjectLink href={project.liveUrl} icon={Globe} text="View Live Site" />}
                  {project.figmaUrl && <ProjectLink href={project.figmaUrl} icon={FigmaIcon} text="View in Figma" />}
                  {project.paperUrl && <ProjectLink href={project.paperUrl} icon={FileText} text="Read Paper" />}
                  {project.codeUrl && <ProjectLink href={project.codeUrl} icon={Github} text="View on GitHub" />}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar px-4"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-none w-[450px] xl:w-[500px]"
            >
              <Card
                className="project-card group bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
                style={{
                  height: maxCardHeight ? `${maxCardHeight}px` : 'auto',
                }}
              >
                <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 flex-wrap p-4">
                    {project.liveUrl && <ProjectLink href={project.liveUrl} icon={Globe} text="View Live Site" />}
                    {project.figmaUrl && <ProjectLink href={project.figmaUrl} icon={FigmaIcon} text="View in Figma" />}
                    {project.paperUrl && <ProjectLink href={project.paperUrl} icon={FileText} text="Read Paper" />}
                    {project.codeUrl && <ProjectLink href={project.codeUrl} icon={Github} text="View on GitHub" />}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-2 text-gray-400 text-base">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex gap-2 flex-wrap mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-[#1919A7] to-[#D017B8] bg-opacity-10 text-white text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <Button
            variant="ghost"
            onClick={() => scroll('left')}
            className="text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
            disabled={!canScrollLeft}
          >
            <ArrowLeft className="h-6 w-6 mr-3" />
            Previous
          </Button>
          <Button
            variant="ghost"
            onClick={() => scroll('right')}
            className="text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
            disabled={!canScrollRight}
          >
            Next
            <ArrowRight className="h-6 w-6 ml-3" />
          </Button>
        </div>
      </div>
    </section>
  );
}
