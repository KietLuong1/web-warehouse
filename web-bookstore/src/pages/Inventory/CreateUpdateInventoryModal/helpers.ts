import { InventoryKey, InventoryPayload } from '../../../queries'
import yup from '../../../../yupGlobal'

export const InventoryInitValues: InventoryPayload = {
  [InventoryKey.PRODUCT_ID]: '',
  [InventoryKey.WAREHOUSE_ID]: '',
  [InventoryKey.QUANTITY_ON_HAND]: 0,
  [InventoryKey.BATCH_NUMBER]: '',
  [InventoryKey.EXPIRY_DATE]: ''
}

export const InventoryValidationSchema = yup.object().shape({
  [InventoryKey.PRODUCT_ID]: yup.string().required('Product ID is required'),
  [InventoryKey.WAREHOUSE_ID]: yup.string().required('Warehouse ID is required'),
  [InventoryKey.QUANTITY_ON_HAND]: yup
    .number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be a whole number'),
  // [InventoryKey.BATCH_NUMBER]: yup.string().required('Batch Number is required'),
  [InventoryKey.EXPIRY_DATE]: yup.string().required('Expiry date is required').nullable()
})
