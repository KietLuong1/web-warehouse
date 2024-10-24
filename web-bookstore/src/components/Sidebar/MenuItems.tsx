import {
  Calculate,
  CalendarViewDay,
  Feed,
  Folder,
  Handshake,
  ImportExport,
  Inventory,
  Mail,
  Receipt,
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
    title: 'Consignment/Expiration dates',
    icon: <CalendarViewDay />,
    link: '/consignment'
  },
  {
    title: 'Documents',
    icon: <Folder />,
    link: '/documents'
  },

  {
    title: 'Cost Calculating',
    icon: <Calculate />,
    link: '/cost-calculating'
  },

  {
    title: 'Suppliers',
    icon: <Handshake />,
    link: '/suppliers'
  },
  {
    title: 'Transaction',
    icon: <Receipt />,
    link: '/transaction'
  },
  {
    title: 'Mailbox',
    icon: <Mail />,
    link: '/email'
  },

  {
    title: 'Report',
    icon: <Summarize />,
    link: '/report'
  }
]
