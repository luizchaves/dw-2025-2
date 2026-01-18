import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/index.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const dbUrl = process.env['DATABASE_URL'] ?? 'file:./dev.db';
const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: dbUrl }),
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;
