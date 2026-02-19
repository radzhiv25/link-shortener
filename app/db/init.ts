import { sql } from '@vercel/postgres';
import * as fs from 'fs';
import * as path from 'path';

export async function initDatabase() {
  try {
    const schemaPath = path.join(process.cwd(), 'app/db/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await sql.query(schema);
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}