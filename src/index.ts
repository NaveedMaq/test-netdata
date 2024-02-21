import express from 'express';
import dotenv from 'dotenv';
import { todoRouter } from './routes/todo.routes';
dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT;

app.use('/todos', todoRouter);

app.listen(port, () => {
    console.log('Server successfully started on port', port);
});
