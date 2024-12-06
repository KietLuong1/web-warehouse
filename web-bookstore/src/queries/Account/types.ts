import { AccountKey } from './keys'

export type AccountTypes = {
  [AccountKey.ACCOUNT_ID]: string
  [AccountKey.FULL_NAME]: string
  [AccountKey.PHONE_NUMBER]: string
  [AccountKey.ADDRESS]: string
  [AccountKey.CREATED_AT]: string
}
