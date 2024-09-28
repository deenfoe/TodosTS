// src/types/todos.ts

export type Todo = {
  text: string
  minutes: number
  seconds: number
  totalSeconds: number
  isCompleted: boolean
  id: string
  created: Date
}

export type TodosContextType = {
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

export interface TaskProps {
  todo: Todo
  toggleTodoEdit: (id: string, newText: string) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  updateTodoTime: (id: string, newTotalSeconds: number) => void
}

export type TodosProviderProps = {
  children: React.ReactNode
}
