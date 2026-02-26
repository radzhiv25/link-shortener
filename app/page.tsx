'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { HiOutlineArrowRight, HiOutlineLink } from 'react-icons/hi2';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useToast } from './components/Toast';
import { useTheme } from './components/ThemeProvider';
import { AnimatedGradientText } from './components/AnimatedGradientText';

const PROCESSING_MS = 1400;

export default function Home() {
  const showToast = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isProcessing, setIsProcessing] = useState(false);
  const [url, setUrl] = useState('');

  const hasLink = url.trim().length > 0;

  const handleShorten = () => {
    if (isProcessing || !hasLink) return;
    setIsProcessing(true);
    setTimeout(() => {
      showToast();
      setIsProcessing(false);
    }, PROCESSING_MS);
  };

  return (
    <div className="min-h-screen bg-white text-[#111] transition-colors duration-300 dark:bg-black dark:text-[#f5f5f5]">
      <Navbar />
      <div className="mx-auto flex w-full flex-1 flex-col md:w-[50vw] md:max-w-[50vw]">
        <main className="w-full flex-1 px-4 pb-24 pt-24 sm:px-6 sm:pb-28 sm:pt-32">
          {/* Hero */}
          <section>
            <motion.h1
              className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-[3rem]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
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
              transition={{ delay: 0.08, duration: 0.45 }}
            >
              Paste a link, get a short one. Create an account to get a dashboard and manage your links.
            </motion.p>

            {/* URL input + CTA */}
            <motion.div
              className="mt-8 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.14, duration: 0.45 }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your long URL here"
                  className="w-full rounded-lg border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-sm text-[#111] placeholder-[#999] transition-colors duration-300 focus:border-[#111] focus:outline-none focus:ring-1 focus:ring-[#111] dark:border-[#333] dark:bg-[#0a0a0a] dark:text-[#f5f5f5] dark:placeholder-[#666] dark:focus:border-[#f5f5f5] dark:focus:ring-[#f5f5f5]"
                  aria-label="Paste your long URL"
                />
                <button
                  type="button"
                  onClick={handleShorten}
                  disabled={isProcessing || !hasLink}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#111] px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#f5f5f5] dark:text-[#111] dark:hover:bg-[#e5e5e5] dark:disabled:opacity-60"
                >
                  {isProcessing ? (
                    'Shortening…'
                  ) : (
                    <>
                      Shorten
                      <HiOutlineArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#888] transition-colors duration-300 dark:text-[#737373]">
                Sign up for a dashboard to manage and track your links.
              </p>
            </motion.div>
          </section>

          {/* How it works */}
          <section className="mt-20 border-t border-[#e5e5e5] pt-12 transition-colors duration-300 dark:border-[#262626] sm:mt-24">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373] transition-colors duration-300 dark:text-[#525252]">
              How it works
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {[
                {
                  step: '1',
                  title: 'Paste',
                  desc: 'Drop any long URL into the box above.',
                },
                {
                  step: '2',
                  title: 'Shorten',
                  desc: 'We generate a short link instantly.',
                },
                {
                  step: '3',
                  title: 'Share',
                  desc: 'Use the short link anywhere.',
                },
              ].map(({ step, title, desc }, i) => (
                <motion.div
                  key={step}
                  className="min-w-0"
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <span className="text-xs font-medium text-[#ccc] transition-colors duration-300 dark:text-[#525252]">
                    {step}
                  </span>
                  <h3 className="mt-1.5 text-sm font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
                    {title}
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* More features */}
          <section className="mt-16 sm:mt-20">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373] transition-colors duration-300 dark:text-[#525252]">
              More than short links
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-4">
              {[
                {
                  title: 'Custom URLs',
                  desc: 'Pick your own short slug so links are easy to remember and share.',
                },
                {
                  title: 'Track clicks',
                  desc: 'See how many times each link is clicked and when.',
                },
                {
                  title: 'Dashboard',
                  desc: 'Manage all your links, view stats, and edit or delete anytime.',
                },
              ].map(({ title, desc }, i) => (
                <motion.div
                  key={title}
                  className="min-w-0"
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                >
                  <h3 className="text-sm font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
                    {title}
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Secondary CTA */}
          <section className="mt-20 sm:mt-24">
            <div
              className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-6 transition-colors duration-300 hover:border-[#e0e0e0] hover:bg-[#f8f8f8] dark:border-[#262626] dark:bg-[#0a0a0a] dark:hover:border-[#333] dark:hover:bg-[#0f0f0f] sm:flex-row sm:items-center sm:justify-between"
              onClick={showToast}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), showToast())}
              role="button"
              tabIndex={0}
              aria-label="Create a short link"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#666] transition-colors duration-300 dark:bg-[#1a1a1a] dark:text-[#888]">
                  <HiOutlineLink className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
                    Ready to shorten?
                  </p>
                  <p className="text-xs text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
                    Custom URLs, tracking, and a dashboard for all your links.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111] transition-all duration-200 hover:gap-1.5 dark:text-[#f5f5f5] hover:bg-gray-200 rounded-md px-4 py-2">
                Get started
                <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-px hover:translate-x-2" />
              </span>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
