import { axiosInstance4 } from '../../configs/services/http/index'
import { UserDto } from '../Account/types'
import { AccountResponse, AccountTypes } from './types'

export const fetchListAccount = async (): Promise<AccountResponse[]> => {
  try {
    const response = await axiosInstance4.get<AccountResponse[]>('/account')
    return response.data
  } catch (error) {
    console.error('Failed to fetch list of account:', error)
    throw error
  }
}

export const getAccountById = async ({ userId }: { userId: string }): Promise<AccountResponse> => {
  try {
    const response = await axiosInstance4.get<AccountResponse>(`/account/${userId}`)
    return response.data
  } catch (error) {
    console.error('Failed to get record:', error)
    throw error
  }
}

export const createAccount = async (body: UserDto): Promise<UserDto> => {
  try {
    const response = await axiosInstance4.post<UserDto>(`/account`, body)
    return response.data
  } catch (error) {
    console.error('Failed to create record:', error)
    throw error
  }
}

export const updateAccount = async (body: UserDto, id: string): Promise<UserDto> => {
  try {
    const response = await axiosInstance4.put<AccountTypes>(`/account/${id}`, body)
    return response.data
  } catch (error) {
    console.error('Failed to update record:', error)
    throw error
  }
}
