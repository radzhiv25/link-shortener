import { sql } from '@vercel/postgres';
import { Redis } from '@upstash/redis';

// PostgreSQL client
export const db = sql;

// Redis client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});