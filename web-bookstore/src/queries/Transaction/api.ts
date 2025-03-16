import { axiosInstance } from '../../configs/services/http/index'
import { TransactionPayload, TransactionResponse } from './types'

export const fetchListTransactions = async (): Promise<TransactionResponse[]> => {
  try {
    const response = await axiosInstance.get<TransactionResponse[]>(`/imports`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch list imports:', error)
    throw error
  }
}

export const getTransactionById = async ({ id }: { id: string }): Promise<TransactionResponse> => {
  try {
    const response = await axiosInstance.get<TransactionResponse>(`/imports/${id}`)
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
    const response = await axiosInstance.put<TransactionPayload>(`/imports/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update record:', error)
    throw error
  }
}

export const deleteTransaction = async (body: TransactionPayload): Promise<TransactionPayload> => {
  const { id } = body
  try {
    const response = await axiosInstance.delete<TransactionResponse>(`/imports/${id}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete record:', error)
    throw error
  }
}
