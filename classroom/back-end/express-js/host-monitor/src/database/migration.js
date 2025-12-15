import Database from './database.js';

function up() {
  const db = Database.connect();

  const hostsSql = `
    CREATE TABLE hosts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      address VARCHAR(100) NOT NULL
    )
  `;

  db.exec(hostsSql);

  db.close();
}

function down() {
  const db = Database.connect();

  const hostsSql = `
    DROP TABLE hosts
  `;

  db.exec(hostsSql);

  db.close();
}

export default { up, down };
