import path from 'path';
import { config } from 'dotenv';

const root = path.resolve(
  process.cwd(),
  process.cwd().endsWith('lib') ? '../..' : '.'
);
config({ path: path.join(root, '.env') });
