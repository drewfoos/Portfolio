// components/layout/Footer.tsx
'use client';
import { MailIcon, MapPinIcon } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "About me", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Tech stack", href: "#tech" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" }
];

export const Footer = () => {
  return (
    <footer className="w-full bg-[#0B0B0B]">
      <Separator className="opacity-10" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-between gap-x-8 gap-y-4 mb-8">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="link"
              className="text-white font-semibold tracking-wider uppercase hover:text-purple-400 transition-colors"
              asChild
            >
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-white">
          <a
            href="mailto:dryfoos@gmail.com"
            className="flex items-center gap-3 hover:text-purple-400 transition-colors"
          >
            <MailIcon className="w-5 h-5" />
            <span className="text-sm sm:text-base">dryfoosa@gmail.com</span>
          </a>

          <div className="hidden sm:block text-white/20">|</div>

          <div className="flex items-center gap-3">
            <MapPinIcon className="w-5 h-5" />
            <span className="text-sm sm:text-base">United States, NC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;