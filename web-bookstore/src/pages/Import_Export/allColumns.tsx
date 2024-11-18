import { MRT_ColumnDef } from 'material-react-table'
import { ImportExports } from '../../queries'

export const allColumns: MRT_ColumnDef<ImportExports>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    enableHiding: false,
    size: 200,
    Cell: ({ cell }) => <div className='font-medium'>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'age',
    id: 'age',
    header: 'Age',
    Cell: ({ cell }) => <i>{cell.getValue<number>().toLocaleString()}</i>,
    size: 100
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableClickToCopy: true,
    size: 250
  },
  {
    accessorKey: 'status',
    header: 'Status',
    Cell: ({ cell }) => (
      <div
        className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
          cell.getValue<string>() === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {cell.getValue<string>()}
      </div>
    ),
    filterVariant: 'select',
    size: 120
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date',
    Cell: ({ cell }) => <div>{new Date(cell.getValue<string>()).toLocaleDateString()}</div>,
    sortingFn: 'datetime',
    size: 150
  },
  {
    accessorKey: 'salary',
    header: 'Salary',
    Cell: ({ cell }) => <div className='text-left'>${cell.getValue<number>().toLocaleString()}</div>,
    muiTableHeadCellProps: { align: 'left' },
    aggregationFn: 'mean',
    size: 150
  },
  {
    accessorKey: 'department',
    header: 'Department',
    filterVariant: 'select',
    Cell: ({ cell }) => <div className='font-medium'>{cell.getValue<string>()}</div>,
    size: 150
  },
  {
    accessorKey: 'role',
    header: 'Role',
    filterVariant: 'autocomplete',
    size: 200
  }
]
