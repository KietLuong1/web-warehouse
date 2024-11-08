import {
  Calculate,
  CalendarViewDay,
  Feed,
  Folder,
  Handshake,
  HomeRepairService,
  ImportExport,
  Inventory,
  LocationOn,
  Receipt,
  Settings,
  Summarize,
  Warehouse
} from '@mui/icons-material'

export const MenuItems = [
  {
    title: 'Home',
    icon: <Warehouse />,
    link: '/dashboard'
  },

  {
    title: 'Import/Export',
    icon: <ImportExport />,
    link: '/service'
  },

  {
    title: 'Inventory List',
    icon: <Inventory />,
    link: '/inventory'
  },

  {
    title: 'Product Information',
    icon: <Feed />,
    link: '/product-information'
  },

  {
    title: 'Consignment',
    icon: <CalendarViewDay />,
    link: '/consignment'
  },
  {
    title: 'Documents',
    icon: <Folder />,
    link: '/documents'
  },

  {
    title: 'Suppliers',
    icon: <Handshake />,
    link: '/suppliers'
  },
  {
    title: 'Transactions',
    icon: <Receipt />,
    link: '/transaction'
  },
  {
    title: 'Report',
    icon: <Summarize />,
    link: '/report'
  },
  {
    title: 'Settings',
    icon: <Settings />,
    link: '/settings',
    submenus: [
      {
        title: 'Cost Calculating',
        icon: <Calculate />,
        link: '/cost-calculating'
      },
      {
        title: 'Location',
        icon: <LocationOn />,
        link: '/location'
      },
      {
        title: 'Container',
        icon: <HomeRepairService />,
        link: '/container'
      }
    ]
  }
]
