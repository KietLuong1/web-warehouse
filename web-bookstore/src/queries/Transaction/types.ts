import { ProductDTO } from '../Product'
import { TransactionKey } from './keys'

export type TransactionTypes = {
  [TransactionKey.ID]: string
  [TransactionKey.TOTAL_PRODUCTS]: number
  [TransactionKey.TOTAL_PRICE]: number
  [TransactionKey.TRANSACTION_TYPE]: 'PURCHASE' | 'SALE' | 'RETURN'
  [TransactionKey.STATUS]: 'PENDING' | 'PROCESSING' | 'COMPLETED'
  [TransactionKey.DESCRIPTION]: string
  [TransactionKey.CREATED_AT]: string
  [TransactionKey.PRODUCT]: ProductDTO
}

export interface TransactionPayload {
  id?: string
  totalProducts: number
  totalPrice: number
  transactionType: 'PURCHASE' | 'SALE' | 'RETURN'
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED'
  description: string
  createdAt: string
  product: ProductDTO
}

export interface TransactionDTO {
  id: string
  totalProducts: number
  totalPrice: number
  transactionType: 'PURCHASE' | 'SALE' | 'RETURN'
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED'
  description: string
  createdAt: string
  product: ProductDTO
}
