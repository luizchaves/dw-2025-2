import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Host Monitor API',
      version: '1.0.0',
      description: 'Uma API para gerenciar e monitorar hosts através de requisições HTTP com ping',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Host: {
          type: 'object',
          required: ['name', 'address'],
          properties: {
            id: {
              type: 'string',
              description: 'ID único do host (CUID)',
              example: 'clh7w1wf80000qz8d5z7z8z8z',
            },
            name: {
              type: 'string',
              description: 'Nome do host',
              example: 'Google',
            },
            address: {
              type: 'string',
              description: 'Endereço ou IP do host',
              example: 'google.com',
            },
          },
        },
        PingResult: {
          type: 'object',
          properties: {
            host: {
              type: 'string',
              example: 'google.com',
            },
            alive: {
              type: 'boolean',
              example: true,
            },
            output: {
              type: 'string',
              description: 'Saída do comando ping',
            },
            numeric_host: {
              type: 'string',
              example: '142.250.185.46',
            },
            packets_sent: {
              type: 'integer',
              example: 3,
            },
            packets_received: {
              type: 'integer',
              example: 3,
            },
            percent_packet_loss: {
              type: 'number',
              example: 0,
            },
            time_ms: {
              type: 'number',
              example: 45.123,
            },
            min_response_time_ms: {
              type: 'number',
              example: 12.5,
            },
            max_response_time_ms: {
              type: 'number',
              example: 25.8,
            },
            avg_response_time_ms: {
              type: 'number',
              example: 15.2,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes.js'],
};

export default swaggerJsdoc(options);
