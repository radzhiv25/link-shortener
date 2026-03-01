import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { updateLink, deleteLink } from '@/app/lib/links';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  try {
    const body = await request.json();
    const shortCode = typeof body?.shortCode === 'string' ? body.shortCode.trim() || undefined : undefined;
    const expiresAt = body?.expiresAt != null
      ? (body.expiresAt ? new Date(body.expiresAt) : null)
      : undefined;
    await updateLink(id, session.user.id, { shortCode, expiresAt });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update';
    if (message === 'Not found') return NextResponse.json({ error: message }, { status: 404 });
    if (message.startsWith('Invalid slug') || message === 'Slug already in use') {
      return NextResponse.json({ error: message }, { status: 400 });
    }
    console.error('Update link error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  try {
    await deleteLink(id, session.user.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof Error && err.message === 'Not found') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    console.error('Delete link error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
