/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError, ApiResponse, PaginationParams } from '../api.types'
import { Category, Product } from '../product.types'
import { Supplier, Transaction, TransactionRequest, TransactionStatus, Warehouse } from '../transaction.types'
import {
  DashboardData,
  TransactionTrend,
  RecentActivity,
  LowStockAlert,
  TopProduct,
  TrendPeriod,
  InventoryMetrics,
  TransactionMetrics,
  ProductionMetrics
} from '../dashboard.types'

const API_BASE_URL = 'http://localhost:8080/api/v1'

class WarehouseService {
  private baseURL: string
  private token: string | null

  constructor() {
    this.baseURL = API_BASE_URL
    this.token = localStorage.getItem('authToken')
  }
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    // Refresh token from localStorage on each request
    this.token = localStorage.getItem('authToken')

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        
        // Specific error handling for different status codes
        if (response.status === 403) {
          const errorMessage = `Access Forbidden (403): ${errorData.message || 'You do not have permission to access this resource'}`
          console.error('403 Forbidden Error:', {
            url,
            token: this.token ? 'Present' : 'Missing',
            response: errorData
          })
          throw new Error(errorMessage)
        }
        
        if (response.status === 401) {
          const errorMessage = `Unauthorized (401): ${errorData.message || 'Authentication required'}`
          console.error('401 Unauthorized Error:', {
            url,
            token: this.token ? 'Present' : 'Missing'
          })
          throw new Error(errorMessage)
        }
        
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', {
        url,
        error: error instanceof Error ? error.message : error,
        token: this.token ? 'Present' : 'Missing'
      })
      throw error as ApiError
    }
  }

  private buildQueryParams(params: Record<string, any>): string {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })
    return searchParams.toString()
  }

  // Dashboard APIs
  async getDashboardSummary(): Promise<ApiResponse<{ dashboard: DashboardData }>> {
    return this.request<{ dashboard: DashboardData }>('/dashboard/summary')
  }

  async getDashboardSummaryByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<ApiResponse<{ dashboard: DashboardData }>> {
    const params = this.buildQueryParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    })
    return this.request<{ dashboard: DashboardData }>(`/dashboard/summary/date-range?${params}`)
  }

  async getInventoryMetrics(): Promise<ApiResponse<{ inventory: InventoryMetrics }>> {
    return this.request<{ inventory: InventoryMetrics }>('/dashboard/inventory')
  }

  async getTransactionMetrics(): Promise<ApiResponse<{ transactions: TransactionMetrics }>> {
    return this.request<{ transactions: TransactionMetrics }>('/dashboard/transactions')
  }

  async getTransactionMetricsByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<ApiResponse<{ transactions: TransactionMetrics }>> {
    const params = this.buildQueryParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    })
    return this.request<{ transactions: TransactionMetrics }>(`/dashboard/transactions/date-range?${params}`)
  }

  async getProductionMetrics(): Promise<ApiResponse<{ production: ProductionMetrics }>> {
    return this.request<{ production: ProductionMetrics }>('/dashboard/production')
  }

  async getRecentActivities(limit: number = 10): Promise<ApiResponse<{ activities: RecentActivity[] }>> {
    return this.request<{ activities: RecentActivity[] }>(`/dashboard/recent-activities?limit=${limit}`)
  }

  async getTopProducts(limit: number = 5): Promise<ApiResponse<{ products: TopProduct[] }>> {
    return this.request<{ products: TopProduct[] }>(`/dashboard/top-products?limit=${limit}`)
  }

  async getLowStockAlerts(): Promise<ApiResponse<{ alerts: LowStockAlert[] }>> {
    return this.request<{ alerts: LowStockAlert[] }>('/dashboard/low-stock-alerts')
  }

  async getTransactionTrends(period: TrendPeriod = 'DAILY'): Promise<ApiResponse<{ trends: TransactionTrend[] }>> {
    return this.request<{ trends: TransactionTrend[] }>(`/dashboard/transaction-trends?period=${period}`)
  }

  // Product APIs
  async getAllProducts(): Promise<ApiResponse<{ products: Product[] }>> {
    return this.request<{ products: Product[] }>('/products/all')
  }

  async getProductById(id: string): Promise<ApiResponse<{ product: Product }>> {
    return this.request<{ product: Product }>(`/products/${id}`)
  }

  async searchProducts(searchTerm: string): Promise<ApiResponse<{ products: Product[] }>> {
    const params = this.buildQueryParams({ search: searchTerm })
    return this.request<{ products: Product[] }>(`/products/search?${params}`)
  }

  async createProduct(formData: FormData): Promise<ApiResponse<{ product: Product }>> {
    return this.request<{ product: Product }>('/products/add', {
      method: 'POST',
      body: formData,
      headers: {} // Let browser set Content-Type for FormData
    })
  }

  async updateProduct(formData: FormData): Promise<ApiResponse<{ product: Product }>> {
    return this.request<{ product: Product }>('/products/update', {
      method: 'PUT',
      body: formData,
      headers: {} // Let browser set Content-Type for FormData
    })
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/products/delete/${id}`, {
      method: 'DELETE'
    })
  }

  // Transaction APIs
  async getAllTransactions(params: PaginationParams = {}): Promise<ApiResponse<{ transactions: Transaction[] }>> {
    const queryParams = this.buildQueryParams({
      page: params.page ?? 0,
      size: params.size ?? 1000,
      filter: params.filter
    })
    return this.request<{ transactions: Transaction[] }>(`/transactions/all?${queryParams}`)
  }

  async getTransactionById(id: string): Promise<ApiResponse<{ transaction: Transaction }>> {
    return this.request<{ transaction: Transaction }>(`/transactions/${id}`)
  }

  async createPurchase(transactionData: TransactionRequest): Promise<ApiResponse<{ transaction: Transaction }>> {
    return this.request<{ transaction: Transaction }>('/transactions/purchase', {
      method: 'POST',
      body: JSON.stringify(transactionData)
    })
  }

  async createSale(transactionData: TransactionRequest): Promise<ApiResponse<{ transaction: Transaction }>> {
    return this.request<{ transaction: Transaction }>('/transactions/sell', {
      method: 'POST',
      body: JSON.stringify(transactionData)
    })
  }

  async createReturn(transactionData: TransactionRequest): Promise<ApiResponse<{ transaction: Transaction }>> {
    return this.request<{ transaction: Transaction }>('/transactions/return', {
      method: 'POST',
      body: JSON.stringify(transactionData)
    })
  }

  async updateTransactionStatus(
    transactionId: string,
    status: TransactionStatus
  ): Promise<ApiResponse<{ transaction: Transaction }>> {
    return this.request<{ transaction: Transaction }>(`/transactions/${transactionId}`, {
      method: 'PUT',
      body: JSON.stringify(status)
    })
  }

  async getAllCategories(): Promise<ApiResponse<{ categories: Category[] }>> {
    return this.request<{ categories: Category[] }>('/categories/all')
  }

  async getAllSuppliers(): Promise<ApiResponse<{ suppliers: Supplier[] }>> {
    return this.request<{ suppliers: Supplier[] }>('/suppliers/all')
  }

  async getAllWarehouses(): Promise<ApiResponse<{ warehouses: Warehouse[] }>> {
    return this.request<{ warehouses: Warehouse[] }>('/warehouses')
  }

  async getWarehouseInventory(id: string): Promise<ApiResponse<{ inventory: Product[] }>> {
    return this.request<{ inventory: Product[] }>(`/warehouses/${id}/inventory`)
  }
}

export default new WarehouseService()
