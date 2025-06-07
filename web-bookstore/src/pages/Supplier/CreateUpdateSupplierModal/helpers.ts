import { SupplierKey, SupplierTypes } from '../../../queries'
import yup from '../../../../yupGlobal'

export const SupplierInitValues: SupplierTypes = {
  [SupplierKey.NAME]: '',
  [SupplierKey.PHONE]: 0,
  [SupplierKey.EMAIL]: '',
  [SupplierKey.ADDRESS]: '',
  [SupplierKey.CREATE_AT]: ''
}

export const SupplierValidationSchema = yup.object().shape({
  [SupplierKey.NAME]: yup.string().required('Supplier Name is required'),
  [SupplierKey.PHONE]: yup
    .number()
    .required('Phone number is required')
    .positive('Phone number must be a valid number')
    .integer('Phone number must be a whole number'),
  [SupplierKey.EMAIL]: yup.string().email('Invalid email format').required('Email is required'),
  [SupplierKey.ADDRESS]: yup.string().required('Address is required'),
  [SupplierKey.CREATE_AT]: yup.string().required('Create Date is required')
})
