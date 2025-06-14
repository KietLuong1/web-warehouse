import { MRT_ColumnDef } from 'material-react-table'
import { ProductDTO } from '../../queries'

export const allColumns: MRT_ColumnDef<ProductDTO>[] = [
  {
    accessorKey: 'productId',
    header: 'Product ID',
    enableHiding: false,
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },

  {
    accessorKey: 'description',
    header: 'Description',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'price',
    header: 'Price',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>
  },
  {
    accessorKey: 'sku',
    header: 'Sku',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'createdAt',
    header: 'Create Date',
    size: 150,
    sortingFn: 'datetime',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expired Date',
    size: 150,
    sortingFn: 'datetime',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'stockQuantity',
    header: 'Stock Quantity',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>
  }
]
