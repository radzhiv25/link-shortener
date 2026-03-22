'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useToast } from '@/components/Toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DEFAULT_EXPIRY_DAYS = 7;
const MAX_EXPIRY_DAYS = 30;

export default function CreatePage() {
  const showToast = useToast();
  const { data: session } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [expiresInDays, setExpiresInDays] = useState(DEFAULT_EXPIRY_DAYS);

  const hasLink = url.trim().length > 0;

  const handleShorten = async () => {
    if (isProcessing || !hasLink) return;
    const originalUrl = url.trim();
    setIsProcessing(true);
    try {
      const body: { url: string; customSlug?: string; expiresInDays?: number } = { url: originalUrl };
      if (session?.user && customSlug.trim()) body.customSlug = customSlug.trim();
      if (session?.user && expiresInDays >= 1 && expiresInDays <= MAX_EXPIRY_DAYS) body.expiresInDays = expiresInDays;
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast(data?.error ?? 'Something went wrong');
        return;
      }
      const shortUrl = data.shortUrl as string | undefined;
      if (shortUrl) {
        await navigator.clipboard.writeText(shortUrl).catch(() => {});
        showToast(`Short link copied: ${shortUrl}`);
      } else {
        showToast('Short link created.');
      }
    } catch {
      showToast('Something went wrong');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111] transition-colors duration-300 dark:bg-black dark:text-[#f5f5f5]">
      <Navbar />
      <div className="mx-auto flex w-full flex-1 flex-col md:w-[50vw] md:max-w-[50vw]">
        <main className="w-full flex-1 px-4 pb-24 pt-24 sm:px-6 sm:pb-28 sm:pt-32">
          <section>
            <motion.h1
              className="text-2xl font-semibold tracking-tight text-[#111] transition-colors duration-300 sm:text-3xl dark:text-[#f5f5f5]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              Create a short link
            </motion.h1>
            <motion.p
              className="mt-2 max-w-lg text-sm leading-relaxed text-[#555] transition-colors duration-300 dark:text-[#a3a3a3]"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.35 }}
            >
              Paste a long URL below. Signed-in users can set a custom slug and expiry (1–30 days).
            </motion.p>

            <motion.div
              className="mt-8 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/very/long/path"
                  className="w-full rounded-md border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-sm text-[#111] placeholder-[#999] transition-colors duration-300 focus:border-[#111] focus:outline-none focus:ring-1 focus:ring-[#111] dark:border-[#333] dark:bg-[#0a0a0a] dark:text-[#f5f5f5] dark:placeholder-[#666] dark:focus:border-[#f5f5f5] dark:focus:ring-[#f5f5f5]"
                  aria-label="Long URL to shorten"
                />
                <button
                  type="button"
                  onClick={handleShorten}
                  disabled={isProcessing || !hasLink}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#111] px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#f5f5f5] dark:text-[#111] dark:hover:bg-[#e5e5e5] dark:disabled:opacity-60"
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
              {session?.user && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="custom-slug" className="text-xs text-[#666] dark:text-[#a3a3a3]">
                      Custom slug (optional)
                    </Label>
                    <Input
                      id="custom-slug"
                      placeholder="my-link"
                      value={customSlug}
                      onChange={(e) => setCustomSlug(e.target.value)}
                      className="rounded-md border-[#e5e5e5] bg-[#fafafa] dark:border-[#333] dark:bg-[#0a0a0a]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="expiry" className="text-xs text-[#666] dark:text-[#a3a3a3]">
                      Expires in (days, 1–30)
                    </Label>
                    <Input
                      id="expiry"
                      type="number"
                      min={1}
                      max={MAX_EXPIRY_DAYS}
                      value={expiresInDays}
                      onChange={(e) =>
                        setExpiresInDays(Math.min(MAX_EXPIRY_DAYS, Math.max(1, Number(e.target.value) || 7)))
                      }
                      className="rounded-md border-[#e5e5e5] bg-[#fafafa] dark:border-[#333] dark:bg-[#0a0a0a]"
                    />
                  </div>
                </div>
              )}
              <p className="text-xs text-[#888] transition-colors duration-300 dark:text-[#737373]">
                {session?.user ? (
                  <>
                    Manage links in{' '}
                    <Link href="/links" className="underline underline-offset-2 hover:text-[#111] dark:hover:text-[#f5f5f5]">
                      My links
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    <Link href="/register" className="underline underline-offset-2 hover:text-[#111] dark:hover:text-[#f5f5f5]">
                      Sign up
                    </Link>{' '}
                    for custom slugs, expiry, and a list of all your links.
                  </>
                )}
              </p>
            </motion.div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
