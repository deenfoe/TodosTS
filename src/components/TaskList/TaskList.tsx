import React, { useContext } from 'react'

import Task from '../Task/Task'
import { TodosContext } from '../../context/TodosContext'

import './TaskList.css'

function TaskList() {
  const { filteredTodos, toggleTodoEditHandler, deleteTodoHandler, toggleTodoHandler, updateTodoTimeHandler } =
    useContext(TodosContext)

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <Task
          key={todo.id}
          todo={todo}
          toggleTodoEdit={toggleTodoEditHandler}
          deleteTodo={deleteTodoHandler}
          toggleTodo={toggleTodoHandler}
          updateTodoTime={updateTodoTimeHandler}
        />
      ))}
    </ul>
  )
}

export default TaskList
