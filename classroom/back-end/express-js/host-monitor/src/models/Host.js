import Database from '../database/database.js';

async function create({ name, address }) {
  const db = Database.connect();

  const insertStmt = db.prepare('INSERT INTO hosts (name, address) VALUES (?, ?)');
  insertStmt.run(name, address);

  const idStmt = db.prepare('SELECT last_insert_rowid() as id');
  const result = idStmt.get();
  const lastID = result.id;

  db.close();

  return await readById(lastID);
}

async function read(where) {
  const db = Database.connect();

  if (where) {
    const field = Object.keys(where)[0];
    const value = where[field];

    const sql = `
      SELECT * FROM hosts
      WHERE ${field} LIKE ?
    `;

    const stmt = db.prepare(sql);
    const hosts = stmt.all(`%${value}%`);

    db.close();

    return hosts;
  }

  const sql = `SELECT * FROM hosts`;
  const stmt = db.prepare(sql);
  const hosts = stmt.all();

  db.close();

  return hosts;
}

async function readById(id) {
  const db = Database.connect();

  const sql = `SELECT * FROM hosts WHERE id = ?`;
  const stmt = db.prepare(sql);
  const host = stmt.get(id);

  db.close();

  return host;
}

async function update({ id, name, address }) {
  const db = Database.connect();

  const sql = `UPDATE hosts SET name = ?, address = ? WHERE id = ?`;
  const stmt = db.prepare(sql);
  stmt.run(name, address, id);

  db.close();

  const result = await readById(id);
  if (!result) {
    throw new Error('Host not found');
  }
  return result;
}

async function remove(id) {
  const db = Database.connect();

  const sql = `DELETE FROM hosts WHERE id = ?`;
  const stmt = db.prepare(sql);
  stmt.run(id);

  db.close();

  return true;
}

export default { create, read, readById, update, remove };
