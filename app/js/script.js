const todos = document.querySelectorAll('.todo_wrapper');
const all_boxes = document.querySelectorAll(".todo_box-content");
let draggableTodo = null;
let actualBtn = null;
let actualDeleteBtn = null;

todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
});

function setBoxHeight() {
    all_boxes.forEach((e) => {
        e.style.height = '460px';
    })
}

function dragStart() {
    draggableTodo = this;
    setBoxHeight()
    setTimeout(() => {
      this.style.display = "none";
    }, 0);
}

// 
  
function dragEnd() {
    draggableTodo = null;
    setTimeout(() => {
        this.style.display = "block";
    }, 0);
}

all_boxes.forEach((status) => {
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop", dragDrop);
});
  
function dragOver(e) {
    e.preventDefault();
}

function dragEnter() {
    this.style.border = "3px dashed #ccc";
    this.style.borderRadius = "10px";
}

function dragLeave() {
    this.style.border = "none";
}

function dragDrop() {
    this.style.border = "none";

    const prevContainer = draggableTodo.parentElement
    this.appendChild(draggableTodo);
    updateListCount(prevContainer);
    updateListCount(this);
}

// this - eseménykezelő függvényeknél az az objectum, amin megtörténik az esemény

function updateListCount(container) {
    span = container.parentElement.querySelector('.item_count')
    span.textContent = container.childElementCount
}

/* Add todos */
const add_btns = document.querySelectorAll('.todo-container .add_btn');
const todo_container = document.querySelector('.todo_input-container');
const input_form = document.querySelector('.input_form');
const invalid = document.querySelector('.invalid')

add_btns.forEach(e => {
    e.addEventListener('click', () => {
        todo_container.classList.add('active');
        actualBtn = e;       
    })
})

todo_container.addEventListener('click', () => {
    todo_container.classList.remove('active');
    invalid.style.display = 'none'; 
})

input_form.addEventListener('submit', e => {
    e.preventDefault()
    const listTitle = document.querySelector('.todo_input-heading').value
    const listTask = document.querySelector('#todo_text').value
    if (listTitle == null || listTitle === '' || listTitle.trim().length === 0) {
        return invalid.style.display = 'flex';
    } else {
        invalid.style.display = 'none';
        todo_container.classList.remove('active');
    }

    input_form.reset()
    
    const listContainer = actualBtn.parentElement.parentElement.querySelector('.todo_box-content')
    listContainer.appendChild(createTodoNode(listTitle, listTask))

    updateListCount(listContainer)

})

function createTodoNode(title, desc) {
    let newTodo = 
            `<div class="todo_wrapper" draggable="true">
                <div class="todo_header">
                    <h3 class="todo_header-name">${title}</h3>
                    <div class="todo_modifie-container">             
                        <div class="todo-delete">
                            <img src="images/icons/delete.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="todo-content">${desc}</div>
            </div>`   
            
         
    createdTodo = htmlToElement(newTodo);
    const deleteBtn = createdTodo.querySelector('.todo-delete')
    deleteBtn.addEventListener('click', () => {
        actualDeleteBtn = deleteBtn
        deleteTodoItem()
    })

    createdTodo.addEventListener("dragstart", dragStart);
    createdTodo.addEventListener("dragend", dragEnd);
    return createdTodo
}


function deleteBtn(){
    const deleteBtn = document.querySelectorAll('.todo-delete')

    deleteBtn.forEach(e => {
        e.addEventListener('click', () => {
            actualDeleteBtn = e
            deleteTodoItem()
        })
    })
}
deleteBtn()

function deleteTodoItem() {
    const listContainer = actualDeleteBtn.parentElement.parentElement.parentElement
    if (listContainer.parentNode) {
        listContainer.parentNode.removeChild(listContainer);
        updateListCount(listContainer)
    }
}

function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); 
    template.innerHTML = html;
    return template.content.firstChild;
}
