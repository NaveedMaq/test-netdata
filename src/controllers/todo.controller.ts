import express from 'express';
import { ITodo, todoModel } from '../models/todo.model';

class TodoController {
    getAllTodos(req: express.Request, res: express.Response) {
        const todos = todoModel.getAll();
        res.json({
            results: todos.length,
            todos,
        });
    }

    getTodoById(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const todo = todoModel.getById(id);

        if (!todo) {
            res.sendStatus(404);
            return;
        }

        res.json({ todo });
    }

    createTodo(req: express.Request, res: express.Response) {
        const todoDto = req.body as Omit<ITodo, 'id'>;
        console.log('asdf');
        const createdTodo = todoModel.create(todoDto);
        res.status(201).json(createdTodo);
    }

    deleteTodoById(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const existingTodo = todoModel.getById(id);
        if (!existingTodo) {
            res.sendStatus(404);
            return;
        }
        todoModel.deleteById(id);
        res.sendStatus(204);
    }
}

export const todoController = new TodoController();
