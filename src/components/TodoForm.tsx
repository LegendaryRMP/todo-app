import { useState } from 'react'
import type { Category } from '../types'

interface Props {
  categories: Category[]
  onAdd: (title: string, categoryId: string | null, dueDate: string | null) => void
}

export default function TodoForm({ categories, onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onAdd(title, categoryId || null, dueDate || null)
    setTitle('')
    setCategoryId('')
    setDueDate('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="title-input"
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className="form-row">
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">No category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button type="submit" className="btn-primary">
          Add
        </button>
      </div>
    </form>
  )
}
