'use client';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t border-[#e5e5e5] bg-white/95 py-4 backdrop-blur-sm transition-colors duration-300 dark:border-[#262626] dark:bg-black/95 md:left-1/2 md:w-[50vw] md:-translate-x-1/2 md:py-6">
      <div className="w-full px-4 text-center text-xs text-[#737373] transition-colors duration-300 dark:text-[#525252] sm:px-6">
        Minimal link shortener. Create an account for your dashboard.
      </div>
    </footer>
  );
}
