import { InventoryKey } from './keys'

export type InventoryTypes = {
  [InventoryKey.INVENTORY_ID]: string
  [InventoryKey.PRODUCT_ID]: string
  [InventoryKey.LOCATION_ID]: string
  [InventoryKey.QUANTITY]: number
  [InventoryKey.BATCH_NUMBER]: string
  [InventoryKey.IMPORT_DATE]: string
  [InventoryKey.EXPIRY_DATE]: string
}
