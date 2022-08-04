const todos = document.querySelectorAll('.todo-wrapper');
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
    this.appendChild(draggableTodo);
}
