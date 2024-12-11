import type { Config } from "tailwindcss";
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        keyframes: {
          scroll: {
            '0%': { opacity: '1', transform: 'translateY(0)' },
            '100%': { opacity: '0', transform: 'translateY(26px)' }
          },
          // Add progress animation
          progress: {
            '0%': { width: '0%', opacity: '1' },
            '50%': { width: '100%', opacity: '0.5' },
            '100%': { width: '100%', opacity: '0' }
          }
        },
        animation: {
          scroll: 'scroll 1.5s ease infinite',
          // Add progress animation
          progress: 'progress 2s ease-out forwards'
        },
        fontFamily: {
          axiforma: ['var(--font-axiforma)'],
        },
        // ... rest of your existing config
        colors: {
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            // Your existing colors...
        },
        borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)'
        }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;