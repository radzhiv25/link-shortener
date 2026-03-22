'use client';

import Link from 'next/link';
import { HiOutlineLink } from 'react-icons/hi2';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t border-[#e5e5e5]/40 bg-white/70 py-3 backdrop-blur-md transition-colors duration-300 dark:border-[#262626]/50 dark:bg-black/50 md:left-1/2 md:w-[50vw] md:-translate-x-1/2 md:py-4">
      <div className="flex md:flex-row flex-col md:items-center items-start justify-between gap-2 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-1.5 text-[13px] font-medium tracking-tight text-[#555] transition-colors duration-200 hover:text-[#111] dark:text-[#a3a3a3] dark:hover:text-[#f5f5f5]"
        >
          <HiOutlineLink
            className="h-4 w-4 shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
          <span>shrtnr</span>
        </Link>
        <p className="max-w-[20rem] text-center text-[11px] leading-relaxed text-[#888]/90 dark:text-[#666]">
          Minimal link shortener. Sign in to manage links and see clicks.
        </p>
      </div>
    </footer>
  );
}
