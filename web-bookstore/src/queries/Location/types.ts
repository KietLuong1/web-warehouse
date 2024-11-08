import { LocationKey } from './keys'

export type Location = {
  [LocationKey.LOCATION_ID]: string
  [LocationKey.CODE]: number
  [LocationKey.ZONE]: string
  [LocationKey.SHELF]: string
  [LocationKey.RACK]: string
  [LocationKey.CAPACITY]: number
  [LocationKey.STATUS]: string
  [LocationKey.DESCRIPTION]: string
}
