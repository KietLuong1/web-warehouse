import {
  AccountBox,
  ArrowBack,
  Feed,
  ImportExport,
  Inventory,
  LocationOn,
  ManageAccounts,
  People,
  QuestionAnswer,
  Settings,
  Summarize,
  Warehouse
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
  // {
  //   title: 'Expense Tracking',
  //   icon: <Calculate />,
  //   link: '/expense-tracking'
  // },
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
    link: '/users'
  },
  // {
  //   title: 'Settings',
  //   icon: <Settings />,
  //   link: '/setting',
  //   submenus: [
  //     {
  //       title: 'FAQs',
  //       icon: <QuestionAnswer />,
  //       link: '/faqs'
  //     }
      // {
      //   title: 'Containers',
      //   icon: <HomeRepairService />,
      //   link: '/container'
      // }
  //   ]
  // },
  {
    title: 'User Details',
    icon: <ManageAccounts />,
    link: '/account-details'
  },
  {
    title: 'Logout',
    icon: <ArrowBack />,
    action: 'logout'
  }
]
