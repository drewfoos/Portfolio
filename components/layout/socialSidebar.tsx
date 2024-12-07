'use client'

import type { FC } from 'react';
import { GithubIcon, LinkedinIcon, Mail, Terminal, Glasses, X } from 'lucide-react';
import { useState } from 'react';
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
  { command: 'clear', response: '' }
];

const SocialSidebar: FC = () => {
  const [showSecret, setShowSecret] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [tabIndex, setTabIndex] = useState(-1);

  const handleCommand = (cmd: string) => {
    const newHistory: HistoryEntry[] = [...history, { type: 'input', content: `$ ${cmd}` }];
    
    if (cmd === 'clear') {
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
      if (tabIndex === -1 || tabIndex >= matchingCommands.length) {
        setTabIndex(0);
        setInput(matchingCommands[0]);
      } else {
        setTabIndex(tabIndex + 1);
        setInput(matchingCommands[tabIndex] || matchingCommands[0]);
      }
    }
  };

  const increaseTextSize = () => {
    const html = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(html).fontSize);
    html.style.fontSize = `${currentSize + 2}px`;
  };

  const decreaseTextSize = () => {
    const html = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(html).fontSize);
    if (currentSize > 12) {
      html.style.fontSize = `${currentSize - 2}px`;
    }
  };

  const toggleDyslexicFont = () => {
    setDyslexicFont(!dyslexicFont);
    if (!dyslexicFont) {
      document.body.style.fontFamily = 'var(--font-dyslexic)';
    } else {
      document.body.style.fontFamily = '';
    }
  };

  const toggleHighContrast = () => {
    document.documentElement.classList.toggle('high-contrast');
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

        /* Firefox */
        .terminal-scroll {
          scrollbar-width: thin;
          scrollbar-color: #9333ea #0B0B0B;
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
          <a
            href="mailto:dryfoosa@gmail.com"
            className="p-2 rounded-md text-white hover:bg-purple-600 transition-all duration-200 group"
          >
            <Mail 
              size={24} 
              className="group-hover:rotate-12 transition-transform"
            />
          </a>
          <button
            onClick={() => setShowSecret(true)}
            className="p-2 rounded-md text-white hover:bg-purple-600 transition-all duration-200 cursor-pointer group"
            aria-label="Open secret terminal"
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
                    >
                      A-
                    </button>
                    <button
                      onClick={increaseTextSize}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:opacity-90 transition-opacity"
                      aria-label="Increase text size"
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
                  >
                    Toggle High Contrast
                  </button>
                  <button
                    onClick={toggleDyslexicFont}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:opacity-90 transition-opacity"
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
              >
                <X size={20} />
              </button>
            </div>
          </DialogHeader>
          
          <div className="font-mono space-y-4 max-h-[60vh] overflow-y-auto terminal-scroll">
            <p className="text-purple-600">Welcome to the terminal! Type 'help' for available commands.</p>
            
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