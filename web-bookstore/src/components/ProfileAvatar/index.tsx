import React, { useState } from 'react'
import { Avatar, Menu, MenuItem, Typography, Box, Divider, ListItemIcon, ListItemText } from '@mui/material'
import { Person, Settings, ExitToApp, ArrowDropDown } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useGetAccountDetail } from '../../queries/Account/useGetAccountDetail'

interface ProfileAvatarProps {
  showDropdown?: boolean
  onLogout?: () => void
}

export default function ProfileAvatar({ showDropdown = true, onLogout }: ProfileAvatarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()

  const userId = localStorage.getItem('userId')
  const userRole = localStorage.getItem('userRole')
  const { data: user, isLoading } = useGetAccountDetail(userId ? Number(userId) : 0)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (showDropdown) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleProfileClick = () => {
    navigate('/account-details')
    handleMenuClose()
  }

  const handleSettingsClick = () => {
    navigate('/settings')
    handleMenuClose()
  }
  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    navigate('/login')
    handleMenuClose()
  }

  const getAvatarLetter = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase()
    }
    return 'U'
  }

  const getAvatarColor = () => {
    if (!user?.name) return '#1976d2'

    const colors = ['#1976d2', '#388e3c', '#f57c00', '#d32f2f', '#7b1fa2', '#0288d1', '#5d4037', '#616161']
    const index = user.name.charCodeAt(0) % colors.length
    return colors[index]
  }

  const formatRole = (role: string) => {
    return role.charAt(0) + role.slice(1).toLowerCase()
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: showDropdown ? 'pointer' : 'default'
        }}
        onClick={handleMenuOpen}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: getAvatarColor(),
            fontSize: '16px',
            fontWeight: 600,
            mr: showDropdown ? 1 : 0
          }}
        >
          {isLoading ? '...' : getAvatarLetter()}
        </Avatar>

        {showDropdown && (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', mr: 0.5 }}>
              <Typography
                variant='body2'
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: 1.2,
                  color: 'text.primary'
                }}
              >
                {isLoading ? 'Loading...' : user?.name || 'User'}
              </Typography>
              <Typography
                variant='caption'
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: '12px',
                  color: 'text.secondary',
                  lineHeight: 1
                }}
              >
                {userRole ? formatRole(userRole) : 'User'}
              </Typography>
            </Box>
            <ArrowDropDown sx={{ fontSize: 16, color: 'text.secondary' }} />
          </>
        )}
      </Box>

      {showDropdown && (
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
              minWidth: 200,
              '& .MuiMenuItem-root': {
                fontFamily: 'Poppins',
                fontSize: '14px'
              }
            }
          }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography
              variant='body2'
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              {user?.name || 'User'}
            </Typography>
            <Typography
              variant='caption'
              sx={{
                fontFamily: 'Poppins',
                color: 'text.secondary'
              }}
            >
              {user?.email || 'user@example.com'}
            </Typography>
          </Box>

          <Divider />

          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon>
              <Person fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </MenuItem>

          <MenuItem onClick={handleSettingsClick}>
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='Settings' />
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </MenuItem>
        </Menu>
      )}
    </>
  )
}
