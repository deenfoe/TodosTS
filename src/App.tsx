import React from 'react'

import './App.css'
import Header from './components/Header/Header'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'
import { TodosProvider } from './context/TodosContext'

function App() {
  return (
    <TodosProvider>
      <section className="todoapp">
        <Header />
        <NewTaskForm />
        <section className="main">
          <TaskList />
          <Footer />
        </section>
      </section>
    </TodosProvider>
  )
}

export default App
