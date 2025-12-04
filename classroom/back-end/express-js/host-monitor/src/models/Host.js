import { createId as cuid } from "@paralleldrive/cuid2";

import { hosts } from '../database/hosts.js';

function create({ name, address }) {
  const newHost = { id: cuid(), name, address };

  hosts.push(newHost);

  return newHost;
}

function readAll() {
  return hosts;
}

function readById(hostId) {
  return hosts.find((h) => h.id === hostId);
}

function update({ hostId, name, address }) {
  const hostIndex = hosts.findIndex((h) => h.id === hostId);

  if (hostIndex === -1) {
    return null;
  }

  hosts[hostIndex] = { id: hostId, name, address };

  return hosts[hostIndex];
}

function remove(hostId) {
  const hostIndex = hosts.findIndex((h) => h.id === hostId);

  if (hostIndex === -1) {
    return false;
  }

  hosts.splice(hostIndex, 1);
  return true;
}

export default { create, readAll, readById, update, remove };
