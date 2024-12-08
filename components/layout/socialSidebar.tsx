'use client'

import type { FC } from 'react';
import { GithubIcon, LinkedinIcon, Mail, Terminal, Glasses, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
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

// Re-added 'clear' into COMMANDS so it can be included in tab completion.
// We'll still handle it as a special case in handleCommand.
const COMMANDS: Command[] = [
  { command: 'help', response: 'Available commands: help, whoami, about, skills, contact, clear' },
  { command: 'whoami', response: 'andrew.dryfoos' },
  { command: 'about', response: 'Full-stack developer passionate about creating meaningful user experiences.' },
  { command: 'skills', response: 'JavaScript, TypeScript, React, Next.js, and a love for League of Legends!' },
  { command: 'contact', response: 'Email: dryfoosa@gmail.com\nGitHub: github.com/drewfoos' },
  { command: 'clear', response: '' },
];

const SocialSidebar: FC = () => {
  const [showSecret, setShowSecret] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [tabIndex, setTabIndex] = useState(-1);
  const [fontScale, setFontScale] = useState(0);

  const email = "dryfoosa@gmail.com";

  useEffect(() => {
    // Update documentElement classes based on font scale
    const html = document.documentElement;
    html.classList.remove('font-size-scale-0', 'font-size-scale-1', 'font-size-scale-2');
    html.classList.add(`font-size-scale-${fontScale}`);
  }, [fontScale]);

  const preventDefaultMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleCommand = (cmd: string) => {
    const newHistory: HistoryEntry[] = [...history, { type: 'input', content: `$ ${cmd}` }];

    // Handle 'clear' separately
    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const command = COMMANDS.find(c => c.command === cmd.toLowerCase());
    if (command) {
      newHistory.push({ type: 'output', content: command.response });
    } else {
      newHistory.push({ type: 'output', content: `Command not found: ${cmd}. Type 'help' for available commands.` });
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
    if (fontScale < 2) {
      setFontScale(fontScale + 1);
    }
  };

  const decreaseTextSize = () => {
    if (fontScale > 0) {
      setFontScale(fontScale - 1);
    }
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
      .then(() => {
        toast.success("Email address copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy email address. Please try again.");
      });
  };

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

      <aside className="fixed left-4 top-1/4 z-50 hidden lg:block">
        <div className="flex flex-col space-y-4">
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
          <DropdownMenu>
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
              onCloseAutoFocus={(e) => {
                e.preventDefault();
              }}
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
          <Popover>
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
              onCloseAutoFocus={(e) => {
                e.preventDefault();
              }}
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
      </aside>

      <Dialog open={showSecret} onOpenChange={setShowSecret}>
        <DialogContent className="bg-[#0B0B0B] border-purple-600 max-w-2xl">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-purple-600">Terminal</DialogTitle>
              <button
                onClick={() => setShowSecret(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close terminal"
                onMouseDown={preventDefaultMouseDown}
              >
                <X size={20} />
              </button>
            </div>
          </DialogHeader>
          
          <div className="font-mono space-y-4 max-h-[60vh] overflow-y-auto terminal-scroll">
            <p className="text-purple-600">Welcome to the terminal! Type &apos;help&apos; for available commands.</p>
            
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
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SocialSidebar;
