export type Priority = 'low' | 'medium' | 'high' | 'critical'

export interface Todo {
  id: string
  title: string
  completed: boolean
  categoryId: string | null
  dueDate: string | null
  createdAt: string
  priority: Priority
}

export interface Category {
  id: string
  name: string
  color: string
}
