import { useState, useCallback } from 'react'
import type { Category } from '../types'
import { loadFromStorage, saveToStorage, CATEGORIES_KEY } from '../utils/storage'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

function defaultCategories(): Category[] {
  return [
    { id: generateId(), name: 'Personal', color: '#6366f1' },
    { id: generateId(), name: 'Work', color: '#f59e0b' },
    { id: generateId(), name: 'Shopping', color: '#10b981' },
  ]
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(() =>
    loadFromStorage<Category[]>(CATEGORIES_KEY, defaultCategories()),
  )

  const persist = useCallback((next: Category[]) => {
    setCategories(next)
    saveToStorage(CATEGORIES_KEY, next)
  }, [])

  const addCategory = useCallback(
    (name: string, color: string) => {
      const trimmed = name.trim()
      if (!trimmed) return
      persist([...categories, { id: generateId(), name: trimmed, color }])
    },
    [categories, persist],
  )

  const updateCategory = useCallback(
    (id: string, updates: Partial<Pick<Category, 'name' | 'color'>>) => {
      persist(categories.map((c) => (c.id === id ? { ...c, ...updates } : c)))
    },
    [categories, persist],
  )

  const deleteCategory = useCallback(
    (id: string) => {
      persist(categories.filter((c) => c.id !== id))
    },
    [categories, persist],
  )

  return { categories, addCategory, updateCategory, deleteCategory }
}
