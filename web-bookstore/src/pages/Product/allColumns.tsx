/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MRT_ColumnDef } from 'material-react-table'
import { ProductDTO } from '../../queries'

// Function to format dates
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}

export const allColumns: MRT_ColumnDef<ProductDTO>[] = [
  {
    accessorKey: 'name',
    header: 'Product Name',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'categoryId',
    header: 'Category',
    size: 120,
    Cell: ({ cell, table }) => {
      const categoryId = cell.getValue<string>()
      // Access categories from table meta data
      const categories = (table.options.meta as any)?.categories || []
      const category = categories.find((cat: any) => cat.id === categoryId)
      return <div>{category?.name || 'Unknown Category'}</div>
    }
  },
  {
    accessorKey: 'price',
    header: 'Price',
    size: 110,
    Cell: ({ cell }) => <div>${cell.getValue<number>()}</div>
  },
  {
    accessorKey: 'sku',
    header: 'Sku',
    size: 100,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'createdAt',
    header: 'Create Date',
    size: 140,
    sortingFn: 'datetime',
    Cell: ({ cell }) => <div>{formatDate(cell.getValue<string>())}</div>
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expired Date',
    size: 140,
    sortingFn: 'datetime',
    Cell: ({ cell }) => <div>{formatDate(cell.getValue<string>())}</div>
  },
  {
    accessorKey: 'stockQuantity',
    header: 'Stock Quantity',
    size: 140,
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size: 200,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  }
]
