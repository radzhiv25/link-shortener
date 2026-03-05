'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Copy, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
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

export default function DashboardPage() {
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
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">My links</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your short links and see how they perform.
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/">Create short link</Link>
        </Button>
      </div>

      {error && (
        <div className="rounded-none border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-14 w-full rounded-none" />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : links.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-none bg-muted p-4">
              <Copy className="size-8 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-medium">No links yet</h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Create your first short link from the home page, then manage it here.
            </p>
            <Button asChild className="mt-6">
              <Link href="/">Create short link</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop: table */}
          <Card className="hidden overflow-hidden md:block">
            <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-medium">Short link</TableHead>
                  <TableHead className="font-medium">Destination</TableHead>
                  <TableHead className="font-medium">Expires</TableHead>
                  <TableHead className="font-medium">Clicks</TableHead>
                  <TableHead className="w-[140px] font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link) => (
                  <TableRow key={link.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <a
                          href={`${BASE_URL}/${link.short_code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                          /{link.short_code}
                        </a>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => copyShortUrl(link)}
                        >
                          <Copy className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate text-muted-foreground" title={link.original_url}>
                      {link.original_url}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {link.expires_at
                        ? format(new Date(link.expires_at), 'MMM d, yyyy')
                        : '—'}
                    </TableCell>
                    <TableCell>
                      <span className="tabular-nums font-medium">{link.clicks}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1.5">
                        <Button variant="outline" size="sm" onClick={() => openEdit(link)}>
                          <Pencil className="size-3.5" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
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
            </CardContent>
          </Card>

          {/* Mobile: cards */}
          <div className="space-y-3 md:hidden">
            {links.map((link) => (
              <Card key={link.id} className="overflow-hidden transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <a
                      href={`${BASE_URL}/${link.short_code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-0 flex-1 font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {BASE_URL}/{link.short_code}
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0"
                      onClick={() => copyShortUrl(link)}
                    >
                      <Copy className="size-4" />
                    </Button>
                  </div>
                  <p className="mt-1 truncate text-sm text-muted-foreground" title={link.original_url}>
                    {link.original_url}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>{link.expires_at ? format(new Date(link.expires_at), 'MMM d, yyyy') : 'No expiry'}</span>
                    <span className="tabular-nums">{link.clicks} clicks</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(link)}>
                      <Pencil className="size-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                      onClick={() => handleDelete(link)}
                    >
                      <Trash2 className="size-3.5" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit short link</DialogTitle>
            <DialogDescription>Change the slug or expiry date.</DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Custom slug</Label>
                <Input
                  value={editSlug}
                  onChange={(e) => setEditSlug(e.target.value)}
                  placeholder="my-custom-slug"
                />
                <p className="text-xs text-muted-foreground">
                  Letters, numbers, _ and - only (1–20 chars)
                </p>
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
                      {editExpires
                        ? format(editExpires, 'PPP')
                        : 'Pick a date'}
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
          <DialogFooter>
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
