'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { HiOutlineLink } from 'react-icons/hi2';
import { useToast } from './Toast';

export function Navbar() {
  const showToast = useToast();

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-1/2 top-0 z-10 w-[50vw] -translate-x-1/2 border-b border-[#e5e5e5] bg-white/95 backdrop-blur-sm transition-colors duration-300 dark:border-[#1a1a1a] dark:bg-black/95"
    >
      <div className="flex w-full items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]"
        >
          shrtnr
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-8 text-sm">
            <Link
              href="/"
              className="text-[#666] transition-colors duration-300 hover:text-[#111] dark:text-[#888] dark:hover:text-[#f5f5f5]"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={() => showToast()}
              className="text-[#666] transition-colors duration-300 hover:text-[#111] dark:text-[#888] dark:hover:text-[#f5f5f5]"
            >
              Shorten
            </button>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
