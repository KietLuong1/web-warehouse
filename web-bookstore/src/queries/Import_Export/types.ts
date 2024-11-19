import { ImportExportKey } from './keys'

export type ImportExportTypes = {
  [ImportExportKey.ID]: string
  [ImportExportKey.BATCH_ID]: string
  [ImportExportKey.PRODUCT]: string
  [ImportExportKey.LOCATION]: string
  [ImportExportKey.EXPIRED_DATE]: string;
  [ImportExportKey.QUANTITY]: number
}
