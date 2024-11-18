import { ImportExportKey } from './keys'

export type ImportExports = {
  [ImportExportKey.ID]: string
  [ImportExportKey.NAME]: string
  [ImportExportKey.AGE]: number
  [ImportExportKey.EMAIL]: string
  [ImportExportKey.STATUS]: string
  [ImportExportKey?.SALARY]: number
  [ImportExportKey.DEPARTMENT]: string
  [ImportExportKey.ROLE]: string
  [ImportExportKey?.JOIN_DATE]: number
}
