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

export interface ApiListSupplierResponse<T> {
  suppliers: T
  message?: string
  status: 'success' | 'error'
  error?: string
  totalPages?: number
  totalElements?: number
  pageSize?: number
  currentPage?: number
}

export interface ApiListWarehouserResponse<T> {
  dataList: {
    warehouses: T[]
  }
  message?: string
  status: 'success' | 'error'
  error?: string
  totalPages?: number
  totalElements?: number
  pageSize?: number
  currentPage?: number
}
export interface PaginationResponseType<T> {
  status: number
  message: string
  data: T[]
  timestamp: string
  totalPages?: number
  totalElements?: number
  pageSize?: number
  currentPage?: number
}

export interface ApiResponseTypes<T> {
  data: T
  message?: string
  status: number
  error?: string
}
export interface ApiCategoryListResponse<T> {
  categories: T
  message?: string
  status: 'success' | 'error'
  error?: string
}

export interface ApiWarehouseResponse<T> {
  dataList: {
    warehouses: T[]
  }
  message?: string
  status: 'success' | 'error'
  error?: string
}

export interface ApiInventoryResponse<T> {
  dataList: {
    inventory: T
  }
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
  pageSize?: number
  currentPage?: number
}

export interface PaginationParams {
  page?: number
  size?: number
}
