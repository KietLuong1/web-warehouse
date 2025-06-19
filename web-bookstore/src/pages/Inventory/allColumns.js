import { jsx as _jsx } from "react/jsx-runtime";
export const allColumns = [
    {
        accessorKey: 'id',
        header: 'Inventory Code',
        enableHiding: false,
        Cell: () => _jsx("div", { children: '---' }),
        size: 150
    },
    // {
    //   accessorKey: 'productId',
    //   header: 'Product ID',
    //   Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    //   size: 150
    // },
    // {
    //   accessorKey: 'warehouseId',
    //   header: 'Warehouse ID',
    //   Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    //   size: 150
    // },
    {
        accessorKey: 'quantityOnHand',
        header: 'Quantity',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 200
    },
    {
        accessorKey: 'batchNumber',
        header: 'Batch Number',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 200
    },
    {
        accessorKey: 'maxStockLevel',
        header: 'Max Stock Level',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 200
    },
    {
        accessorKey: 'expiryDate',
        header: 'Expiry Date',
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() }),
        size: 200
    }
];
