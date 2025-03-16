import { LocationKey, LocationTypes } from '../../../queries'
import yup from '../../../../yupGlobal'

export const LocationInitValues: LocationTypes = {
  [LocationKey.CODE]: 0,
  [LocationKey.ZONE]: '',
  [LocationKey.SHELF]: '',
  [LocationKey.RACK]: '',
  [LocationKey.CAPACITY]: 0,
  [LocationKey.STATUS]: '',
  [LocationKey.DESCRIPTION]: ''
}

export const LocationValidationSchema = yup.object().shape({
  [LocationKey.CODE]: yup
    .number()
    .required('Code is required')
    .positive('Code must be positive')
    .integer('Code must be a whole number'),
  [LocationKey.ZONE]: yup.string().required('Zone is required'),
  [LocationKey.SHELF]: yup.string().required('Shelf is required'),
  [LocationKey.RACK]: yup.string().required('Rack is required'),
  [LocationKey.CAPACITY]: yup
    .number()
    .required('Capacity is required')
    .positive('Capacity must be positive')
    .integer('Capacity must be a whole number'),
  [LocationKey.STATUS]: yup.string().required('Status is required'),
  [LocationKey.DESCRIPTION]: yup.string().required('Description is required')
})
