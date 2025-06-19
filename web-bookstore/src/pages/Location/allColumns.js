import { jsx as _jsx } from "react/jsx-runtime";
import ChipStatus from '../../components/ChipStatus';
export const allColumns = [
    {
        accessorKey: 'code',
        header: 'Code',
        enableHiding: false,
        size: 100,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() })
    },
    {
        accessorKey: 'zone',
        header: 'Zone',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 200
    },
    {
        accessorKey: 'shelf',
        header: 'Shelf',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 200
    },
    {
        accessorKey: 'rack',
        header: 'Rack',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 200
    },
    {
        accessorKey: 'capacity',
        header: 'Capacity',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 150
    },
    {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }) => (_jsx("div", { children: _jsx(ChipStatus, { status: cell.getValue() }) })),
        size: 150
    },
    {
        accessorKey: 'description',
        header: 'Description',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 250
    }
];
