
class TodoController {
    constructor(todosUlId, todoRepository, toast){
        this.todosUlId = todosUlId
        this.todoRepository = todoRepository
        this.toast = toast;
    }
    create(todo) {
        try {
            if(!todo.name) return  this.toast.showToast("O nome da tarefa não pode estar vazia!", '#danger-toast')
            this.todoRepository.create(todo)
            this.toast.showToast("Criado com sucesso!")
            this.renderTodos()
        } catch (e) {
            this.toast.showToast(e.message, '#danger-toast')
        }
    }
    deleteTodo(id) {
        try {
            this.todoRepository.delete(id)
            this.toast.showToast("Deletado com sucesso!")
            this.renderTodos()
        } catch (e) {
            this.toast.showToast(e.message, '#danger-toast')
        }
    }
    updateTodo(id) {
        try {
            const name = document.querySelector(`#todo-name-${id}`).value
            const complete = document.querySelector(`#todo-complete-${id}`).checked
            this.todoRepository.update(id, { name, complete })
            this.toast.showToast("Atualizado com sucesso!")
            this.renderTodos()
        } catch (e) {
            this.toast.showToast(e.message, '#danger-toast')
        }
    }
    renderTodos() {
        const todos = this.todoRepository.list()
        const todosList = document.querySelector(this.todosUlId)
        while (todosList.firstChild) {
            todosList.removeChild(todosList.lastChild);
        }
        if(_.isEmpty(todos)){
            const li = document.createElement("li")
            li.classList.add(['list-group-item'])
            li.innerHTML = '<p class="text-center">Sem tarefas</p>'
            todosList.appendChild(li)
        }
        todos.forEach(todo => {
            const li = document.createElement("li")
            li.classList.add('list-group-item')
            li.innerHTML = ` <div class="row justify-content-md-between ">
                <div class="col-12 col-md-6">
                    ${todo.complete ? '<span class="badge bg-success">Concluído</span>' : ""}
                    <div class="form-group">
                        <label>Nome da tarefa</label>
                        <input class="form-control" id="todo-name-${todo.id}" value="${todo.name}" >
                     </div>
                </div>
                <div class="col-12 col-md-6 mt-3 d-md-flex d-block gap-2 align-items-center justify-content-end mt-md-0">    
                    <div class="form-check ">
                        <input  name="todo-complete-${todo.id}"  id="todo-complete-${todo.id}"  ${todo.complete ? "checked" : ""} class="form-check-input" type="checkbox">
                        <label class="form-check-label" for="todo-complete-${todo.id}">
                            Concluído
                        </label>
                    </div>
                    <div class="d-flex d-md-block flex-column gap-2">
                        <button onclick="todoController.updateTodo(${todo.id})" class="btn btn-primary">Atualizar</button>
                        <button onclick="todoController.deleteTodo(${todo.id})" class="btn btn-danger">Deletar</button>
                    </div>
                </div>
             </div>`;
            todosList.appendChild(li)
        });
    }
}
window.todoController = new TodoController("#todos", window.todoRepository, window.toast)