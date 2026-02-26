'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

const TYPEWRITER_TEXT = 'What is shrtnr?';
const TYPEWRITER_MS = 85;

function Typewriter({ text, className }: { text: string; className?: string }) {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    if (visibleLength >= text.length) return;
    const t = setTimeout(() => setVisibleLength((n) => n + 1), TYPEWRITER_MS);
    return () => clearTimeout(t);
  }, [visibleLength, text.length]);

  return (
    <span className={className}>
      {text.slice(0, visibleLength)}
      {visibleLength < text.length && (
        <span className="animate-pulse border-r-2 border-current pr-0.5" aria-hidden />
      )}
    </span>
  );
}

export default function ShortenPage() {
  return (
    <div className="min-h-screen bg-white text-[#111] transition-colors duration-300 dark:bg-black dark:text-[#f5f5f5]">
      <Navbar />
      <div className="mx-auto flex w-full flex-1 flex-col md:w-[50vw] md:max-w-[50vw]">
        <main className="w-full flex-1 px-4 pb-24 pt-24 sm:px-6 sm:pb-28 sm:pt-32">
          {/* Intro */}
          <section>
            <motion.h1
              className="text-3xl font-semibold tracking-tight text-[#111] transition-colors duration-300 sm:text-4xl dark:text-[#f5f5f5]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Typewriter text={TYPEWRITER_TEXT} />
            </motion.h1>
            <motion.p
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#555] transition-colors duration-300 dark:text-[#a3a3a3]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, duration: 0.35 }}
            >
              A minimal link shortener that turns long URLs into short, shareable links. Create an account to get a dashboard, custom slugs, and click tracking.
            </motion.p>
          </section>

          {/* Illustration placeholder 1 - The problem */}
          <section className="mt-12 sm:mt-16 md:mt-20">
            <div
              className="min-h-[140px] rounded-xl border border-dashed border-[#e5e5e5] bg-[#fafafa]/50 transition-colors duration-300 dark:border-[#333] dark:bg-[#0a0a0a]/50 sm:min-h-[180px]"
              aria-label="Illustration: the journey of a long URL"
            >
              {/* Add your illustration here */}
            </div>
            <h2 className="mt-6 text-lg font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
              The problem with long URLs
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
              Long links are hard to read, share, and remember. They break in messages, look untidy in posts, and reveal more than you want. Short links fix that: one compact URL that redirects to the real destination.
            </p>
          </section>

          {/* Illustration placeholder 2 - The journey */}
          <section className="mt-12 sm:mt-16 md:mt-20">
            <div
              className="min-h-[140px] rounded-xl border border-dashed border-[#e5e5e5] bg-[#fafafa]/50 transition-colors duration-300 dark:border-[#333] dark:bg-[#0a0a0a]/50 sm:min-h-[180px]"
              aria-label="Illustration: from long URL to short link"
            >
              {/* Add your illustration here */}
            </div>
            <h2 className="mt-6 text-lg font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
              The journey behind every short link
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
              You paste a URL. We store the mapping and generate a short code. When someone clicks your short link, they're sent to the original address. With an account, you can choose a custom slug, see how many clicks you get, and manage everything from your dashboard.
            </p>
          </section>

          {/* Illustration placeholder 3 - After the click */}
          <section className="mt-12 sm:mt-16 md:mt-20">
            <div
              className="min-h-[140px] rounded-xl border border-dashed border-[#e5e5e5] bg-[#fafafa]/50 transition-colors duration-300 dark:border-[#333] dark:bg-[#0a0a0a]/50 sm:min-h-[180px]"
              aria-label="Illustration: share and track"
            >
              {/* Add your illustration here */}
            </div>
            <h2 className="mt-6 text-lg font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
              Share and track
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
              Use your short link anywhere — messages, bios, print. If you're signed in, the dashboard shows how many times each link was clicked so you can see what's working.
            </p>
          </section>

          {/* CTA back to home */}
          <section className="mt-20 sm:mt-24">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-[#111] px-4 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#333] dark:bg-[#f5f5f5] dark:text-[#111] dark:hover:bg-[#e5e5e5]"
            >
              Create a short link
              <HiOutlineArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
