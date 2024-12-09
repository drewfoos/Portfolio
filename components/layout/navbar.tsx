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
     <div className="hidden lg:block">
       <NavigationMenu>
         <NavigationMenuList className="flex items-center space-x-8 text-lg">
           <NavigationMenuItem>
             <NavigationMenuLink 
               href="#about" 
               className="text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all hover:text-purple-400 hover:after:w-full"
             >
               About Me
             </NavigationMenuLink>
           </NavigationMenuItem>
           <NavigationMenuItem>
             <NavigationMenuLink 
               href="#projects" 
               className="text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all hover:text-purple-400 hover:after:w-full"
             >
               Projects
             </NavigationMenuLink>
           </NavigationMenuItem>
           <NavigationMenuItem>
             <NavigationMenuLink 
               href="#experience" 
               className="text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all hover:text-purple-400 hover:after:w-full"
             >
               Experience
             </NavigationMenuLink>
           </NavigationMenuItem>
           <NavigationMenuItem>
             <NavigationMenuLink 
               href="#skills" 
               className="text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all hover:text-purple-400 hover:after:w-full"
             >
               Technical Skills
             </NavigationMenuLink>
           </NavigationMenuItem>
           <NavigationMenuItem>
             <NavigationMenuLink 
               href="#contact" 
               className="text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all hover:text-purple-400 hover:after:w-full"
             >
               Contact Me
             </NavigationMenuLink>
           </NavigationMenuItem>
         </NavigationMenuList>
       </NavigationMenu>
     </div>

     {/* Mobile Hamburger Menu */}
     <div className="lg:hidden">
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
       <div className="absolute top-full right-0 w-screen bg-[#0B0B0B]/95 backdrop-blur-sm p-6 text-white lg:hidden">
         <div className="flex flex-col space-y-4">
           <a 
             href="#about" 
             onClick={toggleMenu} 
             className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all hover:text-purple-400 hover:after:w-full py-2"
           >
             About Me
           </a>
           <a 
             href="#projects" 
             onClick={toggleMenu} 
             className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all hover:text-purple-400 hover:after:w-full py-2"
           >
             Projects
           </a>
           <a 
             href="#experience" 
             onClick={toggleMenu} 
             className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all hover:text-purple-400 hover:after:w-full py-2"
           >
             Experience
           </a>
           <a 
             href="#skills" 
             onClick={toggleMenu} 
             className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all hover:text-purple-400 hover:after:w-full py-2"
           >
             Technical Skills
           </a>
           <a 
             href="#contact" 
             onClick={toggleMenu} 
             className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all hover:text-purple-400 hover:after:w-full py-2"
           >
             Contact Me
           </a>
         </div>
       </div>
     )}
   </nav>
 );
}