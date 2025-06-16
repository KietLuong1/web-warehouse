import { MRT_ColumnDef } from 'material-react-table'
import { TransactionDTO } from '../../queries'
import ChipStatus from '../../components/ChipStatus'

export const allColumns: MRT_ColumnDef<TransactionDTO>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction Number',
    enableHiding: false,
    size: 160,
    Cell: () => <div>{'---'}</div>
  },
  {
    accessorKey: 'product.name',
    header: 'Product Name',
    size: 200,
    Cell: ({ cell }) => <div>{cell.getValue<string>() || '---'}</div>
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<number>() ?? '---'}</div>
  },
  {
    accessorKey: 'totalProducts',
    header: 'Total Products',
    size: 130,
    Cell: ({ cell }) => <div>{cell.getValue<number>() ?? '---'}</div>
  },
  {
    accessorKey: 'transactionType',
    header: 'Transaction Type',
    size: 150,
    Cell: ({ cell }) => <div>{cell.getValue<string>() || '---'}</div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 150,
    Cell: ({ cell }) => {
      const status = cell.getValue<string>()
      if (!status) return <div>---</div>

      return <ChipStatus status={status} />
    }
  }
]
