import type { Category } from '../types'
import type { Filters, FilterStatus, FilterPriority, SortField } from '../hooks/useTodos'

interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
  categories: Category[]
}

const statusOptions: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

const priorityOptions: { value: FilterPriority; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

const sortFields: { value: SortField; label: string }[] = [
  { value: 'createdAt', label: 'Created' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'title', label: 'Title' },
  { value: 'priority', label: 'Priority' },
]

export default function TodoFilter({ filters, onChange, categories }: Props) {
  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className="todo-filter">
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) => update('search', e.target.value)}
      />

      <div className="filter-row">
        <div className="status-tabs">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              className={`tab${filters.status === opt.value ? ' active' : ''}`}
              onClick={() => update('status', opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-row">
        <div className="status-tabs">
          {priorityOptions.map((opt) => (
            <button
              key={opt.value}
              className={`tab${filters.priority === opt.value ? ' active' : ''}`}
              onClick={() => update('priority', opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-row">
        <select
          value={filters.categoryId ?? ''}
          onChange={(e) => update('categoryId', e.target.value || null)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={filters.sortField}
          onChange={(e) => update('sortField', e.target.value as SortField)}
        >
          {sortFields.map((sf) => (
            <option key={sf.value} value={sf.value}>
              {sf.label}
            </option>
          ))}
        </select>

        <button
          className="icon-btn sort-dir-btn"
          onClick={() => update('sortDir', filters.sortDir === 'asc' ? 'desc' : 'asc')}
          title={filters.sortDir === 'asc' ? 'Ascending' : 'Descending'}
        >
          {filters.sortDir === 'asc' ? '↑' : '↓'}
        </button>
      </div>
    </div>
  )
}
