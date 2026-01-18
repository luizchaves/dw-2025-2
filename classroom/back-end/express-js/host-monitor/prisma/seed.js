import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/index.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Host from '../src/models/Hosts.js';

const dbUrl = process.env['DATABASE_URL'] ?? 'file:./dev.db';
const prisma = new PrismaClient({ adapter: new PrismaBetterSqlite3({ url: dbUrl }) });

async function main() {
  await Host.create({
    id: 'e4cfb6bb-4431-42a9-b660-d5701b2f49cd',
    name: 'Google DNS',
    address: '8.8.8.8',
    tags: ['DNS', 'Google'],
  });

  await Host.create({
    id: 'a2bb615a-6153-41bf-8cbe-0bfb538ce511',
    name: 'Google Search',
    address: 'www.google.com',
    tags: ['Motor de Busca', 'Google'],
  });
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
