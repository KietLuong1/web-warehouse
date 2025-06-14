import { MRT_ColumnDef } from 'material-react-table'
import { InventoryResponse } from '../../queries/Inventory'

export const allColumns: MRT_ColumnDef<InventoryResponse>[] = [
  {
    accessorKey: 'id',
    header: 'Inventory ID',
    enableHiding: false,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 150
  },
  {
    accessorKey: 'productId',
    header: 'Product ID',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 150
  },
  // {
  //   accessorKey: 'warehouseId',
  //   header: 'Warehouse ID',
  //   Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
  //   size: 150
  // },
  {
    accessorKey: 'quantityOnHand',
    header: 'Quantity',
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>,
    size: 200
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
