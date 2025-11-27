import { Router } from 'express';

const router = Router();

class HttpError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

router.get('/', (req, res) => {
  return res.send('Hello, World!');
});

router.get('/pt', (req, res) => {
  return res.json({ message: 'Olá, Mundo!' });
});

router.get('/en', (req, res) => {
  return res.json({ message: 'Hello, World!' });
});

// Query string / Query parameters
// GET /api/hello/pt?name=Luiz
router.get('/hello/pt', (req, res) => {
  const { name } = req.query;

  if (!name) {
    throw new HttpError('The name parameter is required.');
  }

  return res.json({ message: `Olá, ${name}!` });
});

// Route parameters
// GET /api/hello/en/Luiz
// GET /api/hello/en/IFPB
router.get('/hello/en/:name', (req, res) => {
  const { name } = req.params;

  if (!name) {
    throw new HttpError('The name parameter is required.');
  }

  return res.json({ message: `Hello, ${name}!` });
});

// Body parameters (JSON)
router.post('/hello/es', (req, res) => {
  if (req.body == null) {
    throw new HttpError('Request body is required.');
  }

  const { name } = req.body;

  if (!name) {
    throw new HttpError('The name parameter is required.');
  }

  return res.json({ message: `¡Hola, ${name}!` });
});

// 404 Not Found handler
router.use((req, res) => {
  return res.status(404).json({ error: '404 - Not Found' });
});

// Global error handler
router.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Internal Server Error' });
});

export default router;
