import './load-env';
import { db, redis } from './db';

async function testConnections() {
  try {
    // Test PostgreSQL
    const pgResult = await db`SELECT NOW()`;
    console.log('✅ PostgreSQL connected:', pgResult);
    
    // Test Redis
    await redis.set('test', 'hello');
    const redisResult = await redis.get('test');
    console.log('✅ Redis connected:', redisResult);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error);
    process.exit(1);
  }
}

testConnections();