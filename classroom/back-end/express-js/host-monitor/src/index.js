import express from 'express';
import morgan from 'morgan';
import router from './routes.js';
import Seed from './database/seeders.js';

const app = express();

Seed.up();

app.use(morgan('dev'));

app.use(express.static('public'));

app.use(express.json());

app.use('/api', router);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
