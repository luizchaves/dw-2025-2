import express from 'express';
import ping from 'ping';
import Host from './models/Host.js';

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
  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(400).json({ error: 'Name and address are required' });
  }

  const newHost = await Host.create({ name, address });

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
  const { name, address } = req.body;

  const { hostId } = req.params;

  if (!name || !address) {
    return res.status(400).json({ error: 'Name and address are required' });
  }

  const updatedHost = await Host.update({ hostId, name, address });

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
 * /ping/{host}:
 *   post:
 *     summary: Executar ping com 3 tentativas padrão
 *     tags: [Ping Operations]
 *     parameters:
 *       - in: path
 *         name: host
 *         schema:
 *           type: string
 *         required: true
 *         description: Endereço ou IP do host a ser testado
 *         example: google.com
 *     responses:
 *       200:
 *         description: Resultado do ping
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PingResult'
 *       400:
 *         description: Host desconhecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/ping/:host', async (req, res) => {
  const { host } = req.params;

  const output = await ping.promise.probe(host, { min_reply: 3 });

  return res.send(output);
});

/**
 * @swagger
 * /ping/{host}/count/{count}:
 *   post:
 *     summary: Executar ping com quantidade de tentativas customizável
 *     tags: [Ping Operations]
 *     parameters:
 *       - in: path
 *         name: host
 *         schema:
 *           type: string
 *         required: true
 *         description: Endereço ou IP do host a ser testado
 *         example: google.com
 *       - in: path
 *         name: count
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número de tentativas de ping
 *         example: 5
 *     responses:
 *       200:
 *         description: Resultado do ping
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PingResult'
 *       400:
 *         description: Host desconhecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
  console.error(err.stack);
  if (err.message === 'Unknown host') {
    return res.status(400).json({ error: 'Unknown host' });
  }

  res.status(500).json({ error: 'Internal Server Error' });
});

export default router;
