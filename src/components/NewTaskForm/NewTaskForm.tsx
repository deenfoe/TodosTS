import React, { useState, useContext, useRef } from 'react'

import { TodosContext } from '../../context/TodosContext'

import './NewTaskForm.css'

function NewTaskForm() {
  const { addTodoHandler } = useContext(TodosContext)
  const [text, setText] = useState('')
  const [timer, setTimer] = useState({ minutes: '', seconds: '' })
  const textInputRef = useRef<HTMLInputElement>(null)

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (text.trim() === '') {
      return // Предотвращаем добавление пустого задания
    }
    const minutes = parseInt(timer.minutes, 10) || 0
    const seconds = parseInt(timer.seconds, 10) || 0
    const totalSeconds = minutes * 60 + seconds
    addTodoHandler({
      text,
      minutes,
      seconds,
      totalSeconds,
      isCompleted: false,
    })
    setText('')
    setTimer({ minutes: '', seconds: '' })
    textInputRef.current?.focus() // Ставим фокус на поле ввода текста
  }

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    let newValue = value.replace(/\D/, '')
    if (parseInt(newValue, 10) > 59) newValue = '59'
    setTimer({ ...timer, [name]: newValue })
  }

  return (
    <form onSubmit={onSubmitHandler} className="new-todo-form">
      <button type="submit" hidden aria-hidden />
      <input
        ref={textInputRef}
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={(event) => setText(event.target.value)}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        name="minutes"
        placeholder="Min"
        value={timer.minutes}
        onChange={handleTimeChange}
      />
      <input
        className="new-todo-form__timer"
        name="seconds"
        placeholder="Sec"
        value={timer.seconds}
        onChange={handleTimeChange}
      />
    </form>
  )
}

export default NewTaskForm
