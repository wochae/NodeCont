import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import letterRoutes from './routes/letterRoutes';

const app = express();

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js API with TypeScript',
            version: '1.0.0',
            description: 'API documentation for the Node.js project',
        },
        servers: [
            {
                url: 'http://localhost:8081',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', letterRoutes);

export default app;