// Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
    event.preventDefault();

    // to do div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // list item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // add to do to local storage
    saveLocalTodos(todoInput.value);

    // check mark
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);

    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');
    todoDiv.appendChild(deleteBtn);

    // append to the list
    todoList.appendChild(todoDiv);

    // Clear input value
    todoInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;

    // delete
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall-down');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    // checked as completed
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        console.log(todo);
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
        }
    });
}

// Local storage
function saveLocalTodos(todo) {
    // check if there's local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        // to do div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // list item
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // check mark
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add('complete-btn');
        todoDiv.appendChild(completedBtn);

        // delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add('delete-btn');
        todoDiv.appendChild(deleteBtn);

        // append to the list
        todoList.appendChild(todoDiv);

    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}