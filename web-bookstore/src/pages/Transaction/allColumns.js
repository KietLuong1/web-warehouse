import { jsx as _jsx } from "react/jsx-runtime";
import ChipStatus from '../../components/ChipStatus';
export const allColumns = [
    {
        accessorKey: 'id',
        header: 'Transaction Number',
        enableHiding: false,
        size: 160,
        Cell: () => _jsx("div", { children: '---' })
    },
    {
        accessorKey: 'product.name',
        header: 'Product Name',
        size: 200,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() || '---' })
    },
    {
        accessorKey: 'totalPrice',
        header: 'Total Price',
        size: 150,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() ?? '---' })
    },
    {
        accessorKey: 'totalProducts',
        header: 'Total Products',
        size: 130,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() ?? '---' })
    },
    {
        accessorKey: 'transactionType',
        header: 'Transaction Type',
        size: 150,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() || '---' })
    },
    {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
        Cell: ({ cell }) => {
            const status = cell.getValue();
            if (!status)
                return _jsx("div", { children: "---" });
            return _jsx(ChipStatus, { status: status });
        }
    }
];
