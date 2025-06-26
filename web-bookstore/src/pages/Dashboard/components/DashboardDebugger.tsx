/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuthentication } from '../../../context/AuthenticationContext'

export default function DashboardDebugger() {
  const [testResults, setTestResults] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated } = useAuthentication()

  const endpoints = [
    { name: 'Dashboard Summary', url: '/dashboard/summary' },
    { name: 'Transaction Trends', url: '/dashboard/transaction-trends?period=DAILY' },
    { name: 'Low Stock Alerts', url: '/dashboard/low-stock-alerts' }
  ]

  const testEndpoint = async (endpoint: any) => {
    const token = localStorage.getItem('accessToken') || localStorage.getItem('authToken')

    try {
      const response = await fetch(`http://localhost:8081/warehouse-svc/api/v1${endpoint.url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      })

      const data = await response.json().catch(() => ({}))

      return {
        name: endpoint.name,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        data: response.ok ? 'Success' : data,
        error: !response.ok ? data.message || `${response.status} ${response.statusText}` : null
      }
    } catch (error) {
      return {
        name: endpoint.name,
        status: 'Error',
        error: error instanceof Error ? error.message : 'Network error',
        data: null
      }
    }
  }

  const testAllEndpoints = async () => {
    setIsLoading(true)
    const results: Record<string, any> = {}

    for (const endpoint of endpoints) {
      const result = await testEndpoint(endpoint)
      results[endpoint.name] = result
    }

    setTestResults(results)
    setIsLoading(false)
  }

  const getAuthInfo = () => {
    return {
      isAuthenticated,
      accessToken: localStorage.getItem('accessToken') ? 'Present' : 'Missing',
      refreshToken: localStorage.getItem('refreshToken') ? 'Present' : 'Missing',
      userId: localStorage.getItem('userId') || 'Missing',
      userRole: localStorage.getItem('userRole') || 'Missing',
      tokenPreview: localStorage.getItem('accessToken')?.substring(0, 30) + '...' || 'N/A'
    }
  }

  useEffect(() => {
    // Auto-test on component mount
    if (isAuthenticated) {
      testAllEndpoints()
    }
  }, [isAuthenticated])

  const authInfo = getAuthInfo()

  return (
    <Card sx={{ width: '100%', mb: 2 }}>
      <CardContent>
        <Typography variant='h6' gutterBottom color='primary'>
          🔍 Dashboard Debug Center
        </Typography>

        {/* Authentication Status */}
        <Box sx={{ mb: 2 }}>
          <Typography variant='subtitle2' gutterBottom>
            Authentication Status:
          </Typography>
          <Stack direction='row' spacing={1} alignItems='center' flexWrap='wrap'>
            <Chip
              label={`Auth: ${authInfo.isAuthenticated ? 'OK' : 'FAILED'}`}
              color={authInfo.isAuthenticated ? 'success' : 'error'}
              size='small'
            />
            <Chip
              label={`Token: ${authInfo.accessToken}`}
              color={authInfo.accessToken === 'Present' ? 'success' : 'error'}
              size='small'
            />
            <Chip
              label={`Role: ${authInfo.userRole}`}
              color={authInfo.userRole !== 'Missing' ? 'info' : 'warning'}
              size='small'
            />
            <Chip
              label={`User ID: ${authInfo.userId}`}
              color={authInfo.userId !== 'Missing' ? 'info' : 'warning'}
              size='small'
            />
          </Stack>

          {authInfo.accessToken === 'Present' && (
            <Typography variant='caption' sx={{ display: 'block', mt: 1, fontFamily: 'monospace' }}>
              Token Preview: {authInfo.tokenPreview}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* API Tests */}
        <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
          <Button
            variant='contained'
            onClick={testAllEndpoints}
            disabled={isLoading || !authInfo.isAuthenticated}
            size='small'
          >
            {isLoading ? 'Testing APIs...' : 'Test All Endpoints'}
          </Button>

          <Button variant='outlined' onClick={() => (window.location.href = '/login')} size='small' color='warning'>
            Re-Login
          </Button>
        </Stack>

        {!authInfo.isAuthenticated && (
          <Alert severity='error' sx={{ mb: 2 }}>
            ❌ Not authenticated! Please log in first.
          </Alert>
        )}

        {/* Test Results */}
        {Object.keys(testResults).length > 0 && (
          <Box>
            <Typography variant='subtitle2' gutterBottom>
              API Test Results:
            </Typography>
            {Object.entries(testResults).map(([name, result]: [string, any]) => (
              <Card key={name} variant='outlined' sx={{ mb: 1, p: 1 }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Typography variant='body2' fontWeight='bold'>
                    {result.name}
                  </Typography>
                  <Chip label={result.status} color={result.ok ? 'success' : 'error'} size='small' />
                </Stack>

                {result.error && (
                  <Alert severity='error' sx={{ mt: 1, p: 1 }}>
                    <Typography variant='caption'>🚨 {result.error}</Typography>

                    {result.status === 403 && (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant='caption' color='error.main' fontWeight='bold'>
                          Possible causes:
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px' }}>
                          <li>User role '{authInfo.userRole}' doesn't have dashboard access</li>
                          <li>Token expired or invalid</li>
                          <li>Backend permission settings</li>
                          <li>API endpoint requires different role/permissions</li>
                        </ul>
                      </Box>
                    )}
                  </Alert>
                )}

                {result.ok && (
                  <Typography variant='caption' color='success.main'>
                    ✅ Success
                  </Typography>
                )}
              </Card>
            ))}
          </Box>
        )}

        {/* Quick Actions */}
        <Divider sx={{ my: 2 }} />
        <Typography variant='subtitle2' gutterBottom>
          Quick Actions:
        </Typography>
        <Stack direction='row' spacing={1} flexWrap='wrap'>
          <Button
            size='small'
            variant='outlined'
            onClick={() => {
              console.log('Full Auth Debug:', {
                localStorage: { ...localStorage },
                sessionStorage: { ...sessionStorage },
                authInfo
              })
            }}
          >
            Console Log Auth
          </Button>

          <Button
            size='small'
            variant='outlined'
            color='error'
            onClick={() => {
              localStorage.clear()
              sessionStorage.clear()
              window.location.href = '/login'
            }}
          >
            Clear All & Re-login
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
