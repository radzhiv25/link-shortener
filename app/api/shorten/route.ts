import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createShortLink } from '@/app/lib/links';

export async function POST(request: Request) {
  try {
    const session = await auth();
    const body = await request.json();
    const url = typeof body?.url === 'string' ? body.url.trim() : '';
    const customSlug = typeof body?.customSlug === 'string' ? body.customSlug.trim() || undefined : undefined;
    const expiresInDays = typeof body?.expiresInDays === 'number' ? body.expiresInDays : undefined;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    if (customSlug && !session?.user?.id) {
      return NextResponse.json({ error: 'Sign in to use a custom slug' }, { status: 401 });
    }

    const { shortCode, shortUrl } = await createShortLink(url, {
      userId: session?.user?.id ?? null,
      customSlug: customSlug ?? null,
      expiresInDays,
    });
    return NextResponse.json({ shortCode, shortUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to shorten URL';
    if (message === 'Invalid URL' || message.startsWith('Invalid slug') || message === 'Slug already in use') {
      return NextResponse.json({ error: message }, { status: 400 });
    }
    console.error('Shorten error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
