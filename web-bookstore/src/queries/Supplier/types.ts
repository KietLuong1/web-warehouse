import { SupplierKey } from './keys'

export type SupplierTypes = {
  [SupplierKey.NAME]: string
  [SupplierKey.CONTACT_INFO]: string
  [SupplierKey.ADDRESS]: string
  [SupplierKey.CREATE_AT]: string
}

export interface SupplierPayload {
  id?: string
  name: string
  contactInfo: string
  address: string
  createdAt: string
}

export interface SupplierDTO {
  id: string
  name: string
  contactInfo: string
  address: string
  createdAt: string
}

