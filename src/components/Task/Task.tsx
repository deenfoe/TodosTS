import React, { useState, useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

import { TodosContext } from '../../context/TodosContext'
import './Task.css'

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

interface TaskProps {
  todo: {
    id: string
    text: string
    totalSeconds: number
    created: Date
    isCompleted: boolean
  }
  toggleTodoEdit: (id: string, newText: string) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  updateTodoTime: (id: string, newTotalSeconds: number) => void
}

function Task({ todo }: TaskProps) {
  const { deleteTodoHandler, toggleTodoHandler, toggleTodoEditHandler, startTimer, stopTimer } =
    useContext(TodosContext)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const startEditing = () => {
    setIsEditing(true)
    setEditText(todo.text)
  }

  const stopEditing = () => {
    setIsEditing(false)
  }

  const editChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value)
  }

  const saveEdit = () => {
    toggleTodoEditHandler(todo.id, editText)
    stopEditing()
  }

  const taskCreated = formatDistanceToNow(new Date(todo.created), {
    addSuffix: true,
    locale: ru,
  })

  return (
    <li className={`${todo.isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => {
            stopTimer(todo.id)
            toggleTodoHandler(todo.id)
          }}
        />
        <label>
          <span className="title">{todo.text}</span>
          <span className="description">
            <div className="timer">
              <button
                className="icon icon-play"
                onClick={() => {
                  if (todo.totalSeconds > 0) {
                    startTimer(todo.id)
                  }
                }}
              />
              <button className="icon icon-pause" onClick={() => stopTimer(todo.id)} />
              <span>{formatTime(todo.totalSeconds)}</span>
            </div>
          </span>
          <span className="created">{`создано ${taskCreated}`}</span>
        </label>
        <button className="icon icon-edit" onClick={startEditing} />
        <button className="icon icon-destroy" onClick={() => deleteTodoHandler(todo.id)} />
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={editText}
          onChange={editChangeHandle}
          onBlur={saveEdit}
          onKeyDown={(event) => event.key === 'Enter' && saveEdit()}
          autoFocus
        />
      )}
    </li>
  )
}

export default Task
