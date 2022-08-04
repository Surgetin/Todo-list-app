const todos = document.querySelectorAll('.todo-wrapper');
const all_status = document.querySelectorAll(".todo_box-content");
const todo_height = document.querySelector('.todo-wrapper').clientHeight;
let draggableTodo = null;

todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
});

function setBoxHeight() {
    all_status.style.height = todo_height;
}

function dragStart() {
    draggableTodo = this;
    setTimeout(() => {
      this.style.display = "none";
    }, 0);
    console.log("dragStart");
    console.log(todo_height)
    setBoxHeight()
}
  
function dragEnd() {
    draggableTodo = null;
    setTimeout(() => {
        this.style.display = "block";
    }, 0);
    console.log("dragEnd");
}

all_status.forEach((status) => {
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop", dragDrop);
});
  
function dragOver(e) {
    e.preventDefault();
    //   console.log("dragOver");
}

function dragEnter() {
    this.style.border = "2px dashed #ccc";
    console.log("dragEnter");
}

function dragLeave() {
    this.style.border = "none";
    console.log("dragLeave");
}

function dragDrop() {
    this.style.border = "none";
    this.appendChild(draggableTodo);
    console.log("dropped");
}
