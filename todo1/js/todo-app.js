/**
 * ToDo Application
 * ================
 * using 'strict' mode for development
 * 
 * dependencies:
 * TodoClass() from todo-functions.js
 */

'use strict'

// fetch existing todos from localStorage
let todos = todoApp.getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

// create a render function for the todo list on the page
todoApp.renderTodos(todos, filters)

// setup the input filter for the todos list and render based on the input value
document.getElementById('filter-todo').addEventListener('input', e => {
    // send input value to the filters object
    filters.searchText = e.target.value
    // re-render todo list
    todoApp.renderTodos(todos, filters)
})

// setup filter to hide completed tasks
document.getElementById('hide-completed').addEventListener('change', e => {
    // set checkbox value in filters object
    filters.hideCompleted = e.target.checked
    // re-render todo list
    todoApp.renderTodos(todos, filters)
})

// setup a form handler to add todos to the list on the page
document.getElementById('todo-form').addEventListener('submit', e => {
    // cancel default behaviour of submit button
    e.preventDefault()

    // if todo input has content then add todo to todos array with completed = false
    if (e.target.elements.inputTodo.value !== ''){
        todos.push({
            id: todoApp.generateID(todos),
            task: e.target.elements.inputTodo.value,
            completed: false
        })
    }
    // add to localStorage
    todoApp.saveTodos(todos)
    // re-render todo list
    todoApp.renderTodos(todos, filters)
    // clear the input field
    e.target.elements.inputTodo.value = ''
})
