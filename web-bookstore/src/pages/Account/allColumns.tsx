import { MRT_ColumnDef } from 'material-react-table'
import { AccountResponse } from '../../queries/Account_MockData'

export const allColumns: MRT_ColumnDef<AccountResponse>[] = [
  {
    accessorKey: 'userId',
    header: 'User ID',
    enableHiding: false,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 150
  },
  {
    accessorKey: 'name',
    header: 'Full Name',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 150
  },
  {
    accessorKey: 'username',
    header: 'User Name',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  },
  {
    accessorKey: 'email',
    header: 'Email',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  },

  {
    accessorKey: 'role',
    header: 'Role',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 150
  }
]
