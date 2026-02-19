'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ToastContext = createContext<(() => void) | null>(null);

export function useToast() {
  const show = useContext(ToastContext);
  if (!show) return () => {};
  return show;
}

const MESSAGE = "Oops, we're working on the link shortening feature — check back soon!";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  const showToast = useCallback(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-center text-sm text-[#111] shadow-lg transition-colors duration-300 dark:border-[#333] dark:bg-[#1a1a1a] dark:text-[#f5f5f5]"
            role="status"
            aria-live="polite"
          >
            {MESSAGE}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}
