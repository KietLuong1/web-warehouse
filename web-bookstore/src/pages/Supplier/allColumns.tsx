import { MRT_ColumnDef } from 'material-react-table'
import { ProductTypes } from '../../queries'

export const allColumns: MRT_ColumnDef<ProductTypes>[] = [
  {
    accessorKey: 'supplierId',
    header: 'Supplier ID',
    enableHiding: true,
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'name',
    header: 'Supplier Name',
    enableHiding: false,
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'created_at',
    header: 'Create Date',
    size: 150,
    sortingFn: 'datetime',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'address',
    header: 'Address',
    size: 250,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
]
