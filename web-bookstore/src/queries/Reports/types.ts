import { ReportKey } from './keys'

export type ReportTypes = {
  // [ReportKey.ID]: string
  [ReportKey.NAME]: string
  [ReportKey.INVENTORY]: string
  [ReportKey.PRICE]: string
  [ReportKey.SUPPLIER]: string
  [ReportKey.DESCRIPTION]: string
  [ReportKey.CATEGORY]: string
  [ReportKey.CREATED_AT]: string
  [ReportKey.UPDATED_AT]: string
}

export interface ReportPayload {
  id?: string
  name: string
  inventory: string
  price: string
  supplier: string
  description: string
  category: string
  createdAt?: string
  updatedAt?: string
}

export interface ReportResponse {
  id: string
  name: string
  inventory: string
  price: string
  supplier: string
  description: string
  category: string
  createdAt: string
  updatedAt: string
}
