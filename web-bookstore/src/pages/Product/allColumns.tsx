import { MRT_ColumnDef } from 'material-react-table'
import { ProductTypes } from '../../queries'

export const allColumns: MRT_ColumnDef<ProductTypes>[] = [
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
    accessorKey: 'category',
    header: 'Category',
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
    accessorKey: 'status',
    header: 'Status',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'createDate',
    header: 'Create Date',
    size: 150,
    sortingFn: 'datetime',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'expiredDate',
    header: 'Expired Date',
    size: 150,
    sortingFn: 'datetime',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'minimumQuantity',
    header: 'Minimum Quantity',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>
  },
  {
    accessorKey: 'limitQuantity',
    header: 'Limit Quantity',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>
  }
]
