import { jsx as _jsx } from "react/jsx-runtime";
export const allColumns = [
    {
        accessorKey: 'supplierId',
        header: 'Supplier ID',
        enableHiding: false,
        size: 150,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() })
    },
    {
        accessorKey: 'name',
        header: 'Supplier Name',
        size: 150,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() })
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
        size: 150,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() })
    },
    {
        accessorKey: 'email',
        header: 'Email',
        size: 150,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() })
    },
    {
        accessorKey: 'created_at',
        header: 'Create Date',
        size: 150,
        sortingFn: 'datetime',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() })
    },
    {
        accessorKey: 'address',
        header: 'Address',
        size: 250,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() })
    }
];
