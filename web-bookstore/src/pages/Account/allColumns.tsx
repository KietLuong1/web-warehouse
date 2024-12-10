import { MRT_ColumnDef } from 'material-react-table'
import { AccountTypes } from '../../queries/Account'

export const allColumns: MRT_ColumnDef<AccountTypes>[] = [
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
    size: 150
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
    size: 200
  }
]
