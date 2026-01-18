import prisma from '../database/database.js';

async function create({ id, name, address, tags }) {
  const data = id ? { id, name, address } : { name, address };

  if (tags?.length) {
    data.tags = {
      create: tags.map((tag) => ({
        tag: {
          connectOrCreate: {
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          },
        },
      })),
    };
  }

  const createdHost = await prisma.host.create({
    data,
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  // Normalize tags to array of tag names
  createdHost.tags = createdHost.tags?.map((t) => t.tag.name) ?? [];

  return createdHost;
}

async function read(where = {}) {
  if (where?.name) {
    where.name = {
      contains: where.name,
    };
  }

  if (where?.tags) {
    where.tags = {
      some: {
        tag: {
          name: {
            contains: where.tags,
          },
        },
      },
    };
  }

  const hosts = await prisma.host.findMany({
    where,
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  // Normalize tags for each host to array of tag names
  const normalized = hosts.map((h) => {
    h.tags = h.tags?.map((t) => t.tag.name) ?? [];
    return h;
  });

  if (normalized.length === 1 && where) {
    return normalized[0];
  }

  return normalized;
}

async function readById(id) {
  const host = await prisma.host.findUnique({
    where: {
      id,
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (host) {
    host.tags = host.tags?.map((t) => t.tag.name) ?? [];
  }

  return host;
}

async function update({ id, name, address, tags }) {
  const data = { id, name, address };

  if (tags?.length) {
    // remove existing tag relations to avoid unique constraint violations
    await prisma.tagsOnHosts.deleteMany({ where: { hostId: id } });

    data.tags = {
      create: tags.map((tag) => ({
        tag: {
          connectOrCreate: {
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          },
        },
      })),
    };
  }

  const updatedHost = await prisma.host.update({
    where: {
      id,
    },
    data,
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  // Normalize tags to array of tag names
  updatedHost.tags = updatedHost.tags?.map((t) => t.tag.name) ?? [];

  return updatedHost;
}

async function remove(id) {
  await prisma.host.delete({
    where: {
      id,
    },
  });
}

export default { create, read, readById, update, remove };
