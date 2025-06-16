import yup from '../../../../yupGlobal'
import { ProductKey, ProductPayload } from '../../../queries'

export const ProductInitValues: ProductPayload = {
  [ProductKey.CATEGORY_ID]: '',
  [ProductKey.NAME]: '',
  [ProductKey.SKU]: '',
  [ProductKey.PRICE]: 0,
  [ProductKey.STOCK_QUANTITY]: 0,
  [ProductKey.DESCRIPTION]: ''
}

export const ProductValidationSchema = yup.object().shape({
  [ProductKey.NAME]: yup
    .string()
    .required('Product name is required')
    .min(2, 'Product name must be at least 2 characters')
    .max(100, 'Product name cannot exceed 100 characters'),

  [ProductKey.SKU]: yup
    .string()
    .required('SKU is required')
    .matches(/^[A-Z0-9-]+$/, 'SKU must contain only uppercase letters, numbers, and hyphens')
    .min(3, 'SKU must be at least 3 characters')
    .max(50, 'SKU cannot exceed 50 characters'),

  [ProductKey.PRICE]: yup
    .number()
    .required('Price is required')
    .positive('Price must be positive')
    .min(0.01, 'Price must be at least $0.01')
    .max(999999.99, 'Price cannot exceed $999,999.99'),

  [ProductKey.CATEGORY_ID]: yup.string().required('Category is required'),

  // [ProductKey.SUPPLIER_ID]: yup.string().required('Supplier is required'),

  [ProductKey.DESCRIPTION]: yup.string().max(500, 'Description cannot exceed 500 characters'),

  [ProductKey.STOCK_QUANTITY]: yup
    .number()
    .min(0, 'Stock quantity cannot be negative')
    .integer('Stock quantity must be a whole number'),

  [ProductKey.BATCH_NUMBER]: yup.string().max(50, 'Batch number cannot exceed 50 characters'),

  [ProductKey.BIN_LOCATION]: yup.string().max(20, 'Bin location cannot exceed 20 characters'),

  [ProductKey.WAREHOUSE_ID]: yup.string(),

  [ProductKey.EXPIRY_DATE]: yup
    .string()
    .nullable()
    .test('future-date', 'Expiry date must be in the future', function (value) {
      if (!value) return true
      const expiryDate = new Date(value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return expiryDate > today
    })
})

export const generateSKU = (name: string, categoryId?: string) => {
  const cleanName = name.replace(/[^A-Z0-9]/gi, '').toUpperCase()
  const namePrefix = cleanName.substring(0, 3)
  const categoryPrefix = categoryId?.substring(0, 3).toUpperCase() || 'GEN'
  const timestamp = Date.now().toString().slice(-4)

  return `${namePrefix}-${categoryPrefix}-${timestamp}`
}
