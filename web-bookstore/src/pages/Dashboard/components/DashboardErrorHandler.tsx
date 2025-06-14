import { useState } from 'react'
import { Alert, Button, Typography, Box } from '@mui/material'

interface DashboardErrorHandlerProps {
  error: string | null
  onRetry?: () => void
}

export default function DashboardErrorHandler({ error, onRetry }: DashboardErrorHandlerProps) {
  const [showDetails, setShowDetails] = useState(false)

  if (!error) return null

  const is403Error = error.includes('403') || error.includes('Forbidden')
  const userRole = localStorage.getItem('userRole') || 'Unknown'

  const handleRelogin = () => {
    // Clear auth data
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')

    // Redirect to login
    window.location.href = '/login'
  }

  return (
    <Alert
      severity='error'
      sx={{ mb: 2 }}
      action={
        <Box sx={{ display: 'flex', gap: 1 }}>
          {onRetry && (
            <Button color='inherit' size='small' onClick={onRetry}>
              Retry
            </Button>
          )}
          <Button color='inherit' size='small' onClick={handleRelogin}>
            Re-login
          </Button>
        </Box>
      }
    >
      <Typography variant='body2' fontWeight='bold'>
        {is403Error ? '🔒 Access Denied' : '❌ Dashboard Error'}
      </Typography>

      <Typography variant='body2' sx={{ mt: 1 }}>
        {is403Error
          ? `Your account role "${userRole}" may not have permission to access dashboard data.`
          : 'There was an error loading the dashboard.'}
      </Typography>

      {is403Error && (
        <Typography variant='caption' sx={{ display: 'block', mt: 1 }}>
          💡 Contact your administrator to grant dashboard permissions, or try logging in with a different account.
        </Typography>
      )}

      <Button size='small' onClick={() => setShowDetails(!showDetails)} sx={{ mt: 1, textTransform: 'none' }}>
        {showDetails ? 'Hide' : 'Show'} Error Details
      </Button>

      {showDetails && (
        <Box sx={{ mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant='caption' fontFamily='monospace'>
            {error}
          </Typography>
        </Box>
      )}
    </Alert>
  )
}
