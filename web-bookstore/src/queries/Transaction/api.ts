import axiosInstance from '../../configs/services/http'
import { TransactionTypes } from './types'

export const fetchListTransactions = async (): Promise<TransactionTypes[]> => {
  try {
    const response = await axiosInstance.get<TransactionTypes[]>(`/imports`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch list imports:', error)
    throw error
  }
}

export const getTransactionById = async ({ id }: { id: string }): Promise<TransactionTypes> => {
  try {
    const response = await axiosInstance.get<TransactionTypes>(`/imports/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get record:', error)
    throw error
  }
}

export const createTransaction = async (body: TransactionTypes): Promise<TransactionTypes> => {
  try {
    const response = await axiosInstance.post<TransactionTypes>(`/imports`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create create record:', error)
    throw error
  }
}

export const updateTransaction = async (body: TransactionTypes, id: string): Promise<TransactionTypes> => {
  try {
    const response = await axiosInstance.put<TransactionTypes>(`/imports/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update record:', error)
    throw error
  }
}

export const deleteTransaction = async (body: TransactionTypes): Promise<TransactionTypes> => {
  const { id } = body
  try {
    const response = await axiosInstance.delete<TransactionTypes>(`/imports/${id}`, {})
    return response.data
  } catch (error) {
    console.error('Failed to delete record:', error)
    throw error
  }
}
