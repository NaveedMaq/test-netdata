import { ITodo, todoModel } from '../models/todo.model';

describe('test todo routes', () => {
    let todo: ITodo;
    beforeAll(() => {
        todo = todoModel.create({
            title: 'todo 1 title',
            description: 'todo 1 description',
        });

        todoModel.create({
            title: 'todo 2 title',
            description: 'todo 2 description',
        });
    });

    test('can create todos', () => {
        const lengthBeforeCreating = todoModel.getAll().length;
        todoModel.create({
            title: 'todo 3 title',
            description: 'todo 3 description',
        });

        const lengthAfterCreating = todoModel.getAll().length;

        expect(lengthAfterCreating).toBe(lengthBeforeCreating + 1);
    });

    test('can read all todos', () => {
        const allTodos = todoModel.getAll();
        expect(allTodos.length).toBe(3);
    });

    test('can read single todo', () => {
        const fetchedTodo = todoModel.getById(todo?.id);
        expect(fetchedTodo?.title).toBe('todo 1 title');
        expect(fetchedTodo?.description).toBe('todo 1 description');
    });

    test('can delete todo', () => {
        const lengthBeforeDeleting = todoModel.getAll().length;

        todoModel.deleteById(todoModel.getAll()[0].id);
        const lengthAfterDeleting = todoModel.getAll().length;
        expect(lengthAfterDeleting).toBe(lengthBeforeDeleting - 1);
    });
});
