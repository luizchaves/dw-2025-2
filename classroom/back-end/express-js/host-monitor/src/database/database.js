import { resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const dbFile = resolve('src', 'database', 'db.sqlite');

function connect() {
  return new DatabaseSync(dbFile);
}

export default { connect };
