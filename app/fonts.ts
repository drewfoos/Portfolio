// app/fonts.ts
import localFont from 'next/font/local'

export const axiforma = localFont({
  src: './fonts/Axiforma-Bold.otf',
  variable: '--font-axiforma',
  display: 'swap',  // Add this for better loading performance
  preload: true,    // Add this to prioritize font loading
  fallback: ['system-ui', 'arial'], // Add fallback fonts to prevent layout shifts
})

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
  fallback: ['system-ui', 'arial']
})