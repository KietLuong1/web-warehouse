import { WarehouseDTO } from '../Dashboard/transaction.types'
import { ProductDTO } from '../Product'
import { InventoryKey } from './keys'

export type InventoryTypes = {
  [InventoryKey.ID]: string
  [InventoryKey.PRODUCT_ID]: string
  [InventoryKey.WAREHOUSE_ID]: string
  [InventoryKey.QUANTITY_ON_HAND]: number
  [InventoryKey.RESERVED_QUANTITY]: number
  [InventoryKey.REORDER_LEVEL]: number
  [InventoryKey.MAX_STOCK_LEVEL]: number
  [InventoryKey.UNIT_COST]: number
  [InventoryKey.LOCATION_CODE]: string
  [InventoryKey.BATCH_NUMBER]: string
  [InventoryKey.EXPIRY_DATE]: string
  [InventoryKey.LAST_COUNTED_DATE]: string
  [InventoryKey.LAST_UPDATED]: string
  [InventoryKey.UPDATED_BY]: string
  [InventoryKey.PRODUCT]: ProductDTO
  [InventoryKey.WAREHOUSE]: WarehouseDTO
  [InventoryKey.AVAILABLE_QUANTITY]: number
  [InventoryKey.IS_LOW_STOCK]: boolean
  [InventoryKey.IS_OVERSTOCK]: boolean
  [InventoryKey.TOTAL_VALUE]: number
}

export interface InventoryPayload {
  id?: string
  productId: string
  warehouseId: string
  quantityOnHand: number
  batchNumber: string
  expiryDate: string
}

export interface InventoryResponse {
  id: string
  productId: string
  warehouseId: string
  quantityOnHand: number
  reservedQuantity: number
  reorderLevel: number
  maxStockLevel: number
  unitCost: number
  locationCode: string
  batchNumber: string
  expiryDate: string
  lastCountedDate: string
  lastUpdated: string
  updatedBy: string
  product: ProductDTO
  warehouse?: WarehouseDTO
  availableQuantity: number
  isLowStock: boolean
  isOverstock: boolean
  totalValue: number
}
