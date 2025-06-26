import { SupplierPayload } from '../../../queries'
import yup from '../../../../yupGlobal'

export type SupplierFormData = Omit<SupplierPayload, 'contactInfo'> & {
  email: string
  phone: string
  contactInfo?: string
}

export const SupplierInitValues: SupplierFormData = {
  name: '',
  address: '',
  email: '',
  phone: '',
  createdAt: '',
  contactInfo: ''
}

export const SupplierValidationSchema = yup.object().shape({
  name: yup.string().required('Supplier Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required')
})
