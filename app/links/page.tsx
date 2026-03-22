'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Copy, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type LinkRow = {
  id: number;
  short_code: string;
  original_url: string;
  created_at: string;
  expires_at: string | null;
  custom_slug: boolean;
  clicks: number;
  user_id: string | null;
};

const BASE_URL = typeof window !== 'undefined' ? `${window.location.origin}` : '';

export default function LinksPage() {
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<LinkRow | null>(null);
  const [editSlug, setEditSlug] = useState('');
  const [editExpires, setEditExpires] = useState<Date | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchLinks = useCallback(async () => {
    try {
      const res = await fetch('/api/links');
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setLinks(data);
    } catch {
      setError('Failed to load links');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  function openEdit(link: LinkRow) {
    setEditing(link);
    setEditSlug(link.short_code);
    setEditExpires(link.expires_at ? new Date(link.expires_at) : null);
    setError('');
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/links/${editing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shortCode: editSlug.trim() || undefined,
          expiresAt: editExpires ? editExpires.toISOString() : null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? 'Failed to update');
        return;
      }
      setEditing(null);
      fetchLinks();
    } catch {
      setError('Failed to update');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(link: LinkRow) {
    if (!confirm('Delete this short link?')) return;
    try {
      const res = await fetch(`/api/links/${link.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      setEditing(null);
      fetchLinks();
    } catch {
      setError('Failed to delete');
    }
  }

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  async function copyShortUrl(link: LinkRow) {
    const url = `${BASE_URL}/${link.short_code}`;
    await navigator.clipboard.writeText(url).catch(() => {});
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">My links</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Short URLs you’ve created — copy, edit, or remove.
          </p>
        </div>
        <Button asChild className="w-full shrink-0 sm:w-auto">
          <Link href="/create">New link</Link>
        </Button>
      </header>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </div>
      ) : links.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border py-16 text-center">
          <p className="text-sm font-medium text-foreground">No links yet</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Create a short link first — it will show up here.
          </p>
          <Button asChild className="mt-6">
            <Link href="/create">Create a link</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-md border border-border md:block">
            <Table>
              <TableHeader>
                <TableRow className="border-b hover:bg-transparent">
                  <TableHead className="h-11 font-medium">Short</TableHead>
                  <TableHead className="font-medium">Destination</TableHead>
                  <TableHead className="w-[110px] font-medium">Expires</TableHead>
                  <TableHead className="w-[72px] font-medium">Clicks</TableHead>
                  <TableHead className="w-[120px] text-right font-medium"> </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link) => (
                  <TableRow key={link.id} className="group border-b last:border-0">
                    <TableCell className="align-middle font-medium">
                      <div className="flex items-center gap-1">
                        <a
                          href={`${BASE_URL}/${link.short_code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          /{link.short_code}
                        </a>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => copyShortUrl(link)}
                          aria-label="Copy short URL"
                        >
                          <Copy className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[min(280px,32vw)] truncate align-middle text-muted-foreground" title={link.original_url}>
                      {link.original_url}
                    </TableCell>
                    <TableCell className="align-middle text-muted-foreground text-sm">
                      {link.expires_at ? format(new Date(link.expires_at), 'MMM d, yyyy') : '—'}
                    </TableCell>
                    <TableCell className="align-middle">
                      <span className="tabular-nums text-sm font-medium">{link.clicks}</span>
                    </TableCell>
                    <TableCell className="text-right align-middle">
                      <div className="flex justify-end gap-1">
                        <Button variant="outline" size="sm" className="h-8 gap-1 px-2" onClick={() => openEdit(link)}>
                          <Pencil className="size-3.5" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDelete(link)}
                        >
                          <Trash2 className="size-3.5" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2 md:hidden">
            {links.map((link) => (
              <div key={link.id} className="rounded-md border border-border p-4">
                <div className="flex items-start justify-between gap-2">
                  <a
                    href={`${BASE_URL}/${link.short_code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 flex-1 break-all text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    /{link.short_code}
                  </a>
                  <Button variant="ghost" size="icon" className="size-8 shrink-0" onClick={() => copyShortUrl(link)} aria-label="Copy">
                    <Copy className="size-4" />
                  </Button>
                </div>
                <p className="mt-2 line-clamp-2 break-all text-xs text-muted-foreground" title={link.original_url}>
                  {link.original_url}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{link.expires_at ? format(new Date(link.expires_at), 'MMM d') : '—'}</span>
                  <span className="tabular-nums">{link.clicks} clicks</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(link)}>
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(link)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit link</DialogTitle>
            <DialogDescription>Change the slug or expiry.</DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={editSlug}
                  onChange={(e) => setEditSlug(e.target.value)}
                  placeholder="my-custom-slug"
                />
                <p className="text-xs text-muted-foreground">Letters, numbers, _ and - only (1–20 chars)</p>
              </div>
              <div className="space-y-2">
                <Label>Expires (optional, max 30 days from today)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !editExpires && 'text-muted-foreground'
                      )}
                    >
                      {editExpires ? format(editExpires, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={editExpires ?? undefined}
                      onSelect={(d) => setEditExpires(d ?? null)}
                      disabled={(d) => d < minDate || d > maxDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
