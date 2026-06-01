import { useState } from 'react'
import type { Category, Todo } from '../types'

interface Props {
  todo: Todo
  category: Category | undefined
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, updates: Partial<Pick<Todo, 'title' | 'categoryId' | 'dueDate'>>) => void
  categories: Category[]
}

export default function TodoItem({ todo, category, onToggle, onDelete, onEdit, categories }: Props) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)

  const isOverdue =
    todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date(new Date().toDateString())

  function handleSave() {
    const trimmed = editTitle.trim()
    if (trimmed) {
      onEdit(todo.id, { title: trimmed })
    }
    setEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setEditTitle(todo.title)
      setEditing(false)
    }
  }

  return (
    <div className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <label className="todo-checkbox">
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
        <span className="checkmark" />
      </label>

      <div className="todo-body">
        {editing ? (
          <input
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span className="todo-title" onDoubleClick={() => setEditing(true)}>
            {todo.title}
          </span>
        )}

        <div className="todo-meta">
          {category && (
            <span className="category-badge" style={{ backgroundColor: category.color }}>
              {category.name}
            </span>
          )}
          {todo.dueDate && (
            <span className={`due-date${isOverdue ? ' overdue' : ''}`}>
              {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="todo-actions">
        {editing ? (
          <div className="edit-category-select">
            <select
              value={todo.categoryId ?? ''}
              onChange={(e) => onEdit(todo.id, { categoryId: e.target.value || null })}
            >
              <option value="">No category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <button className="icon-btn edit-btn" onClick={() => setEditing(true)} title="Edit">
            ✏
          </button>
        )}
        <button className="icon-btn delete-btn" onClick={() => onDelete(todo.id)} title="Delete">
          🗑
        </button>
      </div>
    </div>
  )
}
