import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api';

createConnection().then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use('/api', apiRoutes);

    const PORT = 8081;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => console.error('Database connection error:', error));