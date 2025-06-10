import React, { useState } from 'react'
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import { Notifications, Circle, MarkEmailRead } from '@mui/icons-material'

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  isRead: boolean
  type: 'info' | 'warning' | 'error' | 'success'
}

interface NotificationBellProps {
  notifications?: Notification[]
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
}

export default function NotificationBell({ notifications = [], onMarkAsRead, onMarkAllAsRead }: NotificationBellProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const sampleNotifications: Notification[] = [
    {
      id: '1',
      title: 'Low Stock Alert',
      message: 'Product ABC123 is running low on stock',
      timestamp: '2 mins ago',
      isRead: false,
      type: 'warning'
    },
    {
      id: '2',
      title: 'New Order Received',
      message: 'Order #ORD-001 has been placed',
      timestamp: '5 mins ago',
      isRead: false,
      type: 'info'
    },
    {
      id: '3',
      title: 'Inventory Updated',
      message: 'Location A inventory has been updated',
      timestamp: '10 mins ago',
      isRead: true,
      type: 'success'
    }
  ]

  const allNotifications = notifications.length > 0 ? notifications : sampleNotifications
  const unreadCount = allNotifications.filter((n) => !n.isRead).length

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMarkAsRead = (id: string) => {
    if (onMarkAsRead) {
      onMarkAsRead(id)
    }
  }

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead()
    }
    handleMenuClose()
  }

  const getNotificationColor = (type: string) => {
    const colors = {
      info: '#2196f3',
      warning: '#ff9800',
      error: '#f44336',
      success: '#4caf50'
    }
    return colors[type as keyof typeof colors] || colors.info
  }

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        sx={{
          p: 1,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        <Badge
          badgeContent={unreadCount}
          color='error'
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '10px',
              height: '16px',
              minWidth: '16px'
            }
          }}
        >
          <Notifications sx={{ fontSize: 24, color: 'text.primary' }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 320,
            maxWidth: 400,
            maxHeight: 400,
            '& .MuiMenuItem-root': {
              fontFamily: 'Poppins'
            }
          }
        }}
      >
        {/* Header */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6' sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <IconButton size='small' onClick={handleMarkAllAsRead} sx={{ p: 0.5 }}>
                <MarkEmailRead sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>
          {unreadCount > 0 && (
            <Typography variant='caption' sx={{ color: 'text.secondary', fontFamily: 'Poppins' }}>
              {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
            </Typography>
          )}
        </Box>

        {/* Notifications List */}
        {allNotifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant='body2' color='text.secondary' sx={{ fontFamily: 'Poppins' }}>
              No notifications
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0, maxHeight: 300, overflow: 'auto' }}>
            {allNotifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    px: 2,
                    py: 1.5,
                    cursor: 'pointer',
                    backgroundColor: notification.isRead ? 'transparent' : 'rgba(25, 118, 210, 0.04)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Circle
                      sx={{
                        fontSize: 8,
                        color: notification.isRead ? 'transparent' : getNotificationColor(notification.type)
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant='body2'
                        sx={{
                          fontFamily: 'Poppins',
                          fontWeight: notification.isRead ? 400 : 600,
                          fontSize: '13px',
                          mb: 0.5
                        }}
                      >
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant='body2'
                          sx={{
                            fontFamily: 'Poppins',
                            fontSize: '12px',
                            color: 'text.secondary',
                            mb: 0.5
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant='caption'
                          sx={{
                            fontFamily: 'Poppins',
                            fontSize: '11px',
                            color: 'text.disabled'
                          }}
                        >
                          {notification.timestamp}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < allNotifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}

        {/* Footer */}
        {allNotifications.length > 0 && (
          <>
            <Divider />
            <MenuItem
              onClick={handleMenuClose}
              sx={{
                justifyContent: 'center',
                py: 1.5,
                color: 'primary.main',
                fontWeight: 500
              }}
            >
              View All Notifications
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  )
}
