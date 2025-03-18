import { AccountKey, AccountTypes } from '../../../queries/Account_MockData'
import yup from '../../../../yupGlobal'

export const AccountInitValues: AccountTypes = {

  [AccountKey.USERNAME]: '',
  [AccountKey.EMAIL]: '',
  [AccountKey.ROLE]: '',
  [AccountKey.NAME]: '',
  [AccountKey.PASSWORD]: ''
}

export const AccountValidationSchema = yup.object().shape({
  [AccountKey.NAME]: yup
    .string()
    .required('Name is required')
    .matches(/^[a-zA-Z\s.\-']+$/, "Name must contain only letters, spaces, and characters like .-'"),
  [AccountKey.USERNAME]: yup
    .string()
    .required('Username is required')
    .matches(/^[a-zA-Z0-9_]*$/, 'Username must be alphanumeric and can contain underscores only'),
  [AccountKey.EMAIL]: yup.string().required('Email is required').email('Invalid email address'),
  [AccountKey.ROLE]: yup.string().required('Role is required'),
  [AccountKey.PASSWORD]: yup.string().required('Password is required')
})
