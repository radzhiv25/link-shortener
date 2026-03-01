import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { db } from '@/app/lib/db';

const SALT_ROUNDS = 10;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const name = typeof body?.name === 'string' ? body.name.trim() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const id = nanoid(24);

    await db`
      INSERT INTO users (id, email, name, password_hash)
      VALUES (${id}, ${email}, ${name || null}, ${password_hash})
    `;

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const pg = err && typeof err === 'object' && 'code' in err ? (err as { code: string }) : null;
    if (pg?.code === '23505') {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }
    if (pg?.code === '42P01') {
      console.error('Registration failed: users table missing. Run: npm run db:init', err);
      return NextResponse.json(
        { error: 'Database not set up. Please run: npm run db:init' },
        { status: 503 }
      );
    }
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Registration failed' }, { status: 400 });
  }
}
