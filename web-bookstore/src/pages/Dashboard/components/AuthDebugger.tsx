import { Card, CardContent, Typography, Button, Stack, Chip } from '@mui/material'
import { useState } from 'react'

export default function AuthDebugger() {
  const [testResult, setTestResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const testAuthToken = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('authToken')
      const response = await fetch('http://localhost:8080/api/v1/dashboard/transaction-trends?period=DAILY', {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      })

      const data = await response.json().catch(() => ({}))

      setTestResult(
        JSON.stringify(
          {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            accessToken: localStorage.getItem('accessToken') ? 'Present' : 'Missing',
            authToken: localStorage.getItem('authToken') ? 'Present' : 'Missing',
            response: data
          },
          null,
          2
        )
      )
    } catch (error) {
      setTestResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }
  const clearToken = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')
    setTestResult('All tokens cleared')
  }

  const accessToken = localStorage.getItem('accessToken')
  const authToken = localStorage.getItem('authToken')
  const hasToken = accessToken || authToken

  return (
    <Card sx={{ width: '100%', mb: 2 }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Authentication Debugger
        </Typography>

        <Stack spacing={2}>
          {' '}
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='body2'>Auth Token:</Typography>
            <Chip label={hasToken ? 'Present' : 'Missing'} color={hasToken ? 'success' : 'error'} size='small' />
            {accessToken && (
              <Typography variant='caption' sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Access: {accessToken.substring(0, 20)}...
              </Typography>
            )}
            {authToken && (
              <Typography variant='caption' sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Auth: {authToken.substring(0, 20)}...
              </Typography>
            )}
          </Stack>
          <Stack direction='row' spacing={1}>
            <Button variant='contained' onClick={testAuthToken} disabled={isLoading} size='small'>
              {isLoading ? 'Testing...' : 'Test API Call'}
            </Button>
            <Button variant='outlined' onClick={clearToken} size='small' color='error'>
              Clear Token
            </Button>
          </Stack>
          {testResult && (
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='caption'>API Test Result:</Typography>
                <pre
                  style={{
                    fontSize: '12px',
                    backgroundColor: '#f5f5f5',
                    padding: '8px',
                    borderRadius: '4px',
                    overflow: 'auto',
                    maxHeight: '200px'
                  }}
                >
                  {testResult}
                </pre>
              </CardContent>
            </Card>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
