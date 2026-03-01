'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'motion/react';

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 z-10 w-full border-b border-[#e5e5e5] bg-white/95 backdrop-blur-sm transition-colors duration-300 dark:border-[#1a1a1a] dark:bg-black/95 md:left-1/2 md:w-[50vw] md:-translate-x-1/2"
    >
      <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]"
        >
          shrtnr
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="flex items-center gap-6 text-sm sm:gap-8">
            <Link
              href="/"
              className="text-[#666] transition-colors duration-300 hover:text-[#111] dark:text-[#888] dark:hover:text-[#f5f5f5]"
            >
              Home
            </Link>
            <Link
              href="/shorten"
              className="text-[#666] transition-colors duration-300 hover:text-[#111] dark:text-[#888] dark:hover:text-[#f5f5f5]"
            >
              Shorten
            </Link>
            {status !== 'loading' && (
              session?.user ? (
                <Link
                  href="/dashboard"
                  className="text-[#666] transition-colors duration-300 hover:text-[#111] dark:text-[#888] dark:hover:text-[#f5f5f5]"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-[#666] transition-colors duration-300 hover:text-[#111] dark:text-[#888] dark:hover:text-[#f5f5f5]"
                >
                  Log in
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
