export interface Todo {
  id: string
  title: string
  completed: boolean
  categoryId: string | null
  dueDate: string | null
  createdAt: string
}

export interface Category {
  id: string
  name: string
  color: string
}
