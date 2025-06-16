import { ProductKey } from './keys'

export type ProductTypes = {
  [ProductKey.ID]: string
  [ProductKey.CATEGORY_ID]: string
  [ProductKey.PRODUCT_ID]: string
  [ProductKey.SUPPLIER_ID]: string
  [ProductKey.NAME]: string
  [ProductKey.SKU]: string
  [ProductKey.PRICE]: number
  [ProductKey.STOCK_QUANTITY]: number
  [ProductKey.DESCRIPTION]: string
  [ProductKey.EXPIRY_DATE]: string
  [ProductKey.IMAGE_URL]: string
  [ProductKey.CREATED_AT]: string
  [ProductKey.BATCH_NUMBER]: string
  [ProductKey.WAREHOUSE_ID]: string
  [ProductKey.BIN_LOCATION]: string
}
export interface ProductPayload {
  id?: string
  categoryId: string
  name: string
  sku: string
  price: number
  stockQuantity: number
  description?: string
}

export interface ProductDTO {
  id: string
  categoryId: string
  productId: string
  supplierId: string
  name: string
  sku: string
  price: number
  stockQuantity: number
  description: string
  expiryDate: string
  imageUrl: string
  createdAt: string
  batchNumber: string
  warehouseId: string
  binLocation: string
}
