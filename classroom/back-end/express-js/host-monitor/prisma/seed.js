import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/index.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const dbUrl = process.env['DATABASE_URL'] ?? 'file:./dev.db';
const prisma = new PrismaClient({ adapter: new PrismaBetterSqlite3({ url: dbUrl }) });

async function main() {
  const file = resolve('prisma', 'seeders.json');

  const seed = JSON.parse(readFileSync(file));

  for (const host of seed.hosts) {
    await prisma.host.create({
      data: host,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
