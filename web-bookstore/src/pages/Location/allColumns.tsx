import { MRT_ColumnDef } from 'material-react-table'
import { LocationTypes } from '../../queries/Location'
import ChipStatus from '../../components/ChipStatus'

export const allColumns: MRT_ColumnDef<LocationTypes>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
    enableHiding: false,
    size: 100,
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>
  },
  {
    accessorKey: 'zone',
    header: 'Zone',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  },
  {
    accessorKey: 'shelf',
    header: 'Shelf',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  },
  {
    accessorKey: 'rack',
    header: 'Rack',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  },
  {
    accessorKey: 'capacity',
    header: 'Capacity',
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>,
    size: 150
  },
  {
    accessorKey: 'status',
    header: 'Status',
    Cell: ({ cell }) => (
      <div>
        <ChipStatus status={cell.getValue<string>()} />
      </div>
    ),
    size: 150
  },
  {
    accessorKey: 'description',
    header: 'Description',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 250
  }
]
