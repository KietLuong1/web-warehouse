import { MRT_ColumnDef } from 'material-react-table'
import { SupplierDTO } from '../../queries'

export const allColumns: MRT_ColumnDef<SupplierDTO>[] = [
  // {
  //   accessorKey: 'id',
  //   header: 'Supplier ID',
  //   enableHiding: false,
  //   size: 150,
  //   Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  // },
  {
    accessorKey: 'name',
    header: 'Supplier Name',
    size: 300,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'contactInfo',
    header: 'Contact Info',
    size: 300,
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>
  },
  {
    accessorKey: 'address',
    header: 'Address',
    size: 300,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: 'Create Date',
  //   size: 150,
  //   sortingFn: 'datetime',
  //   Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  // }
]
