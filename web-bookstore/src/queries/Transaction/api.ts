import { axiosInstance, productAxiosInstance } from '../../configs/services/http/index'
import { PaginationParams } from '../types'
import { TransactionDTO, TransactionPayload } from './types'
import { TransactionDetailResponse } from './useTransactionDetail'

export const fetchListTransactions = async (params: TransactionSearchParams): Promise<TransactionDTO[]> => {
  try {
    const response = await productAxiosInstance.get<TransactionDTO[]>(`/transactions/all`, {
      params
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch transactions:', error)
    throw error
  }
}

export const getTransactionById = async ({ id }: { id: string }): Promise<TransactionDetailResponse> => {
  try {
    const response = await productAxiosInstance.get<TransactionDetailResponse>(`/transactions/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get record:', error)
    throw error
  }
}

export const createTransaction = async (body: TransactionPayload): Promise<TransactionPayload> => {
  try {
    const response = await axiosInstance.post<TransactionPayload>(`/imports`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create record:', error)
    throw error
  }
}

export const updateTransaction = async (body: TransactionPayload, id: string): Promise<TransactionPayload> => {
  try {
    const response = await productAxiosInstance.put<TransactionPayload>(`/transactions/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update record:', error)
    throw error
  }
}

export const deleteTransaction = async (body: TransactionPayload): Promise<TransactionDTO> => {
  const { id } = body
  try {
    const response = await axiosInstance.delete<TransactionDTO>(`/imports/${id}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete record:', error)
    throw error
  }
}

export interface TransactionSearchParams extends PaginationParams {
  filter?: string
  status?: string
  transactionType?: string
}
