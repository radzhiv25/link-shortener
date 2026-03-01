import { nanoid } from 'nanoid';
import { db, redis } from './db';

const SHORT_CODE_LENGTH = 8;
const REDIS_PREFIX = 'short:';
const DEFAULT_EXPIRY_DAYS = 7;
const MAX_EXPIRY_DAYS = 30;

const SLUG_REGEX = /^[a-zA-Z0-9_-]{1,20}$/;

function isValidUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function clampExpiryDays(days: number): number {
  if (Number.isNaN(days) || days < 1) return DEFAULT_EXPIRY_DAYS;
  return Math.min(MAX_EXPIRY_DAYS, Math.max(1, Math.floor(days)));
}

export type CreateShortLinkOptions = {
  userId?: string | null;
  customSlug?: string | null;
  expiresInDays?: number;
};

export async function createShortLink(
  originalUrl: string,
  options: CreateShortLinkOptions = {}
): Promise<{ shortCode: string; shortUrl: string }> {
  const trimmed = originalUrl.trim();
  if (!trimmed || !isValidUrl(trimmed)) throw new Error('Invalid URL');

  const { userId = null, customSlug = null, expiresInDays = DEFAULT_EXPIRY_DAYS } = options;
  const days = clampExpiryDays(expiresInDays);
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  let shortCode: string;
  const isCustom = !!customSlug?.trim();

  if (isCustom) {
    const slug = customSlug!.trim();
    if (!SLUG_REGEX.test(slug)) throw new Error('Invalid slug: use letters, numbers, _ and - only (1–20 chars)');
    const existing = await db`SELECT 1 FROM urls WHERE short_code = ${slug} LIMIT 1`;
    if (existing.rows?.length) throw new Error('Slug already in use');
    shortCode = slug;
  } else {
    shortCode = nanoid(SHORT_CODE_LENGTH);
  }

  await db`
    INSERT INTO urls (short_code, original_url, user_id, expires_at, custom_slug)
    VALUES (${shortCode}, ${trimmed}, ${userId}, ${expiresAt.toISOString()}, ${isCustom})
  `;

  const ttlSeconds = Math.max(1, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
  await redis.set(`${REDIS_PREFIX}${shortCode}`, trimmed, { ex: ttlSeconds });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const shortUrl = `${baseUrl.replace(/\/$/, '')}/${shortCode}`;
  return { shortCode, shortUrl };
}

export async function getOriginalUrl(shortCode: string): Promise<string | null> {
  if (!shortCode || shortCode.length > 20) return null;

  const cached = await redis.get<string>(`${REDIS_PREFIX}${shortCode}`);
  if (cached) return cached;

  const result = await db`
    SELECT original_url FROM urls
    WHERE short_code = ${shortCode}
      AND (expires_at IS NULL OR expires_at > NOW())
    LIMIT 1
  `;
  const row = result.rows?.[0] as { original_url: string } | undefined;
  if (!row) return null;

  await redis.set(`${REDIS_PREFIX}${shortCode}`, row.original_url);
  return row.original_url;
}

/** Record a click for a short link (increment count + optional analytics row). */
export async function recordClick(
  shortCode: string,
  request?: { headers?: Headers }
): Promise<void> {
  try {
    await db`UPDATE urls SET clicks = clicks + 1 WHERE short_code = ${shortCode}`;

    const headers = request?.headers;
    const ip = headers?.get('x-forwarded-for')?.split(',')[0]?.trim()
      ?? headers?.get('x-real-ip')?.trim()
      ?? null;
    const userAgent = headers?.get('user-agent') ?? null;
    const referrer = headers?.get('referer') ?? headers?.get('referrer') ?? null;

    await db`
      INSERT INTO clicks (short_code, ip_address, user_agent, referrer)
      VALUES (${shortCode}, ${ip}, ${userAgent}, ${referrer})
    `;
  } catch (err) {
    console.error('recordClick error:', err);
  }
}

export type LinkRow = {
  id: number;
  short_code: string;
  original_url: string;
  created_at: Date;
  expires_at: Date | null;
  custom_slug: boolean;
  clicks: number;
  user_id: string | null;
};

export async function listLinksByUser(userId: string): Promise<LinkRow[]> {
  const result = await db`
    SELECT id, short_code, original_url, created_at, expires_at, custom_slug, clicks, user_id
    FROM urls
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
  return (result.rows ?? []) as LinkRow[];
}

export async function updateLink(
  id: number,
  userId: string,
  updates: { shortCode?: string; expiresAt?: Date | null }
): Promise<void> {
  const row = await db`SELECT short_code, user_id FROM urls WHERE id = ${id} LIMIT 1`;
  const existing = row.rows?.[0] as { short_code: string; user_id: string | null } | undefined;
  if (!existing || existing.user_id !== userId) throw new Error('Not found');

  const oldCode = existing.short_code;

  if (updates.shortCode !== undefined) {
    const slug = updates.shortCode.trim();
    if (!SLUG_REGEX.test(slug)) throw new Error('Invalid slug');
    const conflict = await db`SELECT 1 FROM urls WHERE short_code = ${slug} AND id != ${id} LIMIT 1`;
    if (conflict.rows?.length) throw new Error('Slug already in use');
    await db`UPDATE urls SET short_code = ${slug}, custom_slug = true WHERE id = ${id} AND user_id = ${userId}`;
    await redis.del(`${REDIS_PREFIX}${oldCode}`);
    await redis.del(`${REDIS_PREFIX}${slug}`);
  }

  if (updates.expiresAt !== undefined) {
    const exp = updates.expiresAt ? updates.expiresAt.toISOString() : null;
    await db`UPDATE urls SET expires_at = ${exp} WHERE id = ${id} AND user_id = ${userId}`;
  }

  if (updates.shortCode === undefined) await redis.del(`${REDIS_PREFIX}${oldCode}`);
}

export async function deleteLink(id: number, userId: string): Promise<void> {
  const row = await db`SELECT short_code, user_id FROM urls WHERE id = ${id} LIMIT 1`;
  const existing = row.rows?.[0] as { short_code: string; user_id: string | null } | undefined;
  if (!existing || existing.user_id !== userId) throw new Error('Not found');
  await db`DELETE FROM urls WHERE id = ${id} AND user_id = ${userId}`;
  await redis.del(`${REDIS_PREFIX}${existing.short_code}`);
}
