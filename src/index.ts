import express from 'express';
import { createConnection } from 'typeorm';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import "reflect-metadata";

const app = express();

// Swagger 설정
const swaggerOptions = {
    swaggerDefinition: require('../swagger.json'),
    apis: ['./src/routes/*.ts'], // API 파일 경로
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// TypeORM 연결 설정
createConnection().then(async connection => {
    console.log("Database connected");

    // 서버 시작
    app.listen(8081, () => {
        console.log("Server started on http://localhost:8081");
    });
}).catch(error => console.log(error));