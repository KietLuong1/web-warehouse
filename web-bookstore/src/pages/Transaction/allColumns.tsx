import { MRT_ColumnDef } from 'material-react-table'
import { TransactionResponse } from '../../queries'

export const allColumns: MRT_ColumnDef<TransactionResponse>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
    enableHiding: false,
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'batchId',
    header: 'Batch ID',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'product',
    header: 'Product Name',
    size: 250,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'location',
    header: 'Location',
    size: 250,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'expiredDate',
    header: 'Expired Date',
    size: 130,
    sortingFn: 'datetime',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>
  }
]
