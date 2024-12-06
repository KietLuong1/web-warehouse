import { ProductKey, ProductTypes } from '../../../queries'

export const ProductInitValues: ProductTypes = {
  [ProductKey.PRODUCT_ID]: '',
  [ProductKey.NAME]: '',
  [ProductKey.CATEGORY]: '',
  [ProductKey.DESCRIPTION]: '',
  [ProductKey.PRICE]: 0,
  [ProductKey.STATUS]: '',
  [ProductKey.CREATE_DATE]: '',
  [ProductKey.EXPIRED_DATE]: '',
  [ProductKey.MINIMUM_QUANTITY]: 0,
  [ProductKey.LIMIT_QUANTITY]: 0
}
