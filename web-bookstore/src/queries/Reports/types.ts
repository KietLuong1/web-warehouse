import { ReportKey } from './keys'

export type ReportTypes = {
  [ReportKey.ID]: string
  [ReportKey.NAME]: string
  [ReportKey.INVENTORY]: string
  [ReportKey.PRICE]: string
  [ReportKey.SUPPLIER]: string
  [ReportKey.DESCRIPTION]: string
  [ReportKey.CATEGORY]: string
}
