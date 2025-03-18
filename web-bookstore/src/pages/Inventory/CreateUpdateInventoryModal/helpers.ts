import { InventoryKey, InventoryTypes } from '../../../queries'
import yup from '../../../../yupGlobal'

export const InventoryInitValues: InventoryTypes = {
  [InventoryKey.PRODUCT_ID]: '',
  [InventoryKey.LOCATION_ID]: '',
  [InventoryKey.QUANTITY]: 0,
  [InventoryKey.BATCH_NUMBER]: '',
  [InventoryKey.IMPORT_DATE]: '',
  [InventoryKey.EXPIRY_DATE]: ''
}

export const InventoryValidationSchema = yup.object().shape({
  [InventoryKey.PRODUCT_ID]: yup.string().required('Product ID is required'),
  [InventoryKey.LOCATION_ID]: yup.string().required('Location ID is required'),
  [InventoryKey.QUANTITY]: yup
    .number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be a whole number'),
  [InventoryKey.BATCH_NUMBER]: yup.string().required('Batch Number is required'),
  [InventoryKey.IMPORT_DATE]: yup
    .string()
    .required('Import Date is required')
    .test('is-past-or-present', 'Import Date cannot be in the future', (value) => {
      if (!value) return false
      const date = new Date(value)
      return date <= new Date()
    }),
  [InventoryKey.EXPIRY_DATE]: yup
    .string()
    .required('Expiry date is required')
    .test('is-future-date', 'Expiry date must be in the future', (value) => {
      if (!value) return false
      const date = new Date(value)
      return date > new Date()
    })
})
