import { MRT_ColumnDef } from 'material-react-table'
import { Chip } from '@mui/material'
import { WarehouseDTO } from '../../queries/Location'

export const allColumns: MRT_ColumnDef<WarehouseDTO>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 300
  },
  {
    accessorKey: 'location',
    header: 'Location',
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
    accessorKey: 'active',
    header: 'Active',
    Cell: ({ cell }) => {
      const isActive = cell.getValue<boolean>()
      return (
        <Chip
          label={isActive ? 'Active' : 'Inactive'}
          color={isActive ? 'success' : 'error'}
          variant='filled'
          size='small'
        />
      )
    },
    size: 150
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    Cell: ({ cell }) => <div>{new Date(cell.getValue<string>()).toLocaleDateString()}</div>,
    size: 150
  }
]
