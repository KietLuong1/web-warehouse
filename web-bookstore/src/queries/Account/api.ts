import { axiosInstance4 } from '../../configs/services/http/index'
import { AccountTypes } from './types'

export const fetchListAccount = async (): Promise<AccountTypes[]> => {
  try {
    const response = await axiosInstance4.get<AccountTypes[]>('/account')
    return response.data
  } catch (error) {
    console.error('Failed to fetch list account:', error)
    throw error
  }
}

export const getAccountById = async ({ id }: { id: string }): Promise<AccountTypes> => {
  try {
    const response = await axiosInstance4.get<AccountTypes>(`/account/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to get record:', error)
    throw error
  }
}

export const createAccount = async (body: AccountTypes): Promise<AccountTypes> => {
  try {
    const response = await axiosInstance4.post<AccountTypes>(`/account`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create record:', error)
    throw error
  }
}

export const updateAccount = async (body: AccountTypes, id: string): Promise<AccountTypes> => {
  try {
    const response = await axiosInstance4.put<AccountTypes>(`/account/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update record:', error)
    throw error
  }
}
