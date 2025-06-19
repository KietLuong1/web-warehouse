import { jsx as _jsx } from "react/jsx-runtime";
import { Tooltip } from 'antd';
export const allColumns = [
    {
        accessorKey: 'id',
        header: 'Report ID',
        enableHiding: false,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 150
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 150
    },
    {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 150
    },
    {
        accessorKey: 'name',
        header: 'Product Name',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 150
    },
    {
        accessorKey: 'inventory',
        header: 'Stock Available',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 150
    },
    {
        accessorKey: 'price',
        header: 'Total Price',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 150
    },
    {
        accessorKey: 'category',
        header: 'Category',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 200
    },
    {
        accessorKey: 'supplier',
        header: 'Supplier',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 200
    },
    {
        accessorKey: 'description',
        header: 'Description',
        Cell: ({ cell }) => (_jsx("div", { style: { width: 150 }, children: _jsx(Tooltip, { title: cell.getValue(), children: _jsx("div", { style: { textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }, children: cell.getValue() }) }) })),
        size: 200
    }
];
