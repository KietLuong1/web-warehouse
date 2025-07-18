import axiosAccount from '../../configs/services/http/index'
import { AccountTypes, UserDto, AccountApiResponse, QueryParams } from './types'

export interface JwtAuthenticationResponse {
  accessToken: string
  refreshToken: string
  userRole: string
}

export const refreshToken = async (token: string): Promise<JwtAuthenticationResponse> => {
  const resp = await axiosAccount.post<JwtAuthenticationResponse>('/auth/refresh', { refreshToken: token })
  return resp.data
}

export const fetchListAccount = async (params: QueryParams = { page: 1, size: 10 }): Promise<AccountApiResponse> => {
  const resp = await axiosAccount.get<AccountApiResponse>('/userManagement/users', { params })
  console.log('fetchListAccount', resp.data)
  return resp.data
}

export const getAccountById = async (userId: number): Promise<AccountTypes> => {
  const resp = await axiosAccount.get<AccountTypes>(`/userManagement/user/${userId}`)
  return resp.data
}

export const createAccount = async (user: UserDto): Promise<AccountTypes> => {
  const fd = new FormData()
  fd.append('userDto', JSON.stringify(user))

  const resp = await axiosAccount.post<AccountTypes>('/userManagement/user', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  return resp.data
}

export const updateAccount = async (user: UserDto): Promise<AccountTypes> => {
  const fd = new FormData()
  fd.append('userDtoObj', JSON.stringify(user))

  const resp = await axiosAccount.put<AccountTypes>(`/userManagement/user/${user.userId}`, fd)

  // try {
  //   const resp = await axiosAccount.put<AccountTypes>(`/userManagement/user/${user.userId}`, fd, {
  //     headers: { 'Content-Type': 'multipart/form-data' }
  //   })
  //   return resp.data
  // } catch (error) {
  //   console.error('Failed to update record:', error)
  //   throw error
  // }

  return resp.data
}

export interface ChangePasswordPayload {
  password: string
  repeatPassword: string
}

export const changePassword = async (email: string, payload: ChangePasswordPayload): Promise<void> => {
  await axiosAccount.post(`/forgotPassword/changePassword/${email}`, payload)
}
