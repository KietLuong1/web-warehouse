import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert
} from '@mui/material'
import { Warning, Error } from '@mui/icons-material'
import { useLowStockAlerts } from '../../../queries/Dashboard/useDashboard'

export default function LowStockAlerts() {
  const { alerts, loading, error } = useLowStockAlerts()

  if (loading) {
    return (
      <Card sx={{ width: '100%', height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Card>
    )
  }

  if (error) {
    return (
      <Card sx={{ width: '100%', height: 350 }}>
        <CardContent>
          <Typography color='error'>Failed to load low stock alerts</Typography>
        </CardContent>
      </Card>
    )
  }

  const criticalAlerts = alerts?.filter((alert) => alert.severity === 'CRITICAL') || []
  const warningAlerts = alerts?.filter((alert) => alert.severity === 'WARNING') || []

  return (
    <Card sx={{ width: '100%', height: 350 }}>
      <CardContent>
        <Typography component='h2' variant='subtitle2' gutterBottom>
          Low Stock Alerts
        </Typography>

        <Stack direction='row' spacing={2} sx={{ mb: 2 }}>
          <Chip size='small' color='error' label={`${criticalAlerts.length} Critical`} icon={<Error />} />
          <Chip size='small' color='warning' label={`${warningAlerts.length} Warning`} icon={<Warning />} />
        </Stack>

        {alerts && alerts.length === 0 ? (
          <Alert severity='success' sx={{ mt: 2 }}>
            All products are adequately stocked!
          </Alert>
        ) : (
          <Box sx={{ maxHeight: 250, overflow: 'auto' }}>
            <List dense>
              {alerts?.slice(0, 8).map((alert) => (
                <ListItem key={alert.productId} divider>
                  <ListItemIcon>
                    {alert.severity === 'CRITICAL' ? (
                      <Error color='error' fontSize='small' />
                    ) : (
                      <Warning color='warning' fontSize='small' />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={alert.productName}
                    secondary={
                      <Box>
                        <Typography variant='caption' display='block'>
                          SKU: {alert.sku}
                        </Typography>
                        <Typography variant='caption' display='block'>
                          Stock: {alert.currentStock} / Min: {alert.minimumThreshold}
                        </Typography>
                      </Box>
                    }
                  />
                  <Chip
                    size='small'
                    color={alert.severity === 'CRITICAL' ? 'error' : 'warning'}
                    label={alert.severity}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {alerts && alerts.length > 8 && (
          <Typography variant='caption' sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
            Showing 8 of {alerts.length} alerts
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
