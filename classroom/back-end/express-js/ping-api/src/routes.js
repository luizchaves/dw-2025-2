import express from 'express';
import { pingHost } from './lib/ping.js';
import ping from 'ping';

const router = express.Router();

router.post('/ping/:host', async (req, res) => {
  const { host } = req.params;

  // const output = await pingHost(host);
  const output = await ping.promise.probe(host, { min_reply: 3 });

  res.send(output);
});

router.post('/ping/:host/count/:count', async (req, res) => {
  const { host, count } = req.params;

  // const output = await pingHost(host, count);
  const output = await ping.promise.probe(host, { min_reply: Number(count) });

  res.send(output);
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
