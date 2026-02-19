'use client';

import { motion } from 'motion/react';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useToast } from './components/Toast';

export default function Home() {
  const showToast = useToast();

  return (
    <div className="min-h-screen bg-white text-[#111] transition-colors duration-300 dark:bg-black dark:text-[#f5f5f5]">
      <Navbar />
      <div className="mx-auto flex w-[50vw] max-w-[50vw] flex-1 flex-col">
        <main className="w-full flex-1 px-6 pb-28 pt-32">
        <section>
          <motion.h1
            className="text-3xl font-semibold tracking-tight text-[#111] transition-colors duration-300 sm:text-4xl dark:text-[#f5f5f5]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            Short links, less clutter.
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md text-[15px] leading-relaxed text-[#555] transition-colors duration-300 dark:text-[#a3a3a3]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.35 }}
          >
            Create a short link in one step. No sign-up, no fuss.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.35 }}
          >
            <button
              type="button"
              onClick={showToast}
              className="inline-flex items-center gap-2 rounded-lg bg-[#111] px-4 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#333] dark:bg-[#f5f5f5] dark:text-[#111] dark:hover:bg-[#e5e5e5]"
            >
              Get started
              <HiOutlineArrowRight className="h-4 w-4" />
            </button>
            <span className="text-sm text-[#888] transition-colors duration-300 dark:text-[#737373]">
              or paste a URL above
            </span>
          </motion.div>
        </section>

        <section className="mt-24 border-t border-[#e5e5e5] pt-14 transition-colors duration-300 dark:border-[#262626]">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373] transition-colors duration-300 dark:text-[#525252]">
            How it works
          </p>
          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <motion.div
              className="min-w-0 flex-1"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs font-medium text-[#ccc] transition-colors duration-300 dark:text-[#525252]">
                1
              </span>
              <h3 className="mt-1.5 text-sm font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
                Paste
              </h3>
              <p className="mt-0.5 text-sm leading-relaxed text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
                Drop any long URL into the box.
              </p>
            </motion.div>
            <motion.div
              className="min-w-0 flex-1"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.3 }}
            >
              <span className="text-xs font-medium text-[#ccc] transition-colors duration-300 dark:text-[#525252]">
                2
              </span>
              <h3 className="mt-1.5 text-sm font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
                Shorten
              </h3>
              <p className="mt-0.5 text-sm leading-relaxed text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
                We generate a short link instantly.
              </p>
            </motion.div>
            <motion.div
              className="min-w-0 flex-1"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <span className="text-xs font-medium text-[#ccc] transition-colors duration-300 dark:text-[#525252]">
                3
              </span>
              <h3 className="mt-1.5 text-sm font-medium text-[#111] transition-colors duration-300 dark:text-[#f5f5f5]">
                Share
              </h3>
              <p className="mt-0.5 text-sm leading-relaxed text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
                Use the short link anywhere.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="mt-24">
          <div className="rounded-xl border border-[#e5e5e5] bg-[#fafafa] px-6 py-5 transition-colors duration-300 dark:border-[#262626] dark:bg-[#0a0a0a]">
            <p className="text-sm text-[#666] transition-colors duration-300 dark:text-[#a3a3a3]">
              Ready to shorten?{' '}
              <button
                type="button"
                onClick={showToast}
                className="font-medium text-[#111] underline underline-offset-2 decoration-[#ddd] transition-colors duration-300 hover:decoration-[#111] dark:text-[#f5f5f5] dark:decoration-[#404040] dark:hover:decoration-[#f5f5f5]"
              >
                Create a short link
              </button>
            </p>
          </div>
        </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
