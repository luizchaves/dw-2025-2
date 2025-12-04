import express from 'express';
import ping from 'ping';
import Host from './models/Host.js';

const router = express.Router();

// Host routes
router.post('/hosts', (req, res) => {
  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(400).json({ error: 'Name and address are required' });
  }

  const newHost = Host.create({ name, address });

  return res.status(201).json(newHost);
});

router.get('/hosts', (req, res) => {
  const hosts = Host.readAll();

  return res.json(hosts);
});

router.get('/hosts/:hostId', (req, res) => {
  const { hostId } = req.params;

  const host = Host.readById(hostId);

  if (!host) {
    return res.status(404).json({ error: 'Host not found' });
  }

  return res.json(host);
});

router.put('/hosts/:hostId', (req, res) => {
  const { name, address } = req.body;

  const { hostId } = req.params;

  if (!name || !address) {
    return res.status(400).json({ error: 'Name and address are required' });
  }

  const updatedHost = Host.update({ hostId, name, address });

  if (!updatedHost) {
    return res.status(404).json({ error: 'Host not found' });
  }
  return res.status(200).json(updatedHost);
});

router.delete('/hosts/:hostId', (req, res) => {
  const { hostId } = req.params;

  const removed = Host.remove(hostId);

  if (!removed) {
    return res.status(404).json({ error: 'Host not found' });
  }
  return res.status(204).send();
});

// Ping routes
router.post('/ping/:host', async (req, res) => {
  const { host } = req.params;

  const output = await ping.promise.probe(host, { min_reply: 3 });

  return res.send(output);
});

router.post('/ping/:host/count/:count', async (req, res) => {
  const { host, count } = req.params;

  const output = await ping.promise.probe(host, { min_reply: Number(count) });

  return res.send(output);
});

// Handling 404
router.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Handling 500
router.use((err, req, res, next) => {
  // console.error(err.stack);
  if (err.message === 'Unknown host') {
    return res.status(400).json({ error: 'Unknown host' });
  }

  res.status(500).json({ error: 'Internal Server Error' });
});

export default router;
