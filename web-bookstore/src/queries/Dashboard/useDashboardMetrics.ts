import { useMemo } from 'react'
import { useDashboard, useLowStockAlerts } from './useDashboard'

interface DashboardMetrics {
  inventoryCount: number
  lowStockCount: number
  totalTransactions: number
  todayTransactions: number
  totalRevenue: number
  averageStockLevel: number
  outOfStockProducts: number
  productionEfficiency: number
}

export const useDashboardMetrics = (
  dateRange: [Date, Date] | null = null,
  refreshInterval: number | null = null
): DashboardMetrics | null => {
  const { data: dashboardData, loading } = useDashboard(dateRange, refreshInterval)
  const { alerts } = useLowStockAlerts()

  return useMemo(() => {
    if (!dashboardData || loading) return null

    // Calculate today's transactions (simulate based on daily average)
    const avgDailyTransactions = Math.floor(dashboardData.transactionMetrics.transactionCount / 30)
    const todayVariation = 0.2 // 20% variation from average
    const todayTransactions = Math.floor(avgDailyTransactions * (1 + (Math.random() - 0.5) * todayVariation))

    return {
      inventoryCount: dashboardData.inventoryMetrics.totalProducts,
      lowStockCount: alerts?.length || dashboardData.inventoryMetrics.lowStockProducts,
      totalTransactions: dashboardData.transactionMetrics.transactionCount,
      todayTransactions,
      totalRevenue: dashboardData.transactionMetrics.monthlyRevenue,
      averageStockLevel: dashboardData.inventoryMetrics.averageStockLevel,
      outOfStockProducts: dashboardData.inventoryMetrics.outOfStockProducts,
      productionEfficiency: dashboardData.productionMetrics.productionEfficiency
    }
  }, [dashboardData, loading, alerts])
}
