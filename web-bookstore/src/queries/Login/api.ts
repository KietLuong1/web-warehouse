import axiosAccount from '../../configs/services/http/index'
import { FieldType } from '../../pages/Login'
import { ChangePasswordFieldType } from '../../pages/Login/ForgotPassword/ForgotPassword'

// Define the login API function
export const loginApi = async (credentials: FieldType) => {
  try {
    const response = await axiosAccount.post(`/auth/login`, credentials)
    console.log('Login successful api', response.data)
    return response.data
  } catch (error) {
    console.error('Login failed', error)
    // if (axiosAccount.isaxiosAccountError(error)) {
    //   console.error('axiosAccount error details:', error.response?.data || error.message)
    // }
    return null
  }
}

// Define the forgotPassword API functions

// 1. Verify Email (Send OTP)
export const verifyEmail = async (email: string): Promise<string | null> => {
  try {
    const response = await axiosAccount.post(`/forgotPassword/verifyMail/${email}`)
    return response.data
  } catch (error) {
    console.error('Failed to verify email', error)
    // if (axiosAccount.isaxiosAccountError(error)) {
    //   console.error('axiosAccount error details:', error.response?.data || error.message)
    // }
    return null
  }
}

// 2. Verify OTP
export const verifyOtp = async (otp: number, email: string): Promise<string | null> => {
  try {
    const response = await axiosAccount.post(`/forgotPassword/verifyOtp/${otp}/${email}`)
    return response.data
  } catch (error) {
    console.error('Failed to verify OTP', error)
    // if (axiosAccount.isaxiosAccountError(error)) {
    //   console.error('axiosAccount error details:', error.response?.data || error.message)
    // }
    return null
  }
}

// 3. Change Password
export const changePassword = async (passwordDetails: ChangePasswordFieldType): Promise<string | null> => {
  try {
    const response = await axiosAccount.post(
      `/forgotPassword/changePassword/${passwordDetails.email}`,
      passwordDetails
    )
    return response.data
  } catch (error) {
    console.error('Failed to change password', error)
    // if (axiosAccount.isaxiosAccountError(error)) {
    //   console.error('axiosAccount error details:', error.response?.data || error.message)
    // }
    return null
  }
}
