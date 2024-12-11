// app/fonts.ts
import localFont from 'next/font/local'

// Axiforma configuration
export const axiforma = localFont({
  src: [
    {
      path: './fonts/Axiforma-Bold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-axiforma',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: "Arial",  // Changed to use valid value
})

// OpenDyslexic configuration
export const openDyslexic = localFont({
  src: [
    {
      path: './fonts/OpenDyslexic-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/OpenDyslexic-Bold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-dyslexic',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: "Arial"  // Changed to use valid value
})