'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'motion/react';
import { HiOutlineLink } from 'react-icons/hi2';

const navLink =
  'text-[13px] text-[#888]/90 transition-colors duration-200 hover:text-[#111]/80 dark:text-[#737373] dark:hover:text-[#e5e5e5]/90';

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 z-10 w-full border-b border-[#e5e5e5]/40 bg-white/70 backdrop-blur-md transition-colors duration-300 dark:border-[#262626]/50 dark:bg-black/50 md:left-1/2 md:w-[50vw] md:-translate-x-1/2"
    >
      <div className="flex w-full items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3">
        <Link
          href="/"
          className="group flex items-center gap-1.5 text-[15px] font-medium tracking-tight text-[#555] transition-colors duration-200 hover:text-[#111] dark:text-[#a3a3a3] dark:hover:text-[#f5f5f5]"
        >
          <HiOutlineLink
            className="h-[18px] w-[18px] shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
          <span>shrtnr</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm sm:gap-7">
          <Link href="/" className={navLink}>
            Home
          </Link>
          <Link href="/create" className={navLink}>
            Create
          </Link>
          <Link href="/shorten" className={navLink}>
            About
          </Link>
          {status !== 'loading' &&
            (session?.user ? (
              <Link href="/links" className={navLink}>
                My links
              </Link>
            ) : (
              <Link href="/login" className={navLink}>
                Log in
              </Link>
            ))}
        </nav>
      </div>
    </motion.header>
  );
}
