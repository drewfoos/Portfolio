'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { axiforma } from '@/app/fonts';

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${axiforma.variable} min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4 relative overflow-hidden`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center z-10"
      >
        <h1 className="text-6xl sm:text-8xl font-axiforma font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#1919A7] to-[#D017B8] mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl text-white font-light mb-8">
          Oops! That page doesn&apos;t exist.
        </h2>
        <p className="text-white/60 text-lg mb-12 max-w-md mx-auto">
          The page you&apos;re looking for seems to have vanished into the digital void.
        </p>
        <Link
          href="/"
          className="inline-flex px-8 py-4 text-white bg-gradient-to-br from-[#1919A7] to-[#D017B8] rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Return Home
        </Link>
      </motion.div>

      {/* Background Elements - Optional decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1919A7]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#D017B8]/10 rounded-full blur-3xl" />
    </motion.main>
  );
}