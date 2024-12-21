import { AccountKey } from './keys'

export type AccountTypes = {
  [AccountKey.USER_ID]: string
  [AccountKey.USERNAME]: string
  [AccountKey.EMAIL]: string
  [AccountKey.PASSWORD]: string
  [AccountKey.ROLE]: string
  [AccountKey.NAME]: string
}
