import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { listLinksByUser } from '@/app/lib/links';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const links = await listLinksByUser(session.user.id);
    return NextResponse.json(links);
  } catch (err) {
    console.error('List links error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
