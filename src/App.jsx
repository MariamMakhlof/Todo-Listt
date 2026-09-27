import { useEffect, useState } from 'react'
import TodoForm from './Components/TodoForm'
import TodoList from './Components/TodoList'
import './App.css'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [theme, setTheme] = useState(() => localStorage.getItem('todoApp.theme') || 'dark')

  useEffect(() => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)), [todos])
  useEffect(() => localStorage.setItem('todoApp.theme', theme), [theme])

  const addTodo = (text) => {
    if (!text.trim()) return
    setTodos((current) => [...current, { id: Date.now(), text: text.trim(), status: 'pending' }])
  }
  const updateTodo = (id, text) => {
    const cleanText = text.trim()
    if (!cleanText) return
    setTodos((current) => current.map((todo) => todo.id === id ? { ...todo, text: cleanText } : todo))
  }
  const completeTodo = (id) => setTodos((current) => current.map((todo) => todo.id === id ? { ...todo, status: todo.status === 'done' ? 'pending' : 'done' } : todo))
  const deleteTodo = (id) => setTodos((current) => current.filter((todo) => todo.id !== id))
  const reorderTodos = (sourceId, targetId) => setTodos((current) => {
    const fromIndex = current.findIndex((todo) => todo.id === sourceId)
    const toIndex = current.findIndex((todo) => todo.id === targetId)
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return current
    const reordered = [...current]
    const [movedTodo] = reordered.splice(fromIndex, 1)
    reordered.splice(toIndex, 0, movedTodo)
    return reordered
  })
  const clearCompleted = () => setTodos((current) => current.filter((todo) => todo.status !== 'done'))
  const leftCount = todos.filter((todo) => todo.status === 'pending').length

  return (
    <div className={`app-container ${theme}-mode`}>
      <div className="container-fluid todo-app">
        <div className="row">
          <main className="todo-column d-flex flex-column">
            <header className="todo-header d-flex justify-content-between align-items-center">
              <div className="header-copy">
                <h1 className="todo-title">My Todo List</h1>
                <p className="todo-subtitle">{leftCount} {leftCount === 1 ? 'task' : 'tasks'} left to do</p>
              </div>
              <div className="header-actions">
                <button className="theme-toggle-btn" type="button" onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                  <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
                </button>
                <button className="todo-btn-clear" type="button" onClick={clearCompleted}>Clear done</button>
              </div>
            </header>
            <section className="todo-form-container" aria-label="Add a task">
              <TodoForm onAddTodo={addTodo} />
            </section>
            <section className="todo-list-container" aria-label="Your tasks">
              <TodoList todos={todos} onComplete={completeTodo} onDelete={deleteTodo} onUpdate={updateTodo} onReorder={reorderTodos} />
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
