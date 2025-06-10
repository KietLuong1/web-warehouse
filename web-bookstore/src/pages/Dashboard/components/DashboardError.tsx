/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloudOff, Error as ErrorIcon, Refresh, Warning } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material'

interface DashboardErrorProps {
  error: any
  onRetry: () => void
  title?: string
  showFallbackNotice?: boolean
}

export default function DashboardError({
  error,
  onRetry,
  title = 'Dashboard Error',
  showFallbackNotice = false
}: DashboardErrorProps) {
  const getErrorDetails = (error: any) => {
    if (!error) return { type: 'unknown', message: 'Unknown error occurred' }

    if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
      return {
        type: 'network',
        message: 'Unable to connect to the server. Please check your internet connection.',
        icon: <CloudOff />
      }
    }

    if (error.response?.status === 404) {
      return {
        type: 'notfound',
        message: 'Dashboard data endpoint not found. Please contact support.',
        icon: <Warning />
      }
    }

    if (error.response?.status >= 500) {
      return {
        type: 'server',
        message: 'Server error occurred. Please try again later.',
        icon: <ErrorIcon />
      }
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      return {
        type: 'auth',
        message: 'Authentication required. Please log in again.',
        icon: <Warning />
      }
    }

    return {
      type: 'general',
      message: error.message || 'Failed to load dashboard data',
      icon: <ErrorIcon />
    }
  }

  const errorDetails = getErrorDetails(error)

  return (
    <Card sx={{ width: '100%', minHeight: 200 }}>
      <CardContent>
        <Stack spacing={2} alignItems='center' justifyContent='center' sx={{ py: 2 }}>
          <Box sx={{ color: 'error.main', fontSize: 48 }}>{errorDetails.icon}</Box>

          <Alert severity='error' sx={{ width: '100%' }}>
            <AlertTitle>{title}</AlertTitle>
            {errorDetails.message}
          </Alert>

          {showFallbackNotice && (
            <Alert severity='info' sx={{ width: '100%' }}>
              <AlertTitle>Using Sample Data</AlertTitle>
              Displaying sample data while the dashboard service is unavailable.
              <Box sx={{ mt: 1 }}>
                <Chip label='Fallback Mode' color='info' variant='outlined' size='small' />
              </Box>
            </Alert>
          )}

          <Stack direction='row' spacing={2}>
            <Button variant='contained' startIcon={<Refresh />} onClick={onRetry} color='primary'>
              Retry
            </Button>

            <Button variant='outlined' onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </Stack>

          {process.env.NODE_ENV === 'development' && error && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1, width: '100%' }}>
              <Typography variant='caption' color='text.secondary'>
                <strong>Debug Info:</strong>
              </Typography>
              <Typography
                variant='body2'
                component='pre'
                sx={{
                  fontSize: '0.75rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}
              >
                {JSON.stringify(error, null, 2)}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
