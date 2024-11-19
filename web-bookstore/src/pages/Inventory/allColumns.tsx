import { MRT_ColumnDef } from 'material-react-table'
import { Inventorys } from '../../queries/Inventory'

export const allColumns: MRT_ColumnDef<Inventorys>[] = [
  {
    accessorKey: 'inventory_id',
    header: 'Inventory ID',
    enableHiding: false,
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>
  },
  {
    accessorKey: 'product_id',
    header: 'Product ID',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 150
  },
  {
    accessorKey: 'location_id',
    header: 'Location ID',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 150
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  },
  {
    accessorKey: 'batch_number',
    header: 'Batch Number',
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>,
    size: 200
  },
  {
    accessorKey: 'import_date',
    header: 'Import Date',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  },
  {
    accessorKey: 'expiry_date',
    header: 'Expiry Date',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  }
]
