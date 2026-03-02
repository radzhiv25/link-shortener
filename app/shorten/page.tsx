'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  HiOutlineArrowRight,
  HiOutlineLink,
  HiOutlineExclamationCircle,
  HiOutlineClipboardDocument,
  HiOutlineServerStack,
  HiOutlineCursorArrowRays,
  HiOutlineGlobeAlt,
  HiOutlineShare,
  HiOutlineChartBarSquare,
} from 'react-icons/hi2';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

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

          {/* Flow 1: The problem with long URLs */}
          <section className="mt-12 sm:mt-16 md:mt-20">
            <motion.div
              className="flex flex-col items-center justify-center gap-6 rounded-xl border border-[#e5e5e5] bg-[#fafafa]/80 px-6 py-8 transition-colors duration-300 dark:border-[#333] dark:bg-[#0a0a0a]/80 sm:min-h-[180px] sm:flex-row sm:gap-8"
              aria-label="Illustration: the problem with long URLs"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={{
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
                hidden: {},
              }}
            >
              <motion.div
                className="flex flex-col items-center gap-2"
                variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="rounded-lg bg-[#e5e5e5]/80 p-4 transition-colors duration-300 dark:bg-[#262626]"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  <HiOutlineLink className="h-10 w-10 text-[#737373] dark:text-[#a3a3a3]" />
                </motion.div>
                <span className="text-xs font-medium text-[#737373] dark:text-[#525252]">Long URL</span>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.35 }}
                className="flex items-center"
              >
                <HiOutlineExclamationCircle className="h-6 w-6 shrink-0 text-amber-500 dark:text-amber-400" />
              </motion.div>
              <motion.div
                className="flex flex-col items-center gap-2"
                variants={{ hidden: { opacity: 0, x: 12 }, visible: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="rounded-lg bg-[#111] p-3 dark:bg-[#f5f5f5]"
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                >
                  <HiOutlineLink className="h-7 w-7 text-white dark:text-[#111]" />
                </motion.div>
                <span className="text-xs font-medium text-[#737373] dark:text-[#525252]">Short link</span>
              </motion.div>
            </motion.div>
            <h2 className="mt-6 text-lg font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
              The problem with long URLs
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
              Long links are hard to read, share, and remember. They break in messages, look untidy in posts, and reveal more than you want. Short links fix that: one compact URL that redirects to the real destination.
            </p>
          </section>

          {/* Flow 2: The journey behind every short link */}
          <section className="mt-12 sm:mt-16 md:mt-20">
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-[#e5e5e5] bg-[#fafafa]/80 px-4 py-8 transition-colors duration-300 dark:border-[#333] dark:bg-[#0a0a0a]/80 sm:gap-4 sm:py-10"
              aria-label="Illustration: from long URL to short link"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
                hidden: {},
              }}
            >
              {[
                { Icon: HiOutlineClipboardDocument, label: 'Paste' },
                { Icon: HiOutlineServerStack, label: 'Store' },
                { Icon: HiOutlineLink, label: 'Short link' },
                { Icon: HiOutlineCursorArrowRays, label: 'Click' },
                { Icon: HiOutlineGlobeAlt, label: 'Redirect' },
              ].map(({ Icon, label }, i) => (
                <span key={label} className="flex items-center gap-2 sm:gap-3">
                  <motion.div
                    className="flex flex-col items-center gap-1.5"
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.35 }}
                  >
                    <motion.div
                      className="rounded-lg border border-[#e5e5e5] bg-white p-3 transition-colors duration-300 dark:border-[#333] dark:bg-[#171717]"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon className="h-7 w-7 text-[#525252] dark:text-[#a3a3a3] sm:h-8 sm:w-8" />
                    </motion.div>
                    <span className="text-[10px] font-medium text-[#737373] sm:text-xs dark:text-[#525252]">{label}</span>
                  </motion.div>
                  {i < 4 && (
                    <motion.span
                      className="hidden text-[#c4c4c4] dark:text-[#404040] sm:inline"
                      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                      transition={{ delay: 0.15 + i * 0.1 }}
                    >
                      <HiOutlineArrowRight className="h-4 w-4" />
                    </motion.span>
                  )}
                </span>
              ))}
            </motion.div>
            <h2 className="mt-6 text-lg font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
              The journey behind every short link
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
              You paste a URL. We store the mapping and generate a short code. When someone clicks your short link, they're sent to the original address. With an account, you can choose a custom slug, see how many clicks you get, and manage everything from your dashboard.
            </p>
          </section>

          {/* Flow 3: Share and track */}
          <section className="mt-12 sm:mt-16 md:mt-20">
            <motion.div
              className="flex flex-col items-center justify-center gap-8 rounded-xl border border-[#e5e5e5] bg-[#fafafa]/80 px-6 py-10 transition-colors duration-300 dark:border-[#333] dark:bg-[#0a0a0a]/80 sm:min-h-[180px] sm:flex-row sm:gap-12"
              aria-label="Illustration: share and track"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={{
                visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
                hidden: {},
              }}
            >
              <motion.div
                className="flex flex-col items-center gap-2"
                variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="relative rounded-full bg-[#e5e5e5]/80 p-4 transition-colors duration-300 dark:bg-[#262626]"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(0,0,0,0)',
                      '0 0 0 12px rgba(0,0,0,0.04)',
                      '0 0 0 0 rgba(0,0,0,0)',
                    ],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5 }}
                >
                  <HiOutlineShare className="h-10 w-10 text-[#525252] dark:text-[#a3a3a3]" />
                </motion.div>
                <span className="text-xs font-medium text-[#737373] dark:text-[#525252]">Share everywhere</span>
              </motion.div>
              <motion.span
                className="text-[#c4c4c4] dark:text-[#404040]"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={{ delay: 0.2 }}
              >
                <HiOutlineArrowRight className="h-5 w-5 rotate-90 sm:rotate-0" />
              </motion.span>
              <motion.div
                className="flex flex-col items-center gap-2"
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="rounded-lg border border-[#e5e5e5] bg-white p-4 transition-colors duration-300 dark:border-[#333] dark:bg-[#171717]"
                  initial={{ opacity: 0.8, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  <HiOutlineChartBarSquare className="h-10 w-10 text-[#525252] dark:text-[#a3a3a3]" />
                </motion.div>
                <span className="text-xs font-medium text-[#737373] dark:text-[#525252]">Track clicks</span>
              </motion.div>
            </motion.div>
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
