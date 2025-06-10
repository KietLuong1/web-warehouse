import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthentication } from '../../context/AuthenticationContext'
import { getPageConfig, PageConfig } from './config'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Chip } from '@mui/material'
import CustomDatePicker from '../CustomDatePicker.tsx'
import { CustomTableSearch } from '../CustomTableSearch'
import NotificationBell from '../NotificationBell'
import ProfileAvatar from '../ProfileAvatar'

interface DynamicPageHeaderProps {
  // Override any config for this specific instance
  config?: Partial<PageConfig>
  // Custom search handler
  onSearch?: (value: string) => void
  // Additional content to show on the right
  rightContent?: ReactNode
}

export default function DynamicPageHeader({ config: customConfig, onSearch, rightContent }: DynamicPageHeaderProps) {
  const location = useLocation()
  const { logout } = useAuthentication()

  // Get the default config for this route
  const defaultConfig = getPageConfig(location.pathname)

  // Merge default config with custom overrides
  const finalConfig = {
    ...defaultConfig,
    ...customConfig
  }

  // If no config found and no custom config provided, return null
  if (!finalConfig.title) {
    return null
  }

  return (
    <Stack
      direction='row'
      spacing={2}
      sx={{
        paddingTop: '16px',
        paddingBottom: '8px',
        margin: '0 16px',
        alignItems: 'flex-start'
      }}
    >
      <Box flex={1}>
        {/* Title and Subtitle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          {finalConfig.icon && <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>{finalConfig.icon}</Box>}
          <Typography
            variant='h5'
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            {finalConfig.title}
          </Typography>
          {finalConfig.badge && (
            <Chip
              label={finalConfig.badge.label}
              color={finalConfig.badge.color || 'primary'}
              size='small'
              variant='outlined'
            />
          )}
        </Box>
        {finalConfig.subtitle && (
          <Typography variant='body2' color='text.secondary' sx={{ fontFamily: 'Poppins' }}>
            {finalConfig.subtitle}
          </Typography>
        )}
      </Box>

      {/* Right side - Controls */}
      <Stack direction='row' spacing={1} alignItems='center'>
        {/* Custom right content */}
        {rightContent}
        {finalConfig.rightContent}

        {/* Search */}
        {finalConfig.showSearch && (
          <CustomTableSearch placeholder={finalConfig.searchPlaceholder || 'Search...'} onSearch={onSearch} />
        )}

        {/* Date picker */}
        {finalConfig.showDatePicker && <CustomDatePicker />}

        {/* Notifications */}
        {finalConfig.showNotifications && <NotificationBell />}

        {/* Profile */}
        {finalConfig.showProfile && <ProfileAvatar onLogout={logout} />}
      </Stack>
    </Stack>
  )
}
