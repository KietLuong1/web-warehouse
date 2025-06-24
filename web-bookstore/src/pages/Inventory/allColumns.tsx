import { MRT_ColumnDef } from 'material-react-table'
import { InventoryResponse } from '../../queries/Inventory'

export const allColumns: MRT_ColumnDef<InventoryResponse>[] = [
  {
    accessorKey: 'id',
    header: 'Inventory Code',
    enableHiding: false,
    Cell: () => <div>{'---'}</div>,
    size: 150
  },
  {
    accessorKey: 'product.name',
    header: 'Product Name',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  },
  {
    accessorKey: 'warehouse.name',
    header: 'Warehouse Name',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  },
  {
    accessorKey: 'quantityOnHand',
    header: 'Quantity',
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>,
    size: 100
  },
  {
    accessorKey: 'batchNumber',
    header: 'Batch Number',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  },
  {
    accessorKey: 'maxStockLevel',
    header: 'Max Stock Level',
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>,
    size: 200
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  }
]
