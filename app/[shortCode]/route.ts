import { NextRequest, NextResponse } from 'next/server';
import { getOriginalUrl, recordClick } from '@/app/lib/links';

const RESERVED = new Set(['api', 'shorten', 'login', 'register', 'dashboard', '_next', 'favicon.ico']);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  if (RESERVED.has(shortCode)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const originalUrl = await getOriginalUrl(shortCode);
  if (!originalUrl) {
    return new NextResponse('Not found', { status: 404 });
  }

  await recordClick(shortCode, request);

  return NextResponse.redirect(originalUrl, 307);
}
