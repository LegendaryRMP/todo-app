export type Priority = 'low' | 'medium' | 'high' | 'critical'

export const PRIORITIES: { value: Priority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
]

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
