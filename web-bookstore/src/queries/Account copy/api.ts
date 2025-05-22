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

export const fetchListAccount = async (
  params: QueryParams = { pageNumber: 0, pageSize: 10 }
): Promise<AccountApiResponse> => {
  const resp = await axiosAccount.get<AccountApiResponse>('/users', { params })
  console.log('fetchListAccount', resp.data)
  return resp.data
}

export const getAccountById = async (userId: number): Promise<AccountTypes> => {
  const resp = await axiosAccount.get<AccountTypes>(`/user/${userId}`)
  return resp.data
}
// response
export const createAccount = async (user: UserDto): Promise<AccountTypes> => {
  const fd = new FormData()
  fd.append('userDto', JSON.stringify(user))

  const resp = await axiosAccount.post<AccountTypes>('/user', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  return resp.data
}

export const updateAccount = async (user: UserDto): Promise<AccountTypes> => {
  const fd = new FormData()
  fd.append('userDtoObj', JSON.stringify(user))

  const resp = await axiosAccount.put<AccountTypes>(`/user/${user.userId}`, fd
  //   , {
  //   headers: { 'Content-Type': 'multipart/form-data' }
  // }
)

  // try {
  //   const resp = await axiosAccount.put<AccountTypes>(`user/${user.userId}`, fd, {
  //     headers: { 'Content-Type': 'multipart/form-data' }
  //   })
  //   return resp.data
  // } catch (error) {
  //   console.error('Failed to update record:', error)
  //   throw error
  // }

  return resp.data
}
