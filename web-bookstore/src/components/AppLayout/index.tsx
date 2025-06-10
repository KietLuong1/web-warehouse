import { Box } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { SmartPageHeader } from '../PageHeader/exports'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  if (isLoginPage) {
    return <>{children}</>
  }
    return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        maxWidth: '100%',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0',
          width: '100%',
          flexShrink: 0
        }}
      >
        <SmartPageHeader />
      </Box>

      <Box 
        sx={{ 
          flex: 1, 
          overflow: 'auto',
          maxWidth: '100%'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AppLayout
