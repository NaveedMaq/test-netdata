import express from 'express';
import { todoController } from '../controllers/todo.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authMiddleware);

router
    .route('/')
    .get(todoController.getAllTodos)
    .post(todoController.createTodo);

router
    .route('/:id')
    .get(todoController.getTodoById)
    .delete(todoController.deleteTodoById);

export const todoRouter = router;
