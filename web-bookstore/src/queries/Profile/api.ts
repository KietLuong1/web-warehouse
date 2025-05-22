import axiosAccount from '../../configs/services/http'

export const getUserById = async (userId: string) => {
  const response = await axiosAccount.get(`/api/v1/user/${userId}`)
  return response.data
}

export const updateUserById = async (userId: string, userData: any) => {
  const response = await axiosAccount.put(`/api/v1/user/${userId}`, userData)
  return response.data
}
