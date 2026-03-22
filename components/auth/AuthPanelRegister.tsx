'use client';

import { motion } from 'motion/react';
import {
  HiOutlineUserPlus,
  HiOutlineTag,
  HiOutlineChartBarSquare,
  HiOutlineRectangleStack,
} from 'react-icons/hi2';

const features = [
  { label: 'Custom slugs', Icon: HiOutlineTag },
  { label: 'Click stats', Icon: HiOutlineChartBarSquare },
  { label: 'My links', Icon: HiOutlineRectangleStack },
] as const;

export function AuthPanelRegister() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-500">
        Join
      </p>

      <motion.div
        className="relative flex size-20 items-center justify-center rounded-md border border-zinc-600 bg-zinc-900/80 text-zinc-300"
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(161,161,170,0)',
            '0 0 32px 0 rgba(161,161,170,0.12)',
            '0 0 0 0 rgba(161,161,170,0)',
          ],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HiOutlineUserPlus className="size-10 text-zinc-200" />
        </motion.div>
        <span className="absolute -left-px -top-px size-2 border-l-2 border-t-2 border-zinc-500" />
        <span className="absolute -bottom-px -right-px size-2 border-b-2 border-r-2 border-zinc-500" />
      </motion.div>

      <motion.p
        className="mt-6 text-center text-sm font-medium tracking-wide text-zinc-300"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
      >
        Start shortening
      </motion.p>

      <ul className="mt-8 w-full space-y-3">
        {features.map(({ label, Icon }, i) => (
          <motion.li
            key={label}
            className="flex items-center gap-3 rounded-md border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.12, duration: 0.4 }}
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 text-zinc-400">
              <Icon className="size-4" aria-hidden />
            </span>
            <span className="text-sm text-zinc-400">{label}</span>
            <motion.span
              className="ml-auto text-zinc-600"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
              aria-hidden
            >
              ···
            </motion.span>
          </motion.li>
        ))}
      </ul>

      <motion.p
        className="mt-10 text-center text-xs leading-relaxed text-zinc-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        One account — custom slugs & click stats.
      </motion.p>
    </div>
  );
}
