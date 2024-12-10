import axios from 'axios'
import { FieldType } from '../../pages/Login'

// Define the login API function
export const loginApi = async (credentials: FieldType) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/auth/login`, credentials)
    return response.data
  } catch (error) {
    console.error('Login failed', error)
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data || error.message)
    }
    return null
  }
}
