'use client';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-1/2 w-[50vw] -translate-x-1/2 border-t border-[#e5e5e5] bg-white/95 py-6 backdrop-blur-sm transition-colors duration-300 dark:border-[#262626] dark:bg-black/95">
      <div className="w-full px-6 text-center text-xs text-[#737373] transition-colors duration-300 dark:text-[#525252]">
        Minimal link shortener. No tracking, no accounts.
      </div>
    </footer>
  );
}
