import { Card, CardContent, Chip, CircularProgress, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { LineChart } from '@mui/x-charts/LineChart'
import { useMemo } from 'react'
import { TrendPeriod } from '../../../queries/Dashboard/dashboard.types'
import { useTransactionTrends } from '../../../queries/Dashboard/useDashboard'

interface TransactionTrendsProps {
  period?: TrendPeriod
  height?: number
}

export default function TransactionTrends({ period = 'DAILY', height = 350 }: TransactionTrendsProps) {
  const theme = useTheme()
  const { trends, loading, error } = useTransactionTrends(period)

  // Debug logging for 403 errors
  if (error) {
    console.error('TransactionTrends Error:', {
      error,
      period,
      authToken: localStorage.getItem('authToken') ? 'Present' : 'Missing',
      endpoint: `/dashboard/transaction-trends?period=${period}`
    })
  }

  // Debug logging
  console.log('TransactionTrends Debug:', {
    trends,
    loading,
    error,
    period,
    authToken: localStorage.getItem('authToken') ? 'Present' : 'Missing'
  })

  const chartData = useMemo(() => {
    // if (!trends || trends.length === 0) return null

    const salesData = trends?.filter((t) => t.type === 'SALE')
    const purchaseData = trends?.filter((t) => t.type === 'PURCHASE')
    const returnData = trends?.filter((t) => t.type === 'RETURN')

    // Create time labels based on period
    const labels = trends?.map((trend) => {
      const date = new Date(trend.date)
      if (period === 'DAILY') {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      } else if (period === 'WEEKLY') {
        return `Week ${Math.ceil(date.getDate() / 7)}`
      } else {
        return date.toLocaleDateString('en-US', { month: 'short' })
      }
    })

    // Calculate percentage changes
    const totalCurrent = trends?.reduce((sum, t) => sum + t.amount, 0)
    const totalPrevious = trends?.slice(0, Math.floor(trends?.length / 2)).reduce((sum, t) => sum + t.amount, 0)
    const change = totalPrevious > 0 ? ((totalCurrent - totalPrevious) / totalPrevious) * 100 : 0

    return {
      labels: [...new Set(labels)],
      salesData: salesData.map((t) => t.amount),
      purchaseData: purchaseData.map((t) => t.amount),
      returnData: returnData.map((t) => t.amount),
      totalAmount: totalCurrent,
      change: Math.round(change)
    }
  }, [trends, period])

  if (loading) {
    return (
      <Card sx={{ width: '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Card>
    )
  }
  console.log('TransactionTrends Chart Data:', chartData)
  if (error || !chartData) {
    const is403Error = error?.includes('403') || error?.includes('Forbidden')
    const isAuthError = error?.includes('Unauthorized') || error?.includes('401')

    return (
      <Card sx={{ width: '100%', height }}>
        <CardContent>
          <Typography color='error' variant='h6' gutterBottom>
            Failed to load transaction trends
          </Typography>

          {is403Error && (
            <Stack spacing={1}>
              <Typography variant='body2' color='error'>
                Access Denied (403): You don't have permission to access this resource.
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                This might be due to:
              </Typography>
              <Typography variant='caption' component='ul' sx={{ pl: 2 }}>
                <li>Insufficient user permissions</li>
                <li>Invalid or expired authentication token</li>
                <li>Server-side access restrictions</li>
              </Typography>
            </Stack>
          )}

          {isAuthError && (
            <Typography variant='body2' color='error'>
              Authentication Required: Please log in again.
            </Typography>
          )}

          {error && !is403Error && !isAuthError && (
            <Typography variant='body2' color='error'>
              Error: {error}
            </Typography>
          )}

          <Typography variant='caption' sx={{ mt: 2, display: 'block' }}>
            Endpoint: /dashboard/transaction-trends?period={period}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const colorPalette = [
    theme.palette.success.main, // Sales - green
    theme.palette.primary.main, // Purchases - blue
    theme.palette.error.main // Returns - red
  ]

  return (
    <Card sx={{ width: '100%', height }}>
      <CardContent>
        <Typography component='h2' variant='subtitle2' gutterBottom>
          Transaction Trends ({period.toLowerCase()})
        </Typography>

        <Stack sx={{ justifyContent: 'space-between', mb: 2 }}>
          <Stack
            direction='row'
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1
            }}
          >
            <Typography variant='h4' component='p'>
              ${chartData.totalAmount.toLocaleString()}
            </Typography>
            <Chip
              size='small'
              color={chartData.change >= 0 ? 'success' : 'error'}
              label={`${chartData.change >= 0 ? '+' : ''}${chartData.change}%`}
            />
          </Stack>
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            Total transaction value for the period
          </Typography>
        </Stack>

        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data: chartData.labels,
              tickInterval: (_index, i) => (i + 1) % Math.ceil(chartData.labels.length / 6) === 0
            }
          ]}
          series={[
            {
              id: 'sales',
              label: 'Sales',
              data: chartData.salesData,
              curve: 'linear',
              showMark: true
            },
            {
              id: 'purchases',
              label: 'Purchases',
              data: chartData.purchaseData,
              curve: 'linear',
              showMark: true
            },
            {
              id: 'returns',
              label: 'Returns',
              data: chartData.returnData,
              curve: 'linear',
              showMark: true
            }
          ]}
          height={height - 120}
          margin={{ left: 60, right: 20, top: 20, bottom: 40 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'middle' }
            }
          }}
        />
      </CardContent>
    </Card>
  )
}
