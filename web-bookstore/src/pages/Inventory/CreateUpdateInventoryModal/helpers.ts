import { InventoryKey, InventoryTypes } from '../../../queries/Inventory'

export const InventoryInitValues: InventoryTypes = {
  [InventoryKey.INVENTORY_ID]: '',
  [InventoryKey.PRODUCT_ID]: '',
  [InventoryKey.LOCATION_ID]: '',
  [InventoryKey.QUANTITY]: 0,
  [InventoryKey.BATCH_NUMBER]: '',
  [InventoryKey.IMPORT_DATE]: '',
  [InventoryKey.EXPIRY_DATE]: ''
}
