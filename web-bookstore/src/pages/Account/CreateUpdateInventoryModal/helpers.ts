import { AccountKey, AccountTypes } from '../../../queries/Account'

export const AccountInitValues: AccountTypes = {
  [AccountKey.USER_ID]: '',
  [AccountKey.USERNAME]: '',
  [AccountKey.EMAIL]: '',
  [AccountKey.ROLE]: '',
  [AccountKey.NAME]: '',
  [AccountKey.PASSWORD]: ''
}
