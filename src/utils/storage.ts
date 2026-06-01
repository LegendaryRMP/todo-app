const TODOS_KEY = 'todo-app-todos'
const CATEGORIES_KEY = 'todo-app-categories'

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data))
}

export { TODOS_KEY, CATEGORIES_KEY }
