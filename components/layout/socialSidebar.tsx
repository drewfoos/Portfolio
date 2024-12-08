'use client'

import type { FC } from 'react';
import { GithubIcon, LinkedinIcon, Mail, Terminal, Glasses, X, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Command = {
  command: string;
  response: string;
}

type HistoryEntry = {
  type: 'input' | 'output';
  content: string;
}

const COMMANDS: Command[] = [
  { command: 'help', response: 'Available commands: help, whoami, about, skills, contact, clear' },
  { command: 'whoami', response: 'andrew.dryfoos' },
  { command: 'about', response: 'Full-stack developer passionate about creating meaningful user experiences.' },
  { command: 'skills', response: 'JavaScript, TypeScript, React, Next.js, and a love for League of Legends!' },
  { command: 'contact', response: 'Email: dryfoosa@gmail.com\nGitHub: github.com/drewfoos' },
  { command: 'clear', response: '' },
];

const GRACE_PERIOD = 500; // ms

const SocialSidebar: FC = () => {
  const [showSecret, setShowSecret] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [tabIndex, setTabIndex] = useState(-1);
  const [fontScale, setFontScale] = useState(0);

  const [heroVisible, setHeroVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const [isEmailDropdownOpen, setIsEmailDropdownOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const isAnyPanelOpen = isEmailDropdownOpen || isAccessibilityOpen;

  const sidebarRef = useRef<HTMLDivElement>(null);
  const hoverOutTimeout = useRef<NodeJS.Timeout | null>(null);

  const email = "dryfoosa@gmail.com";

  const attemptCollapse = useCallback(() => {
    console.log("attemptCollapse called. Conditions:", {
      heroVisible,
      isHovering,
      isAnyPanelOpen
    });
  
    if (!heroVisible && !isAnyPanelOpen) {
      if (hoverOutTimeout.current) {
        clearTimeout(hoverOutTimeout.current);
        hoverOutTimeout.current = null;
      }
  
      if (isHovering) {
        console.log("No hero, no panel, but was hovering. Starting grace period...");
        hoverOutTimeout.current = setTimeout(() => {
          console.log("Grace period ended. Setting isHovering(false).");
          setIsHovering(false);
          hoverOutTimeout.current = null;
        }, GRACE_PERIOD);
      } else {
        console.log("No hero, no panel, not hovering. Collapsing immediately.");
        setIsHovering(false);
      }
    } else {
      console.log("Conditions for collapse not met. Doing nothing.");
      if (hoverOutTimeout.current) {
        clearTimeout(hoverOutTimeout.current);
        hoverOutTimeout.current = null;
      }
    }
  }, [heroVisible, isHovering, isAnyPanelOpen]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = heroVisible;
        const nowVisible = entry.isIntersecting;
        setHeroVisible(nowVisible);
  
        if (wasVisible && !nowVisible) {
          console.log("Hero became invisible. Attempting collapse after reflow...");
          requestAnimationFrame(() => attemptCollapse());
        }
      },
      { threshold: 0.1 }
    );
  
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      observer.observe(heroSection);
    }
  
    return () => {
      if (heroSection) observer.unobserve(heroSection);
    };
  }, [heroVisible, attemptCollapse]);
  
  

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('font-size-scale-0', 'font-size-scale-1', 'font-size-scale-2');
    html.classList.add(`font-size-scale-${fontScale}`);
  }, [fontScale]);

  const preventDefaultMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleCommand = (cmd: string) => {
    const newHistory: HistoryEntry[] = [...history, { type: 'input', content: `$ ${cmd}` }];

    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const command = COMMANDS.find(c => c.command === cmd.toLowerCase());
    if (command) {
      newHistory.push({ type: 'output', content: command.response });
    } else {
      newHistory.push({ type: 'output', content: `Command not found: ${cmd}. Type &apos;help&apos; for available commands.` });
    }

    setHistory(newHistory);
    setInput('');
    setTabIndex(-1);
  };

  const handleTabCompletion = (currentInput: string) => {
    const matchingCommands = COMMANDS
      .map(c => c.command)
      .filter(cmd => cmd.startsWith(currentInput.toLowerCase()));

    if (matchingCommands.length > 0) {
      const newTabIndex = (tabIndex + 1) % matchingCommands.length;
      setTabIndex(newTabIndex);
      setInput(matchingCommands[newTabIndex]);
    }
  };

  const increaseTextSize = () => {
    if (fontScale < 2) setFontScale(fontScale + 1);
  };

  const decreaseTextSize = () => {
    if (fontScale > 0) setFontScale(fontScale - 1);
  };

  const toggleDyslexicFont = () => {
    setDyslexicFont(!dyslexicFont);
    document.documentElement.classList.toggle('dyslexic-font');
  };

  const toggleHighContrast = () => {
    document.documentElement.classList.toggle('high-contrast');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
      .then(() => toast.success("Email address copied to clipboard!"))
      .catch(() => toast.error("Failed to copy email address. Please try again."));
  };

  const isSidebarExpanded = heroVisible || isHovering || isAnyPanelOpen;

  const handleMouseEnter = () => {
    if (hoverOutTimeout.current) {
      clearTimeout(hoverOutTimeout.current);
      hoverOutTimeout.current = null;
    }
    console.log("Mouse entered sidebar. isHovering=true");
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    console.log("Mouse left sidebar. Attempting collapse after reflow...");
    requestAnimationFrame(() => attemptCollapse());
  };

  const handleEmailDropdownChange = (open: boolean) => {
    console.log("Email dropdown changed:", open);
    setIsEmailDropdownOpen(open);
    if (!open) {
      console.log("Email dropdown closed. Attempting collapse after reflow...");
      // If conditions are met right now, collapse immediately
      if (!heroVisible && !isAnyPanelOpen) {
        console.log("No hero, no panels. Collapsing immediately.");
        setIsHovering(false);
      } else {
        requestAnimationFrame(() => attemptCollapse());
      }
    }
  };

  const handleAccessibilityChange = (open: boolean) => {
    console.log("Accessibility popup changed:", open);
    setIsAccessibilityOpen(open);
    if (!open) {
      console.log("Accessibility popup closed. Attempting collapse after reflow...");
      // If conditions are met right now, collapse immediately
      if (!heroVisible && !isAnyPanelOpen) {
        console.log("No hero, no panels. Collapsing immediately.");
        setIsHovering(false);
      } else {
        requestAnimationFrame(() => attemptCollapse());
      }
    }
  };

  const showToggleButton = !heroVisible && !isSidebarExpanded;

  console.log("Rendering Sidebar:", {
    heroVisible,
    isHovering,
    isAnyPanelOpen,
    isSidebarExpanded
  });

  return (
    <>
      <style jsx global>{`
        .terminal-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .terminal-scroll::-webkit-scrollbar-track {
          background: #0B0B0B;
          border-radius: 4px;
        }

        .terminal-scroll::-webkit-scrollbar-thumb {
          background: #9333ea;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .terminal-scroll::-webkit-scrollbar-thumb:hover {
          background: #a855f7;
        }

        .terminal-scroll {
          scrollbar-width: thin;
          scrollbar-color: #9333ea #0B0B0B;
        }

        .dyslexic-font {
          font-family: var(--font-dyslexic) !important;
        }

        .font-size-scale-0 {
          font-size: 16px !important;
        }
        .font-size-scale-1 {
          font-size: 18px !important;
        }
        .font-size-scale-2 {
          font-size: 20px !important;
        }

        .high-contrast {
          filter: contrast(2);
        }
      `}</style>

      {/* Toggle button to show/hide sidebar when hero not visible */}
      <motion.button
        className="fixed left-0 top-1/4 z-50 p-2 bg-purple-600 text-white rounded-r-md hidden lg:flex items-center justify-center"
        initial={false}
        animate={{
          x: showToggleButton ? 0 : -50,
          opacity: showToggleButton ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={() => {
          if (hoverOutTimeout.current) {
            clearTimeout(hoverOutTimeout.current);
            hoverOutTimeout.current = null;
          }
          console.log("Toggle button clicked. Setting isHovering(true)");
          setIsHovering(true);
        }}
        aria-label="Expand sidebar"
      >
        <ChevronRight size={20} />
      </motion.button>

      <motion.aside
        ref={sidebarRef}
        className="fixed left-4 top-1/4 z-50 hidden lg:block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          x: isSidebarExpanded ? 0 : -80,
          opacity: isSidebarExpanded ? 1 : 0.7
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <div className="flex flex-col space-y-4">
          {/* Just hover BG, no scaling */}
          <a
            href="https://github.com/drewfoos"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-white hover:bg-purple-600 transition-all duration-200 group"
          >
            <GithubIcon 
              size={24} 
              className="group-hover:rotate-12 transition-transform"
            />
          </a>

          <a
            href="https://www.linkedin.com/in/andrew-dryfoos/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-white hover:bg-purple-600 transition-all duration-200 group"
          >
            <LinkedinIcon 
              size={24} 
              className="group-hover:rotate-12 transition-transform"
            />
          </a>

          <DropdownMenu onOpenChange={handleEmailDropdownChange}>
            <DropdownMenuTrigger asChild>
              <button 
                className="p-2 rounded-md text-white hover:bg-purple-600 transition-all duration-200 group"
                onMouseDown={preventDefaultMouseDown}
              >
                <Mail 
                  size={24} 
                  className="group-hover:rotate-12 transition-transform"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-52 bg-[#0B0B0B] border-purple-600" 
              side="right"
              onCloseAutoFocus={(e) => e.preventDefault()}
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

          <button
            onClick={() => setShowSecret(true)}
            className="p-2 rounded-md text-white hover:bg-purple-600 transition-all duration-200 cursor-pointer group"
            aria-label="Open secret terminal"
            onMouseDown={preventDefaultMouseDown}
          >
            <Terminal 
              size={24} 
              className="group-hover:rotate-12 transition-transform"
            />
          </button>

          <Popover onOpenChange={handleAccessibilityChange}>
            <PopoverTrigger asChild>
              <button 
                className="p-2 rounded-md text-white hover:bg-purple-600 transition-all duration-200 cursor-pointer group"
                aria-label="Accessibility options"
                onMouseDown={preventDefaultMouseDown}
              >
                <Glasses 
                  size={24} 
                  className="group-hover:rotate-12 transition-transform"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-72 bg-[#0B0B0B] border-purple-600 p-4" 
              side="right"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <div className="space-y-4">
                <h3 className="font-medium text-white">Accessibility Options</h3>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Text Size</p>
                  <div className="flex gap-2">
                    <button
                      onClick={decreaseTextSize}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:opacity-90 transition-opacity"
                      aria-label="Decrease text size"
                      onMouseDown={preventDefaultMouseDown}
                    >
                      A-
                    </button>
                    <button
                      onClick={increaseTextSize}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:opacity-90 transition-opacity"
                      aria-label="Increase text size"
                      onMouseDown={preventDefaultMouseDown}
                    >
                      A+
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Display Settings</p>
                  <button
                    onClick={toggleHighContrast}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:opacity-90 transition-opacity"
                    onMouseDown={preventDefaultMouseDown}
                  >
                    Toggle High Contrast
                  </button>
                  <button
                    onClick={toggleDyslexicFont}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:opacity-90 transition-opacity"
                    onMouseDown={preventDefaultMouseDown}
                  >
                    {dyslexicFont ? 'Disable' : 'Enable'} Dyslexic Font
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </motion.aside>

      <Dialog open={showSecret} onOpenChange={setShowSecret}>
        <DialogContent className="bg-[#0B0B0B] border-purple-600 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-purple-600">Terminal</DialogTitle>
            <DialogDescription className="text-gray-400">
              Type &apos;help&apos; for available commands. Press ESC or the close button to exit.
            </DialogDescription>
            <button
              onClick={() => setShowSecret(false)}
              className="text-gray-400 hover:text-white transition-colors absolute top-4 right-4"
              aria-label="Close terminal"
              onMouseDown={preventDefaultMouseDown}
            >
              <X size={20} />
            </button>
          </DialogHeader>

          <div className="font-mono space-y-4 max-h-[60vh] overflow-y-auto terminal-scroll">
            <p className="text-purple-600">Welcome to the terminal!</p>
            
            {history.map((entry, index) => (
              <div key={index} className={entry.type === 'input' ? 'text-purple-600' : 'text-white ml-4'}>
                {entry.content}
              </div>
            ))}

            <div className="flex items-center">
              <span className="text-purple-600">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setTabIndex(-1);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && input.trim()) {
                    handleCommand(input.trim());
                  } else if (e.key === 'Tab') {
                    e.preventDefault();
                    handleTabCompletion(input.trim());
                  }
                }}
                className="flex-1 bg-transparent border-none outline-none text-white ml-2 focus:ring-0"
                autoFocus
                aria-label="Terminal input"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SocialSidebar;
