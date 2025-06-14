// hooks/useDashboard.ts
import { useCallback, useEffect, useState } from 'react'
import { DashboardData, TrendPeriod } from './dashboard.types'
import warehouseService from './services/warehouse.service'

interface UseDashboardReturn {
  data: DashboardData | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export const useDashboard = (
  dateRange: [Date, Date] | null = null,
  refreshInterval: number | null = null
): UseDashboardReturn => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadDashboardData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)

      let result
      if (dateRange && dateRange.length === 2) {
        result = await warehouseService.getDashboardSummaryByDateRange(dateRange[0], dateRange[1])
      } else {
        result = await warehouseService.getDashboardSummary()
      }

      setData(result.data.dashboard)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      console.error('Dashboard data loading failed:', err)
    } finally {
      setLoading(false)
    }
  }, [dateRange])

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  useEffect(() => {
    if (!refreshInterval) return

    const interval = setInterval(loadDashboardData, refreshInterval)
    return () => clearInterval(interval)
  }, [loadDashboardData, refreshInterval])

  return {
    data,
    loading,
    error,
    refresh: loadDashboardData
  }
}

interface UseTransactionTrendsReturn {
  trends: import('./dashboard.types').TransactionTrend[]
  loading: boolean
  error: string | null
}

export const useTransactionTrends = (period: TrendPeriod = 'DAILY'): UseTransactionTrendsReturn => {
  const [trends, setTrends] = useState<import('./dashboard.types').TransactionTrend[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTrends = async (): Promise<void> => {
      try {
        setLoading(true)
        setError(null)
        const response = await warehouseService.getTransactionTrends(period)
        setTrends(response.data.trends || [])
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load trends'
        setError(errorMessage)
        console.error('Failed to load trends:', err)
      } finally {
        setLoading(false)
      }
    }

    loadTrends()
  }, [period])

  return { trends, loading, error }
}

interface UseLowStockAlertsReturn {
  alerts: import('./dashboard.types').LowStockAlert[]
  loading: boolean
  error: string | null
}

export const useLowStockAlerts = (): UseLowStockAlertsReturn => {
  const [alerts, setAlerts] = useState<import('./dashboard.types').LowStockAlert[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAlerts = async (): Promise<void> => {
      try {
        setLoading(true)
        setError(null)
        const response = await warehouseService.getLowStockAlerts()
        setAlerts(response.data.alerts || [])
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load alerts'
        setError(errorMessage)
        console.error('Failed to load alerts:', err)
      } finally {
        setLoading(false)
      }
    }

    loadAlerts()
  }, [])

  return { alerts, loading, error }
}
