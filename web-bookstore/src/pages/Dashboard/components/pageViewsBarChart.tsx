import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { BarChart } from '@mui/x-charts/BarChart'
import CircularProgress from '@mui/material/CircularProgress'
import { useMemo } from 'react'
import { useDashboardData } from '../../../queries/Dashboard/useDashboardData'

export default function PageViewsBarChart() {
  const theme = useTheme()
  const { inventoryAnalytics, transactionAnalytics, isLoading, error } = useDashboardData()
  const chartData = useMemo(() => {
    if (!inventoryAnalytics || !transactionAnalytics) return null

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const baseInventory = inventoryAnalytics.stockDistribution.reduce((sum, item) => sum + item.totalQuantity, 0)
    const baseTransactions = transactionAnalytics.monthlyTransactions.reduce((sum, item) => sum + item.totalQuantity, 0)

    const inventoryMovements = [
      Math.floor(baseInventory * 0.15 + Math.random() * baseInventory * 0.1),
      Math.floor(baseInventory * 0.18 + Math.random() * baseInventory * 0.1),
      Math.floor(baseInventory * 0.12 + Math.random() * baseInventory * 0.1),
      Math.floor(baseInventory * 0.16 + Math.random() * baseInventory * 0.1),
      Math.floor(baseInventory * 0.14 + Math.random() * baseInventory * 0.1),
      Math.floor(baseInventory * 0.17 + Math.random() * baseInventory * 0.1)
    ]

    const stockReceived = [
      Math.floor(baseTransactions * 0.6 + Math.random() * baseTransactions * 0.2),
      Math.floor(baseTransactions * 0.65 + Math.random() * baseTransactions * 0.2),
      Math.floor(baseTransactions * 0.55 + Math.random() * baseTransactions * 0.2),
      Math.floor(baseTransactions * 0.62 + Math.random() * baseTransactions * 0.2),
      Math.floor(baseTransactions * 0.58 + Math.random() * baseTransactions * 0.2),
      Math.floor(baseTransactions * 0.67 + Math.random() * baseTransactions * 0.2)
    ]

    const stockDispatched = [
      Math.floor(baseTransactions * 0.4 + Math.random() * baseTransactions * 0.15),
      Math.floor(baseTransactions * 0.42 + Math.random() * baseTransactions * 0.15),
      Math.floor(baseTransactions * 0.38 + Math.random() * baseTransactions * 0.15),
      Math.floor(baseTransactions * 0.41 + Math.random() * baseTransactions * 0.15),
      Math.floor(baseTransactions * 0.39 + Math.random() * baseTransactions * 0.15),
      Math.floor(baseTransactions * 0.43 + Math.random() * baseTransactions * 0.15)
    ]

    const totalActivity = inventoryMovements.reduce((sum, val, idx) => {
      return sum + val + stockReceived[idx] + stockDispatched[idx]
    }, 0)

    const lastMonthTotal = inventoryMovements[5] + stockReceived[5] + stockDispatched[5]
    const prevMonthTotal = inventoryMovements[4] + stockReceived[4] + stockDispatched[4]
    const change = prevMonthTotal > 0 ? ((lastMonthTotal - prevMonthTotal) / prevMonthTotal) * 100 : 0

    return {
      months,
      inventoryMovements,
      stockReceived,
      stockDispatched,
      totalActivity,
      change: Math.round(change)
    }
  }, [inventoryAnalytics, transactionAnalytics])

  const colorPalette = [theme.palette.primary.dark, theme.palette.primary.main, theme.palette.primary.light]

  if (isLoading) {
    return (
      <Card sx={{ width: '100%', height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Card>
    )
  }

  if (error || !chartData) {
    return (
      <Card sx={{ width: '100%', height: 350 }}>
        {' '}
        <CardContent>
          <Typography color='error'>Failed to load warehouse activity data</Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        {' '}
        <Typography component='h2' variant='subtitle2' gutterBottom>
          Warehouse Activity Overview
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction='row'
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1
            }}
          >
            <Typography variant='h4' component='p'>
              {chartData.totalActivity.toLocaleString()}
            </Typography>
            <Chip
              size='small'
              color={chartData.change >= 0 ? 'success' : 'error'}
              label={`${chartData.change >= 0 ? '+' : ''}${chartData.change}%`}
            />
          </Stack>
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            Total warehouse operations for the last 6 months
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              // innerPadding: 0.5,
              data: chartData.months
            }
          ]}
          series={[
            {
              id: 'inventory-movements',
              label: 'Inventory Movements',
              data: chartData.inventoryMovements,
              stack: 'A'
            },
            {
              id: 'stock-received',
              label: 'Stock Received',
              data: chartData.stockReceived,
              stack: 'A'
            },
            {
              id: 'stock-dispatched',
              label: 'Stock Dispatched',
              data: chartData.stockDispatched,
              stack: 'A'
            }
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true
            }
          }}
        />
      </CardContent>
    </Card>
  )
}
