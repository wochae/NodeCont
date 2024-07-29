import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';

const PORT = process.env.PORT || 8081;

createConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
}).catch(error => console.log(error));