import { ReactNode } from 'react'

// Define the configuration for each page
export interface PageConfig {
  title: string
  subtitle?: string
  icon?: ReactNode
  showSearch?: boolean
  showDatePicker?: boolean
  searchPlaceholder?: string
  showNotifications?: boolean
  showProfile?: boolean
  rightContent?: ReactNode
  badge?: {
    label: string
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  }
}

export const PAGE_CONFIGS: Record<string, PageConfig> = {
  '/dashboard': {
    title: 'Dashboard',
    // icon: <DashboardIcon />,
    showDatePicker: true,
    showNotifications: true,
    showProfile: true
  },
  '/inventory': {
    title: 'Inventory',
    showDatePicker: true,
    searchPlaceholder: 'Search inventory items...',
    showNotifications: true,
    showProfile: true
  },
  '/product': {
    title: 'Products',
    showDatePicker: true,
    searchPlaceholder: 'Search products by name or SKU...',
    showNotifications: true,
    showProfile: true
  },
  '/transaction': {
    title: 'Transactions',
    showDatePicker: true,
    searchPlaceholder: 'Search transactions...',
    showNotifications: true,
    showProfile: true
  },
  '/supplier': {
    title: 'Suppliers',
    showDatePicker: true,
    searchPlaceholder: 'Search suppliers...',
    showNotifications: true,
    showProfile: true
  },
  '/location': {
    title: 'Locations',
    showDatePicker: true,
    searchPlaceholder: 'Search by code or zone name...',
    showNotifications: true,
    showProfile: true
  },
  '/users': {
    title: 'User Management',
    showDatePicker: true,
    searchPlaceholder: 'Search users...',
    showNotifications: true,
    showProfile: true
  },
  '/account-details': {
    title: 'Account Details',
    showDatePicker: true,
    showNotifications: true,
    showProfile: true
  },
  '/expense-tracking': {
    title: 'Expense Tracking',
    showDatePicker: true,
    searchPlaceholder: 'Search expenses...',
    showNotifications: true,
    showProfile: true
  },
  '/report': {
    title: 'Reports & Analytics',
    showDatePicker: true,
    showNotifications: true,
    showProfile: true
  },
  '/faqs': {
    title: 'Frequently Asked Questions',
    showDatePicker: true,
    searchPlaceholder: 'Search FAQs...',
    showNotifications: true,
    showProfile: true
  },
  '/container': {
    title: 'Container Management',
    showDatePicker: true,
    searchPlaceholder: 'Search containers...',
    showNotifications: true,
    showProfile: true
  }
}

export function getPageConfig(pathname: string): PageConfig | null {
  return PAGE_CONFIGS[pathname] || null
}

export function createPageConfig(title: string, options?: Partial<Omit<PageConfig, 'title'>>): PageConfig {
  return {
    title,
    showSearch: true,
    showDatePicker: true,
    showNotifications: true,
    showProfile: true,
    ...options
  }
}
