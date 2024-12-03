import { ProductKey } from './keys'

export type ProductTypes = {
  [ProductKey.PRODUCT_ID]: string
  [ProductKey.NAME]: string
  [ProductKey.CATEGORY]: string
  [ProductKey.DESCRIPTION]: string
  [ProductKey.PRICE]: number
  [ProductKey.STATUS]: string
  [ProductKey.CREATE_DATE]: string
  [ProductKey.EXPIRED_DATE]: string
  [ProductKey.MINIMUM_QUANTITY]: number
  [ProductKey.LIMIT_QUANTITY]: number
}
