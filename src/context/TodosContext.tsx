import React, { createContext, useState, useMemo, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

type Todo = {
  text: string
  minutes: number
  seconds: number
  totalSeconds: number
  isCompleted: boolean
  id: string
  created: Date
}

type TodosProviderProps = {
  children: React.ReactNode
}

type TodosContextType = {
  todos: Todo[]
  filter: string
  addTodoHandler: (todo: Omit<Todo, 'id' | 'created'>) => void
  showAllHandler: () => void
  showActiveHandler: () => void
  showCompletedHandler: () => void
  filteredTodos: Todo[]
  toggleTodoEditHandler: (id: string, newText: string) => void
  deleteTodoHandler: (id: string) => void
  toggleTodoHandler: (id: string) => void
  deleteCompletedTodosHandler: () => void
  activeTodosCount: number
  updateTodoTimeHandler: (id: string, newTotalSeconds: number) => void
  startTimer: (id: string) => void
  stopTimer: (id: string) => void
}

const TodosContext = createContext<TodosContextType>(null!)

const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<string>('All')
  const [timers, setTimers] = useState<{ [key: string]: NodeJS.Timeout }>({})

  const addTodoHandler = useCallback((todo: Omit<Todo, 'id' | 'created'>) => {
    const newTodo: Todo = {
      ...todo,
      id: uuidv4(),
      created: new Date(),
    }
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }, [])

  const showAllHandler = useCallback(() => setFilter('All'), [])
  const showActiveHandler = useCallback(() => setFilter('Active'), [])
  const showCompletedHandler = useCallback(() => setFilter('Completed'), [])

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === 'All') return true
      if (filter === 'Active') return !todo.isCompleted
      if (filter === 'Completed') return todo.isCompleted
      return false
    })
  }, [todos, filter])

  const toggleTodoEditHandler = useCallback((id: string, newText: string) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)))
  }, [])

  const deleteTodoHandler = useCallback(
    (id: string) => {
      if (timers[id]) {
        clearInterval(timers[id])
      }
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
      setTimers((prevTimers) => {
        const newTimers = { ...prevTimers }
        delete newTimers[id]
        return newTimers
      })
    },
    [timers]
  )

  const toggleTodoHandler = useCallback(
    (id: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted, totalSeconds: 0 } : todo))
      )
      if (timers[id]) {
        clearInterval(timers[id])
        setTimers((prevTimers) => {
          const newTimers = { ...prevTimers }
          delete newTimers[id]
          return newTimers
        })
      }
    },
    [timers]
  )

  const deleteCompletedTodosHandler = useCallback(() => {
    todos.forEach((todo) => {
      if (todo.isCompleted && timers[todo.id]) {
        clearInterval(timers[todo.id])
      }
    })
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isCompleted))
  }, [todos, timers])

  const activeTodosCount = useMemo(() => todos.filter((todo) => !todo.isCompleted).length, [todos])

  const updateTodoTimeHandler = useCallback((id: string, newTotalSeconds: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, totalSeconds: newTotalSeconds } : todo))
    )
  }, [])

  const startTimer = useCallback(
    (id: string) => {
      if (todos.find((todo) => todo.id === id && todo.totalSeconds === 0)) return

      const timer = setInterval(() => {
        setTodos((prevTodos) => {
          return prevTodos.map((todo) => {
            if (todo.id === id) {
              if (todo.totalSeconds > 0) {
                return { ...todo, totalSeconds: todo.totalSeconds - 1 }
              }
              clearInterval(timers[id])
              setTimers((prevTimers) => {
                const newTimers = { ...prevTimers }
                delete newTimers[id]
                return newTimers
              })
              return todo
            }
            return todo
          })
        })
      }, 1000)

      setTimers((prevTimers) => ({ ...prevTimers, [id]: timer }))
    },
    [todos, timers]
  )

  const stopTimer = useCallback(
    (id: string) => {
      if (timers[id]) {
        clearInterval(timers[id])
        setTimers((prevTimers) => {
          const newTimers = { ...prevTimers }
          delete newTimers[id]
          return newTimers
        })
      }
    },
    [timers]
  )

  const contextValue = useMemo(
    () => ({
      todos,
      filter,
      addTodoHandler,
      showAllHandler,
      showActiveHandler,
      showCompletedHandler,
      filteredTodos,
      toggleTodoEditHandler,
      deleteTodoHandler,
      toggleTodoHandler,
      deleteCompletedTodosHandler,
      activeTodosCount,
      updateTodoTimeHandler,
      startTimer,
      stopTimer,
    }),
    [
      todos,
      filter,
      addTodoHandler,
      showAllHandler,
      showActiveHandler,
      showCompletedHandler,
      filteredTodos,
      toggleTodoEditHandler,
      deleteTodoHandler,
      toggleTodoHandler,
      deleteCompletedTodosHandler,
      activeTodosCount,
      updateTodoTimeHandler,
      startTimer,
      stopTimer,
    ]
  )

  return <TodosContext.Provider value={contextValue}>{children}</TodosContext.Provider>
}

export { TodosProvider, TodosContext }
