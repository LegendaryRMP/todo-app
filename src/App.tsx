import { useTodos } from './hooks/useTodos'
import { useCategories } from './hooks/useCategories'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoFilter from './components/TodoFilter'
import CategoryManager from './components/CategoryManager'
import './App.css'

export default function App() {
  const { todos, allTodos, filters, setFilters, addTodo, toggleTodo, deleteTodo, editTodo, activeCount } = useTodos()
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories()

  return (
    <div className="app">
      <header className="app-header">
        <h1>To-Do App</h1>
        <span className="todo-count">
          {activeCount} of {allTodos.length} tasks remaining
        </span>
      </header>

      <main className="app-main">
        <TodoForm categories={categories} onAdd={addTodo} />
        <TodoFilter filters={filters} onChange={setFilters} categories={categories} />
        <TodoList
          todos={todos}
          categories={categories}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        <CategoryManager
          categories={categories}
          onAdd={addCategory}
          onUpdate={updateCategory}
          onDelete={deleteCategory}
        />
      </main>
    </div>
  )
}
