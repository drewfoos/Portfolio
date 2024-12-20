'use client';
import { axiforma } from '@/app/fonts';
import { experiences } from '@/data/experience';
import { type FC } from 'react';

const GradientGlow: FC = () => (
  <div
    className="absolute -right-[150px] top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-80"
    aria-hidden="true"
  >
    <div className="w-full h-full bg-gradient-to-br from-[#1919A7] to-[#D017B8] blur-[150px] mix-blend-screen" />
  </div>
);

export const ExperienceHistory = () => {
  return (
    <section className={`${axiforma.variable} relative w-full bg-[#0B0B0B] py-12 md:py-16 lg:py-20 px-4 lg:px-0 overflow-hidden`}>
      {/* Right Corner Gradient */}
      <GradientGlow />

      <div className="relative mx-auto max-w-4xl z-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">
          Experience history
        </h2>
        <div className="flex flex-col gap-6 md:gap-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative w-full">
              <div className="flex flex-col md:flex-row items-start justify-between border-b border-white/[0.07] pb-6">
                <div className="flex gap-4 md:gap-8 items-baseline">
                  <span className="text-lg md:text-xl lg:text-2xl font-poppins font-normal leading-[30px] tracking-[-0.05em] text-[#FAFAFA] min-w-[50px]">
                    {exp.year}
                  </span>
                  <h3 className="text-2xl md:text-4xl lg:text-[60px] font-axiforma font-light leading-tight lg:leading-[70px] tracking-[-0.04em] bg-gradient-to-b from-[#FAFAFA] to-[rgba(250,250,250,0.59)] bg-clip-text text-transparent">
                    {exp.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 mt-3 md:mt-0 ml-[54px] md:ml-0">
                  <div className="h-px w-4 bg-[#FAFAFA] hidden md:block" />
                  <span className="text-sm md:text-base lg:text-lg font-poppins font-normal leading-[24px] tracking-[-0.03em] text-[#FAFAFA] whitespace-nowrap">
                    {exp.institution}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceHistory;