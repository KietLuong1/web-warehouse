import axiosInstance from '../../configs/services/http'
import { Location } from './types'

const fetchListLocations = async (): Promise<Location[]> => {
  try {
    const response = await axiosInstance.get<Location[]>('/location')
    return response.data
  } catch (error) {
    console.error('Failed to fetch list imports:', error)
    throw error
  }
}

export default fetchListLocations
