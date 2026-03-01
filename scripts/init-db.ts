import '../app/lib/load-env';
import { initDatabase } from '../app/db/init';

initDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
