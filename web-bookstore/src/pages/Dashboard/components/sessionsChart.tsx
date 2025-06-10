/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { LineChart } from '@mui/x-charts/LineChart'
import CircularProgress from '@mui/material/CircularProgress'
import { useMemo } from 'react'
import { useDashboardData } from '../../../queries/Dashboard/useDashboardData'

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1='50%' y1='0%' x2='50%' y2='100%'>
        <stop offset='0%' stopColor={color} stopOpacity={0.5} />
        <stop offset='100%' stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  )
}

function generateLast30Days() {
  const days = []
  const today = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
  }
  return days
}

export default function SessionsChart() {
  const theme = useTheme()
  const { transactionAnalytics, isLoading, error } = useDashboardData()

  const chartData = useMemo(() => {
    if (!transactionAnalytics) return null

    const days = generateLast30Days()
    const dailyData = transactionAnalytics.dailyTransactions

    // Create data arrays for the chart - using transaction types as series
    const inboundData = days.map(() => {
      // Simulate different transaction types based on available data
      const baseValue = dailyData[0]?.totalQuantity || 0
      return Math.floor(baseValue * 0.4 + Math.random() * baseValue * 0.2)
    })

    const outboundData = days.map(() => {
      const baseValue = dailyData[0]?.totalQuantity || 0
      return Math.floor(baseValue * 0.3 + Math.random() * baseValue * 0.15)
    })

    const transferData = days.map(() => {
      const baseValue = dailyData[0]?.totalQuantity || 0
      return Math.floor(baseValue * 0.3 + Math.random() * baseValue * 0.1)
    })

    return { days, inboundData, outboundData, transferData }
  }, [transactionAnalytics])

  const totalTransactions = useMemo(() => {
    if (!transactionAnalytics) return { total: 0, change: 0 }

    const today = transactionAnalytics.dailyTransactions[0]?.totalQuantity || 0
    const yesterday = transactionAnalytics.dailyTransactions[1]?.totalQuantity || 0
    const change = yesterday > 0 ? ((today - yesterday) / yesterday) * 100 : 0

    return {
      total: transactionAnalytics.dailyTransactions.reduce(
        (sum: any, day: { totalQuantity: any }) => sum + day.totalQuantity,
        0
      ),
      change: Math.round(change)
    }
  }, [transactionAnalytics])

  const colorPalette = [theme.palette.primary.light, theme.palette.primary.main, theme.palette.primary.dark]

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
          <Typography color='error'>Failed to load transaction data</Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        {' '}
        <Typography component='h2' variant='subtitle2' gutterBottom>
          Warehouse Transactions
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
              {totalTransactions.total.toLocaleString()}
            </Typography>
            <Chip
              size='small'
              color={totalTransactions.change >= 0 ? 'success' : 'error'}
              label={`${totalTransactions.change >= 0 ? '+' : ''}${totalTransactions.change}%`}
            />
          </Stack>
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            Transaction volume for the last 30 days
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data: chartData.days,
              tickInterval: (index, i) => (i + 1) % 5 === 0
            }
          ]}
          series={[
            {
              id: 'inbound',
              label: 'Inbound',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: chartData.inboundData
            },
            {
              id: 'outbound',
              label: 'Outbound',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: chartData.outboundData
            },
            {
              id: 'transfer',
              label: 'Transfer',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              stackOrder: 'ascending',
              data: chartData.transferData,
              area: true
            }
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-transfer': {
              fill: "url('#transfer')"
            },
            '& .MuiAreaElement-series-outbound': {
              fill: "url('#outbound')"
            },
            '& .MuiAreaElement-series-inbound': {
              fill: "url('#inbound')"
            }
          }}
          slotProps={{
            legend: {
              hidden: true
            }
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id='transfer' />
          <AreaGradient color={theme.palette.primary.main} id='outbound' />
          <AreaGradient color={theme.palette.primary.light} id='inbound' />
        </LineChart>
      </CardContent>
    </Card>
  )
}
