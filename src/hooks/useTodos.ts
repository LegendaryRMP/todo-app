import { useState, useCallback, useMemo } from 'react'
import type { Todo, Priority } from '../types'
import { loadFromStorage, saveToStorage, TODOS_KEY } from '../utils/storage'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export type FilterStatus = 'all' | 'active' | 'completed'
export type FilterPriority = 'all' | Priority
export type SortField = 'createdAt' | 'dueDate' | 'title' | 'priority'
export type SortDir = 'asc' | 'desc'

export interface Filters {
  status: FilterStatus
  search: string
  categoryId: string | null
  priority: FilterPriority
  sortField: SortField
  sortDir: SortDir
}

const PRIORITY_ORDER: Record<Priority, number> = {
  critical: 1,
  high: 2,
  medium: 3,
  low: 4,
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = loadFromStorage<unknown[]>(TODOS_KEY, [])
    return stored.map((t) => {
      const item = t as Record<string, unknown>
      return { priority: 'medium' as Priority, ...item } as unknown as Todo
    })
  })
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    search: '',
    categoryId: null,
    priority: 'all',
    sortField: 'createdAt',
    sortDir: 'desc',
  })

  const persist = useCallback((next: Todo[]) => {
    setTodos(next)
    saveToStorage(TODOS_KEY, next)
  }, [])

  const addTodo = useCallback(
    (title: string, categoryId: string | null, dueDate: string | null, priority: Priority) => {
      const trimmed = title.trim()
      if (!trimmed) return
      const todo: Todo = {
        id: generateId(),
        title: trimmed,
        completed: false,
        categoryId,
        dueDate,
        createdAt: new Date().toISOString(),
        priority,
      }
      persist([todo, ...todos])
    },
    [todos, persist],
  )

  const toggleTodo = useCallback(
    (id: string) => {
      persist(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
    },
    [todos, persist],
  )

  const deleteTodo = useCallback(
    (id: string) => {
      persist(todos.filter((t) => t.id !== id))
    },
    [todos, persist],
  )

  const editTodo = useCallback(
    (id: string, updates: Partial<Pick<Todo, 'title' | 'categoryId' | 'dueDate' | 'priority'>>) => {
      persist(todos.map((t) => (t.id === id ? { ...t, ...updates } : t)))
    },
    [todos, persist],
  )

  const filteredTodos = useMemo(() => {
    let result = [...todos]

    if (filters.status === 'active') result = result.filter((t) => !t.completed)
    else if (filters.status === 'completed') result = result.filter((t) => t.completed)

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter((t) => t.title.toLowerCase().includes(q))
    }

    if (filters.categoryId) {
      result = result.filter((t) => t.categoryId === filters.categoryId)
    }

    if (filters.priority !== 'all') {
      result = result.filter((t) => t.priority === filters.priority)
    }

    result.sort((a, b) => {
      let cmp = 0
      if (filters.sortField === 'createdAt') {
        cmp = a.createdAt.localeCompare(b.createdAt)
      } else if (filters.sortField === 'dueDate') {
        cmp = (a.dueDate ?? '').localeCompare(b.dueDate ?? '')
      } else if (filters.sortField === 'title') {
        cmp = a.title.localeCompare(b.title)
      } else if (filters.sortField === 'priority') {
        cmp = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      }
      return filters.sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [todos, filters])

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos])

  return { todos: filteredTodos, allTodos: todos, filters, setFilters, addTodo, toggleTodo, deleteTodo, editTodo, activeCount }
}
