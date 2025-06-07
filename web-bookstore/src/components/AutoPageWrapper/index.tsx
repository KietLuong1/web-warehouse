import { Box } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

interface AutoPageWrapperProps {
  children: React.ReactNode
}

// Page configuration mapping
const PAGE_CONFIG = {
  '/dashboard': {
    title: 'Dashboard',
    breadcrumbs: [{ label: 'Dashboard' }]
  },
  '/inventory': {
    title: 'Inventory Management',
    breadcrumbs: [{ label: 'Dashboard' }, { label: 'Inventory' }]
  },
  '/product': {
    title: 'Product Management',
    breadcrumbs: [{ label: 'Dashboard' }, { label: 'Products' }]
  },
  '/transaction': {
    title: 'Transaction Management',
    breadcrumbs: [{ label: 'Dashboard' }, { label: 'Transactions' }]
  },
  '/report': {
    title: 'Reports & Analytics',
    breadcrumbs: [{ label: 'Dashboard' }, { label: 'Reports' }]
  },
  '/supplier': {
    title: 'Supplier Management',
    breadcrumbs: [{ label: 'Dashboard' }, { label: 'Suppliers' }]
  },
  '/location': {
    title: 'Location Management',
    breadcrumbs: [{ label: 'Dashboard' }, { label: 'Locations' }]
  },
  '/users': {
    title: 'User Management',
    breadcrumbs: [{ label: 'Dashboard' }, { label: 'Users' }]
  },
  '/expense-tracking': {
    title: 'Expense Tracking',
    breadcrumbs: [{ label: 'Dashboard' }, { label: 'Expenses' }]
  },
  '/account-details': {
    title: 'Account Details',
    breadcrumbs: [{ label: 'Dashboard' }, { label: 'Account' }]
  },
  '/faqs': {
    title: 'Frequently Asked Questions',
    breadcrumbs: [{ label: 'Dashboard' }, { label: 'FAQs' }]
  },
  '/container': {
    title: 'Container Management',
    breadcrumbs: [{ label: 'Dashboard' }, { label: 'Containers' }]
  }
}

export const AutoPageWrapper: React.FC<AutoPageWrapperProps> = ({ children }) => {
  const location = useLocation()
  const currentPath = location.pathname

  const pageConfig = PAGE_CONFIG[currentPath as keyof typeof PAGE_CONFIG]

  if (currentPath === '/login' || !pageConfig) {
    return <>{children}</>
  }
  return (
    <Box
      sx={{
        width: '100%',
        padding: 0,
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box>{children}</Box>
    </Box>
  )
}

export default AutoPageWrapper
