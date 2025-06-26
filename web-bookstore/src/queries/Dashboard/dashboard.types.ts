/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DashboardData {
  inventoryMetrics: InventoryMetrics
  transactionMetrics: TransactionMetrics
  productionMetrics: ProductionMetrics
}

export interface InventoryMetrics {
  totalProducts: number
  lowStockProducts: number
  outOfStockProducts: number
  totalInventoryValue: number
  averageStockLevel: number
  expiringSoon: number
  lowStockAlerts: LowStockAlert[]
  topProductsByValue: TopProduct[]
}

export interface TransactionMetrics {
  completedTransactions: number
  dailyRevenue: number
  monthlyRevenue: number
  pendingTransactions: number
  processingTransactions: number
  totalPurchases: number
  totalReturns: number
  totalSales: number
}

export interface ProductionMetrics {
  productionValue: number
  totalProductsProduced: number
  productionEfficiency: number
  activeSuppliers: number
  monthlyProduction: Record<string, number>
  categoryPerformance: any[]
}

export interface TransactionTrend {
  date: string
  amount: number
  count: number
  type: 'SALE' | 'PURCHASE' | 'RETURN'
}

export interface RecentActivity {
  id: string
  activityType: string
  description: string
  username: string
  status: 'COMPLETED' | 'PENDING' | 'FAILED'
  timestamp: string
}

export interface LowStockAlert {
  productId: string
  productName: string
  sku: string
  currentStock: number
  minimumThreshold: number
  severity: 'WARNING' | 'CRITICAL'
}

export interface TopProduct {
  productId: string
  productName: string
  sku: string
  totalSales: number
  revenue: number
  unitsSold: number
}

export type TrendPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY'

export interface MetricCard {
  title: string
  value: string | number
  icon: string
  color: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'teal'
  change: string
  trend: 'up' | 'down' | 'neutral'
}
