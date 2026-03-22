'use client';

import { motion } from 'motion/react';
import { HiOutlineArrowRight, HiOutlineLink } from 'react-icons/hi2';

export function AuthPanelLogin() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-500">
        Access
      </p>

      {/* Long URL → short — animated */}
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
        <motion.div
          className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/60 px-3 py-2.5"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HiOutlineLink className="size-4 shrink-0 text-zinc-500" aria-hidden />
          <span className="truncate font-mono text-[11px] text-zinc-400 sm:text-xs">
            https://example.com/long/path
          </span>
        </motion.div>

        <motion.div
          className="flex justify-center sm:shrink-0"
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <HiOutlineArrowRight className="size-6 text-zinc-400" />
        </motion.div>

        <motion.div
          className="flex items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 px-4 py-2.5 font-mono text-sm font-medium text-zinc-900"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: 1,
            scale: [1, 1.02, 1],
            boxShadow: [
              '0 0 0 0 rgba(244,244,245,0)',
              '0 0 24px 0 rgba(244,244,245,0.15)',
              '0 0 0 0 rgba(244,244,245,0)',
            ],
          }}
          transition={{
            opacity: { delay: 0.35, duration: 0.4 },
            scale: { delay: 0.35, duration: 0.4 },
            boxShadow: { delay: 0.6, duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <span className="text-zinc-500">/</span>
          <span>abc</span>
        </motion.div>
      </div>

      <motion.p
        className="mt-10 text-center text-xs leading-relaxed text-zinc-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Short links, less clutter.
      </motion.p>

      {/* Decorative orbit dots */}
      <div className="mt-8 flex gap-2" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-md bg-zinc-600"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.25,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
