import { MRT_ColumnDef } from 'material-react-table'
import { ReportTypes } from '../../queries/Reports'
import { Tooltip } from 'antd'

export const allColumns: MRT_ColumnDef<ReportTypes>[] = [
  {
    accessorKey: 'id',
    header: 'Report ID',
    enableHiding: false,
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 150
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 150
  },
  {
    accessorKey: 'inventory',
    header: 'Stock Available',
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>,
    size: 150
  },
  {
    accessorKey: 'price',
    header: 'Total Price',
    Cell: ({ cell }) => <div>{cell.getValue<number>()}</div>,
    size: 150
  },
  {
    accessorKey: 'category',
    header: 'Category',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  },
  {
    accessorKey: 'supplier',
    header: 'Supplier',
    Cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    size: 200
  },
  {
    accessorKey: 'description',
    header: 'Description',
    Cell: ({ cell }) => (
      <div style={{ width: 150 }}>
        <Tooltip title={cell.getValue<string>()}>
          <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {cell.getValue<string>()}
          </div>
        </Tooltip>
      </div>
    ),
    size: 200
  }
]
