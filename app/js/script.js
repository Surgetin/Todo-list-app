const todos = document.querySelectorAll('.todo_wrapper');
const all_boxes = document.querySelectorAll(".todo_box-content");
let draggableTodo = null;

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
    const span = container.parentElement.querySelector('.item_count')
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
    })
})

todo_container.addEventListener('click', () => {
    todo_container.classList.remove('active');
    invalid.style.display = 'none'; 
})

input_form.addEventListener('submit', e => {
    e.preventDefault()
    const listTitle = document.querySelector('.todo_input-heading').value
    if (listTitle == null || listTitle === '' || listTitle.trim().length === 0) {
        return invalid.style.display = 'flex';
    } else {
        invalid.style.display = 'none';
        todo_container.classList.remove('active'); 
    }
})


