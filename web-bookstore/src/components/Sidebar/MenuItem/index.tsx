import {
  Calculate,
  Feed,
  HomeRepairService,
  ImportExport,
  Inventory,
  LocationOn,
  Settings,
  Summarize,
  Warehouse,
  People,
  QuestionAnswer,
  AccountBox
} from '@mui/icons-material'

export const MenuItems = [
  {
    title: 'Dashboard',
    icon: <Warehouse />,
    link: '/dashboard'
  },
  {
    title: 'Transactions',
    icon: <ImportExport />,
    link: '/transaction'
  },
  {
    title: 'Inventory',
    icon: <Inventory />,
    link: '/inventory'
  },
  {
    title: 'Products',
    icon: <Feed />,
    link: '/product'
  },
  {
    title: 'Expense Tracking',
    icon: <Calculate />,
    link: '/expense-tracking'
  },
  {
    title: 'Report',
    icon: <Summarize />,
    link: '/report'
  },
  {
    title: 'Suppliers',
    icon: <People />,
    link: '/supplier'
  },
  {
    title: 'Location',
    icon: <LocationOn />,
    link: '/location'
  },
  {
    title: 'Account',
    icon: <AccountBox />,
    link: '/account'
  },
  {
    title: 'Settings',
    icon: <Settings />,
    link: '/setting',
    submenus: [
      {
        title: 'FAQs',
        icon: <QuestionAnswer />,
        link: '/faqs'
      },
      {
        title: 'Containers',
        icon: <HomeRepairService />,
        link: '/container'
      }
    ]
  }
]
