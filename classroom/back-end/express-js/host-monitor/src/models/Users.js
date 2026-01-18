import bcrypt from 'bcrypt';
import prisma from '../database/database.js';

const saltRounds = parseInt(process.env.BCRYPT_SALT ?? '10', 10);

async function create({ name, email, password }) {
  const hash = await bcrypt.hash(password, saltRounds);

  const data = { name, email, password: hash };

  try {
    const createdUser = await prisma.user.create({
      data,
    });

    return createdUser;
  } catch (err) {
    // rethrow to let route error handler decide response
    throw err;
  }
}

async function read(where) {
  const users = await prisma.user.findMany({
    where,
  });

  if (users.length === 1 && where) {
    return users[0];
  }

  return users;
}

async function readById(id) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

async function update({ id, name, email, password }) {
  const hash = await bcrypt.hash(password, saltRounds);

  const data = { name, email, password: hash };

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return updatedUser;
}

async function remove(id) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export default { create, read, readById, update, remove };
