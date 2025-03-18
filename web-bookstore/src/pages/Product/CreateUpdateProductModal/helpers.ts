import { ProductKey, ProductTypes } from '../../../queries'
import yup from '../../../../yupGlobal'

export const ProductInitValues: ProductTypes = {
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

export const ProductValidationSchema = yup.object().shape({
  [ProductKey.NAME]: yup.string().required('Product Name is required'),
  [ProductKey.CATEGORY]: yup.string().required('Category is required'),
  [ProductKey.DESCRIPTION]: yup.string().required('Description is required'),
  [ProductKey.PRICE]: yup
    .number()
    .required('Price is required')
    .positive('Price must be positive'),
  [ProductKey.STATUS]: yup.string().required('Status is required'),
  [ProductKey.CREATE_DATE]: yup.string().required('Create Date is required'),
  [ProductKey.EXPIRED_DATE]: yup.string().required('Expired Date is required'),
  [ProductKey.MINIMUM_QUANTITY]: yup
    .number()
    .required('Minimum Quantity is required')
    .positive('Minimum Quantity must be positive')
    .integer('Minimum Quantity must be a whole number'),
  [ProductKey.LIMIT_QUANTITY]: yup
    .number()
    .required('Limit Quantity is required')
    .positive('Limit Quantity must be positive')
    .integer('Limit Quantity must be a whole number')
})
