export interface ApiListResponse<T> {
  products: T
  message?: string
  status: 'success' | 'error'
  error?: string
}

export interface ApiInventoryListResponse<T> {
  status: number
  message: string
  data: {
    inventories: T[]
  }
  timestamp: string
}
