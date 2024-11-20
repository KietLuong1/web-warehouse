import { TransactionKey, TransactionTypes } from '../../../queries'

export const TransactionInitValues: TransactionTypes = {
  [TransactionKey.ID]: '',
  [TransactionKey.BATCH_ID]: '',
  [TransactionKey.PRODUCT]: '',
  [TransactionKey.LOCATION]: '',
  [TransactionKey.EXPIRED_DATE]: '',
  [TransactionKey.QUANTITY]: 0
}
