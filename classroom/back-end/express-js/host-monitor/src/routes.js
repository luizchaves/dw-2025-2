import express from 'express';
import Host from './models/Hosts.js';
import Ping from './models/Pings.js';
import Tag from './models/Tags.js';
import { ping } from './lib/ping.js';

const router = express.Router();

// Host routes

/**
 * @swagger
 * /hosts:
 *   post:
 *     summary: Criar um novo host
 *     tags: [Host Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, address]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Google
 *               address:
 *                 type: string
 *                 example: google.com
 *     responses:
 *       201:
 *         description: Host criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Host'
 *       400:
 *         description: Name e address são obrigatórios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/hosts', async (req, res) => {
  const { name, address, tags } = req.body;

  if (!name || !address) {
    return res.status(400).json({ error: 'Name and address are required' });
  }

  const newHost = await Host.create({ name, address, tags });

  return res.status(201).json(newHost);
});

/**
 * @swagger
 * /hosts:
 *   get:
 *     summary: Listar todos os hosts
 *     tags: [Host Management]
 *     responses:
 *       200:
 *         description: Lista de todos os hosts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Host'
 */
router.get('/hosts', async (req, res) => {
  const hosts = await Host.read();

  return res.json(hosts);
});

/**
 * @swagger
 * /hosts/{hostId}:
 *   get:
 *     summary: Obter um host específico
 *     tags: [Host Management]
 *     parameters:
 *       - in: path
 *         name: hostId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do host
 *     responses:
 *       200:
 *         description: Host encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Host'
 *       404:
 *         description: Host não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/hosts/:hostId', async (req, res) => {
  const { hostId } = req.params;

  const host = await Host.readById(hostId);

  if (!host) {
    return res.status(404).json({ error: 'Host not found' });
  }

  return res.json(host);
});

/**
 * @swagger
 * /hosts/{hostId}:
 *   put:
 *     summary: Atualizar um host
 *     tags: [Host Management]
 *     parameters:
 *       - in: path
 *         name: hostId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do host
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, address]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Google
 *               address:
 *                 type: string
 *                 example: 8.8.8.8
 *     responses:
 *       200:
 *         description: Host atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Host'
 *       400:
 *         description: Name e address são obrigatórios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Host não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/hosts/:hostId', async (req, res) => {
  const { name, address, tags } = req.body;

  const { hostId } = req.params;

  if (!name || !address) {
    return res.status(400).json({ error: 'Name and address are required' });
  }

  const updatedHost = await Host.update({ id: hostId, name, address, tags });

  if (!updatedHost) {
    return res.status(404).json({ error: 'Host not found' });
  }
  return res.status(200).json(updatedHost);
});

/**
 * @swagger
 * /hosts/{hostId}:
 *   delete:
 *     summary: Deletar um host
 *     tags: [Host Management]
 *     parameters:
 *       - in: path
 *         name: hostId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do host
 *     responses:
 *       204:
 *         description: Host deletado com sucesso
 *       404:
 *         description: Host não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/hosts/:hostId', async (req, res) => {
  const { hostId } = req.params;

  const removed = await Host.remove(hostId);

  if (!removed) {
    return res.status(404).json({ error: 'Host not found' });
  }
  return res.status(204).send();
});

// Ping routes

/**
 * @swagger
 * /hosts/{hostId}/pings/{count}:
 *   post:
 *     summary: Criar um ping para um host específico
 *     tags: [Ping Management]
 *     parameters:
 *       - in: path
 *         name: hostId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do host
 *       - in: path
 *         name: count
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número de pacotes ICMP a serem enviados
 *     responses:
 *       200:
 *         description: Ping criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ping'
 *       400:
 *         description: Erro ao criar ping para o host
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/hosts/:hostId/pings/:count', async (req, res) => {
  const { hostId, count } = req.params;

  try {
    const host = await Host.readById(hostId);

    const pingResult = await ping(host.address, count);

    const createdPing = await Ping.create({ ...pingResult, host });

    return res.json(createdPing);
  } catch (error) {
    throw new HttpError('Unable to create a ping for a host');
  }
});

/**
 * @swagger
 * /hosts/{hostId}/pings:
 *   get:
 *     summary: Listar todos os pings de um host específico
 *     tags: [Ping Management]
 *     parameters:
 *       - in: path
 *         name: hostId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do host
 *     responses:
 *       200:
 *         description: Lista de pings do host
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ping'
 *       400:
 *         description: Erro ao ler pings do host
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/hosts/:hostId/pings', async (req, res) => {
  const { hostId: id } = req.params;

  try {
    const pings = await Ping.read({ host: { id } });

    return res.json(pings);
  } catch (error) {
    throw new HttpError('Unable to read pings by host');
  }
});

/**
 * @swagger
 * /pings:
 *   get:
 *     summary: Listar todos os pings
 *     tags: [Ping Management]
 *     responses:
 *       200:
 *         description: Lista de todos os pings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ping'
 *       400:
 *         description: Erro ao ler pings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/pings', async (req, res) => {
  try {
    const pings = await Ping.read();

    return res.json(pings);
  } catch (error) {
    throw new HttpError('Unable to read pings');
  }
});

// Tags routes

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Listar todas as tags
 *     tags: [Tag Management]
 *     responses:
 *       200:
 *         description: Lista de todas as tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       400:
 *         description: Erro ao ler tags
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.read();

    return res.json(tags);
  } catch (error) {
    throw new HttpError('Unable to read tags');
  }
});

/**
 * @swagger
 * /tags/{tag}/hosts:
 *   get:
 *     summary: Listar todos os hosts associados a uma tag específica
 *     tags: [Tag Management]
 *     parameters:
 *       - in: path
 *         name: tag
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da tag
 *     responses:
 *       200:
 *         description: Lista de hosts associados à tag
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Host'
 *       400:
 *         description: Erro ao ler hosts por tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/tags/:tag/hosts', async (req, res) => {
  const { tag } = req.params;

  try {
    const hosts = await Host.read({ tags: tag });

    return res.json(hosts);
  } catch (error) {
    throw new HttpError('Unable to read hosts by tag');
  }
});

// Handling 404
router.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Handling 500
router.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.message === 'Unknown host') {
    return res.status(400).json({ error: 'Unknown host' });
  }

  res.status(500).json({ error: 'Internal Server Error' });
});

export default router;
