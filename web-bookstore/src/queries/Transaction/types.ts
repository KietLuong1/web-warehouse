import { TransactionKey } from './keys'

export type TransactionTypes = {
  [TransactionKey.ID]: string
  [TransactionKey.BATCH_ID]: string
  [TransactionKey.PRODUCT]: string
  [TransactionKey.LOCATION]: string
  [TransactionKey.EXPIRED_DATE]: string;
  [TransactionKey.QUANTITY]: number
}
