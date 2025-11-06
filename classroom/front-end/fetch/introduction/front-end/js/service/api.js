const API_URL = 'http://localhost:3000';

export async function createHost(data) {
  const path = `${API_URL}/hosts`;

  const option = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  const response = await fetch(path, option);

  const createdHost = await response.json();

  return createdHost;
}

export async function readHosts() {
  const path = `${API_URL}/hosts`;

  const response = await fetch(path);

  const hosts = await response.json();

  return hosts;
}

export async function readHostById(id) {
  const path = `${API_URL}/hosts/${id}`;

  const response = await fetch(path);

  const host = await response.json();

  return host;
}

export async function updateHost(id, data) {
  const path = `${API_URL}/hosts/${id}`;

  const option = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  const response = await fetch(path, option);

  const updatedHost = await response.json();

  return updatedHost;
}

export async function deleteHost(id) {
  const path = `${API_URL}/hosts/${id}`;

  const option = {
    method: 'delete'
  };

  const response = await fetch(path, option);

  return response.ok;
}
