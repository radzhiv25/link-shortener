import { neon } from '@neondatabase/serverless';
import { Redis } from '@upstash/redis';

// PostgreSQL client (Neon) – fullResults for .rows compatibility
const sql = neon(process.env.POSTGRES_URL!, { fullResults: true });
export const db = sql;

// Redis client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
