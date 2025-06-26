import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import MainStack from './components/mainStack'

function Dashboard() {
  // const [dateRange] = useState<[Date, Date] | null>(null)
  // const [refreshInterval] = useState<number | null>(30000) // 30 seconds default

  // // Use the real dashboard hook
  // const { error: dashboardError, refresh } = useDashboard(dateRange, refreshInterval)

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '8px 0'
      }}
    >
      <Stack spacing={2} sx={{ width: '100%' }}>
        {/* <DashboardErrorHandler error={dashboardError} onRetry={refresh} /> */}
        <MainStack />
      </Stack>
    </Box>
  )
}

export default Dashboard
