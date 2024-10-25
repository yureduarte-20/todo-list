function todoFactory() {
    return {
        name: '',
        complete: false
    }
}

const createButton = document.querySelector("#create-button")

createButton?.addEventListener('click', (e) => {
    let name = document.querySelector('#input-name-create').value
    let todo = todoFactory()
    todo.name = name;
    window.todoController.create(todo)
    document.querySelector('#input-name-create').value = ''

});



window.todoController.renderTodos()