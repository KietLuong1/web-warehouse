import { jsx as _jsx } from "react/jsx-runtime";
export const allColumns = [
    {
        accessorKey: 'userId',
        header: 'User ID',
        enableHiding: false,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 150
    },
    {
        accessorKey: 'name',
        header: 'Full Name',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 150
    },
    {
        accessorKey: 'username',
        header: 'User Name',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 200
    },
    {
        accessorKey: 'email',
        header: 'Email',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 200
    },
    {
        accessorKey: 'role',
        header: 'Role',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 150
    }
];
