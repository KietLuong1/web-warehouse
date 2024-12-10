import { axiosAccount } from '../../configs/services/http/index'
import { AccountPayLoad, AccountTypes, ApiResponse } from './types'

export const fetchListAccount = async (params?: ApiResponse<AccountTypes>): Promise<ApiResponse<AccountTypes>> => {
  try {
    console.log('🚀 ~ fetchListAccount ~ params:', params)
    const response = await axiosAccount.get<ApiResponse<AccountTypes>>(`users`, { params })

    console.log('Account', response.data)
    return response.data
  } catch (error) {
    console.error('Failed to fetch list account:', error)
    throw error
  }
}

export const getAccountById = async ({ userId }: { userId: string }): Promise<AccountTypes> => {
  try {
    const response = await axiosAccount.get<AccountTypes>(`/user${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to get record:', error)
    throw error
  }
}

export const createAccount = async (body: AccountPayLoad): Promise<AccountTypes> => {
  try {
    console.log('Sending payload:', body)

    const response = await axiosAccount.post<AccountTypes>(
      `user`,
      { userDto: body },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        withCredentials: true
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to create record:', error)
    throw error
  }
}

export const updateAccount = async (body: AccountPayLoad): Promise<AccountTypes> => {
  try {
    const userId = body.userId
    const response = await axiosAccount.put<AccountTypes>(`/user/${userId}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to update record:', error)
    throw error
  }
}
