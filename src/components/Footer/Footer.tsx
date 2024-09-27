import React, { useContext } from 'react'

import { TodosContext } from '../../context/TodosContext'

import './Footer.css'

function Footer() {
  const {
    deleteCompletedTodosHandler,
    activeTodosCount,
    showAllHandler,
    showActiveHandler,
    showCompletedHandler,
    filter,
  } = useContext(TodosContext)

  return (
    <footer className="footer">
      <span className="todo-count">{activeTodosCount} items left</span>
      <ul className="filters">
        <li>
          <button className={filter === 'All' ? 'selected' : ''} onClick={showAllHandler}>
            All
          </button>
        </li>
        <li>
          <button className={filter === 'Active' ? 'selected' : ''} onClick={showActiveHandler}>
            Active
          </button>
        </li>
        <li>
          <button className={filter === 'Completed' ? 'selected' : ''} onClick={showCompletedHandler}>
            Completed
          </button>
        </li>
      </ul>
      <button className="clear-completed" onClick={deleteCompletedTodosHandler}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
