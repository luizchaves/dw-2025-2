import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Host from './models/Hosts.js';
import Ping from './models/Pings.js';
import Tag from './models/Tags.js';
import User from './models/Users.js';
import { ping } from './lib/ping.js';
import { isAuthenticated } from './middleware/auth.js';

const router = express.Router();

class HttpError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.code = code;
  }
}

// Host routes

/**
 * @swagger
 * /hosts:
 *   post:
 *     summary: Criar um novo host
 *     tags: [Host Management]
 *     security:
 *       - bearerAuth: []
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
router.post('/hosts', isAuthenticated, async (req, res) => {
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
 *     security:
 *       - bearerAuth: []
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
router.get('/hosts', isAuthenticated, async (req, res) => {
  const hosts = await Host.read();

  return res.json(hosts);
});

/**
 * @swagger
 * /hosts/{hostId}:
 *   get:
 *     summary: Obter um host específico
 *     tags: [Host Management]
 *     security:
 *       - bearerAuth: []
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
router.get('/hosts/:hostId', isAuthenticated, async (req, res) => {
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
 *     security:
 *       - bearerAuth: []
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
router.put('/hosts/:hostId', isAuthenticated, async (req, res) => {
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
 *     security:
 *       - bearerAuth: []
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
router.delete('/hosts/:hostId', isAuthenticated, async (req, res) => {
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
 *     security:
 *       - bearerAuth: []
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
router.post('/hosts/:hostId/pings/:count', isAuthenticated, async (req, res) => {
  const { hostId, count } = req.params;

  try {
    const host = await Host.readById(hostId);

    const userId = req.userId;

    const pingResult = await ping(host.address, count);

    const createdPing = await Ping.create({ ...pingResult, host, userId });

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
 *     security:
 *       - bearerAuth: []
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
router.get('/hosts/:hostId/pings', isAuthenticated, async (req, res) => {
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
 *     security:
 *       - bearerAuth: []
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
router.get('/pings', isAuthenticated, async (req, res) => {
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
 *     security:
 *       - bearerAuth: []
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
router.get('/tags', isAuthenticated, async (req, res) => {
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
 *     security:
 *       - bearerAuth: []
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
router.get('/tags/:tag/hosts', isAuthenticated, async (req, res) => {
  const { tag } = req.params;

  try {
    const hosts = await Host.read({ tags: tag });

    return res.json(hosts);
  } catch (error) {
    throw new HttpError('Unable to read hosts by tag');
  }
});

// User routes

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *      201:
 *        description: Usuário criado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Erro ao criar usuário
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new HttpError('Error when passing parameters');
  }

  try {
    const createdUser = await User.create({ name, email, password });

    delete createdUser.password;

    res.status(201).json(createdUser);
  } catch (error) {
    console.error('User create error:', error);
    if (
      error.message.toLowerCase().includes('unique') &&
      error.message.toLowerCase().includes('email')
    ) {
      throw new HttpError('Email already in use');
    }

    throw new HttpError('Unable to create a user');
  }
});

/**
 * * @swagger
 * /users/me:
 *   get:
 *     summary: Obter informações do usuário autenticado
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro ao encontrar usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/users/me', isAuthenticated, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.readById(userId);

    delete user.password;

    return res.json(user);
  } catch (error) {
    throw new HTTPError('Unable to find user', 400);
  }
});

/** * @swagger
 * /signin:
 *   post:
 *     summary: Autenticar usuário e obter token JWT
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { id: userId, password: hash } = await User.read({ email });

    const match = await bcrypt.compare(password, hash);

    if (match) {
      const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: 3600 } // 1h
      );

      return res.json({ auth: true, token });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(401).json({ error: 'User not found' });
  }
});

// Handling 404
router.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Handling 500
router.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof HttpError) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  if (err.message === 'Unknown host') {
    return res.status(400).json({ error: 'Unknown host' });
  }

  res.status(500).json({ error: 'Internal Server Error' });
});

export default router;
