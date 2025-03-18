import { SupplierKey } from './keys'

export type SupplierTypes = {
  [SupplierKey.NAME]: string
  [SupplierKey.PHONE]: number
  [SupplierKey.EMAIL]: string
  [SupplierKey.ADDRESS]: string
  [SupplierKey.CREATE_AT]: string
}

export interface SupplierPayload {
  supplier_id?: string
  name: string
  phone: number
  email: string
  address: string
  create_at: string
}

export interface SupplierResponse {
  supplier_id: string
  name: string
  phone: number
  email: string
  address: string
  create_at: string
}
