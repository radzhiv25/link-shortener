'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  HiOutlineArrowRight,
  HiOutlineLink,
  HiOutlineClipboardDocument,
  HiOutlineBolt,
  HiOutlineShare,
  HiOutlineTag,
  HiOutlineChartBarSquare,
  HiOutlineRectangleStack,
  HiOutlineArrowPath,
} from 'react-icons/hi2';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';
import { AnimatedGradientText } from '@/components/AnimatedGradientText';

const HOW_STEPS = [
  {
    step: '1',
    title: 'Paste',
    desc: 'Open Create and drop in any long URL.',
    Icon: HiOutlineClipboardDocument,
  },
  {
    step: '2',
    title: 'Shorten',
    desc: 'We generate a short link you can copy.',
    Icon: HiOutlineBolt,
  },
  {
    step: '3',
    title: 'Share',
    desc: 'Use it anywhere — messages, bios, posts.',
    Icon: HiOutlineShare,
  },
] as const;

const ACCOUNT_FEATURES = [
  {
    title: 'Custom slugs',
    desc: 'Choose a memorable short code instead of a random string.',
    Icon: HiOutlineTag,
  },
  {
    title: 'Click counts',
    desc: 'See how often each link is opened.',
    Icon: HiOutlineChartBarSquare,
  },
  {
    title: 'My links',
    desc: 'Edit expiry, rename slugs, or delete links in one list.',
    Icon: HiOutlineRectangleStack,
  },
] as const;

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-[#111] transition-colors duration-300 dark:bg-black dark:text-[#f5f5f5]">
      {/* Atmospheric background (full width behind content column) */}
      <div
        className="home-landing-bg pointer-events-none fixed inset-0 -z-10 opacity-100"
        aria-hidden
      />

      <Navbar />
      <div className="relative mx-auto flex w-full flex-1 flex-col md:w-[50vw] md:max-w-[50vw]">
        <main className="w-full flex-1 px-4 pb-24 pt-24 sm:px-6 sm:pb-28 sm:pt-32">
          {/* Hero */}
          <section className="relative">
            <motion.h1
              className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-[3rem]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            >
              <AnimatedGradientText
                className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-[3rem]"
                speed={2.5}
                colorFrom={isDark ? '#f5f5f5' : '#111'}
                colorTo={isDark ? '#737373' : '#525252'}
              >
                Short links, less clutter.
              </AnimatedGradientText>
            </motion.h1>
            <motion.p
              className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#555] transition-colors duration-300 dark:text-[#a3a3a3]"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
            >
              Turn long URLs into short, shareable links. Sign in to pick custom slugs, set expiry, and see clicks in one place.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.45 }}
            >
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#111] px-6 py-3 text-sm font-medium text-white shadow-[4px_4px_0_0_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-[#333] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.12)] dark:bg-[#f5f5f5] dark:text-[#111] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.12)] dark:hover:bg-[#e5e5e5]"
              >
                Create a short link
                <HiOutlineArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/shorten"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d4d4d4] bg-white/60 px-6 py-3 text-sm font-medium text-[#111] backdrop-blur-sm transition-colors duration-200 hover:bg-[#fafafa] dark:border-[#404040] dark:bg-black/30 dark:text-[#f5f5f5] dark:hover:bg-[#0a0a0a]"
              >
                How it works
              </Link>
            </motion.div>

            {/* Illustrative preview — below headline & CTAs so the hero reads first */}
            <motion.div
              className="mt-12 rounded-md border border-[#e5e5e5] bg-white/80 p-4 backdrop-blur-sm transition-colors duration-300 dark:border-[#262626] dark:bg-black/40 sm:mt-14 sm:p-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              aria-hidden
            >
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#888] dark:text-[#666]">
                Preview
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-[#e5e5e5] bg-[#fafafa] px-3 py-2.5 font-mono text-[11px] text-[#666] transition-colors dark:border-[#333] dark:bg-[#0a0a0a] dark:text-[#a3a3a3] sm:text-xs">
                  <HiOutlineLink className="h-4 w-4 shrink-0 text-[#999] dark:text-[#666]" />
                  <span className="truncate">https://example.com/very/long/path/to/page</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#737373] sm:justify-start">
                  <HiOutlineArrowPath className="h-5 w-5 shrink-0 sm:w-4" />
                  <span className="hidden text-[10px] uppercase tracking-wider sm:inline">shorten</span>
                </div>
                <div className="flex items-center gap-2 rounded-md border border-[#111] bg-[#111] px-3 py-2.5 font-mono text-[11px] text-white dark:border-[#f5f5f5] dark:bg-[#f5f5f5] dark:text-[#111] sm:text-xs">
                  <span className="text-[#a3a3a3] dark:text-[#525252]">shrtnr.app/</span>
                  <span className="font-medium">abc12</span>
                </div>
              </div>
            </motion.div>
          </section>

          {/* How it works */}
          <section className="mt-20 border-t border-[#e5e5e5] pt-12 transition-colors duration-300 dark:border-[#262626] sm:mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373] transition-colors duration-300 dark:text-[#525252]">
                How it works
              </p>
              <div className="hidden h-px flex-1 min-w-[80px] bg-gradient-to-r from-[#e5e5e5] to-transparent dark:from-[#333] sm:block" aria-hidden />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-4">
              {HOW_STEPS.map(({ step, title, desc, Icon }, i) => (
                <motion.div
                  key={step}
                  className="group relative rounded-md border border-[#e5e5e5] bg-white/70 p-5 transition-colors duration-300 hover:border-[#ccc] hover:bg-white dark:border-[#262626] dark:bg-[#0a0a0a]/80 dark:hover:border-[#404040]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <span className="text-xs font-medium tabular-nums text-[#bbb] transition-colors dark:text-[#525252]">
                      {step}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-md border border-[#e5e5e5] bg-[#fafafa] text-[#525252] transition-colors group-hover:border-[#d4d4d4] dark:border-[#333] dark:bg-[#141414] dark:text-[#a3a3a3]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mt-16 sm:mt-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373] transition-colors duration-300 dark:text-[#525252]">
                With an account
              </p>
              <div className="hidden h-px flex-1 min-w-[80px] bg-gradient-to-r from-[#e5e5e5] to-transparent dark:from-[#333] sm:block" aria-hidden />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {ACCOUNT_FEATURES.map(({ title, desc, Icon }, i) => (
                <motion.div
                  key={title}
                  className="relative overflow-hidden rounded-md border border-[#e5e5e5] bg-gradient-to-b from-[#fafafa] to-white p-5 dark:border-[#262626] dark:from-[#111] dark:to-[#0a0a0a]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 opacity-[0.07] dark:opacity-[0.12]"
                    aria-hidden
                  >
                    <Icon className="h-full w-full" />
                  </div>
                  <div className="relative">
                    <div className="mb-3 inline-flex w-fit rounded-md border border-[#e5e5e5] bg-white p-2 dark:border-[#333] dark:bg-[#141414]">
                      <Icon className="h-5 w-5 text-[#525252] dark:text-[#a3a3a3]" />
                    </div>
                    <h3 className="text-sm font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Secondary CTA */}
          <section className="mt-20 sm:mt-24">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <Link
                href="/create"
                className="group relative flex cursor-pointer flex-col gap-5 overflow-hidden rounded-md border border-[#e5e5e5] bg-[#fafafa] p-6 transition-colors duration-300 hover:border-[#d4d4d4] dark:border-[#262626] dark:bg-[#0a0a0a] dark:hover:border-[#404040] sm:flex-row sm:items-center sm:justify-between sm:p-8"
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(0,0,0,0.03)_50%,transparent_60%)] dark:bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.04)_50%,transparent_60%)]"
                  aria-hidden
                />
                <div className="relative flex items-start gap-4 sm:items-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#e5e5e5] bg-white text-[#666] shadow-sm transition-colors dark:border-[#333] dark:bg-[#141414] dark:text-[#888]">
                    <HiOutlineLink className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
                      Ready to shorten a URL?
                    </p>
                    <p className="mt-0.5 text-sm text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
                      Open the creator — no clutter on this page.
                    </p>
                  </div>
                </div>
                <span className="relative inline-flex items-center gap-2 self-start rounded-md border border-[#e5e5e5] bg-white px-5 py-2.5 text-sm font-medium text-[#111] transition-all duration-200 group-hover:gap-3 dark:border-[#333] dark:bg-[#141414] dark:text-[#f5f5f5] sm:self-auto">
                  Go to Create
                  <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
