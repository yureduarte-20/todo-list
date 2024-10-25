const APP_DATABASE_NAME = 'app_todos';

class TodoRepository {
    constructor(tableName) {
        this.tableName = tableName;
    }
    create(data) {
        if (typeof data !== 'object') {
            throw new Error("Inválido")
        }
        data.id = _.random(1, 100_000_000)
        let todos = this.#_getAll()
        todos.push(data)
        this.#_store(todos)
    }
    list() {
        return this.#_getAll()
    }
    find(id) {
        const todos = this.#_getAll()
        return todos.find(todo => todo.id == id)
    }
    update(id, data) {
        let todos = this.#_getAll()
        if (typeof data !== 'object') {
            throw new Error("Inválido")
        }
        if (!this.find(id)) {
            throw new Error("Não existe essa tarefa")
        }
        todos = todos.map((todo) => {
            if (todo.id == id) {
                data.id = todo.id;
                return data
            }
            return todo;
        });
        this.#_store(todos)
    }
    delete(id) {
        let todos = this.#_getAll()
        todos = todos.filter(todo => todo.id !== id)
        this.#_store(todos)
    }
    #_store(todos = []) {
        const todoString = typeof todos == 'string' ? todos : JSON.stringify(todos)
        localStorage.setItem(this.tableName, todoString)
    }
    #_getAll() {
        return JSON.parse(localStorage.getItem(this.tableName) ?? '[]')
    }
}
window.todoRepository = new TodoRepository(APP_DATABASE_NAME)
