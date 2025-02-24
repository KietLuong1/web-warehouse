import { MRT_ColumnDef } from 'material-react-table'

export interface ExportableData {
  [key: string]: string | number | boolean | Date
}

export interface ExportFileProps<T extends ExportableData> {
  data: T[]
  filename?: string
  selectedRows?: T[]
  columns?: MRT_ColumnDef<T>[]
}
