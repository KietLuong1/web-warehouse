import { LocationKey } from './keys'

export type LocationTypes = {
  [LocationKey.ID]: string
  [LocationKey.NAME]: string
  [LocationKey.LOCATION]: string
  [LocationKey.CAPACITY]: number
  [LocationKey.ACTIVE]: boolean
  [LocationKey.CREATED_AT]: string
  [LocationKey.UPDATED_AT]: string
}

export interface LocationPayload {
  id?: string
  name: string
  location: string
  capacity: number
  active?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface WarehouseDTO {
  id: string
  name: string
  location: string
  capacity: number
  active: boolean
  createdAt: string
  updatedAt?: string
}
