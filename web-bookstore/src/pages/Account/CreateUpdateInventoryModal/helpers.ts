import { AccountKey, AccountTypes } from '../../../queries/Account'

export const AccountInitValues: AccountTypes = {
  [AccountKey.ACCOUNT_ID]: '',
  [AccountKey.ADDRESS]: '',
  [AccountKey.FULL_NAME]: '',
  [AccountKey.PHONE_NUMBER]: '',
  [AccountKey.CREATED_AT]: ''
}
