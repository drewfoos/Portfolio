import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { FigmaIcon, ArrowLeft, ArrowRight, Globe, FileText } from 'lucide-react';
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainerRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < maxScroll);

      const progress = (scrollLeft / maxScroll) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    checkScroll();
    scrollContainerRef.current?.addEventListener('scroll', checkScroll);

    return () => {
      scrollContainerRef.current?.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 800;
    const newScrollPosition =
      scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

    scrollContainerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };

  const ProjectLink = ({ href, icon: Icon, text }: { href: string; icon: any; text: string }) => (
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
    <section className="relative overflow-hidden pt-8 md:pt-20 pb-8 md:pb-20">
      <div className="px-4 mb-6 md:mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center md:text-left md:hidden">
          Featured Projects
        </h2>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 touch-pan-x"
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
            className="flex-none w-[calc(100vw-32px)] md:w-[600px] lg:w-[800px] snap-center"
          >
            <Card className="group overflow-hidden bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 flex-wrap p-4">
                  {project.liveUrl && (
                    <ProjectLink href={project.liveUrl} icon={Globe} text="View Live Site" />
                  )}
                  {project.figmaUrl && (
                    <ProjectLink href={project.figmaUrl} icon={FigmaIcon} text="View in Figma" />
                  )}
                  {project.paperUrl && (
                    <ProjectLink href={project.paperUrl} icon={FileText} text="Read Paper" />
                  )}
                </div>
              </div>
              <div className="p-4 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-2 md:mt-3 text-gray-400 text-base md:text-lg">{project.description}</p>
                <div className="mt-4 md:mt-6 flex gap-2 md:gap-3 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 md:px-4 py-1 md:py-1.5 bg-gradient-to-r from-[#1919A7] to-[#D017B8] bg-opacity-10 text-white text-xs md:text-sm rounded-full"
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

      {/* Progress bar - Visible only on mobile */}
      <div className="mt-4 px-4 md:hidden">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1919A7] to-[#D017B8] transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Navigation buttons - Hidden on mobile, visible on tablets and up */}
      <div className="hidden md:flex justify-center gap-4 mt-8">
        <Button
          variant="ghost"
          onClick={() => scroll('left')}
          className="text-white hover:bg-white/10"
          disabled={!canScrollLeft}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Previous
        </Button>
        <Button
          variant="ghost"
          onClick={() => scroll('right')}
          className="text-white hover:bg-white/10"
          disabled={!canScrollRight}
        >
          Next
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </section>
  );
}