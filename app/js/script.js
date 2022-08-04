const todos = document.querySelectorAll('todo-wrapper');

todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragstart)
})