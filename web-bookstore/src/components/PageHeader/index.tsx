/* eslint-disable @typescript-eslint/no-unused-vars */
import { Home } from '@mui/icons-material'
import { Chip } from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthentication } from '../../context/AuthenticationContext'
import CustomDatePicker from '../CustomDatePicker.tsx'
import NotificationBell from '../NotificationBell'
import ProfileAvatar from '../ProfileAvatar'

interface BreadcrumbItem {
  label: string
  path?: string
  icon?: ReactNode
}

interface PageHeaderProps {
  title: string
  icon?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  showSearch?: boolean
  showDatePicker?: boolean
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  rightContent?: ReactNode
  subtitle?: string
  badge?: {
    label: string
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  }
}

export default function PageHeader({
  title,
  icon,
  breadcrumbs,
  showSearch = true,
  showDatePicker = true,
  searchPlaceholder = 'Search...',
  onSearch,
  rightContent,
  subtitle,
  badge
}: PageHeaderProps) {
  const { logout } = useAuthentication()

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Typography
            variant='h5'
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Stack direction='row' spacing={3} alignItems='center'>
        {rightContent}
        {showDatePicker && <CustomDatePicker />}
        <NotificationBell />
        <ProfileAvatar onLogout={logout} />
      </Stack>
    </Stack>
  )
}
