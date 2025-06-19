import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Function to format dates
const formatDate = (dateString) => {
    if (!dateString)
        return '';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    catch (error) {
        return dateString;
    }
};
export const allColumns = [
    {
        accessorKey: 'name',
        header: 'Product Name',
        size: 150,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() })
    },
    {
        accessorKey: 'categoryId',
        header: 'Category',
        size: 120,
        Cell: ({ cell, table }) => {
            const categoryId = cell.getValue();
            // Access categories from table meta data
            const categories = table.options.meta?.categories || [];
            const category = categories.find((cat) => cat.id === categoryId);
            return _jsx("div", { children: category?.name || 'Unknown Category' });
        }
    },
    {
        accessorKey: 'price',
        header: 'Price',
        size: 110,
        Cell: ({ cell }) => _jsxs("div", { children: ["$", cell.getValue()] })
    },
    {
        accessorKey: 'sku',
        header: 'Sku',
        size: 100,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() })
    },
    {
        accessorKey: 'createdAt',
        header: 'Create Date',
        size: 140,
        sortingFn: 'datetime',
        Cell: ({ cell }) => _jsx("div", { children: formatDate(cell.getValue()) })
    },
    {
        accessorKey: 'expiryDate',
        header: 'Expired Date',
        size: 140,
        sortingFn: 'datetime',
        Cell: ({ cell }) => _jsx("div", { children: formatDate(cell.getValue()) })
    },
    {
        accessorKey: 'stockQuantity',
        header: 'Stock Quantity',
        size: 140,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() })
    },
    {
        accessorKey: 'description',
        header: 'Description',
        size: 200,
        Cell: ({ cell }) => _jsx("div", { children: cell.getValue() })
    }
];
