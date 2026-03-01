import * as fs from 'fs';
import * as path from 'path';
import { neon } from '@neondatabase/serverless';

export async function initDatabase() {
  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error('POSTGRES_URL is not set');
  }

  const sql = neon(connectionString);
  const migrationsDir = path.join(process.cwd(), 'app/db/migrations');

  if (!fs.existsSync(migrationsDir)) {
    throw new Error(`Migrations directory not found: ${migrationsDir}`);
  }

  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort();
  for (const file of files) {
    const content = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    const statements = content
      .split(';')
      .map((s) => s.trim().replace(/^--[^\n]*\n/gm, '').trim())
      .filter((s) => s.length > 0);
    for (const stmt of statements) {
      if (stmt) await sql(stmt + ';');
    }
  }

  console.log('✅ Database initialized successfully');
}
