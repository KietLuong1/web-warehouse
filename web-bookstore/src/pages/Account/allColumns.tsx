import { MRT_ColumnDef } from 'material-react-table'
import { AccountTypes } from '../../queries/Account'

export const allColumns: MRT_ColumnDef<AccountTypes>[] = [
  {
    accessorKey: 'account_id',
    header: 'Account ID',
    enableHiding: false,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 150
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 150
  },
  {
    accessorKey: 'address',
    header: 'Address',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 150
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  },

  {
    accessorKey: 'createdAt',
    header: 'Created At',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  }
]
