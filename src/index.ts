import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import router from './routes';
import errorMiddleware from './middlewares/error';
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger';

const port = process.env.PORT || 3001;
const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api', router)

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
})