import { Grid2 } from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useDashboard } from '../../../queries/Dashboard/useDashboard'
import '../styles/animations.css'
import AuthDebugger from './AuthDebugger'
import LowStockAlerts from './LowStockAlerts'
import PageViewsBarChart from './pageViewsBarChart'
import SessionsChart from './sessionsChart'
import StatCard, { StatCardProps } from './statCard'
import TransactionTrends from './TransactionTrends'

function Item({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        borderRadius: 2
      }}
    >
      {children}
    </Box>
  )
}

export default function MainStack() {
  // Auto-refresh dashboard data every 30 seconds
  const { data: dashboardMetrics, loading } = useDashboard(null, 30000)
  const data: StatCardProps[] = [
    {
      title: 'Inventory',
      value: dashboardMetrics?.inventoryMetrics?.totalProducts?.toLocaleString() || '0',
      interval: 'Last 30 days',
      trend: dashboardMetrics?.inventoryMetrics
        ? dashboardMetrics.inventoryMetrics.lowStockProducts < 10
          ? 'up'
          : 'down'
        : 'neutral',
      realTimeValue: dashboardMetrics?.inventoryMetrics?.totalProducts,
      isConnected: !!dashboardMetrics && !loading,
      isAnimating: loading,
      data: [
        200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380, 360, 400, 380, 420, 400, 640,
        340, 460, 440, 480, 460, 600, 880, 920
      ]
    },
    {
      title: 'Low Stock Items',
      value: dashboardMetrics?.inventoryMetrics?.lowStockProducts?.toString() || '0',
      interval: 'Critical alerts',
      trend: dashboardMetrics?.inventoryMetrics
        ? dashboardMetrics.inventoryMetrics.lowStockProducts > 20
          ? 'down'
          : 'up'
        : 'neutral',
      realTimeValue: dashboardMetrics?.inventoryMetrics?.lowStockProducts,
      isConnected: !!dashboardMetrics && !loading,
      isAnimating: loading,
      data: [
        1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820, 780, 800, 760, 380, 740, 660,
        620, 840, 500, 520, 480, 400, 360, 300, 220
      ]
    },
    {
      title: 'Transactions',
      value: dashboardMetrics?.transactionMetrics?.transactionCount?.toLocaleString() || '0',
      interval: `Revenue: $${dashboardMetrics?.transactionMetrics?.dailyRevenue?.toLocaleString() || 0}`,
      trend: dashboardMetrics?.transactionMetrics
        ? dashboardMetrics.transactionMetrics.dailyRevenue > 10000
          ? 'up'
          : 'neutral'
        : 'neutral',
      realTimeValue: dashboardMetrics?.transactionMetrics?.transactionCount,
      isConnected: !!dashboardMetrics && !loading,
      isAnimating: loading,
      data: [
        500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530, 520, 410, 530, 520, 610, 530,
        520, 610, 530, 420, 510, 430, 520, 510
      ]
    }
  ]
  return (
    <Stack
      spacing={2}
      sx={{
        paddingX: 2
      }}
    >
      <AuthDebugger />
      <Grid2 container spacing={2}>
        {data.map((card, index) => (
          <Grid2 size={4} mt={2} key={index}>
            <Item children={<StatCard {...card} />} />
          </Grid2>
        ))}
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <Item children={<SessionsChart />} />
        </Grid2>
        <Grid2 size={6}>
          <Item children={<PageViewsBarChart />} />
        </Grid2>

        <Grid2 size={6}>
          <Item children={<LowStockAlerts />} />
        </Grid2>
        <Grid2 size={6}>
          <Item children={<TransactionTrends />} />
        </Grid2>
      </Grid2>
    </Stack>
  )
}
