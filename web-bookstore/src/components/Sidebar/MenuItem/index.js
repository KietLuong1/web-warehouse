import { jsx as _jsx } from "react/jsx-runtime";
import { AccountBox, ArrowBack, Feed, ImportExport, Inventory, LocationOn, People, Summarize, Warehouse } from '@mui/icons-material';
export const MenuItems = [
    {
        title: 'Dashboard',
        icon: _jsx(Warehouse, {}),
        link: '/dashboard'
    },
    {
        title: 'Transactions',
        icon: _jsx(ImportExport, {}),
        link: '/transaction'
    },
    {
        title: 'Inventory',
        icon: _jsx(Inventory, {}),
        link: '/inventory'
    },
    {
        title: 'Products',
        icon: _jsx(Feed, {}),
        link: '/product'
    },
    // {
    //   title: 'Expense Tracking',
    //   icon: <Calculate />,
    //   link: '/expense-tracking'
    // },
    {
        title: 'Report',
        icon: _jsx(Summarize, {}),
        link: '/report'
    },
    {
        title: 'Suppliers',
        icon: _jsx(People, {}),
        link: '/supplier'
    },
    {
        title: 'Location',
        icon: _jsx(LocationOn, {}),
        link: '/location'
    },
    {
        title: 'Account',
        icon: _jsx(AccountBox, {}),
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
        title: 'Logout',
        icon: _jsx(ArrowBack, {}),
        action: 'logout'
    }
];
