import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import router from './routes';
import errorMiddleware from './middlewares/error';

const port = process.env.PORT || 3001;
const app = express()

app.use(express.json())

app.use('/api', router)

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is fire at localhost:${port}`)
})