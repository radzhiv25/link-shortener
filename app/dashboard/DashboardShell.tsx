'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Menu, Link2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

type Props = {
  userEmail: string | null;
  userName: string | null;
};

export function DashboardShell({ userEmail, userName }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const nav = [
    { href: '/dashboard', label: 'My links', icon: Link2 },
    { href: '/', label: 'Create link', icon: PlusCircle },
  ];

  const NavContent = () => (
    <>
      <Link
        href="/dashboard"
        className="flex items-center gap-2 px-3 py-2 text-lg font-semibold tracking-tight text-foreground"
      >
        shrtnr
      </Link>
      <nav className="flex flex-col gap-0.5">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-3 rounded-none px-3 py-2.5 text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto border-t border-border pt-4">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-none bg-primary/10 text-sm font-medium text-primary">
            {(userName || userEmail || '?').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {userName || 'Account'}
            </p>
            <p className="truncate text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Sign out
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header */}
      <header className="flex h-14 items-center gap-2 border-b border-border bg-background px-4 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex w-72 flex-col gap-6 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-1 flex-col gap-6 px-4 py-6">
              <NavContent />
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/dashboard" className="text-lg font-semibold tracking-tight">
          shrtnr
        </Link>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="flex flex-1 flex-col gap-6 p-4">
          <NavContent />
        </div>
      </aside>
    </>
  );
}
