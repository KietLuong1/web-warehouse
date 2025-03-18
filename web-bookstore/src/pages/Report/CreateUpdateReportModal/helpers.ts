import { ReportKey, ReportTypes } from '../../../queries/Reports'

export const ReportInitValues: ReportTypes = {
  [ReportKey.NAME]: '',
  [ReportKey.INVENTORY]: '',
  [ReportKey.PRICE]: '',
  [ReportKey.CATEGORY]: '',
  [ReportKey.SUPPLIER]: '',
  [ReportKey.DESCRIPTION]: ''
}
