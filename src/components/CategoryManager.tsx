import { useState } from 'react'
import type { Category } from '../types'

interface Props {
  categories: Category[]
  onAdd: (name: string, color: string) => void
  onUpdate: (id: string, updates: Partial<Pick<Category, 'name' | 'color'>>) => void
  onDelete: (id: string) => void
}

const COLORS = [
  '#6366f1', '#f59e0b', '#10b981', '#ef4444', '#ec4899',
  '#8b5cf6', '#06b6d4', '#f97316', '#14b8a6', '#84cc16',
]

export default function CategoryManager({ categories, onAdd, onUpdate, onDelete }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0])

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd(name, color)
    setName('')
    setColor(COLORS[0])
  }

  return (
    <div className="category-manager">
      <button className="btn-secondary" onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Manage'} Categories ({categories.length})
      </button>

      {open && (
        <div className="category-panel">
          <form onSubmit={handleAdd} className="category-form">
            <input
              type="text"
              placeholder="New category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="color-picker">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-swatch${color === c ? ' selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
            <button type="submit" className="btn-primary">
              Add
            </button>
          </form>

          <div className="category-list">
            {categories.map((cat) => (
              <CategoryRow key={cat.id} category={cat} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CategoryRow({
  category,
  onUpdate,
  onDelete,
}: {
  category: Category
  onUpdate: (id: string, updates: Partial<Pick<Category, 'name' | 'color'>>) => void
  onDelete: (id: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState(category.name)

  function handleSave() {
    if (editName.trim()) {
      onUpdate(category.id, { name: editName.trim() })
    }
    setEditing(false)
  }

  return (
    <div className="category-row">
      <span className="category-dot" style={{ backgroundColor: category.color }} />
      {editing ? (
        <input
          className="edit-category-input"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave()
            if (e.key === 'Escape') {
              setEditName(category.name)
              setEditing(false)
            }
          }}
          autoFocus
        />
      ) : (
        <span className="category-name" onDoubleClick={() => setEditing(true)}>
          {category.name}
        </span>
      )}
      <button className="icon-btn" onClick={() => onDelete(category.id)} title="Delete category">
        ✕
      </button>
    </div>
  )
}
