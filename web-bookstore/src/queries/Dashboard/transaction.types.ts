// types/transaction.types.ts
export interface Transaction {
  transactionId: string
  productId: string
  productName?: string
  supplierId?: string
  supplierName?: string
  type: TransactionType
  quantity: number
  unitPrice: number
  totalAmount: number
  status: TransactionStatus
  notes?: string
  createdAt: string
  updatedAt: string
}

export type TransactionType = 'PURCHASE' | 'SALE' | 'RETURN'
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'FAILED'

export interface TransactionRequest {
  productId: string
  supplierId?: string
  quantity: number
  unitPrice: number
  notes?: string
}

export interface Supplier {
  supplierId: string
  name: string
  contactEmail: string
  contactPhone: string
  address: string
  isActive: boolean
}

export interface Warehouse {
  warehouseId: string
  name: string
  location: string
  capacity: number
  isActive: boolean
}
