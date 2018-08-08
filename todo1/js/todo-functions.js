/**
 * ToDo Functions
 * ==============
 * using 'strict' mode for development
 */

'use strict'

// class for ToDo functionality
class TodoClass {

    // fetch existing todos from localStorage
    getSavedTodos() {
        const todosJSON = localStorage.getItem('todos')

        try {
            // parse data if valid or store empty array
            return todosJSON ? JSON.parse(todosJSON) : []
        } catch (e) {
            console.log('there was a problem with the data, please create todo to restart storage')
            // if error, store empty array
            return []
        }
    }

    // save todos to localStorage
    saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    // render todos based on filters
    renderTodos(todos, filters) {

        // filter by the todo task property values
        const filteredTodos = todos.filter(todo => {

            // setup text filter
            const textMatch = todo.task.toLowerCase().includes(filters.searchText.toLowerCase())
            // setup completed status filter
            const completedMatch = ! filters.hideCompleted || ! todo.completed

            return textMatch && completedMatch
        })

        const todoList = document.getElementById('todo-list')
        
        // clear the todo list on the page
        todoList.innerHTML = ''

        // create a summary of todos that need completing
        todoList.appendChild(this.generateSummaryDOM(filteredTodos))

        // add the todos to the todo list on the page
        filteredTodos.forEach(todo => {
            const createTodo = this.generateTodoDOM(todo)
            todoList.appendChild(createTodo)
        })    
    }

    // generate unique ID
    generateID(todos) {
        let todoID = 0

        todos.length > 0
            ? todoID = todos[todos.length - 1].id + 1
            : todoID = 0

        return todoID
    }

    // get the unique ID
    getTheID(todoID) {
        return todoIndex = todos.findIndex(todo => todo.id === todoID)
    }

    // remove ToDo by ID
    removeTodo(todoID) {
        const todoIndex = todos.findIndex(todo => todo.id === todoID)

        if (todoIndex > -1) todos.splice(todoIndex, 1)
    }

    // change the ToDo completed status
    changeTodoStatus(todoID) {
        const todoToToggle = todos.find(todo => todo.id === todoID)

        if (todoToToggle) todoToToggle.completed = !todoToToggle.completed
    }

    // create todo and todo delete button with event handler attached
    generateTodoDOM(todo) {
        // create elements
        const createTodoParagraph = document.createElement('p')
        const createTodoBtn = document.createElement('span')
        const createTodoText = document.createElement('span')
        const createTodoCheck = document.createElement('input')

        // populate elements
        createTodoCheck.setAttribute('type', 'checkbox')
        createTodoText.className = 'todo-text'
        createTodoBtn.innerHTML = '&times;'
        createTodoBtn.className = 'todo-close-btn'
        createTodoText.textContent = todo.task

        // checkbox status
        createTodoCheck.checked = todo.completed

        // checkbox event handler
        createTodoCheck.addEventListener('change', () => {
            this.changeTodoStatus(todo.id)
            this.saveTodos(todos)
            this.renderTodos(todos, filters)
        })

        // add event handler to button
        createTodoBtn.addEventListener('click', () => {
            this.removeTodo(todo.id)
            this.saveTodos(todos)
            this.renderTodos(todos, filters)
        })
        
        // create final paragraph
        createTodoParagraph.appendChild(createTodoCheck)
        createTodoParagraph.appendChild(createTodoText)
        createTodoParagraph.appendChild(createTodoBtn)

        return createTodoParagraph
    }

    // get DOM elements for a todo summary
    generateSummaryDOM(filteredTodos) {
        // calculate how many todos are incomplete
        const incompleteTodos = filteredTodos.filter(todo => !todo.completed)
        
        // create a summary
        const todosIncomplete = document.createElement('h4')
        todosIncomplete.textContent = `This list contains ${incompleteTodos.length} Todos that need completing`

        return todosIncomplete
    }

} // class ends

const todoApp = new TodoClass()