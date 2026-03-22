'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AuthPanelLogin } from './AuthPanelLogin';
import { AuthPanelRegister } from './AuthPanelRegister';

type Variant = 'login' | 'register';

type Props = {
  variant: Variant;
  children: ReactNode;
};

function AuthPanel({ variant }: { variant: Variant }) {
  return variant === 'login' ? <AuthPanelLogin /> : <AuthPanelRegister />;
}

export function AuthSplitShell({ variant, children }: Props) {

  return (
    <div className="min-h-screen bg-background md:grid md:min-h-0 md:grid-cols-2">
      <div className="flex min-h-screen flex-col md:min-h-screen">
        <div className="flex flex-1 flex-col justify-center px-6 py-12 md:px-10 lg:px-14">
          <div className="mx-auto w-full max-w-md">{children}</div>
        </div>
        {/* Mobile: same animated panel */}
        <div className="auth-split-panel-grid border-t border-zinc-800 bg-zinc-950 px-4 pb-8 pt-8 md:hidden">
          <div className="mx-auto flex max-w-md flex-col items-center justify-center" aria-hidden>
            <AuthPanel variant={variant} />
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="text-[11px] text-zinc-500 transition-colors hover:text-zinc-300"
            >
              ← shrtnr
            </Link>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'relative hidden flex-col justify-center overflow-hidden border-l border-zinc-800 bg-zinc-950 md:flex',
          'auth-split-panel-grid'
        )}
        aria-hidden
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-900/80 via-transparent to-zinc-950" />
        <div className="relative flex flex-1 flex-col items-center justify-center px-8 py-16">
          <AuthPanel variant={variant} />
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <Link
            href="/"
            className="text-[11px] text-zinc-500 transition-colors hover:text-zinc-300"
          >
            ← shrtnr
          </Link>
        </div>
      </div>
    </div>
  );
}
