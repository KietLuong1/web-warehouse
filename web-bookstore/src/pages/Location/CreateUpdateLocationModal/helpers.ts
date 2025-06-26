import { LocationKey, LocationTypes } from '../../../queries'
import yup from '../../../../yupGlobal'

export const LocationInitValues: LocationTypes = {
  [LocationKey.ID]: '',
  [LocationKey.NAME]: '',
  [LocationKey.LOCATION]: '',
  [LocationKey.CAPACITY]: 0,
  [LocationKey.ACTIVE]: true,
  [LocationKey.CREATED_AT]: '',
  [LocationKey.UPDATED_AT]: ''
}
export const LocationValidationSchema = yup.object().shape({
  [LocationKey.NAME]: yup.string().required('Name is required'),
  [LocationKey.LOCATION]: yup.string().required('Location is required'),
  [LocationKey.CAPACITY]: yup
    .number()
    .required('Capacity is required')
    .positive('Capacity must be positive')
    .integer('Capacity must be a whole number')
})
