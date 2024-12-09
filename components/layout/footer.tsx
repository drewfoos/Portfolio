'use client';
import { MailIcon, MapPinIcon } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "About me", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Technical Skills", href: "#skills" },
  { label: "Contact Me", href: "#contact" }
];

export const Footer = () => {
  const email = "dryfoosa@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success('Email copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy email');
    }
  };
 
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 hover:text-purple-400 transition-colors group"
              >
                <MailIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="text-sm sm:text-base">{email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-52 bg-[#0B0B0B] border-purple-600"
              align="center"
            >
              <DropdownMenuItem
                onClick={() => window.open(`mailto:${email}`)}
                className="text-white hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white cursor-pointer"
              >
                Open in Email Client
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`)}
                className="text-white hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white cursor-pointer"
              >
                Open in Gmail
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleCopyEmail}
                className="text-white hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white cursor-pointer"
              >
                Copy Email Address
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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