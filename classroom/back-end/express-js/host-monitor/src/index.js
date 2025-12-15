import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';
import router from './routes.js';

const app = express();

app.use(morgan('dev'));

app.use(express.static('public'));

app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api', router);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
  console.log('API Documentation available at http://localhost:3000/api-docs');
});
