import { TransactionKey, TransactionTypes } from '../../../queries'
import yup from '../../../../yupGlobal'

export const TransactionInitValues: TransactionTypes = {
  [TransactionKey.BATCH_ID]: '',
  [TransactionKey.PRODUCT]: '',
  [TransactionKey.LOCATION]: '',
  [TransactionKey.EXPIRED_DATE]: '',
  [TransactionKey.QUANTITY]: 0
}

export const TransactionValidationSchema = yup.object({
  [TransactionKey.BATCH_ID]: yup.string().required('Batch ID is required'),
  [TransactionKey.PRODUCT]: yup.string().required('Product is required'),
  [TransactionKey.LOCATION]: yup.string().required('Location is required'),
  [TransactionKey.EXPIRED_DATE]: yup
    .string()
    .required('Expired date is required')
    .test('is-future-date', 'Expired date must be in the future', (value) => {
      if (!value) return false
      const date = new Date(value)
      return date > new Date()
    }),
  [TransactionKey.QUANTITY]: yup
    .number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be a whole number')
})
