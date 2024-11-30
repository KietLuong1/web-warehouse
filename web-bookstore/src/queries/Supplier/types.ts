import { SupplierKey } from './keys'

export type SupplierTypes = {
  [SupplierKey.SUPPLIER_ID]: string
  [SupplierKey.NAME]: string
  [SupplierKey.PHONE]: number
  [SupplierKey.EMAIL]: string
  [SupplierKey.ADDRESS]: string
  [SupplierKey.CREATE_AT]: string
}
