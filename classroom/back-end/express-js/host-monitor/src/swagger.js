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
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT no formato: Bearer <token>'
        }
      },
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
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'ID único do usuário (CUID)',
              example: 'clh7w1wf80000qz8d5z7z8z8z',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              example: 'john.doe@example.com',
            },
            password: {
              type: 'string',
              description: 'Senha do usuário (não retornada nas respostas)',
              example: 'strongpassword123',
            },
          },
        },
        Icmp: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            seq: { type: 'integer' },
            ttl: { type: 'integer' },
            time: { type: 'number', example: 12.34 },
          },
        },
        Stats: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            transmitted: { type: 'integer', example: 3 },
            received: { type: 'integer', example: 3 },
            time: { type: 'number', example: 45.12 },
          },
        },
        Ping: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            createAt: { type: 'string', format: 'date-time' },
            host: { $ref: '#/components/schemas/Host' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
              },
            },
            icmps: {
              type: 'array',
              items: { $ref: '#/components/schemas/Icmp' },
            },
            stats: { $ref: '#/components/schemas/Stats' },
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
