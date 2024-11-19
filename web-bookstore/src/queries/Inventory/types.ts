import { InventoryKey } from './keys'

export type Inventorys = {
  [InventoryKey.INVENTORY_ID]: string
  [InventoryKey.PRODUCT_ID]: string
  [InventoryKey.LOCATION_ID]: string
  [InventoryKey.QUANTITY]: string
  [InventoryKey.BATCH_NUMBER]: string
  [InventoryKey.IMPORT_DATE]: string
  [InventoryKey.EXPIRY_DATE]: string
}
