import { ImportExportKey, ImportExportTypes } from '../../../queries'

export const ImportExportInitValues: ImportExportTypes = {
  [ImportExportKey.ID]: '',
  [ImportExportKey.BATCH_ID]: '',
  [ImportExportKey.PRODUCT]: '',
  [ImportExportKey.LOCATION]: '',
  [ImportExportKey.EXPIRED_DATE]: '',
  [ImportExportKey.QUANTITY]: 0
}
