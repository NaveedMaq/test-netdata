import crypto from 'crypto';

export type ITodo = {
    id: string;
    title: string;
    description: string;
};

class TodoModel {
    private todos: ITodo[];

    constructor() {
        this.todos = [];
    }

    getAll(): ITodo[] {
        return [...this.todos];
    }

    getById(id: string): ITodo | null {
        return this.todos.find((todo) => todo.id === id) ?? null;
    }

    create(todo: Omit<ITodo, 'id'>) {
        const newTodo = {
            id: this.generateNewId(4),
            title: todo.title,
            description: todo.description,
        };
        this.todos.push(newTodo);

        return newTodo;
    }

    deleteById(id: string) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    }

    private generateNewId(length: number) {
        let newId: string;

        do {
            newId = crypto.randomBytes(length).toString('hex');
        } while (this.getById(newId));

        return newId;
    }
}

export const todoModel = new TodoModel();
