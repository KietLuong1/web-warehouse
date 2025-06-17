
export interface ApiListResponse<T> {
  products: T
  message?: string
  status: 'success' | 'error'
  error?: string
  totalPages?: number
  totalElements?: number
  pageSize?: number
  currentPage?: number
}
export interface ApiInventoryListResponse<T> {
  status: number
  message: string
  data: {
    inventories: T[]
  }
  timestamp: string
}

export interface ApiCategoryListResponse<T> {
  categories: T
  message?: string
  status: 'success' | 'error'
  error?: string
}

export interface ApiTransactionsListResponse<T> {
  transactions: T
  message?: string
  status: 'success' | 'error'
  error?: string
  totalPages?: number
  totalElements?: number
}
