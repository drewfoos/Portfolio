// app/fonts.ts
import localFont from 'next/font/local'

export const axiforma = localFont({
  src: './fonts/Axiforma-Bold.otf',
  variable: '--font-axiforma'
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
})