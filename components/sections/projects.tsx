'use client';

import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  FigmaIcon,
  ArrowLeft,
  ArrowRight,
  Globe,
  FileText,
  Github,
  ChevronLeft,
  ChevronRight,
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
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [lastTouchX, setLastTouchX] = useState(0);
  const [maxCardHeight, setMaxCardHeight] = useState<number | null>(null);

  useEffect(() => {
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

    // Hide swipe hint after 3 seconds
    const timer = setTimeout(() => setShowSwipeHint(false), 3000);

    return () => {
      scrollElement.removeEventListener('scroll', checkScroll);
      clearTimeout(timer);
    };
  }, []);

  const calculateMaxHeight = () => {
    if (scrollContainerRef.current) {
      const cardElements = scrollContainerRef.current.querySelectorAll('.project-card');
      const heights = Array.from(cardElements).map((card) =>
        (card as HTMLElement).getBoundingClientRect().height
      );
      if (heights.length > 0) {
        const tallest = Math.max(...heights);
        setMaxCardHeight(tallest);
      }
    }
  };

  useLayoutEffect(() => {
    // Initial height calculation
    calculateMaxHeight();
    const handleResize = () => {
      calculateMaxHeight();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [projects]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setLastTouchX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchX - touchStartX;
    const deltaY = touchY - touchStartY;

    // Check if horizontal scrolling is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      const movementX = touchX - lastTouchX;
      scrollContainerRef.current.scrollLeft -= movementX;
    }

    setLastTouchX(touchX);
  };

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
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="px-4 mb-6 md:mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center md:text-left md:hidden">
          Featured Projects
        </h2>
      </div>

      <AnimatePresence>
        {showSwipeHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
          >
            <div className="flex justify-between px-4">
              <motion.div
                animate={{ x: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-full p-2"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-full p-2"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={scrollContainerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="touch-pan-y flex gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4"
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
            className="flex-none w-[calc(100vw-32px)] md:w-[450px] xl:w-[500px] snap-center"
          >
            <Card
              className="project-card bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
              style={{
                height: maxCardHeight ? `${maxCardHeight}px` : 'auto',
              }}
            >
              {/* Image stays at the top, fixed aspect ratio */}
              <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 flex-wrap p-4">
                  {project.liveUrl && <ProjectLink href={project.liveUrl} icon={Globe} text="View Live Site" />}
                  {project.figmaUrl && <ProjectLink href={project.figmaUrl} icon={FigmaIcon} text="View in Figma" />}
                  {project.paperUrl && <ProjectLink href={project.paperUrl} icon={FileText} text="Read Paper" />}
                  {project.codeUrl && <ProjectLink href={project.codeUrl} icon={Github} text="View on GitHub" />}
                </div>
              </div>

              {/* Content section arranged in a column, justify-between for spacing */}
              <div className="p-4 md:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-gray-400 text-base">
                    {project.description}
                  </p>
                </div>

                {/* Add mt-4 to create vertical space between description and tags */}
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

      <div className="hidden md:flex justify-center gap-6 mt-6">
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
    </section>
  );
}
