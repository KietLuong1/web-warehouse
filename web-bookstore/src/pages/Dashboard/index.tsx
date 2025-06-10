import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Alert } from '@mui/material'
import { useState } from 'react'
import MainStack from './components/mainStack'
import { useDashboard } from '../../queries/Dashboard/useDashboard'

function Dashboard() {
  const [dateRange] = useState<[Date, Date] | null>(null)
  const [refreshInterval] = useState<number | null>(30000) // 30 seconds default
  
  // Use the real dashboard hook
  const { error: dashboardError } = useDashboard(dateRange, refreshInterval)
  
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
        {dashboardError && (
          <Alert severity='error' sx={{ mx: 2 }}>
            Error loading dashboard data: {dashboardError}
          </Alert>
        )}

        <MainStack />
      </Stack>
    </Box>
  )
}

export default Dashboard
