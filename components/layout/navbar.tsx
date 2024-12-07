'use client'
import { useState } from 'react';
import { Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="absolute top-0 right-0 z-30 p-6 md:p-8">
      {/* Desktop NavigationMenu */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-8 text-lg">
            <NavigationMenuItem>
              <NavigationMenuLink href="#about" className="text-white hover:text-[#D017B8] transition-colors">
                About Me
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#projects" className="text-white hover:text-[#D017B8] transition-colors">
                Projects
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#tech-stack" className="text-white hover:text-[#D017B8] transition-colors">
                Tech Stack
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#skills" className="text-white hover:text-[#D017B8] transition-colors">
                Skills
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#experience" className="text-white hover:text-[#D017B8] transition-colors">
                Experience
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="text-white p-2"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="absolute top-full right-0 w-screen bg-[#0B0B0B]/95 backdrop-blur-sm p-6 text-white md:hidden">
          <div className="flex flex-col space-y-4">
            <a href="#about" onClick={toggleMenu} className="hover:text-[#D017B8] transition-colors py-2">
              About Me
            </a>
            <a href="#projects" onClick={toggleMenu} className="hover:text-[#D017B8] transition-colors py-2">
              Projects
            </a>
            <a href="#tech-stack" onClick={toggleMenu} className="hover:text-[#D017B8] transition-colors py-2">
              Tech Stack
            </a>
            <a href="#skills" onClick={toggleMenu} className="hover:text-[#D017B8] transition-colors py-2">
              Skills
            </a>
            <a href="#experience" onClick={toggleMenu} className="hover:text-[#D017B8] transition-colors py-2">
              Experience
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}