import type { Category, Todo } from '../types'
import TodoItem from './TodoItem'

interface Props {
  todos: Todo[]
  categories: Category[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, updates: Partial<Pick<Todo, 'title' | 'categoryId' | 'dueDate'>>) => void
}

export default function TodoList({ todos, categories, onToggle, onDelete, onEdit }: Props) {
  if (todos.length === 0) {
    return <div className="empty-state">No tasks found. Add one above!</div>
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => {
        const cat = categories.find((c) => c.id === todo.categoryId)
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            category={cat}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            categories={categories}
          />
        )
      })}
    </div>
  )
}
